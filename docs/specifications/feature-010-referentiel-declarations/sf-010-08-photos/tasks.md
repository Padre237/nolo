# SF-010-08 — Photos de l'établissement — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1034, FR-1035, FR-1036 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-08-01 — Photos dans Nolo
- Exigences : FR-1034, FR-1035, FR-1036
- Conception : DES-010-08-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/vue-fiche.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-08-01, TEST-010-08-03 réussis
- Tests : TEST-010-08-01, TEST-010-08-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-08-02 — Référence serveur
- Exigences : FR-1034, FR-1035, FR-1036
- Conception : DES-010-08-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/etablissements/fiches.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-08-02 réussis
- Tests : TEST-010-08-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

