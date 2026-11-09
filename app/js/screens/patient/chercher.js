// Recherches explicites : un service, un médicament, du sang (sur la tuile du district de démonstration).
import { html, attr } from '../../core/dom.js';
import { local } from '../../core/store.js';
import { partage } from '../../domain/consent.js';
import { SPECIALITES, SPECIALITES_SENSIBLES, DCI, GROUPES, chercherSpecialite, chercherMedicament, chercherSang } from '../../domain/facilities.js';
import { ligneStructure, etiquette } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { panneauDecision } from '../../ui/decision.js';
import { agents } from '../../agents/nolo.js';
import { deciderRecherche, deciderSignalement } from '../../agents/parcours.js';

const ONGLETS = [['service', 'service'], ['medicament', 'pilule'], ['sang', 'goutte']];
const jour = () => new Date().toISOString().slice(0, 10);
const nomDci = (id, lang) => DCI.find((d) => d.id === id)?.[lang] || id;
/** Décision de Conformité avant la recherche (FR-1901) ; la trace alimente « Comment Nolo a décidé ». */
const gouverner = (type, sensible) => { const a = agents(); return a ? deciderRecherche(a.orchestrateur, { type, sensible }).trace : null; };
const panneau = (s, t) => panneauDecision(s.recherche.trace, t, agents()?.base);

function resume(t, res) {
  if (!res.resultats.length) return html`<p class="encart">${icone('info')}<span class="encart__corps">${t('recherche.aucun')}</span></p>`;
  return html`<p class="resume" aria-live="polite">${res.elargi ? html`<strong>${t('recherche.elargi', { km: t.km(res.rayon) })}</strong> ` : ''}${t('recherche.resultats', { n: res.resultats.length, km: t.km(res.rayon) })}</p>`;
}

function service(s, t) {
  const sp = s.recherche.specialite;
  const res = sp ? chercherSpecialite(sp) : null;
  const sensible = SPECIALITES_SENSIBLES.includes(sp);
  return html`
  <div class="champ">
    <label class="champ__etiquette" for="sp">${t('recherche.serviceQ')}</label>
    <select id="sp" class="saisie" data-change="specialite">
      <option value="">${t('recherche.choisir')}</option>
      ${[...SPECIALITES].sort((a, b) => t(`specialites.${a}`).localeCompare(t(`specialites.${b}`))).map((x) => html`<option value="${x}"${attr('selected', x === sp)}>${t(`specialites.${x}`)}</option>`)}
    </select>
  </div>
  ${res ? html`
    <p class="note">${icone(sensible ? 'serrure' : 'graphique', { taille: 16 })} ${sensible ? t('recherche.sensible') : t('recherche.compte')}</p>
    ${resume(t, res)}
    <div class="lignes">${res.resultats.map((e) => ligneStructure(e, t, { extra: html`<p class="structure__extra">${t('recherche.modalite', { sp: t(`specialites.${sp}`), m: t(`modalites.${e.specialites[sp]}`) })}</p>` }))}</div>
    ${panneau(s, t)}` : ''}`;
}

function medicament(s, t) {
  const lang = t.lang;
  const q = (s.recherche.saisie || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const dci = s.recherche.dci;
  const choix = DCI.filter((d) => !q || d[lang].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q)).slice(0, 8);
  const d = DCI.find((x) => x.id === dci);
  const res = d ? chercherMedicament(dci) : null;
  const peutSignaler = partage(s.consentement, 'signalements');
  const faits = s.recherche.signalements || [];
  return html`
  <div class="champ">
    <label class="champ__etiquette" for="dci">${t('recherche.medicamentQ')}</label>
    <p class="champ__aide" id="dci-aide">${t('recherche.medicamentAide')}</p>
    <input id="dci" class="saisie" type="search" autocomplete="off" data-input="saisie" value="${s.recherche.saisie || ''}" aria-describedby="dci-aide" aria-controls="dci-choix">
    <ul id="dci-choix" class="puces" role="list" style="margin-top:8px">${choix.map((x) => html`<li data-cle="dci-${x.id}"><button type="button" class="puce puce--suggestion ${x.id === dci ? 'est-choisi' : ''}" data-act="dci" data-id="${x.id}" aria-pressed="${x.id === dci}">${x[lang]}</button></li>`)}</ul>
  </div>
  ${res ? html`
    <p class="note">${icone(d.sensible ? 'serrure' : 'graphique', { taille: 16 })} ${d.sensible ? t('recherche.sensible') : t('recherche.compte')}</p>
    ${d.sensible ? html`<p class="encart">${icone('serrure')}<span class="encart__corps">${t('recherche.pasDeSignal')}</span></p>` : !peutSignaler ? html`<p class="encart">${icone('info')}<span class="encart__corps">${t('recherche.sansAccord')}</span></p>` : ''}
    ${resume(t, res)}
    <div class="lignes">${res.resultats.map(({ e, ligne }) => {
      const deja = faits.find((f) => f.p === e.id && f.d === dci && f.j === jour());
      return ligneStructure(e, t, { extra: html`
        <div class="structure__stock">
          <span class="niveau niveau--${ligne[0]}">${t(`recherche.niveaux.${ligne[0]}`)}</span>
          <span class="note">${t('recherche.declare', { h: ligne[1] })}</span>
          ${d.ordonnance ? etiquette('neutre', t('recherche.ordonnance')) : ''}
          <span class="note">${t('recherche.fiabilite', { n: e.fiabilite })}</span>
        </div>
        ${d.sensible || !peutSignaler ? '' : deja ? html`<p class="champ__ok">${icone('coche', { taille: 18 })}${t('recherche.merci')}</p>` : html`
        <div class="signaler"><span class="champ__etiquette">${t('recherche.signaler')}</span>
          <div class="segment"><button type="button" data-act="signaler" data-p="${e.id}" data-v="trouve" aria-pressed="false">${t('recherche.trouve')}</button><button type="button" data-act="signaler" data-p="${e.id}" data-v="absent" aria-pressed="false">${t('recherche.pasTrouve')}</button></div>
        </div>`}` });
    })}</div>
    ${panneau(s, t)}` : ''}`;
}

function sang(s, t) {
  const g = s.recherche.groupe;
  const res = g ? chercherSang(g) : null;
  return html`
  <fieldset class="pile">
    <legend class="champ__etiquette">${t('recherche.sangQ')}</legend>
    <div class="groupes">${GROUPES.map((x) => html`<button type="button" class="groupe" data-act="groupe" data-g="${x}" aria-pressed="${x === g}">${x}</button>`)}</div>
  </fieldset>
  ${res ? html`
    <p class="note">${icone('graphique', { taille: 16 })} ${t('recherche.compte')}</p>
    ${res.appelAuDon ? html`<p class="encart encart--menthe">${icone('goutte')}<span class="encart__corps">${t('recherche.appelDon')}</span></p>` : ''}
    <div class="lignes">${res.resultats.map(({ e, niveau }) => ligneStructure(e, t, { extra: html`<div class="structure__stock"><span class="niveau niveau--${niveau}">${t(`recherche.niveaux.${niveau}`)}</span></div>` }))}</div>
    ${panneau(s, t)}` : ''}`;
}

export default {
  id: 'chercher',
  titre: ({ t }) => t('recherche.titre'),
  chrome: () => ({ retour: '#/' }),
  render({ s, t, params }) {
    const onglet = ONGLETS.some(([o]) => o === params[0]) ? params[0] : 'service';
    return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <h1 class="titre">${t('recherche.titre')}</h1>
        <nav class="onglets" aria-label="${t('recherche.titre')}">
          ${ONGLETS.map(([o, ico]) => html`<a class="onglet" href="#/chercher/${o}" aria-current="${o === onglet ? 'page' : 'false'}">${icone(ico, { taille: 20 })}${t(`recherche.onglets.${o}`)}</a>`)}
        </nav>
        <div class="etiquettes">${etiquette('experimental', t('commun.fictif'))}</div>
        <p class="note">${t('commun.position')}</p>
      </section>
      <div class="surface pile">${onglet === 'service' ? service(s, t) : onglet === 'medicament' ? medicament(s, t) : sang(s, t)}</div>
    </div>`;
  },
  actions: {
    specialite({ s, set }, el) { set({ recherche: { ...s.recherche, specialite: el.value, trace: el.value ? gouverner('service', SPECIALITES_SENSIBLES.includes(el.value)) : null } }); },
    saisie({ s, set }, el) { set({ recherche: { ...s.recherche, saisie: el.value } }); },
    dci({ s, t, set }, el) { set({ recherche: { ...s.recherche, dci: el.dataset.id, saisie: nomDci(el.dataset.id, t.lang), trace: gouverner('medicament', !!DCI.find((d) => d.id === el.dataset.id)?.sensible) } }); },
    groupe({ s, set }, el) { set({ recherche: { ...s.recherche, groupe: el.dataset.g, trace: gouverner('sang', false) } }); },
    signaler({ s, t, set, annonce }, el) {
      const faits = s.recherche.signalements || [];
      const aujourdhui = faits.filter((f) => f.j === jour());
      if (aujourdhui.length >= 5) { annonce(t('recherche.limiteJour'), { ico: 'info' }); return; }
      if (aujourdhui.some((f) => f.p === el.dataset.p && f.d === s.recherche.dci)) { annonce(t('recherche.limite'), { ico: 'info' }); return; }
      const a = agents();
      if (a) deciderSignalement(a.orchestrateur, { consentements: { signalements: partage(s.consentement, 'signalements') } });
      const suivant = [...faits.filter((f) => f.j === jour()), { p: el.dataset.p, d: s.recherche.dci, j: jour(), v: el.dataset.v }];
      local.write('signalements', suivant);
      set({ recherche: { ...s.recherche, signalements: suivant } });
      annonce(t('recherche.merci'));
    },
  },
};
