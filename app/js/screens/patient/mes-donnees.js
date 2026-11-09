// Mes données : modifier ou retirer chaque accord aussi simplement qu'il a été donné (FR-CONS-07).
import { html } from '../../core/dom.js';
import { local } from '../../core/store.js';
import { FINALITES, VERSION_CONDITIONS, sansPartage } from '../../domain/consent.js';
import { caseACocher } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';

export default {
  id: 'mes-donnees',
  titre: ({ t }) => t('mesDonnees.titre'),
  chrome: () => ({ retour: '#/' }),
  render({ s, t }) {
    const e = s.consentement;
    const f = s.mesChoix || { ...e.finalites };
    const date = new Date(e.date).toLocaleString(t.lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'long', timeStyle: 'short' });
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <h1 class="titre">${t('mesDonnees.titre')}</h1>
        <p class="chapo">${t('mesDonnees.chapo')}</p>
        <p class="note">${t('mesDonnees.enregistre', { date })}</p>
      </section>
      <div class="surface pile">
        <fieldset class="pile">
          <legend class="titre-3">${t('consentement.choixTitre')}</legend>
          ${FINALITES.map((x) => caseACocher({ id: `md-${x}`, act: 'basculer', checked: f[x], titre: t(`consentement.finalites.${x}.titre`), texte: t(`consentement.finalites.${x}.texte`), etat: f[x] ? t('consentement.accepte') : t('consentement.nonAccepte') }))}
        </fieldset>
        <p class="note">${t('mesDonnees.effacement')}</p>
        <div class="actions">
          <button type="button" class="bouton bouton--principal" data-act="enregistrer">${t('mesDonnees.enregistrer')}</button>
          <button type="button" class="bouton bouton--secondaire" data-act="retirer">${t('mesDonnees.retirer')}</button>
        </div>
        <div class="effacer">
          <button type="button" class="bouton bouton--discret" data-act="effacer">${icone('croix', { taille: 20 })}${t('mesDonnees.effacer')}</button>
          <p class="note">${t('mesDonnees.effacerB')}</p>
        </div>
      </div>
    </div>`;
  },
  actions: {
    basculer({ s, set }, el) { const f = { ...(s.mesChoix || s.consentement.finalites) }; f[el.id.replace('md-', '')] = el.checked; set({ mesChoix: f }); },
    enregistrer({ s, t, set, go, annonce }) {
      const f = s.mesChoix || s.consentement.finalites;
      const e = s.consentement;
      // Accorder une nouvelle finalité sans âge connu : repasser par l'écran de consentement (FR-CONS-05).
      if (FINALITES.some((x) => f[x]) && e.majeur === null) {
        set({ brouillon: { finalites: { ...f }, age: null, accordParental: false }, brouillonFait: false, mesChoix: null });
        go('#/bienvenue'); return;
      }
      const suivant = { ...e, version_conditions: VERSION_CONDITIONS, date: new Date().toISOString(), finalites: { ...f } };
      local.write('consentement', suivant);
      set({ consentement: suivant, mesChoix: null });
      annonce(t('mesDonnees.fait'));
    },
    retirer({ t, set, annonce }) { const e = sansPartage(); local.write('consentement', e); set({ consentement: e, mesChoix: null }); annonce(t('mesDonnees.fait')); },
    effacer({ set, go }) {
      ['consentement', 'signalements', 'pro-comptes', 'pro-session', 'pro-essais'].forEach((k) => local.remove(k));
      set({ consentement: null, brouillon: null, cas: null, mesChoix: null, pro: { comptes: {}, session: null, inscription: null, essais: {} } });
      go('#/bienvenue');
    },
  },
};
