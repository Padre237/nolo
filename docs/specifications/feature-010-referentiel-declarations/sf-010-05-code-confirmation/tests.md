# SF-010-05 — Code de confirmation de l'e-mail — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1023, FR-1024, FR-1025 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-05-01 — Usage unique et expiration
- Type : Unitaire
- Exigences : FR-1023
- Critères d'acceptation : CA-010-05-01
- Étant donné : un code
- Quand : seconde saisie ; 15 min plus tard
- Alors : refus
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_code_a_usage_unique` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-05-02 — Pas de fiche sans code
- Type : Unitaire
- Exigences : FR-1024
- Critères d'acceptation : CA-010-05-02
- Étant donné : compte non confirmé
- Quand : envoi de fiche
- Alors : refus
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_ca_ets_03_sans_code_pas_de_connexion_ni_fiche` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-05-03 — Boîte simulée
- Type : Interface
- Exigences : FR-1025
- Critères d'acceptation : CA-010-05-03
- Étant donné : l'écran du code
- Quand : inspection
- Alors : boîte et bouton
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

