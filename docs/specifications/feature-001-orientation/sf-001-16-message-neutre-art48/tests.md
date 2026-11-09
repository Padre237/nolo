# SF-001-16 — Message neutre pour une piste relevant de l'art. 48 — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-16 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1536, FR-1537, FR-1538 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-16-01 — Issue art48
- Type : Unitaire
- Exigences : FR-1536
- Critères d'acceptation : CA-001-16-01
- Étant donné : signes évocateurs
- Quand : `analyser`
- Alors : issue `art48`, aucune piste
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-DX-06 : piste art. 48 → message neutre, jamais de nom » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-16-02 — Écran sans nom
- Type : Interface
- Exigences : FR-1537
- Critères d'acceptation : CA-001-16-02
- Étant donné : issue art48
- Quand : rendu
- Alors : message neutre ; centre de santé
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-001-16-03 — Fiche limitée aux signes
- Type : Interface
- Exigences : FR-1538
- Critères d'acceptation : CA-001-16-03
- Étant donné : issue art48
- Quand : rendu de la fiche
- Alors : signes seulement
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

