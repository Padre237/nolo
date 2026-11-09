# SF-001-01 — Saisie des signes et du contexte (pour qui, âge, description) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-105, FR-150, FR-151, FR-152, FR-153, FR-154 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-01-01 — Écran « Décrire » et cas en mémoire
- Exigences : FR-150, FR-152, FR-153, FR-154
- Conception : DES-001-01-01, DES-001-01-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/decrire.js`, `app/js/etat.js`
- Résultat attendu : Formulaire conforme
- Dépend de : —
- Condition de fin : TEST-001-01-01, TEST-001-01-03, TEST-001-01-04 réussis
- Tests : TEST-001-01-01, TEST-001-01-03, TEST-001-01-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-01-02 — Validation et messages
- Exigences : FR-151
- Conception : DES-001-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/decrire.js`
- Résultat attendu : Refus conformes à CA-001-01-02
- Dépend de : —
- Condition de fin : TEST-001-01-02 réussis
- Tests : TEST-001-01-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-01-03 — Automatiser les tests de l'écran « Décrire » (validation, compteur, exemple, absence de persistance)
- Exigences : FR-151, FR-152, FR-153, FR-154, FR-105
- Conception : DES-001-01-01, DES-001-01-02, DES-001-01-03
- Fichiers à lire : `app/tests/domaine.test.mjs`
- Fichiers à créer ou modifier : `app/tests/decrire.test.mjs` (créer)
- Résultat attendu : Tests unitaires de `erreurs` et parcours navigateur
- Dépend de : —
- Condition de fin : TEST-001-01-02, TEST-001-01-03, TEST-001-01-04, TEST-001-01-05 réussis
- Tests : TEST-001-01-02, TEST-001-01-03, TEST-001-01-04, TEST-001-01-05
- Statut : Fait (2026-11-09) — `app/tests/saisie.test.mjs` ; `erreurs` exporté ; limite de 600 caractères appliquée à la saisie

