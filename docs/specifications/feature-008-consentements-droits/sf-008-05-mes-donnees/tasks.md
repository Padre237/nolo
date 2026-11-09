# SF-008-05 — « Mes données » : modifier, retirer, effacer — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-841, FR-842, FR-843, FR-844 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-008-05-01 — Écran « Mes données »
- Exigences : FR-841, FR-842, FR-843
- Conception : DES-008-05-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/mes-donnees.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-008-05-01, TEST-008-05-02, TEST-008-05-03 réussis
- Tests : TEST-008-05-01, TEST-008-05-02, TEST-008-05-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-008-05-02 — Effacer les signalements au retrait de la finalité
- Exigences : FR-844
- Conception : DES-008-05-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/mes-donnees.js`
- Résultat attendu : Clé vidée
- Dépend de : —
- Condition de fin : TEST-008-05-04 réussis
- Tests : TEST-008-05-04
- Statut : Fait (2026-11-09) — `enregistrer` et `retirer` de « Mes données »

