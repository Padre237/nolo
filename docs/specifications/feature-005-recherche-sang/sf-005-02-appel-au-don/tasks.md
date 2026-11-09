# SF-005-02 — Appel au don — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-005 Recherche de sang |
| Sous-fonctionnalité | SF-005-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-504 |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-005-02-01 — Condition de majorité
- Exigences : FR-504
- Conception : DES-005-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/facilities.js`, `app/tests/recherche.test.mjs`
- Résultat attendu : Majorité en rupture
- Dépend de : —
- Condition de fin : TEST-005-02-01 réussis
- Tests : TEST-005-02-01
- Statut : À faire

