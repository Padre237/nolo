# SF-012-01 — Patients et séries de surveillance synthétiques (référence Python) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1201, FR-1202 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-012-01-01 — Générateur et métadonnées
- Exigences : FR-1201, FR-1202
- Conception : DES-012-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/generate_synthetic.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-012-01-01, TEST-012-01-02 réussis
- Tests : TEST-012-01-01, TEST-012-01-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

