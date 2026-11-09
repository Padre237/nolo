"""SF-001-03 (TASK-001-03-06) — Route POST /api/v1/orientation/extraction (Starlette).

Ordre : schéma fermé (E-VAL-001, -004, -005) → décision de Conformité sur `triage.extraction_llm` (mode : E-MODE-001 ;
consentement exprès d'orientation, en-tête `X-Consentements: orientation=1` : E-CONF-003 ; autre refus : E-CONF-001)
→ LLM local (absent : E-INDISP-001, repli lexical sur l'appareil) → filtre et journal (agent Triage).
"""
from __future__ import annotations

import json

from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import Route

from ..agents.triage import AgentTriage
from .schemas.orientation import valider

STATUT = {"E-VAL-001": 422, "E-VAL-004": 422, "E-VAL-005": 413, "E-MODE-001": 403, "E-CONF-003": 403, "E-CONF-001": 403,
          "E-INDISP-001": 503}


def consentements(entete: str) -> dict:
    out = {}
    for morceau in entete.split(","):
        if "=" in morceau:
            k, v = morceau.split("=", 1)
            out[k.strip()] = v.strip() == "1"
    return out


def creer_app_orientation(orchestrateur, llm) -> Starlette:
    triage = AgentTriage(orchestrateur.journal, llm)

    def erreur(code):
        return JSONResponse({"erreur": code}, status_code=STATUT[code])

    async def extraction(req: Request):
        brut = await req.body()
        try:
            corps = json.loads(brut or b"null")
        except ValueError:
            corps = None
        code = valider(brut, corps)
        if code:
            return erreur(code)  # rejet sans traitement ni journalisation du contenu
        ctx = orchestrateur.contexte(consentements=consentements(req.headers.get("x-consentements", "")))
        r = orchestrateur.executer(demandeur="triage", action="triage.extraction_llm", categories=("texte_nettoye",),
                                   finalite="orientation", destination="serveur_cmr", contexte=ctx)
        d = r.decision
        if d.verdict not in ("AUTORISE", "AUTORISE_AVEC_CONDITIONS"):
            return erreur({"FONCTION_INDISPONIBLE_MODE": "E-MODE-001",
                           "CONSENTEMENT_EXPRES_MANQUANT": "E-CONF-003"}.get(d.justification_code, "E-CONF-001"))
        if llm is None:
            return erreur("E-INDISP-001")
        return JSONResponse(triage.extraire(corps["texte"], orchestrateur.mode, horodatage=ctx.maintenant))

    return Starlette(routes=[Route("/api/v1/orientation/extraction", extraction, methods=["POST"])])
