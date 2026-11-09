# SF-007-20 — « Rejouer sans gouvernance » dans Nolo — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-20 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1931, FR-1932, FR-1933 |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; S4 joué dans Nolo (pistes envoyées au serveur), le scénario S4 Python reste à faire (SF-012-05) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-20-01 — Tests puis A/B
- Exigences : FR-1931, FR-1932, FR-1933
- Conception : DES-007-20-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/ab.test.mjs`, `app/js/agents/ab.js`, console
- Résultat attendu : Tests verts
- Dépend de : SF-007-17
- Condition de fin : TEST-007-20-01, TEST-007-20-02 réussis
- Tests : TEST-007-20-01, TEST-007-20-02
- Statut : Fait (2026-11-09) — `app/tests/ab.test.mjs`, `app/js/agents/ab.js`, vue `#/ministere/ab` (6 violations sans gouvernance, 0 avec ; mode simulé)

