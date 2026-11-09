# SF-011-07 — Version publique de la base (droits) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1123, FR-1124, FR-1125 |

## 1. Environnement et données
Python 3 (`python3 -I kb/build_kb.py`, `python3 -I kb/eval/run_eval.py --embed bm25`, `python3 -I kb/traductions/verifier_traductions.py`). ChromaDB et Ollama : poste de l'équipe seulement (installation impossible dans l'environnement de Claude).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-011-07-01 — Texte réservé absent
- Type : Unitaire
- Exigences : FR-1123
- Critères d'acceptation : CA-011-07-01
- Étant donné : le dépôt
- Quand : recherche
- Alors : aucune occurrence ; 2 034 fragments
- Données : —
- Automatisation : `python3 tools/verifier_base.py --reconstruire`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-011-07-02 — Aucun PDF
- Type : Unitaire
- Exigences : FR-1124
- Critères d'acceptation : CA-011-07-02
- Étant donné : le dépôt
- Quand : `find . -name '*.pdf'`
- Alors : aucun
- Données : —
- Automatisation : `find . -name '*.pdf' -not -path './.git/*'` (ligne « PDF dans le dépôt : 0 » de la preuve) ; `python3 tools/verifier_base.py --reconstruire`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-011-07-03 — Notices
- Type : Revue
- Exigences : FR-1125
- Critères d'acceptation : CA-011-07-03
- Étant donné : le fichier
- Quand : lecture
- Alors : complet
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

