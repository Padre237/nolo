# SF-013-10 — Inspection visuelle automatisée — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1344, FR-1345, FR-1346, FR-1347 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-013-10-01 — Script d'inspection versionné
- Exigences : FR-1344, FR-1345
- Conception : DES-013-10-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/inspecter.py`
- Résultat attendu : Rapport et captures
- Dépend de : —
- Condition de fin : TEST-013-10-01 réussis
- Tests : TEST-013-10-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-10-02 — Preuve datée de la livraison du 2026-11-09
- Exigences : FR-1346
- Conception : DES-013-10-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `docs/quality/preuve-2026-11-09-inspection-visuelle.txt`
- Résultat attendu : Preuve écrite
- Dépend de : —
- Condition de fin : TEST-013-10-02 réussis
- Tests : TEST-013-10-02
- Statut : Fait (2026-11-09)

### TASK-013-10-03 — Assertions de contenu par état
- Exigences : FR-1347
- Conception : DES-013-10-01
- Fichiers à lire : `les tests concernés : `grep -rn "état atteint et capturé" docs/specifications --include=tests.md``
- Fichiers à créer ou modifier : `tools/inspecter.py`
- Résultat attendu : Chaque test d'interface concerné a son assertion ; le rapport les compte
- Dépend de : —
- Condition de fin : les tests concernés passent à « Exécuté » avec la nouvelle preuve
- Tests : TEST-013-10-03
- Statut : À faire

