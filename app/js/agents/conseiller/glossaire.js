// Nolo — glossaire de requêtes anglais → français (SF-016-01, FR-2203 ; D-027) : `kb/traductions/glossaire_requetes.yaml`
// exporté en `data/glossaire.json`. Une entrée s'applique si l'une de ses expressions anglaises figure dans la
// question (minuscules, mots entiers) ; ses termes français sont AJOUTÉS : la question n'est jamais traduite.
// `courant_fr` : expressions françaises courantes (« partir à l'étranger ») reliées aux mêmes termes (DES-016-01-03).

const echapper = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function creerGlossaire({ entrees }) {
  const motif = (x) => new RegExp(`(^|[^a-zà-ÿ0-9])${echapper(x.toLowerCase().replace(/[’']/g, "'"))}(?![a-zà-ÿ0-9])`);
  const regles = entrees.map((e) => ({ motifs: [...e.en, ...(e.courant_fr || [])].map(motif), fr: e.fr }));
  return {
    termes(question) {
      const q = question.toLowerCase().replace(/[’']/g, "'");
      return [...new Set(regles.filter((r) => r.motifs.some((m) => m.test(q))).flatMap((r) => r.fr))];
    },
    enrichir(question) {
      const ajout = this.termes(question);
      return ajout.length ? `${question} ${ajout.join(' ')}` : question;
    },
  };
}
