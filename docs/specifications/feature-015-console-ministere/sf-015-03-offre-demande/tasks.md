# SF-015-03 — Offre et demande nationale — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2113, FR-2114, FR-2115 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-015-03-01 — Indicateurs
- Exigences : FR-2113
- Conception : DES-015-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/surveillance.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-015-03-01 réussis
- Tests : TEST-015-03-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-015-03-02 — Vue offre et demande
- Exigences : FR-2114, FR-2115
- Conception : DES-015-03-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-015-03-02, TEST-015-03-03 réussis
- Tests : TEST-015-03-02, TEST-015-03-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-015-03-03 — Test unitaire d'`offreDemande`
- Exigences : FR-2113
- Conception : DES-015-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/surveillance.test.mjs`
- Résultat attendu : Littoral vérifié
- Dépend de : —
- Condition de fin : TEST-015-03-01 réussis
- Tests : TEST-015-03-01
- Statut : Fait (2026-11-09) — `app/tests/qualite.test.mjs`

