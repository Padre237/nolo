// Écran 7 — Fiche pour le soignant : une page de carnet de santé, lisible d'un coup d'œil.
import { html } from '../../core/dom.js';
import { partage } from '../../domain/consent.js';
import { libelle, questionsDanger, profil } from '../../domain/engine.js';
import { logo, icone } from '../../ui/icons.js';
import { nomPiste } from './pistes.js';
import { encadre } from '../../etat.js';

const RETOUR = { pistes: '#/pistes', art48: '#/confidentiel', hors_champ: '#/hors-champ' };

export default {
  id: 'fiche',
  titre: ({ t }) => t('fiche.titre'),
  chrome: ({ s }) => ({ retour: RETOUR[s.cas?.resultat?.issue] || '#/', etape: s.cas?.resultat?.issue === 'pistes' ? 3 : null }),
  garde: ({ s }) => (s.cas?.resultat && s.cas.resultat.issue !== 'urgence' ? null : '#/decrire'),
  render({ s, t }) {
    const c = s.cas;
    const lang = t.lang;
    const r = c.resultat;
    const p = profil(c.qui, c.age);
    const questions = questionsDanger(p);
    const cle = p.enfantPetit ? 'petit' : c.qui === 'enfant' ? 'lui' : 'moi';
    const date = new Date(c.date).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long', timeStyle: 'short' });
    const unite = t(`decrire.${c.age.unite}`);
    const signes = c.signes.presents;
    const j = c.signes.jours;
    return html`
    <div class="cadre fiche-ecran">
      <div class="fiche-ecran__tete pas-imprimer">
        <h1 class="titre">${t('fiche.titre')}</h1>
        <p class="chapo">${t('fiche.chapo')}</p>
      </div>

      <article class="carnet" aria-labelledby="carnet-titre">
        <header class="carnet__tete">
          <div class="carnet__marque">${logo(28)}<h2 id="carnet-titre" class="titre-3">${t('fiche.carnet')}</h2></div>
          <div class="carnet__tampon" aria-label="${t('fiche.code')} ${c.code}">
            <span class="carnet__tampon-libelle">${t('fiche.code')}</span>
            <span class="carnet__code mono">${c.code.split('-').map((x) => html`<span>${x}</span>`)}</span>
          </div>
        </header>
        <p class="carnet__date">${t('fiche.etablie', { date })}</p>

        <dl class="carnet__grille">
          <div class="carnet__bloc"><dt>${t('fiche.pour')}</dt><dd>${c.qui === 'enfant' ? t('fiche.enfant') : t('fiche.moi')}, ${t('fiche.age', { n: c.age.valeur, u: unite })}</dd></div>
          ${j ? html`<div class="carnet__bloc"><dt>${t('fiche.duree')}</dt><dd>${j === 1 ? t('verifier.depuisHier') : t('verifier.depuisJours', { n: j })}</dd></div>` : ''}
          <div class="carnet__bloc carnet__bloc--large"><dt>${t('fiche.signes')}</dt><dd><ul class="carnet__liste" role="list">${signes.map((x) => html`<li>${libelle(x, lang)}</li>`)}</ul></dd></div>
          <div class="carnet__bloc carnet__bloc--large"><dt>${t('fiche.absents')}</dt><dd>${c.signes.absents.length ? c.signes.absents.map((x) => libelle(x, lang)).join(', ') : t('fiche.aucune')}</dd></div>
          <div class="carnet__bloc carnet__bloc--large"><dt>${t('fiche.securite')}</dt><dd>
            <ul class="carnet__liste carnet__liste--reponses" role="list">${questions.map((q) => html`<li><span>${t(`verifier.questions.${cle}.${q.id.replace(/-/g, '_')}`)}</span><strong>${c.reponses[q.id] ? t('commun.oui') : t('commun.non')}</strong></li>`)}</ul>
          </dd></div>
          ${r.issue === 'pistes' ? html`
          <div class="carnet__bloc carnet__bloc--large carnet__bloc--poc"><dt>${t('fiche.pistes')}</dt><dd>
            <ol class="carnet__liste" role="list">${r.pistes.map((x) => html`<li><span>${nomPiste(x, lang)}</span><span class="chiffres">${t('pistes.score', { n: Math.round(x.score * 100) })}</span></li>`)}</ol>
            <p class="note">${t('fiche.pistesNote')}</p>
          </dd></div>` : ''}
          ${c.texte ? html`<div class="carnet__bloc carnet__bloc--large"><dt>${t('fiche.description')}</dt><dd class="carnet__citation">« ${c.texte} »</dd></div>` : ''}
        </dl>
        <footer class="carnet__pied">
          <p>${icone(partage(s.consentement, 'orientation') ? 'signal' : 'serrure', { taille: 18 })}<span>${partage(s.consentement, 'orientation') ? t('fiche.envoyeOui') : t('fiche.envoyeNon')}</span></p>
          <p>${t('commun.automatise')}</p>
        </footer>
      </article>

      <div class="actions actions--ligne pas-imprimer">
        ${encadre ? '' : html`<button type="button" class="bouton bouton--principal" data-act="imprimer">${icone('imprimante', { taille: 20 })}${t('fiche.imprimer')}</button>`}
        ${r.issue === 'pistes' ? html`<a class="bouton bouton--secondaire bouton--principal" href="#/ou-aller">${icone('repere', { taille: 20 })}${t('fiche.ouAller')}</a>` : ''}
        <button type="button" class="bouton bouton--discret bouton--principal" data-act="terminer">${t('fiche.terminer')}</button>
      </div>
    </div>`;
  },
  actions: {
    imprimer() { window.print(); },
    terminer({ set, go }) { set({ cas: null }); go('#/'); },
  },
};
