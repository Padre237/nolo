"""Lance l'API et la console des établissements en local.

Usage : python3 tools/lancer_demo.py [--port 8000] [--donnees var/demo] [--neuf]
Puis ouvrir http://127.0.0.1:8000/etablissement.html (console) et /recherche-medicament.html (côté citoyen).
"""
import argparse
import pathlib
import shutil
import sys

import uvicorn

RACINE = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RACINE / "src" / "server"))

from etablissements.app import creer_app  # noqa: E402
from etablissements.service import Service  # noqa: E402


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--port", type=int, default=8000)
    p.add_argument("--donnees", default=str(RACINE / "var" / "demo"))
    p.add_argument("--neuf", action="store_true", help="efface les données de démonstration avant de lancer")
    p.add_argument("--avec-tendances", action="store_true", help="ajoute les compteurs synthétiques de la vue Tendances")
    a = p.parse_args()
    dossier = pathlib.Path(a.donnees)
    if a.neuf and dossier.exists():
        shutil.rmtree(dossier)
    if a.avec_tendances:
        import subprocess
        subprocess.run([sys.executable, str(RACINE / "tools" / "generer_tendances_demo.py"), "--donnees", str(dossier)], check=True)
    uvicorn.run(creer_app(Service(dossier)), host="127.0.0.1", port=a.port, log_level="warning")


if __name__ == "__main__":
    main()
