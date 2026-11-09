# SF-002-07 — Refus de transmettre des données individuelles — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-206, FR-251 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-002-07-01 — Blocage (référence)
- Exigences : FR-206
- Conception : DES-002-07-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/agents/conformite.py`
- Résultat attendu : BLOQUE
- Dépend de : —
- Condition de fin : TEST-002-07-01 réussis
- Tests : TEST-002-07-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-002-07-02 — Refus visible dans la console
- Exigences : FR-251
- Conception : DES-002-07-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-07-02 réussis
- Tests : TEST-002-07-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

