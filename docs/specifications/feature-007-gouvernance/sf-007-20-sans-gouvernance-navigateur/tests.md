# SF-007-20 — « Rejouer sans gouvernance » dans Nolo — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-20 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1931, FR-1932, FR-1933 |

## 1. Environnement et données
Nolo (navigateur) : `cd app && node --test tests/*.test.mjs` ; la référence Python sert d'oracle : `python3 tools/scenarios/executer.py` produit les journaux attendus (`tests/reports/`). WebCrypto SHA-256 dans le navigateur ; `node:crypto` dans les tests.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-20-01 — Violations sans gouvernance
- Type : Unitaire
- Exigences : FR-1931, FR-1932
- Critères d'acceptation : CA-007-20-01
- Étant donné : parcours S1 à S4
- Quand : rejouer sans puis avec
- Alors : ≥ 5 puis 0
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-20-02 — Impossible hors démo
- Type : Unitaire
- Exigences : FR-1933
- Critères d'acceptation : CA-007-20-02
- Étant donné : mode complet simulé
- Quand : rendu
- Alors : bouton absent
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

