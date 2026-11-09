# SF-008-05 — « Mes données » : modifier, retirer, effacer — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-841, FR-842, FR-843, FR-844 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; navigateur Chrome + Playwright (`tools/inspecter.py`). Stockage local préfixé `nolo:`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-008-05-01 — Modifier une finalité
- Type : Interface
- Exigences : FR-841
- Critères d'acceptation : CA-008-05-01
- Étant donné : surveillance acceptée
- Quand : décocher, enregistrer
- Alors : `false` enregistré
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-008-05-02 — Retirer tout
- Type : Interface
- Exigences : FR-842
- Critères d'acceptation : CA-008-05-02
- Étant donné : trois acceptées
- Quand : Retirer
- Alors : trois `false`
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-008-05-03 — Effacer tout
- Type : Interface
- Exigences : FR-843
- Critères d'acceptation : CA-008-05-03
- Étant donné : données présentes
- Quand : Effacer
- Alors : clés supprimées ; écran de première utilisation
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-008-05-04 — Retrait des signalements
- Type : Interface
- Exigences : FR-844
- Critères d'acceptation : CA-008-05-04
- Étant donné : deux signalements
- Quand : retrait de la finalité
- Alors : clé vide
- Données : —
- Automatisation : `app/tests/ecrans.test.mjs` › « TEST-008-05-04 : retirer « signalements » efface les signalements de l’appareil » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

