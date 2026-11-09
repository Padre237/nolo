# SF-005-03 — La recherche de sang ne court-circuite jamais l'alerte d'urgence — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-005 Recherche de sang |
| Sous-fonctionnalité | SF-005-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-505, FR-522 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-005-03-01 — Urgence rappelée
- Type : Interface
- Exigences : FR-505, FR-522
- Critères d'acceptation : CA-005-03-01
- Étant donné : onglet Sang
- Quand : rendu
- Alors : barre et phrase visibles
- Données : —
- Automatisation : `app/tests/ecrans.test.mjs` › « TEST-005-03-01 : l’onglet Sang rappelle d’abord l’urgence » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

