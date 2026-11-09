# SF-003-02 — Recherche par rayon progressif et tri public — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-302, FR-303, FR-307, FR-323, FR-324 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-003-02-01 — Minimum de 3 résultats
- Type : Unitaire
- Exigences : FR-302
- Critères d'acceptation : CA-003-02-01
- Étant donné : 1 résultat à 12 km, 2 à 40 km
- Quand : `chercherSpecialite('neurologie')`
- Alors : rayon 50, 3 résultats
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-003-02-02 — Ouverte avant fermée
- Type : Unitaire
- Exigences : FR-303
- Critères d'acceptation : CA-003-02-02
- Étant donné : deux structures
- Quand : tri
- Alors : ouverte d'abord
- Données : —
- Automatisation : `python3 kb/services/test_services.py` (11 contrôles de la logique de référence)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-003-02-03 — Position à 2 décimales
- Type : Unitaire
- Exigences : FR-307
- Critères d'acceptation : CA-003-02-03
- Étant donné : une recherche de référence
- Quand : lecture du journal
- Alors : 2 décimales
- Données : —
- Automatisation : `python3 kb/services/test_services.py` (11 contrôles de la logique de référence)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-003-02-04 — Ligne de résultat
- Type : Interface
- Exigences : FR-323, FR-324
- Critères d'acceptation : CA-003-02-04
- Étant donné : recherche élargie
- Quand : rendu
- Alors : éléments présents ; mention d'élargissement
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

