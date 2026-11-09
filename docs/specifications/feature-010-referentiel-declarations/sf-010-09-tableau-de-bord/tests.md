# SF-010-09 — Tableau de bord de l'établissement et chemin de vérification — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1038, FR-1040, FR-1041, FR-1042 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-09-01 — Vues selon le type
- Type : Interface
- Exigences : FR-1038
- Critères d'acceptation : CA-010-09-01
- Étant donné : officine puis hôpital
- Quand : lecture de la navigation
- Alors : conforme
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-010-09-02 — Chemin
- Type : Interface
- Exigences : FR-1040
- Critères d'acceptation : CA-010-09-02
- Étant donné : compte confirmé sans fiche
- Quand : accueil
- Alors : étape et action
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-010-09-03 — Aperçu sans références
- Type : Unitaire
- Exigences : FR-1041
- Critères d'acceptation : CA-010-09-03
- Étant donné : établissement vérifié
- Quand : aperçu
- Alors : aucune référence du vérificateur
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_apercu_public_cache_les_references_du_verificateur` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-010-09-04 — Historique
- Type : Unitaire
- Exigences : FR-1042
- Critères d'acceptation : CA-010-09-04
- Étant donné : un compte
- Quand : désactiver
- Alors : ligne d'historique
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_journal_chaine_et_historique` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

