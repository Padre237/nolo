# SF-007-11 — Consultation du journal et vérification de la chaîne (serveur) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-11 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-768, FR-769 |

## 1. Environnement et données
Python 3 + pytest + PyYAML (`python3 -m pytest -q`) ; scénarios `python3 tools/scenarios/executer.py --scenario <id> [--sans-gouvernance] [--politique config/variantes/<v>.yaml]`. Base v9 (`kb/kb_chunks.jsonl`). Pour Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-11-01 — Entrée modifiée signalée
- Type : Unitaire
- Exigences : FR-768
- Critères d'acceptation : CA-007-11-01
- Étant donné : une entrée altérée
- Quand : `verifier_chaine`
- Alors : entrée signalée
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_journal_chaine_et_verification` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-007-11-02 — Lecture d'une session
- Type : Intégration
- Exigences : FR-769
- Critères d'acceptation : CA-007-11-02
- Étant donné : journal S3
- Quand : `python3 tools/lire_journal.py tests/reports/…`
- Alors : 25 événements
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

