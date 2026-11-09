// Conditions et politique de données des établissements (SF-010-13, D-031) : bilingue, mêmes sections,
// liée depuis l'inscription. Texte de travail repris de la livraison D-029, à relire par le juriste de l'équipe.
import { html } from '../../core/dom.js';

export default {
  id: 'pro-conditions',
  titre: ({ t }) => t('pro.conditionsPage.titre'),
  chrome: () => ({ retour: '#/pro/inscription', pro: true }),
  render({ t }) {
    return html`
    <div class="cadre lecture">
      <h1 class="titre">${t('pro.conditionsPage.titre')}</h1>
      <p class="encart encart--experimental"><span class="encart__corps">${t('pro.conditionsPage.version')}</span></p>
      <ol class="sections" role="list">
        ${t.list('pro.conditionsPage.sections').map((x, i) => html`<li class="section" data-cle="ps-${x.id}"><h2 class="titre-3"><span class="section__n chiffres">${i + 1}</span>${x.t}</h2><p>${x.p}</p></li>`)}
      </ol>
      <a class="bouton bouton--discret" href="#/pro/inscription">${t('pro.conditionsPage.retour')}</a>
    </div>`;
  },
};
