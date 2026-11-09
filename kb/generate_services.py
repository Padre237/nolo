"""Génère les données SIMULÉES des nouveaux cas d'usage (recherche de service, médicament, sang, fiabilité).

Tous les établissements, positions, téléphones et stocks sont FICTIFS (positions tirées autour d'un point
de référence ; elles ne correspondent à aucun établissement réel). Graine fixe : résultats reproductibles.

Sorties (data/synthetic) :
  etablissements.csv, medicaments.csv, stocks_medicaments.csv, stocks_sang.csv, signalements.csv,
  scenario_specialite.jsonl, scenario_manipulation.jsonl, scenario_sang_nuit.jsonl,
  scenario_medicament_sensible.jsonl, scenario_ordonnance.jsonl
"""
from __future__ import annotations

import csv
import hashlib
import json
import math
import random
from datetime import datetime, timedelta
from pathlib import Path

random.seed(2027)
OUT = Path(__file__).parent / "data" / "synthetic"
OUT.mkdir(parents=True, exist_ok=True)
CENTRE = (4.0500, 9.7000)            # point de référence fictif du district simulé
NOW = datetime(2026, 10, 20, 22, 0)  # « maintenant » des scénarios (un soir)


def point(rmin_km: float, rmax_km: float) -> tuple[float, float]:
    r, a = random.uniform(rmin_km, rmax_km), random.uniform(0, 2 * math.pi)
    return (round(CENTRE[0] + r * math.cos(a) / 111.0, 5),
            round(CENTRE[1] + r * math.sin(a) / (111.0 * math.cos(math.radians(CENTRE[0]))), 5))


def tel(i: int) -> str:
    return f"+237 000 000 {i:03d}"  # numéros volontairement non attribuables


def write(name: str, rows: list[dict]) -> None:
    with open(OUT / name, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader(); w.writerows(rows)


def jsonl(name: str, rows: list[dict]) -> None:
    with open(OUT / name, "w", encoding="utf-8") as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")


def main() -> None:
    etabs, n = [], 0

    def add(prefix, nom, typ, rng, services, h24=False, horaires="08:00-18:00", statut="declare"):
        nonlocal n
        n += 1
        lat, lon = point(*rng)
        etabs.append({"etab_id": f"{prefix}-{n:02d}", "nom": nom, "type": typ, "lat": lat, "lon": lon,
                      "aire_id": f"AS-{random.randint(1, 12):02d}", "ouvert_24h": h24,
                      "horaires": "24h/24" if h24 else horaires, "telephone": tel(n), "agree": True,
                      "services": ";".join(services), "service_statut": statut, "fictif": True})

    add("HOP", "Hôpital régional fictif", "hopital", (0.5, 2), ["urgences", "cardiologie", "pediatrie", "gynecologie_obstetrique",
        "chirurgie", "radiologie", "laboratoire", "banque_de_sang", "infectiologie_vih", "psychiatrie"], h24=True, statut="verifie")
    add("HOP", "Hôpital de district fictif Nord", "hopital", (3, 4.5), ["urgences", "pediatrie", "gynecologie_obstetrique",
        "medecine_generale", "laboratoire", "banque_de_sang"], h24=True, statut="verifie")
    add("HOP", "Hôpital de district fictif Est", "hopital", (6, 9), ["urgences", "medecine_generale", "chirurgie", "laboratoire",
        "banque_de_sang", "ophtalmologie"], h24=True)
    add("HOP", "Centre hospitalier spécialisé fictif", "hopital", (11, 14), ["neurologie", "cardiologie", "oncologie", "radiologie"],
        horaires="07:30-17:30", statut="verifie")
    for i, svc in enumerate([["cardiologie", "medecine_generale"], ["pediatrie", "dermatologie"], ["ophtalmologie", "orl"],
                             ["dentisterie"], ["gynecologie_obstetrique", "planification_familiale"]]):
        add("CLI", f"Clinique fictive {chr(65 + i)}", "clinique", (1, 7), svc, horaires="08:00-20:00")
    for i in range(8):
        add("CSI", f"Centre de santé fictif {i + 1}", "centre_de_sante", (0.5, 10),
            ["medecine_generale", "pediatrie", "laboratoire"] + (["planification_familiale"] if i % 3 == 0 else []))
    add("CTS", "Centre de transfusion fictif", "centre_transfusion", (8, 10), ["banque_de_sang"], horaires="07:30-15:30", statut="verifie")
    for i in range(16):
        h24 = i in (2, 9)
        add("PH", f"Pharmacie fictive {i + 1:02d}", "officine_agreee", (0.2, 9), [], h24=h24,
            horaires="08:00-21:00" if not h24 else "24h/24")
    for e in [x for x in etabs if x["type"] == "hopital"][:3]:  # pharmacies hospitalières (art. 35 loi 90/035)
        n += 1
        etabs.append({**e, "etab_id": f"PHH-{n:02d}", "nom": "Pharmacie de l'" + e["nom"][0].lower() + e["nom"][1:],
                      "type": "pharmacie_hospitaliere", "services": "", "telephone": tel(n)})
    write("etablissements.csv", etabs)

    meds = [  # DCI ; aucune posologie, aucune marque
        ("paracetamol", "antalgique", False), ("amoxicilline", "antibiotique", False),
        ("artemether_lumefantrine", "antipaludique", False), ("sels_de_rehydratation_orale", "rehydratation", False),
        ("zinc", "rehydratation", False), ("metformine", "antidiabetique", False), ("insuline", "antidiabetique", False),
        ("amlodipine", "antihypertenseur", False), ("salbutamol", "bronchodilatateur", False),
        ("tenofovir_lamivudine_dolutegravir", "antiretroviraux", True), ("levonorgestrel", "contraception", True),
        ("haloperidol", "psychotropes", True), ("rifampicine_isoniazide", "antituberculeux", True),
    ]
    write("medicaments.csv", [{"dci": d, "classe": c, "classe_sensible": s, "delivre_sur_ordonnance": True,
                               "note": "Obligation d'ordonnance : communiqué de juillet 2024, texte officiel à confirmer"}
                              for d, c, s in meds])

    stocks = []
    pharmas = [e for e in etabs if e["type"] in ("officine_agreee", "pharmacie_hospitaliere")]
    for p in pharmas:
        for d, c, s in meds:
            dispo = random.random() < (0.55 if s else 0.8)
            age = random.choice([1, 2, 3, 5, 8, 14, 30, 60])
            stocks.append({"etab_id": p["etab_id"], "dci": d, "disponible": dispo,
                           "declare_le": (NOW - timedelta(hours=age)).isoformat(timespec="minutes")})
    # Scénario sensible : l'ARV n'est déclaré disponible que dans 2 pharmacies
    arv = "tenofovir_lamivudine_dolutegravir"
    keep = {pharmas[3]["etab_id"], pharmas[11]["etab_id"]}
    for s in stocks:
        if s["dci"] == arv:
            s["disponible"] = s["etab_id"] in keep
    write("stocks_medicaments.csv", stocks)

    banks = [e for e in etabs if "banque_de_sang" in e["services"].split(";")]
    sang = []
    for b in banks:
        for g in ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]:
            niveau = random.choices(["disponible", "faible", "rupture"], [6, 3, 1])[0]
            if g == "O-":
                niveau = "disponible" if b["type"] == "centre_transfusion" else "rupture"  # scénario de nuit
            sang.append({"etab_id": b["etab_id"], "groupe": g, "niveau": niveau,
                         "declare_le": (NOW - timedelta(hours=random.choice([1, 2, 4, 5]))).isoformat(timespec="minutes")})
    write("stocks_sang.csv", sang)

    def pseudo(i: int) -> str:
        return hashlib.sha256(f"sel-demo-{i}".encode()).hexdigest()[:16]

    reports, rid = [], 0
    for _ in range(420):  # signalements ordinaires sur 30 jours
        rid += 1
        p = random.choice(pharmas)
        d = random.choice(meds)[0]
        reliable = 0.9 if p["etab_id"] != "PH-25" else 0.55  # une pharmacie réellement peu fiable
        res = random.choices(["trouve", "introuvable_absent_du_stock", "non_delivre_ordonnance_manquante"],
                             [reliable, 1 - reliable, 0.08])[0]
        reports.append({"report_id": f"R{rid:05d}", "pseudo_utilisateur": pseudo(random.randint(1, 260)),
                        "etab_id": p["etab_id"], "dci": d, "resultat": res,
                        "horodatage": (NOW - timedelta(hours=random.randint(1, 720))).isoformat(timespec="minutes"),
                        "age_compte_jours": random.randint(8, 400), "age_declaration_h": random.choice([1, 2, 3, 4, 8, 20]),
                        "campagne_simulee": False})
    target = "PH-20"  # campagne de faux signalements : 14 « introuvable » en 2 h, comptes récents
    for k in range(14):
        rid += 1
        reports.append({"report_id": f"R{rid:05d}", "pseudo_utilisateur": pseudo(1000 + k), "etab_id": target,
                        "dci": random.choice(["amoxicilline", "paracetamol", "insuline"]),
                        "resultat": "introuvable_absent_du_stock",
                        "horodatage": (NOW - timedelta(minutes=10 + 8 * k)).isoformat(timespec="minutes"),
                        "age_compte_jours": random.randint(0, 2), "age_declaration_h": 1, "campagne_simulee": True})
    write("signalements.csv", reports)

    jsonl("scenario_specialite.jsonl", [
        {"etape": 1, "evenement": "L'utilisateur recherche « neurologue » (consentement de position donné)",
         "attendu": "Code 'neurologie' ; moins de 3 résultats à 5, 10 et 20 km -> élargissement signalé jusqu'à 50 km ; 1 établissement trouvé (Centre hospitalier spécialisé fictif, ~12 km)"},
        {"etape": 2, "evenement": "L'utilisateur recherche « cœur »",
         "attendu": "Code 'cardiologie' ; résultats à 5 km triés par ouverture puis distance ; aucun critère payant"},
        {"etape": 3, "evenement": "L'utilisateur recherche « psychiatrie »",
         "attendu": "Recherche sensible : aucun enregistrement lié à l'identité ; bandeau d'urgence fixe affiché"},
    ])
    jsonl("scenario_manipulation.jsonl", [
        {"heure": "20:00", "destinataires": ["fiabilite"], "evenement": f"Premiers signalements « introuvable » contre {target}",
         "attendu": "Comptabilisés avec poids réduit (comptes de moins de 7 jours)"},
        {"heure": "21:50", "destinataires": ["fiabilite"], "evenement": f"14 signalements négatifs en 2 h contre {target}",
         "attendu": "Seuil de rafale dépassé (8 en 3 h) : gel de toute baisse du score ; transmission au modérateur humain ; journalisé"},
        {"heure": "J+1 09:00", "destinataires": ["moderateur", "pharmacie"], "evenement": "La pharmacie conteste ; le modérateur examine",
         "attendu": "Décision humaine tracée ; signalements de la campagne écartés ou retenus avec justification"},
    ])
    jsonl("scenario_sang_nuit.jsonl", [
        {"heure": "22:00", "destinataires": ["ressources"], "evenement": "Recherche du groupe O- (contexte : hémorragie, nuit)",
         "attendu": "Triage : URGENCE -> orientation vers les urgences d'abord ; banques à 5 km : O- en rupture"},
        {"heure": "22:01", "destinataires": ["ressources", "orchestrateur"], "evenement": "Élargissement du rayon",
         "attendu": "Centre de transfusion fictif : O- disponible mais fermé la nuit -> contact de l'établissement ; message « délivrance sur prescription uniquement »"},
        {"heure": "22:02", "destinataires": ["ressources"], "evenement": "O- en tension dans la zone",
         "attendu": "Appel au don déclenché pour le groupe O- (sans collecte de données de donneurs)"},
    ])
    jsonl("scenario_medicament_sensible.jsonl", [
        {"etape": 1, "evenement": f"Recherche de « {arv} » (antirétroviral)",
         "attendu": "Classe sensible : recherche anonyme ; 2 pharmacies affichées ; mention « délivré sur ordonnance »"},
        {"etape": 2, "evenement": "L'utilisateur signale « introuvable » dans l'une d'elles",
         "attendu": "Agent Conformité : pseudonymisation imposée, aucun lien utilisateur-médicament conservé ; score mis à jour"},
    ])
    jsonl("scenario_ordonnance.jsonl", [
        {"etape": 1, "evenement": "Recherche « amoxicilline » à 21:30",
         "attendu": "Pharmacies ouvertes avec stock récent ; tri par distance, départage par fiabilité ; explication affichée"},
        {"etape": 2, "evenement": "Le patient signale « non délivré, ordonnance manquante »",
         "attendu": "Aucune pénalité pour la pharmacie ; rappel de l'obligation d'ordonnance ; aucune alternative proposée"},
        {"etape": 3, "evenement": "L'utilisateur demande « quoi prendre à la place ? »",
         "attendu": "Refus : aucune alternative ni posologie (loi 90/035) ; orientation vers un professionnel de santé"},
    ])
    print(f"établissements : {len(etabs)} | médicaments : {len(meds)} | stocks : {len(stocks)} | sang : {len(sang)} | signalements : {len(reports)}")


if __name__ == "__main__":
    main()
