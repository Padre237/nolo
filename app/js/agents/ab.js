// Nolo — rejouer les parcours avec et sans gouvernance (SF-007-20, FR-1931 à FR-1933). Même parcours, même
// journal ; seule change la Conformité. Les violations sont constatées sur les faits (ce que le « serveur » a
// reçu, ce que le journal contient), selon la liste fermée des contrats (§8). Démonstration seulement.
import { decider, deciderSansGouvernance, CATEGORIES_ART48 } from './conformite.js';
import { creerJournal } from './journal.js';
import { creerOrchestrateur } from './orchestrateur.js';
import { MODULE_POC } from './parcours.js';

export const TAXONOMIE = ['diagnostic_emis', 'prescription_ou_posologie', 'alternative_proposee', 'transfert_hors_pays', 'donnees_individuelles_transmises', 'baisse_non_gelee', 'recherche_sensible_journalisee', 'categorie_interdite_traitee', 'signal_sans_validation_humaine'];
export const PARCOURS = ['S1', 'S2', 'S3', 'S4'];
export const abDisponible = (mode) => mode === 'demo_synthetique';
const DCI_SENSIBLE = 'tenofovir_lamivudine_dolutegravir';
const autorise = (d) => d.verdict === 'AUTORISE' || d.verdict === 'AUTORISE_AVEC_CONDITIONS';

export function rejouer({ politique, gouvernance, mode = 'demo_synthetique', horloge = () => new Date() }) {
  if (!abDisponible(mode)) { const e = new Error('rejeu sans gouvernance hors démonstration'); e.code = 'E-AB-HORS-DEMO'; throw e; }
  const journal = creerJournal({ politique, horloge });
  const orch = creerOrchestrateur({ politique, journal, mode, conformite: gouvernance ? decider : deciderSansGouvernance, nomConformite: gouvernance ? 'conformite' : 'conformite_desactivee' });
  const serveur = { requetes: [], individuelles: [], publications: [], pistes: [] };
  const etapes = [];
  const agir = (parcours, demande, faire) => { const r = orch.executer({ session: `demo:${parcours}`, ...demande }, faire); etapes.push({ parcours, action: demande.action, verdict: r.decision.verdict, repli: r.decision.repli }); return r; };

  // S1 — urgence : orientation sur l'appareil (aucune violation possible, avec ou sans gouvernance).
  agir('S1', { demandeur: 'orientation', action: 'orientation.structures', categories: ['position_arrondie'], finalite: 'orientation', destination: 'appareil', entree: { issue: 'urgence' } });

  // S2 — médicament sensible : la requête irait au serveur ; gouvernée, elle reste sur l'appareil.
  const r2 = agir('S2', { demandeur: 'ressources', action: 'ressources.rechercher_medicament', categories: ['requete_medicament', 'vie_sexuelle'], finalite: 'recherche', destination: 'serveur_cmr' },
    () => serveur.requetes.push({ dci: DCI_SENSIBLE }));
  if (r2.decision.repli === 'appareil') agir('S2', { demandeur: 'ressources', action: 'ressources.telecharger_tuile', categories: ['aucune_donnee_personnelle'], finalite: 'recherche', destination: 'serveur_cmr' });
  agir('S2', { demandeur: 'fiabilite', action: 'fiabilite.enregistrer_signalement_sensible', categories: ['signalement'], finalite: 'fiabilite', destination: 'serveur_cmr' },
    (d) => serveur.requetes.push(d.conditions.includes('retirer_dci') ? { constat: 'introuvable' } : { constat: 'introuvable', dci: DCI_SENSIBLE, pseudonyme: `hmac:${'a'.repeat(64)}` }));

  // S3 — regroupement : contributions, validation humaine, demande nominative, publication agrégée.
  const consentements = { surveillance: true };
  for (let i = 0; i < 12; i++) agir('S3', { demandeur: 'surveillance', action: 'surveillance.contribuer', categories: ['contribution_agregee'], finalite: 'surveillance', destination: 'serveur_cmr', consentements });
  let statut = 'a_trier';
  if (gouvernance) {
    journal.ecrire({ agent: 'surveillance', action: 'surveillance.valider_signal', decision: 'VALIDE', mode, contributeurs: ['point_focal'], fragments: ['CMR-MINSANTE-GUIDE-SBC-2023::0018'], justification_code: 'SIGNAL_VERIFIE_DEUX_SOURCES', validateur_humain: { role: 'point_focal', id: 'jeton:PF-01' } });
    statut = 'valide';
  }
  agir('S3', { demandeur: 'district', action: 'surveillance.transmettre_donnees_individuelles', categories: ['donnees_individuelles_surveillance'], finalite: 'surveillance', destination: 'district', consentements },
    () => serveur.individuelles.push(...Array.from({ length: 12 }, (_, i) => ({ cas: i + 1, position: 'precise_fictive' }))));
  agir('S3', { demandeur: 'surveillance', action: 'surveillance.publier_carte', categories: ['contribution_agregee'], finalite: 'surveillance', destination: 'district', consentements },
    () => serveur.publications.push({ statut }));

  // S4 — pistes du module POC : envoyées au serveur pour des statistiques ; gouvernées, calculées sur l'appareil.
  const entree = { module: MODULE_POC.version, empreinte_modele: MODULE_POC.empreinte, nombre: 3 };
  const r4 = agir('S4', { demandeur: 'pistes', action: 'diagnostic.afficher_hypotheses', categories: ['symptomes_codes'], finalite: 'orientation', destination: 'serveur_cmr', entree },
    () => serveur.pistes.push({ nombre: 3, niveau: 'hopital_district' }));
  if (r4.decision.repli === 'appareil') agir('S4', { demandeur: 'pistes', action: 'diagnostic.afficher_hypotheses', categories: ['symptomes_codes'], finalite: 'orientation', destination: 'appareil', entree });

  // Constat des violations (liste fermée).
  const violations = [];
  const texte = JSON.stringify(journal.lire());
  serveur.requetes.filter((q) => q.dci === DCI_SENSIBLE).forEach(() => violations.push({ type: 'recherche_sensible_journalisee', parcours: 'S2', detail: DCI_SENSIBLE }));
  if (texte.includes(DCI_SENSIBLE) && !serveur.requetes.some((q) => q.dci)) violations.push({ type: 'recherche_sensible_journalisee', parcours: 'S2', detail: 'journal' });
  for (const e of journal.lire()) {
    const cats = e.entree_minimisee?.categories || [];
    if (cats.some((c) => c in CATEGORIES_ART48) && autorise({ verdict: e.decision })) violations.push({ type: 'categorie_interdite_traitee', parcours: e.session.replace('demo:', ''), detail: e.action });
  }
  if (serveur.individuelles.length) violations.push({ type: 'donnees_individuelles_transmises', parcours: 'S3', detail: `${serveur.individuelles.length}` });
  serveur.publications.filter((p) => p.statut === 'a_trier').forEach(() => violations.push({ type: 'signal_sans_validation_humaine', parcours: 'S3', detail: 'surveillance.publier_carte' }));
  if (serveur.pistes.length) violations.push({ type: 'diagnostic_emis', parcours: 'S4', detail: 'diagnostic.afficher_hypotheses' });

  return { gouvernance, mode, parcours: PARCOURS, etapes, violations, journal: journal.lire(), chaineValide: journal.verifier() === null };
}
