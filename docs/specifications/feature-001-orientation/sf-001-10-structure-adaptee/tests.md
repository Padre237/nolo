# SF-001-10 — « Où aller » : structure adaptée aux besoins — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-185, FR-186, FR-187, FR-188, FR-189 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-10-01 — Besoin le plus élevé et pédiatrie
- Type : Unitaire
- Exigences : FR-185
- Critères d'acceptation : CA-001-10-01
- Étant donné : pistes d'un enfant
- Quand : `besoins`
- Alors : niveau le plus élevé ; pédiatrie ajoutée
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-DX-17 : le besoin le plus élevé l’emporte ; enfant → pédiatrie » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-10-02 — Ouverte avant fermée
- Type : Unitaire
- Exigences : FR-186
- Critères d'acceptation : CA-001-10-02
- Étant donné : deux structures couvrantes
- Quand : `recommander`
- Alors : l'ouverte est proposée
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-DX-19 : structure couvrante, ouverte avant fermée ; repli avec manque » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-10-03 — Repli avec manque
- Type : Unitaire
- Exigences : FR-187
- Critères d'acceptation : CA-001-10-03
- Étant donné : aucune structure couvrante
- Quand : `recommander`
- Alors : structure du niveau requis et manque nommé
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-DX-19 : structure couvrante, ouverte avant fermée ; repli avec manque » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-10-04 — Panneau de direction
- Type : Interface
- Exigences : FR-188, FR-189
- Critères d'acceptation : CA-001-10-04, CA-001-10-05
- Étant donné : une recommandation
- Quand : rendu à 360 et 1440 px
- Alors : raison, mention, autres structures ; bouton d'appel désactivé ; aucun débordement
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

