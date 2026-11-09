# SF-010-02 — Déclaration du stock de médicaments (import d'un fichier) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-401, FR-1006, FR-1007, FR-1008, FR-1009, FR-1010 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-02-01 — Lecture et contrôle des lignes
- Exigences : FR-1007, FR-1008
- Conception : DES-010-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/pro.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-02-01, TEST-010-02-02 réussis
- Tests : TEST-010-02-01, TEST-010-02-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-02-02 — Fraîcheur et confirmation
- Exigences : FR-1009
- Conception : DES-010-02-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/pro.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-02-03 réussis
- Tests : TEST-010-02-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-02-03 — Onglet Stock
- Exigences : FR-1006, FR-1010, FR-401
- Conception : DES-010-02-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/vue-stock.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-02-04, TEST-010-02-05 réussis
- Tests : TEST-010-02-04, TEST-010-02-05
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-02-04 — Référence serveur (XLSX)
- Exigences : FR-1007, FR-1008, FR-1009
- Conception : DES-010-02-04
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/etablissements/stock.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-02-06 réussis
- Tests : TEST-010-02-06
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

