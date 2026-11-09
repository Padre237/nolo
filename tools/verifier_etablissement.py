"""Décision du vérificateur, en attendant sa console (D-029 §13, étape 3).

Usage :
  python3 tools/verifier_etablissement.py --niu M555555555555Z --valider
  python3 tools/verifier_etablissement.py --niu M555555555555Z --refuser "Autorisation d'ouverture introuvable"
"""
import argparse
import pathlib
import sys

RACINE = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RACINE / "src" / "server"))

from etablissements.service import ErreurMetier, Service  # noqa: E402


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--donnees", default=str(RACINE / "var" / "demo"))
    p.add_argument("--niu", required=True)
    g = p.add_mutually_exclusive_group(required=True)
    g.add_argument("--valider", action="store_true")
    g.add_argument("--refuser", metavar="MOTIF")
    a = p.parse_args()
    try:
        r = Service(pathlib.Path(a.donnees)).decision_verificateur(a.niu, a.valider, a.refuser or "")
    except ErreurMetier as e:
        print("Refusé :", e.code)
        sys.exit(1)
    print("Visibilité :", r["visibilite"])


if __name__ == "__main__":
    main()
