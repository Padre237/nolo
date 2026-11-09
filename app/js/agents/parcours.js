// Nolo — décisions gouvernées des parcours du citoyen (SF-007-17, SF-001-15, SF-007-18).
// Chaque issue passe par l'orchestrateur AVANT l'affichage ; la « trace » produite alimente le panneau
// « Comment Nolo a décidé » : agent, nœud Y.3172, décision, fragments cités. Jamais de texte libre, jamais de
// signe ni de nom de piste dans la trace ni au journal (FR-1914, FR-1525, FR-1526).
import { empreinte } from '../core/canonique.js';
import { PATHOLOGIES, besoins } from '../domain/engine.js';

export const MODULE_POC = { version: 'poc-table-demonstration-1', empreinte: empreinte(PATHOLOGIES.map(({ id, prior, typiques, niveau, specialite, services }) => ({ id, prior, typiques, niveau, specialite, services }))) };
const DANGER_ENFANT = ['INT-OMS-PCIME-MANUEL::0029'];
const DANGER_ADULTE = ['INT-OMS-IITT-FR::0000'];
const autorise = (d) => d.verdict === 'AUTORISE' || d.verdict === 'AUTORISE_AVEC_CONDITIONS';
const etapeP = (d, action) => ({ agent: 'conformite', noeud: 'P', action, decision: d.verdict, conditions: d.conditions, repli: d.repli, fragments: d.fragments });

/** Décide de l'issue à montrer ; un résultat non autorisé n'est jamais affiché tel quel (FR-1527). */
export function deciderResultat(orch, resultat, { profil }) {
  const trace = [
    { agent: 'saisie', noeud: 'SRC', decision: 'TEXTE_SUR_APPAREIL', fragments: [] },
    { agent: 'reformulation', noeud: 'PP', decision: 'VOCABULAIRE_FERME', fragments: [] },
    { agent: 'signes_danger', noeud: 'M', decision: resultat.issue === 'urgence' ? 'URGENCE' : 'AUCUN_SIGNE_DANGER', fragments: profil?.enfantPetit ? DANGER_ENFANT : DANGER_ADULTE },
  ];
  const orienter = (sortie) => {
    const r = orch.executer({ demandeur: 'orientation', action: 'orientation.structures', categories: ['position_arrondie'], finalite: 'orientation', destination: 'appareil', entree: { issue: sortie } });
    trace.push(etapeP(r.decision, 'orientation.structures'));
    return r.decision;
  };

  if (resultat.issue === 'urgence') {
    orienter('urgence');
    trace.push({ agent: 'orientation', noeud: 'SINK', decision: 'URGENCES_PROCHES', fragments: [] });
    return { resultat, trace };
  }

  // Module expérimental : décision avant tout calcul affiché ; journal minimal (version, empreinte, nombre).
  const nombre = resultat.issue === 'pistes' ? resultat.pistes.length : 0;
  trace.push({ agent: 'pistes', noeud: 'M', decision: resultat.issue === 'pistes' ? 'TABLE_DEMONSTRATION' : 'AUCUNE_PISTE_AFFICHEE', fragments: [] });
  const poc = orch.executer({ demandeur: 'pistes', action: 'diagnostic.afficher_hypotheses', categories: ['symptomes_codes'], finalite: 'orientation', destination: 'appareil', entree: { module: MODULE_POC.version, empreinte_modele: MODULE_POC.empreinte, nombre } });
  trace.push(etapeP(poc.decision, 'diagnostic.afficher_hypotheses'));
  if (!autorise(poc.decision)) {
    // FR-1521 : sans module, le parcours va de « Vérifier » à « Où aller » sans piste.
    orienter('orientation');
    trace.push({ agent: 'orientation', noeud: 'SINK', decision: 'CENTRE_DE_SANTE', fragments: [] });
    return { resultat: { issue: 'orientation', pistes: [], besoins: besoins([], profil || {}) }, trace };
  }
  if (resultat.issue === 'pistes') {
    const reco = orch.executer({ demandeur: 'orientation', action: 'orientation.recommander_structure', categories: ['symptomes_codes'], finalite: 'orientation', destination: 'appareil' });
    trace.push(etapeP(reco.decision, 'orientation.recommander_structure'));
    trace.push({ agent: 'tuile', noeud: 'D', decision: 'RECHERCHE_SUR_APPAREIL', fragments: [] });
    trace.push({ agent: 'orientation', noeud: 'SINK', decision: autorise(reco.decision) ? 'STRUCTURE_RECOMMANDEE' : 'CENTRE_DE_SANTE', fragments: [] });
    if (!autorise(reco.decision)) return { resultat: { ...resultat, besoins: besoins([], profil || {}) }, trace };
    return { resultat, trace };
  }
  orienter(resultat.issue === 'art48' ? 'centre' : 'hors_champ');
  trace.push({ agent: 'orientation', noeud: 'SINK', decision: 'CENTRE_DE_SANTE', fragments: [] });
  return { resultat, trace };
}

const ACTIONS_RECHERCHE = {
  service: ['ressources.rechercher_specialite', 'requete_specialite'],
  medicament: ['ressources.rechercher_medicament', 'requete_medicament'],
  sang: ['ressources.rechercher_sang', 'aucune_donnee_personnelle'],
};

/** Recherche explicite : le serveur est interrogé seulement si Conformité l'autorise ; sinon la tuile du district, sur l'appareil. */
export function deciderRecherche(orch, { type, sensible = false }) {
  const [action, categorie] = ACTIONS_RECHERCHE[type];
  const categories = sensible ? [categorie, 'vie_sexuelle_potentielle'] : [categorie];
  const r = orch.executer({ demandeur: 'ressources', action, categories, finalite: 'recherche', destination: 'serveur_cmr' });
  const trace = [{ agent: 'saisie', noeud: 'SRC', decision: 'LISTE_FERMEE', fragments: [] }, etapeP(r.decision, action)];
  if (r.decision.repli === 'appareil') {
    const tuile = orch.executer({ demandeur: 'ressources', action: 'ressources.telecharger_tuile', categories: ['aucune_donnee_personnelle'], finalite: 'recherche', destination: 'serveur_cmr' });
    trace.push(etapeP(tuile.decision, 'ressources.telecharger_tuile'));
  }
  trace.push({ agent: 'tuile', noeud: 'D', decision: 'RECHERCHE_SUR_APPAREIL', fragments: [] });
  trace.push({ agent: 'ressources', noeud: 'SINK', decision: sensible ? 'RESULTATS_NON_COMPTES' : 'RESULTATS', fragments: [] });
  return { decision: r.decision, trace };
}

/** Signalement d'une pharmacie (F-006) : pseudonymisé ; jamais pour un médicament sensible. */
export function deciderSignalement(orch, { sensible = false, consentements = {} }) {
  const action = sensible ? 'fiabilite.enregistrer_signalement_sensible' : 'fiabilite.enregistrer_signalement';
  return orch.executer({ demandeur: 'fiabilite', action, categories: ['signalement'], finalite: 'fiabilite', destination: 'appareil', consentements }).decision;
}
