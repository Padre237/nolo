// Espace pro — entrée : se connecter, s'inscrire, ou ouvrir le compte de démonstration (FR-ETS-01).
import { html } from '../../core/dom.js';
import { local } from '../../core/store.js';
import { erreurChamp } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { comptes, enregistrerComptes, ouvrirSession, compteDemo, compteDemoHopital, empreinte, journal } from './compte.js';

export function cheminVerification(t, atteint, { vertical = false } = {}) {
  const etapes = t.list('pro.chemin');
  return html`
  <ol class="chemin ${vertical ? 'chemin--vertical' : ''}" role="list">
    ${etapes.map((nom, i) => html`<li class="chemin__etape" data-etat="${i < atteint ? 'fait' : i === atteint ? 'actuel' : 'avenir'}"><span class="chemin__point" aria-hidden="true"></span><span class="chemin__nom">${nom}</span></li>`)}
  </ol>`;
}

export default {
  id: 'pro-entree',
  titre: ({ t }) => t('pro.espace'),
  chrome: () => ({ retour: '#/', pro: true }),
  garde: ({ s }) => (s.pro.session && s.pro.comptes[s.pro.session] ? (s.pro.comptes[s.pro.session].etatCompte === 'EMAIL_NON_CONFIRME' ? '#/pro/code' : '#/pro/tableau') : null),
  render({ s, t }) {
    const f = s.proConnexion || { email: '', erreur: null };
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <h1 class="titre">${t('pro.entree.titre')}</h1>
        <p class="chapo">${t('pro.entree.chapo')}</p>
        ${cheminVerification(t, -1, { vertical: true })}
      </section>
      <div class="pile">
        <form class="surface pile" data-submit="connexion" novalidate>
          <h2 class="titre-3">${t('pro.entree.connexion')}</h2>
          <div class="champ"><label class="champ__etiquette" for="c-email">${t('pro.entree.email')}</label><input id="c-email" class="saisie" type="email" autocomplete="username" data-input="email" value="${f.email}" required></div>
          <div class="champ"><label class="champ__etiquette" for="c-mdp">${t('pro.entree.mdp')}</label><input id="c-mdp" class="saisie" type="password" autocomplete="current-password" required></div>
          ${erreurChamp('c-err', f.erreur)}
          <button type="submit" class="bouton bouton--principal">${icone('serrure', { taille: 20 })}${t('pro.entree.connexion')}</button>
        </form>
        <div class="surface pile">
          <h2 class="titre-3">${t('pro.entree.nouveau')}</h2>
          <a class="bouton bouton--secondaire bouton--principal" href="#/pro/inscription">${icone('batiment', { taille: 20 })}${t('pro.entree.inscription')}</a>
          <div class="annuaire">
            <button type="button" class="ligne-action" data-act="demo" data-quel="officine">
              <span class="ligne-action__picto">${icone('croixPharma')}</span>
              <span class="ligne-action__corps"><span class="ligne-action__titre">${t('pro.entree.demo')}</span><span class="ligne-action__texte">${t('pro.entree.demoB')}</span></span>
              <span class="ligne-action__fin">${icone('suite')}</span>
            </button>
            <button type="button" class="ligne-action" data-act="demo" data-quel="hopital">
              <span class="ligne-action__picto">${icone('batiment')}</span>
              <span class="ligne-action__corps"><span class="ligne-action__titre">${t('pro.entree.demoHopital')}</span><span class="ligne-action__texte">${t('pro.entree.demoHopitalB')}</span></span>
              <span class="ligne-action__fin">${icone('suite')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>`;
  },
  actions: {
    email({ s, set }, el) { set({ proConnexion: { ...(s.proConnexion || {}), email: el.value } }); },
    async connexion({ s, t, set, go }) {
      const email = (s.proConnexion?.email || '').trim().toLowerCase();
      const mdp = document.getElementById('c-mdp')?.value || '';
      const essais = { ...s.pro.essais };
      const e = essais[email] || { n: 0, jusqua: 0 };
      if (e.jusqua > Date.now()) { set({ proConnexion: { email, erreur: t('pro.entree.bloque', { min: Math.ceil((e.jusqua - Date.now()) / 60000) }) } }); return; }
      const c = comptes()[email];
      const ok = c && c.mdp && (await empreinte(mdp, c.email)) === c.mdp;
      if (!ok) {
        e.n += 1;
        if (e.n >= 5) { e.jusqua = Date.now() + 15 * 60000; e.n = 0; }
        essais[email] = e; local.write('pro-essais', essais);
        set({ pro: { ...s.pro, essais }, proConnexion: { email, erreur: e.jusqua > Date.now() ? t('pro.entree.bloque', { min: 15 }) : `${t('pro.entree.identifiants')} ${t('pro.entree.essais', { n: 5 - e.n })}` } });
        return;
      }
      delete essais[email]; local.write('pro-essais', essais);
      const cpt = { ...comptes() }; cpt[email] = journal(c, 'connexion');
      enregistrerComptes(cpt, { essais });
      set({ proConnexion: null });
      ouvrirSession(email);
      go(c.etatCompte === 'EMAIL_NON_CONFIRME' ? '#/pro/code' : '#/pro/tableau');
    },
    demo({ go }, el) {
      const d = el.dataset.quel === 'hopital' ? compteDemoHopital() : compteDemo();
      const c = { ...comptes() };
      if (!c[d.email]) c[d.email] = d;
      enregistrerComptes(c);
      ouvrirSession(d.email);
      go('#/pro/tableau');
    },
  },
};
