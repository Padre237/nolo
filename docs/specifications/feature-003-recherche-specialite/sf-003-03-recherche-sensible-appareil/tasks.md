# SF-003-03 — Spécialités sensibles : recherche sur l'appareil, jamais comptée — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-305, FR-308, FR-325 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-003-03-01 — Recherche locale et note
- Exigences : FR-305, FR-308, FR-325
- Conception : DES-003-03-01, DES-003-03-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/chercher.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-003-03-01, TEST-003-03-02 réussis
- Tests : TEST-003-03-01, TEST-003-03-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

