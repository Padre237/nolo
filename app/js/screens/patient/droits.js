// « Mes droits santé » (SF-016-03) : une question, des extraits de lois cités avec leurs références, jamais un avis.
// La question reste dans l'état de la page : ni stockage local, ni envoi (FR-2209).
import { html } from '../../core/dom.js';
import { agents, conseiller } from '../../agents/nolo.js';
import { panneauDecision } from '../../ui/decision.js';
import { icone } from '../../ui/icons.js';

const MAX = 300;

function reponse(r, t) {
  if (r.verdict === 'BLOQUE_SANS_FONDEMENT') return html`
    <p class="encart revele" role="status">${icone('info')}<span class="encart__corps">${t('droits.aucun')}</span></p>
    <p class="note">${r.mention}</p>
    ${panneauDecision(r.trace, t, agents()?.base)}`;
  return html`
  <section class="pile revele" aria-labelledby="extraits-titre" data-cle="reponse">
    <h2 id="extraits-titre" class="titre-3">${t('droits.extraitsTitre')}</h2>
    ${r.etendu ? html`<p class="encart encart--experimental">${icone('info')}<span class="encart__corps">${t('droits.etendu')}</span></p>` : ''}
    <ol class="extraits" role="list">
      ${r.extraits.map((x) => html`
      <li class="extrait" data-cle="x-${x.id}">
        <p class="decision__ref"><span class="mono">${x.idAffiche}</span><span>${x.article}</span><span class="etiquette etiquette--neutre">${t(`decision.statuts.${x.statut}`)}</span></p>
        <blockquote class="extrait__texte" lang="${x.langue}">${x.extrait}</blockquote>
        <p class="note">${x.titre}${x.page ? ` — ${t('droits.page', { n: x.page })}` : ''}${x.traduction === 'officielle' ? ` — ${t('decision.officielle')}` : ''}</p>
        ${x.traduction === 'non_officielle' ? html`<p class="note" lang="en">${x.mention}</p>` : ''}
      </li>`)}
    </ol>
    <p class="encart encart--menthe">${icone('bouclier')}<span class="encart__corps">${r.mention}</span></p>
    ${panneauDecision(r.trace, t, agents()?.base)}
  </section>`;
}

async function demander({ s, t, set }, question) {
  const q = (question || '').trim().slice(0, MAX);
  if (!q) { set({ droits: { ...(s.droits || {}), erreur: 'vide', reponse: null } }); return; }
  set({ droits: { question: q, attente: true, reponse: null } });
  const c = await conseiller();
  if (!c) { set({ droits: { question: q, erreur: 'chargement', reponse: null } }); return; }
  set({ droits: { question: q, reponse: c.repondre(q, t.lang) } });
}

export default {
  id: 'droits',
  titre: ({ t }) => t('droits.titre'),
  chrome: () => ({ retour: '#/' }),
  render({ s, t }) {
    const d = s.droits || {};
    const q = d.question || '';
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <span class="picto-calme">${icone('bouclier', { taille: 28 })}</span>
        <h1 class="titre">${t('droits.titre')}</h1>
        <p class="chapo">${t('droits.chapo')}</p>
        <p class="note">${icone('serrure', { taille: 16 })} ${t('droits.confidentialite')}</p>
      </section>
      <div class="surface pile">
        <form class="pile" data-submit="demander" novalidate>
          <div class="champ">
            <label class="champ__etiquette" for="question-droits">${t('droits.etiquette')}</label>
            <textarea id="question-droits" class="saisie saisie--courte" maxlength="${MAX}" data-input="question" aria-describedby="droits-aide droits-err">${q}</textarea>
            <p class="champ__aide" id="droits-aide">${t('droits.compteur', { n: q.length, max: MAX })}</p>
            ${d.erreur ? html`<p class="champ__erreur" id="droits-err" role="alert">${t(`droits.erreurs.${d.erreur}`)}</p>` : html`<span id="droits-err"></span>`}
          </div>
          <button type="submit" class="bouton bouton--principal">${icone('recherche', { taille: 20 })}${t('droits.bouton')}</button>
        </form>
        <section class="pile" aria-labelledby="exemples-titre">
          <h2 id="exemples-titre" class="champ__etiquette">${t('droits.exemplesTitre')}</h2>
          <ul class="puces" role="list">${t.list('droits.exemples').map((x, i) => html`<li data-cle="ex-${i}"><button type="button" class="puce puce--suggestion" data-act="exemple" data-i="${i}">${x}</button></li>`)}</ul>
        </section>
        ${d.attente ? html`<p class="note" role="status">${t('droits.chargement')}</p>` : ''}
        ${d.reponse ? reponse(d.reponse, t) : ''}
      </div>
    </div>`;
  },
  actions: {
    question({ s, set }, el) { set({ droits: { ...(s.droits || {}), question: el.value.slice(0, MAX), erreur: null } }); },
    demander(ctx) { demander(ctx, ctx.s.droits?.question); },
    exemple(ctx, el) { demander(ctx, ctx.t.list('droits.exemples')[Number(el.dataset.i)]); },
  },
};
