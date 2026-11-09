# SF-008-07 — Transparence : système automatisé et raison de la réponse — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-109, FR-861, FR-862 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; navigateur Chrome + Playwright (`tools/inspecter.py`). Stockage local préfixé `nolo:`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-008-07-01 — Mention présente
- Type : Interface
- Exigences : FR-861
- Critères d'acceptation : CA-008-07-01
- Étant donné : accueil et résultats
- Quand : inspection
- Alors : mention trouvée
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-008-07-02 — Raison par issue
- Type : Interface
- Exigences : FR-109, FR-862
- Critères d'acceptation : CA-008-07-02
- Étant donné : les cinq issues
- Quand : rendu
- Alors : une phrase de raison chacune
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

