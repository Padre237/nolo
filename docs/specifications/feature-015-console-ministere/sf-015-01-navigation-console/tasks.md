# SF-015-01 — Navigation de la console et chiffres d'en-tête — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2101, FR-2102 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-015-01-01 — Navigation et bandeau
- Exigences : FR-2101, FR-2102
- Conception : DES-015-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-015-01-01, TEST-015-01-02 réussis
- Tests : TEST-015-01-01, TEST-015-01-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

