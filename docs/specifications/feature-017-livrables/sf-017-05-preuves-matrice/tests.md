# SF-017-05 — Preuves d'exécution et matrice de traçabilité — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2320, FR-2321, FR-2322 |

## 1. Environnement et données
Python 3, Node 22, Chrome.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-017-05-01 — Traçabilité
- Type : Intégration
- Exigences : FR-2320
- Critères d'acceptation : CA-017-05-01
- Étant donné : le dépôt
- Quand : `python3 tools/trace.py`
- Alors : code 0
- Données : —
- Automatisation : `python3 tools/trace.py`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-017-05-02 — Preuves datées
- Type : Revue
- Exigences : FR-2321
- Critères d'acceptation : CA-017-05-02
- Étant donné : `docs/quality/`
- Quand : lecture
- Alors : fichiers présents
- Données : —
- Automatisation : —
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (revue : `docs/quality/preuve-2026-11-09-suites.txt` et `docs/quality/preuve-2026-11-09-inspection-visuelle.txt` présents)

### TEST-017-05-03 — Croisement
- Type : Intégration
- Exigences : FR-2322
- Critères d'acceptation : CA-017-05-03
- Étant donné : la preuve des suites
- Quand : `python3 tools/croiser_preuves.py docs/quality/preuve-2026-11-09-suites.txt`
- Alors : problèmes : 0
- Données : —
- Automatisation : `tools/croiser_preuves.py`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-croisement.txt`)

