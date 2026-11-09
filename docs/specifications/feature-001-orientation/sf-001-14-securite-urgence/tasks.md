# SF-001-14 — Questions de sécurité et alerte d'urgence — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-14 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1511, FR-1512, FR-1513, FR-1514, FR-1515 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-14-01 — Questions et décision d'urgence
- Exigences : FR-1511, FR-1513
- Conception : DES-001-14-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/engine.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-14-01, TEST-001-14-03 réussis
- Tests : TEST-001-14-01, TEST-001-14-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-14-02 — Écran « Vérifier » : questions et bouton motivé
- Exigences : FR-1512
- Conception : DES-001-14-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/verifier.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-14-02 réussis
- Tests : TEST-001-14-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-14-03 — Écran Urgence
- Exigences : FR-1514, FR-1515
- Conception : DES-001-14-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/urgence.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-14-04, TEST-001-14-05 réussis
- Tests : TEST-001-14-04, TEST-001-14-05
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

