# SF-010-06 — Fiche conditionnelle selon le type — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1026, FR-1027, FR-1028, FR-1033, FR-1037, FR-1039 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-06-01 — Questions selon le type
- Type : Unitaire
- Exigences : FR-1026
- Critères d'acceptation : CA-010-06-01
- Étant donné : officine ; hôpital H8 = non
- Quand : `questionsVisibles`
- Alors : conforme
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-ETS-04 : officine sans questions H ni B ; hôpital H8 = non sans H8a ni onglet sang » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-06-02 — Question masquée non enregistrée
- Type : Unitaire
- Exigences : FR-1027
- Critères d'acceptation : CA-010-06-02
- Étant donné : H8a répondue puis H8 = non
- Quand : `nettoyer`
- Alors : H8a absente
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-ETS-05 : une réponse à une question masquée n’est pas enregistrée » (`cd app && node --test tests/*.test.mjs`) ; `tests/python/test_etablissements.py::test_fiche_questions_masquees_non_enregistrees` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-06-03 — Complétude des spécialités
- Type : Unitaire
- Exigences : FR-1028
- Critères d'acceptation : CA-010-06-03
- Étant donné : spécialité sans modalité
- Quand : `completude`
- Alors : < 100 %
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_fiche_champs_conditionnels_obligatoires` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-06-04 — Questions du centre spécialisé
- Type : Unitaire
- Exigences : FR-1033
- Critères d'acceptation : CA-010-06-04
- Étant donné : type `centre_specialise`
- Quand : `questionsVisibles`
- Alors : S1 à S5 présentes
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-010-06-05 — Aucun champ promotionnel
- Type : Revue
- Exigences : FR-1037
- Critères d'acceptation : CA-010-06-05
- Étant donné : `QUESTIONS`
- Quand : lecture
- Alors : aucun champ promotionnel
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-010-06-06 — Catalogues de la fiche
- Type : Unitaire
- Exigences : FR-1039
- Critères d'acceptation : CA-010-06-06
- Étant donné : catalogues
- Quand : comparaison
- Alors : mêmes clés
- Données : —
- Automatisation : `app/tests/i18n.test.mjs` › « Mêmes clés en français et en anglais » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

