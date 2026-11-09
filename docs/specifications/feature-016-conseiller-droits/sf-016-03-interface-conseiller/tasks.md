# SF-016-03 — Interface du conseiller (citoyen, établissement, ministère) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2211, FR-2212, FR-2213 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-016-03-01 — Écran et liens
- Exigences : FR-2211, FR-2212, FR-2213
- Conception : DES-016-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/droits.js`, `app/js/app.js`, catalogues
- Résultat attendu : Conforme
- Dépend de : SF-016-02
- Condition de fin : TEST-016-03-01, TEST-016-03-02, TEST-016-03-03 réussis
- Tests : TEST-016-03-01, TEST-016-03-02, TEST-016-03-03
- Statut : À faire

