// Nolo — politique en vigueur (SF-007-17, FR-1903) : `config/policy.yaml` converti par
// `tools/politique_json.py` en `data/politique.json`. Aucune valeur juridique n'est écrite ailleurs dans Nolo.
import { empreinte } from '../core/canonique.js';

const copie = (o) => JSON.parse(JSON.stringify(o));

export class ClePolitiqueInconnue extends Error {
  constructor(chemin) { super(`clé de politique inconnue : ${chemin}`); this.code = 'E-POLITIQUE-CLE-INCONNUE'; }
}

function noeud(d, chemin) {
  let n = d;
  const parents = [];
  for (const seg of chemin.split('.')) {
    if (!n || typeof n !== 'object' || Array.isArray(n) || !(seg in n)) throw new ClePolitiqueInconnue(chemin);
    parents.push(n);
    n = n[seg];
  }
  return { n, parents };
}

/** Même interface que `Politique` (Python) : valeur, source, variante. */
export function creerPolitique({ version, empreinte: empreinteYaml, empreinte_canonique: attendue, donnees }, { varianteDe = null } = {}) {
  const calculee = empreinte(donnees);
  return {
    version,
    empreinte: empreinteYaml || calculee,
    empreinteCanonique: calculee,
    verifiee: attendue ? attendue === calculee : false,
    varianteDe,
    donnees,
    valeur(chemin) {
      const { n } = noeud(donnees, chemin);
      return n && typeof n === 'object' && !Array.isArray(n) && 'valeur' in n ? n.valeur : n;
    },
    source(chemin) {
      const { n, parents } = noeud(donnees, chemin);
      if (n && typeof n === 'object' && Array.isArray(n.sources) && n.sources.length) return [...n.sources];
      for (const p of [...parents].reverse()) if (Array.isArray(p.sources) && p.sources.length) return [...p.sources];
      return [];
    },
    /** Copie de simulation « et si » (FR-707), en mémoire seulement. */
    variante(changements) {
      const d = copie(donnees);
      for (const [chemin, v] of Object.entries(changements)) {
        const segs = chemin.split('.');
        let n = d;
        for (const seg of segs.slice(0, -1)) { if (!(seg in n)) n[seg] = {}; n = n[seg]; }
        const dernier = segs.at(-1);
        if (n[dernier] && typeof n[dernier] === 'object' && !Array.isArray(n[dernier]) && 'valeur' in n[dernier]) n[dernier].valeur = v;
        else n[dernier] = v;
      }
      return creerPolitique({ version: `${version}+variante`, empreinte: empreinte(d), donnees: d }, { varianteDe: version });
    },
  };
}

/** Le module des pistes n'existe qu'en mode autorisé et s'il est actif dans la politique (FR-1521). */
export function moduleActif(politique, mode) {
  return politique.valeur('diagnostic_poc.actif') === true && politique.valeur('diagnostic_poc.modes_autorises').includes(mode);
}

/** Numéros d'urgence affichés au citoyen : ceux dont la source n'est pas « à confirmer » (SF-001-12, D-004). */
export function numerosUrgence(politique) {
  return politique.valeur('numeros_urgence').filter((x) => x.statut !== 'a_confirmer' && !/ligne verte/i.test(x.libelle)).map((x) => x.valeur);
}

export async function chargerPolitique(url = './data/politique.json') {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`politique illisible (${r.status})`);
  return creerPolitique(await r.json());
}
