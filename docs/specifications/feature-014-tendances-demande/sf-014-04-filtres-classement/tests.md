# SF-014-04 — Filtres, classements et demande non satisfaite — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2013, FR-2014 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-014-04-01 — Demande non satisfaite
- Type : Unitaire
- Exigences : FR-2014
- Critères d'acceptation : CA-014-04-01
- Étant donné : données fictives de Douala V
- Quand : `tendances`
- Alors : artésunate 75 %
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « CA-TEND-07 : rupture d’artésunate visible dans la demande non satisfaite à Douala V » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-014-04-02 — Zone par défaut
- Type : Interface
- Exigences : FR-2013
- Critères d'acceptation : CA-014-04-02
- Étant donné : officine de démonstration
- Quand : ouvrir Tendances
- Alors : son arrondissement
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-014-04-03 — Tableau équivalent
- Type : Accessibilité
- Exigences : FR-2014
- Critères d'acceptation : CA-014-04-03
- Étant donné : le graphique
- Quand : inspection
- Alors : tableau présent
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

