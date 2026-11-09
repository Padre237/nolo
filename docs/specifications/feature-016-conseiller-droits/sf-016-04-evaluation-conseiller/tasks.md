# SF-016-04 — Évaluation du conseiller — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2215, FR-2216 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-016-04-01 — Évaluation datée
- Exigences : FR-2215, FR-2216
- Conception : DES-016-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/evaluer_conseiller.mjs`
- Résultat attendu : Rapport daté
- Dépend de : SF-016-01
- Condition de fin : TEST-016-04-01, TEST-016-04-02 réussis
- Tests : TEST-016-04-01, TEST-016-04-02
- Statut : Fait (2026-11-09) — `tools/evaluer_conseiller.mjs` → `docs/quality/eval-conseiller-2026-11-09.txt` (document 18/18, référence 15/18, anglais 5/5 ; réserve : sans `courant_fr`, référence 12/18)

