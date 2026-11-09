#!/usr/bin/env python3
"""Rendu du rapport technique en PDF A4 par Chrome (SF-017-01, DES-017-01-01 ; FR-2301).

Markdown limité au besoin du rapport (titres, paragraphes, citations, listes simples, tableaux, gras,
italique, code, liens), converti en HTML autonome échappé (aucune ressource externe), puis imprimé
par Chrome sans en-tête ni pied de page. Le PDF est écrit hors du dépôt : l'arborescence ne doit
contenir aucun PDF (FR-2308, tools/verifier_base.py).

Usage : python3 tools/rapport_pdf.py [--rapport FICHIER.md] [--sortie FICHIER.pdf] [--html FICHIER.html]
Chrome : variable NOLO_CHROME, sinon google-chrome, chromium, ou le Chromium de Playwright.
"""
from __future__ import annotations

import argparse
import glob
import html
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAPPORT = ROOT / "docs" / "submission" / "rapport-technique-en.md"
SORTIE = ROOT.parent / "livrables" / "rapport-technique-en.pdf"

CSS = """
@page { size: A4; margin: 14mm 15mm 14mm 15mm; }
* { box-sizing: border-box; }
html { background: #fff; color: #111; }
body { margin: 0; font-family: "Liberation Sans", Arial, Helvetica, sans-serif; font-size: 9.4pt; line-height: 1.32; }
h1 { font-size: 14pt; margin: 0 0 4pt; }
h2 { font-size: 11.2pt; margin: 9pt 0 3pt; border-bottom: 0.6pt solid #888; padding-bottom: 1pt; break-after: avoid; }
h3 { font-size: 9.8pt; margin: 6pt 0 2pt; break-after: avoid; }
p { margin: 0 0 4pt; }
ul, ol { margin: 0 0 4pt; padding-left: 14pt; }
li { margin: 0 0 1.5pt; }
blockquote { margin: 0 0 5pt; padding: 3pt 6pt; border-left: 2pt solid #888; background: #f3f3f3; }
blockquote p { margin: 0; }
table { width: 100%; border-collapse: collapse; margin: 2pt 0 5pt; font-size: 8.1pt; line-height: 1.22; break-inside: auto; }
th, td { border: 0.5pt solid #999; padding: 1.6pt 3pt; text-align: left; vertical-align: top; }
th { background: #e8e8e8; }
tr { break-inside: avoid; }
code { font-family: "Liberation Mono", "DejaVu Sans Mono", monospace; font-size: 0.92em; }
a { color: #0b4f8a; text-decoration: none; }
"""


def en_ligne(texte: str) -> str:
    """Mise en forme d'une ligne : le code est protégé, tout le reste est échappé."""
    morceaux = re.split(r"(`[^`]+`)", texte)
    sortie = []
    for m in morceaux:
        if m.startswith("`") and m.endswith("`") and len(m) > 1:
            sortie.append(f"<code>{html.escape(m[1:-1])}</code>")
            continue
        t = html.escape(m)
        t = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", r'<a href="\2">\1</a>', t)
        t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
        t = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", t)
        sortie.append(t)
    return "".join(sortie)


def cellules(ligne: str) -> list[str]:
    return [c.strip() for c in ligne.strip().strip("|").split("|")]


def vers_html(md: str) -> str:
    lignes = md.splitlines()
    blocs: list[str] = []
    i = 0
    while i < len(lignes):
        l = lignes[i]
        if not l.strip():
            i += 1
            continue
        m = re.match(r"^(#{1,6})\s+(.*)$", l)
        if m:
            n = len(m.group(1))
            blocs.append(f"<h{n}>{en_ligne(m.group(2).strip())}</h{n}>")
            i += 1
            continue
        if l.startswith("|"):
            tableau = []
            while i < len(lignes) and lignes[i].startswith("|"):
                tableau.append(lignes[i])
                i += 1
            entete, corps = tableau[0], [t for t in tableau[1:] if not re.match(r"^\|[\s:|-]+\|?\s*$", t)]
            h = "".join(f"<th>{en_ligne(c)}</th>" for c in cellules(entete))
            b = "".join("<tr>" + "".join(f"<td>{en_ligne(c)}</td>" for c in cellules(t)) + "</tr>" for t in corps)
            blocs.append(f"<table><thead><tr>{h}</tr></thead><tbody>{b}</tbody></table>")
            continue
        for motif, balise in ((r"^[-*]\s+", "ul"), (r"^\d+\.\s+", "ol")):
            if re.match(motif, l):
                items = []
                while i < len(lignes) and re.match(motif, lignes[i]):
                    items.append(re.sub(motif, "", lignes[i]))
                    i += 1
                    while i < len(lignes) and lignes[i].startswith("  ") and lignes[i].strip():
                        items[-1] += " " + lignes[i].strip()
                        i += 1
                blocs.append(f"<{balise}>" + "".join(f"<li>{en_ligne(x)}</li>" for x in items) + f"</{balise}>")
                break
        else:
            if l.startswith(">"):
                cite = []
                while i < len(lignes) and lignes[i].startswith(">"):
                    cite.append(lignes[i].lstrip(">").strip())
                    i += 1
                blocs.append(f"<blockquote><p>{en_ligne(' '.join(cite))}</p></blockquote>")
                continue
            if re.match(r"^-{3,}\s*$", l):
                blocs.append("<hr>")
                i += 1
                continue
            para = []
            while (i < len(lignes) and lignes[i].strip() and not re.match(r"^(#{1,6}\s|\||>|[-*]\s|\d+\.\s)", lignes[i])):
                para.append(lignes[i].strip())
                i += 1
            blocs.append(f"<p>{en_ligne(' '.join(para))}</p>")
    return "\n".join(blocs)


def page_html(md: str, titre: str | None = None) -> str:
    if titre is None:
        m = re.search(r"^#\s+(.*)$", md, re.M)
        titre = m.group(1).strip() if m else "Rapport"
    return (f"<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\">"
            f"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
            f"<title>{html.escape(titre)}</title><style>{CSS}</style></head>\n<body>\n{vers_html(md)}\n</body></html>\n")


def trouver_chrome() -> str | None:
    """NOLO_CHROME, puis le « headless shell » de Playwright (le plus fiable sans écran), puis un Chrome installé."""
    if os.environ.get("NOLO_CHROME") and Path(os.environ["NOLO_CHROME"]).is_file():
        return os.environ["NOLO_CHROME"]
    pw = os.path.expanduser("~/.cache/ms-playwright")
    shell = sorted(glob.glob(f"{pw}/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell"))
    if shell:
        return shell[-1]
    for nom in ("google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "chrome"):
        if shutil.which(nom):
            return shutil.which(nom)
    candidats = sorted(glob.glob(f"{pw}/chromium-*/chrome-linux64/chrome"))
    return candidats[-1] if candidats else None


def produire_pdf(rapport: Path, sortie: Path, html_sortie: Path | None = None) -> Path:
    chrome = trouver_chrome()
    if chrome is None:
        raise SystemExit("Chrome introuvable (NOLO_CHROME, google-chrome, chromium ou Playwright)")
    page = page_html(rapport.read_text(encoding="utf-8"))
    sortie.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        source = Path(tmp) / "rapport.html"
        source.write_text(page, encoding="utf-8")
        if html_sortie:
            html_sortie.write_text(page, encoding="utf-8")
        mode = [] if chrome.endswith("chrome-headless-shell") else ["--headless=new", "--disable-gpu"]
        r = subprocess.run([chrome, *mode, "--no-pdf-header-footer", f"--user-data-dir={Path(tmp) / 'profil'}",
                            f"--print-to-pdf={sortie}", source.as_uri()], capture_output=True, text=True, timeout=120)
    if r.returncode != 0 or not sortie.is_file():
        raise SystemExit(f"Chrome a échoué ({r.returncode}) : {r.stderr[-400:]}")
    return sortie


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--rapport", type=Path, default=RAPPORT)
    ap.add_argument("--sortie", type=Path, default=SORTIE)
    ap.add_argument("--html", type=Path, default=None, help="écrit aussi la page HTML (aperçu)")
    a = ap.parse_args()
    pdf = produire_pdf(a.rapport, a.sortie, a.html)
    print(f"PDF : {pdf}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
