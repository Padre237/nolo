"""TEST-017-02-03 — Rien d'interdit avant publication (FR-2308, CA-017-02-03).

`tools/controle_publication.py` sort en 0 si le dépôt ne contient ni secret, ni PDF, ni fragment,
ni page, ni texte de INT-OMS-AFRO-SBC-2014 (seules restent sa fiche de kb/sources.json et des mentions
documentaires), en 1 sinon.

Les motifs interdits (clés, références de fragments) sont construits à l'exécution, pour que ce
fichier ne déclenche pas lui-même le contrôle sur le vrai dépôt.
"""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
OUTIL = ROOT / "tools" / "controle_publication.py"
RESERVE = "INT-OMS-AFRO-SBC-2014"


def lancer(racine: Path) -> subprocess.CompletedProcess:
    return subprocess.run([sys.executable, str(OUTIL), "--racine", str(racine)],
                          capture_output=True, text=True, timeout=120)


def depot_conforme(tmp: Path) -> Path:
    """Petit dépôt sans défaut : la fiche du texte réservé et une mention documentaire seulement."""
    (tmp / "kb").mkdir()
    sources = [
        {"doc_id": "CMR-LOI-2024-017", "title": "Loi fictive", "pages_dir": "pages/loi_2024-017"},
        {"doc_id": RESERVE, "title": "Guide réservé", "pages_dir": "pages/oms_afro_sbc_2014",
         "public_repository": "métadonnées seulement"},
    ]
    (tmp / "kb" / "sources.json").write_text(json.dumps(sources, ensure_ascii=False, indent=1), encoding="utf-8")
    fragment = {"chunk_id": "CMR-LOI-2024-017::0001", "doc_id": "CMR-LOI-2024-017", "text": "Article 1."}
    (tmp / "kb" / "kb_chunks.jsonl").write_text(json.dumps(fragment, ensure_ascii=False) + "\n", encoding="utf-8")
    (tmp / "kb" / "pages" / "loi_2024-017").mkdir(parents=True)
    (tmp / "kb" / "pages" / "loi_2024-017" / "p001.txt").write_text("Article 1.", encoding="utf-8")
    (tmp / "README.md").write_text(f"Le guide {RESERVE} est retiré de la version publique.\n", encoding="utf-8")
    (tmp / "app").mkdir()
    (tmp / "app" / "logo.png").write_bytes(b"\x89PNG\r\n\x1a\n\x00\x00binaire")
    return tmp


def test_depot_conforme_sort_en_0(tmp_path):
    r = lancer(depot_conforme(tmp_path))
    assert r.returncode == 0, r.stdout + r.stderr
    assert "conforme" in r.stdout.lower()


def test_faux_pdf_sort_en_1(tmp_path):
    d = depot_conforme(tmp_path)
    (d / "docs").mkdir()
    (d / "docs" / "source.pdf").write_bytes(b"%PDF-1.4\n% faux PDF\n")
    r = lancer(d)
    assert r.returncode == 1
    assert "docs/source.pdf" in r.stdout


def test_rapport_technique_a_la_racine_permis(tmp_path):
    """Le rapport technique de l'équipe, à la racine, est le seul PDF publié (choix du propriétaire, 2026-11-09)."""
    d = depot_conforme(tmp_path)
    (d / "rapport-technique-en.pdf").write_bytes(b"%PDF-1.4\n% rapport de l'equipe\n")
    r = lancer(d)
    assert r.returncode == 0, r.stdout + r.stderr
    assert "PDF : 0" in r.stdout


def test_rapport_technique_hors_racine_sort_en_1(tmp_path):
    d = depot_conforme(tmp_path)
    (d / "docs").mkdir()
    (d / "docs" / "rapport-technique-en.pdf").write_bytes(b"%PDF-1.4\n")
    r = lancer(d)
    assert r.returncode == 1
    assert "docs/rapport-technique-en.pdf" in r.stdout


def test_pdf_sans_extension_sort_en_1(tmp_path):
    d = depot_conforme(tmp_path)
    (d / "kb" / "notes.bin").write_bytes(b"%PDF-1.7\n\x00\x01")
    r = lancer(d)
    assert r.returncode == 1
    assert "kb/notes.bin" in r.stdout


@pytest.mark.parametrize("secret", [
    "AKIA" + "ABCDEFGHIJKLMNOP",
    "ghp_" + "a1B2c3D4e5F6g7H8i9J0k1L2",
    "-----BEGIN " + "PRIVATE KEY-----",
    "-----BEGIN " + "OPENSSH PRIVATE KEY-----",
], ids=["cle-aws", "jeton-github", "cle-privee", "cle-openssh"])   # identifiants neutres : la sortie de pytest va dans les preuves
def test_secret_sort_en_1(tmp_path, secret):
    d = depot_conforme(tmp_path)
    (d / "config").mkdir()
    (d / "config" / "local.txt").write_text(f"cle = {secret}\n", encoding="utf-8")
    r = lancer(d)
    assert r.returncode == 1
    assert "config/local.txt" in r.stdout


def test_fragment_reserve_dans_la_base_sort_en_1(tmp_path):
    d = depot_conforme(tmp_path)
    ligne = {"chunk_id": RESERVE + "::" + "0001", "doc_id": RESERVE, "text": "texte réservé"}
    with open(d / "kb" / "kb_chunks.jsonl", "a", encoding="utf-8") as f:
        f.write(json.dumps(ligne, ensure_ascii=False) + "\n")
    r = lancer(d)
    assert r.returncode == 1
    assert "kb/kb_chunks.jsonl" in r.stdout


def test_fragment_reserve_exporte_ailleurs_sort_en_1(tmp_path):
    d = depot_conforme(tmp_path)
    (d / "app" / "data").mkdir()
    (d / "app" / "data" / "base.json").write_text(
        json.dumps([{"doc_id": RESERVE, "text": "texte réservé"}], ensure_ascii=False), encoding="utf-8")
    r = lancer(d)
    assert r.returncode == 1
    assert "app/data/base.json" in r.stdout


def test_reference_a_un_fragment_reserve_sort_en_1(tmp_path):
    d = depot_conforme(tmp_path)
    (d / "config").mkdir()
    (d / "config" / "policy.yaml").write_text(f"source: {RESERVE}::" + "0003\n", encoding="utf-8")
    r = lancer(d)
    assert r.returncode == 1
    assert "config/policy.yaml" in r.stdout


def test_pages_du_texte_reserve_sort_en_1(tmp_path):
    d = depot_conforme(tmp_path)
    (d / "kb" / "pages" / "oms_afro_sbc_2014").mkdir()
    (d / "kb" / "pages" / "oms_afro_sbc_2014" / "p001.txt").write_text("page réservée", encoding="utf-8")
    r = lancer(d)
    assert r.returncode == 1
    assert "oms_afro_sbc_2014" in r.stdout


def test_fiche_en_double_sort_en_1(tmp_path):
    d = depot_conforme(tmp_path)
    sources = json.loads((d / "kb" / "sources.json").read_text(encoding="utf-8"))
    sources.append({"doc_id": RESERVE, "title": "copie"})
    (d / "kb" / "sources.json").write_text(json.dumps(sources, ensure_ascii=False), encoding="utf-8")
    r = lancer(d)
    assert r.returncode == 1
    assert "kb/sources.json" in r.stdout


@pytest.mark.skipif(shutil.which("git") is None, reason="git absent")
def test_depot_git_controle_ce_qui_serait_publie(tmp_path):
    d = depot_conforme(tmp_path)
    (d / ".gitignore").write_text("*.pdf\nvar/\n", encoding="utf-8")
    (d / "var").mkdir()
    (d / "var" / "brut.pdf").write_bytes(b"%PDF-1.4\n")
    subprocess.run(["git", "init", "-q", str(d)], check=True)
    r = lancer(d)
    assert r.returncode == 0, r.stdout + r.stderr   # ignoré : ne serait pas publié
    subprocess.run(["git", "-C", str(d), "add", "-f", "var/brut.pdf"], check=True)
    r = lancer(d)
    assert r.returncode == 1                        # ajouté de force : serait publié
    assert "var/brut.pdf" in r.stdout


def test_le_vrai_depot_est_conforme():
    r = lancer(ROOT)
    assert r.returncode == 0, r.stdout + r.stderr
