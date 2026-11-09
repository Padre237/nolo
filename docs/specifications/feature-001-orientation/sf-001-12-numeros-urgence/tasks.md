# SF-001-12 — Numéros d'urgence et barre de sécurité — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-114, FR-195, FR-196 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-12-01 — Barre de sécurité
- Exigences : FR-195
- Conception : DES-001-12-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/ui/components.js`, `app/css/components.css`
- Résultat attendu : Barre conforme
- Dépend de : —
- Condition de fin : TEST-001-12-02 réussis
- Tests : TEST-001-12-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-12-02 — Lire les numéros depuis la politique
- Exigences : FR-114, FR-196
- Conception : DES-001-12-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/politique.js`, `app/js/ui/components.js`
- Résultat attendu : Aucun numéro codé en dur
- Dépend de : SF-007-17
- Condition de fin : TEST-001-12-01 réussis
- Tests : TEST-001-12-01
- Statut : À faire

