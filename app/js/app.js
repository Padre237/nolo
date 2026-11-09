// Nolo — démarrage, routes, délégation des événements, rendu.
import { html, patch } from './core/dom.js';
import { local } from './core/store.js';
import { store } from './etat.js';
import { translator } from './core/i18n.js';
import { valide } from './domain/consent.js';
import { entete, barreSecurite, pied } from './ui/components.js';
import { icone } from './ui/icons.js';
import { demarrer, agents } from './agents/nolo.js';
import { moduleActif } from './domain/politique.js';

import bienvenue from './screens/patient/bienvenue.js';
import accueil from './screens/patient/accueil.js';
import decrire from './screens/patient/decrire.js';
import verifier from './screens/patient/verifier.js';
import pistes from './screens/patient/pistes.js';
import ouAller from './screens/patient/ou-aller.js';
import fiche from './screens/patient/fiche.js';
import urgence from './screens/patient/urgence.js';
import confidentiel from './screens/patient/confidentiel.js';
import horsChamp from './screens/patient/hors-champ.js';
import chercher from './screens/patient/chercher.js';
import conditions from './screens/patient/conditions.js';
import mesDonnees from './screens/patient/mes-donnees.js';
import droits from './screens/patient/droits.js';
import proEntree from './screens/pro/entree.js';
import proInscription from './screens/pro/inscription.js';
import proCode from './screens/pro/code.js';
import proTableau from './screens/pro/tableau.js';
import ministere from './screens/ministere/console.js';

const remplacer = (h) => { try { history.replaceState(null, '', h); } catch { location.hash = h; } };

const ROUTES = [
  ['bienvenue', bienvenue], ['', accueil], ['decrire', decrire], ['verifier', verifier], ['pistes', pistes], ['ou-aller', ouAller],
  ['fiche', fiche], ['urgence', urgence], ['confidentiel', confidentiel], ['hors-champ', horsChamp], ['chercher', chercher],
  ['conditions', conditions], ['mes-donnees', mesDonnees], ['droits', droits], ['pro', proEntree], ['pro/inscription', proInscription], ['pro/code', proCode], ['pro/tableau', proTableau],
  ['ministere', ministere],
];
const SANS_CONSENTEMENT = new Set(['bienvenue', 'conditions', 'droits', 'pro', 'pro/inscription', 'pro/code', 'pro/tableau', 'ministere']);

function lireRoute() {
  const h = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  const [chemin, requete = ''] = h.split('?');
  const morceaux = chemin.split('/').filter(Boolean);
  // Correspondance la plus longue (« pro/tableau/stock » → « pro/tableau » + param « stock »).
  // Hors démonstration ou module désactivé, la route des pistes n'existe pas (FR-1521).
  const a = agents();
  const routes = a && moduleActif(a.politique, a.mode) ? ROUTES : ROUTES.filter(([k]) => k !== 'pistes');
  for (let n = morceaux.length; n >= 0; n--) {
    const cle = morceaux.slice(0, n).join('/');
    const r = routes.find(([k]) => k === cle);
    if (r) return { cle, ecran: r[1], params: morceaux.slice(n), requete: new URLSearchParams(requete) };
  }
  return { cle: '', ecran: accueil, params: [], requete: new URLSearchParams() };
}

const racine = document.getElementById('app');
let routeCourante = null;
let premierRendu = true;

function contexte(route) {
  const s = store.get();
  const t = translator(s.langue);
  return {
    s, t, route, params: route.params, requete: route.requete,
    set: (p) => store.set(p),
    go: (hash) => { if (location.hash === hash) rendre(); else location.hash = hash; },
    annonce,
  };
}

function rendre({ nouvelleRoute = false } = {}) {
  const route = lireRoute();
  const s = store.get();
  // Garde : consentement requis avant toute fonction (FR-CONS-01, CA-CONS-06).
  if (!SANS_CONSENTEMENT.has(route.cle) && !valide(s.consentement)) {
    if (location.hash !== '#/bienvenue') { remplacer('#/bienvenue'); return rendre({ nouvelleRoute: true }); }
  }
  const ctx = contexte(route);
  const ecran = route.ecran;
  if (ecran.garde) {
    const redirection = ecran.garde(ctx);
    if (redirection && redirection !== location.hash) { remplacer(redirection); return rendre({ nouvelleRoute: true }); }
  }
  routeCourante = { route, ecran, ctx };
  const t = ctx.t;
  document.documentElement.lang = s.langue;
  document.title = `${ecran.titre ? ecran.titre(ctx) + ' — ' : ''}Nolo`;
  const opts = ecran.chrome ? ecran.chrome(ctx) : {};
  const balisage = html`
    <a class="lien-evitement" href="#contenu" data-act="evitement">${t('commun.evitement')}</a>
    ${entete({ t, lang: s.langue, retour: opts.retour ?? null, etape: opts.etape ?? null, pro: !!opts.pro })}
    <main id="contenu" class="ecran-${ecran.id}" data-cle="main-${ecran.id}">${ecran.render(ctx)}</main>
    <p class="vh" id="numeros-fictifs">${t('commun.numeroFictif')}</p>
    ${opts.sansPied ? '' : pied(t)}
    ${barreSecurite(t)}
    <div class="annonces" data-garder aria-live="polite" role="status"></div>`;

  const appliquer = () => {
    patch(racine, balisage);
    if (nouvelleRoute) {
      window.scrollTo(0, 0);
      if (!premierRendu) document.querySelector('main h1')?.setAttribute('tabindex', '-1'), document.querySelector('main h1')?.focus({ preventScroll: true });
    }
    ecran.apres?.(ctx, racine.querySelector('main'), { nouvelleRoute });
    premierRendu = false;
  };
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (nouvelleRoute && !premierRendu && document.startViewTransition && !reduit) {
    const vt = document.startViewTransition(appliquer);
    [vt.ready, vt.finished, vt.updateCallbackDone].forEach((p) => p?.catch(() => { /* transition interrompue : le contenu est déjà à jour */ }));
  }
  else appliquer();
}

// ── Annonces (toasts) : une seule à la fois, annoncée aux lecteurs d'écran ──
let minuterie = null;
export function annonce(message, { ico = 'coche', duree = 3600, code = null } = {}) {
  const zone = racine.querySelector('.annonces');
  if (!zone) return;
  zone.innerHTML = '';
  const el = document.createElement('div');
  el.className = 'annonce';
  el.innerHTML = `${icone(ico, { taille: 20 })}<span>${message.replace(/</g, '&lt;')}${code ? `<br><span class="mono">${code}</span>` : ''}</span>`;
  zone.appendChild(el);
  clearTimeout(minuterie);
  minuterie = setTimeout(() => { el.setAttribute('data-sortie', ''); setTimeout(() => el.remove(), 200); }, duree);
}

// ── Délégation des événements ──────────────────────────────────────────────
function action(type, ev) {
  if (!routeCourante) return;
  const attrNom = type === 'click' ? 'data-act' : type === 'input' ? 'data-input' : type === 'change' ? 'data-change' : 'data-submit';
  const el = ev.target.closest(`[${attrNom}]`);
  if (!el || !racine.contains(el)) return;
  const nom = el.getAttribute(attrNom);
  const { ecran } = routeCourante;
  const ctx = contexte(routeCourante.route);
  if (type === 'submit') ev.preventDefault();
  if (nom === 'langue') { store.set({ langue: el.dataset.valeur }); local.write('langue', el.dataset.valeur); return; }
  if (nom === 'evitement') { ev.preventDefault(); const h = document.querySelector('main h1'); h?.setAttribute('tabindex', '-1'); h?.focus(); return; }
  const fn = ecran.actions?.[nom];
  if (fn) fn(ctx, el, ev);
}
['click', 'input', 'change', 'submit'].forEach((type) => racine.addEventListener(type, (ev) => action(type, ev)));
// Éléments SVG rendus actionnables (régions de la carte) : Entrée et Espace déclenchent l'action.
racine.addEventListener('keydown', (ev) => {
  const el = ev.target.closest?.('[role="button"][data-act]');
  if (!el || el.tagName === 'BUTTON' || (ev.key !== 'Enter' && ev.key !== ' ')) return;
  ev.preventDefault();
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});

store.subscribe(() => rendre());
window.addEventListener('hashchange', () => rendre({ nouvelleRoute: true }));
// Les agents (politique, journal, orchestrateur) sont prêts avant le premier écran : aucune action sans eux.
// La base de connaissances arrive ensuite ; le panneau « Comment Nolo a décidé » se complète alors.
try { await demarrer({ quandBase: () => store.set({ baseChargee: true }) }); }
catch { racine.innerHTML = '<p class="encart">Nolo : politique illisible, rechargez la page.</p>'; throw new Error('politique illisible'); }
rendre({ nouvelleRoute: true });

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').catch(() => { /* hors ligne indisponible : l'application fonctionne quand même */ });
}
