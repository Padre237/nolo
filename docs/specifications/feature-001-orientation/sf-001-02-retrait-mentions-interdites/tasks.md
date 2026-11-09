# SF-001-02 — Retrait des mentions interdites avant tout envoi — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-111, FR-155, FR-156 |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; rien n'est envoyé dans le prototype |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-02-01 — Écrire `preparerEnvoi` et ses tests
- Exigences : FR-155, FR-111
- Conception : DES-001-02-01
- Fichiers à lire : `app/js/domain/engine.js`, `app/js/domain/consent.js`
- Fichiers à créer ou modifier : `app/js/domain/envoi.js`, `app/tests/envoi.test.mjs`
- Résultat attendu : Charge utile limitée aux codes
- Dépend de : SF-008-01, SF-002-01
- Condition de fin : TEST-001-02-01 réussis
- Tests : TEST-001-02-01
- Statut : Fait (2026-11-09) — `app/js/domain/envoi.js`

### TASK-001-02-02 — Test des catalogues sans question interdite
- Exigences : FR-156
- Conception : DES-001-02-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/i18n.test.mjs`
- Résultat attendu : Liste de termes interdits FR/EN contrôlée
- Dépend de : —
- Condition de fin : TEST-001-02-02 réussis
- Tests : TEST-001-02-02
- Statut : Fait (2026-11-09) — `app/tests/saisie.test.mjs`

