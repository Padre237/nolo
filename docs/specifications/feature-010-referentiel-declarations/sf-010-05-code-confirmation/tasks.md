# SF-010-05 — Code de confirmation de l'e-mail — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1023, FR-1024, FR-1025 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-05-01 — Écran et règles du code
- Exigences : FR-1023, FR-1024, FR-1025
- Conception : DES-010-05-01, DES-010-05-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/code.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-05-01, TEST-010-05-02, TEST-010-05-03 réussis
- Tests : TEST-010-05-01, TEST-010-05-02, TEST-010-05-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

