# SF-010-03 — Déclaration des niveaux de sang — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-501, FR-1013, FR-1014 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-03-01 — Onglet sang selon le type
- Exigences : FR-1013, FR-501
- Conception : DES-010-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/pro.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-03-01 réussis
- Tests : TEST-010-03-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-03-02 — Expiration à 6 h
- Exigences : FR-1014
- Conception : DES-010-03-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/facilities.js`, `app/tests/recherche.test.mjs`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-03-02 réussis
- Tests : TEST-010-03-02
- Statut : Fait (2026-11-09) — `chercherSang` ; `sangH` des comptes d'établissement

