# SF-011-06 — Traductions, versions anglaises officielles et glossaire — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1119, FR-1120, FR-1121 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-011-06-01 — Contrôle conforme
- Type : Unitaire
- Exigences : FR-1119, FR-1120
- Critères d'acceptation : CA-011-06-01
- Étant donné : la v9
- Quand : `python3 -I kb/traductions/verifier_traductions.py`
- Alors : conforme, code 0
- Données : —
- Automatisation : —
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-011-06-02 — Versions officielles
- Type : Unitaire
- Exigences : FR-1121
- Critères d'acceptation : CA-011-06-02
- Étant donné : loi 2019/019
- Quand : lecture
- Alors : 8 fragments officiels
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

