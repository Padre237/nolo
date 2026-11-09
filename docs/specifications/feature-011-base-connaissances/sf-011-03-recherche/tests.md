# SF-011-03 — Recherche documentaire (BM25 ; ChromaDB en option) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1109, FR-1110, FR-1111 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-011-03-01 — BM25
- Type : Intégration
- Exigences : FR-1109
- Critères d'acceptation : CA-011-03-01
- Étant donné : la v9
- Quand : `python3 -I kb/eval/run_eval.py --embed bm25`
- Alors : documents attendus et références exactes au top 5 mesurés sur la version publique (preuve datée)
- Données : —
- Automatisation : `kb/eval/run_eval.py`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-011-03-02 — ChromaDB
- Type : Intégration
- Exigences : FR-1110
- Critères d'acceptation : CA-011-03-02
- Étant donné : poste de l'équipe
- Quand : `python3 kb/ingest_chroma.py ingest --embed ollama`
- Alors : résultats
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-011-03-03 — Hybride
- Type : Intégration
- Exigences : FR-1111
- Critères d'acceptation : CA-011-03-03
- Étant donné : poste de l'équipe
- Quand : évaluation
- Alors : rapport comparatif
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

