# SF-015-06 — Registre des lacunes dans la console — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2130, FR-2131 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-015-06-01 — Liste des lacunes
- Exigences : FR-2130
- Conception : DES-015-06-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : catalogues
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-015-06-01 réussis
- Tests : TEST-015-06-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-015-06-02 — Aligner le registre (fait le 2026-11-09) et tester la cohérence
- Exigences : FR-2131
- Conception : DES-015-06-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/lacunes.test.mjs`
- Résultat attendu : Mêmes listes
- Dépend de : —
- Condition de fin : TEST-015-06-02 réussis
- Tests : TEST-015-06-02
- Statut : Fait (2026-11-09) — `app/tests/qualite.test.mjs`

