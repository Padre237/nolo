# SF-008-01 — Écran de première utilisation et consentement à l'orientation — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-106, FR-801, FR-802, FR-803, FR-804, FR-805, FR-806 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-008-01-01 — Logique du consentement
- Exigences : FR-801, FR-802, FR-803, FR-804
- Conception : DES-008-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/consent.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-008-01-01, TEST-008-01-02, TEST-008-01-03, TEST-008-01-04 réussis
- Tests : TEST-008-01-01, TEST-008-01-02, TEST-008-01-03, TEST-008-01-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-008-01-02 — Écran et garde de route
- Exigences : FR-801, FR-805, FR-806
- Conception : DES-008-01-02, DES-008-01-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/bienvenue.js`, `app/js/app.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-008-01-04, TEST-008-01-05 réussis
- Tests : TEST-008-01-04, TEST-008-01-05
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

