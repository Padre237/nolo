"""Logique de référence des recherches de l'agent Ressources et du score de l'agent Fiabilité.

Implémente les règles de rules/recherche_specialite.yaml, rules/disponibilites.yaml et
rules/fiabilite_pharmacies.yaml sur les données simulées de data/synthetic/.
Chaque fonction renvoie (résultats, journal) : le journal est une liste d'entrées d'audit JSON
(règle appliquée, fichier de règle, décision) à verser dans le journal d'audit du système.
"""
from __future__ import annotations

import csv
import math
import unicodedata
from datetime import datetime
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
RULES = {k: yaml.safe_load(open(ROOT / "rules" / f"{k}.yaml", encoding="utf-8"))
         for k in ("recherche_specialite", "disponibilites", "fiabilite_pharmacies")}


def _csv(name):
    return list(csv.DictReader(open(ROOT / "data" / "synthetic" / name, encoding="utf-8")))


ETABS = _csv("etablissements.csv")
MEDS = {m["dci"]: m for m in _csv("medicaments.csv")}
STOCKS = _csv("stocks_medicaments.csv")
SANG = _csv("stocks_sang.csv")
REPORTS = _csv("signalements.csv")


def _norm(t: str) -> str:
    t = unicodedata.normalize("NFKD", t.lower().strip())
    return "".join(c for c in t if not unicodedata.combining(c))


def distance_km(a_lat, a_lon, b_lat, b_lon) -> float:
    r = 6371.0
    p1, p2 = math.radians(a_lat), math.radians(b_lat)
    dp, dl = p2 - p1, math.radians(b_lon - a_lon)
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(h))


def ouvert(etab: dict, now: datetime) -> bool:
    if etab["ouvert_24h"] == "True":
        return True
    debut, fin = etab["horaires"].split("-")
    return debut <= now.strftime("%H:%M") < fin


def _log(regle, fichier, decision, **extra):
    return {"regle": regle, "source_regle": f"rules/{fichier}.yaml", "decision": decision, **extra}


def _round_position(lat, lon):
    d = RULES["recherche_specialite"]["recherche"]["position"]["arrondi_decimales"]
    return round(lat, d), round(lon, d)


def _expanding(candidates, lat, lon, now, journal, key_extra=None):
    """Recherche par paliers de rayon (5 km puis 10, 20, 50) jusqu'à atteindre le minimum de résultats."""
    r = RULES["recherche_specialite"]["recherche"]
    paliers = [r["rayon_initial_km"]] + r["paliers_elargissement_km"]
    found = []
    for rayon in paliers:
        found = []
        for e in candidates:
            d = distance_km(lat, lon, float(e["lat"]), float(e["lon"]))
            if d <= rayon:
                found.append({**e, "distance_km": round(d, 1), "ouvert_maintenant": ouvert(e, now)})
        journal.append(_log("elargissement_rayon", "recherche_specialite", f"{len(found)} résultat(s) à {rayon} km", rayon_km=rayon))
        if len(found) >= r["resultats_minimum"]:
            break
    found.sort(key=lambda x: (not x["ouvert_maintenant"], x["distance_km"]) if key_extra is None else key_extra(x))
    return found, rayon


def code_specialite(saisie: str) -> str | None:
    s = _norm(saisie)
    for code, syn in RULES["recherche_specialite"]["specialites"].items():
        if s == _norm(code) or s in {_norm(x) for x in syn}:
            return code
    return None


def rechercher_specialite(saisie: str, lat: float, lon: float, now: datetime):
    journal = []
    lat, lon = _round_position(lat, lon)
    code = code_specialite(saisie)
    if code is None:
        journal.append(_log("liste_fermee_specialites", "recherche_specialite", "saisie non reconnue : proposer la liste"))
        return {"code": None, "resultats": [], "bandeau": RULES["recherche_specialite"]["bandeau_fixe"]}, journal
    sensible = code in RULES["recherche_specialite"]["recherches_sensibles"]
    journal.append(_log("recherche_sensible", "recherche_specialite",
                        "anonyme, sans journalisation de l'identité" if sensible else "recherche ordinaire", code=code))
    cands = [e for e in ETABS if code in e["services"].split(";")]
    res, rayon = _expanding(cands, lat, lon, now, journal)
    journal.append(_log("tri_sans_critere_payant", "recherche_specialite", "tri : ouvert maintenant, puis distance"))
    return {"code": code, "sensible": sensible, "rayon_km": rayon, "resultats": res,
            "bandeau": RULES["recherche_specialite"]["bandeau_fixe"]}, journal


def score_fiabilite(etab_id: str, now: datetime, reports=None, _ignorer_rafale=False):
    """Score lissé et pondéré dans le temps ; gel en cas de rafale de signalements négatifs
    (pendant le gel, le score affiché est celui calculé sans les signalements de la rafale)."""
    R = RULES["fiabilite_pharmacies"]
    reports = REPORTS if reports is None else reports
    pos = tot = 0.0
    negatifs_recents = 0
    nb = 0
    for r in reports:
        if r["etab_id"] != etab_id:
            continue
        t = datetime.fromisoformat(r["horodatage"])
        age_j = (now - t).total_seconds() / 86400
        if age_j > R["score"]["fenetre_jours"] or age_j < 0:
            continue
        effet = R["signalement"]["choix_utilisateur"][r["resultat"]]["effet"]
        if effet == "neutre":
            continue
        w = 0.5 ** (age_j / 15)
        if int(r["age_compte_jours"]) < R["signalement"]["limites"]["comptes_recents_jours"]:
            w *= 0.5
        if effet == "negatif":
            if age_j * 24 <= R["anti_manipulation"]["rafale"]["fenetre_h"]:
                negatifs_recents += 1
                if _ignorer_rafale:
                    continue
            if int(r["age_declaration_h"]) >= R["signalement"]["validite"]["declaration_recente_h"]:
                w *= 0.25  # stock non à jour plutôt que fausse déclaration
        else:
            pos += w
        tot += w
        nb += 1
    gel = negatifs_recents >= R["anti_manipulation"]["rafale"]["seuil_signalements_negatifs"]
    if gel and not _ignorer_rafale:
        fige = score_fiabilite(etab_id, now, reports, _ignorer_rafale=True)
        return {**fige, "gel": True, "negatifs_3h": negatifs_recents,
                "statut": "baisse gelée : revue par le modérateur humain"}
    score = (pos + 2) / (tot + 4)
    return {"etab_id": etab_id, "score": round(100 * score), "n": nb, "gel": gel,
            "negatifs_3h": negatifs_recents, "statut": "normal"}


def rechercher_medicament(dci: str, lat: float, lon: float, now: datetime, score_geles=None):
    journal = []
    D = RULES["disponibilites"]["medicaments"]
    lat, lon = _round_position(lat, lon)
    if dci not in MEDS:
        journal.append(_log("catalogue_dci", "disponibilites", "médicament inconnu du catalogue"))
        return {"resultats": []}, journal
    sensible = MEDS[dci]["classe_sensible"] == "True"
    journal.append(_log("classes_sensibles", "disponibilites",
                        "recherche anonyme, signalements pseudonymisés" if sensible else "recherche ordinaire", dci=dci))
    pharmas = {e["etab_id"]: e for e in ETABS if e["type"] in RULES["disponibilites"]["etablissements_autorises_a_declarer"]["medicaments"]}
    cands = []
    for s in STOCKS:
        if s["dci"] != dci or s["disponible"] != "True" or s["etab_id"] not in pharmas:
            continue
        age_h = (now - datetime.fromisoformat(s["declare_le"])).total_seconds() / 3600
        if age_h > D["expiration_declaration_h"]:
            journal.append(_log("expiration_declaration", "disponibilites", f"{s['etab_id']} écartée (déclaration de {age_h:.0f} h)"))
            continue
        e = dict(pharmas[s["etab_id"]])
        e["age_declaration_h"] = round(age_h)
        e["stock_non_confirme_recemment"] = age_h > D["fraicheur_declaration_h"]
        sc = score_fiabilite(e["etab_id"], now)
        if score_geles and e["etab_id"] in score_geles:
            sc["score"] = score_geles[e["etab_id"]]
        e["fiabilite"] = sc
        cands.append(e)
    ecart = RULES["disponibilites"]["classement_resultats_medicaments"]["departage_si_ecart_distance_km_inferieur_a"]
    res, rayon = _expanding(cands, lat, lon, now, journal,
                            key_extra=lambda x: (not x["ouvert_maintenant"], math.floor(x["distance_km"] / ecart), -x["fiabilite"]["score"]))
    for i, e in enumerate(res, 1):
        e["explication"] = (f"Classée {i} : à {e['distance_km']} km, stock déclaré il y a {e['age_declaration_h']} h, "
                            f"déclarations fiables à {e['fiabilite']['score']} % sur {e['fiabilite']['n']} vérifications")
    journal.append(_log("classement_resultats_medicaments", "disponibilites", "filtre disponibilité ; distance puis fiabilité ; aucun critère payant"))
    return {"dci": dci, "sensible": sensible, "mention": D["mention_obligatoire"], "rayon_km": rayon, "resultats": res}, journal


def demander_alternative(dci: str):
    """Toute demande d'alternative ou de posologie est refusée (loi 90/035 ; ordonnance obligatoire)."""
    return {"refus": True, "message": "Je ne peux pas proposer d'alternative ni de posologie. Adressez-vous à un pharmacien ou à un médecin."}, \
        [_log("interdits", "disponibilites", "refus : suggerer_une_alternative / indiquer_une_posologie", dci=dci)]


def rechercher_sang(groupe: str, lat: float, lon: float, now: datetime):
    journal = []
    S = RULES["disponibilites"]["sang"]
    lat, lon = _round_position(lat, lon)
    banques = {e["etab_id"]: e for e in ETABS if "banque_de_sang" in e["services"].split(";")}
    niveaux = {s["etab_id"]: s for s in SANG if s["groupe"] == groupe}
    cands = []
    for eid, e in banques.items():
        s = niveaux.get(eid)
        if not s:
            continue
        age_h = (now - datetime.fromisoformat(s["declare_le"])).total_seconds() / 3600
        cands.append({**e, "niveau": s["niveau"], "age_declaration_h": round(age_h),
                      "non_confirme": age_h > S["fraicheur_declaration_h"]})
    dispo = [c for c in cands if c["niveau"] != "rupture"]
    res, rayon = _expanding(dispo, lat, lon, now, journal)
    if not res:
        journal.append(_log("urgence_nuit", "disponibilites", "aucune banque disponible : orientation vers les urgences"))
    tension = sum(1 for c in cands if c["niveau"] in ("faible", "rupture")) >= len(cands) / 2
    if tension:
        journal.append(_log("appel_au_don", "disponibilites", f"appel au don déclenché pour {groupe}"))
    return {"groupe": groupe, "message": S["message_public"], "rayon_km": rayon,
            "resultats": [{k: r[k] for k in ("etab_id", "nom", "distance_km", "niveau", "ouvert_maintenant", "telephone", "age_declaration_h")} for r in res],
            "appel_au_don": S["appel_au_don"]["message"].format(groupe=groupe) if tension else None}, journal
