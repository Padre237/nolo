# SF-008-08 — Page « Conditions d'utilisation et politique de données » — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-871, FR-872, FR-873 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-008-08-01 — Lien sans perte des choix
- Exigences : FR-871
- Conception : DES-008-08-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/bienvenue.js`
- Résultat attendu : Choix conservés
- Dépend de : —
- Condition de fin : TEST-008-08-01 réussis
- Tests : TEST-008-08-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-008-08-02 — Contenu bilingue et contrôle des rubriques
- Exigences : FR-872, FR-873
- Conception : DES-008-08-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : catalogues ; `app/tests/i18n.test.mjs` (contrôle des rubriques)
- Résultat attendu : Rubriques complètes
- Dépend de : —
- Condition de fin : TEST-008-08-02 réussis
- Tests : TEST-008-08-02
- Statut : Partiel (code existant incomplet, rétro-spécifié le 2026-11-09)

