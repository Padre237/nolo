# SF-010-07 — Vérification de l'agrément avant toute visibilité — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1029, FR-1030, FR-1031, FR-1032 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-07-01 — Non vérifié invisible
- Type : Unitaire
- Exigences : FR-1029
- Critères d'acceptation : CA-010-07-01
- Étant donné : établissement non vérifié
- Quand : recherche
- Alors : absent
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-ETS-07 : un établissement non vérifié n’apparaît jamais » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-07-02 — Liste simulée
- Type : Unitaire
- Exigences : FR-1030
- Critères d'acceptation : CA-010-07-02
- Étant donné : deux NIU
- Quand : envoi de la fiche
- Alors : vérifié / en attente
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_niu_de_la_liste_simulee_verifie_automatiquement` (`python3 -m pytest -q`), `test_ca_ets_05_niu_absent_de_la_liste_reste_invisible`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-07-03 — Changement de NIU
- Type : Unitaire
- Exigences : FR-1031
- Critères d'acceptation : CA-010-07-03
- Étant donné : vérifié
- Quand : changement de NIU
- Alors : en attente
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_ca_ets_12_changement_sensible` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-07-04 — Décision du vérificateur
- Type : Unitaire
- Exigences : FR-1032
- Critères d'acceptation : CA-010-07-04
- Étant donné : dossier en attente
- Quand : acceptation puis refus
- Alors : visible ; motif affiché
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_ca_ets_06_decision_du_verificateur` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

