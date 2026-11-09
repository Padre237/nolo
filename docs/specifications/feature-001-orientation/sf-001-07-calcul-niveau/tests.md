# SF-001-07 — Calcul du niveau d'urgence (moteur v1) — affiché seulement s'il vaut « urgence » — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-101, FR-104, FR-110, FR-165, FR-166, FR-167, FR-168 |

## 1. Environnement et données
Node 22 (`node --test tests/js/*.test.mjs`), Python 3 (`python3 -m pytest -q`), Nolo (`cd app && node --test tests/*.test.mjs`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-07-01 — Témoins et monotonie
- Type : Propriété
- Exigences : FR-165
- Critères d'acceptation : CA-001-07-01
- Étant donné : les 75 règles v2
- Quand : évaluation des 390 témoins et 5 000 tirages
- Alors : niveaux attendus ; aucune baisse
- Données : —
- Automatisation : `python3 tools/donnees/verifier_regles_triage_v2.py` (lignes « monotonie : 0 violation(s) sur 5000 » et « témoins minimaux par règle : 390 / 390 conformes »)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-07-02 — Aucun niveau hors urgence dans Nolo
- Type : Interface
- Exigences : FR-166
- Critères d'acceptation : CA-001-07-02
- Étant donné : un cas non urgent
- Quand : parcours jusqu'aux pistes ou au hors champ
- Alors : aucun niveau n'est affiché
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-07-03 — Parité JavaScript / Python
- Type : Unitaire
- Exigences : FR-167
- Critères d'acceptation : CA-001-07-03
- Étant donné : `tests/js/fixtures/cas_parite.json`
- Quand : `node --test tests/js/*.test.mjs`
- Alors : 0 écart
- Données : —
- Automatisation : `tests/js/triage_parite.test.mjs`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-07-04 — Journal par empreinte
- Type : Intégration
- Exigences : FR-110
- Critères d'acceptation : CA-001-07-04
- Étant donné : le scénario `orientation_urgente`
- Quand : `python3 tools/scenarios/executer.py --scenario orientation_urgente`
- Alors : entrée sans texte libre
- Données : —
- Automatisation : `tests/integration/test_scenarios_demo.py`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-07-05 — Lèvres bleues détectées par le moteur v1 dans Nolo
- Type : Unitaire
- Exigences : FR-168
- Critères d'acceptation : CA-001-07-05
- Étant donné : « mon enfant de 3 ans a des lèvres bleues »
- Quand : `analyser` avec le moteur v1 branché
- Alors : issue `urgence`
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

