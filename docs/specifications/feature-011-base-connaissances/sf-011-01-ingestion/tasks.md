# SF-011-01 — Ingestion et découpage des sources — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1101, FR-1102, FR-1103, FR-1104 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-011-01-01 — Construction déterministe
- Exigences : FR-1101, FR-1102, FR-1103
- Conception : DES-011-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/build_kb.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-011-01-01, TEST-011-01-02 réussis
- Tests : TEST-011-01-01, TEST-011-01-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-011-01-02 — Catalogue des sources
- Exigences : FR-1104
- Conception : DES-011-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/sources.json`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-011-01-03 réussis
- Tests : TEST-011-01-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

