# SF-008-06 — Droits face à la décision automatisée — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-108, FR-851 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; navigateur Chrome + Playwright (`tools/inspecter.py`). Stockage local préfixé `nolo:`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-008-06-01 — Droits sur les écrans de résultat
- Type : Interface
- Exigences : FR-108, FR-851
- Critères d'acceptation : CA-008-06-01
- Étant donné : les cinq écrans
- Quand : rendu FR et EN
- Alors : bloc et lien présents
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

