# SF-008-07 — Transparence : système automatisé et raison de la réponse — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-109, FR-861, FR-862 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-008-07-01 — Mention sur les écrans
- Exigences : FR-861
- Conception : DES-008-07-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : écrans patient
- Résultat attendu : Mention présente
- Dépend de : —
- Condition de fin : TEST-008-07-01 réussis
- Tests : TEST-008-07-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-008-07-02 — Raison par issue
- Exigences : FR-109, FR-862
- Conception : DES-008-07-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : écrans de résultat, catalogues
- Résultat attendu : Une phrase par issue
- Dépend de : —
- Condition de fin : TEST-008-07-02 réussis
- Tests : TEST-008-07-02
- Statut : Partiel (code existant incomplet, rétro-spécifié le 2026-11-09)

