// Espace ministère de la Santé (démonstration) : carte des signes, signaux, agréments, offre et demande, politique.
import { html } from '../../core/dom.js';
import { local } from '../../core/store.js';
import { store } from '../../etat.js';
import * as S from '../../domain/surveillance.js';
import { semaineIso } from '../../domain/trends.js';
import { DCI } from '../../domain/facilities.js';
import { carteRegions, legende, schemaAires, TEINTES } from '../../ui/carte.js';
import { etiquette, erreurChamp } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { comptes, mettreAJour, journal } from '../pro/compte.js';
import { cheminVerification } from '../pro/entree.js';

const VUES = [['carte', 'repere'], ['signaux', 'alerte'], ['agrements', 'bouclier'], ['offre', 'graphique'], ['politique', 'donnees']];
const etat = () => ({ session: local.read('ministere-session', false), syndrome: 'tous', semaine: 12, region: 'littoral', aire: 'AS-07', signal: null, decisions: local.read('ministere-decisions', {}), dossiers: local.read('ministere-dossiers', {}), variante: { ...S.VARIANTE_EN_VIGUEUR }, indicateur: 'insat', brouillons: {}, ...(store.get().ministere || {}) });
const maj = (patch) => store.set({ ministere: { ...etat(), ...patch } });
const nomRegion = (t) => (id) => S.REGIONS.find((r) => r.id === id)?.[t.lang] || id;
const sem = (w) => semaineIso(S.SEMAINES - w + 1);
const dateCourte = (t, d) => d.toLocaleDateString(t.lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
const nomZone = (t, x) => (x.niveau === 'aire' ? t('ministere.carte.aire', { id: x.zone }) : nomRegion(t)(x.zone));

function colonnes(t, serie, titre) {
  const max = Math.max(1, ...serie);
  return html`
  <figure class="colonnes colonnes--compact" aria-label="${titre}">
    <div class="colonnes__trace" style="--n:${serie.length}">
      ${serie.map((v, i) => {
        const p = S.publiable(v);
        return html`<div class="colonne" tabindex="0" aria-label="${t('ministere.carte.semaineN', { n: sem(i + 1).numero })} : ${p === null ? t('ministere.carte.moinsDe5') : p}" data-cle="c-${i}">
          <span class="colonne__barre ${p === null ? 'est-hachure' : ''}" style="--h:${(v / max).toFixed(3)}"></span>
          <span class="colonne__bulle chiffres" aria-hidden="true">${t('ministere.carte.semaineN', { n: sem(i + 1).numero })} : ${p === null ? t('ministere.carte.moinsDe5') : p}</span>
          <span class="colonne__nom chiffres" aria-hidden="true">${t('ministere.carte.semaineN', { n: sem(i + 1).numero })}</span>
        </div>`;
      })}
    </div>
  </figure>`;
}

// ── Carte des signes ──────────────────────────────────────────────────────
function vueCarte(t, m) {
  const sy = m.syndrome; const w = m.semaine;
  const val = (r) => (sy === 'tous' ? S.total(S.compteRegion, r, w) : S.compteRegion(r, sy, w));
  const valAire = (a) => (sy === 'tous' ? S.total(S.compteAire, a, w) : S.compteAire(a, sy, w));
  const bornes = S.BORNES_REGION[sy]; const bornesA = S.BORNES_AIRE[sy];
  const signaux = S.signaux().filter((x) => x.semaine <= w && (sy === 'tous' || x.syndrome === sy));
  const marques = new Set(signaux.map((x) => x.region));
  const aSignal = new Set(signaux.filter((x) => x.niveau === 'aire').map((x) => x.zone));
  const n5 = (n) => { const p = S.publiable(n); return p === null ? t('ministere.carte.moinsDe5') : t.num(p); };
  const valeurs = Object.fromEntries(S.REGIONS.map((r) => [r.id, { classe: S.classe(val(r.id), bornes), libelle: t('ministere.carte.contributions', { n: n5(val(r.id)) }) }]));
  const choisie = m.region;
  const sigRegion = signaux.filter((x) => x.region === choisie);
  const serie = S.serieRegion(choisie, sy);
  const s = sem(w);
  return html`
  <section class="pile ministere-carte">
    <div class="titre-ligne"><h2 class="titre-2">${t('ministere.carte.titre')}</h2>${etiquette('experimental', t('commun.fictif'))}</div>
    <p class="chapo">${t('ministere.carte.chapo')}</p>
    <div class="carte-filtres">
      <div class="segment segment--syndromes" role="group" aria-label="${t('ministere.carte.syndrome')}">
        ${['tous', ...S.SYNDROMES].map((x) => html`<button type="button" data-act="syndrome" data-s="${x}" aria-pressed="${x === sy}">${t(`ministere.syndromes.${x}`)}</button>`)}
      </div>
      <div class="champ curseur">
        <label class="champ__etiquette" for="semaine">${t('ministere.carte.semaine')} <span class="chiffres">${t('ministere.carte.semaineN', { n: s.numero })}</span> <span class="note">${t('ministere.carte.du', { date: dateCourte(t, s.lundi) })}</span></label>
        <input id="semaine" type="range" min="1" max="${S.SEMAINES}" step="1" value="${w}" data-input="semaine" data-force>
      </div>
    </div>
    <div class="carte-grille">
      <div class="carte-colonne">
        ${carteRegions({ valeurs, marques, choisie, nom: nomRegion(t), titre: t('ministere.carte.titre') })}
        ${legende({ titre: t('ministere.carte.legende'), bornes, moinsDe5: t('ministere.carte.moinsDe5'), signal: t('ministere.carte.signal'), num: t.num })}
        <p class="note">${t('ministere.carte.source')}</p>
      </div>
      <aside class="carte-panneau" aria-live="polite">
        <p class="carte-panneau__sur">${t('ministere.carte.semaineN', { n: s.numero })}, ${t(`ministere.syndromes.${sy}`).toLowerCase()}</p>
        <h3 class="titre-2">${nomRegion(t)(choisie)}</h3>
        <p class="carte-panneau__valeur chiffres">${n5(val(choisie))}</p>
        <p class="note">${t('ministere.carte.legende')}</p>
        ${sy === 'tous' ? html`<ul class="repartition" role="list">${S.SYNDROMES.map((x) => { const v = S.compteRegion(choisie, x, w); const mx = Math.max(...S.SYNDROMES.map((y) => S.compteRegion(choisie, y, w))); return html`<li><span>${t(`ministere.syndromes.${x}`)}</span><span class="repartition__barre"><span style="--l:${(v / mx).toFixed(3)}"></span></span><span class="chiffres">${n5(v)}</span></li>`; })}</ul>` : ''}
        <h4 class="titre-3">${t('ministere.carte.evolution')}</h4>
        ${colonnes(t, serie, t('ministere.carte.grapheTitre', { zone: nomRegion(t)(choisie) }))}
        ${sigRegion.length ? html`<a class="bouton bouton--secondaire" href="#/ministere/signaux">${icone('alerte', { taille: 20 })}${t('ministere.carte.signauxRegion', { n: sigRegion.length })}</a>` : html`<p class="note">${t('ministere.carte.aucunSignal')}</p>`}
      </aside>
    </div>
    ${choisie === S.DISTRICT_DEMO.region ? html`
    <section class="pile district" aria-labelledby="district-titre">
      <h3 id="district-titre" class="titre-3">${t('ministere.carte.district', { district: S.DISTRICT_DEMO.nom })}</h3>
      <div class="district-grille">
        ${schemaAires({ aires: S.AIRES, valeur: (a) => n5(valAire(a)), classe: (a) => S.classe(valAire(a), bornesA), choisie: m.aire, signalees: aSignal, libelle: (a) => `${t('ministere.carte.aire', { id: a })} : ${n5(valAire(a))}${aSignal.has(a) ? ` — ${t('ministere.carte.signal')}` : ''}` })}
        <div class="pile">
          <p class="titre-3">${t('ministere.carte.aire', { id: m.aire })}</p>
          ${colonnes(t, S.serieAire(m.aire, sy), t('ministere.carte.grapheTitre', { zone: m.aire }))}
        </div>
      </div>
      <p class="note">${t('ministere.carte.schema')}</p>
    </section>` : ''}
    <p class="note">${icone('serrure', { taille: 16 })} ${t('ministere.carte.regles')}</p>
  </section>`;
}

// ── Signaux à valider (point focal) ───────────────────────────────────────
function vueSignaux(t, m) {
  const liste = S.signaux();
  const choisi = liste.find((x) => x.id === m.signal) || liste[0];
  const d = m.decisions[choisi.id] || { statut: 'a_trier' };
  const brouillon = m.brouillons[choisi.id] || {};
  const titre = t('ministere.signaux.detailTitre', { syndrome: t(`ministere.syndromes.${choisi.syndrome}`).toLowerCase(), zone: nomZone(t, choisi) });
  const exportJson = JSON.stringify({ dataSet: 'NOLO_SURV_SYNDROMIQUE', period: `${new Date().getFullYear()}W${sem(choisi.semaine).numero}`, orgUnit: choisi.niveau === 'aire' ? choisi.zone : choisi.region, dataValues: [{ dataElement: `SYND_${choisi.syndrome.toUpperCase()}`, value: S.publiable(choisi.cas) }] }, null, 2);
  return html`
  <section class="pile">
    <div class="titre-ligne"><h2 class="titre-2">${t('ministere.signaux.titre')}</h2>${etiquette('experimental', t('commun.fictif'))}</div>
    <p class="chapo">${t('ministere.signaux.chapo')}</p>
    <p class="note">${icone('horloge', { taille: 16 })} ${t('ministere.signaux.delais')}</p>
    <div class="signaux-grille">
      <ul class="signaux" role="list">
        ${liste.map((x) => { const st = (m.decisions[x.id] || {}).statut || 'a_trier'; return html`
        <li><button type="button" class="signal ${x.id === choisi.id ? 'est-choisi' : ''}" data-act="signal" data-id="${x.id}" aria-pressed="${x.id === choisi.id}">
          <span class="signal__tete"><strong>${t(`ministere.syndromes.${x.syndrome}`)}</strong><span class="etiquette ${st === 'confirme' ? 'etiquette--foret' : st === 'rejete' ? 'etiquette--neutre' : 'etiquette--experimental'}">${t(`ministere.signaux.statuts.${st}`)}</span></span>
          <span>${nomZone(t, x)}${x.niveau === 'aire' ? `, ${S.DISTRICT_DEMO.nom}` : ''}</span>
          <span class="signal__faits note chiffres"><span>${t('ministere.carte.semaineN', { n: sem(x.semaine).numero })}</span><span>${t('ministere.signaux.cas', { n: S.publiable(x.cas) })}</span><span>${t('ministere.signaux.cusum', { v: t.num(Math.round(x.valeur * 10) / 10) })}</span></span>
        </button></li>`; })}
      </ul>
      <article class="surface pile signal-detail" aria-labelledby="signal-titre" data-cle="detail-${choisi.id}">
        <h3 id="signal-titre" class="titre-3">${titre}</h3>
        ${colonnes(t, choisi.serie, titre)}
        ${d.statut === 'a_trier' ? html`
        <div class="champ">
          <label class="champ__etiquette" for="motif">${t('ministere.signaux.motif')}</label>
          <p class="champ__aide" id="motif-aide">${t('ministere.signaux.motifAide')}</p>
          <textarea id="motif" class="saisie saisie--courte" data-input="motif" data-id="${choisi.id}" aria-describedby="motif-aide motif-err">${brouillon.motif || ''}</textarea>
          ${erreurChamp('motif-err', brouillon.erreur ? t('ministere.signaux.motifCourt') : '')}
        </div>
        <div class="actions actions--ligne">
          <button type="button" class="bouton" data-act="decider" data-id="${choisi.id}" data-statut="confirme">${t('ministere.signaux.confirmer')}</button>
          <button type="button" class="bouton bouton--secondaire" data-act="decider" data-id="${choisi.id}" data-statut="rejete">${t('ministere.signaux.rejeter')}</button>
        </div>` : html`
        <p class="encart ${d.statut === 'confirme' ? 'encart--menthe' : ''}">${icone(d.statut === 'confirme' ? 'coche' : 'croix')}<span class="encart__corps"><strong class="encart__titre">${t(`ministere.signaux.statuts.${d.statut}`)}</strong>${d.motif}<span class="note">${t('ministere.signaux.decideLe', { date: new Date(d.date).toLocaleString(t.lang === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }) })}</span></span></p>
        <button type="button" class="bouton bouton--discret" data-act="rouvrir" data-id="${choisi.id}">${t('ministere.signaux.rouvrir')}</button>`}
        ${d.statut === 'confirme' ? html`
        <section class="pile rsi" aria-labelledby="rsi-titre">
          <h4 id="rsi-titre" class="titre-3">${t('ministere.signaux.rsiTitre')}</h4>
          <p class="note">${t('ministere.signaux.rsiChapo')}</p>
          <ul class="questions" role="list">${S.RSI_QUESTIONS.map((q) => html`<li class="question"><p class="question__texte" id="rsi-${q}">${t(`ministere.signaux.rsi.${q}`)}</p><div class="segment" role="group" aria-labelledby="rsi-${q}"><button type="button" data-act="rsi" data-id="${choisi.id}" data-q="${q}" data-v="oui" aria-pressed="${(d.rsi || {})[q] === true}">${t('commun.oui')}</button><button type="button" data-act="rsi" data-id="${choisi.id}" data-q="${q}" data-v="non" aria-pressed="${(d.rsi || {})[q] === false}">${t('commun.non')}</button></div></li>`)}</ul>
          ${Object.keys(d.rsi || {}).length === 4 ? html`<p class="encart ${S.decisionRsi(d.rsi) ? 'encart--experimental' : 'encart--menthe'} revele">${icone('info')}<span class="encart__corps">${S.decisionRsi(d.rsi) ? t('ministere.signaux.rsiOui') : t('ministere.signaux.rsiNon')}</span></p>` : ''}
          <details class="table-donnees"><summary>${t('ministere.signaux.export')}</summary><pre class="code mono">${exportJson}</pre><button type="button" class="bouton bouton--secondaire" data-act="copier-export" data-id="${choisi.id}">${t('ministere.signaux.copier')}</button></details>
        </section>` : ''}
        <div class="pile">
          <button type="button" class="bouton bouton--discret" data-act="localisation">${icone('repere', { taille: 20 })}${t('ministere.signaux.localisation')}</button>
          ${m.refusLocalisation ? html`<p class="encart encart--urgence revele" role="alert">${icone('bouclier')}<span class="encart__corps">${t('ministere.signaux.refusLocalisation')}</span></p>` : ''}
        </div>
      </article>
    </div>
  </section>`;
}

// ── Agréments ─────────────────────────────────────────────────────────────
const DOSSIERS_FICTIFS = [
  { id: 'D-1', nom: 'Clinique La Grâce', type: 'hopital', niu: 'P501236987412K', autorisation: 'AE-2021-0144', district: 'District de démonstration Sud', jours: 2 },
  { id: 'D-2', nom: 'Pharmacie du Rond-Point', type: 'officine', niu: 'M777120045639T', autorisation: 'AO-2024-0310', district: 'District de démonstration Nord', jours: 1 },
  { id: 'D-3', nom: 'Centre d’hémodialyse de l’Espérance', type: 'centre_specialise', niu: 'C904512378560R', autorisation: '—', district: 'District de démonstration Nord', jours: 4 },
];
function vueAgrements(t, m) {
  const locaux = Object.values(comptes()).filter((c) => c.etatCompte !== 'EMAIL_NON_CONFIRME');
  const attente = [
    ...locaux.filter((c) => c.visibilite === 'EN_ATTENTE_VERIFICATION').map((c) => ({ id: c.email, nom: c.nom, type: c.type, niu: c.niu, autorisation: c.fiche?.O1 || c.fiche?.H11 || c.fiche?.S5 || c.fiche?.B7 || '—', district: c.district, local: true })),
    ...DOSSIERS_FICTIFS.filter((d) => !m.dossiers[d.id]),
  ];
  const verifies = [
    ...locaux.filter((c) => c.visibilite === 'VERIFIE' || c.etatCompte === 'SUSPENDU').map((c) => ({ id: c.email, nom: c.nom, type: c.type, niu: c.niu, suspendu: c.etatCompte === 'SUSPENDU', local: true })),
    ...DOSSIERS_FICTIFS.filter((d) => m.dossiers[d.id]?.statut === 'VERIFIE').map((d) => ({ ...d, suspendu: m.dossiers[d.id]?.suspendu })),
  ];
  const b = m.brouillons.agrement || {};
  return html`
  <section class="pile">
    <div class="titre-ligne"><h2 class="titre-2">${t('ministere.agrements.titre')}</h2>${etiquette('experimental', t('commun.fictif'))}</div>
    <p class="chapo">${t('ministere.agrements.chapo')}</p>
    ${cheminVerification(t, 2)}
    <h3 class="titre-3">${t('ministere.agrements.enAttente')} <span class="etiquette etiquette--neutre chiffres">${attente.length}</span></h3>
    ${attente.length ? html`<ul class="dossiers" role="list">${attente.map((d) => html`
      <li class="dossier" data-cle="d-${d.id}">
        <div class="dossier__tete"><strong>${d.nom}</strong><span class="note">${t(`pro.types.${d.type}.t`)}</span></div>
        <p class="dossier__faits note"><span class="mono">${d.niu}</span><span>${t('ministere.agrements.autorisation', { r: d.autorisation })}</span><span>${d.district}</span></p>
        <div class="champ"><label class="vh" for="m-${d.id}">${t('ministere.signaux.motif')}</label><input id="m-${d.id}" class="saisie" placeholder="${t('ministere.agrements.motifRefus')}" data-input="motif-agrement" data-id="${d.id}" value="${b.id === d.id ? b.motif || '' : ''}">${erreurChamp(`m-${d.id}-err`, b.id === d.id && b.erreur ? t('ministere.signaux.motifCourt') : '')}</div>
        <div class="actions actions--ligne"><button type="button" class="bouton" data-act="agreer" data-id="${d.id}" data-local="${!!d.local}">${t('ministere.agrements.valider')}</button><button type="button" class="bouton bouton--secondaire" data-act="refuser" data-id="${d.id}" data-local="${!!d.local}">${t('ministere.agrements.refuser')}</button></div>
      </li>`)}</ul>` : html`<p class="encart">${icone('coche')}<span class="encart__corps">${t('ministere.agrements.aucun')}</span></p>`}
    <h3 class="titre-3">${t('ministere.agrements.verifies')}</h3>
    <div class="lignes">${verifies.map((d) => html`<div class="verifie" data-cle="v-${d.id}"><div><strong>${d.nom}</strong><p class="dossier__faits note"><span>${t(`pro.types.${d.type}.t`)}</span><span class="mono">${d.niu}</span>${d.suspendu ? html`<strong>${t('ministere.agrements.suspendu')}</strong>` : ''}</p></div><button type="button" class="bouton bouton--secondaire" data-act="suspendre" data-id="${d.id}" data-local="${!!d.local}">${d.suspendu ? t('ministere.agrements.reactiver') : t('ministere.agrements.suspendre')}</button></div>`)}</div>
    <p class="note">${icone('info', { taille: 16 })} ${t('ministere.agrements.lacune')}</p>
  </section>`;
}

// ── Offre et demande ──────────────────────────────────────────────────────
const BORNES_IND = { insat: [0.06, 0.09, 0.12, 0.15], rupture: [0.07, 0.1, 0.13, 0.16], fraicheur: [0.55, 0.65, 0.75, 0.85], verifiees: [40, 70, 100, 130] };
function vueOffre(t, m) {
  const d = S.offreDemande();
  const ind = m.indicateur;
  const fmt = (k, v) => (k === 'verifiees' ? t.num(v) : `${Math.round(v * 100)} %`);
  const valeurs = Object.fromEntries(d.map((x) => { const v = x[ind]; let c = 0; for (const b of BORNES_IND[ind]) if (v >= b) c += 1; return [x.region, { classe: Math.min(4, c), libelle: `${t(`ministere.offre.indicateurs.${ind}`)} : ${fmt(ind, v)}` }]; }));
  const nomDci = (id) => DCI.find((x) => x.id === id)?.[t.lang] || (id === 'insuline' ? (t.lang === 'fr' ? 'Insuline' : 'Insulin') : id);
  return html`
  <section class="pile">
    <div class="titre-ligne"><h2 class="titre-2">${t('ministere.offre.titre')}</h2>${etiquette('experimental', t('commun.fictif'))}</div>
    <p class="chapo">${t('ministere.offre.chapo')}</p>
    <div class="segment segment--syndromes" role="group" aria-label="${t('ministere.offre.indicateur')}">${Object.keys(BORNES_IND).map((k) => html`<button type="button" data-act="indicateur" data-k="${k}" aria-pressed="${k === ind}">${t(`ministere.offre.indicateurs.${k}`)}</button>`)}</div>
    <div class="carte-grille carte-grille--offre">
      <div class="carte-colonne">${carteRegions({ valeurs, choisie: m.region, nom: nomRegion(t), titre: t('ministere.offre.titre'), act: 'region' })}
        <div class="legende"><p class="legende__titre">${t(`ministere.offre.indicateurs.${ind}`)}</p><ul class="legende__liste" role="list">${TEINTES.map((c, i) => html`<li><span class="legende__case" style="background:${c}"></span><span class="chiffres">${i === 0 ? `< ${fmt(ind, BORNES_IND[ind][0])}` : `≥ ${fmt(ind, BORNES_IND[ind][i - 1])}`}</span></li>`)}</ul></div>
      </div>
      <div class="registre-defile">
        <table class="registre">
          <thead><tr><th scope="col">${t('ministere.offre.colonnes.region')}</th><th scope="col">${t('ministere.offre.colonnes.verifiees')}</th><th scope="col">${t('ministere.offre.colonnes.fraicheur')}</th><th scope="col">${t('ministere.offre.colonnes.rupture')}</th><th scope="col">${t('ministere.offre.colonnes.insat')}</th><th scope="col">${t('ministere.offre.colonnes.manque')}</th></tr></thead>
          <tbody>${[...d].sort((a, b) => b.insat - a.insat).map((x) => html`<tr class="${x.region === m.region ? 'est-choisie' : ''}"><th scope="row">${nomRegion(t)(x.region)}</th><td class="chiffres">${t.num(x.verifiees)} / ${t.num(x.structures)}</td><td class="chiffres">${fmt('fraicheur', x.fraicheur)}</td><td class="chiffres">${fmt('rupture', x.rupture)}</td><td class="chiffres"><strong>${fmt('insat', x.insat)}</strong></td><td>${nomDci(x.manque)}</td></tr>`)}</tbody>
        </table>
      </div>
    </div>
    <p class="note">${icone('info', { taille: 16 })} ${t('ministere.offre.note')}</p>
  </section>`;
}

// ── Politique, lacunes, « et si » ─────────────────────────────────────────
let empreinte = null;
const calculerEmpreinte = async () => {
  try {
    const octets = new TextEncoder().encode(JSON.stringify(S.POLITIQUE));
    const h = await crypto.subtle.digest('SHA-256', octets);
    empreinte = [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch { empreinte = '—'; }
  maj({});
};
function mesure(t, r) {
  return {
    publiees: t.num(r.publiees), fines: t.num(r.fines),
    detection: r.detection ? t('ministere.politique.jours', { n: r.detection.jours }) : t('ministere.politique.nonDetecte'),
    fonctions: r.fonctions.length ? r.fonctions.map((f) => t(`ministere.politique.fonctionsNoms.${f}`)).join(', ') : t('ministere.politique.aucune'),
  };
}
function vuePolitique(t, m) {
  if (empreinte === null) calculerEmpreinte();
  const v = m.variante;
  const A = S.simuler(S.VARIANTE_EN_VIGUEUR); const B = S.simuler(v);
  const a = mesure(t, A); const b = mesure(t, B);
  const differe = (k) => a[k] !== b[k];
  return html`
  <section class="pile">
    <h2 class="titre-2">${t('ministere.politique.titre')}</h2>
    <p class="chapo">${t('ministere.politique.chapo')}</p>
    <div class="deux-temps deux-temps--egal politique">
      <section class="pile">
        <h3 class="titre-3">${t('ministere.politique.enVigueur')}</h3>
        <p class="note">${t('ministere.politique.version', { v: S.POLITIQUE.version })}. ${t('ministere.politique.empreinte')} : <span class="mono empreinte">${empreinte ? empreinte.slice(0, 16) + '…' : t('ministere.politique.calcul')}</span></p>
        <pre class="code mono">${JSON.stringify(S.POLITIQUE, null, 2)}</pre>
      </section>
      <section class="pile" aria-labelledby="sim-titre">
        <h3 id="sim-titre" class="titre-3">${t('ministere.politique.simTitre')}</h3>
        <p class="note">${t('ministere.politique.simChapo')}</p>
        <div class="parametres">
          <div class="parametre"><p class="champ__etiquette" id="p-seuil">${t('ministere.politique.parametres.seuil')}</p><div class="segment" role="group" aria-labelledby="p-seuil">${[3, 5, 10].map((x) => html`<button type="button" data-act="variante" data-k="seuil" data-v="${x}" aria-pressed="${v.seuil === x}">${x}</button>`)}</div></div>
          <div class="parametre"><p class="champ__etiquette" id="p-dec">${t('ministere.politique.parametres.decalage')}</p><div class="segment" role="group" aria-labelledby="p-dec">${[0, 7, 14].map((x) => html`<button type="button" data-act="variante" data-k="decalage" data-v="${x}" aria-pressed="${v.decalage === x}">${t('ministere.politique.jours', { n: x })}</button>`)}</div></div>
          <div class="parametre"><p class="champ__etiquette" id="p-maille">${t('ministere.politique.parametres.maille')}</p><div class="segment" role="group" aria-labelledby="p-maille">${['aire', 'district'].map((x) => html`<button type="button" data-act="variante" data-k="maille" data-v="${x}" aria-pressed="${v.maille === x}">${t(`ministere.politique.mailles.${x}`)}</button>`)}</div></div>
          <div class="parametre"><p class="champ__etiquette" id="p-apdp">${t('ministere.politique.parametres.apdp')}</p><div class="segment" role="group" aria-labelledby="p-apdp">${[true, false].map((x) => html`<button type="button" data-act="variante" data-k="apdp" data-v="${x}" aria-pressed="${v.apdp === x}">${x ? t('commun.oui') : t('commun.non')}</button>`)}</div></div>
          <div class="parametre"><p class="champ__etiquette" id="p-der">${t('ministere.politique.parametres.derogation')}</p><div class="segment" role="group" aria-labelledby="p-der">${[true, false].map((x) => html`<button type="button" data-act="variante" data-k="derogation" data-v="${x}" aria-pressed="${v.derogation === x}">${x ? t('commun.oui') : t('commun.non')}</button>`)}</div></div>
        </div>
        <div class="registre-defile">
          <table class="registre comparaison">
            <thead><tr><th scope="col"></th><th scope="col">${t('ministere.politique.A')}</th><th scope="col">${t('ministere.politique.B')}</th></tr></thead>
            <tbody>${['publiees', 'fines', 'detection', 'fonctions'].map((k) => html`<tr class="${differe(k) ? 'est-different' : ''}"><th scope="row">${t(`ministere.politique.mesures.${k}`)}</th><td class="chiffres">${a[k]}</td><td class="chiffres">${b[k]}</td></tr>`)}</tbody>
          </table>
        </div>
        ${B.fines > 0 ? html`<p class="encart encart--urgence revele">${icone('alerte')}<span class="encart__corps">${t('ministere.politique.risque')}</span></p>` : ''}
        ${B.detection && A.detection && B.detection.jours > A.detection.jours ? html`<p class="encart encart--experimental revele">${icone('horloge')}<span class="encart__corps">${t('ministere.politique.retard')}</span></p>` : ''}
        <button type="button" class="bouton bouton--discret" data-act="reinitialiser">${t('ministere.politique.reinitialiser')}</button>
      </section>
    </div>
    <section class="pile" aria-labelledby="lacunes-titre">
      <h3 id="lacunes-titre" class="titre-3">${t('ministere.politique.lacunesTitre')}</h3>
      <ol class="lacunes" role="list">${t.list('ministere.politique.lacunes').map((l) => html`<li><span class="lacunes__id mono">${l.id}</span><div><strong>${l.t}</strong><p class="note">${l.p}</p></div></li>`)}</ol>
    </section>
  </section>`;
}

export default {
  id: 'ministere',
  titre: ({ t, params }) => (store.get().ministere?.session ? t(`ministere.nav.${params[0] || 'carte'}`) : t('ministere.espace')),
  chrome: () => ({ retour: '#/', pro: false }),
  render({ s, t, params }) {
    const m = etat();
    if (!m.session) return html`
    <div class="cadre deux-temps">
      <section class="recit">
        <h1 class="titre">${t('ministere.entree.titre')}</h1>
        <p class="chapo">${t('ministere.entree.chapo')}</p>
        ${etiquette('experimental', t('commun.fictif'))}
      </section>
      <div class="surface pile">
        <ul class="lignes lignes--info" role="list">${t.list('ministere.entree.roles').map((r, i) => html`<li>${icone(['alerte', 'bouclier', 'donnees'][i])}<div><strong>${r.t}</strong><p>${r.d}</p></div></li>`)}</ul>
        <button type="button" class="bouton bouton--principal" data-act="ouvrir">${icone('serrure', { taille: 20 })}${t('ministere.entree.ouvrir')}</button>
      </div>
    </div>`;
    const vue = VUES.some(([v]) => v === params[0]) ? params[0] : 'carte';
    const corps = { carte: vueCarte, signaux: vueSignaux, agrements: vueAgrements, offre: vueOffre, politique: vuePolitique }[vue](t, m);
    const aTrier = S.signaux().filter((x) => !m.decisions[x.id]).length;
    return html`
    <div class="cadre pro ministere">
      <section class="panneau panneau--nuit bandeau sombre" aria-labelledby="min-titre">
        <div class="bandeau__identite">
          <p class="bandeau__type">${t('ministere.sous')} <span class="etiquette etiquette--experimental">${t('commun.fictif')}</span></p>
          <h1 id="min-titre" class="titre bandeau__nom">${t('ministere.espace')}</h1>
        </div>
        <dl class="bandeau__chiffres">
          <div><dt>${t('ministere.nav.signaux')}</dt><dd class="chiffres">${aTrier}</dd></div>
          <div><dt>${t('ministere.carte.semaine')}</dt><dd class="chiffres">${t('ministere.carte.semaineN', { n: sem(S.SEMAINES).numero })}</dd></div>
        </dl>
      </section>
      <div class="pro__corps">
        <nav class="pro__nav" aria-label="${t('ministere.espace')}">
          ${VUES.map(([v, ico]) => html`<a class="pro__lien" href="#/ministere/${v}" aria-current="${v === vue ? 'page' : 'false'}">${icone(ico, { taille: 20 })}<span>${t(`ministere.nav.${v}`)}</span>${v === 'signaux' && aTrier ? html`<span class="pastille-compte chiffres">${aTrier}</span>` : ''}</a>`)}
          <button type="button" class="pro__lien" data-act="quitter">${icone('sortie', { taille: 20 })}<span>${t('ministere.quitter')}</span></button>
        </nav>
        <div class="pro__vue" data-cle="mvue-${vue}">${corps}</div>
      </div>
    </div>`;
  },
  actions: {
    ouvrir() { local.write('ministere-session', true); maj({ session: true }); },
    quitter({ go }) { local.remove('ministere-session'); maj({ session: false }); go('#/ministere'); },
    syndrome(ctx, el) { maj({ syndrome: el.dataset.s }); },
    semaine(ctx, el) { maj({ semaine: Number(el.value) }); },
    region(ctx, el) { maj({ region: el.dataset.r }); },
    aire(ctx, el) { maj({ aire: el.dataset.a }); },
    signal(ctx, el) { maj({ signal: el.dataset.id, refusLocalisation: false }); },
    motif(ctx, el) { const m = etat(); maj({ brouillons: { ...m.brouillons, [el.dataset.id]: { motif: el.value } } }); },
    decider(ctx, el) {
      const m = etat(); const id = el.dataset.id; const motif = (m.brouillons[id]?.motif || '').trim();
      if (motif.length < 10) { maj({ brouillons: { ...m.brouillons, [id]: { motif, erreur: true } } }); return; }
      const decisions = { ...m.decisions, [id]: { statut: el.dataset.statut, motif, date: new Date().toISOString(), rsi: {} } };
      local.write('ministere-decisions', decisions);
      maj({ decisions, brouillons: { ...m.brouillons, [id]: {} } });
    },
    rouvrir(ctx, el) { const m = etat(); const decisions = { ...m.decisions }; delete decisions[el.dataset.id]; local.write('ministere-decisions', decisions); maj({ decisions }); },
    rsi(ctx, el) {
      const m = etat(); const id = el.dataset.id; const d = m.decisions[id];
      const decisions = { ...m.decisions, [id]: { ...d, rsi: { ...(d.rsi || {}), [el.dataset.q]: el.dataset.v === 'oui' } } };
      local.write('ministere-decisions', decisions); maj({ decisions });
    },
    'copier-export'({ t, annonce }) { const txt = document.querySelector('.rsi pre')?.textContent || ''; navigator.clipboard?.writeText(txt).then(() => annonce(t('commun.copie')), () => {}); },
    localisation() { maj({ refusLocalisation: true }); },
    'motif-agrement'(ctx, el) { maj({ brouillons: { ...etat().brouillons, agrement: { id: el.dataset.id, motif: el.value } } }); },
    agreer({ t, annonce }, el) {
      const m = etat(); const id = el.dataset.id;
      if (el.dataset.local === 'true') mettreAJour(id, (x) => journal({ ...x, visibilite: 'VERIFIE', motifRefus: null }, 'verification', { etat: 'VERIFIE' }));
      else { const dossiers = { ...m.dossiers, [id]: { statut: 'VERIFIE' } }; local.write('ministere-dossiers', dossiers); maj({ dossiers }); }
      annonce(t('ministere.agrements.fait'));
    },
    refuser({ t, annonce }, el) {
      const m = etat(); const id = el.dataset.id; const b = m.brouillons.agrement || {};
      const motif = b.id === id ? (b.motif || '').trim() : '';
      if (motif.length < 10) { maj({ brouillons: { ...m.brouillons, agrement: { id, motif, erreur: true } } }); return; }
      if (el.dataset.local === 'true') mettreAJour(id, (x) => journal({ ...x, visibilite: 'REFUSE', motifRefus: motif }, 'verification', { etat: 'REFUSE' }));
      else { const dossiers = { ...m.dossiers, [id]: { statut: 'REFUSE', motif } }; local.write('ministere-dossiers', dossiers); maj({ dossiers }); }
      maj({ brouillons: { ...etat().brouillons, agrement: {} } });
      annonce(t('ministere.agrements.fait'));
    },
    suspendre({ t, annonce }, el) {
      const m = etat(); const id = el.dataset.id;
      if (el.dataset.local === 'true') mettreAJour(id, (x) => ({ ...x, etatCompte: x.etatCompte === 'SUSPENDU' ? 'ACTIF' : 'SUSPENDU' }));
      else { const d = m.dossiers[id] || {}; const dossiers = { ...m.dossiers, [id]: { ...d, suspendu: !d.suspendu } }; local.write('ministere-dossiers', dossiers); maj({ dossiers }); }
      annonce(t('ministere.agrements.fait'));
    },
    indicateur(ctx, el) { maj({ indicateur: el.dataset.k }); },
    variante(ctx, el) {
      const k = el.dataset.k; const brut = el.dataset.v;
      const v = k === 'maille' ? brut : brut === 'true' ? true : brut === 'false' ? false : Number(brut);
      maj({ variante: { ...etat().variante, [k]: v } });
    },
    reinitialiser() { maj({ variante: { ...S.VARIANTE_EN_VIGUEUR } }); },
  },
};

export const sessionMinistere = () => local.read('ministere-session', false);
