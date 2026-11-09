# SF-016-01 — Recherche dans la base depuis le navigateur (BM25 et glossaire) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2201, FR-2202, FR-2203, FR-2204, NFR-2201 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-016-01-01 — Tests de parité et d'enrichissement (avant le code)
- Exigences : FR-2201, FR-2202, FR-2203, FR-2204
- Conception : DES-016-01-01, DES-016-01-02
- Fichiers à lire : `kb/bm25.py`, `kb/eval/questions_test.jsonl`, `kb/traductions/glossaire_requetes.yaml`
- Fichiers à créer ou modifier : `app/tests/conseiller_recherche.test.mjs`, `tools/exporter_classements.py` (oracle)
- Résultat attendu : Tests rouges
- Dépend de : —
- Condition de fin : TEST-016-01-01, TEST-016-01-02, TEST-016-01-03 réussis
- Tests : TEST-016-01-01, TEST-016-01-02, TEST-016-01-03
- Statut : Fait (2026-11-09) — `app/tests/conseiller.test.mjs`, `tools/exporter_classements.py` (oracle)

### TASK-016-01-02 — BM25 et glossaire en JavaScript
- Exigences : FR-2201, FR-2202, FR-2203, FR-2204
- Conception : DES-016-01-01, DES-016-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/agents/conseiller/`
- Résultat attendu : Tests verts
- Dépend de : SF-011-08
- Condition de fin : TEST-016-01-01, TEST-016-01-02, TEST-016-01-03 réussis
- Tests : TEST-016-01-01, TEST-016-01-02, TEST-016-01-03
- Statut : Fait (2026-11-09) — `app/js/agents/conseiller/bm25.js`, `app/js/agents/conseiller/glossaire.js` (glossaire 1.2.0, champ `courant_fr`, DES-016-01-03)

