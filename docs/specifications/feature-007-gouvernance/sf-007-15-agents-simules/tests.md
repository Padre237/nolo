# SF-007-15 — Agents institutionnels simulés (District/SIMR, APDP) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-15 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-711, FR-783 |

## 1. Environnement et données
Python 3 + pytest + PyYAML (`python3 -m pytest -q`) ; scénarios `python3 tools/scenarios/executer.py --scenario <id> [--sans-gouvernance] [--politique config/variantes/<v>.yaml]`. Base v9 (`kb/kb_chunks.jsonl`). Pour Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-15-01 — Positions distinctes
- Type : Intégration
- Exigences : FR-711
- Critères d'acceptation : CA-007-15-01
- Étant donné : S3
- Quand : exécution
- Alors : trois entrées
- Données : —
- Automatisation : `tests/integration/test_scenarios_demo.py::test_scenario_regroupement_gouvernance` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-007-15-02 — Mandats
- Type : Revue
- Exigences : FR-783
- Critères d'acceptation : CA-007-15-02
- Étant donné : le dépôt
- Quand : lecture
- Alors : un mandat par agent
- Données : —
- Automatisation : `tests/unit/test_vague_c.py::test_un_mandat_par_agent_institutionnel` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`)

