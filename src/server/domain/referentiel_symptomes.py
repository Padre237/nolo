"""SF-001-03 (TASK-001-03-05, FR-124, FR-126) — Référentiel des symptômes côté serveur : chargement, validation,
filtre des propositions du LLM.

Mêmes règles que l'appareil (`src/client/ondevice/referentiel.mjs`) ; en plus, côté serveur, chaque identifiant de
la colonne `sources` doit exister dans `kb/kb_chunks.jsonl`. La normalisation des expressions est celle de
`tools/donnees/generer_referentiel_symptomes.norm_expr` (parité contrôlée par `tests/regression/`).
"""
from __future__ import annotations

import csv
import hashlib
import io
import re
import unicodedata
from pathlib import Path

import yaml

COLONNES = ["code", "jeton", "libelle_fr", "libelle_en", "libelle_source", "synonymes_fr", "synonymes_en", "domaine",
            "public", "observable_non_professionnel", "affiche", "usage", "sensibilite", "sources", "implique",
            "snomed_gps_id", "statut"]


def norm_expr(t: str) -> str:
    t = "".join(ch for ch in unicodedata.normalize("NFD", t) if unicodedata.category(ch) != "Mn").lower()
    t = re.sub(r"[^a-z0-9]+", " ", t)
    return " ".join(m[:-1] if len(m) >= 4 and m[-1] in "sx" else m for m in t.split())


def charger_referentiel(dossier: Path) -> tuple[list[dict], dict]:
    entrees = list(csv.DictReader(open(Path(dossier) / "symptomes.csv", encoding="utf-8")))
    meta = yaml.safe_load((Path(dossier) / "symptomes.meta.yaml").read_text(encoding="utf-8"))
    return entrees, meta


def utilisable(e: dict) -> bool:
    """Entrée utilisable par l'extracteur et le LLM (FR-122) : non exclue, observable sans appareil."""
    return not e["sensibilite"].startswith("exclu") and e["observable_non_professionnel"] == "oui"


def _csv(entrees: list[dict]) -> bytes:
    f = io.StringIO()
    w = csv.DictWriter(f, fieldnames=list(entrees[0].keys()))
    w.writeheader()
    w.writerows(entrees)
    return f.getvalue().encode("utf-8")


def valider_referentiel(entrees: list[dict], meta: dict, chunks: set[str]) -> list[str]:
    """Liste des erreurs (vide si le référentiel est valide)."""
    erreurs = []
    if not entrees or list(entrees[0].keys()) != COLONNES:
        return ["colonnes inattendues"]
    codes, jetons, expressions = set(), set(), {}
    for e in entrees:
        if not re.fullmatch(r"SYM-\d{3}", e["code"]) or e["code"] in codes:
            erreurs.append(f"code invalide ou dupliqué : {e['code']}")
        if e["jeton"] in jetons:
            erreurs.append(f"jeton dupliqué : {e['jeton']}")
        if e["snomed_gps_id"].strip():
            erreurs.append(f"snomed_gps_id non vide : {e['jeton']} (FR-125)")
        codes.add(e["code"])
        jetons.add(e["jeton"])
        for s in e["sources"].split():
            if s not in chunks:
                erreurs.append(f"source absente de la base : {e['jeton']} -> {s}")
    for e in entrees:
        for i in e["implique"].split():
            if i not in jetons:
                erreurs.append(f"implication vers un jeton inconnu : {e['jeton']} -> {i}")
        if utilisable(e):
            brutes = [e["libelle_fr"], e["libelle_en"], *e["synonymes_fr"].split("|"), *e["synonymes_en"].split("|")]
            for x in filter(None, (norm_expr(b) for b in brutes)):
                if expressions.setdefault(x, e["jeton"]) != e["jeton"]:
                    erreurs.append(f"expression ambiguë : « {x} » ({expressions[x]}, {e['jeton']})")
    if "sha256:" + hashlib.sha256(_csv(entrees)).hexdigest() != "sha256:" + meta["empreinte_sha256"].removeprefix("sha256:"):
        erreurs.append("empreinte SHA-256 différente de symptomes.meta.yaml")
    return erreurs


def filtrer_propositions(propositions: list[str], entrees: list[dict]) -> tuple[list[str], int]:
    """FR-126 : ne garder que des jetons existants, utilisables et non `sante_avis_juriste` (D-022) ; compter les refus
    sans les nommer."""
    permis = {e["jeton"] for e in entrees if utilisable(e) and e["sensibilite"] != "sante_avis_juriste"}
    gardes = sorted({p for p in propositions if p in permis})
    return gardes, sum(1 for p in propositions if p not in permis)
