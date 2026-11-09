# SF-010-04 — Inscription d'un établissement en quatre étapes — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1016, FR-1017, FR-1018, FR-1019, FR-1020, FR-1021, FR-1022 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-010-04-01 — Accès et parcours en 4 étapes
- Exigences : FR-1016, FR-1017, FR-1018, FR-1021
- Conception : DES-010-04-01, DES-010-04-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/inscription.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-04-03, TEST-010-04-04, TEST-010-04-05 réussis
- Tests : TEST-010-04-03, TEST-010-04-04, TEST-010-04-05
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-04-02 — Contrôles NIU, e-mail, téléphone
- Exigences : FR-1019, FR-1022
- Conception : DES-010-04-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/pro.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-04-01, TEST-010-04-04 réussis
- Tests : TEST-010-04-01, TEST-010-04-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-010-04-03 — Unicité
- Exigences : FR-1020
- Conception : DES-010-04-04
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/inscription.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-010-04-02 réussis
- Tests : TEST-010-04-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

