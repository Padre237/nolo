# SF-005-01 — Recherche d'un groupe sanguin — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-005 Recherche de sang |
| Sous-fonctionnalité | SF-005-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-502, FR-503, FR-520, FR-521 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-005-01-01 — Tri disponible puis faible
- Type : Unitaire
- Exigences : FR-520
- Critères d'acceptation : CA-005-01-01
- Étant donné : deux structures
- Quand : `chercherSang('O−')`
- Alors : disponible d'abord
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-005-01-02 — Pas de quantité, mention
- Type : Interface
- Exigences : FR-502, FR-503
- Critères d'acceptation : CA-005-01-02
- Étant donné : résultats
- Quand : rendu
- Alors : aucun nombre ; mention
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-005-01-03 — Boutons des groupes
- Type : Interface
- Exigences : FR-521
- Critères d'acceptation : CA-005-01-03
- Étant donné : onglet Sang
- Quand : rendu
- Alors : 8 boutons, un pressé
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

