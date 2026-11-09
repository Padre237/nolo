# SF-004-01 — Catalogue des DCI et normalisation de la saisie — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-407, FR-420, FR-421 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-004-01-01 — Art. 75 exclu
- Type : Unitaire
- Exigences : FR-407
- Critères d'acceptation : CA-004-01-01
- Étant donné : « misoprostol »
- Quand : filtre
- Alors : aucune proposition
- Données : —
- Automatisation : `app/tests/recherche.test.mjs` › « TEST-004-01-01 à 03 : catalogue des DCI et filtre » ; `app/tests/recherche.test.mjs` › « TEST-004-01-01 à 03 : catalogue des DCI et filtre » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-004-01-02 — Saisie tolérante
- Type : Unitaire
- Exigences : FR-421
- Critères d'acceptation : CA-004-01-02
- Étant donné : « PARACE »
- Quand : filtre
- Alors : Paracétamol ; ≤ 8
- Données : —
- Automatisation : `app/tests/recherche.test.mjs` › « TEST-004-01-01 à 03 : catalogue des DCI et filtre » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-004-01-03 — Catalogue
- Type : Unitaire
- Exigences : FR-420
- Critères d'acceptation : CA-004-01-03
- Étant donné : `DCI`
- Quand : lecture
- Alors : 16 entrées, 2 sensibles
- Données : —
- Automatisation : `app/tests/recherche.test.mjs` › « TEST-004-01-01 à 03 : catalogue des DCI et filtre » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

