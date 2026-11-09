# SF-010-12 — Comptes de démonstration (officine et hôpital) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1053, FR-1054 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-12-01 — Comptes de démonstration
- Exigences : FR-1053, FR-1054
- Conception : DES-010-12-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/compte.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-12-01, TEST-010-12-02 réussis
- Tests : TEST-010-12-01, TEST-010-12-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

