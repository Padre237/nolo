#!/usr/bin/env python3
"""Contrôle du rapport technique (SF-017-01, TASK-017-01-01 ; FR-2301 à FR-2304).

- TEST-017-01-01 : les six sections du modèle de soumission, dans l'ordre ; le PDF fait 5 pages au plus
  (mesure réelle par `pdfinfo`, sinon par comptage des objets /Page) ; nombre de mots affiché.
- TEST-017-01-02 : aucun nom ni chiffre périmé ; le nom Nolo, le lien du dépôt et les chiffres prouvés
  de la base (docs/ETAT.md §4) sont présents.
- TEST-017-01-03 : chaque ligne d'un tableau qui donne un état (Implemented, Partly implemented, Planned,
  Demo only) et cite une sous-fonctionnalité concorde avec l'« État d'implémentation » de son dossier ;
  toute sous-fonctionnalité citée existe ; le module POC est présenté comme une preuve de concept avec
  les lacunes L5, L15 et L16.

Usage : python3 tools/verifier_rapport.py [--rapport FICHIER.md] [--pdf FICHIER.pdf | --sans-pdf]
Code de sortie : 0 si conforme, 1 sinon. Avec --sans-pdf, les pages ne sont pas mesurées (signalé).
"""
from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAPPORT = ROOT / "docs" / "submission" / "rapport-technique-en.md"
PDF = ROOT.parent / "livrables" / "rapport-technique-en.pdf"     # hors du dépôt : aucun PDF dans l'arborescence (FR-2308)
PAGES_MAX = 5
SECTIONS = ["Introduction", "Description of the use case", "Use case requirement",
            "Mapping with ITU-T Y.3172", "Error scenarios", "Policy gaps and standards gaps"]
PERIMES = ["BOUSSOLE", "[PROPOSED NAME]", "1,893", "1 893", "1893", "18 sources", "22/22",
           "20 pytest", "11 Node", "Thirteen gaps"]
REQUIS = ["Nolo", "https://github.com/Padre237/nolo", "2,034 fragments", "21 documents", "33/40", "29/40", "390/390"]
ETATS = {                                             # état annoncé → débuts admis de l'« État d'implémentation »
    "implemented": ("Implémenté",),
    "partly implemented": ("Partiellement implémenté",),
    "planned": ("Non implémenté",),
    "demo only": ("Implémenté", "Partiellement implémenté"),
}
LACUNES_POC = ["L5", "L15", "L16"]
RE_SF = re.compile(r"\bSF-(\d{3})-(\d{2})\b")


def etat_dossier(sf: tuple[str, str]) -> str | None:
    dossiers = sorted((ROOT / "docs" / "specifications").glob(f"feature-*/sf-{sf[0]}-{sf[1]}-*/requirements.md"))
    if not dossiers:
        return None
    m = re.search(r"^\| État d'implémentation \| ([^|]+)\|", dossiers[0].read_text(encoding="utf-8"), re.M)
    return m.group(1).strip() if m else "?"


def compter_pages(pdf: Path) -> int:
    if shutil.which("pdfinfo"):
        sortie = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True, check=True).stdout
        return int(re.search(r"^Pages:\s+(\d+)", sortie, re.M).group(1))
    return len(re.findall(rb"/Type\s*/Page(?![s\w])", pdf.read_bytes()))


def controler(rapport: Path, pdf: Path | None) -> int:
    texte = rapport.read_text(encoding="utf-8")
    problemes: list[str] = []

    # TEST-017-01-01 — sections et pages
    titres = [l.lstrip("#").strip().lower() for l in texte.splitlines() if l.startswith("#")]
    positions = []
    for s in SECTIONS:
        i = next((k for k, t in enumerate(titres) if s.lower() in t), None)
        if i is None:
            problemes.append(f"TEST-017-01-01 section absente : « {s} »")
        positions.append(i)
    trouvees = [p for p in positions if p is not None]
    if trouvees != sorted(trouvees):
        problemes.append("TEST-017-01-01 sections hors de l'ordre du modèle : " + ", ".join(SECTIONS))
    mots = len(re.findall(r"[\w’'-]+", re.sub(r"[|#*`>-]{2,}", " ", texte)))
    if pdf is None:
        pages = "non mesuré (--sans-pdf)"
    elif not pdf.is_file():
        pages = f"non mesuré (PDF absent : {pdf})"
        problemes.append(f"TEST-017-01-01 pages non mesurées : {pdf} absent")
    else:
        n = compter_pages(pdf)
        pages = f"{n} (au plus {PAGES_MAX})"
        if n > PAGES_MAX:
            problemes.append(f"TEST-017-01-01 trop de pages : {n} > {PAGES_MAX}")
    print(f"TEST-017-01-01 sections : {len(trouvees)}/{len(SECTIONS)} ; pages : {pages} ; mots : {mots}")

    # TEST-017-01-02 — nom et chiffres
    perimes = [p for p in PERIMES if p.lower() in texte.lower()]
    absents = [r for r in REQUIS if r not in texte]
    for p in perimes:
        problemes.append(f"TEST-017-01-02 terme périmé : « {p} »")
    for r in absents:
        problemes.append(f"TEST-017-01-02 élément requis absent : « {r} »")
    print(f"TEST-017-01-02 termes périmés : {len(perimes)} ; éléments requis présents : "
          f"{len(REQUIS) - len(absents)}/{len(REQUIS)}")

    # TEST-017-01-03 — états concordants, lacunes du POC
    cites = sorted(set(RE_SF.findall(texte)))
    controles = 0
    for sf in cites:
        if etat_dossier(sf) is None:
            problemes.append(f"TEST-017-01-03 SF-{sf[0]}-{sf[1]} : aucun dossier")
    for ligne in texte.splitlines():
        if not ligne.startswith("|"):
            continue
        cellules = [c.strip().lower() for c in ligne.strip().strip("|").split("|")]
        etat = next((c for c in cellules if c in ETATS), None)
        if etat is None:
            continue
        for sf in RE_SF.findall(ligne):
            reel = etat_dossier(sf)
            if reel is None:
                continue
            controles += 1
            if not reel.startswith(ETATS[etat]):
                problemes.append(f"TEST-017-01-03 SF-{sf[0]}-{sf[1]} annoncée « {etat} », dossier : « {reel.split(' — ')[0]} »")
    lacunes = [l for l in LACUNES_POC if not re.search(rf"\b{l}\b", texte)]
    for l in lacunes:
        problemes.append(f"TEST-017-01-03 lacune du module POC non citée : {l}")
    if "proof of concept" not in texte.lower():
        problemes.append("TEST-017-01-03 module POC non présenté comme « proof of concept »")
    print(f"TEST-017-01-03 sous-fonctionnalités citées : {len(cites)} ; états contrôlés : {controles} ; "
          f"lacunes du POC citées : {len(LACUNES_POC) - len(lacunes)}/{len(LACUNES_POC)}")

    for p in problemes:
        print(f"PROBLÈME {p}")
    if problemes:
        print(f"NON CONFORME : {len(problemes)} problème(s)")
        return 1
    print("Conforme")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--rapport", type=Path, default=RAPPORT)
    g = ap.add_mutually_exclusive_group()
    g.add_argument("--pdf", type=Path, default=PDF)
    g.add_argument("--sans-pdf", action="store_true")
    a = ap.parse_args()
    return controler(a.rapport, None if a.sans_pdf else a.pdf)


if __name__ == "__main__":
    sys.exit(main())
