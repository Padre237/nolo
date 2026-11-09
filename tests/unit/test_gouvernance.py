"""CA-DEMO-03 — Politique, journal chaîné, agent Conformité, orchestrateur (incrément démo D-025)."""
import json
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import pytest

RACINE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(RACINE))

from src.server.agents.conformite import TABLE, AgentConformite, nouvelle_demande  # noqa: E402
from src.server.agents.orchestrateur import Orchestrateur, resoudre_mode  # noqa: E402
from src.server.gouvernance.contrats import MODES, Contexte  # noqa: E402
from src.server.gouvernance.journal import ZERO, ChampInterdit, JournalAudit, pseudonymiser  # noqa: E402
from src.server.gouvernance.politique import ClePolitiqueInconnue, Politique  # noqa: E402

MAINTENANT = datetime(2026, 11, 4, 12, 0, tzinfo=ZoneInfo("Africa/Douala"))


@pytest.fixture()
def politique():
    return Politique.charger(RACINE / "config" / "policy.yaml")


@pytest.fixture()
def journal(politique, tmp_path):
    return JournalAudit(tmp_path / "audit.jsonl", politique, horloge=lambda: MAINTENANT)


def ctx(politique, mode="demo_synthetique", consentements=None, mineur=False):
    return Contexte(session="demo:test", mode=mode, maintenant=MAINTENANT,
                    consentements=consentements or {}, mineur=mineur, politique=politique)


# --- Politique (FR-701, FR-707) -------------------------------------------------------------------
def test_politique_valeur_source_et_variante(politique):
    assert politique.valeur("surveillance.seuil_minimal_cas_par_zone") == 5
    assert politique.valeur("etat_institutionnel.apdp_operationnelle") is False
    assert politique.source("donnees_sensibles.categories_interdites_art48") == ["CMR-LOI-2024-017::0048"]
    with pytest.raises(ClePolitiqueInconnue):
        politique.valeur("clef.inexistante")
    v = politique.variante({"etat_institutionnel.apdp_operationnelle": True})
    assert v.valeur("etat_institutionnel.apdp_operationnelle") is True
    assert politique.valeur("etat_institutionnel.apdp_operationnelle") is False  # l'original est intact
    assert v.version.endswith("+variante") and v.empreinte != politique.empreinte


def test_resolution_du_mode(politique):
    assert resoudre_mode(politique, lancement_demo=True) == "demo_synthetique"
    assert resoudre_mode(politique, lancement_demo=False) == "sans_donnees_personnelles"
    v = politique.variante({
        "autorisation_prealable.traitement_donnees_personnelles.autorisation_apdp_obtenue": True,
        "autorisation_prealable.traitement_donnees_personnelles.reference_autorisation": "APDP-DEMO-001"})
    assert resoudre_mode(v, lancement_demo=False) == "complet"


# --- Journal (FR-706, FR-713, §6) ------------------------------------------------------------------
def test_journal_chaine_et_verification(journal):
    e1 = journal.ecrire(agent="conformite", action="ressources.rechercher_sang", decision="AUTORISE",
                        mode="demo_synthetique")
    e2 = journal.ecrire(agent="conformite", action="orientation.structures", decision="AUTORISE",
                        mode="demo_synthetique")
    assert e1["hash_precedent"] == ZERO and e2["hash_precedent"] == e1["hash"]
    assert journal.verifier_chaine() == []
    # Falsification : la vérification échoue.
    lignes = journal.chemin.read_text(encoding="utf-8").splitlines()
    evt = json.loads(lignes[0])
    evt["decision"] = "BLOQUE"
    journal.chemin.write_text("\n".join([json.dumps(evt, sort_keys=True, separators=(",", ":"),
                                                    ensure_ascii=False)] + lignes[1:]) + "\n", encoding="utf-8")
    assert journal.verifier_chaine() != []


def test_journal_rejette_les_champs_interdits(journal):
    with pytest.raises(ChampInterdit):
        journal.ecrire(agent="triage", action="triage.journaliser_decision", decision="AUTORISE",
                       mode="demo_synthetique",
                       entree_minimisee={"categories": ["symptomes_codes"], "destination": "serveur_cmr",
                                         "empreinte_entree": None,
                                         "entree": {"texte_libre_symptomes": "mal au ventre"}})
    evts = journal.lire()
    assert len(evts) == 1 and evts[0]["action"] == "journal.violation_bloquee"
    assert "mal au ventre" not in journal.chemin.read_text(encoding="utf-8")
    assert journal.verifier_chaine() == []


def test_pseudonyme_hmac_stable_et_non_reversible():
    p1, p2 = pseudonymiser("utilisateur-17", b"cle"), pseudonymiser("utilisateur-17", b"cle")
    assert p1 == p2 and p1.startswith("hmac:") and "utilisateur-17" not in p1
    assert pseudonymiser("utilisateur-17", b"autre_cle") != p1


# --- Agent Conformité (FR-702, FR-712, FR-714, table §3) -------------------------------------------
def test_art48_bloque_quel_que_soit_le_consentement(politique):
    a = AgentConformite(politique)
    for mode in MODES:
        d = nouvelle_demande("ressources", "ressources.rechercher_medicament", ("requete_medicament", "vie_sexuelle"),
                             "recherche", "serveur_cmr", ctx(politique, mode, {"orientation": True}))
        dec = a.decider(d)
        assert dec.verdict == "BLOQUE" and dec.repli == "appareil"
        assert "CMR-LOI-2024-017::0048" in dec.fragments
        assert dec.justification_code == "CATEGORIE_INTERDITE_ART48"


def test_derogation_simulee_change_le_verdict(politique):
    v = politique.variante({"donnees_sensibles.categories_interdites_art48.derogation_par_consentement": True})
    d = nouvelle_demande("ressources", "ressources.rechercher_medicament", ("requete_medicament", "vie_sexuelle"),
                         "recherche", "serveur_cmr", ctx(v))
    dec = AgentConformite(v).decider(d)
    assert dec.verdict == "AUTORISE_AVEC_CONDITIONS" and "derogation_art48_simulee" in dec.conditions


def test_table_des_modes(politique):
    a = AgentConformite(politique)
    cas = [  # (action, mode, consentements, verdict attendu)
        ("triage.extraction_llm", "demo_synthetique", {"orientation": True}, "AUTORISE"),
        ("triage.extraction_llm", "demo_synthetique", {}, "BLOQUE"),            # consentement manquant
        ("triage.extraction_llm", "sans_donnees_personnelles", {"orientation": True}, "BLOQUE"),
        ("triage.journaliser_decision", "sans_donnees_personnelles", {}, "AUTORISE_AVEC_CONDITIONS"),
        ("surveillance.contribuer", "sans_donnees_personnelles", {"surveillance": True}, "BLOQUE"),
        ("surveillance.contribuer", "complet", {"surveillance": True}, "AUTORISE"),
        ("surveillance.transmettre_donnees_individuelles", "complet", {}, "BLOQUE"),
        ("profil.relier_dans_la_duree", "demo_synthetique", {}, "BLOQUE"),
        ("donnee_interdite.traiter", "complet", {}, "BLOQUE"),
        ("ressources.rechercher_sang", "sans_donnees_personnelles", {}, "AUTORISE"),
        ("fiabilite.enregistrer_signalement", "demo_synthetique", {}, "AUTORISE_AVEC_CONDITIONS"),
        ("fiabilite.enregistrer_signalement", "sans_donnees_personnelles", {}, "BLOQUE"),
    ]
    for action, mode, cons, attendu in cas:
        d = nouvelle_demande("x", action, ("symptomes_codes",) if "triage" in action else ("jeton_anonyme",),
                             "orientation" if "triage" in action else "surveillance" if "surveillance" in action
                             else "fiabilite" if "fiabilite" in action else "recherche",
                             "serveur_cmr", ctx(politique, mode, cons))
        dec = a.decider(d)
        assert dec.verdict == attendu, f"{action} / {mode} : {dec.verdict} ≠ {attendu} ({dec.justification_code})"


def test_chaque_decision_cite_un_fragment_ou_bloque_sans_fondement(politique):
    a = AgentConformite(politique)
    for action in TABLE:
        d = nouvelle_demande("x", action, ("jeton_anonyme",), "demonstration", "serveur_cmr", ctx(politique))
        dec = a.decider(d)
        assert dec.fragments or dec.verdict == "BLOQUE_SANS_FONDEMENT" \
            or dec.justification_code == "AUCUNE_DONNEE_PERSONNELLE", action
    d = nouvelle_demande("x", "action.inconnue", (), "demonstration", "serveur_cmr", ctx(politique))
    dec = a.decider(d)
    assert dec.verdict == "BLOQUE_SANS_FONDEMENT" and dec.fragments == ()


def test_transfert_hors_pays(politique):
    a = AgentConformite(politique)
    # Mode complet, données personnelles vers l'étranger : bloqué, repli = premier repli de la politique.
    d = nouvelle_demande("x", "appel_reseau_sortant", ("symptomes_codes",), "orientation", "hors_cmr",
                         ctx(politique, "complet"))
    dec = a.decider(d)
    assert dec.verdict == "BLOQUE" and dec.repli == "modele_local"
    # Démo : autorisé avec condition « données synthétiques seulement ».
    d = nouvelle_demande("x", "appel_reseau_sortant", ("symptomes_codes",), "demonstration", "hors_cmr",
                         ctx(politique))
    dec = a.decider(d)
    assert dec.verdict == "AUTORISE_AVEC_CONDITIONS" and "donnees_synthetiques_seulement" in dec.conditions


def test_mineur_sans_consentement_parental(politique):
    a = AgentConformite(politique)
    d = nouvelle_demande("surveillance", "surveillance.contribuer", ("contribution_agregee",), "surveillance",
                         "serveur_cmr", ctx(politique, "demo_synthetique", {"surveillance": True}, mineur=True))
    dec = a.decider(d)
    assert dec.verdict == "BLOQUE" and dec.justification_code == "MINEUR_SANS_CONSENTEMENT_PARENTAL"


# --- Orchestrateur (Principe III, FR-709, D-016) ---------------------------------------------------
def test_orchestrateur_journalise_et_execute(politique, journal):
    o = Orchestrateur(politique, journal, lancement_demo=True)
    assert o.mode == "demo_synthetique"
    r = o.executer(demandeur="ressources", action="ressources.rechercher_sang", categories=("requete_sang",),
                   finalite="recherche", destination="serveur_cmr", contexte=o.contexte(),
                   entree={"groupe": "O-"}, executeur=lambda conditions: {"ok": True, "conditions": conditions})
    assert r.decision.verdict == "AUTORISE" and r.resultat == {"ok": True, "conditions": ()}
    assert r.decision.ref_audit == r.evenement["event_id"]
    assert r.evenement["contributeurs"] == ["ressources", "orchestrateur"]
    assert r.evenement["entree_minimisee"]["entree"] == {"groupe": "O-"}  # conservé en démo (D-016)

    bloque = o.executer(demandeur="surveillance", action="surveillance.transmettre_donnees_individuelles",
                        categories=("donnees_individuelles_surveillance",), finalite="surveillance",
                        destination="district", contexte=o.contexte(consentements={"surveillance": True}),
                        executeur=lambda c: pytest.fail("ne doit jamais s'exécuter"))
    assert bloque.decision.verdict == "BLOQUE" and bloque.resultat is None and bloque.decision.repli == "agregat"
    assert journal.verifier_chaine() == []


def test_hors_demo_l_entree_n_est_pas_conservee(politique, journal):
    o = Orchestrateur(politique, journal, lancement_demo=False)
    assert o.mode == "sans_donnees_personnelles"
    r = o.executer(demandeur="ressources", action="ressources.rechercher_sang", categories=("requete_sang",),
                   finalite="recherche", destination="serveur_cmr", contexte=o.contexte(),
                   entree={"groupe": "AB+"})
    assert r.evenement["entree_minimisee"]["entree"] is None
    assert r.evenement["entree_minimisee"]["empreinte_entree"].startswith("sha256:")
