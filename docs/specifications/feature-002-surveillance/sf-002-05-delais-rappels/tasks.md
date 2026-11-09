# SF-002-05 — Délais SBC et rappels — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-205, FR-243 |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; heure d'alerte fictive |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-002-05-01 — Rappels (référence S3)
- Exigences : FR-205
- Conception : DES-002-05-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/scenarios/executer.py`
- Résultat attendu : Rappel émis
- Dépend de : —
- Condition de fin : TEST-002-05-01 réussis
- Tests : TEST-002-05-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-002-05-02 — Échéances dans la console
- Exigences : FR-243
- Conception : DES-002-05-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Échéance affichée
- Dépend de : —
- Condition de fin : TEST-002-05-02 réussis
- Tests : TEST-002-05-02
- Statut : Fait (2026-11-09) — `echeance`, `heuresDepuisAlerte` ; ligne d'échéance de la console

