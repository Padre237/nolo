# SF-016-04 — Évaluation du conseiller — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2215, FR-2216 |

## 1. Environnement et données
Base v9 (`kb/kb_chunks.jsonl`, 2 055 fragments ; version publique 2 034) ; questions `kb/eval/questions_test.jsonl` (Q01 à Q40) ; glossaire `kb/traductions/glossaire_requetes.yaml` ; référence Python `kb/bm25.py` et `python3 kb/eval/run_eval.py --embed bm25` (mesure du 2026-11-07 : document attendu 33/40, référence exacte 29/40). Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-016-04-01 — Rapport daté
- Type : Intégration
- Exigences : FR-2215
- Critères d'acceptation : CA-016-04-01
- Étant donné : Q23 à Q40
- Quand : `node tools/evaluer_conseiller.mjs`
- Alors : rapport avec deux mesures
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-016-04-02 — Cibles
- Type : Intégration
- Exigences : FR-2216
- Critères d'acceptation : CA-016-04-02
- Étant donné : le rapport
- Quand : lecture
- Alors : cibles atteintes
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

