// Nolo — bloc « D'où calculer les distances » (SF-008-03) et ses actions, partagés par la recherche et « Où aller ».
import { html, attr } from '../core/dom.js';
import { encadre } from '../etat.js';
import { definirDepart } from '../domain/facilities.js';
import { demanderPosition, depart, QUARTIERS } from '../domain/position.js';
import { icone } from './icons.js';

/** Applique la position de l'état au calcul des distances (appelé avant chaque rendu qui en dépend). */
export const appliquerPosition = (s) => { const d = depart(s.position); definirDepart(d); return d; };

export function blocPosition(s, t) {
  const p = s.position || null;
  const d = appliquerPosition(s);
  const source = !p ? t('position.reference') : p.source === 'gps' ? (d.horsDistrict ? t('position.horsDistrict') : t('position.gps'))
    : p.source === 'quartier' ? t('position.quartierChoisi', { q: t(`position.quartiers.${p.quartier}`) }) : t('position.reference');
  return html`
  <section class="position" aria-labelledby="position-titre" data-cle="position">
    <p class="position__ligne"><span id="position-titre" class="champ__etiquette">${icone('repere', { taille: 18 })} ${t('position.titre')}</span><span class="note">${source}</span></p>
    ${p?.source === 'gps' ? '' : html`
    <p class="note">${t('position.pourquoi')}</p>
    <button type="button" class="bouton bouton--discret" data-act="position-gps">${icone('cible', { taille: 20 })}${t('position.utiliser')}</button>`}
    ${p?.source === 'refus' || p?.source === 'quartier' ? html`
    <div class="champ">
      <label class="champ__etiquette" for="quartier">${p?.source === 'refus' ? t('position.refus') : t('position.quartier')}</label>
      <select id="quartier" class="saisie" data-change="position-quartier">
        ${QUARTIERS.map((q) => html`<option value="${q.id}"${attr('selected', p.quartier === q.id)}>${t(`position.quartiers.${q.id}`)}</option>`)}
      </select>
    </div>` : ''}
  </section>`;
}

export const actionsPosition = {
  async 'position-gps'({ set, annonce, t }) {
    const p = await demanderPosition({ encadre });
    set({ position: p });
    if (p.source === 'reference') annonce(t('position.reference'), { ico: 'info' });
  },
  'position-quartier'({ set }, el) { set({ position: { source: 'quartier', quartier: el.value } }); },
};
