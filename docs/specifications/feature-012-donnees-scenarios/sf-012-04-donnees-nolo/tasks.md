# SF-012-04 — Données fictives de Nolo — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1211, FR-1212, FR-1213 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-012-04-01 — Séries déterministes
- Exigences : FR-1211
- Conception : DES-012-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/surveillance.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-012-04-01 réussis
- Tests : TEST-012-04-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-012-04-02 — Tracés
- Exigences : FR-1212
- Conception : DES-012-04-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tools/carte.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-012-04-02 réussis
- Tests : TEST-012-04-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-012-04-03 — Marquage fictif
- Exigences : FR-1213
- Conception : DES-012-04-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : écrans, en-têtes
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-012-04-03 réussis
- Tests : TEST-012-04-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

