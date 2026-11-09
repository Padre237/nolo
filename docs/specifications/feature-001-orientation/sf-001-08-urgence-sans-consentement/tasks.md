# SF-001-08 — Urgence sur l'appareil sans consentement — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-112, FR-175 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-08-01 — Parcours d'urgence sans partage
- Exigences : FR-112, FR-175
- Conception : DES-001-08-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/verifier.js`
- Résultat attendu : Alerte servie sans consentement
- Dépend de : —
- Condition de fin : TEST-001-08-01 réussis
- Tests : TEST-001-08-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

