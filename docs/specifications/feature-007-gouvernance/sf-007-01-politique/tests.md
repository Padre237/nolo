# SF-007-01 — Chargement et versionnement de la politique — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-720, FR-721, FR-722, FR-723 |

## 1. Environnement et données
Python 3 + pytest + PyYAML (`python3 -m pytest -q`) ; scénarios `python3 tools/scenarios/executer.py --scenario <id> [--sans-gouvernance] [--politique config/variantes/<v>.yaml]`. Base v9 (`kb/kb_chunks.jsonl`). Pour Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-01-01 — Valeur, source, variante
- Type : Unitaire
- Exigences : FR-720, FR-721, FR-722, FR-723
- Critères d'acceptation : CA-007-01-01
- Étant donné : `config/policy.yaml`
- Quand : lecture et variante
- Alors : conforme
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_politique_valeur_source_et_variante` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

