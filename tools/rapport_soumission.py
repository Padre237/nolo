"""SF-017-01 — Version soumise du rapport technique (PDF publié à la racine du dépôt depuis le 2026-11-09).

    python3 tools/rapport_soumission.py [--video URL]

Lit `docs/submission/rapport-technique-en.md`. S'il porte encore la mention « contacts dans le PDF », la remplace
par la ligne de `../livrables/contacts-equipe.txt` ; s'il attend encore le lien de la vidéo et que `--video` est
donné, l'ajoute. Écrit `../livrables/rapport-technique-en.soumission.md`, produit le PDF
`../livrables/rapport-technique-en.pdf` (`tools/rapport_pdf.py`), le contrôle (`tools/verifier_rapport.py`), puis
le copie à la racine du dépôt (`rapport-technique-en.pdf`) s'il est conforme.
"""
import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIVRABLES = ROOT.parent / "livrables"
PUBLIC = "e-mail addresses in the submitted PDF (not published in the public repository)"
VIDEO = "**Demo video:** [to be added]"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--video", default=None)
    a = ap.parse_args()
    md = (ROOT / "docs" / "submission" / "rapport-technique-en.md").read_text(encoding="utf-8")
    if PUBLIC in md:
        md = md.replace(PUBLIC, (LIVRABLES / "contacts-equipe.txt").read_text(encoding="utf-8").strip(), 1)
    if a.video:
        md = md.replace(VIDEO, f"**Demo video:** {a.video}", 1)
    source = LIVRABLES / "rapport-technique-en.soumission.md"
    source.write_text(md, encoding="utf-8")
    pdf = LIVRABLES / "rapport-technique-en.pdf"
    py = sys.executable
    subprocess.run([py, str(ROOT / "tools" / "rapport_pdf.py"), "--rapport", str(source), "--sortie", str(pdf)], check=True)
    r = subprocess.run([py, str(ROOT / "tools" / "verifier_rapport.py"), "--rapport", str(source), "--pdf", str(pdf)])
    if VIDEO in md:
        print("Attention : lien de la vidéo encore absent (--video URL).")
    if r.returncode == 0:
        shutil.copyfile(pdf, ROOT / "rapport-technique-en.pdf")
        print(f"Copié : {ROOT / 'rapport-technique-en.pdf'}")
    return r.returncode


if __name__ == "__main__":
    sys.exit(main())
