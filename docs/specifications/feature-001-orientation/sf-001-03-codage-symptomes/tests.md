# SF-001-03 — Codage des symptômes par le référentiel interne — Tests

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | SF-001-03 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Niveaux | Unitaire, Validation/limites, Intégration, Contrat d'API, Sécurité/autorisation, Défaillance/reprise, Régression |

## 1. Stratégie locale
- Données : référentiel 1.1.0 livré ; jeu de 42 phrases `data/referentiels/phrases_extraction_reference.json` ; fixtures invalides dérivées (jeton dupliqué, empreinte fausse, expression ambiguë).
- Outils : `node --test` (modules de l'appareil), pytest (serveur), double de test du LLM, client ASGI en processus.
- Hors de portée de l'environnement de Claude : extraction avec un vrai modèle Ollama (marqueur `equipe_seulement`).
- Distinction des preuves : l'outillage `tools/donnees/` a contrôlé les **données** le 2026-11-04 (preuve `docs/quality/preuve-2026-11-04-generation-donnees.txt`). Ces contrôles ne remplacent pas les tests du **produit**, qui restent « Non exécuté » tant que le code n'existe pas.

## 2. Cas de test

### TEST-001-03-01 — Codes et jetons uniques, aucun identifiant SNOMED, taille du fichier
- Type : Validation/limites
- Exigences : FR-120, FR-125, NFR-102
- Critères d'acceptation : CA-001-03-01
- Étant donné : le référentiel livré
- Quand : `chargerReferentiel` (appareil) puis `valider_referentiel` (serveur) le lisent
- Alors : aucune erreur ; 110 codes `SYM-NNN` uniques ; 110 jetons uniques ; 0 valeur dans `snomed_gps_id` ; fichier ≤ 100 Kio
- Données : `data/referentiels/symptomes.csv`, `symptomes.meta.yaml`
- Automatisation : `tests/js/referentiel.test.mjs` › « chargement : 110 entrées, codes et jetons uniques, snomed vide (TEST-001-03-01) » (`node --test tests/js/*.test.mjs`) ; `tests/regression/test_donnees_triage.py::test_referentiel_valide_cote_serveur_et_sources_existantes`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-02 — Listes fermées de 2 à 5 ans et de 5 à 11 ans
- Type : Unitaire
- Exigences : FR-121
- Critères d'acceptation : CA-001-03-02
- Étant donné : le référentiel 1.1.0 et les règles v2
- Quand : on appelle `listeFermee` pour `2_5_ans` puis `5_11_ans`
- Alors : 77 entrées pour `2_5_ans`, dont `incapable_de_boire_ou_teter`, aucune de public `adulte` ; `cephalee_intense` et `douleur_abdominale_severe` présentes pour `5_11_ans`
- Données : référentiel et règles livrés
- Automatisation : `tests/js/referentiel_c.test.mjs` › « TEST-001-03-02 : liste fermée de 2_5_ans (77 entrées, pas d'adulte) et de 5_11_ans » ; `tests/js/triage_parite.test.mjs` › « listes fermées : mêmes jetons pour chacune des 10 tranches (TEST-001-03-02, TEST-001-03-13) » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-03 — Entrées exclues jamais présentées
- Type : Sécurité/autorisation
- Exigences : FR-121
- Critères d'acceptation : CA-001-03-02
- Étant donné : chacune des 10 tranches d'âge
- Quand : on construit la liste et l'index de l'extracteur
- Alors : `agression_sexuelle` et `priapisme` n'apparaissent dans aucune des 10 listes ni dans l'index
- Données : référentiel livré
- Automatisation : `tests/js/referentiel.test.mjs` › « exclusions : agression_sexuelle et priapisme absents des 10 listes et de l'index (TEST-001-03-03) » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-04 — Référentiel invalide refusé, version embarquée conservée
- Type : Défaillance/reprise
- Exigences : FR-124
- Critères d'acceptation : CA-001-03-05
- Étant donné : un CSV avec un jeton dupliqué, un CSV dont l'empreinte diffère de la métadonnée, un CSV où une expression renvoie à deux jetons
- Quand : l'appareil tente de les charger
- Alors : les trois chargements lèvent `ErreurReferentiel` ; la version embarquée reste active
- Données : `tests/js/fixtures/referentiel_doublon.csv`, `referentiel_empreinte_fausse.csv`, `referentiel_ambigu.csv`
- Automatisation : `tests/js/referentiel.test.mjs` › « paquet invalide refusé : jeton dupliqué, code modifié, snomed rempli, expression ambiguë (TEST-001-03-04) » ; `tests/js/referentiel_c.test.mjs` › « TEST-001-03-04 : un référentiel invalide est refusé et la version embarquée reste active » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-05 — Extraction des 42 phrases de référence
- Type : Unitaire
- Exigences : FR-122
- Critères d'acceptation : CA-001-03-03
- Étant donné : les 42 phrases FR et EN avec leurs jetons et leur `non_code` attendus
- Quand : `extraire` les traite
- Alors : 42 sur 42 conformes (dont F12 « il a un bleu sur le bras » → aucun jeton, F17 « contractions musculaires » → aucun jeton, E04 « bloody diarrhea » → `diarrhee`, `diarrhee_avec_sang`)
- Données : `data/referentiels/phrases_extraction_reference.json`
- Automatisation : `tests/js/triage_parite.test.mjs` › « 42 phrases de référence : mêmes jetons, même non_code (TEST-001-03-05) » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-06 — Performance de l'extraction
- Type : Validation/limites
- Exigences : NFR-101
- Critères d'acceptation : CA-001-03-03
- Étant donné : un texte de 500 caractères
- Quand : on mesure 100 extractions
- Alors : médiane ≤ 50 ms
- Données : texte synthétique construit à partir des phrases de référence
- Automatisation : `tests/js/referentiel_c.test.mjs` › « TEST-001-03-06 : extraction rapide (médiane ≤ 50 ms sur un texte de 500 caractères) » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-07 — Fermeture transitive
- Type : Unitaire
- Exigences : FR-123
- Critères d'acceptation : CA-001-03-04
- Étant donné : `{diarrhee_avec_sang}`, puis `{chute_deux_fois_hauteur}`, puis `{etat_conscience_altere}`
- Quand : on appelle `fermer`
- Alors : `{diarrhee_avec_sang, diarrhee, sang_dans_selles}` ; `{chute_deux_fois_hauteur, traumatisme_haut_risque, traumatisme}` ; `{etat_conscience_altere, confusion_somnolence_agitation}`
- Données : référentiel livré
- Automatisation : `tests/js/triage_parite.test.mjs` › « fermetures transitives identiques (TEST-001-03-07) » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-08 — Sources présentes dans la base de connaissances
- Type : Validation/limites
- Exigences : FR-124
- Critères d'acceptation : CA-001-03-05
- Étant donné : le référentiel et `kb/kb_chunks.jsonl`
- Quand : `valider_referentiel` vérifie chaque identifiant de la colonne `sources`
- Alors : 100 % existent
- Données : référentiel livré
- Automatisation : `tests/regression/test_donnees_triage.py::test_referentiel_valide_cote_serveur_et_sources_existantes`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-09 — Filtre des propositions du LLM
- Type : Unitaire
- Exigences : FR-126
- Critères d'acceptation : CA-001-03-06
- Étant donné : un double du LLM qui propose `toux`, `priapisme`, `grossesse`, `jeton_inconnu`
- Quand : `filtrer_propositions` s'exécute
- Alors : renvoie `(["toux"], 3)`
- Données : double de test
- Automatisation : `tests/unit/test_extraction.py::test_filtrer_propositions_ne_garde_que_les_jetons_utilisables`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-10 — Contrat de la route d'extraction
- Type : Contrat d'API
- Exigences : FR-126
- Critères d'acceptation : CA-001-03-06, CA-001-03-09
- Étant donné : le serveur en mode démo avec le double du LLM
- Quand : on appelle `POST /api/v1/orientation/extraction` avec `X-Consentements: orientation=1`, puis sans consentement, puis avec un champ `tranche_age`, puis en mode `sans_donnees_personnelles`
- Alors : 200 conforme au schéma ; 403 `E-CONF-003` ; 422 `E-VAL-004` ; 403 `E-MODE-001`
- Données : requêtes du §5.1 de la conception
- Automatisation : `tests/unit/test_extraction.py::test_route_extraction_codes_de_reponse`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-11 — Aucun texte ni jeton refusé dans le journal
- Type : Sécurité/autorisation
- Exigences : FR-126, FR-120
- Critères d'acceptation : CA-001-03-06
- Étant donné : une extraction réussie avec 3 refus
- Quand : on lit l'événement d'audit
- Alors : il contient une empreinte et `refuses: 3`, mais ni le texte, ni `priapisme`, ni `grossesse`, ni `jeton_inconnu`
- Données : journal de test
- Automatisation : `tests/unit/test_extraction.py::test_journal_de_l_extraction_sans_texte_ni_jeton_refuse`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-12 — Données reproductibles, codes stables, contrôles de référence réussis
- Type : Régression
- Exigences : FR-127
- Critères d'acceptation : CA-001-03-07
- Étant donné : le dépôt
- Quand : on relance deux fois `python3 tools/donnees/generer_referentiel_symptomes.py`, puis `python3 tools/donnees/verifier_regles_triage_v2.py`
- Alors : fichier identique octet pour octet ; aucun code de la version précédente modifié ; code de sortie 0 du vérificateur
- Données : `kb/kb_chunks.jsonl`, référentiel livré
- Automatisation : `tests/regression/test_donnees_triage.py::test_generation_reproductible_et_codes_stables`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-13 — Accessibilité de chaque règle depuis la liste fermée
- Type : Intégration
- Exigences : FR-121
- Critères d'acceptation : CA-001-03-08
- Étant donné : le référentiel 1.1.0 et les 75 règles v2
- Quand : pour chaque tranche, on compare les jetons des conditions des règles applicables avec `listeFermee` fermée par `fermer`
- Alors : 0 jeton inaccessible
- Données : référentiel et règles livrés
- Automatisation : `tests/js/referentiel_c.test.mjs` › « TEST-001-03-13 : 0 jeton de condition inaccessible depuis la liste fermée de sa tranche » ; `tests/js/triage_parite.test.mjs` › « listes fermées : mêmes jetons pour chacune des 10 tranches (TEST-001-03-02, TEST-001-03-13) » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-001-03-14 — Parité de normalisation entre l'appareil et l'outillage
- Type : Unitaire
- Exigences : FR-122
- Critères d'acceptation : CA-001-03-03
- Étant donné : les 525 expressions indexées et les 42 phrases
- Quand : on compare `normaliser` (JavaScript) et `norm_expr` (Python) sur chaque chaîne
- Alors : 100 % de résultats identiques
- Données : chaînes exportées par un script de test depuis le référentiel
- Automatisation : `tests/regression/test_donnees_triage.py::test_normalisation_identique_en_javascript_et_en_python`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

## 3. Couverture
| Exigence | Tests |
|---|---|
| FR-120 | TEST-001-03-01, TEST-001-03-11 |
| FR-121 | TEST-001-03-02, TEST-001-03-03, TEST-001-03-13 |
| FR-122 | TEST-001-03-05, TEST-001-03-14 |
| FR-123 | TEST-001-03-07 |
| FR-124 | TEST-001-03-04, TEST-001-03-08 |
| FR-125 | TEST-001-03-01 |
| FR-126 | TEST-001-03-09, TEST-001-03-10, TEST-001-03-11 |
| FR-127 | TEST-001-03-12 |
| NFR-101 | TEST-001-03-06 |
| NFR-102 | TEST-001-03-01 |
