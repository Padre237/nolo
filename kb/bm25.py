"""Recherche lexicale BM25 sans dépendance (français/anglais, accents normalisés).
À combiner avec les embeddings (recherche hybride) : BM25 retrouve les termes juridiques exacts
(« profilage », « 24 heures », « article 32 »), les embeddings retrouvent le sens."""
import json, math, re, unicodedata
from collections import Counter
from pathlib import Path

STOP = set("""a au aux avec ce ces dans de des du elle en et eux il je la le les leur lui ma mais me même mes moi mon ne nos notre nous on ou par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une vos votre vous est sont été être ont a été cette cet dont ainsi lorsque tout toute tous toutes peut doit
the of and to in for on with by is are be as or an at from that this which it its""".split())


def norm(t: str) -> list[str]:
    t = unicodedata.normalize("NFKD", t.lower())
    t = "".join(c for c in t if not unicodedata.combining(c))
    toks = re.findall(r"[a-z0-9]+", t)
    return [w[:-1] if len(w) > 4 and w.endswith("s") else w for w in toks if w not in STOP and len(w) > 1]


class BM25:
    def __init__(self, chunks: list[dict], k1: float = 1.4, b: float = 0.75):
        self.chunks, self.k1, self.b = chunks, k1, b
        self.docs = [Counter(norm(f"{c['title']} {c['article']} {c['section']} {c['text']}")) for c in chunks]
        self.lens = [sum(d.values()) for d in self.docs]
        self.avg = sum(self.lens) / len(self.lens)
        df = Counter(w for d in self.docs for w in d)
        n = len(self.docs)
        self.idf = {w: math.log(1 + (n - f + 0.5) / (f + 0.5)) for w, f in df.items()}

    def search(self, q: str, k: int = 5, doc_filter=None) -> list[tuple[float, dict]]:
        qt = norm(q)
        scores = []
        for i, d in enumerate(self.docs):
            if doc_filter and self.chunks[i]["doc_id"] not in doc_filter:
                continue
            s = 0.0
            for w in qt:
                f = d.get(w)
                if f:
                    s += self.idf[w] * f * (self.k1 + 1) / (f + self.k1 * (1 - self.b + self.b * self.lens[i] / self.avg))
            scores.append((s, i))
        scores.sort(reverse=True)
        return [(s, self.chunks[i]) for s, i in scores[:k]]


def load(path: Path | None = None) -> BM25:
    path = path or Path(__file__).parent / "kb_chunks.jsonl"
    return BM25([json.loads(l) for l in open(path, encoding="utf-8")])
