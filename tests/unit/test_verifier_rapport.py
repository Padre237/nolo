"""TEST-017-01-01 à TEST-017-01-03 — contrôle du rapport technique (SF-017-01 ; FR-2301 à FR-2304).

`tools/verifier_rapport.py` sort en 0 si :
- TEST-017-01-01 : les six sections du modèle de soumission sont présentes, dans l'ordre, et le PDF fait 5 pages au plus ;
- TEST-017-01-02 : aucun nom ni chiffre périmé ; nom Nolo, lien du dépôt et chiffres prouvés de la base présents ;
- TEST-017-01-03 : chaque fonction du tableau d'état a l'état de son dossier SDD ; le module POC cite L5, L15 et L16.
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUTIL = ROOT / "tools" / "verifier_rapport.py"

SECTIONS = """\
## 1. Introduction
Nolo ("health" in Duala). Repository: https://github.com/Padre237/nolo

## 2. Description of the use case
The public knowledge base holds 2,034 fragments from 21 documents.

| Function | Status | Spec |
|---|---|---|
| Compliance agent, four verdicts | Implemented | SF-007-03 |
| Rights adviser "Mes droits santé" | Planned | SF-016-02 |
| Experimental leads (POC) | Demo only | SF-001-15 |

The POC module is a governed proof of concept (gaps L5, L15, L16).

## 3. Use case requirement
Retrieval: expected document 33/40; exact article 29/40. Triage rules: 390/390 witness cases.

## 4. Mapping with ITU-T Y.3172, the AI Readiness 2.0 Report and domain-specific policies
SRC to SINK.

## 5. Error scenarios
S1 to S3.

## 6. Policy gaps and standards gaps
L1 to L16.
"""


def ecrire(tmp: Path, texte: str) -> Path:
    p = tmp / "rapport.md"
    p.write_text("# AI for Good Sandbox Hackathon – CENADI EQUIPE 2 – Nolo\n\n" + texte, encoding="utf-8")
    return p


def pdf_de(pages: int) -> bytes:
    """PDF minimal valide (table xref exacte) de `pages` pages blanches."""
    objets = ["<< /Type /Catalog /Pages 2 0 R >>",
              "<< /Type /Pages /Kids [" + " ".join(f"{3 + i} 0 R" for i in range(pages)) + f"] /Count {pages} >>"]
    objets += ["<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] >>"] * pages
    sortie, positions = b"%PDF-1.4\n", []
    for i, o in enumerate(objets, 1):
        positions.append(len(sortie))
        sortie += f"{i} 0 obj\n{o}\nendobj\n".encode()
    xref = len(sortie)
    sortie += f"xref\n0 {len(objets) + 1}\n0000000000 65535 f \n".encode()
    sortie += b"".join(f"{p:010d} 00000 n \n".encode() for p in positions)
    sortie += f"trailer\n<< /Size {len(objets) + 1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode()
    return sortie


def lancer(rapport: Path, pdf: Path | None = None) -> subprocess.CompletedProcess:
    args = [sys.executable, str(OUTIL), "--rapport", str(rapport)]
    args += ["--pdf", str(pdf)] if pdf else ["--sans-pdf"]
    return subprocess.run(args, capture_output=True, text=True, timeout=60)


def test_rapport_conforme_sort_en_0(tmp_path):
    r = lancer(ecrire(tmp_path, SECTIONS))
    assert r.returncode == 0, r.stdout + r.stderr
    assert "mots" in r.stdout


# TEST-017-01-01 — pages et sections
def test_section_manquante_sort_en_1(tmp_path):
    r = lancer(ecrire(tmp_path, SECTIONS.replace("## 5. Error scenarios", "## 5. Scenarios")))
    assert r.returncode == 1
    assert "Error scenarios" in r.stdout


def test_sections_dans_le_desordre_sort_en_1(tmp_path):
    texte = SECTIONS.replace("## 3. Use case requirement", "## X").replace("## 6. Policy gaps", "## 3. Use case requirement\n\n## 6. Policy gaps")
    r = lancer(ecrire(tmp_path, texte))
    assert r.returncode == 1


def test_pdf_de_5_pages_accepte(tmp_path):
    pdf = tmp_path / "r.pdf"
    pdf.write_bytes(pdf_de(5))
    r = lancer(ecrire(tmp_path, SECTIONS), pdf)
    assert r.returncode == 0, r.stdout + r.stderr
    assert "pages : 5" in r.stdout


def test_pdf_de_6_pages_sort_en_1(tmp_path):
    pdf = tmp_path / "r.pdf"
    pdf.write_bytes(pdf_de(6))
    r = lancer(ecrire(tmp_path, SECTIONS), pdf)
    assert r.returncode == 1
    assert "pages : 6" in r.stdout


def test_pdf_absent_sort_en_1(tmp_path):
    r = lancer(ecrire(tmp_path, SECTIONS), tmp_path / "absent.pdf")
    assert r.returncode == 1
    assert "non mesuré" in r.stdout


# TEST-017-01-02 — nom et chiffres
def test_nom_perime_sort_en_1(tmp_path):
    r = lancer(ecrire(tmp_path, SECTIONS + "\nBOUSSOLE was the old name.\n"))
    assert r.returncode == 1
    assert "BOUSSOLE" in r.stdout


def test_chiffre_perime_sort_en_1(tmp_path):
    r = lancer(ecrire(tmp_path, SECTIONS + "\nThe base holds 1,893 fragments.\n"))
    assert r.returncode == 1
    assert "1,893" in r.stdout


def test_lien_du_depot_absent_sort_en_1(tmp_path):
    r = lancer(ecrire(tmp_path, SECTIONS.replace("https://github.com/Padre237/nolo", "[link]")))
    assert r.returncode == 1
    assert "github.com/Padre237/nolo" in r.stdout


def test_chiffre_de_la_base_absent_sort_en_1(tmp_path):
    r = lancer(ecrire(tmp_path, SECTIONS.replace("2,034 fragments", "many fragments")))
    assert r.returncode == 1
    assert "2,034" in r.stdout


# TEST-017-01-03 — états concordants
def test_etat_discordant_sort_en_1(tmp_path):
    texte = SECTIONS.replace('"Mes droits santé" | Planned', '"Mes droits santé" | Implemented')
    r = lancer(ecrire(tmp_path, texte))
    assert r.returncode == 1
    assert "SF-016-02" in r.stdout


def test_sous_fonctionnalite_inconnue_sort_en_1(tmp_path):
    r = lancer(ecrire(tmp_path, SECTIONS + "\n| Teleportation | Implemented | SF-099-99 |\n"))
    assert r.returncode == 1
    assert "SF-099-99" in r.stdout


def test_lacunes_du_poc_absentes_sort_en_1(tmp_path):
    r = lancer(ecrire(tmp_path, SECTIONS.replace("(gaps L5, L15, L16)", "(see gaps)").replace("L1 to L16", "all gaps")))
    assert r.returncode == 1
    assert "L15" in r.stdout
