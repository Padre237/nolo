"""SF-001-03 (TASK-001-03-06, FR-126) — Agent Triage côté serveur : extraction par LLM local, filtrée.

Le LLM ne propose que des jetons ; seuls les jetons utilisables du référentiel sont renvoyés ; le journal garde
l'empreinte du texte et le nombre de refus, jamais le texte ni les jetons refusés. Le LLM ne fixe aucun niveau.
"""
from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Callable

from ..domain.referentiel_symptomes import charger_referentiel, filtrer_propositions
from ..gouvernance.journal import empreinte

REF = Path(__file__).resolve().parents[3] / "data" / "referentiels"


class AgentTriage:
    nom = "triage"

    def __init__(self, journal, llm: Callable[[str], list[str]] | None):
        self.journal = journal
        self.llm = llm
        self.entrees, self.meta = charger_referentiel(REF)

    def extraire(self, texte: str, mode: str, session: str = "anonyme", horodatage: datetime | None = None) -> dict:
        propositions = self.llm(texte)
        gardes, refuses = filtrer_propositions(propositions, self.entrees)
        evt = self.journal.ecrire(
            agent=self.nom, contributeurs=["llm_local"], action="triage.resultat_extraction",
            decision="EXTRACTION_FILTREE", mode=mode, session=session,
            entree_minimisee={"categories": ["symptomes_codes"], "destination": "serveur_cmr",
                              "empreinte_entree": empreinte(texte), "entree": {"retenus": len(gardes), "refuses": refuses}},
            justification_code="PROPOSITIONS_FILTREES", horodatage=horodatage)
        return {"jetons": gardes, "refuses": refuses, "version_referentiel": self.meta["version"], "ref_audit": evt["event_id"]}
