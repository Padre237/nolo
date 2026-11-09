// Espace pro — « Stock » : modèle, import, rapport ligne par ligne, expiration 48 h (D-029 § 7).
import { html, attr } from '../../core/dom.js';
import { lireFichier, ongletsStock, fraicheur, MODELE_CSV, EXEMPLE_CSV, NIVEAUX_STOCK } from '../../domain/pro.js';
import { DCI, GROUPES } from '../../domain/facilities.js';
import { icone } from '../../ui/icons.js';
import { compteCourant, mettreAJour, journal } from './compte.js';
import { encadre } from '../../etat.js';

const nomDci = (id, lang) => DCI.find((d) => d.id === id)?.[lang] || id;

function telecharger(nom, texte) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + texte], { type: 'text/csv;charset=utf-8' }));
  a.download = nom; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

function importer(nom, texte, { t, set, annonce }) {
  const r = lireFichier(nom, texte);
  if (!r.ok) { set({ proImport: { erreur: r.erreur } }); return; }
  const c = compteCourant();
  const { acceptees, rejetees } = r.rapport;
  mettreAJour(c.email, (x) => journal({
    ...x,
    stock: { lignes: acceptees.map(({ id, dosage, forme, niveau }) => ({ id, dosage, forme, niveau })), envoi: new Date().toISOString() },
    dernierImport: { acceptees: acceptees.length, rejetees: rejetees.length, total: acceptees.length + rejetees.length },
  }, 'import', { a: acceptees.length, r: rejetees.length }));
  set({ proImport: { rapport: r.rapport } });
  annonce(t('pro.stock.acceptees', { n: acceptees.length }));
}

function rapport(r, t) {
  const lang = t.lang;
  return html`
  <section class="rapport" aria-labelledby="rapport-titre">
    <h3 id="rapport-titre" class="titre-3">${t('pro.stock.rapport')}</h3>
    <p class="rapport__bilan"><span class="niveau niveau--disponible">${t('pro.stock.acceptees', { n: r.acceptees.length })}</span><span class="niveau niveau--rupture">${t('pro.stock.rejetees', { n: r.rejetees.length })}</span></p>
    ${r.rejetees.length ? html`<ul class="rapport__rejets" role="list">${r.rejetees.map((l) => html`<li><span class="mono note">${t('pro.stock.ligne', { n: l.n })}</span><strong>${l.dci || '—'}</strong><span>${t(`pro.stock.motifs.${l.motif}`, { dci: l.proposition ? nomDci(l.proposition, lang) : '' })}</span></li>`)}</ul>` : ''}
  </section>`;
}

function medicaments(s, t, c) {
  const lignes = c.stock?.lignes || [];
  const f = fraicheur(c.stock?.envoi);
  const imp = s.proImport;
  return html`
  <section class="pile">
    <h2 class="titre-2">${t('pro.stock.titre')}</h2>
    <p class="chapo">${t('pro.stock.chapo')}</p>
    <div class="depot" data-cle="depot">
      <div class="actions actions--ligne">
        ${encadre ? html`<button type="button" class="bouton bouton--secondaire" data-act="copier-modele">${icone('fiche', { taille: 20 })}${t('pro.stock.copier')}</button>` : html`<button type="button" class="bouton bouton--secondaire" data-act="modele">${icone('telechargement', { taille: 20 })}${t('pro.stock.modele')}</button>`}
        <label class="bouton fichier">${icone('envoi', { taille: 20 })}${t('pro.stock.envoyer')}<input type="file" accept=".csv,text/csv,.xlsx,.pdf,image/*" data-change="fichier-stock" class="vh"></label>
      </div>
      <button type="button" class="bouton bouton--discret" data-act="exemple-stock">${t('pro.stock.exemple')}</button>
    </div>
    ${imp?.erreur ? html`<p class="champ__erreur revele" role="alert">${icone('alerte', { taille: 18 })}<span>${t(`pro.stock.erreurs.${imp.erreur}`)}</span></p>` : ''}
    ${imp?.rapport ? rapport(imp.rapport, t) : ''}

    <div class="titre-ligne">
      <h3 class="titre-3">${t('pro.nav.stock')}</h3>
      ${f ? html`<span class="etiquette ${f.expire ? 'etiquette--urgence' : f.alerte ? 'etiquette--experimental' : 'etiquette--foret'}">${icone('horloge', { taille: 14, trait: 2 })}${f.expire ? t('pro.stock.expire') : t('pro.stock.visible', { h: Math.floor(f.heures) })}</span>` : ''}
    </div>
    ${lignes.length ? html`
    <div class="registre-defile">
      <table class="registre">
        <thead><tr><th scope="col">${t('pro.stock.colonnes.dci')}</th><th scope="col">${t('pro.stock.colonnes.dosage')}</th><th scope="col">${t('pro.stock.colonnes.forme')}</th><th scope="col">${t('pro.stock.colonnes.niveau')}</th></tr></thead>
        <tbody>${lignes.map((l, i) => html`<tr data-cle="l-${l.id}-${i}">
          <th scope="row">${nomDci(l.id, t.lang)}</th><td>${l.dosage || '—'}</td><td>${t(`pro.stock.formes.${l.forme}`)}</td>
          <td><label class="vh" for="niv-${i}">${t('pro.stock.modifierNiveau', { dci: nomDci(l.id, t.lang) })}</label>
            <select id="niv-${i}" class="saisie saisie--niveau niveau-${l.niveau}" data-change="niveau" data-i="${i}">${NIVEAUX_STOCK.map((n) => html`<option value="${n}"${attr('selected', n === l.niveau)}>${t(`recherche.niveaux.${n}`)}</option>`)}</select></td>
        </tr>`)}</tbody>
      </table>
    </div>
    <button type="button" class="bouton bouton--secondaire" data-act="confirmer-stock">${icone('coche', { taille: 20 })}${t('pro.stock.confirmer')}</button>` : html`<p class="encart">${icone('info')}<span class="encart__corps">${t('pro.stock.aucun')}</span></p>`}
  </section>`;
}

function sang(s, t, c) {
  const groupes = c.type === 'centre_transfusion' ? c.fiche?.B1 || GROUPES : c.fiche?.H8a || GROUPES;
  const niv = c.stockSang?.niveaux || {};
  return html`
  <section class="pile">
    <h2 class="titre-2">${t('pro.stock.titreSang')}</h2>
    <p class="chapo">${t('pro.stock.sangChapo')}</p>
    <div class="grille-sang">${groupes.map((g) => html`
      <div class="champ" data-cle="g-${g}"><label class="champ__etiquette chiffres" for="g-${g}">${g}</label>
        <select id="g-${g}" class="saisie" data-change="niveau-sang" data-g="${g}"><option value="">—</option>${NIVEAUX_STOCK.map((n) => html`<option value="${n}"${attr('selected', niv[g] === n)}>${t(`recherche.niveaux.${n}`)}</option>`)}</select></div>`)}
    </div>
  </section>`;
}

export default {
  render({ s, t }, c) {
    const onglets = ongletsStock(c.type, c.fiche || {});
    if (!onglets.length) return html`<p class="encart">${icone('info')}<span class="encart__corps">${t('pro.stock.aucun')}</span></p>`;
    return html`${onglets.includes('medicaments') ? medicaments(s, t, c) : ''}${onglets.includes('sang') ? sang(s, t, c) : ''}`;
  },
  actions: {
    modele() { telecharger('modele-stock-medicaments.csv', MODELE_CSV); },
    'copier-modele'({ t, annonce }) { navigator.clipboard?.writeText(MODELE_CSV).then(() => annonce(t('commun.copie')), () => annonce(MODELE_CSV.split('\n')[0], { ico: 'info' })); },
    'exemple-stock'(ctx) { importer('exemple-stock.csv', EXEMPLE_CSV, ctx); },
    'fichier-stock'(ctx, el) {
      const f = el.files[0]; if (!f) return;
      if (f.size > 2 * 1024 * 1024) { ctx.set({ proImport: { erreur: 'trop_de_lignes' } }); return; }
      const ext = f.name.toLowerCase().split('.').pop();
      if (!['csv', 'txt'].includes(ext)) { const r = lireFichier(f.name, ''); ctx.set({ proImport: { erreur: r.erreur } }); el.value = ''; return; }
      f.text().then((txt) => importer(f.name, txt, ctx));
      el.value = '';
    },
    niveau(ctx, el) {
      const c = compteCourant(); const i = Number(el.dataset.i);
      mettreAJour(c.email, (x) => ({ ...x, stock: { ...x.stock, lignes: x.stock.lignes.map((l, j) => (j === i ? { ...l, niveau: el.value } : l)), envoi: new Date().toISOString() } }));
    },
    'confirmer-stock'({ t, annonce }) {
      const c = compteCourant();
      mettreAJour(c.email, (x) => journal({ ...x, stock: { ...x.stock, envoi: new Date().toISOString() } }, 'confirmationStock'));
      annonce(t('pro.stock.confirme'));
    },
    'niveau-sang'(ctx, el) {
      const c = compteCourant();
      mettreAJour(c.email, (x) => ({ ...x, stockSang: { niveaux: { ...(x.stockSang?.niveaux || {}), [el.dataset.g]: el.value }, envoi: new Date().toISOString() } }));
    },
  },
};
