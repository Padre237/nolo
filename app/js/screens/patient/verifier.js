// Écran 4 — Vérifier : signes reformulés, retrait et ajout, vérification de sécurité.
import { html } from '../../core/dom.js';
import { SIGNES, SUGGESTIONS, libelle, questionsDanger, profil, analyser, codeFiche } from '../../domain/engine.js';
import { motif } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { agents } from '../../agents/nolo.js';
import { deciderResultat } from '../../agents/parcours.js';
import { urgenceMoteur } from '../../domain/triage.js';

const jeu = (c) => {
  const p = profil(c.qui, c.age);
  return { p, cle: p.enfantPetit ? 'petit' : c.qui === 'enfant' ? 'lui' : 'moi', questions: questionsDanger(p) };
};
/** Réponses initiales : « oui » pour un signe de danger écrit par la personne. */
function reponsesInitiales(c) {
  const { questions } = jeu(c);
  const r = { ...(c.reponses || {}) };
  for (const q of questions) if (r[q.id] === undefined && SIGNES[q.signe]?.danger && c.signes.presents.includes(q.signe)) r[q.id] = true;
  return r;
}
const dureeTexte = (t, j) => (j === null || j === undefined ? '' : j === 1 ? t('verifier.depuisHier') : j % 7 === 0 && j >= 14 ? t('verifier.depuisSemaines', { n: j / 7 }) : t('verifier.depuisJours', { n: j }));

export default {
  id: 'verifier',
  titre: ({ t }) => t('verifier.titre'),
  chrome: () => ({ retour: '#/decrire', etape: 1 }),
  garde: ({ s }) => (s.cas?.signes ? null : '#/decrire'),
  render({ s, t }) {
    const c = s.cas;
    const lang = t.lang;
    const { cle, questions } = jeu(c);
    const reponses = reponsesInitiales(c);
    const presents = c.signes.presents.filter((x) => !SIGNES[x]?.danger);
    const dangers = c.signes.presents.filter((x) => SIGNES[x]?.danger);
    const alerte = Object.values(reponses).some((v) => v === true) || dangers.length > 0;
    const restantes = alerte ? 0 : questions.filter((q) => reponses[q.id] === undefined).length;
    const ouvrir = c.ajout || c.liste || presents.length === 0;
    const proposables = (c.liste ? Object.keys(SIGNES).filter((k) => !SIGNES[k].danger) : SUGGESTIONS).filter((k) => !c.signes.presents.includes(k));
    const d = dureeTexte(t, c.signes.jours);
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <h1 class="titre">${t('verifier.titre')}</h1>
        <p class="chapo">${t('verifier.chapo')}</p>
        <div class="constellation">${motif({ points: Math.max(1, c.signes.presents.length), cls: 'motif--constellation' })}</div>
        <p class="note">${icone('serrure', { taille: 16 })} ${t('verifier.calcul')}</p>
      </section>

      <div class="surface">
        <section class="pile" aria-labelledby="retenus-titre">
          <div class="titre-ligne"><h2 id="retenus-titre" class="titre-3">${t('verifier.retenus')}</h2>${d ? html`<span class="etiquette etiquette--neutre">${icone('horloge', { taille: 14, trait: 2 })}${d}</span>` : ''}</div>
          ${presents.length || dangers.length ? html`
          <ul class="puces" role="list">
            ${[...dangers, ...presents].map((code) => html`<li class="puce ${SIGNES[code].danger ? 'puce--danger' : ''}" data-cle="p-${code}">${libelle(code, lang)}<button type="button" data-act="retirer" data-code="${code}" aria-label="${t('verifier.retirer', { signe: libelle(code, lang) })}">${icone('croix', { taille: 18 })}</button></li>`)}
          </ul>` : html`<p class="encart encart--menthe">${icone('info')}<span class="encart__corps">${t('verifier.aucun')}</span></p>`}
          ${ouvrir ? html`
          <div class="pile revele" data-cle="ajout">
            <h3 class="champ__etiquette">${c.liste ? t('decrire.listeT') : t('verifier.suggestions')}</h3>
            <ul class="puces" role="list">${proposables.map((code) => html`<li data-cle="s-${code}"><button type="button" class="puce puce--suggestion" data-act="ajouter" data-code="${code}">${icone('plus', { taille: 18 })}${libelle(code, lang)}</button></li>`)}</ul>
          </div>` : html`<button type="button" class="puce puce--ajout" data-act="ouvrir-ajout">${icone('plus', { taille: 18 })}${t('verifier.ajouter')}</button>`}
          ${c.signes.absents.length ? html`<p class="note">${t('verifier.exclus')} : ${c.signes.absents.map((x) => libelle(x, lang)).join(', ')}</p>` : ''}
        </section>

        <section class="securite" aria-labelledby="securite-titre">
          <div class="securite__tete">
            <span class="securite__picto">${icone('bouclier')}</span>
            <div><h2 id="securite-titre" class="titre-3">${t('verifier.securiteT')}</h2><p class="note">${t('verifier.securiteB')}</p></div>
          </div>
          <ul class="questions" role="list">
            ${questions.map((q) => {
              const k = q.id.replace(/-/g, '_');
              const v = reponses[q.id];
              const ecrit = SIGNES[q.signe]?.danger && c.signes.presents.includes(q.signe);
              return html`
              <li class="question" data-cle="q-${q.id}">
                <p class="question__texte" id="q-${q.id}">${t(`verifier.questions.${cle}.${k}`)}${ecrit ? html` <span class="etiquette etiquette--urgence">${t('verifier.mentionne')}</span>` : ''}</p>
                <div class="segment segment--danger" role="group" aria-labelledby="q-${q.id}">
                  <button type="button" data-act="repondre" data-q="${q.id}" data-valeur="oui" aria-pressed="${v === true}">${t('commun.oui')}</button>
                  <button type="button" data-act="repondre" data-q="${q.id}" data-valeur="non" aria-pressed="${v === false}">${t('commun.non')}</button>
                </div>
              </li>`;
            })}
          </ul>
        </section>

        ${alerte ? html`<p class="encart encart--urgence revele" role="alert" data-cle="alerte">${icone('alerte')}<span class="encart__corps"><strong class="encart__titre">${t('urgence.titre')}</strong>${t('urgence.chapo')}</span></p>` : ''}
        <div class="actions">
          <p class="raison" id="raison-voir" aria-live="polite">${c.tenteVoir && restantes ? t('verifier.restantes', { n: restantes }) : c.tenteVoir && !c.signes.presents.length ? t('verifier.aucunSigne') : ''}</p>
          <button type="button" class="bouton bouton--principal ${alerte ? 'bouton--urgence' : ''}" data-act="voir" aria-describedby="raison-voir" data-inactif="${restantes > 0 || !c.signes.presents.length}">${alerte ? html`${icone('alerte', { taille: 20 })}${t('urgence.titre')}` : t('verifier.voir')}</button>
        </div>
      </div>
    </div>`;
  },
  actions: {
    retirer({ s, t, set, annonce }, el) {
      const code = el.dataset.code; const c = s.cas;
      set({ cas: { ...c, signes: { ...c.signes, presents: c.signes.presents.filter((x) => x !== code) } } });
      annonce(t('verifier.retire', { signe: libelle(code, t.lang) }), { ico: 'croix', duree: 1800 });
    },
    ajouter({ s, t, set, annonce }, el) {
      const code = el.dataset.code; const c = s.cas;
      set({ cas: { ...c, signes: { ...c.signes, presents: [...c.signes.presents, code], absents: c.signes.absents.filter((x) => x !== code) } } });
      annonce(t('verifier.ajoute', { signe: libelle(code, t.lang) }), { duree: 1800 });
    },
    'ouvrir-ajout'({ s, set }) { set({ cas: { ...s.cas, ajout: true } }); },
    repondre({ s, set }, el) {
      const c = s.cas;
      set({ cas: { ...c, reponses: { ...reponsesInitiales(c), [el.dataset.q]: el.dataset.valeur === 'oui' } } });
    },
    voir({ s, set }) {
      const c = s.cas;
      const { p, questions } = jeu(c);
      const reponses = reponsesInitiales(c);
      const alerte = Object.values(reponses).some((v) => v === true) || c.signes.presents.some((x) => SIGNES[x]?.danger);
      const restantes = alerte ? 0 : questions.filter((q) => reponses[q.id] === undefined).length;
      if (restantes || !c.signes.presents.length) { set({ cas: { ...c, reponses, tenteVoir: true } }); return; }
      // Décision de Conformité avant tout affichage (FR-1527) ; rien ne s'affiche sans elle (FR-1901).
      const moteur = urgenceMoteur(c.texte, c.age, c.signes.jours, agents().triage);
      const { resultat, trace } = deciderResultat(agents().orchestrateur, analyser(c.signes, p, reponses, { moteur }), { profil: p });
      const route = { urgence: '#/urgence', hors_champ: '#/hors-champ', art48: '#/confidentiel', pistes: '#/pistes', orientation: '#/ou-aller' }[resultat.issue];
      set({ cas: { ...c, reponses, resultat, trace, tenteVoir: false, code: c.code || codeFiche(Date.now()), date: new Date().toISOString() } });
      location.hash = route;
    },
  },
};
