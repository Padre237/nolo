# SF-004-01 — Catalogue des DCI et normalisation de la saisie — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-407, FR-420, FR-421 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-004-01-01 — Catalogue et filtre
- Exigences : FR-407, FR-420, FR-421
- Conception : DES-004-01-01, DES-004-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/facilities.js`, `app/js/screens/patient/chercher.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-004-01-01, TEST-004-01-02, TEST-004-01-03 réussis
- Tests : TEST-004-01-01, TEST-004-01-02, TEST-004-01-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-004-01-02 — Tests unitaires du catalogue et du filtre
- Exigences : FR-407, FR-420, FR-421
- Conception : DES-004-01-01, DES-004-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/recherche.test.mjs`
- Résultat attendu : Couverture
- Dépend de : —
- Condition de fin : TEST-004-01-01, TEST-004-01-02, TEST-004-01-03 réussis
- Tests : TEST-004-01-01, TEST-004-01-02, TEST-004-01-03
- Statut : Fait (2026-11-09) — `filtrerDci` (art. 75 exclu, 8 au plus) et ses tests

