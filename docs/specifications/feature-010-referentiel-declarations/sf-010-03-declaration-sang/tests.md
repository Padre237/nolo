# SF-010-03 — Déclaration des niveaux de sang — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-501, FR-1013, FR-1014 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-03-01 — Onglet sang
- Type : Unitaire
- Exigences : FR-1013, FR-501
- Critères d'acceptation : CA-010-03-01
- Étant donné : hôpital H8 = non puis oui
- Quand : `ongletsStock`
- Alors : absent puis groupes cochés
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-ETS-04 : officine sans questions H ni B ; hôpital H8 = non sans H8a ni onglet sang » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-03-02 — Expiration à 6 h
- Type : Unitaire
- Exigences : FR-1014
- Critères d'acceptation : CA-010-03-02
- Étant donné : déclaration de 6 h 01
- Quand : `chercherSang`
- Alors : absente
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

