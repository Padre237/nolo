// Nolo — composants d'interface partagés (gabarits). Un seul langage pour tous les écrans.
import { html, raw, attr } from '../core/dom.js';
import { icone, logo } from './icons.js';
import { distance, ouvert, prochaineOuverture } from '../domain/facilities.js';

export function entete({ t, lang, retour = null, etape = null, pro = false }) {
  return html`
  <header class="entete">
    <div class="cadre entete__barre">
      ${retour ? html`<a class="bouton bouton--discret bouton--icone entete__retour" href="${retour}" aria-label="${t('commun.retour')}">${icone('retour')}</a>` : ''}
      <a class="marque" href="#/" aria-label="${t('commun.accueil')}">${logo(30)}<span class="marque__mot" aria-hidden="true">nolo</span></a>
      ${pro ? html`<span class="etiquette etiquette--foret entete__pro">${t('pro.espace')}</span>` : ''}
      <div class="entete__fin">
        <div class="langue" role="group" aria-label="${t('commun.langue')}">
          <button type="button" data-act="langue" data-valeur="fr" aria-pressed="${lang === 'fr'}" lang="fr">FR</button>
          <button type="button" data-act="langue" data-valeur="en" aria-pressed="${lang === 'en'}" lang="en">EN</button>
        </div>
      </div>
    </div>
    ${etape !== null ? html`<div class="cadre entete__parcours">${parcours(t, etape)}</div>` : ''}
  </header>`;
}

/** Trait de parcours : 3 étapes et la porte. etape = 0, 1, 2 ; 3 = arrivé à la porte. */
export function parcours(t, etape) {
  const noms = t.list('parcours.etapes');
  const courant = etape >= 3 ? t('parcours.arrive') : t('parcours.etape', { n: etape + 1, nom: noms[etape] });
  return html`
  <nav class="parcours" aria-label="${t('parcours.nom')}" data-arrive="${etape >= 3}">
    <p class="vh" aria-live="polite">${courant}</p>
    ${noms.map((nom, i) => html`
      <div class="parcours__etape" data-etat="${i < etape ? 'fait' : i === etape ? 'actuel' : 'avenir'}" aria-hidden="true">
        <div class="parcours__trait"><span class="parcours__point"></span></div>
        <span class="parcours__nom">${nom}</span>
      </div>`)}
    <div class="parcours__porte" aria-hidden="true">
      <span class="parcours__anneau"></span>
      <span class="parcours__nom">${t('parcours.porte')}</span>
    </div>
  </nav>`;
}

export function barreSecurite(t) {
  return html`
  <aside class="barre-securite" aria-label="${t('securite.region')}">
    <div class="cadre barre-securite__corps">
      <span style="color: var(--urgence)">${icone('telephone')}</span>
      <div class="barre-securite__texte"><span class="barre-securite__titre">${t('securite.titre')}</span><span class="barre-securite__sous">${t('securite.sous')}</span></div>
      <a class="appel" href="tel:119" aria-label="${t('securite.appeler119')}">119</a>
      <a class="appel" href="tel:112" aria-label="${t('securite.appeler112')}">112</a>
    </div>
  </aside>`;
}

export function pied(t) {
  return html`
  <footer class="cadre pied pas-imprimer">
    <a href="#/conditions">${t('pied.conditions')}</a>
    <a href="#/mes-donnees">${t('pied.mesDonnees')}</a>
    <a href="#/pro">${t('pied.etablissement')}</a>
    <a href="#/ministere">${t('pied.ministere')}</a>
    <span style="display: inline-flex; align-items: center; min-height: 48px">${t('commun.automatise')}</span>
  </footer>`;
}

const COCHE = icone('coche', { taille: 16, trait: 2.6 });

export function caseACocher({ id, checked, titre, texte = '', pied: bas = '', etat = '', act, compact = false, cle }) {
  return html`
  <label class="choix ${compact ? 'choix--compact' : ''}" for="${id}" data-cle="${cle || id}">
    <input type="checkbox" id="${id}" data-change="${act}"${attr('checked', checked)}>
    <span class="choix__marque choix__marque--case">${raw(`<span style="color:#fff;display:grid">${COCHE}</span>`)}</span>
    <span class="choix__corps">
      ${titre ? html`<span style="display:flex;gap:10px;align-items:baseline"><span class="choix__titre">${titre}</span>${etat ? html`<span class="choix__etat">${etat}</span>` : ''}</span>` : ''}
      ${texte ? html`<span class="choix__texte">${texte}</span>` : ''}
      ${bas ? html`<span class="choix__pied">${bas}</span>` : ''}
    </span>
  </label>`;
}

export function pastille({ id, name, value, checked, titre, texte = '', act, compact = true, tuile = null }) {
  return html`
  <label class="choix ${compact ? 'choix--compact' : ''} ${tuile ? 'tuile' : ''}" for="${id}" data-cle="${id}">
    <input type="radio" id="${id}" name="${name}" value="${value}" data-change="${act}"${attr('checked', checked)}>
    ${tuile ? html`<span class="tuile__picto">${icone(tuile, { taille: 24 })}</span>` : html`<span class="choix__marque choix__marque--pastille"></span>`}
    <span class="choix__corps"><span class="choix__titre">${titre}</span>${texte ? html`<span class="choix__texte">${texte}</span>` : ''}</span>
  </label>`;
}

export const etiquette = (genre, texte, ico = null) => html`<span class="etiquette etiquette--${genre}">${ico ? icone(ico, { taille: 14, trait: 2 }) : ''}${texte}</span>`;

export function erreurChamp(id, message) {
  return message ? html`<p class="champ__erreur revele" id="${id}">${icone('alerte', { taille: 18, trait: 2 })}<span>${message}</span></p>` : '';
}

const heure = (h, lang) => {
  const hh = Math.floor(h); const mm = Math.round((h - hh) * 60);
  return lang === 'en' ? `${hh}:${String(mm).padStart(2, '0')}` : `${hh} h${mm ? String(mm).padStart(2, '0') : ''}`;
};

export function etatOuverture(e, t, quand = new Date()) {
  if (e.h24) return { ouvert: true, texte: t('commun.ouvert24') };
  if (ouvert(e, quand)) return { ouvert: true, texte: t('commun.ouvert') };
  const p = prochaineOuverture(e, quand);
  if (!p) return { ouvert: false, texte: t('commun.ferme') };
  const h = heure(p.heure, t.lang);
  const texte = p.aujourdhui ? t('commun.ouvreA', { h }) : p.demain ? t('commun.ouvreDemain', { h }) : t('commun.ouvreLe', { jour: t.list('commun.jours')[p.jour], h });
  return { ouvert: false, texte: `${t('commun.ferme')}. ${texte}` };
}

/** Ligne de structure : nom, catégorie, ouverture, distance, repère, appel (fictif). */
export function ligneStructure(e, t, { extra = '', quand = new Date(), titreNiveau = 'h3' } = {}) {
  const o = etatOuverture(e, t, quand);
  const cat = e.categorie ? t(`categories.${e.categorie}`) : t(`categories.${e.type}`);
  const H = titreNiveau;
  return html`
  <article class="structure" data-cle="st-${e.id}">
    <div class="structure__tete">
      <div class="structure__nom">
        ${raw(`<${H} class="titre-3">`)}${e.nom}${raw(`</${H}>`)}
        <p class="structure__cat">${cat}</p>
      </div>
      <p class="structure__distance chiffres">${t.km(distance(e))}</p>
    </div>
    <ul class="structure__faits" role="list">
      <li class="${o.ouvert ? 'est-ouvert' : 'est-ferme'}">${icone('horloge', { taille: 18 })}<span>${o.texte}</span></li>
      <li>${icone('repere', { taille: 18 })}<span>${t('commun.repere', { q: e.quartier })}</span></li>
      ${e.urgences && e.h24 ? html`<li>${icone('alerte', { taille: 18 })}<span>${t('structure.urgences')}${e.urgencesPed ? `, ${t('structure.urgencesPed').toLowerCase()}` : ''}</span></li>` : ''}
    </ul>
    ${extra}
    <div class="structure__actions">
      <button type="button" class="bouton bouton--secondaire" disabled aria-describedby="numeros-fictifs">${icone('telephone', { taille: 20 })}${t('commun.appeler')}</button>
    </div>
  </article>`;
}

/** Motif signature : signes → trait → anneau. `anime` déclenche le dessin une seule fois. */
export function motif({ points = 6, anime = true, sombre = false, cls = '' } = {}) {
  const P = [[18, 24, 5], [30, 62, 6], [44, 98, 4.5], [82, 30, 4], [74, 108, 5], [110, 76, 4], [58, 46, 3.5], [100, 112, 3.5]].slice(0, Math.max(1, Math.min(8, points)));
  const trait = sombre ? '#9FD3BF' : '#0B5D4B';
  const fil = sombre ? 'rgba(159,211,191,.45)' : '#B9DCCD';
  const fond = sombre ? '#083F33' : '#FFFFFF';
  return raw(`<svg class="motif ${anime ? 'motif--anime' : ''} ${cls}" viewBox="0 0 360 132" aria-hidden="true" focusable="false">
  <g stroke="${fil}" stroke-width="1.4" stroke-linecap="round">${P.map(([x, y], i) => `<line class="motif__fil" style="--i:${i}" x1="${x}" y1="${y}" x2="178" y2="66" pathLength="1"/>`).join('')}</g>
  <g fill="${fond}" stroke="${trait}" stroke-width="1.6">${P.map(([x, y, r], i) => `<circle class="motif__signe" style="--i:${i}" cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
  <circle class="motif__noeud" cx="178" cy="66" r="7" fill="${trait}"/>
  <path class="motif__chemin" d="M178 66 C 216 66, 234 36, 270 46 S 302 66, 311 66" fill="none" stroke="${trait}" stroke-width="3" stroke-linecap="round" pathLength="1"/>
  <circle class="motif__porte" cx="326" cy="66" r="14" fill="${fond}" stroke="${trait}" stroke-width="2.4"/>
  <circle class="motif__porte-centre" cx="326" cy="66" r="5" fill="${trait}"/>
</svg>`);
}

/** Barre de points : x signes typiques sur y (le motif sert de jauge). */
export function points(x, y, label) {
  return html`<span class="points" role="img" aria-label="${label}">${Array.from({ length: y }, (_, i) => html`<span class="points__p ${i < x ? 'est-plein' : ''}"></span>`)}</span>`;
}
