// Écran 8 — Urgence : le rouge prend la page, deux grandes cibles d'appel, les urgences proches. Rien d'autre.
import { html } from '../../core/dom.js';
import { SIGNES, libelle, questionsDanger, profil } from '../../domain/engine.js';
import { urgencesProches } from '../../domain/facilities.js';
import { ligneStructure } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';

export default {
  id: 'urgence',
  titre: ({ t }) => t('urgence.titre'),
  chrome: () => ({ retour: '#/verifier' }),
  garde: ({ s }) => (s.cas?.resultat?.issue === 'urgence' ? null : '#/decrire'),
  render({ s, t }) {
    const c = s.cas;
    const p = profil(c.qui, c.age);
    const cle = p.enfantPetit ? 'petit' : c.qui === 'enfant' ? 'lui' : 'moi';
    const ecrits = c.signes.presents.filter((x) => SIGNES[x]?.danger).map((x) => libelle(x, t.lang));
    const repondus = questionsDanger(p).filter((q) => c.reponses[q.id] && !c.signes.presents.includes(q.signe)).map((q) => t(`verifier.questions.${cle}.${q.id.replace(/-/g, '_')}`));
    const signales = [...new Set([...ecrits, ...repondus])];
    return html`
    <div class="cadre urgence">
      <section class="alerte-urgence" aria-labelledby="urgence-titre" role="alert">
        <span class="alerte-urgence__picto">${icone('alerte', { taille: 32, trait: 2 })}</span>
        <h1 id="urgence-titre" class="affiche">${t('urgence.titre')}</h1>
        <p class="alerte-urgence__chapo">${t('urgence.chapo')}</p>
        ${signales.length ? html`<div class="alerte-urgence__signes"><p class="alerte-urgence__libelle">${t('urgence.signale')}</p><ul role="list">${signales.map((x) => html`<li>${x}</li>`)}</ul></div>` : ''}
        <div class="alerte-urgence__appels">
          <a class="appel-geant" href="tel:119" aria-label="${t('securite.appeler119')}">${icone('telephone', { taille: 26, trait: 2 })}<span class="chiffres">119</span></a>
          <a class="appel-geant" href="tel:112" aria-label="${t('securite.appeler112')}">${icone('telephone', { taille: 26, trait: 2 })}<span class="chiffres">112</span></a>
        </div>
      </section>

      <section class="pile" aria-labelledby="proches-titre">
        <h2 id="proches-titre" class="titre-2">${t('urgence.proches')}</h2>
        <div class="lignes">${urgencesProches(p.enfant).map((e) => ligneStructure(e, t))}</div>
        <p class="note">${t('commun.position')} ${t('commun.numeroFictif')}.</p>
        <p class="note">${t('urgence.masquees')}</p>
        <a class="bouton bouton--discret" href="#/verifier">${icone('retour', { taille: 20 })}${t('urgence.retour')}</a>
      </section>
    </div>`;
  },
};
