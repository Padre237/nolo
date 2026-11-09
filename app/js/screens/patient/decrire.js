// Écran 3 — Décrire : pour qui, âge, description libre (référence du brief).
import { html, attr } from '../../core/dom.js';
import { partage } from '../../domain/consent.js';
import { reformuler } from '../../domain/engine.js';
import { pastille, erreurChamp } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';

const MAX = 600;
export const casVide = () => ({ qui: null, age: { valeur: null, unite: 'ans' }, texte: '', tente: false });

export function erreurs(c) {
  const e = {};
  if (!c.qui) e.qui = 'qui';
  if (c.age.valeur === null || c.age.valeur === '' || Number.isNaN(c.age.valeur)) e.age = 'age';
  else if (c.age.valeur < 0 || (c.age.unite === 'ans' ? c.age.valeur > 120 : c.age.valeur > 59)) e.age = 'ageMax';
  if ((c.texte || '').trim().length < 3) e.texte = 'texte';
  return e;
}

export default {
  id: 'decrire',
  titre: ({ t }) => t('decrire.titre'),
  chrome: () => ({ retour: '#/', etape: 0 }),
  render({ s, t }) {
    const c = s.cas || casVide();
    const e = c.tente ? erreurs(c) : {};
    const enfant = c.qui === 'enfant';
    const n = (c.texte || '').length;
    const envoi = partage(s.consentement, 'orientation');
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <h1 class="titre">${t('decrire.titre')}</h1>
        <p class="chapo">${t('decrire.chapo')}</p>
        <div class="exemples">
          <h2 class="champ__etiquette">${t('decrire.exemplesT')}</h2>
          <ul class="exemples__liste" role="list">
            ${t.list('decrire.exemples').map((x, i) => html`<li><button type="button" class="exemple" data-act="exemple" data-i="${i}">${icone('plus', { taille: 18 })}<span>${x.texte}</span></button></li>`)}
          </ul>
        </div>
      </section>

      <form class="surface" data-submit="analyser" novalidate>
        <fieldset class="pile" aria-describedby="${e.qui ? 'err-qui' : ''}">
          <legend class="champ__etiquette">${t('decrire.quiQ')}</legend>
          <div class="grille-choix grille-choix--2">
            ${pastille({ id: 'qui-moi', name: 'qui', value: 'moi', checked: c.qui === 'moi', titre: t('decrire.moi'), texte: t('decrire.moiB'), act: 'qui', compact: false, tuile: 'personne' })}
            ${pastille({ id: 'qui-enfant', name: 'qui', value: 'enfant', checked: c.qui === 'enfant', titre: t('decrire.enfant'), texte: t('decrire.enfantB'), act: 'qui', compact: false, tuile: 'enfant' })}
          </div>
          ${erreurChamp('err-qui', e.qui && t(`decrire.erreurs.${e.qui}`))}
        </fieldset>

        <div class="champ">
          <label class="champ__etiquette" for="age">${enfant ? t('decrire.ageQEnfant') : t('decrire.ageQ')}</label>
          <div class="age">
            <div class="pas-a-pas">
              <button type="button" data-act="age-moins" aria-label="${t('decrire.moins')}">${icone('moins')}</button>
              <input id="age" type="number" inputmode="numeric" min="0" max="120" data-input="age" value="${c.age.valeur ?? ''}" aria-invalid="${!!e.age}" aria-describedby="age-aide ${e.age ? 'err-age' : ''}" data-force>
              <button type="button" data-act="age-plus" aria-label="${t('decrire.plus')}">${icone('plus')}</button>
            </div>
            <div class="segment" role="group" aria-label="${t('decrire.unite')}">
              <button type="button" data-act="unite" data-valeur="ans" aria-pressed="${c.age.unite === 'ans'}">${t('decrire.ans')}</button>
              <button type="button" data-act="unite" data-valeur="mois" aria-pressed="${c.age.unite === 'mois'}">${t('decrire.mois')}</button>
            </div>
          </div>
          <p class="champ__aide" id="age-aide">${t('decrire.ageAide')}</p>
          ${erreurChamp('err-age', e.age && t(`decrire.erreurs.${e.age}`))}
        </div>

        <div class="champ">
          <label class="champ__etiquette" for="texte">${enfant ? t('decrire.texteQEnfant') : t('decrire.texteQ')}</label>
          <p class="champ__aide" id="texte-aide">${t('decrire.repere')}</p>
          <textarea id="texte" class="saisie" maxlength="${MAX}" data-input="texte" placeholder="${t('decrire.placeholder')}" aria-invalid="${!!e.texte}" aria-describedby="texte-aide texte-compteur ${e.texte ? 'err-texte' : ''}">${c.texte}</textarea>
          <p class="compteur-car" id="texte-compteur">${t('decrire.compteur', { n, max: MAX })}</p>
          ${erreurChamp('err-texte', e.texte && t(`decrire.erreurs.${e.texte}`))}
        </div>

        <a class="ligne-lien" href="#/verifier?liste=1" data-act="liste">${icone('liste')}<span><strong>${t('decrire.listeT')}</strong><br><span class="note">${t('decrire.listeB')}</span></span>${icone('suite', { taille: 20 })}</a>

        <div class="actions">
          <p class="note envoi">${icone(envoi ? 'signal' : 'serrure', { taille: 18 })}<span>${envoi ? t('decrire.envoiOui') : t('decrire.envoiNon')}</span></p>
          <button type="submit" class="bouton bouton--principal">${t('decrire.analyser')}</button>
        </div>
      </form>
    </div>`;
  },
  actions: {
    qui({ s, set }, el) { set({ cas: { ...(s.cas || casVide()), qui: el.value } }); },
    age({ s, set }, el) {
      const v = el.value === '' ? null : Math.max(0, Math.floor(Number(el.value)));
      set({ cas: { ...(s.cas || casVide()), age: { ...(s.cas || casVide()).age, valeur: v } } });
    },
    'age-moins'({ s, set }) { const c = s.cas || casVide(); set({ cas: { ...c, age: { ...c.age, valeur: Math.max(0, (c.age.valeur ?? 1) - 1) } } }); },
    'age-plus'({ s, set }) { const c = s.cas || casVide(); const max = c.age.unite === 'ans' ? 120 : 59; set({ cas: { ...c, age: { ...c.age, valeur: Math.min(max, (c.age.valeur ?? -1) + 1) } } }); },
    unite({ s, set }, el) { const c = s.cas || casVide(); set({ cas: { ...c, age: { ...c.age, unite: el.dataset.valeur } } }); },
    texte({ s, set }, el) { set({ cas: { ...(s.cas || casVide()), texte: el.value.slice(0, MAX) } }); },
    exemple({ s, t, set }, el) {
      const x = t.list('decrire.exemples')[Number(el.dataset.i)];
      set({ cas: { ...(s.cas || casVide()), qui: x.qui, age: { valeur: x.age, unite: x.unite }, texte: x.texte, tente: false } });
      document.getElementById('texte')?.focus();
    },
    liste({ s, set }, el, ev) {
      ev.preventDefault();
      const c = { ...(s.cas || casVide()) };
      const e = erreurs({ ...c, texte: 'ok' });
      if (e.qui || e.age) { set({ cas: { ...c, tente: true } }); return; }
      set({ cas: { ...c, signes: { presents: [], absents: [], jours: null }, reponses: {}, liste: true, animer: false } });
      location.hash = '#/verifier';
    },
    analyser({ s, set }) {
      const c = { ...(s.cas || casVide()), tente: true };
      const e = erreurs(c);
      if (Object.keys(e).length) {
        set({ cas: c });
        requestAnimationFrame(() => document.querySelector('[aria-invalid="true"], .choix input')?.focus());
        return;
      }
      const signes = reformuler(c.texte);
      set({ cas: { ...c, signes, reponses: {}, liste: false, animer: true, resultat: null } });
      location.hash = '#/verifier';
    },
  },
};
