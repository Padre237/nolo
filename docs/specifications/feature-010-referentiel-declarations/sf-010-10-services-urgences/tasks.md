# SF-010-10 — Tableau « Services et urgences » de l'hôpital — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1044, FR-1045, FR-1046 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-10-01 — Tableau des services
- Exigences : FR-1044, FR-1045, FR-1046
- Conception : DES-010-10-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/vue-services.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-10-01, TEST-010-10-02 réussis
- Tests : TEST-010-10-01, TEST-010-10-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

