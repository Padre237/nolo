// Écran 5 — Pistes du module expérimental : le nom d'abord, l'accord des signes ensuite, le score en dernier.
import { html } from '../../core/dom.js';
import { libelle } from '../../domain/engine.js';
import { etiquette, points } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { panneauDecision } from '../../ui/decision.js';
import { agents } from '../../agents/nolo.js';

export const nomPiste = (x, lang) => x.p[lang] || x.p.fr;

export default {
  id: 'pistes',
  titre: ({ t }) => t('pistes.titre'),
  chrome: () => ({ retour: '#/verifier', etape: 2 }),
  garde: ({ s }) => (s.cas?.resultat?.issue === 'pistes' ? null : '#/decrire'),
  render({ s, t }) {
    const { pistes } = s.cas.resultat;
    const lang = t.lang;
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <div class="etiquettes">${etiquette('experimental', t('pistes.module'), 'info')}${etiquette('experimental', t('commun.fictif'))}</div>
        <h1 class="titre">${t('pistes.titre')}</h1>
        <p class="chapo">${t('pistes.chapo')}</p>
        <p class="note">${icone('serrure', { taille: 16 })} ${t('pistes.calcul')}</p>
      </section>

      <div class="surface">
        <ol class="pistes" role="list">
          ${pistes.map((x, i) => html`
          <li class="piste ${i === 0 ? 'piste--tete' : ''}" data-cle="piste-${x.id}">
            <p class="piste__rang">${t('pistes.rang', { n: i + 1 })}</p>
            <h2 class="piste__nom">${nomPiste(x, lang)}</h2>
            <div class="piste__accord">
              ${points(x.trouves.length, x.typiques, t('pistes.signes', { x: x.trouves.length, y: x.typiques }))}
              <span>${t('pistes.signes', { x: x.trouves.length, y: x.typiques })}</span>
            </div>
            <p class="piste__retrouves">${t('pistes.retrouves', { liste: x.trouves.map((c) => libelle(c, lang).toLowerCase()).join(', ') })}</p>
            <p class="piste__score chiffres">${t('pistes.score', { n: Math.round(x.score * 100) })}</p>
          </li>`)}
        </ol>
        <p class="encart encart--experimental">${icone('info')}<span class="encart__corps"><strong class="encart__titre">${t('pistes.tableDemo')}</strong>${t('pistes.origine')}</span></p>
        ${panneauDecision(s.cas.trace, t, agents()?.base)}
        <div class="actions">
          <a class="bouton bouton--principal" href="#/ou-aller">${icone('repere', { taille: 20 })}${t('pistes.ouAller')}</a>
          <a class="bouton bouton--secondaire" href="#/fiche">${icone('fiche', { taille: 20 })}${t('pistes.fiche')}</a>
          <a class="bouton bouton--discret" href="#/verifier">${t('pistes.modifier')}</a>
        </div>
      </div>
    </div>`;
  },
};
