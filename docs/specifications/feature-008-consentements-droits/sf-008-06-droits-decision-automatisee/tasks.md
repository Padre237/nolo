# SF-008-06 — Droits face à la décision automatisée — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-108, FR-851 |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-008-06-01 — Bloc des droits sur les écrans de résultat
- Exigences : FR-108, FR-851
- Conception : DES-008-06-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/ui/components.js`, cinq écrans, catalogues
- Résultat attendu : Bloc présent
- Dépend de : D-014
- Condition de fin : TEST-008-06-01 réussis
- Tests : TEST-008-06-01
- Statut : À faire

