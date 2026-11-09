"""Tests des nouveaux cas d'usage sur les données simulées. Usage : python services/test_services.py"""
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import orientation_services as S

NOW = datetime(2026, 10, 20, 22, 0)
LAT, LON = 4.0500, 9.7000  # utilisateur au centre du district simulé
ok = 0


def check(cond, msg):
    global ok
    print(("OK  " if cond else "ECHEC ") + msg)
    cond = bool(cond)
    ok += cond
    return cond


# Recherche par spécialité
r, j = S.rechercher_specialite("neurologue", LAT, LON, NOW)
check(r["code"] == "neurologie" and r["rayon_km"] > 5 and len(r["resultats"]) >= 1,
      f"neurologue -> neurologie, rayon élargi à {r['rayon_km']} km, {len(r['resultats'])} résultat(s) (le plus proche à {r['resultats'][0]['distance_km']} km)")
r, j = S.rechercher_specialite("cœur", LAT, LON, NOW)
check(r["code"] == "cardiologie" and all("payant" not in x["decision"] for x in j), f"« cœur » -> cardiologie, {len(r['resultats'])} résultats, aucun critère payant")
r, j = S.rechercher_specialite("psychiatrie", LAT, LON, NOW)
check(r["sensible"] and r["bandeau"].startswith("En cas d'urgence"), "psychiatrie : recherche sensible + bandeau d'urgence fixe")
r, j = S.rechercher_specialite("xyz", LAT, LON, NOW)
check(r["code"] is None, "saisie inconnue : aucun résultat inventé")

# Fiabilité et anti-manipulation
s20 = S.score_fiabilite("PH-20", NOW)
check(s20["gel"] and s20["score"] >= 70, f"PH-20 : rafale détectée ({s20['negatifs_3h']} négatifs en 3 h) -> baisse gelée, score affiché {s20['score']} %, revue humaine")
s25 = S.score_fiabilite("PH-25", NOW)
others = [S.score_fiabilite(p, NOW)["score"] for p in ("PH-19", "PH-21", "PH-22")]
check(s25["score"] < min(others), f"PH-25 réellement peu fiable : {s25['score']} % contre {others}")

# Médicament ordinaire et sensible
r, j = S.rechercher_medicament("amoxicilline", LAT, LON, NOW)
check(r["mention"] == "Délivré sur ordonnance" and r["resultats"], f"amoxicilline : {len(r['resultats'])} pharmacie(s) ; 1re : {r['resultats'][0]['explication']}")
check(all(x["type"] in ("officine_agreee", "pharmacie_hospitaliere") for x in r["resultats"]), "seuls des établissements agréés apparaissent")
r, j = S.rechercher_medicament("tenofovir_lamivudine_dolutegravir", LAT, LON, NOW)
check(r["sensible"] and len(r["resultats"]) <= 2, f"ARV : classe sensible, {len(r['resultats'])} résultat(s)")
r, j = S.demander_alternative("amoxicilline")
check(r["refus"], "demande d'alternative : refusée")

# Sang
r, j = S.rechercher_sang("O-", LAT, LON, NOW)
check(all(x["niveau"] != "rupture" for x in r["resultats"]) and r["appel_au_don"], f"O- : {len(r['resultats'])} banque(s) disponible(s) à {r['rayon_km']} km ; appel au don déclenché")
print(f"\n{ok}/11 tests réussis")
