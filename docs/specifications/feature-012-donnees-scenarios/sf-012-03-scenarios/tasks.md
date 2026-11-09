# SF-012-03 — Scénarios S1 à S3 et exécuteur — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1207, FR-1208, FR-1209 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-012-03-01 — Exécuteur
- Exigences : FR-1207, FR-1208
- Conception : DES-012-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/scenarios/executer.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-012-03-01 réussis
- Tests : TEST-012-03-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-012-03-02 — Export des attendus
- Exigences : FR-1209
- Conception : DES-012-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/scenarios/executer.py`
- Résultat attendu : Fichier produit
- Dépend de : —
- Condition de fin : TEST-012-03-02 réussis
- Tests : TEST-012-03-02
- Statut : Fait (2026-11-09) — `--exporter-attendus` (livré avec TASK-007-17-02) ; test d'acceptation pytest

