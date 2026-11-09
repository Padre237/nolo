# SF-014-04 — Filtres, classements et demande non satisfaite — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2013, FR-2014 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-014-04-01 — Vue Tendances
- Exigences : FR-2013, FR-2014
- Conception : DES-014-04-01, DES-014-04-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/vue-tendances.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-014-04-01, TEST-014-04-02, TEST-014-04-03 réussis
- Tests : TEST-014-04-01, TEST-014-04-02, TEST-014-04-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

