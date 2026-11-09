#!/usr/bin/env python3
"""Outillage documentaire (hors produit) : vérifie la traçabilité des dossiers de spécification
et régénère docs/traceability/matrix.md.

Usage : python3 tools/trace.py [--kb CHEMIN_kb_chunks.jsonl] [--sans-ecriture]
Code de sortie : 0 si aucune erreur, 1 sinon (la matrice est écrite dans les deux cas).
Règles vérifiées : docs/quality/test-strategy.md §5.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SPECS = ROOT / "docs" / "specifications"
STATUTS = {"DRAFT", "UNDER_REVIEW", "APPROVED", "READY_FOR_DEV", "IN_PROGRESS", "IN_TESTING", "DONE"}
FICHIERS = ("requirements.md", "design.md", "tasks.md", "tests.md")
RE_REQ = r"(?:FR|NFR)-\d{3,4}"
RE_CHUNK = re.compile(r"(?:CMR|INT)-[A-Z0-9-]+::\d{4}")
RE_SF = re.compile(r"^(sf-\d{3}-\d{2}|mt-\d{3})-")
SUF = r"(?:\d{3}-\d{2}|M\d{2})-\d{2}"   # SF-XXX-NN-NN ou MT : M01-NN


def ids(texte: str, motif: str) -> list[str]:
    return re.findall(motif, texte)


def statut_entete(texte: str) -> str | None:
    m = re.search(r"^\|\s*Statut\s*\|\s*([A-Z_]+)\s*\|", texte, re.M)
    return m.group(1) if m else None


def section(texte: str, titre_regex: str) -> str:
    m = re.search(rf"^##\s+{titre_regex}.*?$(.*?)(?=^##\s|\Z)", texte, re.M | re.S)
    return m.group(1) if m else ""


def blocs(texte: str, prefixe: str) -> dict[str, dict[str, str]]:
    """Découpe les blocs '### PREFIXE-… — titre' et leurs lignes '- Clé : valeur'."""
    res = {}
    for m in re.finditer(rf"^###\s+({prefixe}-[\dA-Z-]+)\s*[—-]\s*(.*?)$(.*?)(?=^###\s|^##\s|\Z)", texte, re.M | re.S):
        champs = {"titre": m.group(2).strip()}
        for l in re.finditer(r"^-\s*([^:\n]+?)\s*:\s*(.*)$", m.group(3), re.M):
            champs[l.group(1).strip()] = l.group(2).strip()
        res[m.group(1)] = champs
    return res


def lignes_tableau(texte: str, prefixe_regex: str) -> list[list[str]]:
    out = []
    for l in texte.splitlines():
        if re.match(rf"^\|\s*{prefixe_regex}\b", l):
            out.append([c.strip() for c in l.strip().strip("|").split("|")])
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--kb", default=None)
    ap.add_argument("--sans-ecriture", action="store_true")
    a = ap.parse_args()
    kb_path = Path(a.kb) if a.kb else next((p for p in (ROOT / "kb" / "kb_chunks.jsonl", ROOT.parent / "kb" / "kb_chunks.jsonl") if p.exists()), None)
    chunks = {json.loads(l)["chunk_id"] for l in open(kb_path, encoding="utf-8")} if kb_path else set()

    erreurs: list[str] = []
    avert: list[str] = []
    proprietaire: dict[str, str] = {}
    statut_req: dict[str, str] = {}
    texte_req: dict[str, str] = {}
    references: dict[str, set[str]] = defaultdict(set)
    des_cov: dict[str, set[str]] = defaultdict(set)
    task_cov: dict[str, set[str]] = defaultdict(set)
    test_cov: dict[str, set[str]] = defaultdict(set)
    task_statut: dict[str, str] = {}
    test_statut: dict[str, str] = {}
    vus: dict[str, str] = {}
    dossiers = []
    statut_sf: dict[str, str] = {}

    for d in sorted(p for p in SPECS.rglob("*") if p.is_dir() and RE_SF.match(p.name)):
        sf = RE_SF.match(d.name).group(1).upper()
        dossiers.append(sf)
        manquants = [f for f in FICHIERS if not (d / f).exists()]
        if manquants:
            erreurs.append(f"{sf} : fichiers manquants {manquants}")
            continue
        T = {f: (d / f).read_text(encoding="utf-8") for f in FICHIERS}
        for f, t in T.items():
            s = statut_entete(t)
            if s not in STATUTS:
                erreurs.append(f"{sf}/{f} : statut absent ou invalide ({s})")
            for c in set(RE_CHUNK.findall(t)):
                if chunks and c not in chunks:
                    erreurs.append(f"{sf}/{f} : chunk_id inexistant {c}")
        statut_sf[sf] = statut_entete(T["requirements.md"]) or "?"

        def declare(i: str, ou: str):
            if i in vus and vus[i] != ou:
                erreurs.append(f"identifiant dupliqué {i} ({vus[i]} et {ou})")
            vus[i] = ou

        r = T["requirements.md"]
        for row in lignes_tableau(section(r, r"3\.") + section(r, r"5\."), RE_REQ):
            i = row[0]
            declare(i, sf)
            if i in proprietaire and proprietaire[i] != sf:
                erreurs.append(f"{i} possédée par {proprietaire[i]} et {sf}")
            proprietaire[i] = sf
            statut_req[i] = row[-1] if row else ""
            texte_req[i] = row[1] if len(row) > 1 else ""
        for i in ids(section(r, r"4\."), RE_REQ):
            references[i].add(sf)
        for row in lignes_tableau(r, r"CA-" + SUF):
            declare(row[0], sf)
            if not ids(" ".join(row[1:2]), RE_REQ):
                erreurs.append(f"{row[0]} : aucune exigence citée")
        for row in lignes_tableau(r, r"BR-" + SUF):
            declare(row[0], sf)

        for row in lignes_tableau(T["design.md"], r"DES-" + SUF):
            declare(row[0], sf)
            cites = ids(" ".join(row[1:]), RE_REQ)
            if not cites:
                erreurs.append(f"{row[0]} : élément de conception sans exigence")
            for i in cites:
                des_cov[i].add(row[0])

        for tid, ch in blocs(T["tasks.md"], "TASK").items():
            declare(tid, sf)
            cites = ids(ch.get("Exigences", ""), RE_REQ)
            if not cites:
                erreurs.append(f"{tid} : tâche sans exigence")
            if not ids(ch.get("Tests", ""), r"TEST-" + SUF):
                erreurs.append(f"{tid} : tâche sans test")
            for i in cites:
                task_cov[i].add(tid)
            task_statut[tid] = ch.get("Statut", "?")

        for tid, ch in blocs(T["tests.md"], "TEST").items():
            declare(tid, sf)
            cites = ids(ch.get("Exigences", ""), RE_REQ)
            if not cites:
                erreurs.append(f"{tid} : test sans exigence")
            if not ch.get("Alors"):
                erreurs.append(f"{tid} : test sans résultat attendu (« Alors »)")
            for i in cites:
                test_cov[i].add(tid)
            test_statut[tid] = ch.get("Statut d'exécution", "?")

    # Exigences v1.3 : chacune possédée exactement une fois
    base = set()
    for f in (ROOT / "docs" / "archive" / "baseline-v1.3" / "specs").glob("*/spec.md"):
        base |= set(re.findall(r"\*\*(FR-\d{3})\*\*", f.read_text(encoding="utf-8")))
    for i in sorted(base):
        if i not in proprietaire:
            erreurs.append(f"exigence v1.3 {i} sans sous-fonctionnalité propriétaire")
    for i, sfs in references.items():
        if i not in proprietaire:
            erreurs.append(f"{i} référencée par {sorted(sfs)} mais possédée par aucune sous-fonctionnalité")
    for i, sf in proprietaire.items():
        if "REMPLAC" in statut_req.get(i, "").upper():
            continue   # exigence remplacée : conservée pour la traçabilité, sans conception ni test propres
        if i.startswith("FR-"):
            if not des_cov.get(i):
                erreurs.append(f"{i} ({sf}) sans élément de conception")
            if not task_cov.get(i):
                erreurs.append(f"{i} ({sf}) sans tâche")
            if not test_cov.get(i):
                erreurs.append(f"{i} ({sf}) sans test")
        elif not test_cov.get(i):
            avert.append(f"{i} ({sf}) sans test")
    for cov, nom in ((des_cov, "conception"), (task_cov, "tâche"), (test_cov, "test")):
        for i in cov:
            if i not in proprietaire:
                erreurs.append(f"{nom} cite {i}, qui n'est possédée par aucune sous-fonctionnalité")

    def etat_impl(i):
        st = {task_statut[t] for t in task_cov.get(i, ())}
        return "Non commencé" if st <= {"À faire", "?"} else ", ".join(sorted(st))

    def etat_verif(i):
        st = [test_statut[t] for t in test_cov.get(i, ())]
        ok = sum(1 for s in st if s.lower().startswith("exécuté") and "réussi" in s.lower())
        return f"{ok}/{len(st)} exécutés et réussis"

    lignes = [
        "# Matrice de traçabilité",
        "",
        "Générée par `python3 tools/trace.py` — ne pas modifier à la main.",
        "",
        f"Sous-fonctionnalités : {len(dossiers)} · Exigences possédées : {len(proprietaire)} · "
        f"Éléments de conception : {sum(1 for v in vus if v.startswith('DES-'))} · Tâches : {len(task_statut)} · Tests : {len(test_statut)}",
        f"Erreurs : {len(erreurs)} · Avertissements : {len(avert)}",
        "",
        "## Statut des dossiers",
        "",
        "| Statut | Nombre |",
        "|---|---|",
    ]
    cnt = defaultdict(int)
    for s in statut_sf.values():
        cnt[s] += 1
    lignes += [f"| {k} | {v} |" for k, v in sorted(cnt.items())]
    lignes += ["", "## Exigence → conception → tâches → tests → implémentation → vérification", "",
               "| Exigence | Sous-fonctionnalité | Statut | Conception | Tâches | Tests | Implémentation | Vérification |",
               "|---|---|---|---|---|---|---|---|"]

    def cle(i):
        p, n = i.split("-")
        return (p, int(n))

    for i in sorted(proprietaire, key=cle):
        lignes.append(f"| {i} | {proprietaire[i]} | {statut_req.get(i, '')} | {', '.join(sorted(des_cov.get(i, ())))} | "
                      f"{', '.join(sorted(task_cov.get(i, ())))} | {', '.join(sorted(test_cov.get(i, ())))} | {etat_impl(i)} | {etat_verif(i)} |")
    lignes += ["", "## Erreurs", ""] + ([f"- {e}" for e in erreurs] or ["Aucune."])
    lignes += ["", "## Avertissements", ""] + ([f"- {w}" for w in avert] or ["Aucun."])
    if not a.sans_ecriture:
        (ROOT / "docs" / "traceability").mkdir(parents=True, exist_ok=True)
        (ROOT / "docs" / "traceability" / "matrix.md").write_text("\n".join(lignes) + "\n", encoding="utf-8")
    print(f"{len(dossiers)} dossiers, {len(proprietaire)} exigences, {len(task_statut)} tâches, {len(test_statut)} tests ; "
          f"{len(erreurs)} erreur(s), {len(avert)} avertissement(s)")
    for e in erreurs[:60]:
        print("ERREUR", e)
    return 1 if erreurs else 0


if __name__ == "__main__":
    sys.exit(main())
