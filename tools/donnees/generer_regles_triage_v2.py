"""Outillage de génération des données (hors produit). Génère rules/triage_signes_alerte.v2.yaml (statut UNDER_REVIEW) à partir des sources
PCIME et IITT ; chaque règle porte le texte source exact et les fragments où il figure."""
import csv, json, sys
from pathlib import Path
import yaml
sys.path.insert(0, str(Path(__file__).resolve().parent))
from generer_referentiel_symptomes import resoudre, IITT, PCIME, A, E, C, OUT as RACINE   # même résolution des sources

OUT = RACINE / "rules" / "triage_signes_alerte.v2.yaml"
REF = {r["jeton"]: r for r in csv.DictReader(open(RACINE / "data" / "referentiels" / "symptomes.csv", encoding="utf-8"))}

T12 = ["12_17_ans", "18_50_ans", "51_70_ans", "plus_70_ans"]
TM12 = ["moins_8_jours", "8_jours_2_mois", "2_6_mois", "6_mois_2_ans", "2_5_ans", "5_11_ans"]
TPCIME = ["2_6_mois", "6_mois_2_ans", "2_5_ans"]

COMPOSITES = {
    "hypothermie_ou_fievre": {"au_moins_un": ["fievre"], "note": "hypothermie exclue : mesure de température nécessaire", "src": [(IITT, A, "hypothermie ou fièvre")]},
    "detresse_respiratoire_adulte": {"tous": ["difficulte_respiratoire"], "au_moins_un": ["respiration_tres_rapide_ou_lente", "incapacite_parler_marcher", "confusion_somnolence_agitation", "muscles_accessoires"],
                                     "src": [(IITT, C, "Signes de détresse respiratoire — Adulte :")]},
    "detresse_respiratoire_enfant": {"tous": ["difficulte_respiratoire"], "au_moins_un": ["respiration_tres_rapide_ou_lente", "incapacite_parler_manger_teter", "battement_ailes_nez_geignement", "muscles_accessoires"],
                                     "src": [(IITT, C, "Signes de détresse respiratoire — Enfant :")]},
    "traumatisme_haut_risque_contexte": {"tous": ["traumatisme"], "au_moins_un": ["sous_anticoagulants", "grossesse"],
                                         "src": [(IITT, C, "Patient présentant un trouble de la coagulation ou sous anticoagulants"), (IITT, C, "Grossesse")]},
    "critere_rouge_grossesse": {"tous": ["grossesse"], "au_moins_un": ["saignements_abondants", "douleur_abdominale_severe", "convulsions", "etat_conscience_altere", "cephalee_intense", "troubles_visuels_aigus", "accouchement_declenche", "traumatisme"],
                                "src": [(IITT, A, "GROSSESSE AVEC AU MOINS UN DES CRITÈRES SUIVANTS :")]},
}

R = []  # id, outil, couleur, tranches, condition, [(doc, page, texte)]
def r(i, outil, couleur, tranches, cond, srcs):
    R.append((i, outil, couleur, tranches, cond, srcs))

# --- PCIME, enfant de 2 mois à 5 ans
for i, (cond, txt) in enumerate([
    ({"au_moins_un": ["incapable_de_boire_ou_teter"]}, "L’enfant est-il capable de boire ou de téter ?"),
    ({"au_moins_un": ["vomit_tout"]}, "L’enfant vomit-il tout ce qu’il avale ?"),
    ({"au_moins_un": ["convulsions"]}, "L’enfant a-t-il des convulsions ?"),
    ({"au_moins_un": ["lethargie", "inconscient"]}, "LÉTHARGIIQUE OU INCONSCIENT")], 1):
    r(f"PCIME-SGD-{i:02d}", "pcime", "signe_general_danger", TPCIME, cond,
      [(PCIME, None, txt), (PCIME, None, "Il faut soigner d’urgence un enfant qui présente un signe général de danger")])
r("PCIME-MFTG-01", "pcime", "signe_general_danger", TPCIME, {"tous": ["fievre", "raideur_nuque"]},
  [(PCIME, None, "Si l’enfant qui a de la fièvre présente un signe général de danger ou une raideur de nuque, classez-le dans la catégorie maladie fébrile très grave"), (PCIME, None, "Transférer d’URGENCE à l’hôpital")])
r("PCIME-J-01", "pcime", "jaune_pcime", TPCIME, {"au_moins_un": ["fievre"], "parametre": {"risque_paludisme": "eleve"}},
  [(PCIME, None, "il faut classer l’enfant qui a de la fièvre"), (PCIME, None, "placez-le dans la catégorie jaune")])
r("PCIME-J-02", "pcime", "jaune_pcime", TPCIME, {"tous": ["diarrhee", "sang_dans_selles"]},
  [(PCIME, None, "du sang dans les selles dans la catégorie")])
r("PCIME-J-03", "pcime", "jaune_pcime", TPCIME, {"tous": ["diarrhee"], "duree_jours_min": 14},
  [(PCIME, None, "Si l’enfant a la diarrhée depuis 14 jours ou plus")])

# --- IITT, 12 ans et plus : critères rouges
rouges12 = [
    ({"au_moins_un": ["inconscient"]}, [(IITT, A, "Inconscient")]),
    ({"au_moins_un": ["stridor"]}, [(IITT, A, "Stridor")]),
    ({"au_moins_un": ["detresse_respiratoire_adulte", "cyanose"]}, [(IITT, A, "Détresse respiratoire* ou cyanose centrale")]),
    ({"au_moins_un": ["saignements_abondants"]}, [(IITT, A, "Saignements abondants")]),
    ({"au_moins_un": ["convulsions_actives"]}, [(IITT, A, "Convulsions actives")]),
    ({"au_moins_n": {"n": 2, "parmi": ["etat_conscience_altere", "hypothermie_ou_fievre", "raideur_nuque", "cephalee"]}}, [(IITT, A, "2 des signes suivants : état de conscience altéré ; hypothermie ou fièvre ; raideur cervicale ; maux de tête")]),
    ({"au_moins_un": ["traumatisme_haut_risque", "traumatisme_haut_risque_contexte"]}, [(IITT, A, "Traumatisme à haut risque*"), (IITT, C, "RISQUE DE TRAUMATISMES SÉVÈRES")]),
    ({"tous": ["brulure"], "tranches": ["plus_70_ans"]}, [(IITT, C, "Âge du brûlé < 2 ans ou > 70 ans")]),
    ({"au_moins_un": ["empoisonnement_exposition"]}, [(IITT, A, "Empoisonnement/ingestion ou exposition à des substances chimiques dangereuses*")]),
    ({"au_moins_un": ["membre_menace"]}, [(IITT, A, "Risque d'amputation*"), (IITT, C, "douloureux + au moins un des signes suivants : pâleur, faiblesse, engourdissement ou œdème massif après un traumatisme")]),
    ({"au_moins_un": ["morsure_serpent"]}, [(IITT, A, "Morsure de serpent")]),
    ({"au_moins_un": ["douleur_abdominale_aigue", "douleur_thoracique_aigue"], "tranches": ["51_70_ans", "plus_70_ans"]}, [(IITT, A, "Douleur abdominale ou thoracique aiguë (> 50 ans)")]),
    ({"au_moins_un": ["critere_rouge_grossesse"]}, [(IITT, A, "GROSSESSE AVEC AU MOINS UN DES CRITÈRES SUIVANTS :")]),
]
for i, (cond, srcs) in enumerate(rouges12, 1):
    r(f"IITT12-R-{i:02d}", "iitt_12_ans_plus", "rouge", cond.pop("tranches", T12), cond, srcs)

jaunes12 = [
    (["gonflement_bouche_gorge_cou"], "Gonflement/masse de la bouche, la gorge ou le cou"),
    (["sifflement"], "Sifflement (sans critères rouges)"),
    (["vomit_tout", "diarrhee_continue"], "Vomit tout ou diarrhée continue"),
    (["incapacite_boire_se_nourrir"], "Incapacité à boire ou se nourrir"),
    (["paleur_severe"], "Pâleur sévère (sans critères rouges)"),
    (["saignements_continus"], "Saignements continus (sans critères rouges)"),
    (["evanouissement_recent"], "Évanouissement récent"),
    (["etat_conscience_altere", "agitation_irritabilite"], "État de conscience altéré ou agitation (sans critères rouges)"),
    (["alteration_etat_general"], "Altération de l'état général récent"),
    (["signes_neuro_focaux"], "Signes neurologiques focaux aigus"),
    (["troubles_visuels_aigus"], "Troubles visuels aigus"),
    (["douleur_severe"], "Douleur sévère (sans critères rouges)"),
    (["eruption_aggravation"], "Nouvelle éruption cutanée qui s'aggrave au fil des heures ou desquamation (sans critères rouges)"),
    (["deformation_membre"], "Déformation d'un membre importante et visible"),
    (["fracture_ouverte"], "Fracture ouverte"),
    (["luxation_suspectee"], "Suspicion de luxation"),
    (["traumatisme", "brulure"], "Autre traumatisme/brûlures (sans critères rouges)"),
    (["diagnostic_chirurgie_urgente"], "Diagnostic connu nécessitant une intervention chirurgicale d'urgence"),
    (["douleur_testiculaire"], "Douleur testiculaire/scrotale aiguë ou priapisme"),
    (["incapacite_uriner"], "Incapacité à uriner"),
    (["exposition_prophylaxie"], "Exposition nécessitant une prophylaxie d'urgence (ex. morsure d'animal, blessure par piqûre d'aiguille)"),
    (["grossesse_complications"], "Grossesse adressée pour complications"),
]
for i, (toks, txt) in enumerate(jaunes12, 1):
    r(f"IITT12-J-{i:02d}", "iitt_12_ans_plus", "jaune", T12, {"au_moins_un": toks}, [(IITT, A, txt)])

# --- IITT, moins de 12 ans
rougesE = [
    ({"au_moins_un": ["inconscient"]}, [(IITT, E, "Ne réagit pas")]),
    ({"au_moins_un": ["stridor"]}, [(IITT, E, "Stridor")]),
    ({"au_moins_un": ["detresse_respiratoire_enfant", "cyanose"]}, [(IITT, E, "Détresse respiratoire* ou cyanose centrale")]),
    ({"au_moins_un": ["saignements_abondants"]}, [(IITT, E, "Saignements abondants")]),
    ({"au_moins_un": ["extremites_froides"]}, [(IITT, E, "Extrémités froides")]),
    ({"au_moins_n": {"n": 2, "parmi": ["lethargie", "yeux_creuses", "boit_peu"]}}, [(IITT, E, "2 des signes suivants : léthargie ; yeux creusés ; pli cutané qui s'efface très lentement ; boit peu")]),
    ({"au_moins_un": ["convulsions_actives"]}, [(IITT, E, "Convulsions actives")]),
    ({"tous_groupes": [["etat_conscience_altere", "agitation_irritabilite", "lethargie"], ["raideur_nuque", "hypothermie_ou_fievre"]]}, [(IITT, E, "État de conscience altéré (confusion, agitation, irritabilité permanente ou léthargie) avec raideur de la nuque, hypothermie ou fièvre")]),
    ({"symptome_present": True, "tranches": ["moins_8_jours"]}, [(IITT, E, "Nourrisson < 8 jours")]),
    ({"au_moins_un": ["traumatisme_haut_risque", "traumatisme_haut_risque_contexte"]}, [(IITT, E, "Traumatisme à haut risque*"), (IITT, C, "RISQUE DE TRAUMATISMES SÉVÈRES")]),
    ({"tous": ["brulure"], "tranches": ["moins_8_jours", "8_jours_2_mois", "2_6_mois", "6_mois_2_ans"]}, [(IITT, C, "Âge du brûlé < 2 ans ou > 70 ans")]),
    ({"au_moins_un": ["membre_menace"]}, [(IITT, E, "Risque d'amputation*")]),
    ({"au_moins_un": ["douleur_testiculaire"]}, [(IITT, E, "Douleur testiculaire/scrotale aiguë ou priapisme")]),
    ({"au_moins_un": ["morsure_serpent"]}, [(IITT, E, "Morsure de serpent")]),
    ({"au_moins_un": ["empoisonnement_exposition"]}, [(IITT, E, "Empoisonnement/ingestion ou exposition à des substances chimiques dangereuses*")]),
    ({"au_moins_un": ["critere_rouge_grossesse"], "tranches": ["5_11_ans"]}, [(IITT, E, "Grossesse + critères rouges chez l'adulte")]),
]
for i, (cond, srcs) in enumerate(rougesE, 1):
    r(f"IITTM12-R-{i:02d}", "iitt_moins_12_ans", "rouge", cond.pop("tranches", TM12), cond, srcs)

jaunesE = [
    ({"au_moins_un": ["gonflement_bouche_gorge_cou"]}, "Tout gonflement/masse de la bouche, la gorge ou le cou"),
    ({"au_moins_un": ["sifflement"]}, "Sifflement (sans critères rouges)"),
    ({"au_moins_un": ["incapacite_boire_se_nourrir"]}, "Incapacité à boire ou se nourrir"),
    ({"au_moins_un": ["vomit_tout"]}, "Vomit tout"),
    ({"au_moins_un": ["diarrhee_continue"]}, "Diarrhée continue"),
    ({"au_moins_un": ["paleur_severe"]}, "Pâleur sévère (sans critères rouges)"),
    ({"au_moins_un": ["agitation_irritabilite", "lethargie"]}, "Agitation, irritabilité permanente ou léthargie"),
    ({"au_moins_un": ["douleur_severe"]}, "Douleur sévère"),
    ({"symptome_present": True, "tranches": ["8_jours_2_mois", "2_6_mois"]}, "Tout nourrisson âgé de 8 jours à 6 mois"),
    ({"au_moins_un": ["fonte_musculaire_severe", "oedeme_deux_pieds"]}, "Malnutrition avec fonte musculaire sévère visible OU œdème aux deux pieds"),
    ({"au_moins_un": ["traumatisme", "brulure"]}, "Traumatisme/brûlures (sans critères rouges)"),
    ({"au_moins_un": ["diagnostic_chirurgie_urgente"]}, "Diagnostic connu nécessitant une intervention chirurgicale d'urgence"),
    ({"au_moins_un": ["eruption_aggravation"]}, "Nouvelle éruption cutanée qui s'aggrave au fil des heures ou desquamation (sans critères rouges)"),
    ({"au_moins_un": ["exposition_prophylaxie"]}, "Exposition nécessitant une prophylaxie d'urgence (ex. morsure d'animal)"),
    ({"au_moins_un": ["grossesse"]}, "Grossesse (sans critères rouges)"),
    ({"au_moins_un": ["cephalee"]}, "Maux de tête (sans critères rouges)"),
]
for i, (cond, txt) in enumerate(jaunesE, 1):
    r(f"IITTM12-J-{i:02d}", "iitt_moins_12_ans", "jaune", cond.pop("tranches", TM12), cond, [(IITT, E, txt)])


def atomes(cond):
    out = []
    for k in ("tous", "au_moins_un"):
        out += cond.get(k, [])
    if "au_moins_n" in cond:
        out += cond["au_moins_n"]["parmi"]
    for g in cond.get("tous_groupes", []):
        out += g
    return out


def verifier_atome(a, ou):
    if a in COMPOSITES:
        return
    if a not in REF:
        sys.exit(f"{ou} : jeton inconnu {a}")
    if REF[a]["sensibilite"].startswith("exclu"):
        sys.exit(f"{ou} : jeton exclu utilisé {a}")
    if REF[a]["observable_non_professionnel"] != "oui":
        sys.exit(f"{ou} : jeton non observable utilisé {a}")


def frag(srcs):
    out, txt = [], []
    for doc, page, t in srcs:
        out += resoudre(doc, t, page)
        txt.append(t)
    return list(dict.fromkeys(out)), txt


comp_out = {}
for k, v in COMPOSITES.items():
    for a in atomes(v):
        verifier_atome(a, k)
    f, t = frag(v["src"])
    comp_out[k] = {kk: vv for kk, vv in v.items() if kk != "src"} | {"texte_source": t, "fragments": f}

regles = []
for i, outil, couleur, tranches, cond, srcs in R:
    for a in atomes(cond):
        verifier_atome(a, i)
    f, t = frag(srcs)
    regles.append({"id": i, "outil": outil, "couleur_source": couleur, "tranches": tranches, "condition": cond,
                   "texte_source": t, "fragments": f})

doc = {
    "schema": "triage-regles/2",
    "version": "2.0.0",
    "statut": "UNDER_REVIEW",
    "date": "2026-11-04",
    "validateur_clinique": None,
    "mention_demo": "REGLES_PCIME_IITT_NON_VALIDEES_CAMEROUN",
    "referentiel_symptomes": "data/referentiels/symptomes.csv",
    "decisions": ["D-006", "D-012", "D-018", "D-020", "D-021", "D-022"],
    "niveaux": ["urgence", "consultation_24h", "consultation_48h", "soins_courants"],
    "tranches_age": ["moins_8_jours", "8_jours_2_mois", "2_6_mois", "6_mois_2_ans", "2_5_ans", "5_11_ans", "12_17_ans", "18_50_ans", "51_70_ans", "plus_70_ans"],
    "parametres": {"risque_paludisme": {"valeur": "eleve", "statut": "hypothese", "dependance": "DEP-005"}},
    "correspondance": {
        "signe_general_danger": {"niveau": "urgence", "priorite": "immediate", "statut": "PROPOSITION (D-021)"},
        "rouge": {"niveau": "urgence", "priorite": "immediate", "statut": "PROPOSITION (D-021)"},
        "jaune": {"niveau": "urgence", "priorite": "rapide", "statut": "PROPOSITION (D-021)"},
        "jaune_pcime": {"niveau": "consultation_24h", "statut": "PROPOSITION (D-021)"},
        "aucune_regle": {"niveau": "consultation_48h", "statut": "PROPOSITION (D-021)", "condition": "au moins un symptôme saisi"},
    },
    "semantique": {
        "monotonie": "Chaque condition ne porte que sur la présence de jetons, de composites ou sur la tranche d'âge : ajouter un symptôme ne peut jamais abaisser le niveau (ADR-005).",
        "niveau_retenu": "Le plus élevé parmi les règles satisfaites (urgence > consultation_24h > consultation_48h > soins_courants) ; à niveau égal, priorité immediate > rapide.",
        "implications": "Avant évaluation, les jetons sont complétés par la colonne « implique » du référentiel (fermeture transitive).",
        "operateurs": {"tous": "tous présents", "au_moins_un": "au moins un présent", "au_moins_n": "au moins n parmi la liste",
                       "tous_groupes": "au moins un jeton de chaque groupe", "symptome_present": "au moins un jeton saisi",
                       "duree_jours_min": "durée déclarée ≥ valeur", "parametre": "paramètre de déploiement égal à la valeur"},
        "sans_criteres_rouges": "La mention « (sans critères rouges) » de l'IITT est satisfaite par construction : un critère rouge l'emporte toujours.",
    },
    "exclusions": [
        {"jeton": "agression_sexuelle", "motif": "Art. 48 de la loi 2024/017 (vie sexuelle) ; lecture conservatoire D-008", "lacune": "L13", "fragments": ["CMR-LOI-2024-017::0048"]},
        {"jeton": "priapisme", "motif": "Rattachement possible à la vie sexuelle : exclu en attente de l'avis du juriste (D-022)", "lacune": "L13", "fragments": ["CMR-LOI-2024-017::0048"]},
        {"jeton": "signes_vitaux_haut_risque", "motif": "Étape 3 de l'IITT : mesures (FC, FR, température, SpO2, AVPU) impossibles sans appareil ; non utilisées en auto-orientation", "lacune": "L5"},
        {"jeton": "violence_agressivite", "motif": "Critère d'établissement (comportement au service des urgences), sans objet en auto-orientation"},
        {"jeton": "pli_cutane_lent", "motif": "Signe d'examen clinique ; la règle « 2 des signes » est appliquée sur les 3 signes observables"},
    ],
    "composites": comp_out,
    "regles": regles,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    f.write("# Règles de triage, version 2 — STATUT : UNDER_REVIEW (proposition, non validée cliniquement).\n"
            "# Sources : PCIME (OMS, 2001) et IITT (OMS, CICR, MSF), texte exact et fragments cités par règle.\n"
            "# Remplacera kb/rules/triage_signes_alerte.yaml après approbation (SF-001-04 à SF-001-07). Généré le 2026-11-04.\n")
    yaml.safe_dump(doc, f, allow_unicode=True, sort_keys=False, width=140)
from collections import Counter
print(len(regles), "règles", Counter((x["outil"], x["couleur_source"]) for x in regles), len(comp_out), "composites")
