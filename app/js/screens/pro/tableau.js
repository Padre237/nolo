// Espace pro — tableau de bord : bandeau, navigation, vues (D-029 § 8, D-032).
import { html } from '../../core/dom.js';
import { ongletsStock, completude, fraicheur } from '../../domain/pro.js';
import { ligneStructure } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { compteCourant, mettreAJour, journal, fermerSession, versEtablissement } from './compte.js';
import { cheminVerification } from './entree.js';
import vueFiche from './vue-fiche.js';
import vueStock from './vue-stock.js';
import vueTendances from './vue-tendances.js';
import vueServices from './vue-services.js';

const VUES = [['accueil', 'accueil'], ['fiche', 'fiche'], ['services', 'service'], ['stock', 'cartons'], ['tendances', 'graphique'], ['indicateurs', 'liste'], ['apercu', 'oeil'], ['compte', 'compte']];

export function etapeAtteinte(c) {
  if (c.etatCompte !== 'ACTIF') return 0;
  if (c.visibilite === 'FICHE_INCOMPLETE') return 1;
  if (c.visibilite !== 'VERIFIE') return 2;
  const f = fraicheur(c.stock?.envoi);
  const besoinStock = ongletsStock(c.type, c.fiche || {}).includes('medicaments');
  return besoinStock && (!f || f.expire) ? 3 : 4;
}

function accueil(c, t) {
  const etat = t(`pro.etats.${c.visibilite}.t`);
  const f = fraicheur(c.stock?.envoi);
  const stock = ongletsStock(c.type, c.fiche || {});
  return html`
  <section class="pile">
    <h2 class="titre-2">${etat}</h2>
    <p class="chapo">${t(`pro.etats.${c.visibilite}.d`, { motif: c.motifRefus || '' })}</p>
    ${f && f.alerte ? html`<p class="encart encart--experimental">${icone('horloge')}<span class="encart__corps">${t('pro.accueil.alerte', { n: c.stock.lignes.length, h: Math.ceil(f.heures) })}</span></p>` : ''}
    ${f && f.expire ? html`<p class="encart encart--urgence">${icone('alerte')}<span class="encart__corps">${t('pro.accueil.expire')}</span></p>` : ''}
    ${c.etatCompte === 'DESACTIVE' ? html`<p class="encart">${icone('info')}<span class="encart__corps">${t('pro.compte.desactive')}</span></p>` : ''}
    <div class="annuaire">
      ${c.visibilite === 'FICHE_INCOMPLETE' || c.visibilite === 'REFUSE' ? html`<a class="ligne-action" href="#/pro/tableau/fiche"><span class="ligne-action__picto">${icone('fiche')}</span><span class="ligne-action__corps"><span class="ligne-action__titre">${t('pro.accueil.completer')}</span></span><span class="ligne-action__fin">${icone('suite')}</span></a>` : ''}
      ${stock.length ? html`<a class="ligne-action" href="#/pro/tableau/stock"><span class="ligne-action__picto">${icone('cartons')}</span><span class="ligne-action__corps"><span class="ligne-action__titre">${t('pro.accueil.stock')}</span>${f ? html`<span class="ligne-action__texte">${f.expire ? t('pro.stock.expire') : t('pro.stock.visible', { h: Math.floor(f.heures) })}</span>` : ''}</span><span class="ligne-action__fin">${icone('suite')}</span></a>` : ''}
      ${c.visibilite === 'VERIFIE' ? html`<a class="ligne-action" href="#/pro/tableau/tendances"><span class="ligne-action__picto">${icone('graphique')}</span><span class="ligne-action__corps"><span class="ligne-action__titre">${t('pro.accueil.voirTendances')}</span></span><span class="ligne-action__fin">${icone('suite')}</span></a>` : ''}
    </div>
    ${c.visibilite === 'EN_ATTENTE_VERIFICATION' ? html`
    <div class="encart encart--experimental demo-verif">
      ${icone('info')}
      <div class="encart__corps"><p class="encart__titre">${t('pro.accueil.verificateur')}</p>
        <div class="actions actions--ligne"><button type="button" class="bouton" data-act="verif-ok">${t('pro.accueil.valider')}</button><button type="button" class="bouton bouton--secondaire" data-act="verif-refus">${t('pro.accueil.refuser')}</button></div>
      </div>
    </div>` : ''}
  </section>`;
}

function indicateurs(c, t) {
  const f = fraicheur(c.stock?.envoi);
  const lignes = c.stock?.lignes || [];
  const nb = (n) => lignes.filter((l) => l.niveau === n).length;
  const comp = completude(c.type, c.fiche || {});
  const imp = c.dernierImport;
  const visible = etapeAtteinte(c) === 4 && c.etatCompte === 'ACTIF';
  const stock = ongletsStock(c.type, c.fiche || {}).includes('medicaments');
  return html`
  <section class="pile">
    <h2 class="titre-2">${t('pro.indicateurs.titre')}</h2>
    <p class="chapo">${t('pro.indicateurs.chapo')}</p>
    <dl class="indicateurs">
      <div><dt>${t('pro.indicateurs.visibilite')}</dt><dd><span class="indicateur__valeur ${visible ? 'est-ouvert' : 'est-ferme'}">${visible ? t('pro.indicateurs.visibleOui') : t('pro.indicateurs.visibleNon')}</span><span class="note">${t(`pro.etats.${c.visibilite}.t`)}</span></dd></div>
      ${stock ? html`
      <div><dt>${t('pro.indicateurs.fraicheur')}</dt><dd><span class="indicateur__valeur chiffres">${f ? (f.expire ? t('pro.stock.expire') : t('pro.stock.visible', { h: Math.floor(f.heures) })) : '—'}</span></dd></div>
      <div><dt>${t('pro.indicateurs.lignes')}</dt><dd><span class="indicateur__valeur chiffres">${lignes.length}</span><span class="indicateur__detail"><span class="niveau niveau--disponible">${nb('disponible')}</span><span class="niveau niveau--faible">${nb('faible')}</span><span class="niveau niveau--rupture">${nb('rupture')}</span></span></dd></div>
      <div><dt>${t('pro.indicateurs.rupture')}</dt><dd><span class="indicateur__valeur chiffres">${lignes.length ? Math.round((nb('rupture') / lignes.length) * 100) : 0} %</span></dd></div>
      <div><dt>${t('pro.indicateurs.qualite')}</dt><dd><span class="indicateur__valeur chiffres">${imp ? t('pro.indicateurs.rejet', { p: Math.round((imp.rejetees / Math.max(1, imp.total)) * 100) }) : '—'}</span></dd></div>` : ''}
      <div><dt>${t('pro.indicateurs.completude')}</dt><dd><span class="indicateur__valeur chiffres">${t('pro.fiche.completude', { x: comp.faites, y: comp.total })}</span></dd></div>
    </dl>
    <p class="note">${t('pro.indicateurs.aVenir')}</p>
  </section>`;
}

function apercu(c, t) {
  return html`
  <section class="pile">
    <h2 class="titre-2">${t('pro.apercu.titre')}</h2>
    <p class="chapo">${t('pro.apercu.chapo')}</p>
    ${c.visibilite !== 'VERIFIE' || c.etatCompte !== 'ACTIF' ? html`<p class="encart">${icone('oeil')}<span class="encart__corps">${t('pro.apercu.invisible')}</span></p>` : ''}
    <div class="lignes apercu">${ligneStructure(versEtablissement(c), t)}</div>
  </section>`;
}

function compte(c, t) {
  const fmt = (d) => new Date(d).toLocaleString(t.lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' });
  return html`
  <section class="pile">
    <h2 class="titre-2">${t('pro.compte.titre')}</h2>
    <dl class="fiche-compte">
      <div><dt>${t('pro.compte.email')}</dt><dd>${c.email}</dd></div>
      <div><dt>${t('pro.compte.type')}</dt><dd>${t(`pro.types.${c.type}.t`)}</dd></div>
      <div><dt>${t('pro.compte.niu')}</dt><dd class="mono">${c.niu}</dd></div>
    </dl>
    <div class="actions actions--ligne">
      ${c.etatCompte === 'DESACTIVE' ? html`<button type="button" class="bouton" data-act="reactiver">${t('pro.compte.reactiver')}</button>` : html`<button type="button" class="bouton bouton--secondaire" data-act="desactiver">${t('pro.compte.desactiver')}</button>`}
      <button type="button" class="bouton bouton--discret" data-act="deconnexion">${icone('sortie', { taille: 20 })}${t('pro.deconnexion')}</button>
    </div>
    <h3 class="titre-3">${t('pro.compte.historique')}</h3>
    <ol class="historique" role="list">
      ${(c.historique || []).map((h) => html`<li><span>${t(`pro.compte.evenements.${h.type}`, { etat: h.etat ? t(`pro.etats.${h.etat}.t`) : '', a: h.a, r: h.r })}</span><time class="note chiffres" datetime="${h.date}">${fmt(h.date)}</time></li>`)}
    </ol>
  </section>`;
}

export default {
  id: 'pro-tableau',
  titre: ({ t, params }) => t(`pro.nav.${params[0] || 'accueil'}`),
  chrome: () => ({ pro: true }),
  garde: ({ s }) => {
    const c = s.pro.session && s.pro.comptes[s.pro.session];
    if (!c) return '#/pro';
    if (c.etatCompte === 'EMAIL_NON_CONFIRME') return '#/pro/code';
    return null;
  },
  render(ctx) {
    const { t, params } = ctx;
    const c = compteCourant();
    const vue = VUES.some(([v]) => v === params[0]) ? params[0] : 'accueil';
    const stock = ongletsStock(c.type, c.fiche || {});
    const atteint = etapeAtteinte(c);
    const corps = { accueil, indicateurs, apercu, compte }[vue]?.(c, t)
      ?? (vue === 'fiche' ? vueFiche.render(ctx, c) : vue === 'services' ? vueServices.render(ctx, c) : vue === 'stock' ? vueStock.render(ctx, c) : vueTendances.render(ctx, c));
    return html`
    <div class="cadre pro">
      <section class="panneau bandeau sombre" aria-labelledby="bandeau-nom">
        <div class="bandeau__identite">
          <p class="bandeau__type">${t(`pro.types.${c.type}.t`)}${c.demo ? html` <span class="etiquette etiquette--experimental">${t('commun.fictif')}</span>` : ''}</p>
          <h1 id="bandeau-nom" class="titre bandeau__nom">${c.nom}</h1>
          <p class="note">${t('pro.connecte', { email: c.email })}</p>
        </div>
        ${cheminVerification(t, atteint)}
      </section>
      <div class="pro__corps">
        <nav class="pro__nav" aria-label="${t('pro.espace')}">
          ${VUES.filter(([v]) => (v !== 'stock' || stock.length) && (v !== 'services' || ['hopital', 'centre_sante', 'centre_specialise'].includes(c.type))).map(([v, ico]) => html`<a class="pro__lien" href="#/pro/tableau/${v}" aria-current="${v === vue ? 'page' : 'false'}">${icone(ico, { taille: 20 })}<span>${t(`pro.nav.${v}`)}</span>${v === 'tendances' && c.visibilite !== 'VERIFIE' ? icone('serrure', { taille: 16, cls: 'pro__verrou' }) : ''}</a>`)}
          <a class="pro__lien" href="#/droits">${icone('fiche', { taille: 20 })}<span>${t('droits.lien')}</span></a>
        </nav>
        <div class="pro__vue" data-cle="vue-${vue}">${corps}</div>
      </div>
    </div>`;
  },
  actions: {
    ...vueFiche.actions, ...vueStock.actions, ...vueTendances.actions,
    'verif-ok'() { const c = compteCourant(); mettreAJour(c.email, (x) => journal({ ...x, visibilite: 'VERIFIE', motifRefus: null }, 'verification', { etat: 'VERIFIE' })); },
    'verif-refus'({ t }) { const c = compteCourant(); mettreAJour(c.email, (x) => journal({ ...x, visibilite: 'REFUSE', motifRefus: t('pro.accueil.motifDemo') }, 'verification', { etat: 'REFUSE' })); },
    desactiver() { const c = compteCourant(); mettreAJour(c.email, (x) => journal({ ...x, etatCompte: 'DESACTIVE' }, 'desactivation')); },
    reactiver() { const c = compteCourant(); mettreAJour(c.email, (x) => journal({ ...x, etatCompte: 'ACTIF' }, 'reactivation')); },
    deconnexion({ go }) { fermerSession(); go('#/pro'); },
  },
};
