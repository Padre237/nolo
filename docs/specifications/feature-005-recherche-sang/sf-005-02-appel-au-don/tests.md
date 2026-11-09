# SF-005-02 — Appel au don — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-005 Recherche de sang |
| Sous-fonctionnalité | SF-005-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-504 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-005-02-01 — Appel à la majorité
- Type : Unitaire
- Exigences : FR-504
- Critères d'acceptation : CA-005-02-01
- Étant donné : 2 ruptures sur 3 puis 1 sur 3
- Quand : `chercherSang('B−')`
- Alors : vrai puis faux
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

