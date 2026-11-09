# SF-007-02 — Orchestration et contrôle préalable obligatoire — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-701, FR-725, FR-726 |

## 1. Environnement et données
Python 3 + pytest + PyYAML (`python3 -m pytest -q`) ; scénarios `python3 tools/scenarios/executer.py --scenario <id> [--sans-gouvernance] [--politique config/variantes/<v>.yaml]`. Base v9 (`kb/kb_chunks.jsonl`). Pour Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-02-01 — Journaliser puis exécuter
- Type : Unitaire
- Exigences : FR-701, FR-725
- Critères d'acceptation : CA-007-02-01
- Étant donné : deux actions
- Quand : `executer`
- Alors : deux entrées ; une exécution
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_orchestrateur_journalise_et_execute` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-007-02-02 — Entrée minimisée hors démo
- Type : Unitaire
- Exigences : FR-726
- Critères d'acceptation : CA-007-02-02
- Étant donné : mode sans données personnelles
- Quand : journalisation
- Alors : entrée non conservée
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_hors_demo_l_entree_n_est_pas_conservee` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

