# SF-013-02 — Routes, gardes et interface des écrans — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1305, FR-1306, FR-1307, FR-1308 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-013-02-01 — Routeur et garde
- Exigences : FR-1305, FR-1306, FR-1307
- Conception : DES-013-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/app.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-02-01, TEST-013-02-02 réussis
- Tests : TEST-013-02-01, TEST-013-02-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-02-02 — Un seul h1
- Exigences : FR-1308
- Conception : DES-013-02-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : écrans
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-02-03 réussis
- Tests : TEST-013-02-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-02-03 — Tests unitaires du routeur
- Exigences : FR-1305, FR-1306
- Conception : DES-013-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/core/routeur.js` (extraire `lireRoute`), `app/tests/routeur.test.mjs`
- Résultat attendu : Couverture
- Dépend de : —
- Condition de fin : TEST-013-02-01, TEST-013-02-02 réussis
- Tests : TEST-013-02-01, TEST-013-02-02
- Statut : Fait (2026-11-09) — `app/js/core/routeur.js` (`lireRoute`, `routeGardee`), utilisé par `app.js`

