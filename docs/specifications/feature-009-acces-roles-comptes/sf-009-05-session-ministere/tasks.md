# SF-009-05 — Session de démonstration du ministère — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-919, FR-920, FR-921 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-009-05-01 — Entrée et session
- Exigences : FR-919, FR-920, FR-921
- Conception : DES-009-05-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-009-05-01, TEST-009-05-02 réussis
- Tests : TEST-009-05-01, TEST-009-05-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

