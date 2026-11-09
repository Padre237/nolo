# SF-011-07 — Version publique de la base (droits) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1123, FR-1124, FR-1125 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-011-07-01 — Nettoyage de la version publique
- Exigences : FR-1123, FR-1124
- Conception : DES-011-07-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/`
- Résultat attendu : 2 034 fragments ; aucun PDF
- Dépend de : —
- Condition de fin : TEST-011-07-01, TEST-011-07-02 réussis
- Tests : TEST-011-07-01, TEST-011-07-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-011-07-02 — Notices de tiers
- Exigences : FR-1125
- Conception : DES-011-07-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `THIRD_PARTY_NOTICES.md`
- Résultat attendu : Notices complètes
- Dépend de : —
- Condition de fin : TEST-011-07-03 réussis
- Tests : TEST-011-07-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

