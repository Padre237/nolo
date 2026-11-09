# SF-007-21 — Journal d'audit chaîné dans Nolo et sa vérification — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-21 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1941, FR-1942, FR-1943, FR-1944 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-21-01 — Tests puis journal
- Exigences : FR-1941, FR-1944
- Conception : DES-007-21-01
- Fichiers à lire : `src/server/gouvernance/journal.py`
- Fichiers à créer ou modifier : `app/tests/journal.test.mjs`, `app/js/agents/journal.js`
- Résultat attendu : Tests verts
- Dépend de : SF-007-17
- Condition de fin : TEST-007-21-01, TEST-007-21-03 réussis
- Tests : TEST-007-21-01, TEST-007-21-03
- Statut : À faire

### TASK-007-21-02 — Vue et démonstration de l'altération
- Exigences : FR-1942, FR-1943
- Conception : DES-007-21-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : console, catalogues
- Résultat attendu : Détection montrée
- Dépend de : —
- Condition de fin : TEST-007-21-02 réussis
- Tests : TEST-007-21-02
- Statut : À faire

