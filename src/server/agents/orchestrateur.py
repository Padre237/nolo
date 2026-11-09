"""SF-007-02 (incrément démo D-025) — Orchestrateur : aucune action ne s'exécute sans décision de
l'agent Conformité (Principe III), chaque décision est journalisée avec l'agent décideur et les
contributeurs (FR-709), le mode est résolu depuis la politique (FR-714, §5 des contrats)."""
from __future__ import annotations

from dataclasses import dataclass, replace
from datetime import datetime
from typing import Any, Callable

from ..gouvernance.contrats import Contexte, DecisionConformite
from ..gouvernance.journal import JournalAudit, empreinte
from .conformite import AgentConformite, nouvelle_demande


def resoudre_mode(politique, lancement_demo: bool = False) -> str:
    """§5 : démo si demandé au lancement ; complet si autorisation APDP + référence ; sinon sans DP."""
    if lancement_demo:
        return "demo_synthetique"
    aut = politique.valeur("autorisation_prealable.traitement_donnees_personnelles")
    if aut.get("autorisation_apdp_obtenue") and aut.get("reference_autorisation"):
        return "complet"
    return politique.valeur("autorisation_prealable.mode_production_si_pas_autorisation")


@dataclass
class ResultatOrchestre:
    decision: DecisionConformite
    evenement: dict
    resultat: Any = None


class Orchestrateur:
    nom = "orchestrateur"

    def __init__(self, politique, journal: JournalAudit, conformite=None,
                 horloge: Callable[[], datetime] | None = None, lancement_demo: bool = True):
        self.politique = politique
        self.journal = journal
        self.conformite = conformite or AgentConformite(politique)
        self.mode = resoudre_mode(politique, lancement_demo)
        self.horloge = horloge or journal.horloge

    def contexte(self, session: str = "anonyme", consentements: dict | None = None,
                 mineur: bool = False, role: str = "citoyen") -> Contexte:
        return Contexte(session=session, mode=self.mode, maintenant=self.horloge(),
                        consentements=consentements or {}, mineur=mineur,
                        politique=self.politique, role=role)

    def executer(self, *, demandeur: str, action: str, categories: tuple[str, ...], finalite: str,
                 destination: str, contexte: Contexte, entree: Any = None,
                 executeur: Callable[[tuple[str, ...]], Any] | None = None,
                 validateur_humain: dict | None = None) -> ResultatOrchestre:
        demande = nouvelle_demande(demandeur, action, categories, finalite, destination, contexte)
        decision = self.conformite.decider(demande)
        evt = self.journal.ecrire(
            agent=getattr(self.conformite, "nom", "conformite"),
            contributeurs=[demandeur, self.nom],
            action=action,
            decision=decision.verdict,
            mode=contexte.mode,
            session=contexte.session,
            entree_minimisee={
                "categories": list(categories),
                "destination": destination,
                "empreinte_entree": empreinte(entree) if entree is not None else None,
                # L'entrée complète n'est conservée qu'en mode démo (D-016) :
                "entree": entree if contexte.mode == "demo_synthetique" else None,
            },
            fragments=list(decision.fragments),
            cles_politique=list(decision.cles_politique),
            repli=decision.repli,
            justification_code=decision.justification_code,
            validateur_humain=validateur_humain,
            horodatage=contexte.maintenant,
        )
        decision = replace(decision, ref_audit=evt["event_id"])
        resultat = None
        if decision.verdict in ("AUTORISE", "AUTORISE_AVEC_CONDITIONS") and executeur is not None:
            resultat = executeur(decision.conditions)
        return ResultatOrchestre(decision, evt, resultat)
