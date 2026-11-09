# SF-002-05 — Délais SBC et rappels — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-205, FR-243 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-002-05-01 — Rappel du triage
- Type : Intégration
- Exigences : FR-205
- Critères d'acceptation : CA-002-05-01
- Étant donné : S3
- Quand : exécution
- Alors : rappel émis
- Données : —
- Automatisation : `tests/integration/test_scenarios_demo.py` (`python3 -m pytest -q`) ; `python3 tools/scenarios/executer.py --scenario regroupement`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-002-05-02 — Échéance affichée
- Type : Interface
- Exigences : FR-243
- Critères d'acceptation : CA-002-05-02
- Étant donné : signal à trier depuis 20 h
- Quand : ouverture
- Alors : échéance dans 4 h
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

