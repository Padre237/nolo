# SF-001-03 — Codage des symptômes par le référentiel interne — Tâches

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | SF-001-03 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Ordre d'exécution | TASK-001-03-01 → 02 → 03 → 04 ; TASK-001-03-05 → 06 ; TASK-001-03-07 (indépendante) |
| Préalable | MT-001 (migration de l'arborescence) terminée ; dossier au statut READY_FOR_DEV |

### TASK-001-03-01 — Écrire le chargement et la validation du référentiel sur l'appareil
- Exigences : FR-124, FR-120, NFR-102
- Conception : DES-001-03-01, DES-001-03-05
- Fichiers : `src/client/ondevice/referentiel.js` (créer : `chargerReferentiel`, `ErreurReferentiel`)
- Résultat attendu : le référentiel livré se charge ; un référentiel invalide lève `ErreurReferentiel` et la version embarquée reste active
- Dépend de : MT-001
- Condition de fin : TEST-001-03-01 et TEST-001-03-04 réussis
- Tests : TEST-001-03-01, TEST-001-03-04
- Statut : À faire

### TASK-001-03-02 — Écrire la liste fermée par tranche d'âge
- Exigences : FR-121
- Conception : DES-001-03-02
- Fichiers : `src/client/ondevice/referentiel.js` (modifier : `listeFermee`)
- Résultat attendu : listes conformes à la correspondance public → tranches, complétées par les jetons des règles applicables
- Dépend de : TASK-001-03-01, SF-001-04 (chargement du paquet de règles)
- Condition de fin : TEST-001-03-02, TEST-001-03-03 et TEST-001-03-13 réussis
- Tests : TEST-001-03-02, TEST-001-03-03, TEST-001-03-13
- Statut : À faire

### TASK-001-03-03 — Écrire la fermeture transitive des implications
- Exigences : FR-123
- Conception : DES-001-03-04
- Fichiers : `src/client/ondevice/referentiel.js` (modifier : `fermer`)
- Résultat attendu : ensemble fermé, calcul qui se termine
- Dépend de : TASK-001-03-01
- Condition de fin : TEST-001-03-07 réussi
- Tests : TEST-001-03-07
- Statut : À faire

### TASK-001-03-04 — Écrire l'extracteur lexical
- Exigences : FR-122, NFR-101
- Conception : DES-001-03-03
- Fichiers : `src/client/ondevice/extracteur_lexical.js` (créer : `normaliser`, `construireIndex`, `extraire`)
- Résultat attendu : les 42 phrases de `data/referentiels/phrases_extraction_reference.json` donnent les jetons et le `non_code` attendus ; même normalisation que `tools/donnees/generer_referentiel_symptomes.py > norm_expr`
- Dépend de : TASK-001-03-01
- Condition de fin : TEST-001-03-05, TEST-001-03-06 et TEST-001-03-14 réussis
- Tests : TEST-001-03-05, TEST-001-03-06, TEST-001-03-14
- Statut : À faire

### TASK-001-03-05 — Écrire la validation côté serveur
- Exigences : FR-120, FR-124, FR-125
- Conception : DES-001-03-01, DES-001-03-05
- Fichiers : `src/server/domain/referentiel_symptomes.py` (créer : `valider_referentiel`, `filtrer_propositions`)
- Résultat attendu : liste d'erreurs vide pour le référentiel livré ; erreurs explicites pour les fixtures invalides
- Dépend de : MT-001
- Condition de fin : TEST-001-03-01 (partie serveur) et TEST-001-03-08 réussis
- Tests : TEST-001-03-01, TEST-001-03-08
- Statut : À faire

### TASK-001-03-06 — Écrire le filtre des propositions du LLM et la route d'extraction
- Exigences : FR-126
- Conception : DES-001-03-06
- Fichiers : `src/server/agents/triage.py` (créer) ; `src/server/api/orientation.py` (créer : route d'extraction) ; `src/server/api/schemas/orientation.py` (créer : schéma fermé, sans tranche d'âge)
- Résultat attendu : seuls des jetons utilisables et non `sante_avis_juriste` sont renvoyés ; erreurs du §9 des exigences ; journal sans texte ni jeton refusé
- Dépend de : TASK-001-03-05, SF-007-02, SF-007-03
- Condition de fin : TEST-001-03-09, TEST-001-03-10 et TEST-001-03-11 réussis
- Tests : TEST-001-03-09, TEST-001-03-10, TEST-001-03-11
- Statut : À faire

### TASK-001-03-07 — Intégrer les contrôles des données à la suite de régression
- Exigences : FR-127, FR-121
- Conception : DES-001-03-07
- Fichiers : `tests/regression/test_donnees_triage.py` (créer : exécute le générateur dans un répertoire temporaire, compare l'empreinte et les codes, puis lance `tools/donnees/verifier_regles_triage_v2.py` et exige le code de sortie 0)
- Résultat attendu : toute modification des données qui casse la reproductibilité, la stabilité des codes, l'accessibilité des règles ou le jeu de phrases fait échouer la suite
- Dépend de : MT-001
- Condition de fin : TEST-001-03-12 réussi
- Tests : TEST-001-03-12
- Statut : À faire
