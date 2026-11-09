// Nolo — l'état unique de l'application (importé par app.js et l'espace pro, sans dépendance circulaire).
import { createStore, local } from './core/store.js';

const langueInitiale = () => local.read('langue') || ((navigator.language || 'fr').startsWith('en') ? 'en' : 'fr');

export const store = createStore({
  langue: langueInitiale(),
  consentement: local.read('consentement'),
  brouillon: null,
  cas: null,
  recherche: { onglet: 'service', specialite: '', dci: '', groupe: '', signalements: local.read('signalements', []) },
  pro: { comptes: local.read('pro-comptes', {}), session: local.read('pro-session'), inscription: null, essais: local.read('pro-essais', {}) },
});

/** Page hébergée dans un cadre (artefact) : impression et téléchargements y sont refusés. */
export const encadre = (() => { try { return window.self !== window.top; } catch { return true; } })();
