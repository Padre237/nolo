# SF-004-04 — Médicaments sensibles : recherche sur l'appareil, sans signalement ni comptage — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-405, FR-408, FR-426 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`). Scénario S2 : `python3 tools/scenarios/executer.py --scenario medicament_sensible`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-004-04-01 — Aucune trace
- Type : Confidentialité
- Exigences : FR-405, FR-408
- Critères d'acceptation : CA-004-04-01
- Étant donné : lévonorgestrel
- Quand : réseau et stockage
- Alors : aucune trace
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-004-04-02 — Pas de signalement
- Type : Interface
- Exigences : FR-426
- Critères d'acceptation : CA-004-04-02
- Étant donné : TLD, case cochée
- Quand : rendu
- Alors : aucun bouton ; note
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-004-04-03 — Scénario S2
- Type : Intégration
- Exigences : FR-408
- Critères d'acceptation : CA-004-04-01
- Étant donné : scénario `medicament_sensible`
- Quand : exécution
- Alors : BLOQUE côté serveur, repli appareil, DCI absente du journal
- Données : —
- Automatisation : `tests/integration/test_scenarios_demo.py` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

