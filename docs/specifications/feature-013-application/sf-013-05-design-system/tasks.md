# SF-013-05 — Design system « Premium Medical Intelligence » — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1320, FR-1321, FR-1322, FR-1323, FR-1324 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-013-05-01 — Jetons et réservations
- Exigences : FR-1320, FR-1322
- Conception : DES-013-05-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/css/tokens.css`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-05-01, TEST-013-05-03 réussis
- Tests : TEST-013-05-01, TEST-013-05-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-05-02 — Polices auto-hébergées
- Exigences : FR-1321
- Conception : DES-013-05-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/assets/fonts/`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-05-02 réussis
- Tests : TEST-013-05-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-05-03 — Composants et documentation
- Exigences : FR-1323, FR-1324
- Conception : DES-013-05-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/docs/DESIGN.md`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-05-04 réussis
- Tests : TEST-013-05-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-05-04 — Contrôle automatique des couleurs en dur
- Exigences : FR-1320, FR-1322
- Conception : DES-013-05-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/styles.test.mjs` (créer)
- Résultat attendu : Contrôle automatisé
- Dépend de : —
- Condition de fin : TEST-013-05-01, TEST-013-05-03 réussis
- Tests : TEST-013-05-01, TEST-013-05-03
- Statut : Fait (2026-11-09) — `app/tests/qualite.test.mjs` ; jetons `--sur-sombre*`, `--ferme-sur-sombre`, `--hachure`, `--voile-clair` ; exceptions déclarées dans `app/docs/DESIGN.md`

### TASK-013-05-05 — Appliquer la décision sur Q-013-05-01 (rouge des erreurs de saisie)
- Exigences : FR-1322
- Conception : DES-013-05-01
- Fichiers à lire : `app/docs/DESIGN.md` (exceptions aux jetons)
- Fichiers à créer ou modifier : `app/css/components.css`, `app/css/pro.css`, `app/docs/DESIGN.md`
- Résultat attendu : rouge réservé à l'urgence, ou exception approuvée
- Dépend de : décision du propriétaire sur Q-013-05-01
- Condition de fin : TEST-013-05-03 réussi sans exception non approuvée
- Tests : TEST-013-05-03
- Statut : À faire

