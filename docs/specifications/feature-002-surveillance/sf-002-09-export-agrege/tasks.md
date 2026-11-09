# SF-002-09 — Export agrégé compatible DHIS2 — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-207, FR-258 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-002-09-01 — Export et copie
- Exigences : FR-207, FR-258
- Conception : DES-002-09-01, DES-002-09-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-09-01 réussis
- Tests : TEST-002-09-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

