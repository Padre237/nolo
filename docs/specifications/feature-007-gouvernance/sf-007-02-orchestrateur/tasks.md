# SF-007-02 — Orchestration et contrôle préalable obligatoire — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-701, FR-725, FR-726 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-02-01 — Orchestrateur
- Exigences : FR-701, FR-725, FR-726
- Conception : DES-007-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/agents/orchestrateur.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-007-02-01, TEST-007-02-02 réussis
- Tests : TEST-007-02-01, TEST-007-02-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

