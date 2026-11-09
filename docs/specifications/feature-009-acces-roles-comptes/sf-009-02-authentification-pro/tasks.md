# SF-009-02 — Authentification des établissements (un compte par établissement) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-905, FR-906, FR-907, FR-908, FR-909 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-009-02-01 — Comptes, empreinte et session
- Exigences : FR-905, FR-908
- Conception : DES-009-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/compte.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-009-02-01, TEST-009-02-04 réussis
- Tests : TEST-009-02-01, TEST-009-02-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-009-02-02 — Règles du mot de passe
- Exigences : FR-906
- Conception : DES-009-02-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/pro.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-009-02-02 réussis
- Tests : TEST-009-02-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-009-02-03 — Blocage après 5 échecs
- Exigences : FR-907
- Conception : DES-009-02-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/entree.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-009-02-03 réussis
- Tests : TEST-009-02-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-009-02-04 — Désactivation et réactivation
- Exigences : FR-909
- Conception : DES-009-02-01, DES-009-02-04
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/pro/tableau.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-009-02-05 réussis
- Tests : TEST-009-02-05
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

