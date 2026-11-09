# SF-004-02 — Recherche dans les stocks déclarés et classement — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-402, FR-403, FR-406, FR-422, FR-423, FR-424 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-004-02-01 — Recherche dans les stocks
- Exigences : FR-402, FR-406, FR-423
- Conception : DES-004-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/facilities.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-004-02-01 réussis
- Tests : TEST-004-02-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-004-02-02 — Affichage des résultats
- Exigences : FR-422, FR-424
- Conception : DES-004-02-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/chercher.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-004-02-02, TEST-004-02-04 réussis
- Tests : TEST-004-02-02, TEST-004-02-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-004-02-03 — Publier la formule de tri
- Exigences : FR-406
- Conception : DES-004-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : catalogues (`conditions.sections`)
- Résultat attendu : Formule publiée
- Dépend de : —
- Condition de fin : TEST-004-02-03 réussis
- Tests : TEST-004-02-03
- Statut : Partiel (code existant incomplet, rétro-spécifié le 2026-11-09)

