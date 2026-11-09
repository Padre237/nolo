# SF-008-03 — Position du citoyen : géolocalisation consentie ou quartier saisi — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-821, FR-822, FR-823 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; navigateur Chrome + Playwright (`tools/inspecter.py`). Stockage local préfixé `nolo:`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-008-03-01 — Refus → quartier
- Type : Interface
- Exigences : FR-821
- Critères d'acceptation : CA-008-03-01
- Étant donné : une recherche
- Quand : refus de la position
- Alors : liste des quartiers
- Données : —
- Automatisation : `app/tests/ecrans.test.mjs` › « TEST-008-03-01 à 03 : position consentie, arrondie, jamais stockée ; quartier ; cadre » ; `app/tests/ecrans.test.mjs` › « TEST-008-03-01 à 03 : position consentie, arrondie, jamais stockée ; quartier ; cadre » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-008-03-02 — Arrondi et mémoire
- Type : Unitaire
- Exigences : FR-822
- Critères d'acceptation : CA-008-03-02
- Étant donné : (4.05123, 9.76789)
- Quand : `arrondir`
- Alors : (4.05, 9.77) ; rien en stockage
- Données : —
- Automatisation : `app/tests/ecrans.test.mjs` › « TEST-008-03-01 à 03 : position consentie, arrondie, jamais stockée ; quartier ; cadre » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-008-03-03 — Repli dans un cadre
- Type : Interface
- Exigences : FR-823
- Critères d'acceptation : CA-008-03-03
- Étant donné : page dans un cadre
- Quand : recherche
- Alors : point de référence et mention
- Données : —
- Automatisation : `app/tests/ecrans.test.mjs` › « TEST-008-03-01 à 03 : position consentie, arrondie, jamais stockée ; quartier ; cadre » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

