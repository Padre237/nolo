# SF-001-12 — Numéros d'urgence et barre de sécurité — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-114, FR-195, FR-196 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-12-01 — Numéro non confirmé jamais affiché
- Type : Unitaire
- Exigences : FR-114, FR-196
- Critères d'acceptation : CA-001-12-01
- Étant donné : la politique avec 111 `a_confirmer`
- Quand : rendu de la barre et de l'écran Urgence
- Alors : 119 et 112 seulement
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-12-02 — Barre visible et non masquante
- Type : Interface
- Exigences : FR-195
- Critères d'acceptation : CA-001-12-02
- Étant donné : tous les écrans citoyens
- Quand : inspection à 4 largeurs
- Alors : barre présente ; pied de page visible ; absente sur Urgence
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

