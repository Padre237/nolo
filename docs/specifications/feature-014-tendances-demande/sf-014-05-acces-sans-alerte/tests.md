# SF-014-05 — Accès réservé, sans alerte ni export brut — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2017, FR-2018 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-014-05-01 — Non vérifié refusé
- Type : Unitaire
- Exigences : FR-2018
- Critères d'acceptation : CA-014-05-01
- Étant donné : établissement en attente
- Quand : ouvrir Tendances
- Alors : refus
- Données : —
- Automatisation : `tests/python/test_tendances.py::test_ca_tend_08_reserve_aux_etablissements_verifies` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-014-05-02 — Aucune route brute
- Type : Revue
- Exigences : FR-2017
- Critères d'acceptation : CA-014-05-02
- Étant donné : `app.py`
- Quand : liste des routes
- Alors : aucune route brute
- Données : —
- Automatisation : `tests/python/test_tendances.py::test_ca_tend_09_aucune_valeur_brute_ni_route_brute` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

