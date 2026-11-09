// Espace pro — confirmation de l'e-mail par un code à 6 chiffres (simulé, D-029b).
import { html } from '../../core/dom.js';
import { codeConfirmation } from '../../domain/pro.js';
import { erreurChamp } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { compteCourant, mettreAJour, journal } from './compte.js';

export default {
  id: 'pro-code',
  titre: ({ t }) => t('pro.code.titre'),
  chrome: () => ({ retour: '#/pro', pro: true }),
  garde: ({ s }) => { const c = s.pro.session && s.pro.comptes[s.pro.session]; if (!c) return '#/pro'; return c.etatCompte === 'EMAIL_NON_CONFIRME' ? null : '#/pro/tableau'; },
  render({ s, t }) {
    const c = compteCourant();
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <h1 class="titre">${t('pro.code.titre')}</h1>
        <p class="chapo">${t('pro.code.texte', { email: c.email })}</p>
        <aside class="boite-simulee" aria-label="${t('pro.code.simule')}">
          <p class="boite-simulee__tete">${icone('donnees', { taille: 18 })}${t('pro.code.simule')}<span class="etiquette etiquette--experimental">${t('commun.fictif')}</span></p>
          <p class="note">${t('pro.code.recu')}</p>
          <p class="boite-simulee__code mono">${c.code.valeur.slice(0, 3)} ${c.code.valeur.slice(3)}</p>
        </aside>
      </section>
      <form class="surface pile" data-submit="confirmer" novalidate>
        <div class="champ">
          <label class="champ__etiquette" for="code">${t('pro.code.champ')}</label>
          <input id="code" class="saisie saisie--mono saisie--code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" aria-invalid="${!!s.proCodeErreur}" aria-describedby="code-err">
          ${erreurChamp('code-err', s.proCodeErreur ? t('pro.code.faux') : '')}
        </div>
        <button type="submit" class="bouton bouton--principal">${t('pro.code.confirmer')}</button>
        <button type="button" class="bouton bouton--discret" data-act="renvoyer">${t('pro.code.renvoyer')}</button>
      </form>
    </div>`;
  },
  actions: {
    confirmer({ s, set, go }) {
      const c = compteCourant();
      const v = (document.getElementById('code')?.value || '').replace(/\D/g, '');
      if (v !== c.code.valeur || Date.now() > c.code.expire) { set({ proCodeErreur: true }); return; }
      mettreAJour(c.email, (x) => journal({ ...x, etatCompte: 'ACTIF', code: null }, 'confirmation'));
      set({ proCodeErreur: false });
      go('#/pro/tableau');
    },
    renvoyer({ t, set, annonce }) {
      const c = compteCourant();
      mettreAJour(c.email, (x) => ({ ...x, code: { valeur: codeConfirmation(), expire: Date.now() + 15 * 60000 } }));
      set({ proCodeErreur: false });
      annonce(t('pro.code.renvoye'));
    },
  },
};
