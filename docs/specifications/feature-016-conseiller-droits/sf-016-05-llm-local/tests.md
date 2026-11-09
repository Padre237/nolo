# SF-016-05 — LLM local optionnel : reformuler les extraits, jamais décider — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2218, FR-2219 |

## 1. Environnement et données
Base v9 (`kb/kb_chunks.jsonl`, 2 055 fragments ; version publique 2 034) ; questions `kb/eval/questions_test.jsonl` (Q01 à Q40) ; glossaire `kb/traductions/glossaire_requetes.yaml` ; référence Python `kb/bm25.py` et `python3 kb/eval/run_eval.py --embed bm25` (mesure du 2026-11-07 : document attendu 33/40, référence exacte 29/40). Nolo : `cd app && node --test tests/*.test.mjs`. Tests avec un double du LLM ; vrai modèle : marqueur `equipe_seulement`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-016-05-01 — Citation inconnue rejetée
- Type : Unitaire
- Exigences : FR-2218
- Critères d'acceptation : CA-016-05-01
- Étant donné : double du LLM fautif
- Quand : `resumer`
- Alors : rejet ; réponse extractive
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-016-05-02 — Sans LLM
- Type : Unitaire
- Exigences : FR-2219
- Critères d'acceptation : CA-016-05-02
- Étant donné : aucun LLM
- Quand : question
- Alors : réponse extractive
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

