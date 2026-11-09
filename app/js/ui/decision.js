// Nolo — panneau repliable « Comment Nolo a décidé » (SF-007-18) : étapes dans l'ordre (agent, nœud Y.3172,
// décision) et, pour chaque texte cité, identifiant, article, extrait d'au plus 240 caractères et statut de la source.
// Ne reçoit qu'une trace de codes : aucun texte libre, aucun signe, aucun nom de piste (FR-1914).
import { html } from '../core/dom.js';
import { extrait } from '../domain/base.js';
import { icone } from './icons.js';

const TON = { AUTORISE: 'ok', AUTORISE_AVEC_CONDITIONS: 'conditions', BLOQUE: 'bloque', BLOQUE_SANS_FONDEMENT: 'bloque' };

function lire(base, id, lang) {
  if (!base) return null;
  try { return base.fragment(id, lang); } catch { return null; }
}

export function ligneFragment(id, t, base) {
  const f = lire(base, id, t.lang);
  if (!f) return html`<li class="decision__fragment" data-cle="f-${id}"><p><span class="mono">${id}</span></p><p class="note">${t('decision.chargement')}</p></li>`;
  const langue = f.traduction ? 'en' : f.langue;
  return html`
  <li class="decision__fragment" data-cle="f-${id}">
    <p class="decision__ref"><span class="mono">${f.idAffiche}</span><span>${f.article || f.section}</span><span class="etiquette etiquette--neutre">${t(`decision.statuts.${f.statut}`)}</span></p>
    <q class="decision__extrait" lang="${langue}">${extrait(f.texte)}</q>
    <p class="note">${f.titre}${f.traduction === 'officielle' ? html` — ${t('decision.officielle')}` : ''}</p>
    ${f.traduction === 'non_officielle' ? html`<p class="note decision__mention" lang="en">${f.mention}</p>` : ''}
  </li>`;
}

export function panneauDecision(trace, t, base, { ouvert = false } = {}) {
  if (!trace?.length) return '';
  return html`
  <details class="decision" data-cle="decision"${ouvert ? html` open` : ''}>
    <summary class="decision__titre">${icone('bouclier', { taille: 18 })}<span>${t('decision.titre')}</span></summary>
    <p class="note">${t('decision.chapo')}</p>
    <ol class="decision__etapes" role="list">
      ${trace.map((e, i) => html`
      <li class="decision__etape" data-cle="etape-${i}">
        <span class="decision__noeud mono" title="${t('decision.noeud')}">${e.noeud}</span>
        <div class="decision__corps">
          <p class="decision__agent"><strong>${t(`decision.agents.${e.agent}`)}</strong> <span class="decision__verdict decision__verdict--${TON[e.decision] || 'info'}">${t(`decision.decisions.${e.decision}`)}</span></p>
          ${e.conditions?.length ? html`<p class="note">${t('decision.conditions')} : <span class="mono">${e.conditions.join(', ')}</span></p>` : ''}
          ${e.repli ? html`<p class="note">${t('decision.repli', { v: e.repli })}</p>` : ''}
          ${e.fragments?.length ? html`<ul class="decision__fragments" role="list">${e.fragments.map((f) => ligneFragment(f, t, base))}</ul>` : ''}
        </div>
      </li>`)}
    </ol>
  </details>`;
}
