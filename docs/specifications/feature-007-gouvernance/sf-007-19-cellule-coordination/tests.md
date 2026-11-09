# SF-007-19 — Cellule de coordination multi-agents (console du ministère) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-19 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1921, FR-1922, FR-1923, FR-1924, FR-1925 |

## 1. Environnement et données
Nolo (navigateur) : `cd app && node --test tests/*.test.mjs` ; la référence Python sert d'oracle : `python3 tools/scenarios/executer.py` produit les journaux attendus (`tests/reports/`). WebCrypto SHA-256 dans le navigateur ; `node:crypto` dans les tests.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-19-01 — Six positions dans l'ordre
- Type : Unitaire
- Exigences : FR-1921, FR-1925
- Critères d'acceptation : CA-007-19-01
- Étant donné : S-AS-07-diarrhee
- Quand : `derouler`
- Alors : six positions ordonnées
- Données : —
- Automatisation : `app/tests/cellule.test.mjs` › « TEST-007-19-01 : six positions dans l’ordre, datées, avec agent et mandat » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-007-19-02 — Informations du mandat
- Type : Unitaire
- Exigences : FR-1922
- Critères d'acceptation : CA-007-19-02
- Étant donné : position du District
- Quand : lecture
- Alors : agrégats seulement
- Données : —
- Automatisation : `app/tests/cellule.test.mjs` › « TEST-007-19-02 : le District ne reçoit que des agrégats ; l’APDP ne reçoit pas les données » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-007-19-03 — Demande nominative bloquée
- Type : Unitaire
- Exigences : FR-1923
- Critères d'acceptation : CA-007-19-03
- Étant donné : la demande
- Quand : `decider`
- Alors : BLOQUE, deux articles, repli
- Données : —
- Automatisation : `app/tests/cellule.test.mjs` › « TEST-007-19-03 : la demande nominative du District est bloquée (deux articles, repli agrégat) » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-007-19-04 — Désaccord tracé
- Type : Unitaire
- Exigences : FR-1924
- Critères d'acceptation : CA-007-19-04
- Étant donné : avis APDP défavorable
- Quand : déroulé
- Alors : désaccord marqué ; décision humaine requise
- Données : —
- Automatisation : `app/tests/cellule.test.mjs` › « TEST-007-19-04 : un désaccord est marqué ; l’échange reste ouvert jusqu’à la décision humaine » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

