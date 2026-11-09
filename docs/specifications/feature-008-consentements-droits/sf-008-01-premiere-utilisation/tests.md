# SF-008-01 — Écran de première utilisation et consentement à l'orientation — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-106, FR-801, FR-802, FR-803, FR-804, FR-805, FR-806 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; navigateur Chrome + Playwright (`tools/inspecter.py`). Stockage local préfixé `nolo:`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-008-01-01 — Aucune case refusée
- Type : Unitaire
- Exigences : FR-802
- Critères d'acceptation : CA-008-01-01
- Étant donné : `brouillonVide()`
- Quand : `erreur`
- Alors : `E-CONS-AUCUNE-CASE`
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-CONS-01 : aucune case → refus » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-008-01-02 — Sans partage
- Type : Unitaire
- Exigences : FR-803
- Critères d'acceptation : CA-008-01-02
- Étant donné : deux cases cochées
- Quand : `sansPartage()`
- Alors : trois `false`
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-CONS-04 : sans partage → trois finalités à faux » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-008-01-03 — Cinq champs exactement
- Type : Unitaire
- Exigences : FR-804
- Critères d'acceptation : CA-008-01-03
- Étant donné : un brouillon valide
- Quand : `enregistrer`
- Alors : clés = les cinq attendues
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-CONS-05 : exactement cinq champs » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-008-01-04 — Redemande si version différente
- Type : Unitaire
- Exigences : FR-801
- Critères d'acceptation : CA-008-01-04
- Étant donné : absent, illisible, autre version
- Quand : `valide`
- Alors : `false` dans les trois cas
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-CONS-06 : absent, illisible ou autre version → redemander » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-008-01-05 — Barre, mention et refus expliqué
- Type : Interface
- Exigences : FR-805, FR-806
- Critères d'acceptation : CA-008-01-05
- Étant donné : écran de première utilisation
- Quand : inspection et clic sur Valider
- Alors : barre et mention visibles ; raison annoncée
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

