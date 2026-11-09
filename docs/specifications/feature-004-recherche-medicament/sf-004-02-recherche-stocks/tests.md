# SF-004-02 — Recherche dans les stocks déclarés et classement — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-402, FR-403, FR-406, FR-422, FR-423, FR-424 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-004-02-01 — Rupture et 48 h exclues
- Type : Unitaire
- Exigences : FR-423, FR-402
- Critères d'acceptation : CA-004-02-01
- Étant donné : lignes rupture et 49 h
- Quand : `chercherMedicament`
- Alors : exclues
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « Recherche de médicament : rupture et lignes de plus de 48 h exclues » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-004-02-02 — Mention d'ordonnance
- Type : Interface
- Exigences : FR-422, FR-403
- Critères d'acceptation : CA-004-02-02
- Étant donné : amoxicilline
- Quand : rendu
- Alors : mention sur chaque ligne
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-004-02-03 — Formule publiée
- Type : Revue
- Exigences : FR-406
- Critères d'acceptation : CA-004-02-03
- Étant donné : la page des conditions
- Quand : lecture
- Alors : formule présente
- Données : —
- Automatisation : `app/tests/ecrans.test.mjs` › « TEST-004-02-03 et TEST-008-08-02 : conditions — formule de tri publiée ; mêmes rubriques en FR et EN » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-004-02-04 — Niveau et âge
- Type : Interface
- Exigences : FR-402, FR-424
- Critères d'acceptation : CA-004-02-04
- Étant donné : ligne de 3 h « faible »
- Quand : rendu
- Alors : niveau et âge affichés
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

