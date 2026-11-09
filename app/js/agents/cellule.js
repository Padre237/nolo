// Nolo — cellule de coordination autour d'un signal (SF-007-19) : six positions datées, chacune limitée
// à son mandat (FR-1922), journalisées ; un désaccord n'est jamais tranché en faveur du partage ; seule la
// décision humaine du point focal clôt l'échange (Principe VI, FR-1924).
import { publiable } from '../domain/surveillance.js';

/** Ce que chaque agent reçoit et produit (FR-1922). */
export const MANDATS = {
  surveillance: { recoit: ['agregats'], produit: 'proposition_signal' },
  conformite: { recoit: ['demande'], produit: 'decision_citee' },
  district: { recoit: ['agregats'], produit: 'demande' },
  apdp: { recoit: ['demande', 'decision'], produit: 'avis' },
  point_focal: { recoit: ['fil'], produit: 'decision_humaine' },
};
const SBC = ['CMR-MINSANTE-GUIDE-SBC-2023::0018'];
const POINT_FOCAL = { role: 'point_focal', id: 'jeton:PF-01' };

export function derouler(signal, { orchestrateur, horloge = () => new Date(), avisApdp = 'conforme', decisionPointFocal = null }) {
  const { journal } = orchestrateur;
  const t0 = horloge().getTime();
  const quand = (i) => new Date(t0 + i * 20 * 60e3);
  const agregats = { aire: signal.zone, syndrome: signal.syndrome, semaine: signal.semaine, cas_publies: publiable(signal.cas) };
  const positions = [];
  const poser = (p) => { positions.push({ ...p, mandat: MANDATS[p.agent], date: quand(positions.length).toISOString() }); };
  const consentements = { surveillance: true };

  // 1. Surveillance propose le signal, sur agrégats seulement.
  const e1 = journal.ecrire({ agent: 'surveillance', action: 'surveillance.proposer_signal', decision: 'A_TRIER', mode: orchestrateur.mode, contributeurs: ['surveillance'], fragments: SBC, justification_code: 'CUSUM_DEPASSE', horodatage: quand(0), entree_minimisee: { categories: ['contribution_agregee'], destination: 'district', empreinte_entree: null, entree: agregats } });
  poser({ agent: 'surveillance', recu: agregats, position: 'signal_a_trier', decision: 'A_TRIER', fragments: SBC, ref: e1.event_id });

  // 2. Conformité contrôle la publication des agrégats (seuil, décalage).
  const c1 = orchestrateur.executer({ demandeur: 'surveillance', action: 'surveillance.publier_carte', categories: ['contribution_agregee'], finalite: 'surveillance', destination: 'district', consentements });
  poser({ agent: 'conformite', recu: { demande: 'surveillance.publier_carte' }, position: c1.decision.verdict, decision: c1.decision.verdict, conditions: c1.decision.conditions, fragments: c1.decision.fragments, ref: c1.decision.refAudit });

  // 3. Le District, qui ne reçoit que les agrégats, demande la liste nominative.
  const e3 = journal.ecrire({ agent: 'district', action: 'district.demander_liste_nominative', decision: 'DEMANDE', mode: orchestrateur.mode, contributeurs: ['district'], fragments: [], justification_code: 'INVESTIGATION', horodatage: quand(2), entree_minimisee: { categories: ['contribution_agregee'], destination: 'district', empreinte_entree: null, entree: agregats } });
  poser({ agent: 'district', recu: agregats, position: 'demande_liste_nominative', decision: 'DEMANDE', fragments: [], ref: e3.event_id });

  // 4. Conformité décide sur cette demande : bloquée, repli agrégat (FR-1923).
  const c2 = orchestrateur.executer({ demandeur: 'district', action: 'surveillance.transmettre_donnees_individuelles', categories: ['donnees_individuelles_surveillance'], finalite: 'surveillance', destination: 'district', consentements });
  poser({ agent: 'conformite', recu: { demande: 'surveillance.transmettre_donnees_individuelles' }, position: c2.decision.verdict, decision: c2.decision.verdict, repli: c2.decision.repli, fragments: c2.decision.fragments, ref: c2.decision.refAudit });

  // 5. L'APDP (simulée) reçoit la demande et la décision, jamais les données.
  const recuApdp = { demande: 'liste_nominative', decision: c2.decision.verdict };
  const e5 = journal.ecrire({ agent: 'apdp', action: 'apdp.avis', decision: avisApdp === 'defavorable' ? 'DEFAVORABLE' : 'CONFORME', mode: orchestrateur.mode, contributeurs: ['apdp'], fragments: ['CMR-LOI-2024-017::0020'], justification_code: avisApdp === 'defavorable' ? 'AVIS_DEFAVORABLE' : 'DECISION_CONFORME', horodatage: quand(4), entree_minimisee: { categories: [], destination: null, empreinte_entree: null, entree: recuApdp } });
  poser({ agent: 'apdp', recu: recuApdp, position: avisApdp === 'defavorable' ? 'avis_defavorable' : 'avis_conforme', decision: avisApdp === 'defavorable' ? 'DEFAVORABLE' : 'CONFORME', fragments: ['CMR-LOI-2024-017::0020'], ref: e5.event_id });

  // Désaccord : District (demande) contre APDP (défavorable) ; jamais tranché automatiquement.
  const desaccord = avisApdp === 'defavorable';
  if (desaccord) journal.ecrire({ agent: 'orchestrateur', action: 'cellule.desaccord', decision: 'EN_ATTENTE_DECISION_HUMAINE', mode: orchestrateur.mode, contributeurs: ['district', 'apdp'], fragments: [], justification_code: 'DESACCORD_ENTRE_AGENTS', horodatage: quand(4) });

  // 6. Seul le point focal clôt l'échange.
  if (decisionPointFocal) {
    const e6 = journal.ecrire({ agent: 'point_focal', action: 'surveillance.decision_point_focal', decision: decisionPointFocal.statut.toUpperCase(), mode: orchestrateur.mode, contributeurs: ['point_focal'], fragments: SBC, justification_code: 'DECISION_HUMAINE', validateur_humain: POINT_FOCAL, horodatage: quand(5) });
    poser({ agent: 'point_focal', recu: { fil: positions.length }, position: decisionPointFocal.statut, decision: decisionPointFocal.statut.toUpperCase(), motif: decisionPointFocal.motif, fragments: SBC, ref: e6.event_id });
  } else {
    poser({ agent: 'point_focal', recu: { fil: positions.length }, position: 'attente_decision_humaine', decision: 'EN_ATTENTE', fragments: [] });
  }
  return { signal: signal.id, positions, desaccord, clos: !!decisionPointFocal };
}
