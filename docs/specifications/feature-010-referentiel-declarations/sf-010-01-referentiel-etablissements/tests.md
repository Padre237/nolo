# SF-010-01 — Référentiel des établissements (tuile de démonstration) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1001, FR-1002, FR-1003, FR-1004 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-01-01 — Couverture de la tuile
- Type : Unitaire
- Exigences : FR-1001
- Critères d'acceptation : CA-010-01-01
- Étant donné : `ETABLISSEMENTS`
- Quand : comptage
- Alors : ≥ 20 ; niveaux et spécialités couverts
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-010-01-02 — Fusion sans doublon
- Type : Interface
- Exigences : FR-1003
- Critères d'acceptation : CA-010-01-02
- Étant donné : compte hôpital de démonstration
- Quand : recherche
- Alors : une seule occurrence
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-010-01-03 — Mention fictive
- Type : Interface
- Exigences : FR-1004
- Critères d'acceptation : CA-010-01-03
- Étant donné : une ligne de structure
- Quand : inspection
- Alors : appel désactivé décrit
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-010-01-04 — Schéma
- Type : Unitaire
- Exigences : FR-1002
- Critères d'acceptation : CA-010-01-04
- Étant donné : chaque établissement
- Quand : validation
- Alors : champs présents
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

