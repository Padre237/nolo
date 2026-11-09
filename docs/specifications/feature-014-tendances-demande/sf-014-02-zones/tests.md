# SF-014-02 — Zones : arrondissements, départements, régions — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2005, FR-2006 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-014-02-01 — Douala V et repli national
- Type : Intégration
- Exigences : FR-2005
- Critères d'acceptation : CA-014-02-01
- Étant donné : polygones ADM3
- Quand : rattachement
- Alors : conforme
- Données : —
- Automatisation : `tests/python/test_tendances.py::test_ca_tend_03_localisation_par_l_arrondissement_et_le_code_ins` (`python3 -m pytest -q`), `test_ca_tend_04_repli_a_15_km`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-014-02-02 — Polygone sans code
- Type : Intégration
- Exigences : FR-2006
- Critères d'acceptation : CA-014-02-02
- Étant donné : polygone sans INS
- Quand : liste des zones
- Alors : national seulement
- Données : —
- Automatisation : `tests/python/test_tendances.py::test_zone_sans_code_valide_au_niveau_national_seulement` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

