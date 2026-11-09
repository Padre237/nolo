// Espace pro — inscription en 4 étapes (D-029 § 4).
import { html, attr } from '../../core/dom.js';
import { TYPES, SECTEURS, REGIONS, DISTRICTS_DEMO, erreurNiu, normaliserNiu, erreurEmail, erreurTelephone, erreurMotDePasse, codeConfirmation } from '../../domain/pro.js';
import { pastille, erreurChamp, caseACocher } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { comptes, enregistrerComptes, ouvrirSession, empreinte, journal } from './compte.js';
import { store } from '../../etat.js';

const PICTO = { officine: 'croixPharma', hopital: 'batiment', centre_sante: 'service', centre_specialise: 'cible', centre_transfusion: 'goutte' };
const vide = () => ({ etape: 0, type: null, nom: '', email: '', niu: '', telephone: '', secteur: '', region: '', district: '', quartier: '', lat: '', lon: '', precision: null, gps: null, conditions: false, tente: false });

function erreursEtape(d, etape, t, existants) {
  const e = {};
  if (etape === 0 && !d.type) e.type = t('pro.erreurs.obligatoire');
  if (etape === 1) {
    if (d.nom.trim().length < 3 || d.nom.trim().length > 120) e.nom = t('pro.erreurs.nom');
    if (erreurEmail(d.email)) e.email = t('pro.erreurs.email');
    else if (existants[d.email.trim().toLowerCase()]) e.email = t('pro.erreurs.dejaEmail');
    const n = erreurNiu(d.niu);
    if (n) e.niu = t(`pro.erreurs.niu.${n}`, { n: normaliserNiu(d.niu).slice(1, -1).replace(/\D/g, '').length });
    else if (Object.values(existants).some((c) => c.niu === normaliserNiu(d.niu))) e.niu = t('pro.erreurs.dejaNiu');
    if (erreurTelephone(d.telephone)) e.telephone = t('pro.erreurs.telephone');
    if (!d.secteur) e.secteur = t('pro.erreurs.obligatoire');
  }
  if (etape === 2) {
    const lat = Number(String(d.lat).replace(',', '.')); const lon = Number(String(d.lon).replace(',', '.'));
    if (!(lat >= 1.6 && lat <= 13.1 && lon >= 8.4 && lon <= 16.2)) e.position = t('pro.erreurs.position');
    if (!d.region) e.region = t('pro.erreurs.obligatoire');
    if (!d.district) e.district = t('pro.erreurs.obligatoire');
    if (d.quartier.trim().length < 3) e.quartier = t('pro.erreurs.obligatoire');
  }
  return e;
}

const champ = (id, label, { aide = '', erreur = '', type = 'text', valeur = '', input, extra = '', mono = false, auto = 'off', mode = '' } = {}) => html`
  <div class="champ">
    <label class="champ__etiquette" for="${id}">${label}</label>
    ${aide ? html`<p class="champ__aide" id="${id}-aide">${aide}</p>` : ''}
    <input id="${id}" class="saisie ${mono ? 'saisie--mono' : ''}" type="${type}" value="${valeur}" data-input="${input}" autocomplete="${auto}" ${mode ? html`inputmode="${mode}"` : ''} aria-invalid="${!!erreur}" aria-describedby="${aide ? `${id}-aide` : ''} ${erreur ? `${id}-err` : ''}">
    ${extra}
    ${erreurChamp(`${id}-err`, erreur)}
  </div>`;

const select = (id, label, options, valeur, input, erreur, aide = '') => html`
  <div class="champ">
    <label class="champ__etiquette" for="${id}">${label}</label>
    ${aide ? html`<p class="champ__aide">${aide}</p>` : ''}
    <select id="${id}" class="saisie" data-change="${input}" aria-invalid="${!!erreur}">
      <option value="">—</option>
      ${options.map(([v, l]) => html`<option value="${v}"${attr('selected', v === valeur)}>${l}</option>`)}
    </select>
    ${erreurChamp(`${id}-err`, erreur)}
  </div>`;

export default {
  id: 'pro-inscription',
  titre: ({ t }) => t('pro.entree.inscription'),
  chrome: () => ({ retour: '#/pro', pro: true }),
  render({ s, t }) {
    const d = s.pro.inscription || vide();
    const e = d.tente ? erreursEtape(d, d.etape, t, s.pro.comptes) : {};
    const niuEtat = d.niu ? erreurNiu(d.niu) : 'vide';
    const etapes = t.list('pro.etapes');
    let corps;
    if (d.etape === 0) corps = html`
      <fieldset class="pile"><legend class="titre-3">${t('pro.champs.type')}</legend>
        <div class="grille-choix grille-choix--2">${TYPES.map((x) => pastille({ id: `type-${x}`, name: 'type', value: x, checked: d.type === x, titre: t(`pro.types.${x}.t`), texte: t(`pro.types.${x}.d`), act: 'type', compact: false, tuile: PICTO[x] }))}</div>
        ${erreurChamp('type-err', e.type)}
      </fieldset>`;
    if (d.etape === 1) corps = html`
      ${champ('i-nom', t('pro.champs.nom'), { valeur: d.nom, input: 'nom', erreur: e.nom, auto: 'organization' })}
      ${champ('i-email', t('pro.champs.email'), { aide: t('pro.champs.emailAide'), type: 'email', valeur: d.email, input: 'email', erreur: e.email, auto: 'email' })}
      ${champ('i-niu', t('pro.champs.niu'), { aide: t('pro.champs.niuAide'), valeur: d.niu, input: 'niu', erreur: e.niu, mono: true, extra: !e.niu && niuEtat === null ? html`<p class="champ__ok">${icone('coche', { taille: 18 })}${t('pro.champs.niuOk')}</p>` : '' })}
      ${champ('i-tel', t('pro.champs.telephone'), { aide: t('pro.champs.telephoneAide'), type: 'tel', valeur: d.telephone, input: 'telephone', erreur: e.telephone, auto: 'tel', mode: 'tel' })}
      ${select('i-secteur', t('pro.champs.secteur'), SECTEURS.map((x) => [x, t(`pro.champs.secteurs.${x}`)]), d.secteur, 'secteur', e.secteur)}`;
    if (d.etape === 2) corps = html`
      <fieldset class="pile"><legend class="titre-3">${t('pro.champs.position')}</legend>
        <button type="button" class="bouton bouton--secondaire" data-act="gps">${icone('cible', { taille: 20 })}${d.gps === 'encours' ? t('pro.champs.gpsEnCours') : t('pro.champs.gps')}</button>
        ${d.precision !== null ? html`<p class="${d.precision > 50 ? 'champ__erreur' : 'champ__ok'}">${icone(d.precision > 50 ? 'alerte' : 'coche', { taille: 18 })}${t('pro.champs.precision', { m: Math.round(d.precision) })}${d.precision > 50 ? ` — ${t('pro.champs.precisionFaible')}` : ''}</p>` : ''}
        ${d.gps === 'refus' ? html`<p class="note">${t('pro.champs.gpsRefus')}</p>` : ''}
        <p class="champ__aide">${t('pro.champs.corriger')}</p>
        <div class="grille-choix grille-choix--2">
          ${champ('i-lat', t('pro.champs.lat'), { valeur: d.lat, input: 'lat', mono: true, mode: 'decimal' })}
          ${champ('i-lon', t('pro.champs.lon'), { valeur: d.lon, input: 'lon', mono: true, mode: 'decimal' })}
        </div>
        ${erreurChamp('pos-err', e.position)}
      </fieldset>
      ${select('i-region', t('pro.champs.region'), REGIONS.map((x) => [x, x]), d.region, 'region', e.region)}
      ${select('i-district', t('pro.champs.district'), DISTRICTS_DEMO.map((x) => [x, x]), d.district, 'district', e.district, t('pro.champs.districtAide'))}
      ${champ('i-quartier', t('pro.champs.quartier'), { aide: t('pro.champs.quartierAide'), valeur: d.quartier, input: 'quartier', erreur: e.quartier })}`;
    if (d.etape === 3) corps = html`
      <div class="champ"><label class="champ__etiquette" for="i-mdp">${t('pro.champs.mdp')}</label><p class="champ__aide" id="i-mdp-aide">${t('pro.champs.mdpAide')}</p><input id="i-mdp" class="saisie" type="password" autocomplete="new-password" aria-describedby="i-mdp-aide i-mdp-err" aria-invalid="${!!d.erreurMdp}">${erreurChamp('i-mdp-err', d.erreurMdp)}</div>
      <div class="champ"><label class="champ__etiquette" for="i-mdp2">${t('pro.champs.mdp2')}</label><input id="i-mdp2" class="saisie" type="password" autocomplete="new-password" aria-describedby="i-mdp2-err" aria-invalid="${!!d.erreurMdp2}">${erreurChamp('i-mdp2-err', d.erreurMdp2)}</div>
      ${caseACocher({ id: 'i-conditions', act: 'conditions', checked: d.conditions, texte: t('pro.champs.conditions') })}
      <a class="ligne-lien" href="#/conditions" target="_blank" rel="noopener">${icone('donnees')}<span>${t('pro.champs.conditionsLien')}</span>${icone('suite', { taille: 20 })}</a>
      ${erreurChamp('i-cond-err', d.erreurConditions)}`;
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <p class="note chiffres">${t('pro.etapeN', { n: d.etape + 1 })}</p>
        <h1 class="titre">${etapes[d.etape]}</h1>
        <ol class="chemin chemin--vertical" role="list" aria-label="${t('pro.etapeN', { n: d.etape + 1 })}">
          ${etapes.map((nom, i) => html`<li class="chemin__etape" data-etat="${i < d.etape ? 'fait' : i === d.etape ? 'actuel' : 'avenir'}"><span class="chemin__point" aria-hidden="true"></span><span class="chemin__nom">${nom}</span></li>`)}
        </ol>
      </section>
      <form class="surface pile" data-submit="suivant" novalidate data-cle="etape-${d.etape}">
        ${corps}
        <div class="actions actions--ligne">
          ${d.etape > 0 ? html`<button type="button" class="bouton bouton--secondaire bouton--principal" data-act="precedent">${t('pro.precedent')}</button>` : ''}
          <button type="submit" class="bouton bouton--principal">${d.etape === 3 ? t('pro.creer') : t('pro.suivant')}</button>
        </div>
      </form>
    </div>`;
  },
  actions: (() => {
    const maj = (cle, valeur) => ({ s, set }) => set({ pro: { ...s.pro, inscription: { ...(s.pro.inscription || vide()), [cle]: valeur } } });
    const texte = (cle) => (ctx, el) => maj(cle, el.value)(ctx);
    return {
      type: (ctx, el) => maj('type', el.value)(ctx),
      nom: texte('nom'), email: texte('email'), niu: texte('niu'), telephone: texte('telephone'), lat: texte('lat'), lon: texte('lon'), quartier: texte('quartier'),
      secteur: texte('secteur'), region: texte('region'), district: texte('district'),
      conditions: (ctx, el) => maj('conditions', el.checked)(ctx),
      precedent({ s, set }) { const d = s.pro.inscription || vide(); set({ pro: { ...s.pro, inscription: { ...d, etape: Math.max(0, d.etape - 1), tente: false } } }); },
      gps() {
        const ecrire = (patch) => { const p = store.get().pro; store.set({ pro: { ...p, inscription: { ...(p.inscription || vide()), ...patch } } }); };
        if (!navigator.geolocation) { ecrire({ gps: 'refus' }); return; }
        ecrire({ gps: 'encours' });
        navigator.geolocation.getCurrentPosition(
          (p) => ecrire({ gps: 'ok', lat: p.coords.latitude.toFixed(6), lon: p.coords.longitude.toFixed(6), precision: p.coords.accuracy }),
          () => ecrire({ gps: 'refus' }),
          { enableHighAccuracy: true, timeout: 8000 },
        );
      },
      async suivant({ s, t, set, go }) {
        const d = { ...(s.pro.inscription || vide()) };
        if (d.etape < 3) {
          const e = erreursEtape(d, d.etape, t, s.pro.comptes);
          if (Object.keys(e).length) { set({ pro: { ...s.pro, inscription: { ...d, tente: true } } }); requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus()); return; }
          set({ pro: { ...s.pro, inscription: { ...d, etape: d.etape + 1, tente: false } } });
          return;
        }
        const mdp = document.getElementById('i-mdp')?.value || '';
        const mdp2 = document.getElementById('i-mdp2')?.value || '';
        const em = erreurMotDePasse(mdp, { niu: d.niu, nom: d.nom });
        const erreurs = { erreurMdp: em ? t(`pro.erreurs.mdp.${em}`) : '', erreurMdp2: !em && mdp !== mdp2 ? t('pro.erreurs.differents') : '', erreurConditions: d.conditions ? '' : t('pro.erreurs.conditions') };
        if (erreurs.erreurMdp || erreurs.erreurMdp2 || erreurs.erreurConditions) { set({ pro: { ...s.pro, inscription: { ...d, ...erreurs } } }); return; }
        const email = d.email.trim().toLowerCase();
        const code = codeConfirmation();
        let compte = {
          email, type: d.type, nom: d.nom.trim(), niu: normaliserNiu(d.niu), telephone: d.telephone, secteur: d.secteur, region: d.region, district: d.district, quartier: d.quartier.trim(),
          lat: Number(String(d.lat).replace(',', '.')), lon: Number(String(d.lon).replace(',', '.')), precision: d.precision,
          mdp: await empreinte(mdp, email), etatCompte: 'EMAIL_NON_CONFIRME', visibilite: 'FICHE_INCOMPLETE', fiche: {}, photos: [], historique: [],
          code: { valeur: code, expire: Date.now() + 15 * 60000 },
        };
        compte = journal(compte, 'creation');
        const c = { ...comptes(), [email]: compte };
        enregistrerComptes(c, { inscription: null });
        ouvrirSession(email);
        go('#/pro/code');
      },
    };
  })(),
};
