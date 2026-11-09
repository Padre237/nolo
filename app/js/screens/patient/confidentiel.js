// Écran 9 — Catégorie protégée (art. 48) : ton calme, aucune couleur d'alerte, aucun nom de maladie.
import { html } from '../../core/dom.js';
import { centreProche } from '../../domain/facilities.js';
import { panneauDirection } from './ou-aller.js';
import { ligneStructure } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { panneauDecision } from '../../ui/decision.js';
import { agents } from '../../agents/nolo.js';

export default {
  id: 'confidentiel',
  titre: ({ t }) => t('art48.titre'),
  chrome: () => ({ retour: '#/verifier', etape: 3 }),
  garde: ({ s }) => (s.cas?.resultat?.issue === 'art48' ? null : '#/decrire'),
  render({ s, t }) {
    const { structure, autres } = centreProche();
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <span class="picto-calme">${icone('serrure', { taille: 28 })}</span>
        <h1 class="titre">${t('art48.titre')}</h1>
        <p class="chapo">${t('art48.texte')}</p>
        <p class="encart encart--menthe">${icone('bouclier')}<span class="encart__corps">${t('art48.rien')}</span></p>
      </section>
      <div class="pile">
        ${panneauDirection(structure, t, { surTitre: t('art48.centre'), h: 'h2', titreId: 'centre-titre' })}
        <div class="actions">
          <a class="bouton bouton--secondaire bouton--principal" href="#/fiche">${icone('fiche', { taille: 20 })}${t('art48.fiche')}</a>
        </div>
        <div class="lignes">${autres.slice(0, 2).map((e) => ligneStructure(e, t))}</div>
        ${panneauDecision(s.cas.trace, t, agents()?.base)}
      </div>
    </div>`;
  },
};
