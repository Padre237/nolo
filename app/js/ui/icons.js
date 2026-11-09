// Nolo — pictogrammes dessinés pour Nolo : trait 1,75, angles arrondis, grille 24.
import { raw } from '../core/dom.js';

const P = {
  retour: '<path d="M15 5l-7 7 7 7"/>',
  suite: '<path d="M9 5l7 7-7 7"/>',
  fleche: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  haut: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  bas: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  moins: '<path d="M5 12h14"/>',
  croix: '<path d="M6 6l12 12M18 6L6 18"/>',
  coche: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  telephone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  bouclier: '<path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
  signal: '<path d="M4.5 10.5a11 11 0 0 1 15 0"/><path d="M7.8 14a6.3 6.3 0 0 1 8.4 0"/><circle cx="12" cy="18" r="1" fill="currentColor"/>',
  personne: '<circle cx="12" cy="7.5" r="3.5"/><path d="M5 20.5c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/>',
  enfant: '<circle cx="12" cy="6.5" r="2.8"/><path d="M8 20.5l1-6.5h6l1 6.5M8.5 11.5h7"/><path d="M12 9.3v4.7"/>',
  service: '<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
  pilule: '<rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.2 7.9l5.6 8.2" />',
  goutte: '<path d="M12 3.5c3.2 4 5.5 7.2 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 10.7 8.8 7.5 12 3.5z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  batiment: '<path d="M4 21V8l8-4 8 4v13"/><path d="M9 21v-5h6v5M12 8v4M10 10h4"/>',
  donnees: '<rect x="4" y="3.5" width="16" height="17" rx="2.5"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  repere: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  horloge: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r="1" fill="currentColor"/>',
  alerte: '<path d="M12 4l9 16H3z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.2" r="1" fill="currentColor"/>',
  serrure: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  telechargement: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  envoi: '<path d="M12 15V4M7 9l5-5 5 5M5 20h14"/>',
  graphique: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
  accueil: '<path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.5V20h12V9.5"/>',
  fiche: '<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  cartons: '<path d="M4 8l8-4 8 4-8 4z"/><path d="M4 8v8l8 4 8-4V8M12 12v8"/>',
  oeil: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  compte: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18.2c1.3-2 3.2-3 5.5-3s4.2 1 5.5 3"/>',
  sortie: '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M10 8l-4 4 4 4M6 12h10"/>',
  imprimante: '<path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/>',
  photo: '<rect x="3.5" y="5.5" width="17" height="14" rx="2.5"/><circle cx="12" cy="12.5" r="3.5"/><path d="M8.5 5.5l1.2-2h4.6l1.2 2"/>',
  liste: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="18" r="1" fill="currentColor"/>',
  recherche: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
  cible: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"/>',
  croixPharma: '<path d="M9.5 3.5h5v6h6v5h-6v6h-5v-6h-6v-5h6z"/>',
};

/** Pictogramme décoratif par défaut (aria-hidden). Passer `label` pour un pictogramme porteur de sens. */
export function icone(nom, { taille = 22, label = null, trait = 1.75, cls = '' } = {}) {
  const a11y = label ? `role="img" aria-label="${label.replace(/"/g, '&quot;')}"` : 'aria-hidden="true" focusable="false"';
  return raw(`<svg class="${cls}" width="${taille}" height="${taille}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${trait}" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${P[nom] || ''}</svg>`);
}

/** Logotype : l'anneau (la porte) et le point de départ (un signe). */
export const logo = (taille = 30) => raw(`<svg width="${taille}" height="${taille}" viewBox="0 0 30 30" aria-hidden="true" focusable="false"><circle cx="17" cy="15" r="10.5" fill="none" stroke="#0B5D4B" stroke-width="2.4"/><circle cx="17" cy="15" r="3.8" fill="#0B5D4B"/><circle cx="3.6" cy="6.4" r="2.1" fill="#0B5D4B"/><path d="M5.2 7.6 L9.4 10.6" stroke="#9FD3BF" stroke-width="1.8" stroke-linecap="round"/></svg>`);
