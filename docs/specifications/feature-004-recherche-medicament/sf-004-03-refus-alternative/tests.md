# SF-004-03 — Aucune alternative, posologie ni promotion — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-404, FR-425 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-004-03-01 — Aucune alternative
- Type : Unitaire
- Exigences : FR-404, FR-425
- Critères d'acceptation : CA-004-03-01
- Étant donné : DCI sans résultat
- Quand : rendu et `demander_alternative`
- Alors : aucune autre DCI ; refus côté référence
- Données : —
- Automatisation : `python3 kb/services/test_services.py` (11 contrôles de la logique de référence)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

