// Écran 6 — Où aller : le panneau de direction (moment fort), la raison du choix, les autres portes.
import { html, raw } from '../../core/dom.js';
import { recommander, distance } from '../../domain/facilities.js';
import { etiquette, etatOuverture, ligneStructure } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { nomPiste } from './pistes.js';

/** Panneau de signalétique : « Allez à » + nom de la structure + distance, le trait finit sur l'anneau. */
export function panneauDirection(e, t, { surTitre, titreId = 'direction-titre', h = 'h1' } = {}) {
  const o = etatOuverture(e, t);
  const cat = e.categorie ? t(`categories.${e.categorie}`) : t(`categories.${e.type}`);
  return html`
  <section class="panneau direction sombre" aria-labelledby="${titreId}">
    <span class="direction__trait" aria-hidden="true"></span>
    <span class="direction__porte" aria-hidden="true"><span class="direction__porte-km chiffres">${t.km(distance(e))}</span></span>
    <div class="direction__corps">
    <p class="direction__sur">${surTitre}</p>
    ${raw(`<${h} id="${titreId}" class="direction__nom">`)}${e.nom}${raw(`</${h}>`)}
    <p class="direction__cat">${cat}</p>
    <dl class="direction__faits">
      <div class="direction__km-dd"><dt class="vh">Distance</dt><dd class="direction__km chiffres">${t.km(distance(e))}</dd></div>
      <div><dt class="vh">${t('commun.ouvert')}</dt><dd class="${o.ouvert ? 'est-ouvert' : 'est-ferme'}">${icone('horloge', { taille: 18 })}${o.texte}</dd></div>
      <div><dt class="vh">${t('commun.repere', { q: '' })}</dt><dd>${icone('repere', { taille: 18 })}${t('commun.repere', { q: e.quartier })}</dd></div>
    </dl>
    <div class="direction__actions">
      <button type="button" class="bouton bouton--sur-sombre" disabled aria-describedby="dir-fictif">${icone('telephone', { taille: 20 })}${t('commun.appeler')}</button>
      <span class="note" id="dir-fictif">${t('commun.numeroFictif')}</span>
    </div>
    </div>
  </section>`;
}

export default {
  id: 'ou-aller',
  titre: ({ t }) => t('orientation.titre'),
  chrome: () => ({ retour: '#/pistes', etape: 3 }),
  garde: ({ s }) => (s.cas?.resultat?.issue === 'pistes' ? null : '#/decrire'),
  render({ s, t }) {
    const { besoins, pistes } = s.cas.resultat;
    const reco = recommander(besoins);
    const e = reco.structure;
    const tete = pistes[0];
    const lang = t.lang;
    return html`
    <div class="cadre ou-aller">
      <div class="etiquettes">${etiquette('experimental', t('pistes.module'), 'info')}${etiquette('experimental', t('commun.fictif'))}</div>
      ${panneauDirection(e, t, { surTitre: t('orientation.conseillee') })}

      <div class="deux-temps deux-temps--egal">
        <section class="pile" aria-labelledby="pourquoi-titre">
          <h2 id="pourquoi-titre" class="titre-2">${t('orientation.pourquoi')}</h2>
          <ul class="raisons" role="list">
            <li>${icone('batiment')}<span>${t('orientation.niveau', { v: t(`niveaux.${besoins.niveau}`) })}</span></li>
            ${besoins.specialites.map((sp) => html`<li>${icone('service')}<span>${t('orientation.specialite', { v: t(`specialites.${sp}`) })}</span></li>`)}
            <li>${icone('liste')}<span>${t('orientation.piste', { v: nomPiste(tete, lang) })}</span></li>
            ${besoins.services.length ? html`<li>${icone('coche')}<span>${t('orientation.services', { v: besoins.services.map((x) => t(`services.${x}`)).join(', ') })}</span></li>` : ''}
          </ul>
          ${reco.rayon && reco.rayon > 5 ? html`<p class="encart encart--menthe">${icone('info')}<span class="encart__corps">${t('orientation.elargi', { km: t.km(reco.rayon) })}</span></p>` : ''}
          ${reco.manque.length ? html`<p class="encart encart--menthe">${icone('alerte')}<span class="encart__corps">${t('orientation.manque', { v: reco.manque.map((m) => (m.type === 'specialite' ? t(`specialites.${m.id}`) : t(`services.${m.id}`)).toLowerCase()).join(', ') })}</span></p>` : ''}
          <p class="note">${t('orientation.aValider')}</p>
          <p class="note">${icone('serrure', { taille: 16 })} ${t('orientation.serveur')}</p>
          <div class="actions">
            <a class="bouton bouton--principal" href="#/fiche">${icone('fiche', { taille: 20 })}${t('orientation.fiche')}</a>
            <a class="bouton bouton--discret" href="#/pistes">${t('orientation.retour')}</a>
          </div>
        </section>
        <section class="pile" aria-labelledby="autres-titre">
          <h2 id="autres-titre" class="titre-2">${t('orientation.autres')}</h2>
          <div class="lignes">${reco.autres.map((x) => ligneStructure(x, t))}</div>
          <p class="note">${t('commun.position')} ${t('commun.numeroFictif')}.</p>
        </section>
      </div>
    </div>`;
  },
};
