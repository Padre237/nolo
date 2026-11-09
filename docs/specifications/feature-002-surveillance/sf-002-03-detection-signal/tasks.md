# SF-002-03 — Détection des regroupements (CUSUM) et définitions de cas — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-203, FR-230, FR-231, FR-232 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-002-03-01 — CUSUM et signaux
- Exigences : FR-230, FR-231, FR-232
- Conception : DES-002-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/surveillance.js`
- Résultat attendu : Exactement deux signaux
- Dépend de : —
- Condition de fin : TEST-002-03-01, TEST-002-03-03 réussis
- Tests : TEST-002-03-01, TEST-002-03-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-002-03-02 — Définition SC dans la console
- Exigences : FR-203
- Conception : DES-002-03-02
- Fichiers à lire : `kb/rules/sbc_definitions.yaml`
- Fichiers à créer ou modifier : `app/js/domain/surveillance.js` (`definitionSc`), console
- Résultat attendu : Définition affichée
- Dépend de : —
- Condition de fin : TEST-002-03-02 réussis
- Tests : TEST-002-03-02
- Statut : À faire

