# SF-014-03 — Seuil de 5, arrondi à 5, semaines complètes — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2009, FR-2010 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-014-03-01 — Seuil et arrondi
- Type : Unitaire
- Exigences : FR-2009
- Critères d'acceptation : CA-014-03-01
- Étant donné : 3 et 23
- Quand : `afficher`
- Alors : « moins de 5 » et 25
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-TEND-05 : 3 → « moins de 5 » ; 23 → 25 » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-014-03-02 — Semaine en cours exclue
- Type : Unitaire
- Exigences : FR-2010
- Critères d'acceptation : CA-014-03-02
- Étant donné : un lundi
- Quand : `tendances`
- Alors : semaine en cours absente
- Données : —
- Automatisation : `tests/python/test_tendances.py::test_ca_tend_06_semaines_completes_seulement` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

