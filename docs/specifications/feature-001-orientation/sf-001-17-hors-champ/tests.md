# SF-001-17 — Hors champ du modèle expérimental — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-17 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1541, FR-1542, FR-1543 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-17-01 — Diarrhée et fièvre + frissons
- Type : Unitaire
- Exigences : FR-1541, FR-1542
- Critères d'acceptation : CA-001-17-01, CA-001-17-02
- Étant donné : deux vignettes
- Quand : `analyser`
- Alors : `hors_champ` pour les deux
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-DX-05 : diarrhée seule ou fièvre + frissons → hors champ » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-17-02 — Écran hors champ
- Type : Interface
- Exigences : FR-1543
- Critères d'acceptation : CA-001-17-03
- Étant donné : issue hors champ
- Quand : rendu
- Alors : raison, centre de santé, fiche
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

