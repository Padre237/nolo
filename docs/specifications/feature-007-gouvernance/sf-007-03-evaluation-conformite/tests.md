# SF-007-03 — Évaluation de conformité (quatre verdicts cités) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-702, FR-703, FR-730, FR-731, FR-732 |

## 1. Environnement et données
Python 3 + pytest + PyYAML (`python3 -m pytest -q`) ; scénarios `python3 tools/scenarios/executer.py --scenario <id> [--sans-gouvernance] [--politique config/variantes/<v>.yaml]`. Base v9 (`kb/kb_chunks.jsonl`). Pour Nolo : `cd app && node --test tests/*.test.mjs`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-03-01 — Toujours un fragment
- Type : Unitaire
- Exigences : FR-702
- Critères d'acceptation : CA-007-03-01
- Étant donné : toutes les actions
- Quand : décision dans les 3 modes
- Alors : fragment ou sans fondement
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_chaque_decision_cite_un_fragment_ou_bloque_sans_fondement` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-007-03-02 — Art. 48 d'abord
- Type : Unitaire
- Exigences : FR-730
- Critères d'acceptation : CA-007-03-02
- Étant donné : vie_sexuelle, tous consentements
- Quand : `decider`
- Alors : BLOQUE art. 48
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_art48_bloque_quel_que_soit_le_consentement` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-007-03-03 — Hors catalogue
- Type : Unitaire
- Exigences : FR-731
- Critères d'acceptation : CA-007-03-03
- Étant donné : action inconnue
- Quand : `decider`
- Alors : BLOQUE_SANS_FONDEMENT
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-007-03-04 — Politique d'abord
- Type : Unitaire
- Exigences : FR-703
- Critères d'acceptation : CA-007-03-04
- Étant donné : consigne contraire
- Quand : `decider`
- Alors : politique appliquée
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_table_des_modes` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-007-03-05 — Actions du POC
- Type : Unitaire
- Exigences : FR-732
- Critères d'acceptation : CA-007-03-05
- Étant donné : deux actions
- Quand : décision en démo et complet
- Alors : AC puis BLOQUE
- Données : —
- Automatisation : `tests/unit/test_gouvernance.py::test_actions_du_module_poc` ; `tests/unit/test_gouvernance.py::test_module_poc_inactif_ou_transmis_est_bloque` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

