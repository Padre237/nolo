# SF-006-05 — Décision du modérateur sur une rafale — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-610 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-006-05-01 — Règle
- Type : Unitaire
- Exigences : FR-610
- Critères d'acceptation : CA-006-05-01
- Étant donné : données synthétiques `data/synthetic/signalements.csv`
- Quand : calcul de référence
- Alors : conforme au critère
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

