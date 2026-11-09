# MT-002 — Assemblage du monorepo Nolo — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | MT Maintenance |
| Sous-fonctionnalité | MT-002 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2401, FR-2402, FR-2403 |

## 1. Environnement et données
Python 3, Node 22.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-M02-01 — Arborescence
- Type : Revue
- Exigences : FR-2401
- Critères d'acceptation : CA-M02-01
- Étant donné : le dépôt
- Quand : `ls`
- Alors : conforme
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-M02-02 — Suites vertes
- Type : Intégration
- Exigences : FR-2402
- Critères d'acceptation : CA-M02-02
- Étant donné : le dépôt assemblé
- Quand : toutes les suites
- Alors : toutes réussissent
- Données : —
- Automatisation : `python3 -m pytest -q` ; `node --test tests/js/*.test.mjs` ; `cd app && node --test tests/*.test.mjs` ; `python3 tools/scenarios/executer.py --scenario regroupement`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-M02-03 — Documents de reprise
- Type : Revue
- Exigences : FR-2403
- Critères d'acceptation : CA-M02-03
- Étant donné : les documents
- Quand : lecture
- Alors : arborescence décrite
- Données : —
- Automatisation : —
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (revue : carte du dépôt au §4 de `CLAUDE.md`, §3 de `docs/ETAT.md`, catalogue `docs/specifications/README.md`)

