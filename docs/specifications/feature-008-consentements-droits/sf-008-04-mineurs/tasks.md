# SF-008-04 — Âge et accord parental — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-107, FR-831, FR-832 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-008-04-01 — Règles d'âge et d'accord
- Exigences : FR-831, FR-832
- Conception : DES-008-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/consent.js`, `app/js/screens/patient/bienvenue.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-008-04-01, TEST-008-04-02 réussis
- Tests : TEST-008-04-01, TEST-008-04-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

