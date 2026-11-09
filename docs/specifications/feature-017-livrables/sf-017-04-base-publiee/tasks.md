# SF-017-04 — Base de connaissances livrée — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2317, FR-2318 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-017-04-01 — Base publique et README
- Exigences : FR-2317, FR-2318
- Conception : DES-017-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/README.md` (mention de la version publique)
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-017-04-01, TEST-017-04-02 réussis
- Tests : TEST-017-04-01, TEST-017-04-02
- Statut : Fait (2026-11-09) — `kb/README.md` déjà conforme (version publique, procédure UIT) ; contrôle automatisé dans `tests/unit/test_vague_c.py`

