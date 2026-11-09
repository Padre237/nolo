# SF-009-01 — Matrice des rôles et permissions — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-901, FR-902 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-009-01-01 — Rédiger la matrice des rôles
- Exigences : FR-901
- Conception : DES-009-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `docs/product/roles.md`
- Résultat attendu : Matrice complète
- Dépend de : —
- Condition de fin : TEST-009-01-01 réussis
- Tests : TEST-009-01-01
- Statut : À faire

### TASK-009-01-02 — Gardes de route pro et ministère
- Exigences : FR-902
- Conception : DES-009-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : écrans pro et ministère
- Résultat attendu : Redirection sans session
- Dépend de : —
- Condition de fin : TEST-009-01-02 réussis
- Tests : TEST-009-01-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

