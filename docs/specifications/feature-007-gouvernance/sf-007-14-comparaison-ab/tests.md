# SF-007-14 — Comparaison avec et sans gouvernance (serveur) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-14 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-710, FR-780 |

## 1. Environnement et données
Python 3 + pytest + PyYAML (`python3 -m pytest -q`) ; scénarios `python3 tools/scenarios/executer.py --scenario <id> [--sans-gouvernance] [--politique config/variantes/<v>.yaml]`. Base v9 (`kb/kb_chunks.jsonl`). Pour Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-14-01 — Violations nommées
- Type : Intégration
- Exigences : FR-710, FR-780
- Critères d'acceptation : CA-007-14-01
- Étant donné : S2 et S3
- Quand : exécution sans puis avec gouvernance
- Alors : violations puis zéro
- Données : —
- Automatisation : `tests/integration/test_scenarios_demo.py::test_scenario_medicament_sensible_sans_gouvernance` (`python3 -m pytest -q`), `test_scenario_regroupement_sans_gouvernance`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

