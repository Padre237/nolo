# SF-001-17 — Hors champ du modèle expérimental — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-17 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1541, FR-1542, FR-1543 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-17-01 — Détection hors champ
- Exigences : FR-1541, FR-1542
- Conception : DES-001-17-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/engine.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-17-01 réussis
- Tests : TEST-001-17-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-17-02 — Écran hors champ
- Exigences : FR-1543
- Conception : DES-001-17-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/hors-champ.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-17-02 réussis
- Tests : TEST-001-17-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

