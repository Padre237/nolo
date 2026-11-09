# MT-001 — Migration de l'arborescence vers `src/` — Tâches

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | MT-001 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Ordre d'exécution | TASK-M01-01 → TASK-M01-02 → TASK-M01-03 → TASK-M01-04 → TASK-M01-05 → TASK-M01-06 |

### TASK-M01-01 — Mesurer l'état avant migration
- Exigences : FR-1403, FR-1404
- Conception : DES-M01-04
- Fichiers : `tests/reports/AAAA-MM-JJ/mt001-avant/` (créer) ; `kb.avant-mt001.tar` (créer, non versionné)
- Résultat attendu : sorties des 11 contrôles et de l'évaluation, empreinte SHA-256 de `kb/kb_chunks.jsonl`, archive de sauvegarde
- Dépend de : aucune
- Condition de fin : trois fichiers de mesure présents ; 11/11 et 20/20 constatés
- Tests : TEST-M01-01
- Statut : À faire

### TASK-M01-02 — Créer le module de chemins et déplacer le code
- Exigences : FR-1401, FR-1402, NFR-1401, NFR-1402
- Conception : DES-M01-01, DES-M01-02
- Fichiers : `src/server/config.py` (créer) ; fichiers de la table §4 (déplacer, adapter imports et chemins)
- Résultat attendu : arborescence cible ; plus aucun calcul de chemin depuis `__file__` hors de `config.py`
- Dépend de : TASK-M01-01
- Condition de fin : TEST-M01-02 réussi
- Tests : TEST-M01-02
- Statut : À faire

### TASK-M01-03 — Réécrire les contrôles existants en tests pytest
- Exigences : FR-1403
- Conception : DES-M01-03
- Fichiers : `tests/regression/test_services_existants.py` (créer) ; `kb/services/test_services.py` → `docs/archive/kb/` (déplacer)
- Résultat attendu : 11 fonctions de test reprenant chacune un contrôle, mêmes valeurs attendues
- Dépend de : TASK-M01-02
- Condition de fin : TEST-M01-03 réussi
- Tests : TEST-M01-03
- Statut : À faire

### TASK-M01-04 — Vérifier l'identité de l'évaluation et de la base
- Exigences : FR-1404
- Conception : DES-M01-04
- Fichiers : `tests/regression/test_base_identique.py` (créer)
- Résultat attendu : comparaison automatique avec les mesures de TASK-M01-01
- Dépend de : TASK-M01-02
- Condition de fin : TEST-M01-04 et TEST-M01-05 réussis
- Tests : TEST-M01-04, TEST-M01-05
- Statut : À faire

### TASK-M01-05 — Exclure les documents non publiables
- Exigences : FR-1405
- Conception : DES-M01-05
- Fichiers : `.gitignore` (créer) ; `tools/lister_sources_non_publiables.py` (créer) ; `kb/kb_chunks.public.jsonl` (générer)
- Résultat attendu : aucune source « tous droits réservés » suivie par git
- Dépend de : TASK-M01-02
- Condition de fin : TEST-M01-06 réussi
- Tests : TEST-M01-06
- Statut : À faire

### TASK-M01-06 — Configurer pytest
- Exigences : FR-1406
- Conception : DES-M01-06
- Fichiers : `pytest.ini` (créer)
- Résultat attendu : découverte des tests, marqueur déclaré
- Dépend de : TASK-M01-03
- Condition de fin : TEST-M01-07 réussi
- Tests : TEST-M01-07
- Statut : À faire
