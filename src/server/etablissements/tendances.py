"""Calcul des tendances de la demande (D-032 §3 et §4) à partir des compteurs anonymes.

Garde-fous : semaines ISO complètes seulement ; moins de 5 -> « moins de 5 », hors classement ;
valeurs arrondies à 5 ; aucune donnée brute renvoyée.
"""
from datetime import datetime, timedelta

SEUIL = 5
ARRONDI = 5
SEUIL_TENDANCE, VARIATION_TENDANCE = 20, 0.20
CLASSES = [(5, 19), (20, 49), (50, 99), (100, 199), (200, None)]
TOP = 10

SPECIALITES = {  # liste fermée (recherche_specialite.yaml) moins les spécialités sensibles
    "cardiologie": ("Cardiologie", "Cardiology"), "neurologie": ("Neurologie", "Neurology"),
    "pediatrie": ("Pédiatrie", "Paediatrics"), "ophtalmologie": ("Ophtalmologie", "Ophthalmology"),
    "orl": ("ORL", "ENT"), "dentisterie": ("Dentisterie", "Dentistry"), "dermatologie": ("Dermatologie", "Dermatology"),
    "chirurgie": ("Chirurgie", "Surgery"), "urgences": ("Urgences", "Emergency"), "radiologie": ("Radiologie", "Radiology"),
    "laboratoire": ("Laboratoire", "Laboratory"), "medecine_generale": ("Médecine générale", "General medicine"),
    "banque_de_sang": ("Banque de sang", "Blood bank"),
}
SPECIALITES_SENSIBLES = {"psychiatrie", "oncologie", "infectiologie_vih", "addictologie",
                         "gynecologie_obstetrique", "planification_familiale"}  # FR-305 : jamais comptées
GROUPES_SANGUINS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
TYPES = ("medicament", "specialite", "sang")
NIVEAUX = ("national", "region", "departement", "arrondissement")


def semaine_iso(d: datetime) -> str:
    a, s, _ = d.isocalendar()
    return f"{a}-W{s:02d}"


def semaines_completes(maintenant: datetime, n: int, decalage: int = 0) -> list[str]:
    """Les n semaines ISO complètes avant la semaine en cours (la plus ancienne d'abord)."""
    lundi = (maintenant - timedelta(days=maintenant.weekday())).replace(hour=12, minute=0, second=0, microsecond=0)
    return [semaine_iso(lundi - timedelta(weeks=k)) for k in range(n + decalage, decalage, -1)]


def afficher(n: int):
    """None = « moins de 5 » ; sinon arrondi à 5 près (23 -> 25, 22 -> 20)."""
    if n < SEUIL:
        return None
    return int((n + ARRONDI / 2) // ARRONDI * ARRONDI)


def classe(n: int):
    if n < SEUIL:
        return 0
    for i, (bas, haut) in enumerate(CLASSES, start=1):
        if haut is None or n <= haut:
            return i
    return len(CLASSES)


def dans_zone(zone: str, niveau: str, code: str) -> bool:
    if niveau == "national":
        return True
    if zone.startswith("PROV-") or zone == "NATIONAL":
        return False  # sans code INS validé : niveau national seulement (FR-TEND-04)
    return zone.startswith(code)


def calculer(lignes, niveau, code, semaines, semaines_prec, type_=None, service=None):
    """lignes : (zone, semaine, type, service, satisfaite, n)."""
    cour, prec = set(semaines), set(semaines_prec)
    tot, non_sat, tot_prec, serie, par_zone = {}, {}, {}, {s: 0 for s in semaines}, {}
    for zone, sem, typ, serv, sat, n in lignes:
        if not dans_zone(zone, niveau, code):
            continue
        if type_ and typ != type_:
            continue
        cle = (typ, serv)
        if sem in cour:
            tot[cle] = tot.get(cle, 0) + n
            if not sat:
                non_sat[cle] = non_sat.get(cle, 0) + n
            if service is None or serv == service:
                if not zone.startswith("PROV-") and zone != "NATIONAL":
                    par_zone[zone] = par_zone.get(zone, 0) + n
            if serv == service:
                serie[sem] += n
        elif sem in prec:
            tot_prec[cle] = tot_prec.get(cle, 0) + n

    def tendance(cle):
        c, p = tot.get(cle, 0), tot_prec.get(cle, 0)
        if c >= SEUIL_TENDANCE and p >= SEUIL_TENDANCE and abs(c - p) / p >= VARIATION_TENDANCE:
            return "hausse" if c > p else "baisse"
        return None

    classement = sorted(((k, v) for k, v in tot.items() if v >= SEUIL), key=lambda kv: (-kv[1], kv[0]))[:TOP]
    insatisfaits = sorted(((k, v) for k, v in non_sat.items() if v >= SEUIL and tot[k] >= SEUIL),
                          key=lambda kv: (-kv[1], kv[0]))[:TOP]
    total = sum(v for (t, s), v in tot.items() if service is None or s == service)
    return {
        "periode": {"semaines": semaines, "debut": semaines[0], "fin": semaines[-1]},
        "total": afficher(total),
        "plus_recherches": [{"type": t, "service": s, "valeur": afficher(v), "tendance": tendance((t, s))}
                            for (t, s), v in classement],
        "non_satisfaite": [{"type": t, "service": s, "non_satisfaites": afficher(v),
                            "part": round(100 * v / tot[(t, s)])} for (t, s), v in insatisfaits],
        "serie": [{"semaine": s, "valeur": afficher(v)} for s, v in serie.items()] if service else [],
        "carte": {z: classe(v) for z, v in par_zone.items()},
    }
