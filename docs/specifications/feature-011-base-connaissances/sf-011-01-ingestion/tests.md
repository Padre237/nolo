# SF-011-01 — Ingestion et découpage des sources — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1101, FR-1102, FR-1103, FR-1104 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-011-01-01 — Reconstruction identique
- Type : Intégration
- Exigences : FR-1101, FR-1103
- Critères d'acceptation : CA-011-01-01
- Étant donné : la version publique
- Quand : `python3 tools/verifier_base.py --reconstruire`
- Alors : fichier reconstruit identique
- Données : —
- Automatisation : `tools/verifier_base.py`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-011-01-02 — Schéma des fragments
- Type : Unitaire
- Exigences : FR-1102
- Critères d'acceptation : CA-011-01-02
- Étant donné : kb_chunks.jsonl
- Quand : `python3 tools/verifier_base.py`
- Alors : champs présents, identifiants uniques, aucun vide
- Données : —
- Automatisation : `tools/verifier_base.py`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-011-01-03 — 22 sources
- Type : Unitaire
- Exigences : FR-1104
- Critères d'acceptation : CA-011-01-03
- Étant donné : sources.json
- Quand : lecture
- Alors : 22 entrées
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

