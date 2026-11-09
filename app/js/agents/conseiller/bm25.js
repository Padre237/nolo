// Nolo — recherche BM25 dans la base embarquée (SF-016-01) : portage exact de `kb/bm25.py` (même tokenisation,
// mêmes mots vides, k1 = 1,4, b = 0,75, même ordre en cas d'égalité). Parité vérifiée sur les 40 questions
// de `kb/eval/questions_test.jsonl` (FR-2204).

const STOP = new Set(`a au aux avec ce ces dans de des du elle en et eux il je la le les leur lui ma mais me même mes moi mon ne nos notre nous on ou par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une vos votre vous est sont été être ont a été cette cet dont ainsi lorsque tout toute tous toutes peut doit
the of and to in for on with by is are be as or an at from that this which it its`.split(/\s+/));

/** Minuscules, accents retirés, mots alphanumériques, mots vides retirés, « s » final retiré au-delà de 4 lettres. */
export function norm(texte) {
  const t = texte.toLowerCase().normalize('NFKD').replace(/\p{Mn}/gu, '');
  return (t.match(/[a-z0-9]+/g) || []).filter((w) => !STOP.has(w) && w.length > 1).map((w) => (w.length > 4 && w.endsWith('s') ? w.slice(0, -1) : w));
}

const compter = (mots) => { const m = new Map(); for (const w of mots) m.set(w, (m.get(w) || 0) + 1); return m; };

export function creerIndex(base, { k1 = 1.4, b = 0.75 } = {}) {
  const ids = base.ids();
  const frags = ids.map((id) => base.brut(id));
  const docs = frags.map((f) => compter(norm(`${base.documents[f.doc].titre} ${f.article} ${f.section} ${f.texte}`)));
  const lens = docs.map((d) => { let s = 0; for (const v of d.values()) s += v; return s; });
  const avg = lens.reduce((a, x) => a + x, 0) / lens.length;
  const df = new Map();
  for (const d of docs) for (const w of d.keys()) df.set(w, (df.get(w) || 0) + 1);
  const n = docs.length;
  const idf = new Map([...df].map(([w, f]) => [w, Math.log(1 + (n - f + 0.5) / (f + 0.5))]));
  return {
    taille: n,
    /** Les k fragments les mieux classés parmi ceux dont le document commence par `prefixe`. */
    chercher(question, { k = 5, prefixe = '' } = {}) {
      const qt = norm(question);
      const distincts = [...new Set(qt)];
      const scores = [];
      for (let i = 0; i < n; i++) {
        if (prefixe && !frags[i].doc.startsWith(prefixe)) continue;
        const d = docs[i];
        let s = 0;
        for (const w of qt) {
          const f = d.get(w);
          if (f) s += idf.get(w) * f * (k1 + 1) / (f + k1 * (1 - b + b * lens[i] / avg));
        }
        scores.push({ s, i });
      }
      scores.sort((x, y) => y.s - x.s || y.i - x.i);
      return scores.slice(0, k).map(({ s, i }) => ({ id: ids[i], doc: frags[i].doc, score: s, communs: distincts.filter((w) => docs[i].has(w)).length, termes: distincts.length }));
    },
  };
}
