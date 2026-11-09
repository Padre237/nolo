# SF-010-01 — Référentiel des établissements (tuile de démonstration) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1001, FR-1002, FR-1003, FR-1004 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-01-01 — Tuile fictive
- Exigences : FR-1001, FR-1002, FR-1004
- Conception : DES-010-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/facilities.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-01-01, TEST-010-01-03, TEST-010-01-04 réussis
- Tests : TEST-010-01-01, TEST-010-01-03, TEST-010-01-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-01-02 — Fusion des comptes vérifiés
- Exigences : FR-1003
- Conception : DES-010-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/facilities.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-01-02 réussis
- Tests : TEST-010-01-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-01-03 — Test de schéma et de couverture de la tuile
- Exigences : FR-1001, FR-1002
- Conception : DES-010-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/tuile.test.mjs` (créer)
- Résultat attendu : Schéma et couverture vérifiés
- Dépend de : —
- Condition de fin : TEST-010-01-01, TEST-010-01-04 réussis
- Tests : TEST-010-01-01, TEST-010-01-04
- Statut : À faire

