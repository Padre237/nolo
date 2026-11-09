# SF-001-18 — Fiche à montrer au soignant (carnet) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-18 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1546, FR-1547, FR-1548, FR-1549 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-18-01 — Fiche et actions
- Exigences : FR-1546, FR-1548, FR-1549
- Conception : DES-001-18-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/fiche.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-18-01, TEST-001-18-03, TEST-001-18-04 réussis
- Tests : TEST-001-18-01, TEST-001-18-03, TEST-001-18-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-18-02 — Code court et son test
- Exigences : FR-1547
- Conception : DES-001-18-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/engine.js`, `app/tests/domaine.test.mjs`
- Résultat attendu : Test du format
- Dépend de : —
- Condition de fin : TEST-001-18-02 réussis
- Tests : TEST-001-18-02
- Statut : Partiel (code existant incomplet, rétro-spécifié le 2026-11-09)

