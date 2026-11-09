// Nolo — traduction. Deux catalogues de même valeur (Principe XIV), mêmes clés (test bloquant).
import fr from '../i18n/fr.js';
import en from '../i18n/en.js';

export const catalogues = { fr, en };

const NNBSP = ' '; // espace fine insécable
const NBSP = ' ';

/** Typographie française : espace fine avant ? ! ; et insécable avant :, dans les guillemets, entre nombre et unité. */
export function typoFr(s) {
  return s
    .replace(/ ([?!;])/g, `${NNBSP}$1`)
    .replace(/ :(?=\s|$)/g, `${NBSP}:`)
    .replace(/« /g, `«${NNBSP}`)
    .replace(/ »/g, `${NNBSP}»`)
    .replace(/(\d) (?=(ans|an|mois|km|m|h|min|jours|jour|semaines|semaine|cas|%|Mo|lits|caractères|signes|lignes|recherches|FCFA)\b)/g, `$1${NBSP}`)
    .replace(/(\d) (?=%)/g, `$1${NNBSP}`)
    .replace(/(art\.|n°|N°) (?=\d)/g, `$1${NBSP}`);
}

/** Anglais : insécable entre nombre et unité seulement. */
function typoEn(s) {
  return s.replace(/(\d) (?=(years|year|months|month|km|m|h|min|days|day|weeks|week|cases|MB|beds|characters|signs|lines|searches)\b)/g, `$1${NBSP}`)
    .replace(/(Section|No\.) (?=\d)/g, `$1${NBSP}`);
}

function lookup(cat, key) {
  return key.split('.').reduce((o, k) => (o && k in o ? o[k] : undefined), cat);
}

export function translator(lang) {
  const cat = catalogues[lang] || fr;
  const typo = lang === 'fr' ? typoFr : typoEn;
  const t = (key, params) => {
    let v = lookup(cat, key);
    if (v === undefined) v = lookup(fr, key);
    if (v === undefined) return key;
    if (typeof v !== 'string') return v;
    if (params) v = v.replace(/\{(\w+)\}/g, (m, p) => (p in params ? String(params[p]) : m));
    return typo(v);
  };
  t.lang = lang;
  t.list = (key) => lookup(cat, key) ?? lookup(fr, key) ?? [];
  t.num = (n, opts) => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', opts).format(n);
  t.km = (km) => `${new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 1 }).format(km)}${NBSP}km`;
  return t;
}

/** Liste toutes les clés-feuilles d'un catalogue (pour le test de parité). */
export function flatKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    return v && typeof v === 'object' && !Array.isArray(v) ? flatKeys(v, key) : [key];
  });
}
