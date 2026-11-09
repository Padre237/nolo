// Nolo — moteur de triage v1 sur l'appareil (SF-001-07, FR-168) : 75 règles PCIME et IITT, référentiel de
// 110 signes (copie versionnée de `src/client/ondevice`, `tools/maj_moteur_nolo.py`). Nolo n'en retient que
// l'URGENCE (FR-166) : aucun autre niveau n'est affiché ni transmis. Le texte est lu ici et n'est pas conservé.
import { chargerPaquet } from '../vendor/referentiel.js';
import { extraire } from '../vendor/extracteur_lexical.js';
import { evaluer } from '../vendor/moteur_triage.js';
import { tranche } from './envoi.js';

/** Charge et contrôle le paquet (schéma, empreinte, validateur clinique selon le mode : FR-113, FR-161). */
export const chargerTriage = (paquet, mode) => chargerPaquet(paquet, mode);

/** { urgence, priorite, regle, fragments, texteSource, niveau } ; urgence = false sans signe ni règle d'urgence. */
export function urgenceMoteur(texte, age, jours, ref) {
  if (!ref || !age || age.valeur === null || age.valeur === undefined) return { urgence: false, niveau: null };
  const { jetons } = extraire(texte || '', ref.index);
  const r = evaluer(jetons, tranche(age), jours ?? 0, ref);
  const urgence = r.niveau === 'urgence';
  return { urgence, niveau: r.niveau, priorite: urgence ? r.priorite : null, regle: urgence ? r.regle : null, fragments: urgence ? r.fragments : [], texteSource: urgence ? r.texte_source : [] };
}

export async function chargerTriageDistant(mode, url = './data/paquet_triage.json') {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`paquet de triage illisible (${r.status})`);
  return chargerTriage(await r.json(), mode);
}
