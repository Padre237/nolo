# SF-010-11 — Saisie des spécialités et de leurs modalités (hôpital) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-11 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1049, FR-1050 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-11-01 — Saisie des spécialités
- Exigences : FR-1049
- Conception : DES-010-11-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/vue-fiche.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-11-01 réussis
- Tests : TEST-010-11-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-11-02 — Passage à la tuile
- Exigences : FR-1050
- Conception : DES-010-11-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/compte.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-11-02 réussis
- Tests : TEST-010-11-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

