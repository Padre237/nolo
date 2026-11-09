# SF-012-02 — Établissements, stocks et signalements simulés (référence Python) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1204, FR-1205 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-012-02-01 — Régénération
- Type : Unitaire
- Exigences : FR-1204
- Critères d'acceptation : CA-012-02-01
- Étant donné : graine
- Quand : régénération
- Alors : identique
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-012-02-02 — 11 contrôles
- Type : Unitaire
- Exigences : FR-1205
- Critères d'acceptation : CA-012-02-02
- Étant donné : les données
- Quand : `python3 -I kb/services/test_services.py`
- Alors : 11/11
- Données : —
- Automatisation : —
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

