# SF-011-04 — Évaluation de la recherche — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1113, FR-1114 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-011-04-01 — 33/40 et 29/40
- Type : Intégration
- Exigences : FR-1113
- Critères d'acceptation : CA-011-04-01
- Étant donné : la v9
- Quand : `python3 -I kb/eval/run_eval.py --embed bm25`
- Alors : 33/40 ; 29/40
- Données : —
- Automatisation : —
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-011-04-02 — Preuve datée
- Type : Revue
- Exigences : FR-1114
- Critères d'acceptation : CA-011-04-02
- Étant donné : `docs/quality/`
- Quand : lecture
- Alors : fichier présent
- Données : —
- Automatisation : `python3 -I kb/eval/run_eval.py --embed bm25`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

