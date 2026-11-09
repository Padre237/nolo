// Nolo — orchestrateur (SF-007-17, FR-1901, FR-1905) : portage de `src/server/agents/orchestrateur.py`.
// Aucune action ne s'exécute sans décision de Conformité (Principe III) ; chaque décision est journalisée
// avec l'agent décideur et les contributeurs (FR-709, FR-1941) ; le mode est résolu depuis la politique.
import { decider } from './conformite.js';
import { empreinte } from '../core/canonique.js';

const VERDICTS = new Set(['AUTORISE', 'AUTORISE_AVEC_CONDITIONS', 'BLOQUE', 'BLOQUE_SANS_FONDEMENT']);

export class SansDecision extends Error {
  constructor(action) { super(`action exécutée sans décision de Conformité : ${action}`); this.code = 'E-AGENT-SANS-DECISION'; }
}

/** §5 des contrats : démonstration si demandée au lancement ; complet avec autorisation APDP ; sinon sans données personnelles. */
export function resoudreMode(politique, lancementDemo = true) {
  if (lancementDemo) return 'demo_synthetique';
  const aut = politique.valeur('autorisation_prealable.traitement_donnees_personnelles');
  if (aut.autorisation_apdp_obtenue && aut.reference_autorisation) return 'complet';
  return politique.valeur('autorisation_prealable.mode_production_si_pas_autorisation');
}

export function creerOrchestrateur({ politique, journal, conformite = decider, mode = resoudreMode(politique), nomConformite = 'conformite' }) {
  return {
    mode,
    politique,
    journal,
    /**
     * demande : { demandeur, action, categories, finalite, destination, consentements?, mineur?, entree?, validateur? }
     * faire(decision) n'est appelé que si la décision autorise.
     */
    executer(demande, faire = null) {
      const { demandeur, action, categories = [], finalite, destination, consentements = {}, mineur = false, entree, validateur = null, session = 'anonyme' } = demande;
      const d = conformite({ action, categories, finalite, destination, contexte: { mode, consentements, mineur } }, politique);
      if (!d || !VERDICTS.has(d.verdict)) throw new SansDecision(action);
      const evenement = journal.ecrire({
        agent: nomConformite,
        contributeurs: [demandeur, 'orchestrateur'],
        action,
        decision: d.verdict,
        mode,
        session,
        entree_minimisee: {
          categories: [...categories],
          destination,
          empreinte_entree: entree === undefined ? null : empreinte(entree),
          // L'entrée complète n'est conservée qu'en mode démo (D-016) ; elle ne contient jamais de texte libre.
          entree: entree !== undefined && mode === 'demo_synthetique' ? entree : null,
        },
        fragments: d.fragments,
        cles_politique: d.cles,
        repli: d.repli,
        justification_code: d.justification,
        validateur_humain: validateur,
      });
      const decision = { ...d, refAudit: evenement.event_id };
      const resultat = (d.verdict === 'AUTORISE' || d.verdict === 'AUTORISE_AVEC_CONDITIONS') && faire ? faire(decision) : null;
      return { decision, evenement, resultat };
    },
  };
}
