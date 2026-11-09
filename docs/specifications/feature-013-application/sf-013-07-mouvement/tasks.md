# SF-013-07 — Mouvement et micro-interactions — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1332, FR-1333, FR-1334 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-013-07-01 — Transitions
- Exigences : FR-1332, FR-1333
- Conception : DES-013-07-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/app.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-07-01, TEST-013-07-02 réussis
- Tests : TEST-013-07-01, TEST-013-07-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-07-02 — Annonces
- Exigences : FR-1334
- Conception : DES-013-07-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/css/components.css`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-07-03 réussis
- Tests : TEST-013-07-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

