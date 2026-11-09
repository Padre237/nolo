"""SF-016-01 (TASK-016-01-01, FR-2204) — Oracle des classements du conseiller « Mes droits santé ».

    python3 tools/exporter_classements.py   # écrit tests/js/fixtures/classements_attendus.json

Pour chacune des 40 questions de `kb/eval/questions_test.jsonl`, le classement que rend `kb/bm25.py` (même
code, mêmes paramètres) sur les fragments de la base embarquée (`app/data/base.json`) : top 5 limité aux
textes camerounais (`CMR-`), puis top 5 limité aux textes internationaux (`INT-`), avec les scores.
Le moteur JavaScript de Nolo doit rendre exactement les mêmes `chunk_id` dans le même ordre.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(RACINE / "kb"))

from bm25 import BM25  # noqa: E402

CIBLE = RACINE / "tests" / "js" / "fixtures" / "classements_attendus.json"


def main() -> int:
    base = json.loads((RACINE / "app" / "data" / "base.json").read_text(encoding="utf-8"))
    chunks = [{"chunk_id": cid, "doc_id": f["doc"], "title": base["documents"][f["doc"]]["titre"],
               "article": f["article"], "section": f["section"], "text": f["texte"]}
              for cid, f in base["fragments"].items()]
    idx = BM25(chunks)
    docs = {c["doc_id"] for c in chunks}
    cmr = {d for d in docs if d.startswith("CMR-")}
    intl = docs - cmr
    questions = [json.loads(l) for l in open(RACINE / "kb" / "eval" / "questions_test.jsonl", encoding="utf-8")]
    sortie = []
    for q in questions:
        r_cmr = idx.search(q["question"], 5, doc_filter=cmr)
        r_int = idx.search(q["question"], 5, doc_filter=intl)
        sortie.append({"id": q["id"], "question": q["question"],
                       "cmr": [[c["chunk_id"], round(s, 9)] for s, c in r_cmr],
                       "int": [[c["chunk_id"], round(s, 9)] for s, c in r_int]})
    CIBLE.parent.mkdir(parents=True, exist_ok=True)
    CIBLE.write_text(json.dumps({"genere_par": "tools/exporter_classements.py", "base": base["empreinte_kb"],
                                 "fragments": len(chunks), "k1": idx.k1, "b": idx.b, "questions": sortie},
                                ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"{CIBLE.relative_to(RACINE)} : {len(sortie)} questions, index de {len(chunks)} fragments")
    return 0


if __name__ == "__main__":
    sys.exit(main())
