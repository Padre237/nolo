// Nolo — agents de l'application : une politique, un journal, un orchestrateur, la base embarquée et le
// conseiller, pour toute la session (en mémoire, sur l'appareil). `demarrer` charge les données ; `installer`
// sert aussi aux tests (données lues sur disque).
import { chargerPolitique } from '../domain/politique.js';
import { chargerBase } from '../domain/base.js';
import { creerJournal } from './journal.js';
import { creerOrchestrateur } from './orchestrateur.js';

let courant = null;
let conseillerCache = null;

export function installer({ politique, base = null, horloge = () => new Date(), mode }) {
  const journal = creerJournal({ politique, horloge });
  const orchestrateur = creerOrchestrateur({ politique, journal, ...(mode ? { mode } : {}) });
  courant = { politique, base, journal, orchestrateur, mode: orchestrateur.mode, horloge };
  conseillerCache = null;
  return courant;
}

export const agents = () => courant;

/** Conseiller « Mes droits santé » (F-016), construit à la première question, une fois la base chargée. */
export async function conseiller() {
  if (!courant?.base) return null;
  if (!conseillerCache) {
    const [{ creerIndex }, { creerGlossaire }, { creerConseiller }] = await Promise.all([
      import('./conseiller/bm25.js'), import('./conseiller/glossaire.js'), import('./conseiller/repondre.js')]);
    const glo = await (await fetch('./data/glossaire.json')).json();
    conseillerCache = creerConseiller({ base: courant.base, index: creerIndex(courant.base), glossaire: creerGlossaire(glo) });
  }
  return conseillerCache;
}

/** Charge la politique (bloquant : aucune action sans elle), puis la base en arrière-plan. */
export async function demarrer({ quandBase } = {}) {
  const [politique, regles] = await Promise.all([chargerPolitique(), fetch('./data/regles.json').then((r) => r.json()).catch(() => null)]);
  installer({ politique });
  courant.regles = regles; // synonymes, définitions SBC, fiabilité, disponibilités (`kb/rules/`)
  chargerBase().then((b) => { courant.base = b; quandBase?.(); }).catch(() => { /* hors ligne sans cache : le panneau affiche les identifiants seuls */ });
  return courant;
}
