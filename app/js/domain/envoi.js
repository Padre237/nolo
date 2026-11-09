// Nolo — préparation d'une charge utile avant tout envoi (SF-001-02, SF-002-01, SF-008-02). Rien n'est envoyé
// dans le prototype : la fonction fixe ce qui pourrait l'être. Contribution à la surveillance : exactement
// quatre champs — codes SYM-NNN, aire de santé, semaine ISO, tranche d'âge — et seulement avec le consentement
// « surveillance » (FR-811). Jamais le texte libre ; jamais un code d'une catégorie de l'art. 48 (FR-155).
import { SIGNES } from './engine.js';

/** Codes que l'appareil ne transmet jamais (catégories interdites par l'art. 48 ; aucun dans le référentiel actuel). */
export const CODES_INTERDITS = new Set();

const TRANCHES = [[8 / 365, 'moins_8_jours'], [2 / 12, '8_jours_2_mois'], [0.5, '2_6_mois'], [2, '6_mois_2_ans'], [5, '2_5_ans'], [12, '5_11_ans'], [18, '12_17_ans'], [51, '18_50_ans'], [71, '51_70_ans'], [Infinity, 'plus_70_ans']];
/** Tranche d'âge de D-023 (la valeur exacte de l'âge ne sort jamais). */
export function tranche(age) {
  const ans = age?.unite === 'mois' ? age.valeur / 12 : age?.valeur;
  return TRANCHES.find(([max]) => ans < max)[1];
}

/** Semaine ISO 8601 (« 2026-W46 »). */
export function semaineIso(d) {
  const j = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const jour = j.getUTCDay() || 7;
  j.setUTCDate(j.getUTCDate() + 4 - jour);
  const debut = new Date(Date.UTC(j.getUTCFullYear(), 0, 1));
  return `${j.getUTCFullYear()}-W${String(Math.ceil(((j - debut) / 864e5 + 1) / 7)).padStart(2, '0')}`;
}

export function preparerEnvoi(cas, finalite, { consentement, aire, quand = new Date() }) {
  if (finalite !== 'surveillance') return { ok: false, code: 'E-ENVOI-FINALITE-INCONNUE' };
  if (!consentement?.finalites?.surveillance) return { ok: false, code: 'E-ENVOI-SANS-CONSENTEMENT' };
  const codes = (cas.signes?.presents || []).filter((c) => /^SYM-\d{3}$/.test(c) && SIGNES[c] && !CODES_INTERDITS.has(c));
  return { ok: true, charge: { codes, aire, semaine: semaineIso(quand), tranche_age: tranche(cas.age) } };
}
