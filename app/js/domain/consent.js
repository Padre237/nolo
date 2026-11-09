// Nolo — consentement à la première utilisation (D-028). Logique pure, sans DOM.

export const VERSION_CONDITIONS = '2026-11-07';
export const FINALITES = ['orientation', 'surveillance', 'signalements'];

export const brouillonVide = () => ({
  finalites: { orientation: false, surveillance: false, signalements: false },
  age: null, // 'majeur' | 'mineur'
  accordParental: false,
});

/** Retourne le code d'erreur bloquant, ou null si le choix peut être validé (CA-CONS-01 à 03). */
export function erreur(brouillon) {
  const aucune = !FINALITES.some((f) => brouillon.finalites[f]);
  if (aucune) return 'E-CONS-AUCUNE-CASE';
  if (!brouillon.age) return 'E-CONS-AGE';
  if (brouillon.age === 'mineur' && !brouillon.accordParental) return 'E-CONS-PARENTAL';
  return null;
}

/** La question d'âge n'apparaît que si au moins une case est cochée (FR-CONS-05). */
export const demandeAge = (brouillon) => FINALITES.some((f) => brouillon.finalites[f]);

/** Enregistrement : exactement cinq champs, rien d'identifiant (CA-CONS-05). */
export function enregistrer(brouillon, maintenant = new Date()) {
  const e = erreur(brouillon);
  if (e) return { ok: false, erreur: e };
  return {
    ok: true,
    enregistrement: {
      version_conditions: VERSION_CONDITIONS,
      date: maintenant.toISOString(),
      finalites: { ...brouillon.finalites },
      majeur: brouillon.age === 'majeur',
      accord_parental: brouillon.age === 'mineur' ? true : false,
    },
  };
}

/** « Continuer sans partager » : trois finalités à faux, quel que soit l'état des cases (CA-CONS-04). */
export function sansPartage(maintenant = new Date()) {
  return {
    version_conditions: VERSION_CONDITIONS,
    date: maintenant.toISOString(),
    finalites: { orientation: false, surveillance: false, signalements: false },
    majeur: null,
    accord_parental: false,
  };
}

/** Un enregistrement absent, illisible ou d'une autre version redemande le consentement (CA-CONS-06). */
export function valide(enregistrement) {
  if (!enregistrement || typeof enregistrement !== 'object') return false;
  if (enregistrement.version_conditions !== VERSION_CONDITIONS) return false;
  const f = enregistrement.finalites;
  return !!f && FINALITES.every((k) => typeof f[k] === 'boolean');
}

export const partage = (enregistrement, finalite) => !!enregistrement?.finalites?.[finalite];
