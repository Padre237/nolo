# SF-007-18 — Panneau « Comment Nolo a décidé » — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-18 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1911, FR-1912, FR-1913, FR-1914, FR-1915 |

## 1. Environnement et données
Nolo (navigateur) : `cd app && node --test tests/*.test.mjs` ; la référence Python sert d'oracle : `python3 tools/scenarios/executer.py` produit les journaux attendus (`tests/reports/`). WebCrypto SHA-256 dans le navigateur ; `node:crypto` dans les tests.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-18-01 — Panneau présent
- Type : Interface
- Exigences : FR-1911
- Critères d'acceptation : CA-007-18-01
- Étant donné : six écrans
- Quand : rendu
- Alors : panneau présent
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-18-02 — Chaîne des agents
- Type : Interface
- Exigences : FR-1912
- Critères d'acceptation : CA-007-18-02
- Étant donné : écran Urgence
- Quand : déplier
- Alors : étapes dans l'ordre
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-18-03 — Fragment cité
- Type : Unitaire
- Exigences : FR-1913
- Critères d'acceptation : CA-007-18-03
- Étant donné : une décision
- Quand : rendu du fragment
- Alors : quatre éléments ; extrait ≤ 240
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-18-04 — Pas de texte libre
- Type : Confidentialité
- Exigences : FR-1914
- Critères d'acceptation : CA-007-18-04
- Étant donné : un texte libre
- Quand : lecture du panneau
- Alors : aucun mot du texte
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-18-05 — Extrait anglais
- Type : Unitaire
- Exigences : FR-1915
- Critères d'acceptation : CA-007-18-05
- Étant donné : interface EN
- Quand : rendu
- Alors : officiel ou « Unofficial translation »
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

