# SF-007-17 — Gouvernance dans Nolo : orchestrateur, Conformité et politique dans le navigateur — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-17 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1901, FR-1902, FR-1903, FR-1904, FR-1905, NFR-1901 |

## 1. Environnement et données
Nolo (navigateur) : `cd app && node --test tests/*.test.mjs` ; la référence Python sert d'oracle : `python3 tools/scenarios/executer.py` produit les journaux attendus (`tests/reports/`). WebCrypto SHA-256 dans le navigateur ; `node:crypto` dans les tests.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-17-01 — Pas d'action sans décision
- Type : Unitaire
- Exigences : FR-1901
- Critères d'acceptation : CA-007-17-01
- Étant donné : une action sans décision ; une action inconnue
- Quand : `executer`
- Alors : rien n'est fait ; erreur ou sans fondement
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-17-02 — Fragments existants
- Type : Unitaire
- Exigences : FR-1902
- Critères d'acceptation : CA-007-17-02
- Étant donné : toutes les décisions des tests
- Quand : contrôle des fragments
- Alors : tous dans la base
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-17-03 — Politique convertie
- Type : Unitaire
- Exigences : FR-1903
- Critères d'acceptation : CA-007-17-03
- Étant donné : `policy.yaml`
- Quand : `python3 tools/politique_json.py`
- Alors : même version et empreinte
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-17-04 — Parité JS / Python
- Type : Propriété
- Exigences : FR-1904
- Critères d'acceptation : CA-007-17-04
- Étant donné : décisions attendues
- Quand : rejeu en JS
- Alors : 0 écart
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-17-05 — Mode démo
- Type : Unitaire
- Exigences : FR-1905
- Critères d'acceptation : CA-007-17-05
- Étant donné : Nolo
- Quand : lecture du mode
- Alors : `demo_synthetique`
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-17-06 — Décision rapide
- Type : Performance
- Exigences : NFR-1901
- Critères d'acceptation : —
- Étant donné : politique chargée
- Quand : 1 000 décisions
- Alors : médiane ≤ 5 ms ; `politique.json` ≤ 30 Kio
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

