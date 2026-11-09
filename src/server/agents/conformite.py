"""SF-007-03 (incrément démo D-025) — Agent Conformité.

Ordre d'évaluation (§2 des contrats) : (1) catégories interdites de l'art. 48 → BLOQUE sans exception
(FR-712) ; (2) mode (FR-714) ; (3) consentement exprès de la finalité ; (4) profilage (FR-704) ;
(5) destination (FR-705, FR-715) ; (6) règles propres à l'action (table §3). La première règle qui
bloque l'emporte. Toute décision cite au moins un fragment, sauf BLOQUE_SANS_FONDEMENT (FR-702).
Aucune valeur juridique n'est codée en dur : tout vient de `Politique` ; les fragments cités par
action viennent de la table §3, reproduite ici comme donnée.
"""
from __future__ import annotations

import uuid

from ..gouvernance.contrats import Contexte, DecisionConformite, DemandeConformite

ART48 = "CMR-LOI-2024-017::0048"
ART9 = "CMR-LOI-2024-017::0011"
ART19 = "CMR-LOI-2024-017::0020"
ART32 = "CMR-LOI-2024-017::0033"
ART44 = "CMR-LOI-2024-017::0044"
ART65_66 = "CMR-LOI-2024-017::0062"
AI_ACT_JOURNAL = "INT-UE-AI-ACT-2024-1689::0032"
RSI_ART45 = "INT-OMS-RSI-2005-AMENDE-2022::0054"
PHARM_ART52 = "CMR-LOI-90-035::0049"

# Catégories de données (§4) relevant des interdictions de l'art. 48.
CATEGORIES_ART48 = {"vie_sexuelle": "vie_sexuelle", "donnee_genetique": "genetique_sante",
                    "donnee_biometrique": "biometrie_sante", "origine": "origine_raciale_ethnique"}

A, AC, B = "AUTORISE", "AUTORISE_AVEC_CONDITIONS", "BLOQUE"

# Table de décision §3 : action -> {mode: (verdict, conditions, repli, justification)}, fragments, consentement requis.
TABLE: dict[str, dict] = {
    "triage.extraction_llm": {
        "consentement": "orientation", "fragments": [ART9, ART32],
        "modes": {"demo_synthetique": (A, (), None, "EXTRACTION_LOCALE_AUTORISEE"),
                  "sans_donnees_personnelles": (B, (), "extraction_lexicale", "FONCTION_INDISPONIBLE_MODE"),
                  "complet": (A, ("destination_serveur_cmr",), None, "EXTRACTION_LOCALE_AUTORISEE")}},
    "triage.journaliser_decision": {
        "fragments": [ART65_66, AI_ACT_JOURNAL],
        "modes": {"demo_synthetique": (A, (), None, "JOURNAL_DEMO_COMPLET"),
                  "sans_donnees_personnelles": (AC, ("empreinte_seulement",), None, "JOURNAL_PAR_EMPREINTE"),
                  "complet": (AC, ("empreinte_seulement",), None, "JOURNAL_PAR_EMPREINTE")}},
    "orientation.structures": {
        "fragments": [ART9],
        "modes": {"demo_synthetique": (A, (), None, "ORIENTATION_AUTORISEE"),
                  "sans_donnees_personnelles": (AC, ("position_arrondie", "aucun_symptome"), None, "ORIENTATION_ANONYME"),
                  "complet": (A, (), None, "ORIENTATION_AUTORISEE")}},
    "ressources.rechercher_specialite": {"fragments": [ART48], "sensible_bloque": True,
        "modes": {m: (A, (), None, "RECHERCHE_AUTORISEE") for m in ("demo_synthetique", "sans_donnees_personnelles", "complet")}},
    "ressources.telecharger_tuile": {"fragments": [ART48],
        "modes": {m: (A, (), None, "TUILE_SANS_REQUETE") for m in ("demo_synthetique", "sans_donnees_personnelles", "complet")}},
    "ressources.rechercher_medicament": {"fragments": [ART48], "sensible_bloque": True,
        "modes": {m: (A, (), None, "RECHERCHE_AUTORISEE") for m in ("demo_synthetique", "sans_donnees_personnelles", "complet")}},
    "ressources.rechercher_sang": {"fragments": [], "sans_fragment_ok": True,
        "modes": {m: (A, (), None, "AUCUNE_DONNEE_PERSONNELLE") for m in ("demo_synthetique", "sans_donnees_personnelles", "complet")}},
    "fiabilite.enregistrer_signalement": {"fragments": [ART9, ART19],
        "modes": {"demo_synthetique": (AC, ("pseudonymiser",), None, "SIGNALEMENT_PSEUDONYMISE"),
                  "sans_donnees_personnelles": (B, (), None, "FONCTION_INDISPONIBLE_MODE"),
                  "complet": (AC, ("pseudonymiser",), None, "SIGNALEMENT_PSEUDONYMISE")}},
    "fiabilite.enregistrer_signalement_sensible": {"fragments": [ART48],
        "modes": {"demo_synthetique": (AC, ("retirer_dci", "retirer_pseudonyme"), None, "SIGNALEMENT_SANS_TRACE_SENSIBLE"),
                  "sans_donnees_personnelles": (B, (), None, "FONCTION_INDISPONIBLE_MODE"),
                  "complet": (AC, ("retirer_dci", "retirer_pseudonyme"), None, "SIGNALEMENT_SANS_TRACE_SENSIBLE")}},
    "fiabilite.appliquer_baisse": {"fragments": [ART44],
        "modes": {"demo_synthetique": (AC, ("sauf_gel_actif",), None, "BAISSE_SOUS_CONTROLE"),
                  "sans_donnees_personnelles": (B, (), None, "FONCTION_INDISPONIBLE_MODE"),
                  "complet": (AC, ("sauf_gel_actif",), None, "BAISSE_SOUS_CONTROLE")}},
    "declaration.publier": {"fragments": [PHARM_ART52],
        "modes": {"demo_synthetique": (AC, ("declarant_agree",), None, "DECLARATION_AGREEE"),
                  "sans_donnees_personnelles": (AC, ("declarant_agree",), None, "DECLARATION_AGREEE"),
                  "complet": (AC, ("declarant_agree",), None, "DECLARATION_AGREEE")}},
    "surveillance.contribuer": {"consentement": "surveillance", "fragments": [ART9],
        "modes": {"demo_synthetique": (A, (), None, "CONTRIBUTION_CONSENTIE"),
                  "sans_donnees_personnelles": (B, (), None, "FONCTION_INDISPONIBLE_MODE"),
                  "complet": (A, (), None, "CONTRIBUTION_CONSENTIE")}},
    "surveillance.publier_carte": {"fragments": [ART65_66],
        "modes": {"demo_synthetique": (AC, ("agreger_seuil_5", "decaler_7_jours"), None, "CARTE_AGREGEE"),
                  "sans_donnees_personnelles": (A, (), None, "AUCUNE_DONNEE_PERSONNELLE"),
                  "complet": (AC, ("agreger_seuil_5", "decaler_7_jours"), None, "CARTE_AGREGEE")}},
    "surveillance.transmettre_donnees_individuelles": {"fragments": [ART9, RSI_ART45],
        "modes": {m: (B, (), "agregat", "DONNEES_INDIVIDUELLES_INTERDITES")
                  for m in ("demo_synthetique", "sans_donnees_personnelles", "complet")}},
    "surveillance.exporter_agregat": {"fragments": [ART19],
        "modes": {"demo_synthetique": (AC, ("maquette",), None, "EXPORT_MAQUETTE"),
                  "sans_donnees_personnelles": (B, (), None, "FONCTION_INDISPONIBLE_MODE"),
                  "complet": (AC, ("agregats_non_personnels",), None, "EXPORT_AGREGE")}},
    "appel_reseau_sortant": {"fragments": [ART32],
        "modes": {"demo_synthetique": (AC, ("donnees_synthetiques_seulement",), None, "SORTIE_DEMO"),
                  "sans_donnees_personnelles": (AC, ("donnees_anonymisees_seulement",), None, "SORTIE_ANONYMISEE"),
                  "complet": (AC, ("controle_destination",), None, "SORTIE_CONTROLEE")}},
    "interconnexion.externe": {"fragments": [ART19],
        "modes": {"demo_synthetique": (AC, ("agregats_seulement",), None, "INTERCONNEXION_DEMO"),
                  "sans_donnees_personnelles": (B, (), None, "FONCTION_INDISPONIBLE_MODE"),
                  "complet": (B, (), "agregat", "AUTORISATION_ART19_AL2_REQUISE")}},
    "profil.relier_dans_la_duree": {"fragments": [ART44, ART65_66],
        "modes": {m: (B, (), None, "PROFILAGE_INTERDIT") for m in ("demo_synthetique", "sans_donnees_personnelles", "complet")}},
    "donnee_interdite.traiter": {"fragments": [ART48],
        "modes": {m: (B, (), None, "CATEGORIE_INTERDITE_ART48") for m in ("demo_synthetique", "sans_donnees_personnelles", "complet")}},
    "compte.creer": {"fragments": [ART19],
        "modes": {"demo_synthetique": (AC, ("synthetique",), None, "COMPTE_DEMO"),
                  "sans_donnees_personnelles": (B, (), None, "FONCTION_INDISPONIBLE_MODE"),
                  "complet": (A, (), None, "COMPTE_AUTORISE")}},
    "intervention.demander": {"fragments": [ART44],
        "modes": {"demo_synthetique": (A, (), None, "INTERVENTION_HUMAINE"),
                  "sans_donnees_personnelles": (AC, ("reference_decision_seulement",), None, "INTERVENTION_HUMAINE"),
                  "complet": (A, (), None, "INTERVENTION_HUMAINE")}},
    "journal.rejouer": {"fragments": [AI_ACT_JOURNAL],
        "modes": {"demo_synthetique": (AC, ("role_auditeur",), None, "REJEU_AUDITEUR"),
                  "sans_donnees_personnelles": (AC, ("role_auditeur", "entrees_fournies_par_auditeur"), None, "REJEU_AUDITEUR"),
                  "complet": (AC, ("role_auditeur", "entrees_fournies_par_auditeur"), None, "REJEU_AUDITEUR")}},
    "politique.simuler": {"fragments": [ART32],
        "modes": {m: (AC, ("variante_en_memoire",), None, "SIMULATION_AUTORISEE")
                  for m in ("demo_synthetique", "sans_donnees_personnelles", "complet")}},
}


class AgentConformite:
    nom = "conformite"

    def __init__(self, politique):
        self.politique = politique

    def _bloque(self, d: DemandeConformite, justification: str, fragments: list[str],
                cles: tuple[str, ...], repli: str | None = None, verdict: str = B) -> DecisionConformite:
        return DecisionConformite(d.demande_id, verdict, (), tuple(fragments), cles,
                                  self.politique.version, repli, justification)

    def decider(self, d: DemandeConformite) -> DecisionConformite:
        pol = self.politique
        ctx = d.contexte

        # (1) Catégories interdites de l'art. 48 : aucun consentement ne déroge (FR-712, D-008).
        touchees = sorted({CATEGORIES_ART48[c] for c in d.categories_donnees if c in CATEGORIES_ART48})
        if touchees and not pol.valeur("donnees_sensibles.categories_interdites_art48.derogation_par_consentement"):
            repli = "appareil" if d.action.startswith("ressources.") else ("agregat" if d.action.startswith("surveillance.") else None)
            return self._bloque(d, "CATEGORIE_INTERDITE_ART48", [ART48],
                                ("donnees_sensibles.categories_interdites_art48.derogation_par_consentement",), repli)

        regle = TABLE.get(d.action)
        if regle is None:
            return DecisionConformite(d.demande_id, "BLOQUE_SANS_FONDEMENT", (), (), (),
                                      pol.version, None, "ACTION_HORS_CATALOGUE")

        # (2) Mode (FR-714).
        verdict, conditions, repli, justification = regle["modes"][ctx.mode]
        conditions = tuple(conditions)
        if touchees:  # dérogation simulée (« et si ») : tracer la condition
            conditions += ("derogation_art48_simulee",)

        if verdict == B:
            fragments = regle["fragments"] or [ART19]
            return self._bloque(d, justification, fragments, (f"actions.{d.action}",), repli)

        # (3) Consentement exprès de la finalité (nécessaire mais pas suffisant, D-008).
        besoin = regle.get("consentement")
        if besoin and not ctx.consentements.get(besoin):
            return self._bloque(d, "CONSENTEMENT_EXPRES_MANQUANT", [ART9, ART65_66],
                                (f"consentement.{besoin}.base",))
        if ctx.mineur and besoin and not ctx.consentements.get("parental"):
            return self._bloque(d, "MINEUR_SANS_CONSENTEMENT_PARENTAL", [ART9],
                                ("consentement.mineur.exige",))

        # (4) Profilage (FR-704) — par ailleurs bloqué par action dans la table.
        if d.finalite == "profilage" and not pol.valeur("decision_automatisee.profilage.autorise"):
            return self._bloque(d, "PROFILAGE_INTERDIT", [ART44, ART65_66],
                                ("decision_automatisee.profilage.autorise",))

        # (5) Destination (FR-705, FR-715).
        if d.destination == "hors_cmr":
            synthetique = ctx.mode == "demo_synthetique"
            anonyme = set(d.categories_donnees) <= {"aucune_donnee_personnelle", "contribution_agregee"}
            if not (anonyme and pol.valeur("transfert_hors_pays.autorise_donnees_anonymisees")):
                if synthetique and pol.valeur("transfert_hors_pays.autorise_donnees_synthetiques"):
                    conditions += ("donnees_synthetiques_seulement",)
                elif not pol.valeur("transfert_hors_pays.autorise_donnees_personnelles"):
                    return self._bloque(d, "TRANSFERT_SANS_AUTORISATION", [ART32],
                                        ("transfert_hors_pays.autorise_donnees_personnelles",),
                                        repli=pol.valeur("transfert_hors_pays.repli")[0])
        if "destination_serveur_cmr" in conditions and d.destination not in ("serveur_cmr", "appareil"):
            return self._bloque(d, "DESTINATION_NON_AUTORISEE", [ART32], ("transfert_hors_pays",))

        # (6) Règles propres à l'action : recherches sensibles -> sur l'appareil (L11).
        if regle.get("sensible_bloque") and "vie_sexuelle_potentielle" in d.categories_donnees:
            return self._bloque(d, "RECHERCHE_SENSIBLE_SUR_APPAREIL", [ART48],
                                ("donnees_sensibles.revele_vie_sexuelle.traitement",), repli="appareil")

        fragments = tuple(regle["fragments"])
        if not fragments and not regle.get("sans_fragment_ok"):
            return DecisionConformite(d.demande_id, "BLOQUE_SANS_FONDEMENT", (), (), (),
                                      pol.version, None, "AUCUN_FONDEMENT_TROUVE")
        verdict_final = AC if conditions else verdict
        return DecisionConformite(d.demande_id, verdict_final, conditions, fragments,
                                  (f"actions.{d.action}",), pol.version, repli, justification)


class ConformiteSansGouvernance:
    """FR-710 — Mode A/B de démonstration : autorise tout, SANS désactiver le journal.
    N'est instanciable qu'en mode demo_synthetique (contrôlé par l'exécuteur de scénarios)."""
    nom = "conformite_desactivee"

    def __init__(self, politique):
        self.politique = politique

    def decider(self, d: DemandeConformite) -> DecisionConformite:
        return DecisionConformite(d.demande_id, "AUTORISE", (), (), (),
                                  self.politique.version, None, "GOUVERNANCE_DESACTIVEE")


def nouvelle_demande(agent: str, action: str, categories: tuple[str, ...], finalite: str,
                     destination: str, contexte: Contexte) -> DemandeConformite:
    return DemandeConformite(str(uuid.uuid4()), agent, action, categories, finalite, destination, contexte)
