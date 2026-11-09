# SF-014-05 — Accès réservé, sans alerte ni export brut — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2017, FR-2018 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-014-05-01 — Garde et routes
- Exigences : FR-2017, FR-2018
- Conception : DES-014-05-01, DES-014-05-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/tableau.js`, `src/server/etablissements/app.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-014-05-01, TEST-014-05-02 réussis
- Tests : TEST-014-05-01, TEST-014-05-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

