"""DES-017-01-01 — rendu du rapport en HTML imprimable, puis en PDF par Chrome (SF-017-01 ; FR-2301).

`tools/rapport_pdf.py` convertit le Markdown du rapport (titres, paragraphes, listes, tableaux, gras,
italique, code, liens) en HTML autonome échappé ; le PDF sert au comptage des pages (TEST-017-01-01).
"""
from __future__ import annotations

import importlib.util
import re
import shutil
import subprocess
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]


def module():
    spec = importlib.util.spec_from_file_location("rapport_pdf", ROOT / "tools" / "rapport_pdf.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def test_titres_paragraphes_et_mise_en_forme():
    html = module().vers_html("# Titre\n\n## 1. Section\n\nUn **gras**, un *italique*, du `code` et un [lien](https://example.org).\n")
    assert "<h1>Titre</h1>" in html
    assert "<h2>1. Section</h2>" in html
    assert "<strong>gras</strong>" in html and "<em>italique</em>" in html
    assert "<code>code</code>" in html
    assert '<a href="https://example.org">lien</a>' in html


def test_tableau_et_listes():
    md = "| A | B |\n|---|---|\n| 1 | 2 |\n\n- un\n- deux\n\n1. premier\n2. second\n"
    html = module().vers_html(md)
    assert "<table>" in html and "<th>A</th>" in html and "<td>2</td>" in html
    assert "<ul><li>un</li><li>deux</li></ul>" in html
    assert "<ol><li>premier</li><li>second</li></ol>" in html


def test_texte_echappe():
    html = module().vers_html("Un <script>alert(1)</script> & co.\n")
    assert "<script>" not in html
    assert "&lt;script&gt;" in html and "&amp; co." in html


def test_page_autonome_sans_ressource_externe():
    page = module().page_html("# T\n\nCorps.\n", titre="Rapport")
    assert page.startswith("<!doctype html>")
    assert "<title>Rapport</title>" in page
    assert "http://" not in page.replace("https://example", "") and "<link" not in page


def test_pdf_produit_par_chrome(tmp_path):
    if module().trouver_chrome() is None or shutil.which("pdfinfo") is None:
        pytest.skip("Chrome ou pdfinfo absent : PDF non produit")
    md = tmp_path / "r.md"
    md.write_text("# Titre\n\n## 1. Introduction\n\nTexte.\n", encoding="utf-8")
    pdf = tmp_path / "r.pdf"
    module().produire_pdf(md, pdf)
    assert pdf.read_bytes().startswith(b"%PDF-")
    info = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True, check=True).stdout
    assert re.search(r"^Pages:\s+1$", info, re.M), info
