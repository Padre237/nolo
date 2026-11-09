# SF-006-03 — Départage des pharmacies proches — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-605 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-006-03-01 — Règle
- Type : Unitaire
- Exigences : FR-605
- Critères d'acceptation : CA-006-03-01
- Étant donné : données synthétiques `data/synthetic/signalements.csv`
- Quand : calcul de référence
- Alors : conforme au critère
- Données : —
- Automatisation : `python3 kb/services/test_services.py` (11 contrôles de la logique de référence)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-006-03-02 — Parité Nolo / référence
- Type : Unitaire
- Exigences : FR-605
- Critères d'acceptation : CA-006-03-01
- Étant donné : les mêmes signalements
- Quand : calcul JS et Python
- Alors : mêmes valeurs
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

