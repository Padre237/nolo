# SF-007-17 — Gouvernance dans Nolo : orchestrateur, Conformité et politique dans le navigateur — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-17 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1901, FR-1902, FR-1903, FR-1904, FR-1905, NFR-1901 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-17-01 — Écrire les tests de parité et d'orchestration (avant le code)
- Exigences : FR-1901, FR-1902, FR-1904, FR-1905
- Conception : DES-007-17-01, DES-007-17-02, DES-007-17-04
- Fichiers à lire : `src/server/agents/conformite.py`, `src/server/agents/orchestrateur.py`, `tests/unit/test_gouvernance.py`
- Fichiers à créer ou modifier : `app/tests/parite_conformite.test.mjs`, `app/tests/orchestrateur.test.mjs`
- Résultat attendu : Tests rouges
- Dépend de : —
- Condition de fin : TEST-007-17-01, TEST-007-17-02, TEST-007-17-04, TEST-007-17-05 réussis
- Tests : TEST-007-17-01, TEST-007-17-02, TEST-007-17-04, TEST-007-17-05
- Statut : À faire

### TASK-007-17-02 — Exporter les décisions attendues depuis Python
- Exigences : FR-1904
- Conception : DES-007-17-04
- Fichiers à lire : `tools/scenarios/executer.py`
- Fichiers à créer ou modifier : `tools/scenarios/executer.py` (option `--exporter-attendus`)
- Résultat attendu : `tests/js/fixtures/decisions_attendues.json`
- Dépend de : —
- Condition de fin : TEST-007-17-04 réussis
- Tests : TEST-007-17-04
- Statut : À faire

### TASK-007-17-03 — Convertir la politique
- Exigences : FR-1903
- Conception : DES-007-17-03
- Fichiers à lire : `config/policy.yaml`, `src/server/gouvernance/politique.py`
- Fichiers à créer ou modifier : `tools/politique_json.py`, `app/data/politique.json`, `app/js/domain/politique.js`
- Résultat attendu : Même version et empreinte
- Dépend de : —
- Condition de fin : TEST-007-17-03 réussis
- Tests : TEST-007-17-03
- Statut : À faire

### TASK-007-17-04 — Porter Conformité et orchestrateur
- Exigences : FR-1901, FR-1902, FR-1904, FR-1905
- Conception : DES-007-17-01, DES-007-17-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/agents/conformite.js`, `app/js/agents/orchestrateur.js`
- Résultat attendu : Tests verts
- Dépend de : TASK-007-17-01, TASK-007-17-02, TASK-007-17-03
- Condition de fin : TEST-007-17-01, TEST-007-17-02, TEST-007-17-04, TEST-007-17-05 réussis
- Tests : TEST-007-17-01, TEST-007-17-02, TEST-007-17-04, TEST-007-17-05
- Statut : À faire

