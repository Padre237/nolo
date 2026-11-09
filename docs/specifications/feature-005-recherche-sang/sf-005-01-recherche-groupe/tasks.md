# SF-005-01 — Recherche d'un groupe sanguin — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-005 Recherche de sang |
| Sous-fonctionnalité | SF-005-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-502, FR-503, FR-520, FR-521 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-005-01-01 — Recherche et affichage
- Exigences : FR-502, FR-503, FR-520, FR-521
- Conception : DES-005-01-01, DES-005-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/facilities.js`, `app/js/screens/patient/chercher.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-005-01-01, TEST-005-01-02, TEST-005-01-03 réussis
- Tests : TEST-005-01-01, TEST-005-01-02, TEST-005-01-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-005-01-02 — Test unitaire de `chercherSang`
- Exigences : FR-520
- Conception : DES-005-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/recherche.test.mjs`
- Résultat attendu : Tri vérifié
- Dépend de : —
- Condition de fin : TEST-005-01-01 réussis
- Tests : TEST-005-01-01
- Statut : À faire

