# MT-001 — Migration de l'arborescence vers `src/` — Tests

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | MT-001 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Niveaux | Régression, Validation |

## 1. Stratégie locale
- Données : `data/synthetic/` et `kb/` existants ; horloge des contrôles existants (2026-10-20 22:00).
- Outils : pytest, `sha256sum`, `grep`, `git ls-files`.
- Hors de portée de l'environnement de Claude : aucun.

## 2. Cas de test

### TEST-M01-01 — Mesures avant migration disponibles
- Type : Régression
- Exigences : FR-1403, FR-1404
- Critères d'acceptation : CA-M01-01, CA-M01-02, CA-M01-03
- Étant donné : le code de `kb/` avant migration
- Quand : on exécute les contrôles, l'évaluation et `sha256sum kb/kb_chunks.jsonl`
- Alors : les sorties indiquent 11/11 et 20/20, et l'empreinte est enregistrée
- Données : dépôt courant
- Automatisation : commandes de TASK-M01-01
- Statut d'exécution : Exécuté le 2026-11-03 — réussi pour les contrôles (11/11) et l'évaluation (20/20) ; preuves `docs/quality/preuve-2026-11-03-test_services.txt`, `docs/quality/preuve-2026-11-03-run_eval.txt` ; empreinte non encore enregistrée

### TEST-M01-02 — Chemins résolus par un seul module
- Type : Validation/limites
- Exigences : FR-1401, FR-1402, NFR-1401, NFR-1402
- Critères d'acceptation : CA-M01-04
- Étant donné : le code migré
- Quand : on exécute `grep -rn "__file__" src/`
- Alors : une seule occurrence, dans `src/server/config.py` ; chaque fichier de la table §4 existe à sa place cible
- Données : arborescence migrée
- Automatisation : `tests/regression/test_arborescence.py::test_m01_02_chemins_centralises`
- Statut d'exécution : Non exécuté

### TEST-M01-03 — Les 11 contrôles existants réussissent après migration
- Type : Régression
- Exigences : FR-1403
- Critères d'acceptation : CA-M01-01
- Étant donné : le code migré
- Quand : on exécute `pytest -q tests/regression/test_services_existants.py`
- Alors : 11 tests réussis, 0 échec, valeurs attendues identiques (neurologie à 50 km, PH-20 78 %, PH-25 65 %, etc.)
- Données : `data/synthetic/`
- Automatisation : `tests/regression/test_services_existants.py`
- Statut d'exécution : Non exécuté

### TEST-M01-04 — Évaluation identique
- Type : Régression
- Exigences : FR-1404
- Critères d'acceptation : CA-M01-02
- Étant donné : le code migré
- Quand : on exécute `python3 -m src.server.kb.eval.run_eval --embed bm25`
- Alors : la dernière ligne indique 20/20 et 20/20
- Données : `kb/eval/questions_test.jsonl`
- Automatisation : `tests/regression/test_base_identique.py::test_m01_04_evaluation`
- Statut d'exécution : Non exécuté

### TEST-M01-05 — Base reconstruite identique octet pour octet
- Type : Régression
- Exigences : FR-1404
- Critères d'acceptation : CA-M01-03
- Étant donné : l'empreinte d'avant migration
- Quand : on reconstruit la base avec `python3 -m src.server.kb.build_kb`
- Alors : l'empreinte SHA-256 de `kb/kb_chunks.jsonl` est identique
- Données : `kb/`
- Automatisation : `tests/regression/test_base_identique.py::test_m01_05_base`
- Statut d'exécution : Non exécuté

### TEST-M01-06 — Aucune source non publiable suivie
- Type : Sécurité/autorisation
- Exigences : FR-1405
- Critères d'acceptation : CA-M01-05
- Étant donné : le dépôt initialisé avec le `.gitignore`
- Quand : on exécute `git ls-files`
- Alors : aucun chemin de `kb/raw/`, `kb/raw2/` ni aucune source dont `rights_note` contient « tous droits réservés »
- Données : `kb/sources.json`
- Automatisation : `tests/regression/test_arborescence.py::test_m01_06_sources_non_publiables`
- Statut d'exécution : Non exécuté

### TEST-M01-07 — Configuration pytest
- Type : Validation/limites
- Exigences : FR-1406
- Critères d'acceptation : CA-M01-06
- Étant donné : `pytest.ini`
- Quand : on exécute `pytest --markers`
- Alors : `equipe_seulement` est listé ; `pytest -q` découvre au moins 11 tests
- Données : —
- Automatisation : `tests/regression/test_arborescence.py::test_m01_07_pytest_ini`
- Statut d'exécution : Non exécuté

## 3. Couverture
| Exigence | Tests |
|---|---|
| FR-1401 | TEST-M01-02 |
| FR-1402 | TEST-M01-02 |
| FR-1403 | TEST-M01-01, TEST-M01-03 |
| FR-1404 | TEST-M01-01, TEST-M01-04, TEST-M01-05 |
| FR-1405 | TEST-M01-06 |
| FR-1406 | TEST-M01-07 |
| NFR-1401 | TEST-M01-02 |
| NFR-1402 | TEST-M01-02 |
