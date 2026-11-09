# SF-010-02 — Déclaration du stock de médicaments (import d'un fichier) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-401, FR-1006, FR-1007, FR-1008, FR-1009, FR-1010 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-02-01 — Quatre motifs de rejet
- Type : Unitaire
- Exigences : FR-1008
- Critères d'acceptation : CA-010-02-01
- Étant donné : fichier d'exemple
- Quand : `lireFichier`
- Alors : 4 rejets distincts
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-ETS-07 et 08 : rapport d’import, quatre motifs distincts ; PDF refusé » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-02-02 — PDF refusé
- Type : Unitaire
- Exigences : FR-1007
- Critères d'acceptation : CA-010-02-02
- Étant donné : un PDF
- Quand : `lireFichier`
- Alors : refus
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-ETS-07 et 08 : rapport d’import, quatre motifs distincts ; PDF refusé » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-02-03 — Expiration à 48 h
- Type : Unitaire
- Exigences : FR-1009
- Critères d'acceptation : CA-010-02-03
- Étant donné : une ligne de 48 h 01
- Quand : `fraicheur`
- Alors : expirée ; alerte 12 h avant
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-ETS-10 : expiration à 48 h, alerte 12 h avant » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-02-04 — Onglet selon le type
- Type : Unitaire
- Exigences : FR-401
- Critères d'acceptation : CA-010-02-04
- Étant donné : centre de santé sans pharmacie
- Quand : `ongletsStock`
- Alors : aucun onglet Stock
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-ETS-04 : officine sans questions H ni B ; hôpital H8 = non sans H8a ni onglet sang » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-02-05 — Modèle et rapport
- Type : Interface
- Exigences : FR-1006, FR-1010
- Critères d'acceptation : CA-010-02-05
- Étant donné : page dans un cadre
- Quand : ouvrir Stock, importer l'exemple
- Alors : « Copier le modèle » ; rapport 6 acceptées / 4 rejetées
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-010-02-06 — Référence serveur
- Type : Intégration
- Exigences : FR-1007, FR-1008, FR-1009
- Critères d'acceptation : CA-010-02-01, CA-010-02-02, CA-010-02-03
- Étant donné : service D-029
- Quand : import XLSX/CSV
- Alors : rapport conforme ; formats refusés ; expiration
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_ca_ets_07_rapport_ligne_par_ligne` (`python3 -m pytest -q`), `test_ca_ets_08_formats_refuses`, `test_ca_ets_09_expiration_et_confirmation`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

