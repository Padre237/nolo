#!/usr/bin/env python3
"""Croise les statuts d'exécution des spécifications avec une preuve de suites (SF-017-05, FR-2322).

Pour chaque test de `docs/specifications/**/tests.md` dont le statut dit « Exécuté … <nom de la preuve> »,
vérifie que le nom du test (titre « … » d'un test Node, fonction `test_…` pytest) ou, à défaut, la commande
citée (champ Automatisation ou Quand) figure dans le fichier de preuve.

Usage : python3 tools/croiser_preuves.py docs/quality/preuve-AAAA-MM-JJ-suites.txt
Code de sortie : 0 si aucun problème, 1 sinon.
"""
import glob
import os
import re
import sys

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def norm(x: str) -> str:
    """Rend équivalentes les variantes d'une même commande (-I, -q, -v, bash -c, guillemets)."""
    return (x.replace(" -I", "").replace(" -q", "").replace(" -v -p no:cacheprovider", "")
             .replace("bash -c ", "").replace('"', ""))


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    chemin = sys.argv[1]
    nom = os.path.basename(chemin)
    preuve = norm(open(chemin, encoding="utf-8").read())
    fichiers = sorted(glob.glob(os.path.join(RACINE, "docs/specifications/feature-*/*/tests.md"))
                      + glob.glob(os.path.join(RACINE, "docs/specifications/maintenance/mt-*/tests.md")))
    probl, ok = [], 0
    for f in fichiers:
        for b in re.split(r"\n### ", open(f, encoding="utf-8").read())[1:]:
            st = b.split("Statut d'exécution : ")[-1].split("\n")[0]
            if f"preuve `docs/quality/{nom}`" not in st or not st.startswith("Exécuté"):
                continue
            tid = b.split(" — ")[0]
            auto = re.search(r"- Automatisation : (.*)", b).group(1)
            quand = re.search(r"- Quand : (.*)", b).group(1)
            titres = re.findall(r"« (.+?) »(?: \(|$| ;|,)", auto)
            fonctions = [n.split("::")[-1] for n in re.findall(r"`([^`]+)`", auto)
                         if re.match(r"^test_\w+$", n.split("::")[-1])]
            commandes = [n for n in re.findall(r"`([^`]+)`", auto + " " + quand)
                         if n.startswith(("python3", "node", "cd "))]
            cles = titres + fonctions or commandes
            if not cles:
                probl.append((tid, "aucune référence vérifiable", auto[:120]))
                continue
            absents = [c for c in cles if norm(c) not in preuve]
            if absents:
                probl.append((tid, "absent de la preuve", absents))
            else:
                ok += 1
    print(f"preuve : {nom}")
    print(f"vérifiés : {ok}")
    print(f"problèmes : {len(probl)}")
    for p in probl:
        print("  ", p)
    return 0 if not probl else 1


if __name__ == "__main__":
    sys.exit(main())
