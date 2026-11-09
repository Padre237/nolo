# SF-011-08 — Base embarquée dans Nolo pour les agents — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1127, FR-1128, FR-1129, NFR-1101 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-011-08-01 — Export complet et propre
- Type : Unitaire
- Exigences : FR-1127
- Critères d'acceptation : CA-011-08-01
- Étant donné : l'export
- Quand : contrôle
- Alors : fragments cités présents ; aucun texte réservé
- Données : —
- Automatisation : `app/tests/base.test.mjs` › « TEST-011-08-01 : fragments cités par la politique et la Conformité présents ; aucun texte réservé » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-011-08-02 — Lecture bilingue
- Type : Unitaire
- Exigences : FR-1128
- Critères d'acceptation : CA-011-08-02
- Étant donné : un fragment de la loi 2019/019
- Quand : `fragment(id, 'en')`
- Alors : version officielle ; erreur pour un inconnu
- Données : —
- Automatisation : `app/tests/base.test.mjs` › « TEST-011-08-02 : lecture bilingue ; identifiant inconnu » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-011-08-03 — Hors ligne
- Type : Interface
- Exigences : FR-1129
- Critères d'acceptation : CA-011-08-03
- Étant donné : application hors ligne
- Quand : lecture d'un fragment
- Alors : disponible
- Données : —
- Automatisation : `app/tests/base.test.mjs` › « TEST-011-08-03 : la base est mise en cache par le service worker (hors ligne) » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-011-08-04 — Taille de la base embarquée
- Type : Performance
- Exigences : NFR-1101
- Critères d'acceptation : —
- Étant donné : l'export
- Quand : taille de `app/data/base.json`
- Alors : ≤ 3 Mio
- Données : —
- Automatisation : `app/tests/base.test.mjs` › « TEST-011-08-04 : taille de la base embarquée ≤ 3 Mio » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

