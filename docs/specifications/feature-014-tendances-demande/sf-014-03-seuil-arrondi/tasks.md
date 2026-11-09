# SF-014-03 — Seuil de 5, arrondi à 5, semaines complètes — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2009, FR-2010 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-014-03-01 — Règles d'affichage
- Exigences : FR-2009, FR-2010
- Conception : DES-014-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/trends.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-014-03-01, TEST-014-03-02 réussis
- Tests : TEST-014-03-01, TEST-014-03-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

