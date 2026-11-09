# SF-011-04 — Évaluation de la recherche — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1113, FR-1114 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-011-04-01 — Évaluation
- Exigences : FR-1113
- Conception : DES-011-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/eval/run_eval.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-011-04-01 réussis
- Tests : TEST-011-04-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-011-04-02 — Reporter la mesure v9 dans `docs/quality/`
- Exigences : FR-1114
- Conception : DES-011-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `docs/quality/preuve-2026-11-09-suites.txt` (étape `run_eval.py`)
- Résultat attendu : Preuve datée
- Dépend de : —
- Condition de fin : TEST-011-04-02 réussis
- Tests : TEST-011-04-02
- Statut : Fait (2026-11-09)

