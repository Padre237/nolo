# SF-007-03 — Évaluation de conformité (quatre verdicts cités) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-702, FR-703, FR-730, FR-731, FR-732 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-03-01 — Décision ordonnée et citée
- Exigences : FR-702, FR-703, FR-730, FR-731
- Conception : DES-007-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/agents/conformite.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-007-03-01, TEST-007-03-02, TEST-007-03-03, TEST-007-03-04 réussis
- Tests : TEST-007-03-01, TEST-007-03-02, TEST-007-03-03, TEST-007-03-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-007-03-02 — Actions du module POC
- Exigences : FR-732
- Conception : DES-007-03-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/agents/conformite.py`, `config/policy.yaml` (1.4.0)
- Résultat attendu : 26 actions
- Dépend de : D-033 approuvée
- Condition de fin : TEST-007-03-05 réussis
- Tests : TEST-007-03-05
- Statut : À faire

