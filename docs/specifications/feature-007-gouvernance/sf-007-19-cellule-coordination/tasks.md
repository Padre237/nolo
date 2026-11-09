# SF-007-19 — Cellule de coordination multi-agents (console du ministère) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-19 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1921, FR-1922, FR-1923, FR-1924, FR-1925 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-19-01 — Écrire les tests de la cellule (avant le code)
- Exigences : FR-1921, FR-1922, FR-1923, FR-1924, FR-1925
- Conception : DES-007-19-01, DES-007-19-02, DES-007-19-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/cellule.test.mjs`
- Résultat attendu : Tests rouges
- Dépend de : —
- Condition de fin : TEST-007-19-01, TEST-007-19-02, TEST-007-19-03, TEST-007-19-04 réussis
- Tests : TEST-007-19-01, TEST-007-19-02, TEST-007-19-03, TEST-007-19-04
- Statut : Fait (2026-11-09) — `app/tests/cellule.test.mjs`

### TASK-007-19-02 — Mandats et déroulé
- Exigences : FR-1921, FR-1922, FR-1923, FR-1924
- Conception : DES-007-19-01, DES-007-19-02
- Fichiers à lire : `docs/architecture/agents/`
- Fichiers à créer ou modifier : `app/js/agents/cellule.js`
- Résultat attendu : Tests verts
- Dépend de : SF-007-17
- Condition de fin : TEST-007-19-01, TEST-007-19-02, TEST-007-19-03, TEST-007-19-04 réussis
- Tests : TEST-007-19-01, TEST-007-19-02, TEST-007-19-03, TEST-007-19-04
- Statut : Fait (2026-11-09) — `app/js/agents/cellule.js` (`derouler`, `MANDATS`)

### TASK-007-19-03 — Vue de la cellule dans la console
- Exigences : FR-1925
- Conception : DES-007-19-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`, `app/css/ministere.css`, catalogues
- Résultat attendu : Fil lisible de 360 à 1440 px
- Dépend de : —
- Condition de fin : TEST-007-19-01 réussis
- Tests : TEST-007-19-01
- Statut : Fait (2026-11-09) — vue `#/ministere/coordination` (fil daté, avis APDP, décision motivée du point focal)

