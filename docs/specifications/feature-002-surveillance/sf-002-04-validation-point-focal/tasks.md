# SF-002-04 — Validation du signal par le point focal — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-204, FR-237, FR-238, FR-239 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-002-04-01 — Décision motivée et réouverture
- Exigences : FR-204, FR-237, FR-238, FR-239
- Conception : DES-002-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-04-01, TEST-002-04-02, TEST-002-04-03 réussis
- Tests : TEST-002-04-01, TEST-002-04-02, TEST-002-04-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-002-04-02 — Référence S3
- Exigences : FR-204
- Conception : DES-002-04-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/domain/surveillance.py`
- Résultat attendu : Validation tracée
- Dépend de : —
- Condition de fin : TEST-002-04-04 réussis
- Tests : TEST-002-04-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

