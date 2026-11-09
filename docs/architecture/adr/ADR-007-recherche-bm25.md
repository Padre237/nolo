# ADR-007 — Recherche documentaire : BM25 par défaut

Statut : Existant (à confirmer) · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
La base de connaissances existe (1 887 fragments) avec une recherche BM25 évaluée à 20/20 le 2026-11-03 ; ChromaDB et Ollama ne s'installent pas ici.

## Décision
BM25 (`kb/bm25.py`) est la recherche de référence de l'agent Conformité ; l'option embeddings (`kb/ingest_chroma.py`, Ollama `nomic-embed-text`, ChromaDB) reste disponible chez l'équipe.

## Conséquences
La qualité de recherche est mesurée par `kb/eval/run_eval.py` à chaque modification de la base.

## Alternatives écartées
Embeddings seuls : non testables ici.

## Exigences concernées
SC-704, FR-702
