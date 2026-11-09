"""Génère les données SYNTHÉTIQUES du prototype (aucune donnée réelle de patient).

Sorties (dossier data/synthetic) :
- aires_sante_fictives.csv      : 12 aires de santé fictives d'un district fictif
- patients.csv                  : 600 consultations simulées + niveau de triage attendu
- surveillance_hebdo.csv        : 20 semaines de comptes par aire et par syndrome,
                                  avec un regroupement injecté (fièvre + éruption, AS-07, semaines 18 à 20)
- scenario_regroupement.jsonl   : événements du scénario J1 à J4, révélés progressivement par agent

Usage : python generate_synthetic.py  (graine fixe : résultats reproductibles)
"""
from __future__ import annotations

import csv
import json
import math
import random
from datetime import date, timedelta
from pathlib import Path

random.seed(2026)
OUT = Path(__file__).parent / "data" / "synthetic"
OUT.mkdir(parents=True, exist_ok=True)

AIRES = [{"aire_id": f"AS-{i:02d}", "nom": f"Aire de santé fictive {i:02d}", "district": "DS-FICTIF",
          "population": random.randint(8000, 30000), "milieu": random.choice(["urbain", "urbain", "rural"])}
         for i in range(1, 13)]

PROFILS = [  # (symptômes, plage d'âge, durée en jours, poids)
    (["fievre", "toux"], (1, 70), (1, 5), 18),
    (["fievre", "maux_gorge"], (5, 60), (1, 4), 8),
    (["fievre"], (0, 4), (1, 3), 10),
    (["fievre"], (5, 80), (3, 6), 8),
    (["diarrhee_aqueuse"], (0, 70), (1, 3), 8),
    (["diarrhee", "douleur_abdominale", "sang_dans_selles"], (2, 60), (1, 4), 3),
    (["toux"], (15, 80), (14, 40), 4),
    (["toux", "difficulte_respiratoire"], (0, 4), (1, 4), 4),
    (["cephalee", "fatigue"], (15, 70), (1, 3), 10),
    (["fievre", "eruption_cutanee"], (0, 15), (1, 4), 3),
    (["douleur_thoracique"], (30, 85), (0, 1), 3),
    (["fievre", "raideur_nuque"], (2, 40), (0, 2), 2),
    (["morsure_animal"], (3, 60), (0, 1), 2),
    (["fievre", "jaunissement_yeux"], (10, 60), (2, 7), 2),
    (["incapable_de_boire_ou_teter", "fievre"], (0, 4), (0, 2), 2),
    (["convulsions"], (0, 10), (0, 1), 1),
    (["douleur_dos"], (20, 70), (2, 10), 6),  # hors règles -> SURVEILLANCE
]


def reference_triage(sym: list[str], age: int, duree: int) -> str:
    """Niveau attendu selon rules/triage_signes_alerte.yaml (vérité terrain des tests)."""
    s = set(sym)
    urg = {"douleur_thoracique", "difficulte_respiratoire_severe", "perte_de_conscience", "convulsions",
           "saignements", "raideur_nuque", "paralysie_membre_soudaine"}
    if s & urg or (age <= 4 and s & {"incapable_de_boire_ou_teter", "vomit_tout", "lethargie"}):
        return "URGENCE"
    if (("fievre" in s and age <= 4) or {"fievre", "eruption_cutanee"} <= s or {"diarrhee", "sang_dans_selles"} <= s
            or ("toux" in s and s & {"souffle_court", "difficulte_respiratoire"} and age <= 4)
            or "morsure_animal" in s or {"fievre", "jaunissement_yeux"} <= s):
        return "CONSULTATION_24H"
    if ("toux" in s and duree >= 14) or ("fievre" in s and duree >= 3) or "diarrhee_aqueuse" in s:
        return "CONSULTATION"
    return "SURVEILLANCE"


def poisson(lam: float) -> int:
    l, k, p = math.exp(-lam), 0, 1.0
    while True:
        p *= random.random()
        if p <= l:
            return k
        k += 1


def main() -> None:
    with open(OUT / "aires_sante_fictives.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(AIRES[0]))
        w.writeheader(); w.writerows(AIRES)

    start = date(2026, 6, 1)
    weights = [p[3] for p in PROFILS]
    rows = []
    for i in range(600):
        sym, (a0, a1), (d0, d1), _ = random.choices(PROFILS, weights=weights)[0]
        age = random.randint(a0, a1)
        duree = random.randint(d0, d1)
        rows.append({
            "case_id": f"SYN-{i:04d}",
            "date": (start + timedelta(days=random.randint(0, 139))).isoformat(),
            "age": age, "sexe": random.choice(["F", "M"]),
            "aire_id": random.choice(AIRES)["aire_id"],
            "symptomes": ";".join(sym), "duree_jours": duree,
            "mineur": age < 18,
            "consentement_surveillance": random.random() < 0.8,
            "canal": "application",
            "triage_attendu": reference_triage(sym, age, duree),
            "source": "synthetique",
        })
    with open(OUT / "patients.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader(); w.writerows(rows)

    syndromes = {"GRI": 6.0, "DAA": 2.5, "fievre_eruption": 0.4, "MEN": 0.1}
    series = []
    for wk in range(1, 21):
        for a in AIRES:
            for syn, base in syndromes.items():
                lam = base * a["population"] / 20000
                n = poisson(lam)
                if syn == "fievre_eruption" and a["aire_id"] == "AS-07" and wk >= 18:
                    n += {18: 3, 19: 12, 20: 21}[wk]  # regroupement injecté (scénario)
                series.append({"semaine": wk, "debut_semaine": (start + timedelta(weeks=wk - 1)).isoformat(),
                               "aire_id": a["aire_id"], "syndrome": syn, "cas_signales": n,
                               "injecte": syn == "fievre_eruption" and a["aire_id"] == "AS-07" and wk >= 18})
    with open(OUT / "surveillance_hebdo.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(series[0]))
        w.writeheader(); w.writerows(series)

    # Scénario révélé progressivement : chaque événement n'est visible que des agents listés.
    events = [
        {"jour": "J1", "heure": "09:00", "destinataires": ["surveillance"],
         "evenement": "3 déclarations 'fièvre + éruption' dans l'aire AS-07, dont 2 enfants de la même école",
         "attendu": "Signal SC1 détecté ; statut 'signal à trier' ; transmission au chef d'aire (délai 24 h)"},
        {"jour": "J1", "heure": "18:00", "destinataires": ["district"],
         "evenement": "Le chef d'aire n'a pas encore vérifié le signal",
         "attendu": "Rappel du délai de triage de 24 h (SOP 03) ; aucune alerte publique"},
        {"jour": "J2", "heure": "10:00", "destinataires": ["surveillance", "district"],
         "evenement": "12 déclarations cumulées ; un ASCP confirme 4 cas par visite à domicile",
         "attendu": "Signal vérifié par 2 sources -> événement ; évaluation du risque à lancer sous 48 h (SOP 04)"},
        {"jour": "J2", "heure": "15:00", "destinataires": ["district"],
         "evenement": "Le district demande la liste nominative et les positions GPS exactes des déclarants",
         "attendu": "Agent APDP saisi : données de santé = données sensibles (loi 2024/017)"},
        {"jour": "J2", "heure": "16:00", "destinataires": ["apdp", "conformite"],
         "evenement": "Demande d'accès aux données individuelles",
         "attendu": "Refus des positions exactes ; données agrégées par aire ; contact individuel via l'ASCP seulement ; journalisé"},
        {"jour": "J3", "heure": "11:00", "destinataires": ["district", "conformite"],
         "evenement": "Un journaliste local relaie une rumeur d'épidémie (SC8 : anxiété dans la population)",
         "attendu": "Pas de communication par le système ; renvoi vers la communication officielle (SOP 08)"},
        {"jour": "J4", "heure": "09:00", "destinataires": ["district", "orchestrateur"],
         "evenement": "21 cas cumulés ; prélèvements envoyés au laboratoire",
         "attendu": "Riposte sous 48 h ; notification vers la région (CERPLE) ; rappel des obligations RSI ; validation humaine tracée"},
    ]
    with open(OUT / "scenario_regroupement.jsonl", "w", encoding="utf-8") as f:
        for e in events:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")

    counts = {}
    for r in rows:
        counts[r["triage_attendu"]] = counts.get(r["triage_attendu"], 0) + 1
    print("patients :", len(rows), counts)
    print("séries   :", len(series), "lignes ; regroupement injecté AS-07 semaines 18-20")
    print("scénario :", len(events), "événements")


if __name__ == "__main__":
    main()
