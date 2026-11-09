# SF-001-13 — « Décrire ce que je ressens » : reformulation bilingue, négation et durée — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-13 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1501, FR-1502, FR-1503, FR-1504, FR-1505, FR-1506, FR-1507, FR-1508, NFR-1501 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-13-01 — Moteur de reformulation
- Exigences : FR-1501, FR-1502, FR-1503, FR-1505, FR-1506
- Conception : DES-001-13-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/engine.js`
- Résultat attendu : Reconnaissance conforme
- Dépend de : —
- Condition de fin : TEST-001-13-01, TEST-001-13-02, TEST-001-13-03 réussis
- Tests : TEST-001-13-01, TEST-001-13-02, TEST-001-13-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-13-02 — Lecture de la durée
- Exigences : FR-1504
- Conception : DES-001-13-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/engine.js`
- Résultat attendu : Durée conforme
- Dépend de : —
- Condition de fin : TEST-001-13-04 réussis
- Tests : TEST-001-13-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-13-03 — Écran « Vérifier » (puces, absents, ajout)
- Exigences : FR-1507, FR-1508
- Conception : DES-001-13-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/verifier.js`
- Résultat attendu : Écran conforme
- Dépend de : —
- Condition de fin : TEST-001-13-05 réussis
- Tests : TEST-001-13-05
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-13-04 — Tests manquants : durée en lettres et changement de langue
- Exigences : FR-1504, FR-1508
- Conception : DES-001-13-02, DES-001-13-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/domaine.test.mjs`
- Résultat attendu : Couverture complète
- Dépend de : —
- Condition de fin : TEST-001-13-04, TEST-001-13-05 réussis
- Tests : TEST-001-13-04, TEST-001-13-05
- Statut : Fait (2026-11-09) — `app/tests/saisie.test.mjs`

