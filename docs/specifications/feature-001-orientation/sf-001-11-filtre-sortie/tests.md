# SF-001-11 — Filtre de sortie : aucun médicament, posologie ni alternative — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-11 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-102, FR-190, FR-191, FR-192 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-11-01 — Aucun produit dans les sorties
- Type : Unitaire
- Exigences : FR-190
- Critères d'acceptation : CA-001-11-01
- Étant donné : `DCI`, `NOMS_COMMERCIAUX`
- Quand : recherche dans les catalogues citoyens et `PATHOLOGIES`
- Alors : zéro occurrence
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-11-02 — Étiquette d'estimation
- Type : Interface
- Exigences : FR-191
- Critères d'acceptation : CA-001-11-02
- Étant donné : des pistes
- Quand : rendu
- Alors : étiquette présente sur chaque piste
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-001-11-03 — Pas de lien vers les médicaments
- Type : Interface
- Exigences : FR-192
- Critères d'acceptation : CA-001-11-03
- Étant donné : l'écran des pistes
- Quand : on liste les `href`
- Alors : aucun vers l'onglet médicament
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

