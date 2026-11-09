# SF-007-12 — Rejeu d'une session — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-773, FR-774 |

## 1. Environnement et données
Python 3 + pytest + PyYAML (`python3 -m pytest -q`) ; scénarios `python3 tools/scenarios/executer.py --scenario <id> [--sans-gouvernance] [--politique config/variantes/<v>.yaml]`. Base v9 (`kb/kb_chunks.jsonl`). Pour Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-12-01 — Même décision
- Type : Intégration
- Exigences : FR-773
- Critères d'acceptation : CA-007-12-01
- Étant donné : journal S2
- Quand : rejeu
- Alors : mêmes verdicts
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-12-02 — Différences listées
- Type : Intégration
- Exigences : FR-774
- Critères d'acceptation : CA-007-12-02
- Étant donné : variante
- Quand : rejeu
- Alors : différence listée
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

