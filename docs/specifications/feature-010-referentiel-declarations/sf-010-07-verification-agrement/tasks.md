# SF-010-07 — Vérification de l'agrément avant toute visibilité — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1029, FR-1030, FR-1031, FR-1032 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-07-01 — Filtre de visibilité
- Exigences : FR-1029
- Conception : DES-010-07-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/facilities.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-07-01 réussis
- Tests : TEST-010-07-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-07-02 — Vérification simulée et retour en attente
- Exigences : FR-1030, FR-1031
- Conception : DES-010-07-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/pro.js`, `app/js/screens/pro/compte.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-07-02, TEST-010-07-03 réussis
- Tests : TEST-010-07-02, TEST-010-07-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-07-03 — Décision et motif
- Exigences : FR-1032
- Conception : DES-010-07-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/tableau.js`, `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-07-04 réussis
- Tests : TEST-010-07-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

