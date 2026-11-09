# SF-001-11 — Filtre de sortie : aucun médicament, posologie ni alternative — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-11 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-102, FR-190, FR-191, FR-192 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-11-01 — Écran des pistes sans produit
- Exigences : FR-190, FR-191, FR-192
- Conception : DES-001-11-01, DES-001-11-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/pistes.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-11-02, TEST-001-11-03 réussis
- Tests : TEST-001-11-02, TEST-001-11-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-11-02 — Test automatique du filtre (catalogues et table des pistes)
- Exigences : FR-190
- Conception : DES-001-11-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/tests/filtre.test.mjs` (créer)
- Résultat attendu : Aucune DCI ni nom commercial
- Dépend de : —
- Condition de fin : TEST-001-11-01 réussis
- Tests : TEST-001-11-01
- Statut : À faire

