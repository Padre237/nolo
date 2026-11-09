# SF-008-09 — Consentement aux signalements — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-881 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; navigateur Chrome + Playwright (`tools/inspecter.py`). Stockage local préfixé `nolo:`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-008-09-01 — Bouton masqué sans consentement
- Type : Interface
- Exigences : FR-881
- Critères d'acceptation : CA-008-09-01
- Étant donné : sans la case
- Quand : recherche de médicament
- Alors : aucun bouton « Signaler »
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

