// Espace pro — « Services et urgences » : le tableau d'orientation que voient les citoyens (D-029 § 8).
import { html } from '../../core/dom.js';
import { icone } from '../../ui/icons.js';

const listeJours = (t, j) => (j || []).map((d) => t(`pro.fiche.options.${d}`).toLowerCase()).join(', ');

function lignes(c, t) {
  const r = c.fiche || {};
  const L = [];
  if (c.type === 'centre_specialise') {
    if (r.S1) L.push({ ico: 'cible', titre: t(`categories.specialise_${r.S1}`), detail: (r.S2 || []).map((x) => t(`pro.fiche.options.${x}`)).join(', ') });
    L.push({ ico: 'horloge', titre: r.S3 ? t('pro.services.rdv') : t('pro.services.sansRdv'), detail: r.S4 ? t('pro.services.reference') : t('pro.services.sansReference') });
    return L;
  }
  if (r.H2) L.push({ ico: 'alerte', titre: t('pro.services.urgences'), detail: [r.H2a ? t('pro.services.adultesEnfants') : t('pro.services.adultes'), r.H2b ? t('pro.services.ambulance') : ''].filter(Boolean).join(', '), fort: true });
  for (const [sp, x] of Object.entries(r.H3 || {})) {
    L.push({ ico: 'service', titre: t(`specialites.${sp}`), detail: x.m === 'tous' ? t('modalites.tous') : `${t(`modalites.${x.m}`)} : ${listeJours(t, x.j)}` });
  }
  if (r.H4) L.push({ ico: 'enfant', titre: t('pro.services.maternite'), detail: [r.H4a && t('pro.services.accouchements24'), r.H4b && t('pro.services.cesarienne'), r.H4c && t('pro.services.neonat')].filter(Boolean).join(', ') });
  if (r.H6) L.push({ ico: 'batiment', titre: t('pro.services.bloc'), detail: r.H6a ? t('pro.services.chirurgie24') : '' });
  const img = (r.H7 || []).filter((x) => x !== 'aucune');
  if (img.length) L.push({ ico: 'oeil', titre: t('pro.services.imagerie'), detail: img.map((x) => t(`structure.imagerieNoms.${x}`)).join(', ') });
  if (r.H9) L.push({ ico: 'recherche', titre: t('pro.services.laboratoire'), detail: r.H9a ? t('pro.services.h24') : '' });
  if (r.H5) L.push({ ico: 'fiche', titre: t('pro.services.hospitalisation'), detail: r.H5a ? t('pro.services.lits', { n: t(`pro.fiche.options.${r.H5a}`).toLowerCase() }) : '' });
  if (r.H8) L.push({ ico: 'goutte', titre: t('pro.services.sang'), detail: [(r.H8a || []).join(' '), r.H8b ? t('pro.services.delivrance24') : ''].filter(Boolean).join(', ') });
  if (r.H10a) L.push({ ico: 'croixPharma', titre: t('pro.services.pharmacie'), detail: r.H10b ? t('pro.services.h24') : '' });
  return L;
}

export default {
  render({ t }, c) {
    const L = lignes(c, t);
    return html`
    <section class="pile">
      <h2 class="titre-2">${t('pro.services.titre')}</h2>
      <p class="chapo">${t('pro.services.chapo')}</p>
      ${L.length ? html`
      <div class="panneau orientation sombre" aria-label="${t('pro.services.titre')}">
        <p class="orientation__tete">${c.nom}</p>
        <ul class="orientation__liste" role="list">
          ${L.map((x) => html`<li class="${x.fort ? 'est-fort' : ''}"><span class="orientation__picto">${icone(x.ico, { taille: 22 })}</span><span class="orientation__titre">${x.titre}</span><span class="orientation__detail">${x.detail}</span></li>`)}
        </ul>
      </div>` : html`<p class="encart">${icone('info')}<span class="encart__corps">${t('pro.services.vide')}</span></p>`}
      <a class="ligne-lien" href="#/pro/tableau/fiche">${icone('fiche')}<span>${t('pro.services.modifier')}</span>${icone('suite', { taille: 20 })}</a>
    </section>`;
  },
};
