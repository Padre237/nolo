# SF-013-06 — Accessibilité — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1326, FR-1327, FR-1328, FR-1329, FR-1330 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-013-06-01 — Cibles, focus, évitement, boutons motivés
- Exigences : FR-1326, FR-1327, FR-1328, FR-1329
- Conception : DES-013-06-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : feuilles de style et écrans
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-06-01, TEST-013-06-02, TEST-013-06-03 réussis
- Tests : TEST-013-06-01, TEST-013-06-02, TEST-013-06-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-06-02 — Calcul automatique des contrastes
- Exigences : FR-1330
- Conception : DES-013-06-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/styles.test.mjs`
- Résultat attendu : Contrastes vérifiés
- Dépend de : —
- Condition de fin : TEST-013-06-04 réussis
- Tests : TEST-013-06-04
- Statut : Fait (2026-11-09) — `app/tests/qualite.test.mjs` (15 paires de jetons)

