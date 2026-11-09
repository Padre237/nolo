"""SF-012-03 / SF-007-12 à 14 (incrément démo D-025) — Exécuteur de scénarios.

    python3 tools/scenarios/executer.py --scenario <orientation_urgente|medicament_sensible|regroupement>
                                        [--politique config/variantes/<v>.yaml] [--sans-gouvernance]
                                        [--sortie rapport.json]
    python3 tools/scenarios/executer.py --exporter-attendus tests/js/fixtures/decisions_attendues.json

- Mode `demo_synthetique` obligatoire ; l'horloge de chaque étape est injectée (ADR-013).
- `--sans-gouvernance` (FR-710) : remplace l'agent Conformité par un agent qui autorise tout,
  SANS désactiver le journal ; le rapport liste les violations (liste fermée du §8 des contrats).
- `--politique` (FR-707) : variante « et si » chargée EN MÉMOIRE ; le rapport ajoute les différences
  de verdicts par rapport à la politique de référence.
- `--exporter-attendus` (SF-007-17, FR-1904) : décisions de la référence Python pour les scénarios S1 à S3
  (politique de référence et chaque variante de `config/variantes/`) et pour une grille de toutes les actions ;
  oracle des tests de parité de Nolo (`app/tests/parite_conformite.test.mjs`).
Écart assumé (incrément D-025 §5) : appels en processus via l'orchestrateur, pas en HTTP.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

RACINE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(RACINE))

import yaml  # noqa: E402

from src.server.agents.conformite import AgentConformite, ConformiteSansGouvernance  # noqa: E402
from src.server.agents.orchestrateur import Orchestrateur  # noqa: E402
from src.server.domain import ressources, surveillance  # noqa: E402
from src.server.gouvernance.journal import JournalAudit, empreinte  # noqa: E402
from src.server.gouvernance.politique import Politique  # noqa: E402

DOUALA = ZoneInfo("Africa/Douala")
KB = RACINE / "kb" if (RACINE / "kb" / "data").exists() else RACINE.parent / "kb"
SCEN = KB / "data" / "synthetic"
DCI_SENSIBLE = "tenofovir_lamivudine_dolutegravir"
POSITION = (4.04, 9.70)  # position arrondie à 2 décimales (FR-105), zone des établissements fictifs


def etapes_scenario(nom: str) -> list[dict]:
    return [json.loads(l) for l in open(SCEN / f"scenario_{nom}.jsonl", encoding="utf-8")]


def horloge_etape(etape: dict, base: datetime) -> datetime:
    if "jour" in etape:
        jours = int(etape["jour"].lstrip("J")) - 1
        h, m = map(int, etape.get("heure", "09:00").split(":"))
        return (base + timedelta(days=jours)).replace(hour=h, minute=m)
    return base + timedelta(minutes=10 * int(etape.get("etape", 1)))


def triage_sur_appareil(tranche: str, texte: str) -> dict:
    """Appelle le MOTEUR DU PRODUIT (CLI Node) : le serveur ne voit jamais le texte."""
    r = subprocess.run(["node", str(RACINE / "src/client/ondevice/cli/triage.mjs"),
                        "--tranche", tranche, "--texte", texte, "--json"],
                       capture_output=True, text=True, check=True)
    return json.loads(r.stdout)


def structures_urgence(maintenant: datetime) -> list[dict]:
    etabs = ressources._csv("etablissements.csv")
    res = []
    for e in etabs:
        if "urgences" not in e["services"].split(";") or e["ouvert_24h"] != "True":
            continue
        res.append({"etab_id": e["etab_id"], "nom": e["nom"],
                    "distance_km": round(ressources.distance_km(*POSITION, e["lat"], e["lon"]), 2)})
    return sorted(res, key=lambda x: x["distance_km"])[:3]


# ----------------------------------------------------------------------------------------------------
class Execution:
    def __init__(self, politique: Politique, journal_chemin: Path, sans_gouvernance: bool):
        self.politique = politique
        conf = ConformiteSansGouvernance(politique) if sans_gouvernance else AgentConformite(politique)
        self.journal = JournalAudit(journal_chemin, politique)
        self.orch = Orchestrateur(politique, self.journal, conformite=conf, lancement_demo=True)
        assert self.orch.mode == "demo_synthetique", "l'exécuteur ne tourne qu'en mode démo"
        self.sans_gouvernance = sans_gouvernance
        self.decisions: list[dict] = []
        self.demandes: list[dict] = []
        self.transmissions_individuelles: list[dict] = []
        self.publications: list[dict] = []
        self.etat: dict = {}

    def agir(self, maintenant, demandeur, action, categories, finalite, destination,
             entree=None, executeur=None, consentements=None, validateur=None, session=None):
        ctx = self.orch.contexte(session=session or self.etat.get("session", "demo:scenario"),
                                 consentements=consentements or {})
        ctx = type(ctx)(**{**ctx.__dict__, "maintenant": maintenant})
        r = self.orch.executer(demandeur=demandeur, action=action, categories=categories,
                               finalite=finalite, destination=destination, contexte=ctx,
                               entree=entree, executeur=executeur, validateur_humain=validateur)
        self.demandes.append({"action": action, "categories": list(categories), "finalite": finalite,
                              "destination": destination, "consentements": dict(ctx.consentements),
                              "mode": ctx.mode, "mineur": ctx.mineur})
        self.decisions.append({"action": action, "verdict": r.decision.verdict,
                               "fragments": list(r.decision.fragments),
                               "conditions": list(r.decision.conditions),
                               "repli": r.decision.repli,
                               "justification": r.decision.justification_code})
        return r


# --- Scénario S1 : orientation d'urgence ------------------------------------------------------------
def jouer_orientation_urgente(ex: Execution, etapes: list[dict], base: datetime) -> list[dict]:
    ex.etat["session"] = "demo:orientation_urgente"
    sorties = []
    # Étape 1 — triage sur l'appareil, sans consentement.
    t = horloge_etape(etapes[0], base)
    r = triage_sur_appareil("51_70_ans", "douleur poitrine soudaine")
    conforme = (r["niveau"], r["priorite"], r["regle"], r["execution"]) == \
               ("urgence", "immediate", "IITT12-R-12", "sur_appareil") and len(ex.journal.lire()) == 0
    sorties.append({"obtenu": f"{r['niveau']} ({r['priorite']}, {r['regle']}) — fragments {r['fragments']} ; "
                              f"0 événement serveur (le texte n'a pas quitté l'appareil)",
                    "conforme": conforme, "ref_audit": None, "donnees": r})
    # Étape 2 — journalisation de la décision (sans symptôme nominatif).
    t2 = horloge_etape(etapes[1], base)
    res = ex.agir(t2, "triage", "triage.journaliser_decision", ("symptomes_codes",), "orientation",
                  "serveur_cmr", entree={"niveau": r["niveau"], "regle": r["regle"],
                                         "empreinte_jetons": empreinte(r["jetons_evalues"])},
                  consentements={"orientation": False})
    texte_journal = ex.journal.chemin.read_text(encoding="utf-8")
    conforme2 = (res.decision.verdict in ("AUTORISE", "AUTORISE_AVEC_CONDITIONS")
                 and "douleur" not in texte_journal and "poitrine" not in texte_journal
                 and ex.journal.verifier_chaine() == [])
    sorties.append({"obtenu": f"{res.decision.verdict} ({res.decision.justification_code}) ; "
                              f"journal sans texte libre ; chaîne valide",
                    "conforme": conforme2, "ref_audit": res.evenement["event_id"]})
    # Étape 3 — structures d'urgence et numéros.
    t3 = horloge_etape(etapes[2], base)
    res3 = ex.agir(t3, "orientation", "orientation.structures", ("position_arrondie",), "orientation",
                   "serveur_cmr", entree={"position": POSITION},
                   executeur=lambda cond: structures_urgence(t3))
    numeros = r["numeros_urgence"]
    conforme3 = (res3.decision.verdict in ("AUTORISE", "AUTORISE_AVEC_CONDITIONS")
                 and res3.resultat and "111" not in numeros)
    sorties.append({"obtenu": f"{len(res3.resultat or [])} structures d'urgence ; la plus proche : "
                              f"{res3.resultat[0]['nom']} à {res3.resultat[0]['distance_km']} km ; "
                              f"numéros {numeros} (111 absent) ; mention : {r['mention_demo'][:40]}…",
                    "conforme": conforme3, "ref_audit": res3.evenement["event_id"]})
    return sorties


# --- Scénario S2 : médicament sensible --------------------------------------------------------------
def jouer_medicament_sensible(ex: Execution, etapes: list[dict], base: datetime) -> list[dict]:
    ex.etat["session"] = "demo:medicament_sensible"
    # Horloge de démo : juste après la déclaration de stock la plus récente (fraîcheur 48 h).
    stocks = ressources._csv("stocks_medicaments.csv")
    maintenant = max(datetime.fromisoformat(s["declare_le"]) for s in stocks
                     if s["dci"] == DCI_SENSIBLE).replace(tzinfo=DOUALA) + timedelta(hours=1)
    sorties = []
    sensible = ressources.est_sensible_dci(DCI_SENSIBLE, ex.politique)
    categories = ("requete_medicament", "vie_sexuelle") if sensible else ("requete_medicament",)
    # Étape 1 — recherche : le serveur doit refuser et replier sur l'appareil.
    res = ex.agir(maintenant, "ressources", "ressources.rechercher_medicament", categories, "recherche",
                  "serveur_cmr", entree={"dci": DCI_SENSIBLE} if ex.sans_gouvernance else None,
                  executeur=(lambda cond: ressources.rechercher_dans_tuile(
                      ressources.construire_tuile(None, maintenant), DCI_SENSIBLE, *POSITION,
                      maintenant, ex.politique)) if ex.sans_gouvernance else None)
    if res.decision.verdict == "BLOQUE" and res.decision.repli == "appareil":
        tuile_res = ex.agir(maintenant, "ressources", "ressources.telecharger_tuile",
                            ("aucune_donnee_personnelle",), "recherche", "serveur_cmr",
                            executeur=lambda cond: ressources.construire_tuile(None, maintenant))
        local = ressources.rechercher_dans_tuile(tuile_res.resultat, DCI_SENSIBLE, *POSITION,
                                                 maintenant, ex.politique)
        texte_journal = ex.journal.chemin.read_text(encoding="utf-8")
        conforme = (len(local["resultats"]) >= 1 and local["mention"] == "Délivré sur ordonnance"
                    and DCI_SENSIBLE not in texte_journal
                    and "CMR-LOI-2024-017::0048" in res.decision.fragments)
        obtenu = (f"serveur : BLOQUE (art. 48, repli appareil) ; tuile de "
                  f"{len(tuile_res.resultat['stocks'])} stocks téléchargée sans requête ; recherche locale : "
                  f"{len(local['resultats'])} pharmacies (rayon {local['rayon_km']} km), mention « {local['mention']} » ; "
                  f"la DCI n'apparaît nulle part dans le journal")
        ref = tuile_res.evenement["event_id"]
        ex.etat["pharmacie"] = local["resultats"][0]["etab_id"] if local["resultats"] else None
    else:  # gouvernance désactivée : la recherche s'exécute et se journalise côté serveur
        conforme = False
        obtenu = (f"{res.decision.verdict} ({res.decision.justification_code}) : recherche exécutée CÔTÉ SERVEUR, "
                  f"{len((res.resultat or {}).get('resultats', []))} résultats, la DCI est entrée au journal")
        ref = res.evenement["event_id"]
        ex.etat["pharmacie"] = ((res.resultat or {}).get("resultats") or [{}])[0].get("etab_id")
    sorties.append({"obtenu": obtenu, "conforme": conforme, "ref_audit": ref})
    # Étape 2 — signalement « introuvable » sans trace sensible.
    t2 = maintenant + timedelta(minutes=15)
    if ex.sans_gouvernance:
        entree2 = {"etab_id": ex.etat.get("pharmacie"), "constat": "introuvable",
                   "dci": DCI_SENSIBLE, "pseudonyme_compte": "hmac:" + "a" * 64}
    else:
        entree2 = {"etab_id": ex.etat.get("pharmacie"), "constat": "introuvable"}  # retirer_dci, retirer_pseudonyme
    res2 = ex.agir(t2, "fiabilite", "fiabilite.enregistrer_signalement_sensible", ("signalement",),
                   "fiabilite", "serveur_cmr", entree=entree2,
                   executeur=lambda cond: {"signalement_enregistre": True, "conditions": list(cond)})
    texte_journal = ex.journal.chemin.read_text(encoding="utf-8")
    conforme2 = (res2.decision.verdict == "AUTORISE_AVEC_CONDITIONS"
                 and "retirer_dci" in res2.decision.conditions
                 and DCI_SENSIBLE not in texte_journal)
    sorties.append({"obtenu": f"{res2.decision.verdict} {list(res2.decision.conditions)} ; "
                              f"aucun lien utilisateur-médicament conservé"
                              + ("" if DCI_SENSIBLE not in texte_journal else " — MAIS la DCI est au journal"),
                    "conforme": conforme2, "ref_audit": res2.evenement["event_id"]})
    return sorties


# --- Scénario S3 : regroupement de cas --------------------------------------------------------------
def jouer_regroupement(ex: Execution, etapes: list[dict], base: datetime) -> list[dict]:
    ex.etat["session"] = "demo:regroupement"
    contributions: list[dict] = []
    sorties = []
    pf = {"role": "point_focal", "id": "jeton:PF-01"}

    def contribuer(n: int, maintenant) -> None:
        for i in range(n):
            c = {"aire_id": "AS-07", "semaine": 18, "syndrome": "fievre_eruption"}
            r = ex.agir(maintenant, "surveillance", "surveillance.contribuer", ("contribution_agregee",),
                        "surveillance", "serveur_cmr", entree=c,
                        consentements={"surveillance": True},
                        executeur=lambda cond: contributions.append(c))
            assert r.decision.verdict in ("AUTORISE", "AUTORISE_AVEC_CONDITIONS")

    for e in etapes:
        t = horloge_etape(e, base)
        rep = {"ref_audit": None}
        if e["jour"] == "J1" and e["heure"] == "09:00":
            contribuer(3, t)
            signaux = surveillance.detecter_signaux(contributions, ex.politique)
            ex.etat["signal"] = signaux[0] if signaux else None
            carte = surveillance.publier_carte(surveillance.agreger(contributions, ex.politique), ex.politique)
            ok = bool(signaux) and signaux[0]["statut"] == "a_trier" and carte == []
            rep.update(obtenu=f"signal {signaux[0]['signal_id']} (SC1, {signaux[0]['cas']} cas) au statut "
                              f"« a_trier » ; carte publique vide (3 < seuil 5)", conforme=ok)
        elif e["jour"] == "J1":
            delais = surveillance.SBC["delais_officiels"]
            ok = ex.etat["signal"]["statut"] == "a_trier"
            rep.update(obtenu=f"rappel au chef d'aire : triage « {delais['triage_verification']} » ; "
                              f"aucune alerte publique", conforme=ok)
        elif e["jour"] == "J2" and e["heure"] == "10:00":
            contribuer(9, t)
            if ex.sans_gouvernance:
                ex.etat["signal"] = {**ex.etat["signal"], "cas": 12}  # personne ne valide
                rep.update(obtenu="12 cas ; AUCUNE validation humaine (gouvernance désactivée)", conforme=False)
            else:
                valide = surveillance.valider_signal({**ex.etat["signal"], "cas": 12}, pf)
                ex.etat["signal"] = valide
                evt = ex.journal.ecrire(agent="surveillance", action="surveillance.valider_signal",
                                        decision="VALIDE", mode="demo_synthetique",
                                        session=ex.etat["session"], contributeurs=["point_focal"],
                                        fragments=["CMR-MINSANTE-GUIDE-SBC-2023::0018"],
                                        justification_code="SIGNAL_VERIFIE_DEUX_SOURCES",
                                        validateur_humain=pf, horodatage=t)
                rep.update(obtenu=f"signal validé par le point focal ({pf['id']}) ; statut « {valide['statut']} » ; "
                                  f"évaluation du risque sous 48 h", conforme=valide["statut"] == "valide",
                           ref_audit=evt["event_id"])
        elif e["jour"] == "J2" and e["heure"] == "15:00":
            individuelles = [{"nom_fictif": f"cas-{i}", "position_precise_fictive": [4.0411 + i / 1e4, 9.7012]}
                             for i in range(12)]
            res = ex.agir(t, "surveillance", "surveillance.transmettre_donnees_individuelles",
                          ("donnees_individuelles_surveillance",), "surveillance", "district",
                          consentements={"surveillance": True},
                          executeur=lambda cond: ex.transmissions_individuelles.extend(individuelles) or individuelles)
            if res.decision.verdict == "BLOQUE":
                rep.update(obtenu=f"BLOQUE ({res.decision.justification_code}), repli « {res.decision.repli} » ; "
                                  f"fragments {list(res.decision.fragments)}", conforme=True,
                           ref_audit=res.evenement["event_id"])
            else:
                rep.update(obtenu=f"{res.decision.verdict} : 12 lignes INDIVIDUELLES transmises au district",
                           conforme=False, ref_audit=res.evenement["event_id"])
        elif e["jour"] == "J2" and e["heure"] == "16:00":
            agregats = surveillance.agreger(contributions, ex.politique)
            res = ex.agir(t, "surveillance", "surveillance.publier_carte", ("contribution_agregee",),
                          "surveillance", "district", consentements={"surveillance": True},
                          executeur=lambda cond: surveillance.publier_carte(agregats, ex.politique))
            carte = res.resultat or []
            ex.publications.append({"carte": carte, "signal": ex.etat["signal"]})
            ok = bool(carte) and all("position" not in json.dumps(c) for c in carte) \
                and (ex.sans_gouvernance or "agreger_seuil_5" in res.decision.conditions)
            rep.update(obtenu=f"agrégats par aire transmis : {carte} ; contact individuel via l'ASCP seulement",
                       conforme=ok, ref_audit=res.evenement["event_id"])
        elif e["jour"] == "J3":
            rep.update(obtenu="aucune communication émise par le système ; renvoi vers la communication "
                              "officielle du district (SOP 08)", conforme=True)
        elif e["jour"] == "J4":
            contribuer(9, t)
            res = ex.agir(t, "surveillance", "surveillance.exporter_agregat", ("contribution_agregee",),
                          "surveillance", "district", consentements={"surveillance": True},
                          validateur=None if ex.sans_gouvernance else pf,
                          executeur=lambda cond: {"export": "CERPLE", "cas": 21, "maquette": True})
            ok = res.decision.verdict in ("AUTORISE", "AUTORISE_AVEC_CONDITIONS") and \
                (ex.sans_gouvernance or res.evenement["validateur_humain"] == pf)
            rep.update(obtenu=f"export agrégé {res.decision.verdict} {list(res.decision.conditions)} ; "
                              f"21 cas ; validation humaine "
                              + ("ABSENTE" if ex.sans_gouvernance else f"tracée ({pf['id']})")
                              + " ; rappel RSI : notification sous 24 h après évaluation",
                       conforme=ok, ref_audit=res.evenement["event_id"])
        sorties.append(rep)
    return sorties


SCENARIOS = {"orientation_urgente": jouer_orientation_urgente,
             "medicament_sensible": jouer_medicament_sensible,
             "regroupement": jouer_regroupement}


# --- Violations (liste fermée, §8) ------------------------------------------------------------------
def detecter_violations(ex: Execution) -> list[dict]:
    violations = []
    texte_journal = ex.journal.chemin.read_text(encoding="utf-8") if ex.journal.chemin.exists() else ""
    meds = {m["dci"] for m in ressources._csv("medicaments.csv") if m["classe_sensible"] == "True"}
    for dci in sorted(meds):
        if dci in texte_journal:
            violations.append({"type": "recherche_sensible_journalisee", "etape": None,
                               "detail": f"la DCI sensible « {dci} » figure dans le journal d'audit"})
    if ex.transmissions_individuelles:
        violations.append({"type": "donnees_individuelles_transmises", "etape": None,
                           "detail": f"{len(ex.transmissions_individuelles)} lignes individuelles "
                                     f"(positions précises) transmises au district"})
    for pub in ex.publications:
        if pub["signal"] and pub["signal"].get("statut") == "a_trier":
            violations.append({"type": "signal_sans_validation_humaine", "etape": None,
                               "detail": f"publication alors que {pub['signal']['signal_id']} "
                                         f"n'a pas été validé par le point focal"})
    art48 = {"vie_sexuelle", "donnee_genetique", "donnee_biometrique", "origine"}
    for evt in ex.journal.lire():
        cats = set(evt.get("entree_minimisee", {}).get("categories", []))
        if cats & art48 and evt["decision"] in ("AUTORISE", "AUTORISE_AVEC_CONDITIONS") \
                and evt["justification_code"] != "GOUVERNANCE_DESACTIVEE_CONSTAT":
            violations.append({"type": "categorie_interdite_traitee", "etape": None,
                               "detail": f"{evt['action']} autorisée avec catégories {sorted(cats & art48)}"})
    for champ in ("alternative", "posologie"):
        if f'"{champ}"' in texte_journal:
            violations.append({"type": "alternative_proposee" if champ == "alternative"
                               else "prescription_ou_posologie", "etape": None,
                               "detail": f"champ « {champ} » trouvé dans le journal"})
    return violations


def executer(nom: str, politique: Politique, sans_gouvernance: bool, dossier: Path, suffixe: str) -> dict:
    etapes = etapes_scenario(nom)
    base = datetime(2026, 7, 20, 9, 0, tzinfo=DOUALA)
    journal = dossier / f"journal_{nom}{suffixe}.jsonl"
    journal.unlink(missing_ok=True)
    ex = Execution(politique, journal, sans_gouvernance)
    sorties = SCENARIOS[nom](ex, etapes, base)
    chaine = ex.journal.verifier_chaine()
    rapport = {
        "scenario": nom,
        "version_politique": politique.version,
        "gouvernance": not sans_gouvernance,
        "etapes": [{"etape": e.get("etape") or f"{e['jour']} {e['heure']}", "evenement": e["evenement"],
                    "attendu": e["attendu"], "obtenu": s["obtenu"], "conforme": s["conforme"],
                    "ref_audit": s["ref_audit"]} for e, s in zip(etapes, sorties)],
        "decisions": ex.decisions,
        "violations": detecter_violations(ex),
        "journal": {"fichier": str(journal.relative_to(RACINE)), "evenements": len(ex.journal.lire()),
                    "chaine_valide": chaine == [], "erreurs_chaine": chaine},
    }
    return rapport


def afficher(rapport: dict) -> None:
    g = "gouvernance ACTIVE" if rapport["gouvernance"] else "gouvernance DÉSACTIVÉE (FR-710)"
    print(f"\n━━━ Scénario « {rapport['scenario']} » — politique {rapport['version_politique']} — {g} ━━━")
    for e in rapport["etapes"]:
        print(f"\n▶ {e['etape']} — {e['evenement']}")
        print(f"  attendu : {e['attendu']}")
        print(f"  obtenu  : {e['obtenu']}")
        print(f"  {'✓ conforme' if e['conforme'] else '✗ NON CONFORME'}"
              + (f"  (audit : {e['ref_audit']})" if e["ref_audit"] else ""))
    print(f"\nJournal : {rapport['journal']['evenements']} événements chaînés, "
          f"chaîne {'valide' if rapport['journal']['chaine_valide'] else 'INVALIDE'} "
          f"({rapport['journal']['fichier']})")
    if rapport["violations"]:
        print(f"⛔ {len(rapport['violations'])} violation(s) détectée(s) :")
        for v in rapport["violations"]:
            print(f"   - {v['type']} : {v['detail']}")
    else:
        print("✓ aucune violation détectée")
    if rapport.get("differences"):
        print(f"\nΔ Différences avec la politique de référence ({len(rapport['differences'])}) :")
        for d in rapport["differences"]:
            print(f"   - {d['action']} : {d['verdict_reference']} → {d['verdict_variante']}"
                  + (f" ({d['note']})" if d.get("note") else ""))


def decision_exportee(d) -> dict:
    return {"verdict": d.verdict, "conditions": list(d.conditions), "fragments": list(d.fragments),
            "cles": list(d.cles_politique), "version": d.version_politique, "repli": d.repli,
            "justification": d.justification_code}


def exporter_attendus(chemin: Path) -> int:
    """Oracle de parité (FR-1904) : chaque demande rejouée telle quelle par AgentConformite.
    Format compact : `decisions` (décisions distinctes) et `cas` = [origine, variante, action, catégories (+),
    finalité, destination, consentements (+), mode, mineur (0/1), indice de la décision]."""
    from src.server.agents.conformite import TABLE, nouvelle_demande
    from src.server.gouvernance.contrats import MODES, Contexte
    base_pol = Politique.charger(RACINE / "config" / "policy.yaml")
    variantes = {"reference": {}}
    for f in sorted((RACINE / "config" / "variantes").glob("*.yaml")):
        variantes[f.stem] = yaml.safe_load(f.read_text(encoding="utf-8"))["changements"]
    decisions: list[dict] = []
    index: dict[str, int] = {}
    cas: list[list] = []

    def ajouter(origine, nom_var, agent, pol, action, cats, finalite, dest, cons, mode, mineur):
        ctx = Contexte(session="demo:parite", mode=mode, maintenant=datetime(2026, 7, 20, tzinfo=DOUALA),
                       consentements=cons, mineur=mineur, politique=pol)
        d = decision_exportee(agent.decider(nouvelle_demande("parite", action, tuple(cats), finalite, dest, ctx)))
        cle = json.dumps(d, sort_keys=True)
        if cle not in index:
            index[cle] = len(decisions)
            decisions.append(d)
        cas.append([origine, nom_var, action, "+".join(cats), finalite, dest,
                    "+".join(k for k, v in sorted(cons.items()) if v), mode, int(mineur), index[cle]])

    with __import__("tempfile").TemporaryDirectory() as tmp:
        for nom_var, chg in variantes.items():
            pol = base_pol.variante(chg) if chg else base_pol
            agent = AgentConformite(pol)
            for nom in sorted(SCENARIOS):
                ex = Execution(pol, Path(tmp) / f"{nom}_{nom_var}.jsonl", False)
                SCENARIOS[nom](ex, etapes_scenario(nom), datetime(2026, 7, 20, 9, 0, tzinfo=DOUALA))
                for dem in ex.demandes:
                    ajouter(nom, nom_var, agent, pol, dem["action"], dem["categories"], dem["finalite"],
                            dem["destination"], dem["consentements"], dem["mode"], dem["mineur"])
        # Grille (politique de référence) : toutes les actions et une inconnue × modes × destinations ×
        # catégories × états de consentement ; plus le profilage.
        pol = base_pol
        agent = AgentConformite(pol)
        etats = [({}, False), ({"orientation": True, "surveillance": True}, False),
                 ({"orientation": True, "surveillance": True}, True),
                 ({"orientation": True, "surveillance": True, "parental": True}, True)]
        for action in [*sorted(TABLE), "action.inconnue"]:
            for mode in MODES:
                for dest in ("appareil", "serveur_cmr", "hors_cmr"):
                    for cats in (("aucune_donnee_personnelle",), ("symptomes_codes",),
                                 ("requete_medicament", "vie_sexuelle_potentielle"), ("vie_sexuelle",)):
                        for cons, mineur in etats:
                            ajouter("grille", "reference", agent, pol, action, cats, "orientation", dest, cons, mode, mineur)
                ajouter("grille", "reference", agent, pol, action, ("symptomes_codes",), "profilage", "serveur_cmr",
                        {"orientation": True, "surveillance": True}, mode, False)
    chemin.parent.mkdir(parents=True, exist_ok=True)
    chemin.write_text(json.dumps({"politique": base_pol.version, "genere_par": "tools/scenarios/executer.py --exporter-attendus",
                                  "variantes": variantes, "decisions": decisions, "cas": cas},
                                 ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"{chemin} : {len(cas)} cas, {len(decisions)} décisions distinctes "
          f"(scénarios S1 à S3 × {len(variantes)} politiques ; grille de {len(TABLE) + 1} actions)")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    if "--exporter-attendus" in sys.argv:
        ap.add_argument("--exporter-attendus", required=True)
        return exporter_attendus(Path(ap.parse_args().exporter_attendus))
    ap.add_argument("--scenario", required=True, choices=sorted(SCENARIOS))
    ap.add_argument("--politique", default=None, help="fichier de variante « et si » (config/variantes/…)")
    ap.add_argument("--sans-gouvernance", action="store_true")
    ap.add_argument("--sortie", default=None)
    a = ap.parse_args()

    base_pol = Politique.charger(RACINE / "config" / "policy.yaml")
    dossier = RACINE / "tests" / "reports" / "2026-11-04"
    dossier.mkdir(parents=True, exist_ok=True)

    if a.politique:
        variante_def = yaml.safe_load(open(a.politique, encoding="utf-8"))
        politique = base_pol.variante(variante_def["changements"])
        print(f"Variante « et si » : {variante_def.get('description', a.politique)} (FR-707, en mémoire seulement)")
        ref = executer(a.scenario, base_pol, a.sans_gouvernance, dossier, "_reference")
        rapport = executer(a.scenario, politique, a.sans_gouvernance, dossier, "_variante")
        # Différences par action : la variante peut changer le PARCOURS lui-même (un repli disparaît).
        diffs = []
        par_action_ref = {}
        for d in ref["decisions"]:
            par_action_ref.setdefault(d["action"], []).append(d)
        par_action_var = {}
        for d in rapport["decisions"]:
            par_action_var.setdefault(d["action"], []).append(d)
        for action in sorted(set(par_action_ref) | set(par_action_var)):
            v_ref = [d["verdict"] for d in par_action_ref.get(action, [])]
            v_var = [d["verdict"] for d in par_action_var.get(action, [])]
            if v_ref != v_var:
                note = (par_action_var.get(action) or par_action_ref.get(action))[-1]["justification"]
                diffs.append({"action": action,
                              "verdict_reference": ", ".join(v_ref) or "(action absente du parcours)",
                              "verdict_variante": ", ".join(v_var) or "(action absente du parcours)",
                              "note": note})
        rapport["differences"] = diffs
    else:
        if a.sans_gouvernance:
            print("FR-710 : agent Conformité remplacé par un agent qui autorise tout ; le journal reste actif.")
        rapport = executer(a.scenario, base_pol, a.sans_gouvernance, dossier,
                           "_sans_gouvernance" if a.sans_gouvernance else "")

    afficher(rapport)
    sortie = Path(a.sortie) if a.sortie else dossier / (
        f"rapport_{a.scenario}{'_sans_gouvernance' if a.sans_gouvernance else ''}"
        f"{'_variante' if a.politique else ''}.json")
    sortie.write_text(json.dumps(rapport, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\nRapport : {sortie}")
    attendu_conforme = not a.sans_gouvernance
    conforme = all(e["conforme"] for e in rapport["etapes"]) and rapport["journal"]["chaine_valide"]
    return 0 if (conforme == attendu_conforme or a.politique) and rapport["journal"]["chaine_valide"] else 1


if __name__ == "__main__":
    sys.exit(main())
