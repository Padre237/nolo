# SF-007-15 — Agents institutionnels simulés (District/SIMR, APDP) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-15 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-711, FR-783 |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-15-01 — Positions du district (S3)
- Exigences : FR-711
- Conception : DES-007-15-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/scenarios/executer.py`
- Résultat attendu : Entrées distinctes
- Dépend de : —
- Condition de fin : TEST-007-15-01 réussis
- Tests : TEST-007-15-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-007-15-02 — Mandats écrits
- Exigences : FR-783
- Conception : DES-007-15-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `docs/architecture/agents/`
- Résultat attendu : Un mandat par agent
- Dépend de : —
- Condition de fin : TEST-007-15-02 réussis
- Tests : TEST-007-15-02
- Statut : À faire

