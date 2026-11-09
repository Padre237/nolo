# SF-010-13 — Politique de données des professionnels — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-13 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1057 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-13-01 — Page dans Nolo
- Exigences : FR-1057
- Conception : DES-010-13-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/conditions.js` (à créer), catalogues
- Résultat attendu : Page liée
- Dépend de : —
- Condition de fin : TEST-010-13-01 réussis
- Tests : TEST-010-13-01
- Statut : Fait (2026-11-09) — `app/js/screens/pro/conditions.js`, catalogues `pro.conditionsPage`

