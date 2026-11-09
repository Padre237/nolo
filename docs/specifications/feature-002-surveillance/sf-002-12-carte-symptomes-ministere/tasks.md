# SF-002-12 — Carte interactive des symptômes pour le ministère — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1606, FR-1607, FR-1608, FR-1609, FR-1610, FR-1611 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-002-12-01 — Carte et légende
- Exigences : FR-1606, FR-1609
- Conception : DES-002-12-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/ui/carte.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-12-01, TEST-002-12-04 réussis
- Tests : TEST-002-12-01, TEST-002-12-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-002-12-02 — Filtres et panneau
- Exigences : FR-1607, FR-1611
- Conception : DES-002-12-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-12-02, TEST-002-12-05 réussis
- Tests : TEST-002-12-02, TEST-002-12-05
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-002-12-03 — Clavier sur la carte
- Exigences : FR-1608
- Conception : DES-002-12-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/app.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-12-03 réussis
- Tests : TEST-002-12-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-002-12-04 — Schéma des aires
- Exigences : FR-1610
- Conception : DES-002-12-04
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/ui/carte.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-12-04 réussis
- Tests : TEST-002-12-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

