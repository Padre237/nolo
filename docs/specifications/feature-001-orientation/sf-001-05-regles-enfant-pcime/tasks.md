# SF-001-05 — Règles PCIME de l'enfant de 2 mois à 5 ans — Tâches

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | SF-001-05 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Ordre d'exécution | TASK-001-05-01 (équipe, en parallèle) ; TASK-001-05-02 après SF-001-07 ; TASK-001-05-03 après TASK-001-03-07 |
| Préalable | Dossier au statut READY_FOR_DEV |

### TASK-001-05-01 — Faire valider les règles PCIME et leur correspondance par un clinicien
- Exigences : FR-131, FR-132, FR-133, FR-134, FR-135
- Conception : DES-001-05-02, DES-001-05-03, DES-001-05-04
- Fichiers : `docs/product/decisions.md` (modifier : avis consigné sur D-006, D-021, Q-001-05-01, Q-001-05-03) ; `rules/triage_signes_alerte.v2.yaml` (modifier par l'outillage : `validateur_clinique`, seulement après avis écrit)
- Résultat attendu : avis écrit du clinicien ; corrections éventuelles appliquées par une nouvelle version du fichier
- Dépend de : aucun (tâche de l'équipe, hors environnement de Claude)
- Condition de fin : avis consigné et référencé dans `decisions.md`
- Tests : TEST-001-05-02, TEST-001-05-03, TEST-001-05-04, TEST-001-05-05, TEST-001-05-06 (à relancer après toute correction)
- Statut : À faire

### TASK-001-05-02 — Écrire les tests d'acceptation des règles PCIME contre le moteur du produit
- Exigences : FR-130, FR-131, FR-132, FR-133, FR-134, FR-135
- Conception : DES-001-05-01, DES-001-05-02, DES-001-05-03, DES-001-05-04
- Fichiers : `tests/js/regles_pcime.test.mjs` (créer : cas de CA-001-05-01 à CA-001-05-06 et cas limites L1 à L4)
- Résultat attendu : tests exécutés par `node --test` contre le moteur de SF-001-07
- Dépend de : SF-001-07 (moteur), SF-001-04 (chargement)
- Condition de fin : TEST-001-05-01 à TEST-001-05-06 réussis, preuve dans `tests/reports/`
- Tests : TEST-001-05-01, TEST-001-05-02, TEST-001-05-03, TEST-001-05-04, TEST-001-05-05, TEST-001-05-06
- Statut : Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (moteur du produit)

### TASK-001-05-03 — Ajouter à la régression des données les contrôles propres aux règles PCIME
- Exigences : FR-136
- Conception : DES-001-05-05
- Fichiers : `tests/regression/test_donnees_triage.py` (modifier : 8 règles `pcime`, tranches, textes sources retrouvés, jetons utilisables)
- Résultat attendu : toute régénération qui casse ces propriétés fait échouer la suite
- Dépend de : TASK-001-03-07
- Condition de fin : TEST-001-05-07 réussi
- Tests : TEST-001-05-07
- Statut : Fait (2026-11-09) — `tests/regression/test_donnees_triage.py` (textes sources, jetons utilisables)
