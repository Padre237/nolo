# SF-001-18 — Fiche à montrer au soignant (carnet) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-18 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1546, FR-1547, FR-1548, FR-1549 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-18-01 — Contenu de la fiche
- Type : Interface
- Exigences : FR-1546
- Critères d'acceptation : CA-001-18-01
- Étant donné : un parcours complet
- Quand : rendu de la fiche
- Alors : tous les éléments
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-001-18-02 — Format du code
- Type : Unitaire
- Exigences : FR-1547
- Critères d'acceptation : CA-001-18-02
- Étant donné : 1 000 graines
- Quand : `codeFiche`
- Alors : format `^[ACDEFGHJKLMNPQRTUVWXY34679]{3}-[…]{3}$`
- Données : —
- Automatisation : `app/tests/saisie.test.mjs` › « TEST-001-18-02 : code de fiche au format XXX-XXX, sans 0, O, 1 ni I » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-001-18-03 — Impression masquée dans un cadre
- Type : Interface
- Exigences : FR-1548
- Critères d'acceptation : CA-001-18-03
- Étant donné : page dans un cadre
- Quand : rendu
- Alors : pas de bouton Imprimer
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-18-04 — Terminer efface le cas
- Type : Interface
- Exigences : FR-1549
- Critères d'acceptation : CA-001-18-04
- Étant donné : fiche affichée
- Quand : Terminer
- Alors : accueil ; cas effacé
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

