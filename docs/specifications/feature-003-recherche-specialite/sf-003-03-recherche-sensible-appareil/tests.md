# SF-003-03 — Spécialités sensibles : recherche sur l'appareil, jamais comptée — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-305, FR-308, FR-325 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-003-03-01 — Aucune trace
- Type : Confidentialité
- Exigences : FR-305, FR-308
- Critères d'acceptation : CA-003-03-01
- Étant donné : recherche de psychiatrie
- Quand : journal réseau et stockage
- Alors : zéro requête ; aucune trace
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-003-03-02 — Note sensible
- Type : Interface
- Exigences : FR-325
- Critères d'acceptation : CA-003-03-02
- Étant donné : recherche de psychiatrie
- Quand : rendu
- Alors : note « sur votre téléphone »
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

