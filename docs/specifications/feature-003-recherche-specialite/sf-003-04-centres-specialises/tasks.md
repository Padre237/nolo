# SF-003-04 — Centres spécialisés par domaine — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-326, FR-327 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-003-04-01 — Domaines et centres fictifs
- Exigences : FR-326, FR-327
- Conception : DES-003-04-01, DES-003-04-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/pro.js`, `app/js/domain/facilities.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-003-04-01, TEST-003-04-02 réussis
- Tests : TEST-003-04-01, TEST-003-04-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-003-04-02 — Test unitaire domaine → spécialité
- Exigences : FR-326
- Conception : DES-003-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/recherche.test.mjs`
- Résultat attendu : Les 7 domaines
- Dépend de : —
- Condition de fin : TEST-003-04-01 réussis
- Tests : TEST-003-04-01
- Statut : Fait (2026-11-09) — `app/tests/recherche.test.mjs`

