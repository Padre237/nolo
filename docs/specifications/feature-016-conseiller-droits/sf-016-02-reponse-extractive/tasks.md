# SF-016-02 — Réponse extractive citée et refus sans fondement — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2206, FR-2207, FR-2208, FR-2209 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-016-02-01 — Tests puis composition
- Exigences : FR-2206, FR-2207, FR-2208, FR-2209
- Conception : DES-016-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/conseiller_reponse.test.mjs`, `app/js/agents/conseiller/repondre.js`
- Résultat attendu : Tests verts
- Dépend de : SF-016-01
- Condition de fin : TEST-016-02-01, TEST-016-02-02, TEST-016-02-03, TEST-016-02-04 réussis
- Tests : TEST-016-02-01, TEST-016-02-02, TEST-016-02-03, TEST-016-02-04
- Statut : Fait (2026-11-09) — `app/js/agents/conseiller/repondre.js` (seuil de pertinence 8, BR-016-02-01)

