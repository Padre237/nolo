# SF-016-01 — Recherche dans la base depuis le navigateur (BM25 et glossaire) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2201, FR-2202, FR-2203, FR-2204, NFR-2201 |

## 1. Environnement et données
Base v9 (`kb/kb_chunks.jsonl`, 2 055 fragments ; version publique 2 034) ; questions `kb/eval/questions_test.jsonl` (Q01 à Q40) ; glossaire `kb/traductions/glossaire_requetes.yaml` ; référence Python `kb/bm25.py` et `python3 kb/eval/run_eval.py --embed bm25` (mesure du 2026-11-07 : document attendu 33/40, référence exacte 29/40). Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-016-01-01 — Parité des classements
- Type : Propriété
- Exigences : FR-2201, FR-2204
- Critères d'acceptation : CA-016-01-01
- Étant donné : 40 questions
- Quand : comparaison JS/Python
- Alors : mêmes top 5
- Données : —
- Automatisation : `app/tests/conseiller.test.mjs` › « TEST-016-01-01 : mêmes 5 fragments, dans le même ordre, que kb/bm25.py (40 questions) » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-016-01-02 — Textes camerounais d'abord
- Type : Unitaire
- Exigences : FR-2202
- Critères d'acceptation : CA-016-01-02
- Étant donné : question citoyenne
- Quand : `chercher`
- Alors : `CMR-` en tête
- Données : —
- Automatisation : `app/tests/conseiller.test.mjs` › « TEST-016-01-02 : textes camerounais d’abord » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-016-01-03 — Question en anglais
- Type : Unitaire
- Exigences : FR-2203
- Critères d'acceptation : CA-016-01-03
- Étant donné : Q38
- Quand : `enrichir` puis `chercher`
- Alors : `CMR-LOI-90-036` au top 5
- Données : —
- Automatisation : `app/tests/conseiller.test.mjs` › « TEST-016-01-03 : question en anglais enrichie par le glossaire » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-016-01-04 — Recherche rapide
- Type : Performance
- Exigences : NFR-2201
- Critères d'acceptation : —
- Étant donné : index des textes camerounais
- Quand : 40 questions
- Alors : ≤ 50 ms chacune
- Données : —
- Automatisation : `app/tests/conseiller.test.mjs` › « TEST-016-01-04 : recherche rapide (≤ 50 ms par question) » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

