# SF-013-11 — État de l'application et stockage local — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-11 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1348, FR-1349, FR-1350 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-013-11-01 — Stockage et état
- Exigences : FR-1348, FR-1350
- Conception : DES-013-11-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/core/store.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-11-01, TEST-013-11-03 réussis
- Tests : TEST-013-11-01, TEST-013-11-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-11-02 — Contrôle des clés écrites
- Exigences : FR-1349
- Conception : DES-013-11-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/stockage.test.mjs` (créer)
- Résultat attendu : Liste fermée vérifiée
- Dépend de : —
- Condition de fin : TEST-013-11-02 réussis
- Tests : TEST-013-11-02
- Statut : Fait (2026-11-09) — `app/tests/qualite.test.mjs` (contrôle statique des clés écrites)

