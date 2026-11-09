"""Contrats partagés des agents (§1 et §2 de docs/architecture/shared/governance-contracts.md)."""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Literal

Verdict = Literal["AUTORISE", "AUTORISE_AVEC_CONDITIONS", "BLOQUE", "BLOQUE_SANS_FONDEMENT"]
MODES = ("demo_synthetique", "sans_donnees_personnelles", "complet")


@dataclass(frozen=True)
class Contexte:
    session: str                      # "anonyme", "hmac:<…>" ou "demo:<scenario>"
    mode: str                         # demo_synthetique | sans_donnees_personnelles | complet
    maintenant: datetime              # horloge injectée (ADR-013)
    consentements: dict[str, bool] = field(default_factory=dict)
    mineur: bool = False
    politique: Any = None             # Politique, version figée pour la requête
    role: str = "citoyen"


@dataclass(frozen=True)
class DemandeConformite:
    demande_id: str
    agent_demandeur: str
    action: str                       # catalogue §3
    categories_donnees: tuple[str, ...]
    finalite: str                     # orientation | surveillance | recherche | fiabilite | moderation | audit | simulation | demonstration
    destination: str                  # appareil | serveur_cmr | hors_cmr | district | externe:<nom>
    contexte: Contexte


@dataclass(frozen=True)
class DecisionConformite:
    demande_id: str
    verdict: Verdict
    conditions: tuple[str, ...] = ()
    fragments: tuple[str, ...] = ()
    cles_politique: tuple[str, ...] = ()
    version_politique: str = ""
    repli: str | None = None
    justification_code: str = ""
    ref_audit: str = ""
