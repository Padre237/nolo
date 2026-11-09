# SF-013-03 — Rendu, mise à jour du DOM et délégation des événements — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1310, FR-1311, FR-1312, FR-1313 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-013-03-01 — Rendu
- Exigences : FR-1310, FR-1311
- Conception : DES-013-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/core/dom.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-03-01, TEST-013-03-02 réussis
- Tests : TEST-013-03-01, TEST-013-03-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-03-02 — Événements et annonces
- Exigences : FR-1312, FR-1313
- Conception : DES-013-03-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/app.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-03-03, TEST-013-03-04 réussis
- Tests : TEST-013-03-03, TEST-013-03-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-03-03 — Tests unitaires de `html` et `patch` (jsdom indisponible : tests navigateur)
- Exigences : FR-1310, FR-1311
- Conception : DES-013-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/inspecter.py` (cas dédiés)
- Résultat attendu : Couverture
- Dépend de : —
- Condition de fin : TEST-013-03-01, TEST-013-03-02 réussis
- Tests : TEST-013-03-01, TEST-013-03-02
- Statut : À faire

