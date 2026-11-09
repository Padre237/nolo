# SF-008-04 — Âge et accord parental — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-107, FR-831, FR-832 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; navigateur Chrome + Playwright (`tools/inspecter.py`). Stockage local préfixé `nolo:`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-008-04-01 — Âge exigé
- Type : Unitaire
- Exigences : FR-831
- Critères d'acceptation : CA-008-04-01
- Étant donné : une case, âge vide
- Quand : `erreur`
- Alors : `E-CONS-AGE`
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-CONS-02 : une case sans âge → refus » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-008-04-02 — Accord parental
- Type : Unitaire
- Exigences : FR-832
- Critères d'acceptation : CA-008-04-02
- Étant donné : mineur
- Quand : `erreur` sans puis avec accord
- Alors : `E-CONS-PARENTAL` puis `null`
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-CONS-03 : mineur sans accord → refus ; avec accord → accepté » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

