# SF-010-12 — Comptes de démonstration (officine et hôpital) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1053, FR-1054 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-12-01 — Ouverture du compte hôpital
- Type : Interface
- Exigences : FR-1053
- Critères d'acceptation : CA-010-12-01
- Étant donné : l'entrée pro
- Quand : toucher « hôpital »
- Alors : tableau de bord vérifié
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-010-12-02 — Données fictives
- Type : Revue
- Exigences : FR-1054
- Critères d'acceptation : CA-010-12-02
- Étant donné : les comptes
- Quand : lecture
- Alors : NIU simulés, mention
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

