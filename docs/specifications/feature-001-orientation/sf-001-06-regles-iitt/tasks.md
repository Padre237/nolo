# SF-001-06 — Critères de l'outil IITT (12 ans et plus, moins de 12 ans) — Tâches

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | SF-001-06 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Ordre d'exécution | TASK-001-06-01 et 02 (équipe, en parallèle) ; TASK-001-06-03 après SF-001-07 ; TASK-001-06-04 après TASK-001-03-07 |
| Préalable | Dossier au statut READY_FOR_DEV |

### TASK-001-06-01 — Faire valider la transcription IITT et sa correspondance par un clinicien
- Exigences : FR-140, FR-141, FR-142, FR-143, FR-144, FR-145, FR-146
- Conception : DES-001-06-01, DES-001-06-02, DES-001-06-03, DES-001-06-04, DES-001-06-05
- Fichiers : `docs/product/decisions.md` (modifier : avis consigné sur D-020, D-021, Q-001-06-01 à Q-001-06-06) ; `rules/triage_signes_alerte.v2.yaml` (modifier par l'outillage, seulement après avis écrit)
- Résultat attendu : avis écrit ; corrections éventuelles appliquées par une nouvelle version du fichier, contrôles relancés
- Dépend de : aucun (tâche de l'équipe, hors environnement de Claude)
- Condition de fin : avis consigné et référencé dans `decisions.md`
- Tests : TEST-001-06-01 à TEST-001-06-05 (à relancer après toute correction)
- Statut : À faire

### TASK-001-06-02 — Obtenir l'avis du juriste sur la grossesse, le priapisme et la lacune L13
- Exigences : FR-146
- Conception : DES-001-06-05
- Fichiers : `docs/product/decisions.md` (modifier : D-022) ; `docs/compliance/registre-lacunes.md` (modifier : L13)
- Résultat attendu : position écrite ; si elle change une exclusion, nouvelle version du référentiel et des règles
- Dépend de : aucun (tâche de l'équipe)
- Condition de fin : avis consigné ; Q-001-06-07 tranchée
- Tests : TEST-001-06-05
- Statut : À faire

### TASK-001-06-03 — Écrire les tests d'acceptation des critères IITT contre le moteur du produit
- Exigences : FR-140, FR-141, FR-142, FR-143, FR-144, FR-145, FR-146
- Conception : DES-001-06-01, DES-001-06-02, DES-001-06-03, DES-001-06-04, DES-001-06-05
- Fichiers : `tests/js/regles_iitt.test.mjs` (créer : cas de CA-001-06-01, CA-001-06-04, CA-001-06-05 ; témoins minimaux générés depuis les conditions, même algorithme que la section 8 de `tools/donnees/verifier_regles_triage_v2.py`)
- Résultat attendu : tests exécutés par `node --test` contre le moteur de SF-001-07
- Dépend de : SF-001-07, SF-001-04
- Condition de fin : TEST-001-06-01 à TEST-001-06-05 réussis, preuve dans `tests/reports/`
- Tests : TEST-001-06-01, TEST-001-06-02, TEST-001-06-03, TEST-001-06-04, TEST-001-06-05
- Statut : Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (témoins par alternative et par tranche)

### TASK-001-06-04 — Ajouter à la régression des données les contrôles propres aux critères IITT
- Exigences : FR-147, FR-146
- Conception : DES-001-06-06, DES-001-06-05
- Fichiers : `tests/regression/test_donnees_triage.py` (modifier : comptes 13/22/16/16, textes sources retrouvés, absence des jetons exclus)
- Résultat attendu : toute régénération qui casse ces propriétés fait échouer la suite
- Dépend de : TASK-001-03-07
- Condition de fin : TEST-001-06-06 réussi
- Tests : TEST-001-06-06
- Statut : À faire
