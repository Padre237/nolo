// Écran 2 — Accueil : une grande action, un tableau d'orientation, l'espace pro.
import { html } from '../../core/dom.js';
import { FINALITES } from '../../domain/consent.js';
import { motif } from '../../ui/components.js';
import { icone } from '../../ui/icons.js';

const ligne = (href, ico, titre, texte) => html`
  <a class="ligne-action" href="${href}">
    <span class="ligne-action__picto">${icone(ico)}</span>
    <span class="ligne-action__corps"><span class="ligne-action__titre">${titre}</span><span class="ligne-action__texte">${texte}</span></span>
    <span class="ligne-action__fin">${icone('suite')}</span>
  </a>`;

export default {
  id: 'accueil',
  titre: ({ t }) => t('accueil.titre'),
  render({ s, t }) {
    const partages = FINALITES.filter((f) => s.consentement?.finalites?.[f]).map((f) => t(`consentement.finalites.${f}.titre`));
    return html`
    <div class="cadre accueil">
      <section class="panneau accueil__panneau sombre" aria-labelledby="accueil-titre">
        <div class="accueil__texte">
          <h1 id="accueil-titre" class="affiche">${t('accueil.titre')}</h1>
          <a class="action-maitresse" href="#/decrire">
            <span class="action-maitresse__titre">${t('accueil.action')}</span>
            <span class="action-maitresse__texte">${t('accueil.actionB')}</span>
            <span class="action-maitresse__fleche">${icone('fleche', { taille: 26, trait: 2 })}</span>
          </a>
        </div>
        <div class="accueil__motif">${motif({ points: 7, sombre: true, anime: false })}</div>
      </section>

      <div class="accueil__bas">
        <section aria-labelledby="chercher-titre">
          <h2 id="chercher-titre" class="titre-2 section-titre">${t('accueil.chercherTitre')}</h2>
          <nav class="annuaire" aria-labelledby="chercher-titre">
            ${ligne('#/chercher/service', 'service', t('accueil.service'), t('accueil.serviceB'))}
            ${ligne('#/chercher/medicament', 'pilule', t('accueil.medicament'), t('accueil.medicamentB'))}
            ${ligne('#/chercher/sang', 'goutte', t('accueil.sang'), t('accueil.sangB'))}
          </nav>
        </section>
        <section aria-labelledby="autres-titre">
          <h2 id="autres-titre" class="titre-2 section-titre">${t('accueil.autresTitre')}</h2>
          <div class="annuaire">
            ${ligne('#/droits', 'bouclier', t('accueil.droits'), t('accueil.droitsB'))}
            ${ligne('#/mes-donnees', 'donnees', t('accueil.mesDonnees'), partages.length ? t('accueil.partageOui', { liste: partages.join(', ') }) : t('accueil.partageNon'))}
            ${ligne('#/pro', 'batiment', t('accueil.etablissement'), t('accueil.etablissementB'))}
            ${ligne('#/ministere', 'repere', t('accueil.ministere'), t('accueil.ministereB'))}
          </div>
        </section>
      </div>
    </div>`;
  },
};
