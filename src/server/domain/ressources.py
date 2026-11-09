"""SF-003/SF-004 (incrément démo D-025) — Tuile de zone et recherche de médicament.

Correction de l'écart n° 1 et n° 2 de l'architecture : une recherche qui peut révéler la vie sexuelle
(art. 48, L11) n'est JAMAIS exécutée ni journalisée côté serveur. Le serveur ne sert qu'une TUILE
de zone (tous les stocks, sans la requête) ; `rechercher_dans_tuile` est la fonction que l'appareil
exécute localement — elle est ici pour la démo et les tests, le serveur ne l'appelle jamais avec
une requête utilisateur sensible.
"""
from __future__ import annotations

import csv
import math
from datetime import datetime, timedelta
from pathlib import Path

RACINE = Path(__file__).resolve().parents[3]
KB = RACINE / "kb" if (RACINE / "kb" / "data").exists() else RACINE.parent / "kb"
SYN = KB / "data" / "synthetic"


def _csv(nom: str) -> list[dict]:
    return list(csv.DictReader(open(SYN / nom, encoding="utf-8")))


def distance_km(lat1, lon1, lat2, lon2) -> float:
    r = 6371.0
    p1, p2 = math.radians(float(lat1)), math.radians(float(lat2))
    dp, dl = p2 - p1, math.radians(float(lon2) - float(lon1))
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


def est_sensible_dci(dci: str, politique) -> bool:
    """Classe sensible selon la politique et le catalogue (jamais selon un texte codé en dur)."""
    classes = set(politique.valeur("donnees_sensibles.classes_medicament_sensibles"))
    meds = {m["dci"]: m for m in _csv("medicaments.csv")}
    m = meds.get(dci)
    return bool(m and (m["classe"] in classes or m.get("classe_sensible") == "True"))


def construire_tuile(aire_ids: list[str] | None, maintenant: datetime) -> dict:
    """Tuile de zone téléchargée EN BLOC : tous les stocks de la zone, aucune information de requête.
    Le serveur ne sait pas ce que la personne cherchera dedans (FR-408, ADR-009)."""
    etabs = [e for e in _csv("etablissements.csv") if aire_ids is None or e["aire_id"] in aire_ids]
    ids = {e["etab_id"] for e in etabs}
    stocks = [s for s in _csv("stocks_medicaments.csv") if s["etab_id"] in ids]
    return {
        "zone": sorted(aire_ids) if aire_ids else "district_complet",
        "genere_le": maintenant.isoformat(),
        "etablissements": [{k: e[k] for k in ("etab_id", "nom", "type", "lat", "lon", "aire_id",
                                              "ouvert_24h", "horaires", "agree")} for e in etabs],
        "stocks": stocks,
        "contenu": "stocks_complets_de_zone_sans_requete",
    }


def rechercher_dans_tuile(tuile: dict, dci: str, lat: float, lon: float, maintenant: datetime,
                          politique, rayon_km: float = 5.0, rayon_max_km: float = 20.0) -> dict:
    """Recherche exécutée SUR L'APPAREIL (démo). Fraîcheur : déclaration de moins de 48 h."""
    etabs = {e["etab_id"]: e for e in tuile["etablissements"]}
    limite = maintenant - timedelta(hours=48)
    candidats = []
    for s in tuile["stocks"]:
        if s["dci"] != dci or s["disponible"] != "True":
            continue
        e = etabs.get(s["etab_id"])
        if not e or e["agree"] != "True":
            continue
        declare = datetime.fromisoformat(s["declare_le"])
        if declare.tzinfo is None:
            declare = declare.replace(tzinfo=maintenant.tzinfo)
        if declare < limite:
            continue
        candidats.append({"etab_id": e["etab_id"], "nom": e["nom"],
                          "distance_km": round(distance_km(lat, lon, e["lat"], e["lon"]), 2),
                          "declare_le": s["declare_le"]})
    rayon = rayon_km
    dans_rayon = [c for c in candidats if c["distance_km"] <= rayon]
    while not dans_rayon and rayon < rayon_max_km:
        rayon = min(rayon * 2, rayon_max_km)
        dans_rayon = [c for c in candidats if c["distance_km"] <= rayon]
    return {
        "dci": dci,
        "execution": "sur_appareil",
        "rayon_km": rayon,
        "resultats": sorted(dans_rayon, key=lambda c: c["distance_km"]),
        "mention": politique.valeur("pharmacie.mention_obligatoire"),
        # FR-405 : jamais d'alternative proposée, jamais de posologie.
        "interdits_appliques": politique.valeur("pharmacie.interdits"),
    }
