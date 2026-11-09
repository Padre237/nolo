# SF-008-09 — Consentement aux signalements — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-881 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-008-09-01 — Garde du bouton « Signaler »
- Exigences : FR-881
- Conception : DES-008-09-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/chercher.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-008-09-01 réussis
- Tests : TEST-008-09-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

