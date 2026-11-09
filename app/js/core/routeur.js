// Nolo — lecture de la route (SF-013-02) : la route la plus longue qui correspond, le reste en paramètres ;
// garde du consentement. Fonctions pures, testées sous Node ; `app.js` les applique.

/** routes : [[clé, écran], …] ; renvoie { cle, ecran, params, requete }. */
export function lireRoute(hash, routes) {
  const h = decodeURIComponent(hash.replace(/^#\/?/, ''));
  const [chemin, requete = ''] = h.split('?');
  const morceaux = chemin.split('/').filter(Boolean);
  for (let n = morceaux.length; n >= 0; n--) {
    const cle = morceaux.slice(0, n).join('/');
    const r = routes.find(([k]) => k === cle);
    if (r) return { cle, ecran: r[1], params: morceaux.slice(n), requete: new URLSearchParams(requete) };
  }
  const accueil = routes.find(([k]) => k === '');
  return { cle: '', ecran: accueil?.[1], params: [], requete: new URLSearchParams() };
}

/** Redirection exigée par la garde du consentement (FR-1306), ou null. */
export function routeGardee(cle, consentementValide, sansConsentement) {
  return !sansConsentement.has(cle) && !consentementValide ? '#/bienvenue' : null;
}
