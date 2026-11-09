# SF-001-15 — Pistes expérimentales (POC) : au plus trois, avec leur score et leur origine — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-15 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1521, FR-1522, FR-1523, FR-1524, FR-1525, FR-1526, FR-1527, FR-1528 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-15-01 — Module absent hors démo
- Type : Unitaire
- Exigences : FR-1521
- Critères d'acceptation : CA-001-15-01
- Étant donné : mode `complet`
- Quand : parcours Vérifier → suite
- Alors : aucune route `#/pistes`
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-15-02 — Au plus trois pistes triées
- Type : Unitaire
- Exigences : FR-1522
- Critères d'acceptation : CA-001-15-02
- Étant donné : toux fébrile d'un adulte
- Quand : `analyser`
- Alors : ≤ 3 pistes, scores décroissants
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-DX-04 : au plus 3 pistes, triées par score » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-15-03 — Contenu d'une piste
- Type : Interface
- Exigences : FR-1523
- Critères d'acceptation : CA-001-15-03
- Étant donné : des pistes
- Quand : rendu
- Alors : nom, score étiqueté, x des y, signes, source
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-001-15-04 — Jamais « probabilité »
- Type : Unitaire
- Exigences : FR-1524
- Critères d'acceptation : CA-001-15-04
- Étant donné : catalogues FR et EN
- Quand : recherche de « probabilit »
- Alors : 0 occurrence
- Données : —
- Automatisation : `app/tests/i18n.test.mjs` › « FR-DX-04 : le mot « probabilité » n’apparaît dans aucun catalogue »
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-15-05 — Rien n'est conservé
- Type : Confidentialité
- Exigences : FR-1525
- Critères d'acceptation : CA-001-15-05
- Étant donné : un parcours avec pistes
- Quand : lecture de `localStorage` et du réseau
- Alors : aucun code de piste ni score
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-15-06 — Décision et journal
- Type : Intégration
- Exigences : FR-1526, FR-1527
- Critères d'acceptation : CA-001-15-06
- Étant donné : affichage de pistes
- Quand : lecture du journal de l'appareil
- Alors : décision avant affichage ; champs minimaux
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-15-07 — Mention de démonstration
- Type : Interface
- Exigences : FR-1528
- Critères d'acceptation : CA-001-15-07
- Étant donné : l'écran des pistes
- Quand : rendu
- Alors : mention visible
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

