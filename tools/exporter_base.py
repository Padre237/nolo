"""SF-011-08 (TASK-011-08-01, FR-1127) — Base de connaissances embarquée dans Nolo.

    python3 tools/exporter_base.py             # écrit app/data/base.json, app/data/glossaire.json et app/data/regles.json
    python3 tools/exporter_base.py --verifier  # code 0 si les deux fichiers sont à jour

Contenu de `base.json` : tous les fragments `CMR-` de la version publique, et les fragments `INT-` cités par
la politique, l'agent Conformité, la correspondance articles ↔ pipeline, les règles de triage et les
traductions ; pour chaque document, son titre et son statut de vérification ; pour les fragments traduits,
la version anglaise officielle (fragment `…-EN`) ou la traduction non officielle avec sa mention.
Aucun fragment du texte réservé INT-OMS-AFRO-SBC-2014 (contrôle bloquant).
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

import yaml

RACINE = Path(__file__).resolve().parents[1]
KB = RACINE / "kb"
CIBLE = RACINE / "app" / "data" / "base.json"
CIBLE_GLOSSAIRE = RACINE / "app" / "data" / "glossaire.json"
CIBLE_REGLES = RACINE / "app" / "data" / "regles.json"
REGLES = ("recherche_specialite", "sbc_definitions", "fiabilite_pharmacies", "disponibilites")
RESERVE = "INT-OMS-AFRO-SBC-2014"
CITES = [RACINE / "config" / "policy.yaml", RACINE / "src" / "server" / "agents" / "conformite.py",
         KB / "traductions" / "citations_en.yaml", *sorted((KB / "mapping").glob("*.csv")),
         *sorted((RACINE / "rules").glob("*.yaml")), RACINE / "tools" / "scenarios" / "executer.py"]
MOTIF = re.compile(r"(?:CMR|INT)-[A-Z0-9-]+::\d{4}")


def statut_verification(source: dict) -> str:
    """vérifié | ocr | transcription_non_officielle (FR-1913)."""
    if "transcription non officielle" in (source.get("source_kind") or ""):
        return "transcription_non_officielle"
    if "OCR" in (source.get("extraction") or ""):
        return "ocr"
    return "verifie"


def cites() -> set[str]:
    return {m for f in CITES for m in MOTIF.findall(f.read_text(encoding="utf-8"))}


def produire() -> tuple[dict, dict]:
    brut = (KB / "kb_chunks.jsonl").read_bytes()
    chunks = [json.loads(l) for l in brut.decode("utf-8").splitlines() if l.strip()]
    sources = {s["doc_id"]: s for s in json.loads((KB / "sources.json").read_text(encoding="utf-8"))}
    traductions = yaml.safe_load((KB / "traductions" / "citations_en.yaml").read_text(encoding="utf-8"))
    voulus = cites()
    garder = [c for c in chunks if c["doc_id"].startswith("CMR-") or c["chunk_id"] in voulus]
    if any(c["doc_id"] == RESERVE for c in garder):
        raise SystemExit(f"refus : fragment de {RESERVE} dans l'export")
    connus = {c["chunk_id"] for c in chunks}
    absents = sorted(voulus - connus)

    documents = {}
    for c in garder:
        if c["doc_id"] not in documents:
            s = sources.get(c["doc_id"], {})
            documents[c["doc_id"]] = {"titre": c["title"], "autorite": c["authority"], "date": c["date"],
                                      "langue": c["language"], "statut": statut_verification(s or c)}
    for doc_id, d in documents.items():  # version anglaise officielle versée dans la base (même numérotation)
        if f"{doc_id}-EN" in documents:
            d["version_en"] = f"{doc_id}-EN"
    fragments = {c["chunk_id"]: {"doc": c["doc_id"], "article": c["article"], "section": c["section"],
                                 "page": c["page_start"], "texte": c["text"]} for c in garder}
    trad = {}
    for e in traductions["entrees"]:
        if e["chunk_id"] not in fragments:
            continue
        t = {"statut": e["statut_traduction"], "reference_en": e.get("reference_en")}
        if e.get("chunk_id_en") and e["chunk_id_en"] in fragments:
            t["chunk_id_en"] = e["chunk_id_en"]
        elif e.get("traduction_en"):
            t["texte_en"] = " ".join(str(e["traduction_en"]).split())
        trad[e["chunk_id"]] = t
    base = {
        "version": "kb-v9-publique",
        "genere_par": "tools/exporter_base.py",
        "empreinte_kb": "sha256:" + hashlib.sha256(brut).hexdigest(),
        "mention_non_officielle": traductions["mention_non_officielle"],
        "documents": documents,
        "fragments": fragments,
        "traductions": trad,
        "cites_absents": absents,
    }
    glo = yaml.safe_load((KB / "traductions" / "glossaire_requetes.yaml").read_text(encoding="utf-8"))
    glossaire = {"version": glo["version"], "genere_par": "tools/exporter_base.py",
                 "entrees": [{"en": e["en"], "courant_fr": e.get("courant_fr", []), "fr": e["fr"]}
                             for e in glo["entrees"]]}
    return base, glossaire


def produire_regles() -> dict:
    """Règles métier de `kb/rules/` utilisées par Nolo (synonymes, définitions SBC, fiabilité, disponibilités)."""
    regles = {"genere_par": "tools/exporter_base.py", "sources": [f"kb/rules/{n}.yaml" for n in REGLES]}
    for n in REGLES:
        regles[n] = yaml.safe_load((KB / "rules" / f"{n}.yaml").read_text(encoding="utf-8"))
    return regles


def texte(obj: dict) -> str:
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":")) + "\n"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--verifier", action="store_true")
    a = ap.parse_args()
    base, glossaire = produire()
    regles = produire_regles()
    if a.verifier:
        perimes = [p.name for p, o in ((CIBLE, base), (CIBLE_GLOSSAIRE, glossaire), (CIBLE_REGLES, regles))
                   if not p.exists() or p.read_text(encoding="utf-8") != texte(o)]
        print("à jour" if not perimes else f"périmé : {', '.join(perimes)} — relancer python3 tools/exporter_base.py")
        return 1 if perimes else 0
    CIBLE.parent.mkdir(parents=True, exist_ok=True)
    CIBLE.write_text(texte(base), encoding="utf-8")
    CIBLE_GLOSSAIRE.write_text(texte(glossaire), encoding="utf-8")
    CIBLE_REGLES.write_text(texte(regles), encoding="utf-8")
    n_int = sum(1 for k in base["fragments"] if k.startswith("INT-"))
    print(f"{CIBLE.relative_to(RACINE)} : {len(base['fragments'])} fragments ({n_int} INT), "
          f"{len(base['documents'])} documents, {len(base['traductions'])} traductions, "
          f"{CIBLE.stat().st_size} octets ; cités absents de la base : {base['cites_absents'] or 'aucun'}")
    print(f"{CIBLE_GLOSSAIRE.relative_to(RACINE)} : {len(glossaire['entrees'])} entrées")
    print(f"{CIBLE_REGLES.relative_to(RACINE)} : {', '.join(REGLES)} ({CIBLE_REGLES.stat().st_size} octets)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
