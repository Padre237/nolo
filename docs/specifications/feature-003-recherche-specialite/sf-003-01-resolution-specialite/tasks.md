# SF-003-01 — Choix de la spécialité dans une liste fermée — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-301, FR-304, FR-320, FR-321, FR-322 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-003-01-01 — Liste fermée et onglet Service
- Exigences : FR-320, FR-321, FR-301
- Conception : DES-003-01-01, DES-003-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/chercher.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-003-01-01, TEST-003-01-02 réussis
- Tests : TEST-003-01-01, TEST-003-01-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-003-01-02 — Saisie libre avec synonymes dans Nolo
- Exigences : FR-322
- Conception : DES-003-01-03
- Fichiers à lire : `kb/rules/recherche_specialite.yaml`
- Fichiers à créer ou modifier : `app/js/domain/facilities.js` (`resoudreSpecialite`), `app/tests/recherche.test.mjs`
- Résultat attendu : « cœur » → cardiologie
- Dépend de : —
- Condition de fin : TEST-003-01-03 réussis
- Tests : TEST-003-01-03
- Statut : Fait (2026-11-09) — `resoudreSpecialite` ; champ libre de l'onglet Service

