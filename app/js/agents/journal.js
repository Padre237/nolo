// Nolo — journal d'audit en ajout seul, chaîné par SHA-256 (SF-007-21) : portage de
// `src/server/gouvernance/journal.py`. Mêmes champs, même sérialisation canonique, mêmes empreintes (FR-1944).
// Le journal vit en mémoire, sur l'appareil : il n'est ni conservé ni transmis.
import { empreinte } from '../core/canonique.js';

export const ZERO = `sha256:${'0'.repeat(64)}`;

export class ChampInterdit extends Error {
  constructor(champ) { super(`champ interdit dans un événement d'audit : ${champ}`); this.code = 'E-JOURNAL-CHAMP-INTERDIT'; this.champ = champ; }
}

const uuid = () => (globalThis.crypto?.randomUUID ? crypto.randomUUID()
  : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16); }));

/** Heure de Douala (UTC+1), au format ISO 8601 avec décalage, comme `datetime.isoformat()`. */
export const isoDouala = (d) => `${new Date(d.getTime() + 3600e3).toISOString().slice(0, 19)}+01:00`;

function verifierChamps(objet, interdits, chemin = '') {
  if (Array.isArray(objet)) objet.forEach((v, i) => verifierChamps(v, interdits, `${chemin}${i}.`));
  else if (objet && typeof objet === 'object') {
    for (const [k, v] of Object.entries(objet)) {
      if (interdits.has(k)) throw new ChampInterdit(`${chemin}${k}`);
      verifierChamps(v, interdits, `${chemin}${k}.`);
    }
  }
}

/** Première entrée invalide d'une chaîne (`{ index, raison }`), ou null si la chaîne est intacte. */
export function verifierChaine(evenements) {
  let precedent = ZERO;
  for (let i = 0; i < evenements.length; i++) {
    const { hash, ...reste } = evenements[i];
    if (reste.hash_precedent !== precedent) return { index: i, raison: 'hash_precedent' };
    if (empreinte(reste) !== hash) return { index: i, raison: 'empreinte' };
    precedent = hash;
  }
  return null;
}

export function creerJournal({ politique, horloge = () => new Date(), regles = { fichier: 'rules/triage_signes_alerte.v2.yaml', version: '2.0.0' } }) {
  const interdits = new Set(politique.valeur('journal_audit.champs_interdits'));
  let evenements = [];
  let sauvegarde = null;
  const chainer = (evt) => {
    evt.hash_precedent = evenements.length ? evenements.at(-1).hash : ZERO;
    evt.hash = empreinte(evt);
    evenements.push(evt);
    return evt;
  };
  return {
    ecrire({ agent, action, decision, mode, session = 'anonyme', contributeurs = [], entree_minimisee = null, fragments = [], cles_politique = [],
      repli = null, justification_code = '', validateur_humain = null, horodatage = null }) {
      const evt = {
        event_id: `evt-${uuid()}`,
        horodatage: isoDouala(horodatage || horloge()),
        session, mode, agent, contributeurs, action,
        entree_minimisee: entree_minimisee || { categories: [], destination: null, empreinte_entree: null, entree: null },
        fragments,
        politique: { version: politique.version, empreinte: politique.empreinte, cles: cles_politique },
        regles,
        decision, repli, justification_code, validateur_humain,
      };
      try { verifierChamps(evt, interdits); }
      catch (e) {
        chainer({ event_id: `evt-${uuid()}`, horodatage: evt.horodatage, session: 'anonyme', mode, agent: 'journal', contributeurs: [], action: 'journal.violation_bloquee',
          entree_minimisee: { categories: [], destination: null, empreinte_entree: null, entree: null }, fragments: [], politique: evt.politique, regles,
          decision: 'BLOQUE', repli: null, justification_code: 'CHAMP_INTERDIT_JOURNAL', validateur_humain: null });
        throw e;
      }
      return chainer(evt);
    },
    lire: () => evenements.map((e) => ({ ...e })),
    taille: () => evenements.length,
    verifier: () => verifierChaine(evenements),
    /** Démonstration (FR-1943) : altère une entrée sans recalculer la chaîne, pour montrer la détection. */
    alterer(index) {
      if (!evenements[index]) return false;
      if (!sauvegarde) sauvegarde = evenements.map((e) => ({ ...e }));
      evenements[index] = { ...evenements[index], decision: evenements[index].decision === 'BLOQUE' ? 'AUTORISE' : 'BLOQUE' };
      return true;
    },
    restaurer() { if (sauvegarde) { evenements = sauvegarde; sauvegarde = null; } },
    altere: () => sauvegarde !== null,
    vider() { evenements = []; sauvegarde = null; },
  };
}
