// Conditions d'utilisation et politique de données (bilingue, mêmes sections).
import { html } from '../../core/dom.js';
import { VERSION_CONDITIONS } from '../../domain/consent.js';

export default {
  id: 'conditions',
  titre: ({ t }) => t('conditions.titre'),
  chrome: () => ({ retour: '#/bienvenue' }),
  render({ t }) {
    const date = new Date(VERSION_CONDITIONS).toLocaleDateString(t.lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long' });
    return html`
    <div class="cadre lecture">
      <h1 class="titre">${t('conditions.titre')}</h1>
      <p class="encart encart--experimental"><span class="encart__corps">${t('conditions.version', { date })}</span></p>
      <ol class="sections" role="list">
        ${t.list('conditions.sections').map((x, i) => html`<li class="section"><h2 class="titre-3"><span class="section__n chiffres">${i + 1}</span>${x.t}</h2><p>${x.p.replace(/ ([?!;:])/g, ' $1')}</p></li>`)}
      </ol>
    </div>`;
  },
};
