# SF-008-08 — Page « Conditions d'utilisation et politique de données » — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-871, FR-872, FR-873 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; navigateur Chrome + Playwright (`tools/inspecter.py`). Stockage local préfixé `nolo:`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-008-08-01 — Retour sans perte
- Type : Interface
- Exigences : FR-871
- Critères d'acceptation : CA-008-08-01
- Étant donné : deux cases cochées
- Quand : conditions puis retour
- Alors : cases conservées
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-008-08-02 — Sections identiques et complètes
- Type : Unitaire
- Exigences : FR-872, FR-873
- Critères d'acceptation : CA-008-08-02
- Étant donné : les catalogues
- Quand : comparaison des sections FR/EN et des rubriques
- Alors : mêmes sections ; douze rubriques présentes
- Données : —
- Automatisation : `app/tests/ecrans.test.mjs` › « TEST-004-02-03 et TEST-008-08-02 : conditions — formule de tri publiée ; mêmes rubriques en FR et EN » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

