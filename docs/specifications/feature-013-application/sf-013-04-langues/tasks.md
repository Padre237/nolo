# SF-013-04 — Deux langues d'égale valeur et typographie française — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1315, FR-1316, FR-1317, FR-1318 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-013-04-01 — Catalogues
- Exigences : FR-1315
- Conception : DES-013-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/i18n/*.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-04-01 réussis
- Tests : TEST-013-04-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-04-02 — Moteur de langue
- Exigences : FR-1316, FR-1317, FR-1318
- Conception : DES-013-04-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/core/i18n.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-04-02, TEST-013-04-03, TEST-013-04-04 réussis
- Tests : TEST-013-04-02, TEST-013-04-03, TEST-013-04-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

