// Nolo — base de connaissances embarquée (SF-011-08) : `data/base.json`, produit par `tools/exporter_base.py`.
// Lecture d'un fragment dans la langue de l'interface (FR-1128) : version anglaise officielle quand elle existe,
// sinon traduction non officielle marquée (D-027), sinon texte français.

export class FragmentInconnu extends Error {
  constructor(id) { super(`fragment inconnu : ${id}`); this.code = 'E-BASE-FRAGMENT-INCONNU'; }
}

const numero = (id) => id.split('::')[1];
const numeroArticle = (a) => (String(a || '').match(/\d+/) || [null])[0];

export function creerBase(brut) {
  const { documents, fragments, traductions, mention_non_officielle: mention } = brut;
  const lire = (id) => {
    const f = fragments[id];
    if (!f) throw new FragmentInconnu(id);
    const doc = documents[f.doc];
    return { id, idAffiche: id, doc: f.doc, titre: doc.titre, article: f.article, section: f.section, page: f.page, texte: f.texte, statut: doc.statut, langue: doc.langue, traduction: null, mention: null };
  };
  /** Version anglaise officielle du même article, si elle est versée dans la base. */
  const officielleEn = (id) => {
    const tr = traductions[id];
    if (tr?.chunk_id_en && fragments[tr.chunk_id_en]) return tr.chunk_id_en;
    const f = fragments[id];
    const ven = documents[f.doc].version_en;
    const cand = ven && `${ven}::${numero(id)}`;
    if (cand && fragments[cand] && numeroArticle(fragments[cand].article) === numeroArticle(f.article)) return cand;
    return null;
  };
  return {
    version: brut.version,
    empreinte: brut.empreinte_kb,
    mention,
    documents,
    existe: (id) => id in fragments,
    ids: () => Object.keys(fragments),
    brut: (id) => fragments[id],
    fragment(id, lang = 'fr') {
      const fr = lire(id);
      if (lang !== 'en' || fr.langue === 'en') return fr;
      const off = officielleEn(id);
      if (off) return { ...lire(off), id, idAffiche: off, traduction: 'officielle' };
      const tr = traductions[id];
      if (tr?.texte_en) return { ...fr, texte: tr.texte_en, reference: tr.reference_en, traduction: 'non_officielle', mention };
      return fr;
    },
  };
}

/** Extrait d'au plus `n` caractères, coupé à un mot, avec points de suspension. */
export function extrait(texte, n = 240) {
  const t = String(texte).replace(/\s+/g, ' ').trim();
  if (t.length <= n) return t;
  const coupe = t.slice(0, n - 1);
  const i = coupe.lastIndexOf(' ');
  return `${(i > n * 0.6 ? coupe.slice(0, i) : coupe).trimEnd()}…`;
}

export async function chargerBase(url = './data/base.json') {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`base illisible (${r.status})`);
  return creerBase(await r.json());
}
