# SF-015-05 — Simulation « et si » de la politique de surveillance — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2124, FR-2125, FR-2126 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-015-05-01 — Simulation
- Exigences : FR-2124
- Conception : DES-015-05-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/surveillance.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-015-05-01 réussis
- Tests : TEST-015-05-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-015-05-02 — Comparaison et réinitialisation
- Exigences : FR-2125, FR-2126
- Conception : DES-015-05-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-015-05-02, TEST-015-05-03 réussis
- Tests : TEST-015-05-02, TEST-015-05-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

