# SF-011-05 — Correspondance article → nœud Y.3172 → agent — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1116, FR-1117 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-011-05-01 — Fragments existants
- Type : Unitaire
- Exigences : FR-1116
- Critères d'acceptation : CA-011-05-01
- Étant donné : le CSV
- Quand : contrôle
- Alors : 0 introuvable
- Données : —
- Automatisation : `python3 tools/verifier_base.py --reconstruire`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-011-05-02 — Vue Markdown
- Type : Unitaire
- Exigences : FR-1117
- Critères d'acceptation : CA-011-05-02
- Étant donné : le CSV
- Quand : régénération
- Alors : identique
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

