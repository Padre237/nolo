# SF-007-12 — Rejeu d'une session — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-773, FR-774 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-12-01 — Rejeu
- Exigences : FR-773, FR-774
- Conception : DES-007-12-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/scenarios/rejouer.py`
- Résultat attendu : Conforme
- Dépend de : D-016
- Condition de fin : TEST-007-12-01, TEST-007-12-02 réussis
- Tests : TEST-007-12-01, TEST-007-12-02
- Statut : À faire

