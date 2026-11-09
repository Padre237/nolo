// Écran 10 — Hors champ : expliquer le périmètre du module, orienter sans rien imposer.
import { html } from '../../core/dom.js';
import { centreProche } from '../../domain/facilities.js';
import { panneauDirection } from './ou-aller.js';
import { icone } from '../../ui/icons.js';

export default {
  id: 'hors-champ',
  titre: ({ t }) => t('horsChamp.titre'),
  chrome: () => ({ retour: '#/verifier', etape: 3 }),
  garde: ({ s }) => (s.cas?.resultat?.issue === 'hors_champ' ? null : '#/decrire'),
  render({ s, t }) {
    const raison = s.cas.resultat.raison;
    const { structure } = centreProche();
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <h1 class="titre">${t('horsChamp.titre')}</h1>
        <p class="chapo">${raison === 'faible' ? t('horsChamp.faible') : t('horsChamp.nonRespiratoire')}</p>
        <a class="bouton bouton--discret" href="#/verifier">${icone('retour', { taille: 20 })}${t('horsChamp.modifier')}</a>
      </section>
      <div class="pile">
        ${panneauDirection(structure, t, { surTitre: t('horsChamp.centre'), h: 'h2', titreId: 'centre-titre' })}
        <div class="actions">
          <a class="bouton bouton--secondaire bouton--principal" href="#/fiche">${icone('fiche', { taille: 20 })}${t('horsChamp.fiche')}</a>
          <a class="bouton bouton--discret" href="#/chercher/service">${icone('recherche', { taille: 20 })}${t('horsChamp.chercher')}</a>
        </div>
      </div>
    </div>`;
  },
};
