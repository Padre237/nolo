# SF-003-04 — Centres spécialisés par domaine — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-326, FR-327 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-003-04-01 — Dialyse via néphrologie
- Type : Unitaire
- Exigences : FR-326, FR-327
- Critères d'acceptation : CA-003-04-01
- Étant donné : la tuile fictive
- Quand : `chercherSpecialite('nephrologie')`
- Alors : `cs-dialyse` présent
- Données : —
- Automatisation : `app/tests/recherche.test.mjs` › « TEST-003-04-01 : le centre de dialyse fictif apparaît pour la néphrologie, type centre spécialisé » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-003-04-02 — Santé mentale via psychiatrie
- Type : Interface
- Exigences : FR-327
- Critères d'acceptation : CA-003-04-02
- Étant donné : la tuile fictive
- Quand : recherche psychiatrie
- Alors : centre présent, note sensible
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

