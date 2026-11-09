// Nolo — carte interactive des régions (SVG accessible) et schéma des aires de santé.
import { html, raw } from '../core/dom.js';
import { VUE, REGIONS_SVG } from '../domain/carte-regions.js';

export const TEINTES = ['#D6ECE3', '#A6D5C3', '#6BB49A', '#2F8468', '#0B5D4B'];

/**
 * valeurs : { [region]: { classe: 0..4 | null, libelle: texte lu au survol et par les lecteurs d'écran } }
 * marques : ensemble des régions qui portent un signal ; choisie : région sélectionnée.
 */
export function carteRegions({ valeurs, marques = new Set(), choisie = null, nom, titre, act = 'region' }) {
  const ids = Object.keys(REGIONS_SVG).sort((a, b) => (a === choisie) - (b === choisie)); // la région choisie se dessine en dernier
  return html`
  <figure class="carte" data-cle="carte">
    <svg class="carte__svg" viewBox="-6 -6 ${VUE.largeur + 12} ${VUE.hauteur + 12}" role="group" aria-label="${titre}">
      <defs><pattern id="hachures" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="#F3F5F2"/><line x1="0" y1="0" x2="0" y2="7" stroke="#B9DCCD" stroke-width="3"/></pattern></defs>
      ${ids.map((id) => {
        const v = valeurs[id] || { classe: null, libelle: '' };
        const fond = v.classe === null ? 'url(#hachures)' : TEINTES[v.classe];
        return raw(`<path class="carte__region${id === choisie ? ' est-choisie' : ''}" d="${REGIONS_SVG[id].d}" fill="${fond}" tabindex="0" role="button" aria-pressed="${id === choisie}" aria-label="${(nom(id) + ' : ' + v.libelle).replace(/"/g, '&quot;')}" data-act="${act}" data-r="${id}" data-cle="r-${id}"><title>${nom(id)} : ${v.libelle}</title></path>`);
      })}
      ${[...marques].map((id) => raw(`<g class="carte__signal" aria-hidden="true" data-cle="m-${id}"><circle cx="${REGIONS_SVG[id].cx}" cy="${REGIONS_SVG[id].cy}" r="13" /><circle cx="${REGIONS_SVG[id].cx}" cy="${REGIONS_SVG[id].cy}" r="4.5" class="carte__signal-centre"/></g>`))}
      ${choisie ? raw(`<text class="carte__nom" x="${REGIONS_SVG[choisie].cx}" y="${REGIONS_SVG[choisie].cy + (marques.has(choisie) ? 32 : 6)}" text-anchor="middle" aria-hidden="true">${nom(choisie)}</text>`) : ''}
    </svg>
  </figure>`;
}

export function legende({ titre, bornes, moinsDe5, signal, num }) {
  const etiquettes = [`5–${num(bornes[0] - 1)}`, ...bornes.slice(0, 3).map((b, i) => `${num(b)}–${num(bornes[i + 1] - 1)}`), `${num(bornes[3])} +`];
  return html`
  <div class="legende" aria-label="${titre}">
    <p class="legende__titre">${titre}</p>
    <ul class="legende__liste" role="list">
      <li><span class="legende__case legende__case--hachure"></span>${moinsDe5}</li>
      ${TEINTES.map((c, i) => html`<li><span class="legende__case" style="background:${c}"></span><span class="chiffres">${etiquettes[i]}</span></li>`)}
      ${signal ? html`<li><span class="legende__signal"></span>${signal}</li>` : ''}
    </ul>
  </div>`;
}

/** Schéma des aires de santé : une case par aire, de vraies cases cliquables (boutons). */
export function schemaAires({ aires, valeur, classe, choisie, signalees, libelle, act = 'aire' }) {
  return html`
  <div class="aires" role="group">
    ${aires.map((a) => {
      const c = classe(a.id);
      return html`<button type="button" class="aire ${a.id === choisie ? 'est-choisie' : ''} ${c === null ? 'est-hachure' : ''} ${c !== null && c >= 3 ? 'est-sombre' : ''}" style="grid-column:${a.col + 1};grid-row:${a.ligne + 1};${c === null ? '' : `background:${TEINTES[c]}`}" data-act="${act}" data-a="${a.id}" aria-pressed="${a.id === choisie}" aria-label="${libelle(a.id)}" data-cle="a-${a.id}">
        <span class="aire__id">${a.id}</span><span class="aire__val chiffres">${valeur(a.id)}</span>${signalees.has(a.id) ? html`<span class="aire__signal" aria-hidden="true"></span>` : ''}
      </button>`;
    })}
  </div>`;
}
