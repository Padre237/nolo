# SF-007-18 — Panneau « Comment Nolo a décidé » — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-18 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1911, FR-1912, FR-1913, FR-1914, FR-1915 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-18-01 — Écrire les tests du panneau (avant le code)
- Exigences : FR-1911, FR-1912, FR-1913, FR-1914, FR-1915
- Conception : DES-007-18-01, DES-007-18-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/decision.test.mjs`
- Résultat attendu : Tests rouges
- Dépend de : —
- Condition de fin : TEST-007-18-01, TEST-007-18-02, TEST-007-18-03, TEST-007-18-04, TEST-007-18-05 réussis
- Tests : TEST-007-18-01, TEST-007-18-02, TEST-007-18-03, TEST-007-18-04, TEST-007-18-05
- Statut : Fait (2026-11-09) — `app/tests/decision.test.mjs`

### TASK-007-18-02 — Panneau et extraits
- Exigences : FR-1911, FR-1912, FR-1913, FR-1914, FR-1915
- Conception : DES-007-18-01, DES-007-18-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/ui/decision.js`, écrans de résultat, catalogues
- Résultat attendu : Tests verts ; inspection visuelle sans débordement
- Dépend de : SF-007-17, SF-011-08
- Condition de fin : TEST-007-18-01, TEST-007-18-02, TEST-007-18-03, TEST-007-18-04, TEST-007-18-05 réussis
- Tests : TEST-007-18-01, TEST-007-18-02, TEST-007-18-03, TEST-007-18-04, TEST-007-18-05
- Statut : Fait (2026-11-09) — `app/js/ui/decision.js` ; panneau sur pistes, urgence, confidentiel, hors champ, Où aller, recherche ; catalogues `decision.*`

