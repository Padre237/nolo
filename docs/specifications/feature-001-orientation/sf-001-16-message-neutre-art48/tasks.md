# SF-001-16 — Message neutre pour une piste relevant de l'art. 48 — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-16 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1536, FR-1537, FR-1538 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-16-01 — Issue et écran neutres
- Exigences : FR-1536, FR-1537
- Conception : DES-001-16-01, DES-001-16-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/engine.js`, `app/js/screens/patient/confidentiel.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-16-01, TEST-001-16-02 réussis
- Tests : TEST-001-16-01, TEST-001-16-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-16-02 — Fiche sans piste
- Exigences : FR-1538
- Conception : DES-001-16-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/fiche.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-16-03 réussis
- Tests : TEST-001-16-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

