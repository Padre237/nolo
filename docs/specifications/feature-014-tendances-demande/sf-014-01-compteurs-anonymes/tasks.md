# SF-014-01 — Compteurs anonymes de la demande — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2001, FR-2002 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-014-01-01 — Compteurs (référence serveur)
- Exigences : FR-2001, FR-2002
- Conception : DES-014-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/etablissements/tendances.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-014-01-01, TEST-014-01-02 réussis
- Tests : TEST-014-01-01, TEST-014-01-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

