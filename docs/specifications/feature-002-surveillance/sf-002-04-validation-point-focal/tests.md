# SF-002-04 — Validation du signal par le point focal — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-204, FR-237, FR-238, FR-239 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-002-04-01 — Motif trop court
- Type : Interface
- Exigences : FR-237
- Critères d'acceptation : CA-002-04-01
- Étant donné : un signal
- Quand : confirmer avec 5 caractères
- Alors : refus et message
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-002-04-02 — Décision gardée et rouverte
- Type : Interface
- Exigences : FR-238
- Critères d'acceptation : CA-002-04-02
- Étant donné : un signal confirmé
- Quand : recharger puis rouvrir
- Alors : conforme
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-002-04-03 — Pas d'export avant confirmation
- Type : Interface
- Exigences : FR-204, FR-239
- Critères d'acceptation : CA-002-04-03
- Étant donné : signal à trier
- Quand : lecture
- Alors : aucun export
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-002-04-04 — Validation tracée (S3)
- Type : Intégration
- Exigences : FR-204
- Critères d'acceptation : CA-002-04-03
- Étant donné : scénario S3
- Quand : exécution
- Alors : validation `jeton:PF-01` journalisée
- Données : —
- Automatisation : `tests/integration/test_scenarios_demo.py` (`python3 -m pytest -q`) ; `python3 tools/scenarios/executer.py --scenario regroupement`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

