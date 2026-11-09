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
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-008-03-02 — Arrondi et mémoire
- Type : Unitaire
- Exigences : FR-822
- Critères d'acceptation : CA-008-03-02
- Étant donné : (4.05123, 9.76789)
- Quand : `arrondir`
- Alors : (4.05, 9.77) ; rien en stockage
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-008-03-03 — Repli dans un cadre
- Type : Interface
- Exigences : FR-823
- Critères d'acceptation : CA-008-03-03
- Étant donné : page dans un cadre
- Quand : recherche
- Alors : point de référence et mention
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

