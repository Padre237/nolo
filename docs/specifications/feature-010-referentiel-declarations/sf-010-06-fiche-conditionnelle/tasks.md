# SF-010-06 — Fiche conditionnelle selon le type — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1026, FR-1027, FR-1028, FR-1033, FR-1037, FR-1039 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-06-01 — Logique de la fiche
- Exigences : FR-1026, FR-1027, FR-1028, FR-1033, FR-1037
- Conception : DES-010-06-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/pro.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-06-01, TEST-010-06-02, TEST-010-06-03, TEST-010-06-04, TEST-010-06-05 réussis
- Tests : TEST-010-06-01, TEST-010-06-02, TEST-010-06-03, TEST-010-06-04, TEST-010-06-05
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-06-02 — Écran de la fiche
- Exigences : FR-1028, FR-1039
- Conception : DES-010-06-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/vue-fiche.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-06-06 réussis
- Tests : TEST-010-06-06
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

