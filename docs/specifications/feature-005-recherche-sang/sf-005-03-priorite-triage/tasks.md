# SF-005-03 — La recherche de sang ne court-circuite jamais l'alerte d'urgence — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-005 Recherche de sang |
| Sous-fonctionnalité | SF-005-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-505, FR-522 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-005-03-01 — Phrase d'urgence en tête de l'onglet
- Exigences : FR-505, FR-522
- Conception : DES-005-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/chercher.js`, catalogues
- Résultat attendu : Phrase visible
- Dépend de : —
- Condition de fin : TEST-005-03-01 réussis
- Tests : TEST-005-03-01
- Statut : Partiel (code existant incomplet, rétro-spécifié le 2026-11-09)

