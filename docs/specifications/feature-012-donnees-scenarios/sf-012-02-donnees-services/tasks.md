# SF-012-02 — Établissements, stocks et signalements simulés (référence Python) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1204, FR-1205 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-012-02-01 — Générateur et contrôles
- Exigences : FR-1204, FR-1205
- Conception : DES-012-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/generate_services.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-012-02-01, TEST-012-02-02 réussis
- Tests : TEST-012-02-01, TEST-012-02-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

