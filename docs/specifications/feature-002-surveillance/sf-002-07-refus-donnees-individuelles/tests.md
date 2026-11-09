# SF-002-07 — Refus de transmettre des données individuelles — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-206, FR-251 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-002-07-01 — Liste nominative refusée
- Type : Intégration
- Exigences : FR-206
- Critères d'acceptation : CA-002-07-01
- Étant donné : S3 J2 15:00
- Quand : exécution
- Alors : BLOQUE, repli agrégat
- Données : —
- Automatisation : `tests/integration/test_scenarios_demo.py` (`python3 -m pytest -q`) ; `python3 tools/scenarios/executer.py --scenario regroupement`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-002-07-02 — Refus dans la console
- Type : Interface
- Exigences : FR-251
- Critères d'acceptation : CA-002-07-02
- Étant donné : un signal
- Quand : demander la localisation
- Alors : refus et repli
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

