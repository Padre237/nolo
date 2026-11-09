# SF-006-06 — Contestation par la pharmacie — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-607 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-006-06-01 — Règle de référence
- Exigences : FR-607
- Conception : DES-006-06-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/services/orientation_services.py` (référence Python) ; `kb/rules/fiabilite_pharmacies.yaml`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-006-06-01 réussis
- Tests : TEST-006-06-01
- Statut : À faire

