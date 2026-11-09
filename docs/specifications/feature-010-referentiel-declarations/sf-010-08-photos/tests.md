# SF-010-08 — Photos de l'établissement — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1034, FR-1035, FR-1036 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-08-01 — Case et format
- Type : Unitaire
- Exigences : FR-1034
- Critères d'acceptation : CA-010-08-01
- Étant donné : photo sans case ; faux JPEG
- Quand : ajout
- Alors : refus
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_photo_exige_la_case_et_un_vrai_format` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-08-02 — Métadonnées supprimées
- Type : Unitaire
- Exigences : FR-1035
- Critères d'acceptation : CA-010-08-02
- Étant donné : photo avec GPS
- Quand : enregistrement
- Alors : sans métadonnées
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_ca_ets_10_metadonnees_supprimees` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-08-03 — Photo de façade exigée
- Type : Unitaire
- Exigences : FR-1036
- Critères d'acceptation : CA-010-08-03
- Étant donné : fiche sans photo
- Quand : envoi
- Alors : refus
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_fiche_exige_photo_de_facade` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

