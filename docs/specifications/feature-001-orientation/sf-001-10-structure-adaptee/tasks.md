# SF-001-10 — « Où aller » : structure adaptée aux besoins — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-185, FR-186, FR-187, FR-188, FR-189 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-10-01 — Besoins et recommandation
- Exigences : FR-185, FR-186, FR-187
- Conception : DES-001-10-01, DES-001-10-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/engine.js`, `app/js/domain/facilities.js`
- Résultat attendu : Recommandation conforme
- Dépend de : —
- Condition de fin : TEST-001-10-01, TEST-001-10-02, TEST-001-10-03 réussis
- Tests : TEST-001-10-01, TEST-001-10-02, TEST-001-10-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-10-02 — Panneau de direction
- Exigences : FR-188, FR-189
- Conception : DES-001-10-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/ou-aller.js`
- Résultat attendu : Panneau conforme
- Dépend de : —
- Condition de fin : TEST-001-10-04 réussis
- Tests : TEST-001-10-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

