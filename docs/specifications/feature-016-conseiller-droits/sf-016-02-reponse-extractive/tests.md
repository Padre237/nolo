# SF-016-02 — Réponse extractive citée et refus sans fondement — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2206, FR-2207, FR-2208, FR-2209 |

## 1. Environnement et données
Base v9 (`kb/kb_chunks.jsonl`, 2 055 fragments ; version publique 2 034) ; questions `kb/eval/questions_test.jsonl` (Q01 à Q40) ; glossaire `kb/traductions/glossaire_requetes.yaml` ; référence Python `kb/bm25.py` et `python3 kb/eval/run_eval.py --embed bm25` (mesure du 2026-11-07 : document attendu 33/40, référence exacte 29/40). Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-016-02-01 — Extrait cité
- Type : Unitaire
- Exigences : FR-2206
- Critères d'acceptation : CA-016-02-01
- Étant donné : question sur les transferts
- Quand : `repondre`
- Alors : extrait art. 32 référencé
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-016-02-02 — Refus sans fondement
- Type : Unitaire
- Exigences : FR-2207
- Critères d'acceptation : CA-016-02-02
- Étant donné : question hors sujet
- Quand : `repondre`
- Alors : refus sans extrait
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-016-02-03 — Mention
- Type : Unitaire
- Exigences : FR-2208
- Critères d'acceptation : CA-016-02-03
- Étant donné : toute réponse
- Quand : lecture
- Alors : mention présente
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-016-02-04 — Aucune trace
- Type : Confidentialité
- Exigences : FR-2209
- Critères d'acceptation : CA-016-02-04
- Étant donné : une question
- Quand : lecture du stockage et du réseau
- Alors : aucune trace
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

