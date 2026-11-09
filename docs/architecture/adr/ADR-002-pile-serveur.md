# ADR-002 — Pile serveur : Python, Starlette, pydantic, SQLite

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
Le code de référence de l'UIT (CrashingGuru/ITUAIReadiness) utilise FastAPI, SQLModel, Ollama et ChromaDB. Dans l'environnement de vérification de Claude, PyPI est inaccessible : FastAPI, httpx et SQLModel ne s'installent pas, alors que Starlette (socle de FastAPI), uvicorn, pydantic 2, PyYAML, jsonschema, pytest et requests sont présents.

## Décision
Serveur ASGI Starlette ; schémas pydantic 2 ; stockage SQLite par `sqlite3` ; tests d'intégration par un client ASGI en processus écrit dans `tests/support/asgi_client.py` (sans httpx) ; serveur réel lancé par uvicorn pour les tests de bout en bout.

## Conséquences
Tous les tests sont exécutables par Claude. Le passage à FastAPI reste simple (mêmes modèles pydantic, mêmes routes) et pourra être fait par l'équipe après le hackathon. Pas de migration de schéma automatisée : schéma SQL versionné dans `src/server/storage/schema.sql`.

## Alternatives écartées
FastAPI + SQLModel : non testable ici ; Flask : écart avec le code UIT et pas d'ASGI.

## Exigences concernées
FR-701, toutes les routes
