# SF-007-09 — Écriture du journal d'audit chaîné — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-706, FR-709, FR-760, FR-761 |

## 1. Environnement et données
Python 3 + pytest + PyYAML (`python3 -m pytest -q`) ; scénarios `python3 tools/scenarios/executer.py --scenario <id> [--sans-gouvernance] [--politique config/variantes/<v>.yaml]`. Base v9 (`kb/kb_chunks.jsonl`). Pour Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-09-01 — Chaîne valide
- Type : Unitaire
- Exigences : FR-706, FR-760
- Critères d'acceptation : CA-007-09-01
- Étant donné : trois entrées
- Quand : `verifier_chaine`
- Alors : aucune erreur
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_journal_chaine_et_verification` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-007-09-02 — Décideur et contributeurs
- Type : Intégration
- Exigences : FR-709
- Critères d'acceptation : CA-007-09-02
- Étant donné : scénario S3
- Quand : lecture du journal
- Alors : champs présents
- Données : —
- Automatisation : `tests/integration/test_scenarios_demo.py::test_scenario_regroupement_gouvernance` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-007-09-03 — HMAC
- Type : Unitaire
- Exigences : FR-761
- Critères d'acceptation : CA-007-09-03
- Étant donné : un identifiant
- Quand : `pseudonymiser` ×2
- Alors : stable, non réversible
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_pseudonyme_hmac_stable_et_non_reversible` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

