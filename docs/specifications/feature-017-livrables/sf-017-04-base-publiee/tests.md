# SF-017-04 — Base de connaissances livrée — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2317, FR-2318 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-017-04-01 — Contenu de `kb/`
- Type : Revue
- Exigences : FR-2317
- Critères d'acceptation : CA-017-04-01
- Étant donné : `kb/`
- Quand : liste
- Alors : complet
- Données : —
- Automatisation : `tests/unit/test_vague_c.py::test_base_publiee_complete_et_readme` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`)

### TEST-017-04-02 — Procédure UIT
- Type : Revue
- Exigences : FR-2318
- Critères d'acceptation : CA-017-04-02
- Étant donné : README
- Quand : lecture
- Alors : présente
- Données : —
- Automatisation : `tests/unit/test_vague_c.py::test_base_publiee_complete_et_readme` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`)

