# SF-010-04 — Inscription d'un établissement en quatre étapes — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1016, FR-1017, FR-1018, FR-1019, FR-1020, FR-1021, FR-1022 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-04-01 — Format du NIU
- Type : Unitaire
- Exigences : FR-1019
- Critères d'acceptation : CA-010-04-01
- Étant donné : 5 NIU
- Quand : `erreurNiu`
- Alors : 1 accepté, 4 refusés
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-ETS-01 : format du NIU » (`cd app && node --test tests/*.test.mjs`) ; `tests/python/test_etablissements.py::test_ca_ets_01_format_niu` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-04-02 — Unicité
- Type : Unitaire
- Exigences : FR-1020
- Critères d'acceptation : CA-010-04-02
- Étant donné : un compte
- Quand : seconde inscription
- Alors : refus
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_ca_ets_02_niu_et_email_uniques` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-04-03 — Étapes et types
- Type : Interface
- Exigences : FR-1017, FR-1018
- Critères d'acceptation : CA-010-04-03
- Étant donné : étape 2
- Quand : précédent puis suivant
- Alors : saisies conservées ; 5 types
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-010-04-04 — Téléphone et position
- Type : Interface
- Exigences : FR-1021, FR-1022
- Critères d'acceptation : CA-010-04-04
- Étant donné : téléphone invalide ; page dans un cadre
- Quand : validation
- Alors : refus ; commune suffit
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-010-04-05 — Accès depuis l'accueil
- Type : Interface
- Exigences : FR-1016
- Critères d'acceptation : CA-010-04-05
- Étant donné : l'accueil
- Quand : toucher le lien
- Alors : `#/pro`
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

