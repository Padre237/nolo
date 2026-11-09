# SF-012-03 — Scénarios S1 à S3 et exécuteur — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1207, FR-1208, FR-1209 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-012-03-01 — Scénario regroupement
- Type : Intégration
- Exigences : FR-1207, FR-1208
- Critères d'acceptation : CA-012-03-01
- Étant donné : S3
- Quand : exécution
- Alors : 7 étapes conformes ; 25 événements ; code 0
- Données : —
- Automatisation : `tests/integration/test_scenarios_demo.py::test_scenario_regroupement_gouvernance` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-012-03-02 — Export des attendus
- Type : Intégration
- Exigences : FR-1209
- Critères d'acceptation : CA-012-03-02
- Étant donné : S1 à S3
- Quand : `--exporter-attendus`
- Alors : fichier produit
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

