"""Définition des fiches par type (D-029 §6) : une seule source, servie aussi au client.

Conditions : {"champ": X, "egal": v} · {"champ": X, "contient": v} · {"ou": [...]} · {"et": [...]}.
Une question dont la condition est fausse n'est ni affichée ni enregistrée (FR-ETS-05).
"""
import re

JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche", "feries"]
HEURES = ["ferme"] + [f"{h:02d}:{m:02d}" for h in range(24) for m in (0, 30)]
SI_PAS_24H = {"champ": "C1", "egal": False}

COMMUN = [
    {"id": "C1", "type": "bool", "obligatoire": True},
    {"id": "C2", "type": "choix_multiple", "options": JOURS, "obligatoire": True, "si": SI_PAS_24H},
    {"id": "C3_sem_o", "type": "choix", "options": HEURES, "obligatoire": True, "si": SI_PAS_24H, "groupe": "C3"},
    {"id": "C3_sem_f", "type": "choix", "options": HEURES, "obligatoire": True, "si": SI_PAS_24H, "groupe": "C3"},
    {"id": "C3_sam_o", "type": "choix", "options": HEURES, "obligatoire": True, "si": SI_PAS_24H, "groupe": "C3"},
    {"id": "C3_sam_f", "type": "choix", "options": HEURES, "obligatoire": True, "si": SI_PAS_24H, "groupe": "C3"},
    {"id": "C3_dim_o", "type": "choix", "options": HEURES, "obligatoire": True, "si": SI_PAS_24H, "groupe": "C3"},
    {"id": "C3_dim_f", "type": "choix", "options": HEURES, "obligatoire": True, "si": SI_PAS_24H, "groupe": "C3"},
    {"id": "C4", "type": "choix", "options": ["oui", "partiel", "non"], "obligatoire": True},
    {"id": "C5", "type": "choix_multiple", "options": ["fr", "en", "autre"], "obligatoire": True},
    {"id": "C6", "type": "choix_multiple", "options": ["especes", "mobile_money", "carte", "assurance"], "obligatoire": True},
    {"id": "C7", "type": "bool", "obligatoire": True, "si": {"champ": "C6", "contient": "assurance"}},
]

OFFICINE = [
    {"id": "O1", "type": "texte", "obligatoire": True, "max": 80},
    {"id": "O2", "type": "case", "obligatoire": True},
    {"id": "O3", "type": "texte", "obligatoire": False, "max": 40, "verificateur_seulement": True},
    {"id": "O4", "type": "bool", "obligatoire": True},
    {"id": "O5", "type": "choix_multiple", "options": ["nuits", "weekends", "feries"], "obligatoire": True,
     "si": {"champ": "O4", "egal": True}},
    {"id": "O6", "type": "bool", "obligatoire": True, "si": SI_PAS_24H},
    {"id": "O7", "type": "bool", "obligatoire": True, "si": {"champ": "C7", "egal": True}},
    # C8 placé après O4 : sa condition dépend de la garde.
    {"id": "C8", "type": "telephone", "obligatoire": True,
     "si": {"ou": [{"champ": "C1", "egal": True}, {"champ": "O4", "egal": True}]}},
]

DEFINITIONS = {"officine": COMMUN + OFFICINE}
TYPES = ["officine", "hopital", "centre_sante", "centre_transfusion"]
TYPES_DISPONIBLES = set(DEFINITIONS)  # fil officine seulement dans cette livraison (D-029 §13)

MOTIF_TEL = re.compile(r"^(\+237)?[26][0-9]{8}$")


def telephone_valide(texte: str) -> bool:
    return bool(MOTIF_TEL.match(re.sub(r"[\s.-]", "", str(texte or ""))))


def condition_vraie(cond, reponses: dict) -> bool:
    if cond is None:
        return True
    if "ou" in cond:
        return any(condition_vraie(c, reponses) for c in cond["ou"])
    if "et" in cond:
        return all(condition_vraie(c, reponses) for c in cond["et"])
    valeur = reponses.get(cond["champ"])
    if "egal" in cond:
        return valeur == cond["egal"]
    if "contient" in cond:
        return isinstance(valeur, list) and cond["contient"] in valeur
    raise ValueError(f"Condition inconnue : {cond}")


def _vide(v) -> bool:
    return v is None or v == "" or v == []


def valider_fiche(type_ets: str, reponses: dict) -> tuple[dict, list[dict]]:
    """Renvoie (réponses nettoyées, erreurs). Les questions masquées sont retirées."""
    definition = DEFINITIONS[type_ets]
    propres, erreurs = {}, []
    for q in definition:
        if not condition_vraie(q.get("si"), propres):
            continue  # masquée : non enregistrée
        v = reponses.get(q["id"])
        if _vide(v):
            if q["obligatoire"]:
                erreurs.append({"champ": q["id"], "code": "E-FICHE-OBLIGATOIRE"})
            continue
        t = q["type"]
        if t == "bool" and not isinstance(v, bool):
            erreurs.append({"champ": q["id"], "code": "E-FICHE-VALEUR"}); continue
        if t == "case" and v is not True:
            erreurs.append({"champ": q["id"], "code": "E-FICHE-OBLIGATOIRE"}); continue
        if t == "choix" and v not in q["options"]:
            erreurs.append({"champ": q["id"], "code": "E-FICHE-VALEUR"}); continue
        if t == "choix_multiple":
            if not isinstance(v, list) or any(x not in q["options"] for x in v):
                erreurs.append({"champ": q["id"], "code": "E-FICHE-VALEUR"}); continue
            v = [x for x in q["options"] if x in v]  # ordre canonique, sans doublon
        if t == "texte":
            v = str(v).strip()[: q.get("max", 200)]
        if t == "telephone" and not telephone_valide(v):
            erreurs.append({"champ": q["id"], "code": "E-FICHE-TELEPHONE"}); continue
        propres[q["id"]] = v
    # Cohérence des horaires : ouverture et fermeture vont ensemble.
    for jour in ("sem", "sam", "dim"):
        o, f = propres.get(f"C3_{jour}_o"), propres.get(f"C3_{jour}_f")
        if o and f and (o == "ferme") != (f == "ferme"):
            erreurs.append({"champ": f"C3_{jour}_f", "code": "E-FICHE-HORAIRES"})
    return propres, erreurs


def definition_publique(type_ets: str) -> list[dict]:
    return [{k: v for k, v in q.items()} for q in DEFINITIONS[type_ets]]
