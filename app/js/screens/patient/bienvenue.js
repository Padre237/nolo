// Écran 1 — Première utilisation : consentement (D-028).
import { html } from '../../core/dom.js';
import { local } from '../../core/store.js';
import { brouillonVide, erreur, demandeAge, enregistrer, sansPartage, FINALITES } from '../../domain/consent.js';
import { caseACocher, pastille, motif, etiquette } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';

const brouillon = (s) => s.brouillon || brouillonVide();

export default {
  id: 'bienvenue',
  titre: ({ t }) => t('consentement.titre'),
  chrome: () => ({}),
  render({ s, t }) {
    const b = brouillon(s);
    const tente = !!s.brouillonTente;
    const code = erreur(b);
    const age = demandeAge(b);
    const fait = s.brouillonFait;
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <h1 class="affiche">${t('consentement.titre')}</h1>
        <p class="chapo">${t('consentement.chapo')}</p>
        <figure class="motif-legende">
          ${motif({ points: 6 })}
          <figcaption class="motif-legende__noms">${t.list('consentement.motif').map((m) => html`<span>${m}</span>`)}</figcaption>
        </figure>
        <p class="note">${t('consentement.sens')}</p>
      </section>

      <section class="surface" aria-labelledby="choix-titre">
        <h2 class="titre-3">${t('consentement.toujoursTitre')}</h2>
        <ul class="lignes lignes--info" role="list">
          <li>${icone('bouclier')}<div><strong>${t('consentement.urgenceT')}</strong><p>${t('consentement.urgenceB')}</p></div></li>
          <li>${icone('signal')}<div><strong>${t('consentement.connexionT')}</strong><p>${t('consentement.connexionB')}</p><p class="note">${t('consentement.connexionK')}</p></div></li>
        </ul>

        <fieldset class="pile">
          <legend><span id="choix-titre" class="titre-2" style="display:block">${t('consentement.choixTitre')}</span><span class="note" style="display:block;margin-top:4px">${t('consentement.choixSous')}</span></legend>
          ${FINALITES.map((f) => caseACocher({
            id: `consent-${f}`, act: 'finalite', checked: b.finalites[f],
            titre: t(`consentement.finalites.${f}.titre`), texte: t(`consentement.finalites.${f}.texte`),
            etat: b.finalites[f] ? t('consentement.accepte') : t('consentement.nonAccepte'),
            pied: html`<span>${t(`consentement.finalites.${f}.conservation`)}</span>${etiquette('experimental', t('commun.aConfirmer'))}`,
          }))}
          <a class="ligne-lien" href="#/conditions" target="_blank" rel="noopener">${icone('donnees')}<span>${t('consentement.conditions')}</span>${icone('suite', { taille: 20 })}</a>
        </fieldset>

        ${age ? html`
        <fieldset class="pile revele" data-cle="age">
          <legend><span class="champ__etiquette" style="display:block">${t('consentement.ageQ')}</span><span class="note" style="display:block;margin-top:2px">${t('consentement.agePourquoi')}</span></legend>
          <div class="grille-choix grille-choix--2">
            ${pastille({ id: 'age-majeur', name: 'age', value: 'majeur', checked: b.age === 'majeur', titre: t('consentement.majeur'), act: 'age' })}
            ${pastille({ id: 'age-mineur', name: 'age', value: 'mineur', checked: b.age === 'mineur', titre: t('consentement.mineur'), act: 'age' })}
          </div>
          ${b.age === 'mineur' ? html`<div class="revele" data-cle="parental">${caseACocher({ id: 'accord-parental', act: 'parental', checked: b.accordParental, texte: t('consentement.parental') })}</div>` : ''}
        </fieldset>` : ''}

        ${fait ? html`
        <div class="confirmation revele" role="status" data-cle="fait">
          <p class="confirmation__titre">${icone('coche', { taille: 22, trait: 2.2 })}${t('consentement.faitTitre')}</p>
          <p>${t('consentement.faitPrefixe', { liste: FINALITES.filter((f) => s.consentement?.finalites[f]).map((f) => t(`consentement.finalites.${f}.titre`)).join(', ') })} ${s.consentement?.accord_parental ? t('consentement.faitParental') : ''}</p>
          <div class="actions actions--ligne">
            <a class="bouton bouton--principal" href="#/">${t('commun.continuer')}</a>
            <button type="button" class="bouton bouton--secondaire bouton--principal" data-act="modifier">${t('commun.modifier')}</button>
          </div>
        </div>` : html`
        <div class="actions" data-cle="actions">
          <p class="raison" id="raison" aria-live="polite">${tente && code ? t(`consentement.erreurs.${code}`) : ''}</p>
          <button type="button" class="bouton bouton--principal" data-act="valider" aria-describedby="raison" data-inactif="${!!code}">${t('consentement.valider')}</button>
          <button type="button" class="bouton bouton--secondaire bouton--principal" data-act="sans-partage">${t('consentement.sansPartage')}</button>
          <p class="note" style="text-align:center">${t('consentement.sansPartageNote')}</p>
        </div>`}
      </section>
    </div>`;
  },
  actions: {
    finalite({ s, set }, el) {
      const b = brouillon(s); const f = el.id.replace('consent-', '');
      const finalites = { ...b.finalites, [f]: el.checked };
      const suivant = { ...b, finalites };
      if (!demandeAge(suivant)) Object.assign(suivant, { age: null, accordParental: false });
      set({ brouillon: suivant, brouillonFait: false });
    },
    age({ s, set }, el) { set({ brouillon: { ...brouillon(s), age: el.value, accordParental: el.value === 'mineur' ? brouillon(s).accordParental : false } }); },
    parental({ s, set }, el) { set({ brouillon: { ...brouillon(s), accordParental: el.checked } }); },
    valider({ s, set }) {
      const r = enregistrer(brouillon(s));
      if (!r.ok) { set({ brouillonTente: true }); document.getElementById('raison')?.focus?.(); return; }
      local.write('consentement', r.enregistrement);
      set({ consentement: r.enregistrement, brouillonFait: true, brouillonTente: false });
    },
    'sans-partage'({ set, go }) {
      const e = sansPartage();
      local.write('consentement', e);
      set({ consentement: e, brouillon: brouillonVide(), brouillonFait: false, brouillonTente: false });
      go('#/');
    },
    modifier({ set }) { set({ brouillonFait: false }); },
  },
};
