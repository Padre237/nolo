# SF-010-09 — Tableau de bord de l'établissement et chemin de vérification — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1038, FR-1040, FR-1041, FR-1042 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-09-01 — Navigation et chemin
- Exigences : FR-1038, FR-1040
- Conception : DES-010-09-01, DES-010-09-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/tableau.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-09-01, TEST-010-09-02 réussis
- Tests : TEST-010-09-01, TEST-010-09-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-09-02 — Aperçu et compte
- Exigences : FR-1041, FR-1042
- Conception : DES-010-09-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/tableau.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-09-03, TEST-010-09-04 réussis
- Tests : TEST-010-09-03, TEST-010-09-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

