# SF-011-08 — Base embarquée dans Nolo pour les agents — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1127, FR-1128, FR-1129, NFR-1101 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-011-08-01 — Tests puis export et lecture
- Exigences : FR-1127, FR-1128, FR-1129
- Conception : DES-011-08-01, DES-011-08-02
- Fichiers à lire : `kb/kb_chunks.jsonl`, `kb/traductions/citations_en.yaml`, `config/policy.yaml`, `src/server/agents/conformite.py`
- Fichiers à créer ou modifier : `tools/exporter_base.py`, `app/data/base.json`, `app/js/domain/base.js`, `app/sw.js`, `app/tests/base.test.mjs`
- Résultat attendu : Tests verts
- Dépend de : —
- Condition de fin : TEST-011-08-01, TEST-011-08-02, TEST-011-08-03 réussis
- Tests : TEST-011-08-01, TEST-011-08-02, TEST-011-08-03
- Statut : À faire

