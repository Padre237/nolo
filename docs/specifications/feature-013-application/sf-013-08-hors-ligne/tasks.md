# SF-013-08 — Fonctionnement hors ligne (PWA) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1336, FR-1337, FR-1338 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-013-08-01 — Cache et manifeste
- Exigences : FR-1336, FR-1337, FR-1338
- Conception : DES-013-08-01, DES-013-08-02, DES-013-08-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/sw.js`, `app/manifest.webmanifest`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-08-01, TEST-013-08-02, TEST-013-08-03 réussis
- Tests : TEST-013-08-01, TEST-013-08-02, TEST-013-08-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-08-02 — Contrôle automatique de la liste `FICHIERS` (tout fichier de `app/` y figure)
- Exigences : FR-1336
- Conception : DES-013-08-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/sw.test.mjs` (créer)
- Résultat attendu : Liste complète
- Dépend de : —
- Condition de fin : TEST-013-08-01 réussis
- Tests : TEST-013-08-01
- Statut : À faire

