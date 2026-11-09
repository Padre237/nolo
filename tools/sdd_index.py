#!/usr/bin/env python3
"""Index de travail des spécifications (outillage documentaire, hors produit).

Lit les dossiers `docs/specifications/**/sf-*` et `mt-*` (même format que tools/trace.py) et écrit :
- docs/specifications/INDEX-TACHES.md : toutes les tâches dont le statut n'est pas « Fait », avec leur dossier,
  leurs exigences, leurs fichiers, leurs dépendances et la vague du catalogue ;
- docs/specifications/ECARTS.md : tous les écarts spécification ↔ code (§9 de chaque design.md).

Usage : python3 tools/sdd_index.py   (code de sortie 0)
À relancer après toute modification d'un tasks.md ou d'un design.md.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SPECS = ROOT / "docs" / "specifications"
RE_SF = re.compile(r"^(sf-\d{3}-\d{2}|mt-\d{3})-")

VAGUE_A = {"MT-002", "SF-017-05", "SF-017-02", "SF-011-04", "SF-017-01"}
VAGUE_B = {"SF-011-08", "SF-007-17", "SF-007-21", "SF-007-18", "SF-007-19", "SF-007-20",
           "SF-016-01", "SF-016-02", "SF-016-03", "SF-016-04"}
VAGUE_D = {"SF-001-19", "SF-012-05", "SF-002-08", "SF-002-10", "SF-002-11", "SF-009-03", "SF-016-05", "SF-017-03",
           "SF-006-05", "SF-006-06", "SF-006-07", "SF-006-08"}


def vague(sf: str) -> str:
    if sf in VAGUE_A:
        return "A"
    if sf in VAGUE_B:
        return "B"
    if sf in VAGUE_D:
        return "D"
    return "C"


def titre(texte: str) -> str:
    m = re.match(r"#\s+(\S+)\s+—\s+(.*?)\s+—", texte)
    return m.group(2) if m else ""


def main() -> int:
    taches, ecarts = [], []
    for d in sorted(p for p in SPECS.rglob("*") if p.is_dir() and RE_SF.match(p.name)):
        sf = RE_SF.match(d.name).group(1).upper()
        rel = d.relative_to(SPECS).as_posix()
        t = (d / "tasks.md").read_text(encoding="utf-8") if (d / "tasks.md").exists() else ""
        nom = titre((d / "requirements.md").read_text(encoding="utf-8")) if (d / "requirements.md").exists() else ""
        for m in re.finditer(r"^###\s+(TASK-[\dA-Z-]+)\s*[—-]\s*(.*?)$(.*?)(?=^###\s|^##\s|\Z)", t, re.M | re.S):
            ch = {l.group(1).strip(): l.group(2).strip() for l in re.finditer(r"^-\s*([^:\n]+?)\s*:\s*(.*)$", m.group(3), re.M)}
            st = ch.get("Statut", "?")
            if st.startswith("Fait"):
                continue
            taches.append((vague(sf), sf, nom, rel, m.group(1), m.group(2).strip(), st.split(" (")[0], ch.get("Exigences", ""),
                           ch.get("Fichiers à créer ou modifier", ""), ch.get("Dépend de", "—"), ch.get("Tests", "")))
        dz = (d / "design.md").read_text(encoding="utf-8") if (d / "design.md").exists() else ""
        sec = re.search(r"^##\s+9\..*?$(.*?)(?=^##\s|\Z)", dz, re.M | re.S)
        if sec:
            for l in re.findall(r"^-\s+(.*)$", sec.group(1), re.M):
                if not l.startswith("Aucun écart"):
                    ecarts.append((sf, nom, rel, l))
    taches.sort(key=lambda x: (x[0], x[1], x[4]))
    L = ["# Index des tâches restantes", "", "Généré par `python3 tools/sdd_index.py` — ne pas modifier à la main.", "",
         f"{len(taches)} tâches dont le statut n'est pas « Fait ». Vagues : A soumission, B agents dans Nolo, C écarts de l'existant, D suite (catalogue §6).",
         "Rappel : une tâche ne démarre que si son dossier est `APPROVED` ou `READY_FOR_DEV` (CLAUDE.md, protocole).", ""]
    for v in "ABCD":
        lot = [x for x in taches if x[0] == v]
        if not lot:
            continue
        L += [f"## Vague {v} ({len(lot)} tâches)", "", "| Dossier | Tâche | Statut | Exigences | Fichiers | Dépend de | Tests |", "|---|---|---|---|---|---|---|"]
        for (_, sf, nom, rel, tid, ti, st, ex, fi, dep, te) in lot:
            c = lambda s: s.replace("|", "\\|")
            L.append(f"| [{sf}]({rel}/tasks.md) {c(nom)} | **{tid}** {c(ti)} | {st} | {ex} | {c(fi)} | {c(dep)} | {te} |")
        L.append("")
    (SPECS / "INDEX-TACHES.md").write_text("\n".join(L) + "\n", encoding="utf-8")
    E = ["# Écarts entre les spécifications et le code", "", "Généré par `python3 tools/sdd_index.py` — ne pas modifier à la main.", "",
         f"{len(ecarts)} écarts connus (§9 des `design.md`). Chacun a une tâche « À faire » ou « Partiel » dans son dossier.", "",
         "| Dossier | Écart |", "|---|---|"]
    E += [f"| [{sf}]({rel}/design.md) {nom.replace('|', '/')} | {l.replace('|', '/')} |" for (sf, nom, rel, l) in ecarts]
    (SPECS / "ECARTS.md").write_text("\n".join(E) + "\n", encoding="utf-8")
    print(f"{len(taches)} tâches restantes ; {len(ecarts)} écarts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
