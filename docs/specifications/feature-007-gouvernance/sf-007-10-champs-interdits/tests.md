# SF-007-10 — Contrôle des champs interdits du journal — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-713, FR-765 |

## 1. Environnement et données
Python 3 + pytest + PyYAML (`python3 -m pytest -q`) ; scénarios `python3 tools/scenarios/executer.py --scenario <id> [--sans-gouvernance] [--politique config/variantes/<v>.yaml]`. Base v9 (`kb/kb_chunks.jsonl`). Pour Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-10-01 — Champ interdit rejeté
- Type : Unitaire
- Exigences : FR-713, FR-765
- Critères d'acceptation : CA-007-10-01
- Étant donné : événement interdit
- Quand : `ecrire`
- Alors : rejet et violation tracée
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_journal_rejette_les_champs_interdits` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

