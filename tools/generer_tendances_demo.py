"""Compteurs SYNTHÉTIQUES pour la démonstration de la vue « Tendances » (D-032 §8).

Graine fixe ; 12 semaines complètes ; quelques arrondissements de Douala, Yaoundé et Garoua ;
une rupture d'artésunate à Douala V sur les 4 dernières semaines. Aucun citoyen n'est simulé un par un.
Usage : python3 tools/generer_tendances_demo.py [--donnees var/demo]
"""
import argparse
import pathlib
import random
import sys

RACINE = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RACINE / "src" / "server"))
from etablissements import tendances  # noqa: E402
from etablissements.service import Service  # noqa: E402

ZONES = {  # code INS -> poids de population (fictif)
    "050401": 1.0, "050402": 1.2, "050403": 1.5, "050404": .8, "050405": 1.6,
    "020701": .9, "020702": 1.0, "020703": .8, "020704": 1.3, "020705": 1.1, "020706": 1.0,
    "060105": .7, "060106": .5, "060107": .4,
}
MEDICAMENTS = {"paracetamol": 14, "amoxicilline": 9, "artemether_lumefantrine": 11, "sro": 5, "ibuprofene": 6,
               "metformine": 3, "amlodipine": 3, "salbutamol": 2, "artesunate": 2, "cotrimoxazole": 2}
SPECIALITES = {"pediatrie": 6, "medecine_generale": 5, "cardiologie": 2, "ophtalmologie": 2, "urgences": 3, "dentisterie": 2}
SANG = {"O+": 3, "A+": 2, "B+": 1, "O-": 1}


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--donnees", default=str(RACINE / "var" / "demo"))
    a = p.parse_args()
    svc = Service(pathlib.Path(a.donnees))
    rnd = random.Random(2026)
    semaines = tendances.semaines_completes(svc.maintenant(), 12)
    lignes = []
    for i, sem in enumerate(semaines):
        saison = 1 + 0.35 * (i / 11)  # montée progressive (saison des pluies, fictif)
        for zone, poids in ZONES.items():
            for type_, catalogue in (("medicament", MEDICAMENTS), ("specialite", SPECIALITES), ("sang", SANG)):
                for serv, base in catalogue.items():
                    n = max(0, int(rnd.gauss(base * poids * (saison if serv.startswith("artem") else 1), base * .3)))
                    part_insatisfaite = .08
                    if zone == "050405" and serv == "artesunate" and i >= 8:
                        n, part_insatisfaite = n + 18 + rnd.randint(0, 6), .8  # rupture fictive
                    k = sum(rnd.random() < part_insatisfaite for _ in range(n))
                    if n - k:
                        lignes.append((zone, sem, type_, serv, 1, n - k))
                    if k:
                        lignes.append((zone, sem, type_, serv, 0, k))
    with svc._verrou:
        svc._db.executemany("""INSERT INTO compteurs VALUES (?,?,?,?,?,?)
                               ON CONFLICT(zone, semaine, type, service, satisfaite) DO UPDATE SET n = excluded.n""", lignes)
        svc._db.commit()
    print(f"{len(lignes)} compteurs synthétiques écrits ({semaines[0]} à {semaines[-1]}).")


if __name__ == "__main__":
    main()
