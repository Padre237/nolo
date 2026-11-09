# SF-003-01 — Choix de la spécialité dans une liste fermée — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-301, FR-304, FR-320, FR-321, FR-322 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-003-01-01 — Liste bilingue de 19 spécialités
- Type : Unitaire
- Exigences : FR-321, FR-301
- Critères d'acceptation : CA-003-01-01
- Étant donné : les catalogues
- Quand : comparaison des clés
- Alors : 19 clés FR = EN
- Données : —
- Automatisation : `app/tests/i18n.test.mjs` › « Mêmes clés en français et en anglais » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-003-01-02 — Aucune spécialité déduite hors POC
- Type : Interface
- Exigences : FR-320, FR-304
- Critères d'acceptation : CA-003-01-02
- Étant donné : un parcours sans POC
- Quand : fin du parcours
- Alors : aucune recherche de spécialité
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-003-01-03 — Synonymes
- Type : Unitaire
- Exigences : FR-322
- Critères d'acceptation : CA-003-01-03
- Étant donné : « cœur »
- Quand : `resoudreSpecialite`
- Alors : `cardiologie`
- Données : —
- Automatisation : `python3 kb/services/test_services.py` (11 contrôles de la logique de référence)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

