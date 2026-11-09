# SF-016-03 — Interface du conseiller (citoyen, établissement, ministère) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2211, FR-2212, FR-2213 |

## 1. Environnement et données
Base v9 (`kb/kb_chunks.jsonl`, 2 055 fragments ; version publique 2 034) ; questions `kb/eval/questions_test.jsonl` (Q01 à Q40) ; glossaire `kb/traductions/glossaire_requetes.yaml` ; référence Python `kb/bm25.py` et `python3 kb/eval/run_eval.py --embed bm25` (mesure du 2026-11-07 : document attendu 33/40, référence exacte 29/40). Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-016-03-01 — Écran du conseiller
- Type : Interface
- Exigences : FR-2211
- Critères d'acceptation : CA-016-03-01
- Étant donné : l'accueil
- Quand : ouvrir
- Alors : conforme
- Données : —
- Automatisation : `app/tests/conseiller.test.mjs` › « TEST-016-03-01 : écran du conseiller — champ de 300 caractères, 4 exemples, réponse » (`cd app && node --test tests/*.test.mjs`) ; `tools/inspecter.py` (états 40 à 46)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-016-03-02 — Liens pro et ministère
- Type : Interface
- Exigences : FR-2212
- Critères d'acceptation : CA-016-03-02
- Étant donné : tableau de bord, console
- Quand : lecture
- Alors : liens présents
- Données : —
- Automatisation : `app/tests/conseiller.test.mjs` › « TEST-016-03-02 : liens vers le conseiller dans les espaces professionnel et ministériel » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-016-03-03 — Catalogues
- Type : Unitaire
- Exigences : FR-2213
- Critères d'acceptation : CA-016-03-03
- Étant donné : catalogues
- Quand : comparaison
- Alors : mêmes clés
- Données : —
- Automatisation : `app/tests/conseiller.test.mjs` › « TEST-016-03-03 : catalogues droits.* aux mêmes clés » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

