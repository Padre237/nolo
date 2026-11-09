# SF-014-02 — Zones : arrondissements, départements, régions — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2005, FR-2006 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-014-02-01 — Rattachement (référence)
- Exigences : FR-2005, FR-2006
- Conception : DES-014-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/etablissements/zones.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-014-02-01, TEST-014-02-02 réussis
- Tests : TEST-014-02-01, TEST-014-02-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

