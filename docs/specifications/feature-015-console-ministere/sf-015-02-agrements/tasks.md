# SF-015-02 — Vérification des agréments — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2106, FR-2107, FR-2108 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-015-02-01 — File et décisions
- Exigences : FR-2106, FR-2107, FR-2108
- Conception : DES-015-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-015-02-01, TEST-015-02-02, TEST-015-02-03 réussis
- Tests : TEST-015-02-01, TEST-015-02-02, TEST-015-02-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

