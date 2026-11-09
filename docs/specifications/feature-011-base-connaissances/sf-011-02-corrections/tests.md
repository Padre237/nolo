# SF-011-02 — Corrections sur le texte officiel — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1106, FR-1107 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-011-02-01 — Art. 48 relu
- Type : Unitaire
- Exigences : FR-1106
- Critères d'acceptation : CA-011-02-01
- Étant donné : la v9
- Quand : lecture du fragment
- Alors : texte relu et `correction`
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-011-02-02 — Drapeaux OCR
- Type : Unitaire
- Exigences : FR-1107
- Critères d'acceptation : CA-011-02-02
- Étant donné : la v9
- Quand : lecture des fragments
- Alors : `qa_flags` non vide
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

