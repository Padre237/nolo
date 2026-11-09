// Espace pro — « Ma fiche » : questions conditionnelles selon le type (D-029 § 6), photos sans métadonnées.
import { html, attr } from '../../core/dom.js';
import { questionsVisibles, nettoyer, completude, verifier, JOURS } from '../../domain/pro.js';
import { SPECIALITES } from '../../domain/facilities.js';
import { erreurChamp } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';
import { compteCourant, mettreAJour, journal } from './compte.js';

function question(q, r, t) {
  const libelle = t(`pro.fiche.questions.${q.id}`);
  const v = r[q.id];
  const id = `q-${q.id}`;
  if (q.saisie === 'on') return html`
    <div class="question" data-cle="${id}">
      <p class="question__texte" id="${id}">${libelle}</p>
      <div class="segment" role="group" aria-labelledby="${id}">
        <button type="button" data-act="repondre-fiche" data-q="${q.id}" data-v="oui" aria-pressed="${v === true}">${t('commun.oui')}</button>
        <button type="button" data-act="repondre-fiche" data-q="${q.id}" data-v="non" aria-pressed="${v === false}">${t('commun.non')}</button>
      </div>
    </div>`;
  if (q.saisie === 'liste' || q.saisie === 'multi') {
    const multi = q.saisie === 'multi';
    return html`
    <fieldset class="question question--options" data-cle="${id}">
      <legend class="question__texte">${libelle}</legend>
      <div class="options">${q.options.map((o) => {
        const coche = multi ? (v || []).includes(o) : v === o;
        const lab = t(`pro.fiche.options.${o}`) === `pro.fiche.options.${o}` ? o : t(`pro.fiche.options.${o}`);
        return html`<label class="option" data-cle="${id}-${o}"><input type="${multi ? 'checkbox' : 'radio'}" name="${id}" value="${o}" data-change="option-fiche" data-q="${q.id}" data-multi="${multi}"${attr('checked', coche)}><span>${lab}</span></label>`;
      })}</div>
    </fieldset>`;
  }
  if (q.saisie === 'specialites') {
    const choisies = v || {};
    const tri = [...SPECIALITES].sort((a, b) => t(`specialites.${a}`).localeCompare(t(`specialites.${b}`)));
    return html`
    <fieldset class="question question--options" data-cle="${id}">
      <legend class="question__texte">${libelle}</legend>
      <div class="options">${tri.map((sp) => html`<label class="option" data-cle="${id}-${sp}"><input type="checkbox" data-change="sp-basculer" data-sp="${sp}"${attr('checked', !!choisies[sp])}><span>${t(`specialites.${sp}`)}</span></label>`)}</div>
      ${Object.keys(choisies).length ? html`
      <div class="specialites-detail">
        <p class="champ__aide">${t('pro.fiche.questions.H3a')}</p>
        ${Object.entries(choisies).map(([sp, x]) => html`
        <div class="specialite-ligne" data-cle="${id}-l-${sp}">
          <p class="specialite-ligne__nom" id="sp-${sp}">${t(`specialites.${sp}`)}</p>
          <div class="segment segment--trois" role="group" aria-labelledby="sp-${sp}">${['tous', 'certains', 'vacation'].map((m) => html`<button type="button" data-act="sp-modalite" data-sp="${sp}" data-m="${m}" aria-pressed="${x.m === m}">${t(`modalites.${m}`)}</button>`)}</div>
          ${x.m !== 'tous' ? html`<div class="options options--jours" role="group" aria-label="${t('pro.fiche.questions.H3b')}">${JOURS.map((j) => html`<label class="option option--jour" data-cle="${id}-${sp}-${j}"><input type="checkbox" data-change="sp-jour" data-sp="${sp}" data-j="${j}"${attr('checked', (x.j || []).includes(j))}><span>${t(`pro.fiche.options.${j}`).slice(0, 3)}</span></label>`)}</div>` : ''}
        </div>`)}
      </div>` : ''}
    </fieldset>`;
  }
  if (q.saisie === 'case') return html`
    <label class="option option--case" data-cle="${id}"><input type="checkbox" data-change="case-fiche" data-q="${q.id}"${attr('checked', v === true)}><span>${libelle}</span></label>`;
  return html`
    <div class="champ" data-cle="${id}"><label class="champ__etiquette" for="${id}">${libelle}</label><input id="${id}" class="saisie" value="${v || ''}" data-input="texte-fiche" data-q="${q.id}"></div>`;
}

/** Ré-encode l'image sur un canevas : position et appareil disparaissent (FR-ETS-12, CA-ETS-10). */
function nettoyerPhoto(fichier) {
  return new Promise((ok, ko) => {
    if (!/^image\/(jpeg|png)$/.test(fichier.type) || fichier.size > 5 * 1024 * 1024) { ko(new Error('format')); return; }
    const img = new Image();
    img.onload = () => {
      const l = Math.min(1, 720 / img.width);
      const cv = document.createElement('canvas'); cv.width = Math.round(img.width * l); cv.height = Math.round(img.height * l);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(img.src);
      ok(cv.toDataURL('image/jpeg', 0.72));
    };
    img.onerror = ko;
    img.src = URL.createObjectURL(fichier);
  });
}

export default {
  render({ s, t }, c) {
    const r = c.fiche || {};
    const qs = questionsVisibles(c.type, r);
    const comp = completude(c.type, r);
    const photos = c.photos || [];
    return html`
    <section class="pile">
      <div class="titre-ligne"><h2 class="titre-2">${t('pro.fiche.titre')}</h2><span class="etiquette etiquette--neutre chiffres">${t('pro.fiche.completude', { x: comp.faites, y: comp.total })}</span></div>
      <p class="chapo">${t('pro.fiche.chapo')}</p>
      <div class="questions questions--fiche">${qs.map((q) => question(q, r, t))}</div>

      <fieldset class="pile photos">
        <legend class="titre-3">${t('pro.fiche.photos')}</legend>
        <p class="champ__aide">${t('pro.fiche.photosAide')}</p>
        <label class="option option--case"><input type="checkbox" data-change="photos-case"${attr('checked', !!s.proPhotosCase)}><span>${t('pro.fiche.photosCase')}</span></label>
        <label class="bouton bouton--secondaire fichier ${s.proPhotosCase ? '' : 'est-inactif'}">${icone('photo', { taille: 20 })}${t('pro.fiche.ajouterPhotos')}<input type="file" accept="image/jpeg,image/png" multiple data-change="photos" class="vh"${attr('disabled', !s.proPhotosCase)}></label>
        ${erreurChamp('photos-err', s.proPhotosErreur ? t('pro.fiche.photosCaseManque') : '')}
        ${photos.length ? html`<ul class="vignettes" role="list">${photos.map((p, i) => html`<li data-cle="ph-${i}"><img src="${p}" alt="" width="120" height="90"><button type="button" class="bouton bouton--discret bouton--icone" data-act="retirer-photo" data-i="${i}" aria-label="${t('pro.fiche.retirerPhoto', { n: i + 1 })}">${icone('croix', { taille: 18 })}</button></li>`)}</ul><p class="champ__ok">${icone('coche', { taille: 18 })}${t('pro.fiche.photosNettoyees')}</p>` : ''}
      </fieldset>

      <p class="note">${icone('info', { taille: 16 })} ${t('pro.fiche.sensible')}</p>
      <div class="actions">
        <p class="raison" aria-live="polite">${s.proFicheTente && comp.manquantes.length ? t('pro.fiche.manque', { n: comp.manquantes.length }) : ''}</p>
        <button type="button" class="bouton bouton--principal" data-act="envoyer-fiche" data-inactif="${comp.manquantes.length > 0}">${icone('envoi', { taille: 20 })}${t('pro.fiche.envoyer')}</button>
      </div>
    </section>`;
  },
  actions: {
    'repondre-fiche'(ctx, el) { const c = compteCourant(); mettreAJour(c.email, (x) => ({ ...x, fiche: nettoyer(x.type, { ...x.fiche, [el.dataset.q]: el.dataset.v === 'oui' }) })); },
    'option-fiche'(ctx, el) {
      const c = compteCourant(); const q = el.dataset.q;
      mettreAJour(c.email, (x) => {
        const f = { ...x.fiche };
        if (el.dataset.multi === 'true') { const set = new Set(f[q] || []); el.checked ? set.add(el.value) : set.delete(el.value); f[q] = [...set]; } else f[q] = el.value;
        return { ...x, fiche: nettoyer(x.type, f) };
      });
    },
    'sp-basculer'(ctx, el) {
      const c = compteCourant(); const sp = el.dataset.sp;
      mettreAJour(c.email, (x) => { const h = { ...(x.fiche.H3 || {}) }; if (el.checked) h[sp] = { m: 'tous', j: [] }; else delete h[sp]; return { ...x, fiche: nettoyer(x.type, { ...x.fiche, H3: h }) }; });
    },
    'sp-modalite'(ctx, el) {
      const c = compteCourant(); const sp = el.dataset.sp;
      mettreAJour(c.email, (x) => ({ ...x, fiche: { ...x.fiche, H3: { ...x.fiche.H3, [sp]: { ...x.fiche.H3[sp], m: el.dataset.m } } } }));
    },
    'sp-jour'(ctx, el) {
      const c = compteCourant(); const sp = el.dataset.sp;
      mettreAJour(c.email, (x) => { const j = new Set(x.fiche.H3[sp].j || []); el.checked ? j.add(el.dataset.j) : j.delete(el.dataset.j); return { ...x, fiche: { ...x.fiche, H3: { ...x.fiche.H3, [sp]: { ...x.fiche.H3[sp], j: JOURS.filter((d) => j.has(d)) } } } }; });
    },
    'case-fiche'(ctx, el) { const c = compteCourant(); mettreAJour(c.email, (x) => ({ ...x, fiche: nettoyer(x.type, { ...x.fiche, [el.dataset.q]: el.checked }) })); },
    'texte-fiche'(ctx, el) { const c = compteCourant(); mettreAJour(c.email, (x) => ({ ...x, fiche: { ...x.fiche, [el.dataset.q]: el.value } })); },
    'photos-case'({ set }, el) { set({ proPhotosCase: el.checked, proPhotosErreur: false }); },
    async photos({ s, set }, el) {
      if (!s.proPhotosCase) { set({ proPhotosErreur: true }); return; }
      const c = compteCourant();
      const fichiers = [...el.files].slice(0, 5 - (c.photos || []).length);
      const propres = [];
      for (const f of fichiers) { try { propres.push(await nettoyerPhoto(f)); } catch { /* fichier refusé : ni JPEG ni PNG, ou plus de 5 Mo */ } }
      mettreAJour(c.email, (x) => journal({ ...x, photos: [...(x.photos || []), ...propres].slice(0, 5) }, 'photos'));
      el.value = '';
    },
    'retirer-photo'(ctx, el) { const c = compteCourant(); mettreAJour(c.email, (x) => ({ ...x, photos: x.photos.filter((_, i) => i !== Number(el.dataset.i)) })); },
    'envoyer-fiche'({ t, set, annonce }) {
      const c = compteCourant();
      const comp = completude(c.type, c.fiche || {});
      if (comp.manquantes.length) { set({ proFicheTente: true }); return; }
      // À l'envoi, seul le format du NIU est contrôlé (déjà validé à l'inscription) ; puis vérification de l'agrément.
      const etat = c.visibilite === 'VERIFIE' ? 'VERIFIE' : verifier(c.niu);
      mettreAJour(c.email, (x) => journal(journal({ ...x, ficheEnvoyee: new Date().toISOString(), visibilite: etat }, 'fiche'), 'verification', { etat }));
      set({ proFicheTente: false });
      annonce(t('pro.fiche.envoyee'));
      location.hash = '#/pro/tableau/accueil';
    },
  },
};
