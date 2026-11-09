"""SF-001-03 (TASK-001-03-05, TASK-001-03-06) — Filtre des propositions du LLM et route d'extraction
(TEST-001-03-09 à TEST-001-03-11). La route est appelée en ASGI direct, sans client HTTP externe."""
import asyncio
import json
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(RACINE))

from src.server.agents.orchestrateur import Orchestrateur  # noqa: E402
from src.server.api.orientation import creer_app_orientation  # noqa: E402
from src.server.domain.referentiel_symptomes import charger_referentiel, filtrer_propositions  # noqa: E402
from src.server.gouvernance.journal import JournalAudit  # noqa: E402
from src.server.gouvernance.politique import Politique  # noqa: E402

REF = RACINE / "data" / "referentiels"
PROPOSITIONS = ["toux", "priapisme", "grossesse", "jeton_inconnu"]


def llm_double(texte: str) -> list[str]:
    return list(PROPOSITIONS)


def appeler(app, corps, entetes=None):
    brut = corps if isinstance(corps, bytes) else json.dumps(corps).encode()
    scope = {"type": "http", "asgi": {"version": "3.0"}, "http_version": "1.1", "method": "POST", "scheme": "http",
             "path": "/api/v1/orientation/extraction", "raw_path": b"/api/v1/orientation/extraction", "query_string": b"",
             "root_path": "", "server": ("test", 80), "client": ("test", 1),
             "headers": [(b"content-type", b"application/json"), *[(k.lower().encode(), v.encode()) for k, v in (entetes or {}).items()]]}
    envoye = {"fait": False}
    recu = []

    async def receive():
        if envoye["fait"]:
            return {"type": "http.disconnect"}
        envoye["fait"] = True
        return {"type": "http.request", "body": brut, "more_body": False}

    async def send(m):
        recu.append(m)

    asyncio.run(app(scope, receive, send))
    statut = next(m["status"] for m in recu if m["type"] == "http.response.start")
    corps_r = b"".join(m.get("body", b"") for m in recu if m["type"] == "http.response.body")
    return statut, json.loads(corps_r)


def nouvelle_app(tmp_path, mode="demo_synthetique"):
    pol = Politique.charger(RACINE / "config" / "policy.yaml")
    journal = JournalAudit(tmp_path / "audit.jsonl", pol)
    orch = Orchestrateur(pol, journal, lancement_demo=(mode == "demo_synthetique"))
    if mode != "demo_synthetique":
        orch.mode = mode
    return creer_app_orientation(orch, llm_double), journal


def test_filtrer_propositions_ne_garde_que_les_jetons_utilisables():          # TEST-001-03-09
    entrees, _ = charger_referentiel(REF)
    assert filtrer_propositions(PROPOSITIONS, entrees) == (["toux"], 3)


def test_route_extraction_codes_de_reponse(tmp_path):                         # TEST-001-03-10
    app, _ = nouvelle_app(tmp_path)
    ok = {"X-Consentements": "orientation=1"}
    s, c = appeler(app, {"texte": "je tousse depuis hier"}, ok)
    assert s == 200 and c["jetons"] == ["toux"] and c["refuses"] == 3 and set(c) == {"jetons", "refuses", "version_referentiel", "ref_audit"}
    assert appeler(app, {"texte": "je tousse"})[1]["erreur"] == "E-CONF-003"
    s, c = appeler(app, {"texte": "je tousse", "tranche_age": "18_50_ans"}, ok)
    assert (s, c["erreur"]) == (422, "E-VAL-004")
    s, c = appeler(app, {}, ok)
    assert (s, c["erreur"]) == (422, "E-VAL-001")
    s, c = appeler(app, json.dumps({"texte": "x" * 40000}).encode(), ok)
    assert (s, c["erreur"]) == (413, "E-VAL-005")
    app2, _ = nouvelle_app(tmp_path / "b", mode="sans_donnees_personnelles")
    s, c = appeler(app2, {"texte": "je tousse"}, ok)
    assert (s, c["erreur"]) == (403, "E-MODE-001")


def test_journal_de_l_extraction_sans_texte_ni_jeton_refuse(tmp_path):        # TEST-001-03-11
    app, journal = nouvelle_app(tmp_path)
    appeler(app, {"texte": "je tousse depuis hier"}, {"X-Consentements": "orientation=1"})
    evts = journal.lire()
    brut = json.dumps(evts, ensure_ascii=False)
    for interdit in ("tousse", "priapisme", "grossesse", "jeton_inconnu"):
        assert interdit not in brut, interdit
    resultat = [e for e in evts if e["action"] == "triage.resultat_extraction"][0]
    assert resultat["entree_minimisee"]["entree"]["refuses"] == 3
    assert resultat["entree_minimisee"]["empreinte_entree"].startswith("sha256:")
    assert journal.verifier_chaine() == []
