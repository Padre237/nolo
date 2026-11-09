# SF-001-14 — Questions de sécurité et alerte d'urgence — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-14 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1511, FR-1512, FR-1513, FR-1514, FR-1515 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-14-01 — Questions selon l'âge
- Type : Unitaire
- Exigences : FR-1511
- Critères d'acceptation : CA-001-14-01
- Étant donné : profils de 3 ans et 30 ans
- Quand : `questionsDanger`
- Alors : 5 questions de chaque jeu
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-14-02 — Bouton inactif motivé
- Type : Interface
- Exigences : FR-1512
- Critères d'acceptation : CA-001-14-02
- Étant donné : une question sans réponse
- Quand : toucher le bouton
- Alors : aucune navigation ; raison visible
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-001-14-03 — « Oui » mène à l'urgence
- Type : Unitaire
- Exigences : FR-1513
- Critères d'acceptation : CA-001-14-03
- Étant donné : toux, fièvre ; « oui » à convulsions
- Quand : `analyser`
- Alors : issue `urgence`
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-DX-03 : réponse « oui » à une question de sécurité → urgence » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-14-04 — Signes sans doublon
- Type : Interface
- Exigences : FR-1514
- Critères d'acceptation : CA-001-14-04
- Étant donné : signe écrit et répondu
- Quand : écran Urgence
- Alors : un seul affichage
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-001-14-05 — Rouge réservé à l'urgence
- Type : Revue
- Exigences : FR-1515
- Critères d'acceptation : CA-001-14-05
- Étant donné : `app/css/*.css`
- Quand : recherche des variables rouges
- Alors : usages limités à l'urgence
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

