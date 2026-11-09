# SF-012-01 — Patients et séries de surveillance synthétiques (référence Python) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1201, FR-1202 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-012-01-01 — Régénération identique
- Type : Unitaire
- Exigences : FR-1201
- Critères d'acceptation : CA-012-01-01
- Étant donné : graine fixe
- Quand : régénération
- Alors : identique
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-012-01-02 — Métadonnées
- Type : Revue
- Exigences : FR-1202
- Critères d'acceptation : CA-012-01-02
- Étant donné : README
- Quand : lecture
- Alors : complètes
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

