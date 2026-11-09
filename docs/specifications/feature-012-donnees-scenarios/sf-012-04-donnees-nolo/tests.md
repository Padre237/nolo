# SF-012-04 — Données fictives de Nolo — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1211, FR-1212, FR-1213 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-012-04-01 — Séries et regroupements
- Type : Unitaire
- Exigences : FR-1211
- Critères d'acceptation : CA-012-04-01
- Étant donné : données fictives
- Quand : `signaux()`
- Alors : deux regroupements
- Données : —
- Automatisation : `app/tests/surveillance.test.mjs` › « CUSUM : les deux regroupements injectés sont détectés, et seulement eux » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-012-04-02 — Tracés reproductibles
- Type : Intégration
- Exigences : FR-1212
- Critères d'acceptation : CA-012-04-02
- Étant donné : Natural Earth (dépôt `ext/`)
- Quand : `python3 app/tools/carte.py`
- Alors : même fichier
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-012-04-03 — Mentions fictives
- Type : Interface
- Exigences : FR-1213
- Critères d'acceptation : CA-012-04-03
- Étant donné : écrans de démonstration
- Quand : inspection
- Alors : mentions présentes
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

