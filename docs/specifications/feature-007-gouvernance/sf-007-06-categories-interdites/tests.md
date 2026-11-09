# SF-007-06 — Blocage des catégories de l'art. 48 — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-712, FR-741 |

## 1. Environnement et données
Python 3 + pytest + PyYAML (`python3 -m pytest -q`) ; scénarios `python3 tools/scenarios/executer.py --scenario <id> [--sans-gouvernance] [--politique config/variantes/<v>.yaml]`. Base v9 (`kb/kb_chunks.jsonl`). Pour Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-06-01 — Dérogation simulée
- Type : Unitaire
- Exigences : FR-712, FR-741
- Critères d'acceptation : CA-007-06-01
- Étant donné : la politique 1.3.0
- Quand : `decider`
- Alors : conforme au critère
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_derogation_simulee_change_le_verdict` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

