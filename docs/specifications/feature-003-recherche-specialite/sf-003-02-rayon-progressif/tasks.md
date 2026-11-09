# SF-003-02 — Recherche par rayon progressif et tri public — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-302, FR-303, FR-307, FR-323, FR-324 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-003-02-01 — Recherche et tri
- Exigences : FR-302, FR-303
- Conception : DES-003-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/facilities.js`
- Résultat attendu : Tri conforme
- Dépend de : —
- Condition de fin : TEST-003-02-02 réussis
- Tests : TEST-003-02-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-003-02-02 — Minimum de 3 résultats avant d'arrêter l'élargissement
- Exigences : FR-302
- Conception : DES-003-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/facilities.js`, `app/tests/recherche.test.mjs`
- Résultat attendu : Élargit tant que moins de 3
- Dépend de : —
- Condition de fin : TEST-003-02-01 réussis
- Tests : TEST-003-02-01
- Statut : À faire

### TASK-003-02-03 — Ligne de résultat et mention d'élargissement
- Exigences : FR-323, FR-324
- Conception : DES-003-02-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/ui/components.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-003-02-04 réussis
- Tests : TEST-003-02-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-003-02-04 — Position arrondie dans le journal de référence
- Exigences : FR-307
- Conception : DES-003-02-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/services/orientation_services.py`
- Résultat attendu : 2 décimales
- Dépend de : —
- Condition de fin : TEST-003-02-03 réussis
- Tests : TEST-003-02-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

