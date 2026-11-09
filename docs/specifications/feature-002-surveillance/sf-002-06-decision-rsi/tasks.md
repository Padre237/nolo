# SF-002-06 — Instrument de décision du RSI (annexe 2) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-246, FR-247, FR-248 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-002-06-01 — Instrument RSI
- Exigences : FR-246, FR-247, FR-248
- Conception : DES-002-06-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/surveillance.js`, console
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-06-01, TEST-002-06-02 réussis
- Tests : TEST-002-06-01, TEST-002-06-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

