# SF-002-02 — Agrégation par aire et semaine avec seuil de 5 — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-202, FR-225, FR-226 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-002-02-01 — Agrégats et seuil
- Exigences : FR-202, FR-225, FR-226
- Conception : DES-002-02-01, DES-002-02-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/surveillance.js`, `app/js/ui/carte.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-02-01, TEST-002-02-02 réussis
- Tests : TEST-002-02-01, TEST-002-02-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

