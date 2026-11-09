"""Évalue la recherche : pour chaque question, le document (et la référence) attendus sont-ils dans le top k ?
Usage : python eval/run_eval.py [--embed hash|ollama] [--k 5]
Avec --embed hash : base lexicale sans modèle (plancher). Avec ollama : la vraie configuration de démo (ChromaDB requis)."""
import argparse, json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from ingest_chroma import hash_embed, embed, chromadb, COLLECTION

ap = argparse.ArgumentParser(); ap.add_argument("--embed", default="hash"); ap.add_argument("--k", type=int, default=5)
ap.add_argument("--db", default=str(ROOT / "chroma_kb")); a = ap.parse_args()
qs = [json.loads(l) for l in open(ROOT / "eval" / "questions_test.jsonl", encoding="utf-8")]
chunks = [json.loads(l) for l in open(ROOT / "kb_chunks.jsonl", encoding="utf-8")]
if a.embed == "bm25":
    from bm25 import load
    idx = load()
    def search(q):
        return [c for _, c in idx.search(q, a.k)]
elif a.embed == "hash":
    docs = [f"{c['title']} — {c['article'] or c['section']}\n{c['text']}" for c in chunks]
    vecs = hash_embed(docs)
    def search(q):
        qv = hash_embed([q])[0]
        sc = sorted(range(len(chunks)), key=lambda i: -sum(x * y for x, y in zip(vecs[i], qv)))[:a.k]
        return [chunks[i] for i in sc]
else:
    col = chromadb.PersistentClient(path=a.db).get_collection(COLLECTION)
    def search(q):
        r = col.query(query_embeddings=embed([q], "ollama"), n_results=a.k)
        return r["metadatas"][0]
doc_hits = ref_hits = 0
for q in qs:
    res = search(q["question"])
    d = any(r["doc_id"] == q["attendu_doc"] for r in res)
    rf = (not q["attendu_ref"]) and d or any(r["doc_id"] == q["attendu_doc"] and r["article"].startswith(q["attendu_ref"]) for r in res)
    doc_hits += d; ref_hits += bool(rf)
    print(f"{q['id']} [{'OK ' if rf else ('DOC' if d else 'NON')}] {q['agent']:<15} -> {res[0]['doc_id']} {res[0]['article'] or res[0]['section'][:40]}")
print(f"\nDocument attendu dans le top {a.k} : {doc_hits}/{len(qs)} ; référence exacte : {ref_hits}/{len(qs)} (embedding={a.embed})")
