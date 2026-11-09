"""Charge kb_chunks.jsonl dans ChromaDB et permet d'interroger la base.

Compatible avec le code de référence UIT (CrashingGuru/ITUAIReadiness) :
même base vectorielle (ChromaDB) et même modèle d'embedding par défaut
(Ollama + nomic-embed-text, exécuté en local : aucune donnée ne quitte la machine).

Usage :
  python ingest_chroma.py ingest [--embed ollama|hash] [--db ./chroma_kb]
  python ingest_chroma.py query "transfert de données vers l'étranger" [--k 5]

--embed hash : embedding de secours sans modèle (pour tester la chaîne
uniquement ; qualité de recherche faible). Utilisez ollama pour la démo.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
from pathlib import Path

try:
    import chromadb
except ImportError:  # recherche de secours sans dépendance
    chromadb = None

ROOT = Path(__file__).parent
COLLECTION = "kb_policies_cameroun"


def hash_embed(texts: list[str], dim: int = 512) -> list[list[float]]:
    out = []
    for t in texts:
        v = [0.0] * dim
        for tok in re.findall(r"\w+", t.lower()):
            h = int(hashlib.md5(tok.encode()).hexdigest(), 16)
            v[h % dim] += 1.0
        n = math.sqrt(sum(x * x for x in v)) or 1.0
        out.append([x / n for x in v])
    return out


def ollama_embed(texts: list[str], model: str = "nomic-embed-text") -> list[list[float]]:
    import ollama  # pip install ollama ; ollama pull nomic-embed-text
    return [ollama.embeddings(model=model, prompt=t)["embedding"] for t in texts]


def embed(texts: list[str], mode: str) -> list[list[float]]:
    return ollama_embed(texts) if mode == "ollama" else hash_embed(texts)


def meta_of(c: dict) -> dict:
    keys = ["doc_id", "title", "authority", "date", "doc_type", "jurisdiction", "language",
            "url", "extraction", "status_note", "article", "section", "page_start", "page_end"]
    m = {k: c[k] for k in keys}
    m["qa_flags"] = " | ".join(c.get("qa_flags", []))
    return m


def ingest(db: str, mode: str, batch: int = 64) -> None:
    client = chromadb.PersistentClient(path=db)
    try:
        client.delete_collection(COLLECTION)
    except Exception:
        pass
    col = client.create_collection(COLLECTION, metadata={"hnsw:space": "cosine", "embed": mode})
    chunks = [json.loads(l) for l in open(ROOT / "kb_chunks.jsonl", encoding="utf-8")]
    for i in range(0, len(chunks), batch):
        part = chunks[i:i + batch]
        docs = [f"{c['title']} — {c['article'] or c['section']}\n{c['text']}" for c in part]
        col.add(ids=[c["chunk_id"] for c in part], documents=docs,
                embeddings=embed(docs, mode), metadatas=[meta_of(c) for c in part])
    print(f"{col.count()} fragments ingérés dans '{COLLECTION}' ({db}, embedding={mode})")


def query_local(q: str, k: int) -> None:
    """Recherche sans ChromaDB (embedding hash) : pour tester la base uniquement."""
    chunks = [json.loads(l) for l in open(ROOT / "kb_chunks.jsonl", encoding="utf-8")]
    docs = [f"{c['title']} — {c['article'] or c['section']}\n{c['text']}" for c in chunks]
    vecs, qv = hash_embed(docs), hash_embed([q])[0]
    scored = sorted(((sum(a * b for a, b in zip(v, qv)), c) for v, c in zip(vecs, chunks)), key=lambda x: -x[0])[:k]
    for s, c in scored:
        print(f"[{s:.3f}] {c['chunk_id']} | {c['title'][:60]} | {c['article'] or c['section']} | p.{c['page_start']}")


def query(db: str, q: str, k: int, mode: str = "auto") -> None:
    if mode == "bm25" or chromadb is None:
        from bm25 import load
        for s, c in load().search(q, k):
            print(f"[{s:.2f}] {c['chunk_id']} | {c['title'][:60]} | {c['article'] or c['section']} | p.{c['page_start']}")
        return
    client = chromadb.PersistentClient(path=db)
    col = client.get_collection(COLLECTION)
    mode = col.metadata.get("embed", "hash")
    res = col.query(query_embeddings=embed([q], mode), n_results=k)
    for cid, m, d in zip(res["ids"][0], res["metadatas"][0], res["distances"][0]):
        ref = m["article"] or m["section"]
        print(f"[{d:.3f}] {cid} | {m['title'][:60]} | {ref} | p.{m['page_start']} | {m['url'][:60]}")
        if m["qa_flags"]:
            print(f"        ⚠ {m['qa_flags']}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["ingest", "query"])
    ap.add_argument("text", nargs="?")
    ap.add_argument("--embed", default="ollama", choices=["ollama", "hash", "bm25"])
    ap.add_argument("--db", default=str(ROOT / "chroma_kb"))
    ap.add_argument("--k", type=int, default=5)
    a = ap.parse_args()
    ingest(a.db, a.embed) if a.cmd == "ingest" else query(a.db, a.text, a.k, a.embed)
