# SF-008-02 — Consentement à la surveillance — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-811, FR-812 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-008-02-01 — Garde de finalité à la préparation de la contribution
- Exigences : FR-811
- Conception : DES-008-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/envoi.js`
- Résultat attendu : Aucune contribution sans case
- Dépend de : SF-001-02
- Condition de fin : TEST-008-02-01 réussis
- Tests : TEST-008-02-01
- Statut : À faire

### TASK-008-02-02 — Parcours indépendant de la surveillance
- Exigences : FR-812
- Conception : DES-008-02-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : —
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-008-02-02 réussis
- Tests : TEST-008-02-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

