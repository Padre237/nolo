# SF-008-02 — Consentement à la surveillance — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-811, FR-812 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; navigateur Chrome + Playwright (`tools/inspecter.py`). Stockage local préfixé `nolo:`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-008-02-01 — Pas de contribution sans case
- Type : Unitaire
- Exigences : FR-811
- Critères d'acceptation : CA-008-02-01
- Étant donné : surveillance = false
- Quand : `preparerEnvoi(cas, 'surveillance')`
- Alors : refus
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-008-02-02 — Parcours sans surveillance
- Type : Interface
- Exigences : FR-812
- Critères d'acceptation : CA-008-02-02
- Étant donné : orientation seule
- Quand : parcours complet
- Alors : aucune fonction bloquée
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

