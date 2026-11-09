// Nolo — agent Conformité (SF-007-17, FR-1902, FR-1904) : portage de `src/server/agents/conformite.py`.
// Même ordre d'évaluation : (1) art. 48, (2) mode, (3) consentement exprès et accord parental, (4) profilage,
// (5) destination, (6) règles propres à l'action. La première règle qui bloque l'emporte. Toute valeur
// juridique vient de la politique ; les fragments cités par action sont des données (table §3 des contrats).
// Les tests de parité (`tests/parite_conformite.test.mjs`) rejouent les décisions de la référence Python.

const ART48 = 'CMR-LOI-2024-017::0048';
const ART9 = 'CMR-LOI-2024-017::0011';
const ART19 = 'CMR-LOI-2024-017::0020';
const ART32 = 'CMR-LOI-2024-017::0033';
const ART44 = 'CMR-LOI-2024-017::0044';
const ART65_66 = 'CMR-LOI-2024-017::0062';
const AI_ACT_JOURNAL = 'INT-UE-AI-ACT-2024-1689::0032';
const RSI_ART45 = 'INT-OMS-RSI-2005-AMENDE-2022::0054';
const PHARM_ART52 = 'CMR-LOI-90-035::0049';
const MEDECIN_ART16 = 'CMR-LOI-90-036::0015';

export const CATEGORIES_ART48 = { vie_sexuelle: 'vie_sexuelle', donnee_genetique: 'genetique_sante', donnee_biometrique: 'biometrie_sante', origine: 'origine_raciale_ethnique' };
export const MODES = ['demo_synthetique', 'sans_donnees_personnelles', 'complet'];
const A = 'AUTORISE'; const AC = 'AUTORISE_AVEC_CONDITIONS'; const B = 'BLOQUE';
const tous = (regle) => Object.fromEntries(MODES.map((m) => [m, regle]));
const indispo = [B, [], null, 'FONCTION_INDISPONIBLE_MODE'];

/** Table de décision : action → { fragments, consentement?, modes: { mode: [verdict, conditions, repli, justification] } }. */
export const TABLE = {
  'triage.extraction_llm': { consentement: 'orientation', fragments: [ART9, ART32],
    modes: { demo_synthetique: [A, [], null, 'EXTRACTION_LOCALE_AUTORISEE'], sans_donnees_personnelles: [B, [], 'extraction_lexicale', 'FONCTION_INDISPONIBLE_MODE'], complet: [A, ['destination_serveur_cmr'], null, 'EXTRACTION_LOCALE_AUTORISEE'] } },
  'triage.journaliser_decision': { fragments: [ART65_66, AI_ACT_JOURNAL],
    modes: { demo_synthetique: [A, [], null, 'JOURNAL_DEMO_COMPLET'], sans_donnees_personnelles: [AC, ['empreinte_seulement'], null, 'JOURNAL_PAR_EMPREINTE'], complet: [AC, ['empreinte_seulement'], null, 'JOURNAL_PAR_EMPREINTE'] } },
  'orientation.structures': { fragments: [ART9],
    modes: { demo_synthetique: [A, [], null, 'ORIENTATION_AUTORISEE'], sans_donnees_personnelles: [AC, ['position_arrondie', 'aucun_symptome'], null, 'ORIENTATION_ANONYME'], complet: [A, [], null, 'ORIENTATION_AUTORISEE'] } },
  'ressources.rechercher_specialite': { fragments: [ART48], sensibleBloque: true, modes: tous([A, [], null, 'RECHERCHE_AUTORISEE']) },
  'ressources.telecharger_tuile': { fragments: [ART48], modes: tous([A, [], null, 'TUILE_SANS_REQUETE']) },
  'ressources.rechercher_medicament': { fragments: [ART48], sensibleBloque: true, modes: tous([A, [], null, 'RECHERCHE_AUTORISEE']) },
  'ressources.rechercher_sang': { fragments: [], sansFragmentOk: true, modes: tous([A, [], null, 'AUCUNE_DONNEE_PERSONNELLE']) },
  'fiabilite.enregistrer_signalement': { fragments: [ART9, ART19],
    modes: { demo_synthetique: [AC, ['pseudonymiser'], null, 'SIGNALEMENT_PSEUDONYMISE'], sans_donnees_personnelles: indispo, complet: [AC, ['pseudonymiser'], null, 'SIGNALEMENT_PSEUDONYMISE'] } },
  'fiabilite.enregistrer_signalement_sensible': { fragments: [ART48],
    modes: { demo_synthetique: [AC, ['retirer_dci', 'retirer_pseudonyme'], null, 'SIGNALEMENT_SANS_TRACE_SENSIBLE'], sans_donnees_personnelles: indispo, complet: [AC, ['retirer_dci', 'retirer_pseudonyme'], null, 'SIGNALEMENT_SANS_TRACE_SENSIBLE'] } },
  'fiabilite.appliquer_baisse': { fragments: [ART44],
    modes: { demo_synthetique: [AC, ['sauf_gel_actif'], null, 'BAISSE_SOUS_CONTROLE'], sans_donnees_personnelles: indispo, complet: [AC, ['sauf_gel_actif'], null, 'BAISSE_SOUS_CONTROLE'] } },
  'declaration.publier': { fragments: [PHARM_ART52], modes: tous([AC, ['declarant_agree'], null, 'DECLARATION_AGREEE']) },
  'surveillance.contribuer': { consentement: 'surveillance', fragments: [ART9],
    modes: { demo_synthetique: [A, [], null, 'CONTRIBUTION_CONSENTIE'], sans_donnees_personnelles: indispo, complet: [A, [], null, 'CONTRIBUTION_CONSENTIE'] } },
  'surveillance.publier_carte': { fragments: [ART65_66],
    modes: { demo_synthetique: [AC, ['agreger_seuil_5', 'decaler_7_jours'], null, 'CARTE_AGREGEE'], sans_donnees_personnelles: [A, [], null, 'AUCUNE_DONNEE_PERSONNELLE'], complet: [AC, ['agreger_seuil_5', 'decaler_7_jours'], null, 'CARTE_AGREGEE'] } },
  'surveillance.transmettre_donnees_individuelles': { fragments: [ART9, RSI_ART45], modes: tous([B, [], 'agregat', 'DONNEES_INDIVIDUELLES_INTERDITES']) },
  'surveillance.exporter_agregat': { fragments: [ART19],
    modes: { demo_synthetique: [AC, ['maquette'], null, 'EXPORT_MAQUETTE'], sans_donnees_personnelles: indispo, complet: [AC, ['agregats_non_personnels'], null, 'EXPORT_AGREGE'] } },
  appel_reseau_sortant: { fragments: [ART32],
    modes: { demo_synthetique: [AC, ['donnees_synthetiques_seulement'], null, 'SORTIE_DEMO'], sans_donnees_personnelles: [AC, ['donnees_anonymisees_seulement'], null, 'SORTIE_ANONYMISEE'], complet: [AC, ['controle_destination'], null, 'SORTIE_CONTROLEE'] } },
  'interconnexion.externe': { fragments: [ART19],
    modes: { demo_synthetique: [AC, ['agregats_seulement'], null, 'INTERCONNEXION_DEMO'], sans_donnees_personnelles: indispo, complet: [B, [], 'agregat', 'AUTORISATION_ART19_AL2_REQUISE'] } },
  'profil.relier_dans_la_duree': { fragments: [ART44, ART65_66], modes: tous([B, [], null, 'PROFILAGE_INTERDIT']) },
  'donnee_interdite.traiter': { fragments: [ART48], modes: tous([B, [], null, 'CATEGORIE_INTERDITE_ART48']) },
  'compte.creer': { fragments: [ART19],
    modes: { demo_synthetique: [AC, ['synthetique'], null, 'COMPTE_DEMO'], sans_donnees_personnelles: indispo, complet: [A, [], null, 'COMPTE_AUTORISE'] } },
  'intervention.demander': { fragments: [ART44],
    modes: { demo_synthetique: [A, [], null, 'INTERVENTION_HUMAINE'], sans_donnees_personnelles: [AC, ['reference_decision_seulement'], null, 'INTERVENTION_HUMAINE'], complet: [A, [], null, 'INTERVENTION_HUMAINE'] } },
  'journal.rejouer': { fragments: [AI_ACT_JOURNAL],
    modes: { demo_synthetique: [AC, ['role_auditeur'], null, 'REJEU_AUDITEUR'], sans_donnees_personnelles: [AC, ['role_auditeur', 'entrees_fournies_par_auditeur'], null, 'REJEU_AUDITEUR'], complet: [AC, ['role_auditeur', 'entrees_fournies_par_auditeur'], null, 'REJEU_AUDITEUR'] } },
  // Module POC (D-033, FR-732) : en démonstration seulement, calcul et recherche sur l'appareil.
  'diagnostic.afficher_hypotheses': { fragments: [MEDECIN_ART16, ART48], poc: true,
    modes: { demo_synthetique: [AC, ['module_experimental', 'sur_appareil', 'max_3_pistes', 'message_neutre_art48', 'aucune_transmission'], null, 'POC_DEMO_GOUVERNE'], sans_donnees_personnelles: indispo, complet: indispo } },
  'orientation.recommander_structure': { fragments: [MEDECIN_ART16, ART9], poc: true,
    modes: { demo_synthetique: [AC, ['recherche_sur_appareil', 'aucune_transmission'], null, 'ORIENTATION_POC_SUR_APPAREIL'], sans_donnees_personnelles: indispo, complet: indispo } },
  'politique.simuler': { fragments: [ART32], modes: tous([AC, ['variante_en_memoire'], null, 'SIMULATION_AUTORISEE']) },
};

const decision = (verdict, { conditions = [], fragments = [], cles = [], version, repli = null, justification = '' }) =>
  ({ verdict, conditions: [...conditions], fragments: [...fragments], cles: [...cles], version, repli, justification });

/**
 * demande : { action, categories, finalite, destination, contexte: { mode, consentements, mineur } }
 * → { verdict, conditions, fragments, cles, version, repli, justification }
 */
export function decider(demande, politique) {
  const pol = politique;
  const ctx = demande.contexte || {};
  const cons = ctx.consentements || {};
  const cats = demande.categories || [];
  const version = pol.version;
  const bloque = (justification, fragments, cles, repli = null) => decision(B, { fragments, cles, version, repli, justification });

  // (1) Catégories interdites de l'art. 48 : aucun consentement ne déroge (FR-712, D-008).
  const touchees = [...new Set(cats.filter((c) => c in CATEGORIES_ART48).map((c) => CATEGORIES_ART48[c]))].sort();
  if (touchees.length && !pol.valeur('donnees_sensibles.categories_interdites_art48.derogation_par_consentement')) {
    const a = demande.action;
    const repli = a.startsWith('ressources.') ? 'appareil' : a.startsWith('surveillance.') ? 'agregat' : null;
    return bloque('CATEGORIE_INTERDITE_ART48', [ART48], ['donnees_sensibles.categories_interdites_art48.derogation_par_consentement'], repli);
  }

  const regle = Object.hasOwn(TABLE, demande.action) ? TABLE[demande.action] : null;
  if (!regle) return decision('BLOQUE_SANS_FONDEMENT', { version, justification: 'ACTION_HORS_CATALOGUE' });

  // (2) Mode (FR-714).
  const [verdict, conds, repli, justification] = regle.modes[ctx.mode];
  let conditions = [...conds];
  if (touchees.length) conditions.push('derogation_art48_simulee');
  if (verdict === B) return bloque(justification, regle.fragments.length ? regle.fragments : [ART19], [`actions.${demande.action}`], repli);

  // (3) Consentement exprès de la finalité (nécessaire mais pas suffisant, D-008).
  const besoin = regle.consentement;
  if (besoin && !cons[besoin]) return bloque('CONSENTEMENT_EXPRES_MANQUANT', [ART9, ART65_66], [`consentement.${besoin}.base`]);
  if (ctx.mineur && besoin && !cons.parental) return bloque('MINEUR_SANS_CONSENTEMENT_PARENTAL', [ART9], ['consentement.mineur.exige']);

  // (4) Profilage (FR-704).
  if (demande.finalite === 'profilage' && !pol.valeur('decision_automatisee.profilage.autorise')) {
    return bloque('PROFILAGE_INTERDIT', [ART44, ART65_66], ['decision_automatisee.profilage.autorise']);
  }

  // (5) Destination (FR-705, FR-715).
  if (demande.destination === 'hors_cmr') {
    const synthetique = ctx.mode === 'demo_synthetique';
    const anonyme = cats.every((c) => c === 'aucune_donnee_personnelle' || c === 'contribution_agregee');
    if (!(anonyme && pol.valeur('transfert_hors_pays.autorise_donnees_anonymisees'))) {
      if (synthetique && pol.valeur('transfert_hors_pays.autorise_donnees_synthetiques')) conditions.push('donnees_synthetiques_seulement');
      else if (!pol.valeur('transfert_hors_pays.autorise_donnees_personnelles')) {
        return bloque('TRANSFERT_SANS_AUTORISATION', [ART32], ['transfert_hors_pays.autorise_donnees_personnelles'], pol.valeur('transfert_hors_pays.repli')[0]);
      }
    }
  }
  if (conditions.includes('destination_serveur_cmr') && !['serveur_cmr', 'appareil'].includes(demande.destination)) {
    return bloque('DESTINATION_NON_AUTORISEE', [ART32], ['transfert_hors_pays']);
  }

  // (6) Règles propres à l'action : module POC (FR-1521, FR-DX-07), puis recherches sensibles (L11).
  if (regle.poc) {
    if (!(pol.valeur('diagnostic_poc.actif') && pol.valeur('diagnostic_poc.modes_autorises').includes(ctx.mode))) {
      return bloque('MODULE_POC_INACTIF', regle.fragments, ['diagnostic_poc.actif']);
    }
    if (demande.destination !== 'appareil' && !pol.valeur('diagnostic_poc.transmission_serveur')) {
      return bloque('TRANSMISSION_POC_INTERDITE', regle.fragments, ['diagnostic_poc.transmission_serveur'], 'appareil');
    }
  }
  if (regle.sensibleBloque && cats.includes('vie_sexuelle_potentielle')) {
    return bloque('RECHERCHE_SENSIBLE_SUR_APPAREIL', [ART48], ['donnees_sensibles.revele_vie_sexuelle.traitement'], 'appareil');
  }

  if (!regle.fragments.length && !regle.sansFragmentOk) return decision('BLOQUE_SANS_FONDEMENT', { version, justification: 'AUCUN_FONDEMENT_TROUVE' });
  return decision(conditions.length ? AC : verdict, { conditions, fragments: regle.fragments, cles: [`actions.${demande.action}`], version, repli, justification });
}

/** FR-710 — Contre-démonstration : autorise tout, journal toujours actif ; seulement en démonstration. */
export function deciderSansGouvernance(demande, politique) {
  return decision(A, { version: politique.version, justification: 'GOUVERNANCE_DESACTIVEE' });
}
