# SF-017-05 — Preuves d'exécution et matrice de traçabilité — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2320, FR-2321, FR-2322 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-017-05-01 — Matrice et preuves
- Exigences : FR-2320, FR-2321
- Conception : DES-017-05-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `docs/traceability/matrix.md`, `docs/quality/`
- Résultat attendu : Code 0 ; preuves
- Dépend de : —
- Condition de fin : TEST-017-05-01, TEST-017-05-02 réussis
- Tests : TEST-017-05-01, TEST-017-05-02
- Statut : Fait (2026-11-09, demande explicite du propriétaire, D-036)

### TASK-017-05-02 — Croisement des statuts d'exécution et des preuves
- Exigences : FR-2322
- Conception : DES-017-05-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/croiser_preuves.py`, `docs/quality/preuve-2026-11-09-croisement.txt`
- Résultat attendu : Chaque test cité est retrouvé dans la preuve ; 0 problème
- Dépend de : —
- Condition de fin : TEST-017-05-03 réussis
- Tests : TEST-017-05-03
- Statut : Fait (2026-11-09, demande explicite du propriétaire, D-036)

