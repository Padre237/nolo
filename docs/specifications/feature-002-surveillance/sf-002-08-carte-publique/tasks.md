# SF-002-08 — Carte épidémiologique publique — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-208, FR-255 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-002-08-01 — Carte publique
- Exigences : FR-208, FR-255
- Conception : DES-002-08-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/carte.js`, `app/js/app.js` (route `#/carte`)
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-08-01, TEST-002-08-02 réussis
- Tests : TEST-002-08-01, TEST-002-08-02
- Statut : À faire

