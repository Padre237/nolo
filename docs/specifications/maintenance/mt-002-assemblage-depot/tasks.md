# MT-002 — Assemblage du monorepo Nolo — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | MT Maintenance |
| Sous-fonctionnalité | MT-002 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2401, FR-2402, FR-2403 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-M02-01 — Assembler l'arborescence
- Exigences : FR-2401
- Conception : DES-M02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : racine
- Résultat attendu : Arborescence attendue
- Dépend de : —
- Condition de fin : TEST-M02-01 réussis
- Tests : TEST-M02-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-M02-02 — Relancer toutes les suites dans l'arborescence assemblée
- Exigences : FR-2402
- Conception : DES-M02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `docs/quality/preuve-2026-11-09-suites.txt`
- Résultat attendu : Toutes réussissent
- Dépend de : —
- Condition de fin : TEST-M02-02 réussis
- Tests : TEST-M02-02
- Statut : Fait (2026-11-09, demande explicite du propriétaire, D-036)

### TASK-M02-03 — Documents de reprise
- Exigences : FR-2403
- Conception : DES-M02-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `CLAUDE.md`, `docs/ETAT.md`, `docs/specifications/README.md`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-M02-03 réussis
- Tests : TEST-M02-03
- Statut : Fait (2026-11-09, demande explicite du propriétaire, D-036)

