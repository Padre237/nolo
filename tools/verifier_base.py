#!/usr/bin/env python3
"""Contrôles de la base de connaissances publiée (SF-011-01, SF-011-05, SF-011-07).

- schéma de chaque fragment, identifiants uniques, aucun texte vide ;
- aucun fragment ni page du texte « tous droits réservés » INT-OMS-AFRO-SBC-2014 ; aucun PDF dans le dépôt ;
- chaque chunk_id cité par la correspondance, la politique et l'agent Conformité existe ;
- avec --reconstruire : kb/build_kb.py relancé dans un dossier temporaire redonne exactement kb/kb_chunks.jsonl.

Usage : python3 tools/verifier_base.py [--reconstruire]   (code de sortie 0 si tout est conforme)
"""
from __future__ import annotations

import argparse
import csv
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KB = ROOT / "kb"
CHAMPS = ["chunk_id", "doc_id", "title", "authority", "date", "doc_type", "jurisdiction", "language", "url", "source_kind",
          "rights_note", "extraction", "status_note", "article", "section", "page_start", "page_end", "qa_flags", "text"]
RESERVE = "INT-OMS-AFRO-SBC-2014"
RE_CHUNK = re.compile(r"(?:CMR|INT)-[A-Z0-9-]+::\d{4}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--reconstruire", action="store_true")
    a = ap.parse_args()
    erreurs = []
    lignes = (KB / "kb_chunks.jsonl").read_text(encoding="utf-8").splitlines()
    fr = [json.loads(l) for l in lignes]
    ids = [c["chunk_id"] for c in fr]
    if len(set(ids)) != len(ids):
        erreurs.append("chunk_id dupliqués")
    for c in fr:
        manque = [k for k in CHAMPS if k not in c]
        if manque:
            erreurs.append(f"{c.get('chunk_id')} : champs manquants {manque}")
        if not str(c.get("text", "")).strip():
            erreurs.append(f"{c['chunk_id']} : texte vide")
        if c.get("doc_id") == RESERVE:
            erreurs.append(f"{c['chunk_id']} : texte réservé présent")
    docs = sorted({c["doc_id"] for c in fr})
    if (KB / "pages" / "oms_afro_sbc_2014").exists():
        erreurs.append("kb/pages/oms_afro_sbc_2014 présent")
    pdfs = [p for p in ROOT.rglob("*.pdf") if ".git" not in p.parts]
    if pdfs:
        erreurs.append(f"PDF présents : {[str(p.relative_to(ROOT)) for p in pdfs][:5]}")
    connus = set(ids)
    cites = {}
    for r in csv.DictReader(open(KB / "mapping" / "correspondance_articles_pipeline_agents.csv", encoding="utf-8")):
        for x in RE_CHUNK.findall(" ".join(r.values())):
            cites.setdefault(x, "correspondance")
    for p in (ROOT / "config" / "policy.yaml", ROOT / "src" / "server" / "agents" / "conformite.py"):
        for x in RE_CHUNK.findall(p.read_text(encoding="utf-8")):
            cites.setdefault(x, p.name)
    for x, ou in sorted(cites.items()):
        if x not in connus and not x.startswith(RESERVE):
            erreurs.append(f"{x} cité par {ou} : absent de la base")
    print(f"{len(fr)} fragments ; {len(docs)} documents ; {len(cites)} fragments cités contrôlés")
    if a.reconstruire:
        with tempfile.TemporaryDirectory() as tmp:
            copie = Path(tmp) / "kb"
            shutil.copytree(KB, copie, ignore=shutil.ignore_patterns("__pycache__", "chroma_kb"))
            (copie / "kb_chunks.jsonl").unlink()
            r = subprocess.run([sys.executable, "-I", str(copie / "build_kb.py")], cwd=copie, capture_output=True, text=True)
            if r.returncode != 0:
                erreurs.append(f"build_kb.py a échoué : {r.stderr[-300:]}")
            else:
                neuf = (copie / "kb_chunks.jsonl").read_text(encoding="utf-8")
                ancien = (KB / "kb_chunks.jsonl").read_text(encoding="utf-8")
                if neuf != ancien:
                    n1, n2 = neuf.splitlines(), ancien.splitlines()
                    diff = sum(1 for x, y in zip(n1, n2) if x != y) + abs(len(n1) - len(n2))
                    erreurs.append(f"reconstruction différente : {len(n1)} lignes contre {len(n2)}, {diff} lignes différentes")
                else:
                    print("reconstruction : identique octet pour octet")
    for e in erreurs:
        print("ERREUR", e)
    print("conforme" if not erreurs else f"{len(erreurs)} erreur(s)")
    return 0 if not erreurs else 1


if __name__ == "__main__":
    raise SystemExit(main())
