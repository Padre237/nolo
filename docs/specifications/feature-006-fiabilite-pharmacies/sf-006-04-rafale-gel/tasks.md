# SF-006-04 — Détection de rafale et gel — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-606 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-006-04-01 — Règle de référence
- Exigences : FR-606
- Conception : DES-006-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/services/orientation_services.py` (référence Python) ; `kb/rules/fiabilite_pharmacies.yaml`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-006-04-01 réussis
- Tests : TEST-006-04-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-006-04-02 — Porter la règle dans Nolo (affichage côté citoyen et pharmacie)
- Exigences : FR-606
- Conception : DES-006-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/fiabilite.js` (à créer), `app/tests/fiabilite.test.mjs`
- Résultat attendu : Parité avec la référence
- Dépend de : —
- Condition de fin : TEST-006-04-02 réussis
- Tests : TEST-006-04-02
- Statut : À faire

