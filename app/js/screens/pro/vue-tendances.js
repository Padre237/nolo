// Espace pro — « Tendances de la demande » (D-032) : classements, demande non satisfaite, évolution hebdomadaire.
import { html, attr } from '../../core/dom.js';
import { ZONES, SERVICES, tendances, semaineIso } from '../../domain/trends.js';
import { DCI } from '../../domain/facilities.js';
import { etiquette } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';

const defaut = () => ({ niveau: 'arrondissement', zone: 'Douala V', type: 'medicament', semaines: 12, service: null });
const nomService = (type, id, t) => (type === 'medicament' ? DCI.find((d) => d.id === id)?.[t.lang] || id : type === 'specialite' ? t(`specialites.${id}`) : id);

function zonesPour(niveau) {
  if (niveau === 'national') return [['Cameroun', 'Cameroun']];
  if (niveau === 'region') return Object.keys(ZONES).map((r) => [r, r]);
  if (niveau === 'departement') return Object.values(ZONES).flatMap((d) => Object.keys(d)).map((d) => [d, d]);
  return Object.values(ZONES).flatMap((d) => Object.values(d).flat()).map((a) => [a, a]);
}

const filtre = (id, label, options, valeur, act) => html`
  <div class="champ filtre"><label class="champ__etiquette" for="${id}">${label}</label>
    <select id="${id}" class="saisie" data-change="${act}">${options.map(([v, l]) => html`<option value="${v}"${attr('selected', String(v) === String(valeur))}>${l}</option>`)}</select></div>`;

export default {
  render({ s, t }, c) {
    if (c.visibilite !== 'VERIFIE') return html`<p class="encart">${icone('serrure')}<span class="encart__corps">${t('pro.tendances.reserve')}</span></p>`;
    const f = { ...defaut(), ...(s.proTend || {}) };
    const r = tendances(f);
    const max = Math.max(1, ...r.classement.map((x) => x.total));
    const n5 = (v) => (v === null ? t('pro.tendances.moinsDe5') : t.num(v));
    const debut = r.serie[0]; const fin = r.serie[r.serie.length - 1];
    const numSem = (w) => semaineIso(12 - w + 1).numero;
    const maxSerie = Math.max(1, ...r.serie.map((x) => x.valeur));
    const pct = Math.round(Math.abs(r.variation) * 100);
    return html`
    <section class="pile tendances">
      <div class="titre-ligne"><h2 class="titre-2">${t('pro.tendances.titre')}</h2>${etiquette('experimental', t('commun.fictif'))}</div>
      <p class="chapo">${t('pro.tendances.chapo')}</p>
      <div class="filtres">
        ${filtre('tf-niveau', t('pro.tendances.niveau'), ['national', 'region', 'departement', 'arrondissement'].map((n) => [n, t(`pro.tendances.niveaux.${n}`)]), f.niveau, 'tend-niveau')}
        ${filtre('tf-zone', t('pro.tendances.zone'), zonesPour(f.niveau), f.zone, 'tend-zone')}
        ${filtre('tf-type', t('pro.tendances.type'), Object.keys(SERVICES).map((x) => [x, t(`pro.tendances.types.${x}`)]), f.type, 'tend-type')}
        ${filtre('tf-periode', t('pro.tendances.periode'), [4, 8, 12].map((n) => [n, t('pro.tendances.semaines', { n })]), f.semaines, 'tend-periode')}
      </div>

      <div class="deux-temps deux-temps--egal tendances__listes">
        <section aria-labelledby="plus-titre" class="pile">
          <h3 id="plus-titre" class="titre-3">${t('pro.tendances.plus')}</h3>
          <ol class="classement" role="list">
            ${r.classement.map((x, i) => html`
            <li data-cle="cl-${x.service}">
              <button type="button" class="classement__ligne" data-act="tend-service" data-s="${x.service}" aria-pressed="${x.service === r.service}" aria-label="${t('pro.tendances.choisirService', { s: nomService(f.type, x.service, t) })} — ${t('pro.tendances.recherches', { n: n5(x.affiche) })}">
                <span class="classement__rang chiffres">${i + 1}</span>
                <span class="classement__nom">${nomService(f.type, x.service, t)}</span>
                <span class="classement__barre" aria-hidden="true"><span style="--l:${(x.total / max).toFixed(3)}"></span></span>
                <span class="classement__valeur chiffres">${n5(x.affiche)}</span>
              </button>
            </li>`)}
          </ol>
        </section>
        <section aria-labelledby="insat-titre" class="pile">
          <h3 id="insat-titre" class="titre-3">${t('pro.tendances.nonSat')}</h3>
          <p class="note">${t('pro.tendances.nonSatNote')} ${t('pro.tendances.partNote')}</p>
          <ol class="classement classement--insat" role="list">
            ${r.insatisfaits.slice(0, 6).map((x) => html`
            <li data-cle="in-${x.service}" class="classement__ligne classement__ligne--fixe">
              <span class="classement__nom">${nomService(f.type, x.service, t)}</span>
              <span class="classement__barre" aria-hidden="true"><span style="--l:${x.part.toFixed(3)}"></span></span>
              <span class="classement__valeur chiffres">${Math.round(x.part * 100)} %</span>
            </li>`)}
          </ol>
        </section>
      </div>

      <section class="pile" aria-labelledby="evol-titre">
        <div class="titre-ligne">
          <h3 id="evol-titre" class="titre-3">${t('pro.tendances.evolution')} : ${nomService(f.type, r.service, t)}</h3>
          <span class="etiquette etiquette--neutre">${icone(r.tendance === 'hausse' ? 'haut' : r.tendance === 'baisse' ? 'bas' : 'moins', { taille: 14, trait: 2 })}${r.tendance === 'stable' ? t('pro.tendances.stable') : t(`pro.tendances.${r.tendance}`, { p: pct })}</span>
        </div>
        <figure class="colonnes" aria-label="${t('pro.tendances.graphique', { s: nomService(f.type, r.service, t), a: numSem(debut.semaine), b: numSem(fin.semaine) })}">
          <div class="colonnes__trace" style="--n:${r.serie.length}">
            ${r.serie.map((x) => html`
            <div class="colonne" tabindex="0" data-cle="w-${x.semaine}" aria-label="${t('pro.tendances.semaine', { n: numSem(x.semaine) })} : ${t('pro.tendances.recherches', { n: n5(x.affiche) })}">
              <span class="colonne__barre ${x.affiche === null ? 'est-hachure' : ''}" style="--h:${(x.valeur / maxSerie).toFixed(3)}"></span>
              <span class="colonne__bulle chiffres" aria-hidden="true">${t('pro.tendances.semaine', { n: numSem(x.semaine) })} : ${n5(x.affiche)}</span>
              <span class="colonne__nom chiffres" aria-hidden="true">${t('pro.tendances.semaine', { n: numSem(x.semaine) })}</span>
            </div>`)}
          </div>
        </figure>
        <details class="table-donnees"><summary>${t('pro.tendances.tableau')}</summary>
          <table class="registre"><thead><tr><th scope="col">${t('pro.tendances.colSemaine')}</th><th scope="col">${t('pro.tendances.colRecherches')}</th></tr></thead>
          <tbody>${r.serie.map((x) => html`<tr><th scope="row" class="chiffres">${t('pro.tendances.semaine', { n: numSem(x.semaine) })}</th><td class="chiffres">${n5(x.affiche)}</td></tr>`)}</tbody></table>
        </details>
      </section>
      <p class="note">${icone('info', { taille: 16 })} ${t('pro.tendances.regles')}</p>
      <p class="note">${t('pro.tendances.pointFocal')}</p>
    </section>`;
  },
  actions: {
    'tend-niveau'({ s, set }, el) { const f = { ...defaut(), ...(s.proTend || {}) }; set({ proTend: { ...f, niveau: el.value, zone: zonesPour(el.value)[0][0], service: null } }); },
    'tend-zone'({ s, set }, el) { set({ proTend: { ...defaut(), ...(s.proTend || {}), zone: el.value } }); },
    'tend-type'({ s, set }, el) { set({ proTend: { ...defaut(), ...(s.proTend || {}), type: el.value, service: null } }); },
    'tend-periode'({ s, set }, el) { set({ proTend: { ...defaut(), ...(s.proTend || {}), semaines: Number(el.value) } }); },
    'tend-service'({ s, set }, el) { set({ proTend: { ...defaut(), ...(s.proTend || {}), service: el.dataset.s } }); },
  },
};
