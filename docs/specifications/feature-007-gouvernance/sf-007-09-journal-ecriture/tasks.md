# SF-007-09 — Écriture du journal d'audit chaîné — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-706, FR-709, FR-760, FR-761 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-09-01 — Journal chaîné
- Exigences : FR-706, FR-709, FR-760
- Conception : DES-007-09-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/gouvernance/journal.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-007-09-01, TEST-007-09-02 réussis
- Tests : TEST-007-09-01, TEST-007-09-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-007-09-02 — Pseudonymes HMAC
- Exigences : FR-761
- Conception : DES-007-09-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/gouvernance/journal.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-007-09-03 réussis
- Tests : TEST-007-09-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

