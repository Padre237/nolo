# SF-014-01 — Compteurs anonymes de la demande — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2001, FR-2002 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-014-01-01 — Un compteur, rien d'autre
- Type : Intégration
- Exigences : FR-2001
- Critères d'acceptation : CA-014-01-01
- Étant donné : service D-032
- Quand : recherche de paracétamol
- Alors : compteur +1 ; aucune autre donnée
- Données : —
- Automatisation : `tests/python/test_tendances.py::test_ca_tend_01_une_recherche_un_compteur_rien_d_autre` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-014-01-02 — Sensibles jamais comptés
- Type : Intégration
- Exigences : FR-2002
- Critères d'acceptation : CA-014-01-02
- Étant donné : service D-032
- Quand : recherches sensibles
- Alors : aucun compteur modifié
- Données : —
- Automatisation : `tests/python/test_tendances.py::test_ca_tend_02_recherches_sensibles_jamais_comptees` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

