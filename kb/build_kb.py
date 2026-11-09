"""Construit la base de connaissances (kb_chunks.jsonl) à partir des textes officiels.

Modes de découpage (champ "split" de sources.json) :
- article_cmr : lois camerounaises ("Article 6.-", "ARTICLE 1er.-")
- section_cmr_en : version anglaise des lois camerounaises ("SECTION 6:") ; libellé « Section N » ; contexte : « CHAPTER … »
- article_eu  : règlements européens ("Article premier" / "Article 9" seuls sur leur ligne) + annexes
- article_rsi : Règlement sanitaire international ("Article 1 Définitions") + annexes
- window      : guides et stratégies, ~350 mots, chevauchement 50, rubrique + pages
Un article de plus de 450 mots est redécoupé en parties (même étiquette d'article).
Le texte précédant le premier article (préambule, considérants) est découpé en fenêtres.

Usage : python build_kb.py  -> kb_chunks.jsonl
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).parent
SOURCES = json.loads((ROOT / "sources.json").read_text(encoding="utf-8"))

ART_RES = {
    "article_cmr": re.compile(
        r"^[\s\W]{0,6}(?:A|AI-|\\)?(?:R|r)?(?:TICLE|ticle|ticlc|TIGLE)\W{0,2}\s*(\d+)\s*(?:er|cr|ER)?\s*[\._\-–:]",
        re.MULTILINE),
    "article_eu": re.compile(r"^\s*Article\s+(premier|\d+)\s*$", re.MULTILINE),
    "article_rsi": re.compile(r"^\s*Article\s+(\d+)\s+[A-ZÉÈÀÂ]", re.MULTILINE),
    "section_cmr_en": re.compile(r"^\s*SECTION\s+(\d+)\s*:", re.MULTILINE),
}
CHAPTER_EN_RE = re.compile(r"^\s*CHAPTER\s+[IVXLC0-9]+\b.*$", re.MULTILINE)
ANNEX_RE = re.compile(r"^\s*ANNEXE\s+([IVXLC]+|\d+)\b.*$", re.MULTILINE)
STRUCT_RE = re.compile(r"^\s*(TITRE|CHAPITRE|SECTION|PARTIE)\s+([IVXLC0-9]+|PREMIER|UNIQUE)\b.*$", re.IGNORECASE | re.MULTILINE)
HEAD_RE = re.compile(
    r"^\s*((?:[IVX]{1,5}\.)\s+[A-ZÉÈÊÀÂÎÔÛÇ][^\n]{3,90}"
    r"|\d+(?:\.\d+){0,3}\.?\s+[A-ZÉÈÊÀÂÎÔÛÇ][^\n]{3,90}"
    r"|(?:OUTIL|PON|SOP|ANNEXE|AXE STRATEGIQUE|SECTION|CHAPITRE|PARTIE|Section|Chapter|Annex)\s*[0-9IVX]+[^\n]{0,90}"
    r"|(?:AVANT-PROPOS|PREFACE|DEFINITION DES TERMES[^\n]*|SIGLES[^\n]*|REFERENCES[^\n]*|Executive summary|Introduction|Recommendations))\s*$",
    re.MULTILINE,
)
NOISE_RE = re.compile(
    r"(www\.prc\.cm|COPIE CERTIFI[EÉ]E CONFORME|CERTIFIED TRUE COPY|PRESIDEN[CT]\w* DE LA R|SERVICE DU FICHIER"
    r"|02024R1689 — FR — [0-9.]+ — [0-9.]+ — \d+).*", re.IGNORECASE)
META_KEYS = ["doc_id", "title", "authority", "date", "doc_type", "jurisdiction", "language", "url",
             "source_kind", "extraction", "status_note", "rights_note"]


def clean(t: str) -> str:
    t = NOISE_RE.sub("", t)
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\n\s*\n+", "\n", t)
    return t.strip()


def load_pages(src: dict) -> list[tuple[int, str]]:
    if src.get("pages_dir"):
        files = sorted((ROOT / src["pages_dir"]).glob("*.txt"))
        return [(int(f.stem), f.read_text(encoding="utf-8", errors="replace")) for f in files]
    raw = (ROOT / src["text_file"]).read_text(encoding="utf-8", errors="replace")
    marker = src.get("page_marker")
    if not marker:
        return [(0, raw)]  # page inconnue : page_start = 0
    parts = re.split(marker, raw)
    return [(i, p) for i, p in enumerate(parts, start=1) if p.strip()]


def meta(src: dict) -> dict:
    return {k: src.get(k, "") for k in META_KEYS}


def windows(words, src, size=350, overlap=50, section_override=None):
    out, i = [], 0
    while i < len(words):
        win = words[i:i + size]
        if len(win) < 40 and out:
            break
        out.append({**meta(src), "article": "",
                    "section": section_override or (win[0][2] or win[-1][2]),
                    "page_start": win[0][1], "page_end": win[-1][1],
                    "text": " ".join(w for w, _, _ in win)})
        i += size - overlap
    return out


def tokenize(pages, src):
    words, heading = [], ""
    for p, t in pages:
        for line in clean(t).split("\n"):
            letters = [c for c in line if c.isalpha()]
            upper_ok = not src.get("heading_upper") or (letters and sum(c.isupper() for c in letters) / len(letters) > 0.7)
            if HEAD_RE.match(line) and not re.search(r"\.{5,}", line) and upper_ok:
                heading = re.sub(r"\s+", " ", line).strip()[:120]
            words += [(w, p, heading) for w in line.split()]
    return words


def chunk_window(src):
    return windows(tokenize(load_pages(src), src), src)


def chunk_articles(src):
    pages = load_pages(src)
    text, offsets = "", []
    for p, t in pages:
        offsets.append((len(text), p))
        text += clean(t) + "\n"

    def page_at(pos):
        page = offsets[0][1]
        for o, p in offsets:
            if o <= pos:
                page = p
        return page

    prefixe = "Section " if src["split"] == "section_cmr_en" else "Article "
    marks = [(m.start(), prefixe + ("1" if m.group(1).lower() == "premier" else m.group(1)))
             for m in ART_RES[src["split"]].finditer(text)]
    if src["split"] not in ("article_cmr", "section_cmr_en"):
        marks += [(m.start(), "Annexe " + m.group(1)) for m in ANNEX_RE.finditer(text)]
    marks.sort()
    struct_re = CHAPTER_EN_RE if src["split"] == "section_cmr_en" else STRUCT_RE
    structs = [(m.start(), m.group(0).strip()) for m in struct_re.finditer(text)]
    out = []
    if marks and marks[0][0] > 200:  # préambule / considérants
        pre = text[:marks[0][0]]
        words = [(w, page_at(0), "Préambule et considérants") for w in pre.split()]
        out += windows(words, src, section_override="Préambule et considérants")
    for i, (start, label) in enumerate(marks):
        end = marks[i + 1][0] if i + 1 < len(marks) else len(text)
        body = text[start:end].strip()
        ctx = [s for pos, s in structs if pos < start]
        words = body.split()
        parts = [words[j:j + 450] for j in range(0, len(words), 400)] if len(words) > 450 else [words]
        for k, part in enumerate(parts):
            out.append({**meta(src), "article": label + (f" (partie {k + 1}/{len(parts)})" if len(parts) > 1 else ""),
                        "section": ctx[-1][:120] if ctx else "",
                        "page_start": page_at(start), "page_end": page_at(end - 1),
                        "text": " ".join(part)})
    return out


def qa_flags(part, src):
    if src["split"] != "article_cmr":
        return
    labels = [c["article"].split(" (")[0] for c in part if c["article"]]
    nums = [int(l.split()[1]) for l in labels]
    idx = [k for k, c in enumerate(part) if c["article"]]
    for n_i, k in enumerate(idx):
        flags = []
        if n_i and nums[n_i] < nums[n_i - 1]:
            flags.append("numéro d'article douteux (OCR) : vérifier sur le texte officiel")
        if n_i + 1 < len(nums) and nums[n_i + 1] - nums[n_i] > 1:
            skipped = ", ".join(str(n) for n in range(nums[n_i] + 1, nums[n_i + 1]))
            flags.append(f"peut contenir l'article {skipped} (en-tête illisible)")
        part[k]["qa_flags"] = flags


def apply_corrections(part, src):
    """Remplace le texte OCR d'un article par une version relue (corrections/<doc_id>.json)."""
    f = ROOT / "corrections" / f"{src['doc_id']}.json"
    if not f.exists():
        return
    fixes = json.loads(f.read_text(encoding="utf-8"))
    for c in part:
        fx = fixes.get(c.get("article"))
        if fx:
            if "text" in fx:
                c["text"] = fx["text"]
            if "article_label" in fx:
                c["article"] = fx["article_label"]
            c["correction"] = fx["provenance"]
            c["qa_flags"] = []


def main():
    chunks = []
    for src in SOURCES:
        part = chunk_window(src) if src["split"] == "window" else chunk_articles(src)
        for c in part:
            c.setdefault("qa_flags", [])
        qa_flags(part, src)
        apply_corrections(part, src)
        for n, c in enumerate(part):
            c["chunk_id"] = f"{src['doc_id']}::{n:04d}"
        chunks += part
        print(f"{src['doc_id']:<40} {len(part):>4} fragments")
    with open(ROOT / "kb_chunks.jsonl", "w", encoding="utf-8") as f:
        for c in chunks:
            f.write(json.dumps(c, ensure_ascii=False) + "\n")
    print(f"Total : {len(chunks)} fragments -> kb_chunks.jsonl")


if __name__ == "__main__":
    main()
