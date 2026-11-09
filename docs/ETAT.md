# État du projet Nolo

Mis à jour le 2026-11-09 (session des vagues B et C, D-038). **À lire juste après `CLAUDE.md`, à chaque session.** À mettre à jour à la fin de chaque tâche (CLAUDE.md §11, étape 6).

## 1. En bref

- Le code existant (application Nolo, gouvernance Python, service des établissements, moteur v1, base v9) est réuni dans ce dépôt et **rétro-spécifié** : 146 dossiers de sous-fonctionnalités.
- **Vague A (D-037)** livrée : contrôle avant publication, rapport technique (Q-017-01-01 et Q-017-01-02 tranchées par D-038).
- **Vagues B et C approuvées (D-038)**. Livré le 2026-11-09 : **les agents dans Nolo** — politique 1.4.0 convertie (`app/data/politique.json`), Conformité et orchestrateur en JavaScript (parité exacte avec Python sur 3 908 décisions), journal chaîné (mêmes empreintes que Python), panneau « Comment Nolo a décidé » sur six écrans, cellule de coordination, rejeu avec ou sans gouvernance (6 violations contre 0), base embarquée et conseiller « Mes droits santé » (`#/droits`) ; côté vague C : actions du module POC (SF-007-03), garde et journal du module des pistes (SF-001-15), politique de la console en source unique (SF-015-04). 13 dossiers passés à `IN_TESTING`.
- Toutes les suites passent (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`, §4).
- **Vague C, premier lot livré** (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`) : rayon jusqu'à 3 résultats, synonymes en saisie libre, appel au don à la majorité, sang expiré à 6 h, fiabilité des pharmacies (parité Python, gel de rafale), quatre choix de signalement, position consentie et arrondie, raison par issue et lien vers un soignant, numéros lus dans la politique, conditions à 16 rubriques et page des établissements, définition SC et échéances dans la console, `preparerEnvoi`, contrôles de qualité (couleurs, contrastes, service worker, stockage, routeur). Rapport de soumission mis à jour (5 pages, conforme).
- **Vague C, deuxième lot livré** (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`) : moteur v1 (75 règles PCIME et IITT) branché dans Nolo pour l'urgence, empreinte canonique du paquet vérifiée au chargement, tests d'acceptation PCIME et IITT, `tools/lire_journal.py`, déduplication des contributions, mandats des agents institutionnels, matrice des rôles, AIPD (projet).
- **Vague C, troisième lot livré** (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`) : référentiel des symptômes côté appareil (repli sur la version embarquée) et serveur (validation, sources), route `POST /api/v1/orientation/extraction` avec filtre des propositions du LLM et journal sans texte, régression des données PCIME et IITT, `html` et `patch` contrôlés dans le navigateur.
- Reste en vague C : TASK-013-10-03 (assertions de contenu pour les 73 tests d'interface « état capturé ») ; tâches bloquées par une décision (D-013, D-014, D-016, Q-013-05-01) ; tâches de l'équipe (clinicien, juriste, ChromaDB). Vague D à approuver (DDXPlus, S4 Python, carte publique, vidéo).
- Soumission du hackathon : **10 novembre 2026**. À compléter par l'équipe dans le rapport : coordonnées de l'équipe et lien de la vidéo.

## 2. Décision attendue du propriétaire (porte G5)

| Objet | À lire | Comment l'enregistrer |
|---|---|---|
| Approbation du catalogue v2 (17 fonctionnalités, 146 sous-fonctionnalités) et de la correspondance v1 → v2 | `docs/specifications/README.md`, `docs/specifications/correspondance-v1-v2.md` | Ligne D-037 dans `docs/product/decisions.md` ; puis, dans chaque dossier approuvé, `Statut` → `APPROVED` (ou `READY_FOR_DEV` si la colonne « Bloquant » vaut « Aucun ») |
| Approbation par vague (possible) | `docs/specifications/INDEX-TACHES.md` | Approuver d'abord la vague A, puis la vague B dans l'ordre du §5 |
| Questions ouvertes | §9 des `requirements.md` (`grep -rn "| Q-" docs/specifications --include=requirements.md`) | Réponse dans la colonne « Statut » de la question, puis décision `D-…` si elle change une règle |
| Constitution 2.0.0 (D-033) | `docs/product/constitution.md` (note en tête) | Décision dédiée ; la version 1.3.2 reste en vigueur d'ici là |

Questions de la vague A (2026-11-09) :
- **Q-017-01-01** : FR-2302 demande « 2 055 fragments, 22 documents » ; aucun fichier de preuve ne porte ce chiffre. Proposition : garder 2 034 / 21 (prouvés) et modifier FR-2302.
- **Q-017-01-02** : le PDF du rapport ne peut pas être dans `docs/submission/` (aucun PDF dans l'arborescence, FR-2308). Proposition : `../livrables/` et corriger DES-017-01-01.
- **Q-017-02-01** : faut-il que le contrôle avant publication cherche aussi les adresses e-mail réelles ? Proposition : liste blanche des domaines de démonstration.

Deux questions nées des contrôles du 2026-11-09 (matin) :
- **Q-013-10-01** : l'inspection visuelle ne contrôle que la mise en page ; 76 tests d'interface restent donc « Non exécuté (état capturé) ». Proposition : FR-1347 et TASK-013-10-03 (assertions de contenu).
- **Q-007-14-01** : `executer.py --scenario orientation_urgente --sans-gouvernance` sort en code 1, par construction (aucune violation à contre-démontrer). Proposition : garder et le documenter.

## 3. Où sont les choses

Carte complète : `CLAUDE.md` §4. Sources de vérité : `CLAUDE.md` §5. En deux lignes : l'application est dans `app/` (PWA sans compilation) ; la référence Python des agents et de la politique est dans `src/server/` et `config/policy.yaml` ; les spécifications sont dans `docs/specifications/feature-XXX-*/sf-XXX-NN-*/` (4 fichiers chacune) ; les preuves sont dans `docs/quality/`.

## 4. Chiffres vérifiés (avec leur preuve)

| Mesure | Valeur | Preuve |
|---|---|---|
| pytest (gouvernance, scénarios, service D-029 / D-032, livrables, actions du POC, vague C, régression des données) | 133 réussis | `docs/quality/preuve-2026-11-09-vague-c3.txt` |
| `node --test tests/js/*.test.mjs` (moteur v1, acceptation PCIME et IITT, référentiel, catalogues D-029) | 32 réussis | idem |
| `cd app && node --test tests/*.test.mjs` (Nolo, agents compris) | 123 réussis | idem |
| Fiabilité des pharmacies : JavaScript ↔ référence Python | 57 scores (19 pharmacies × 3 instants), 0 écart, gel identique | idem |
| Parité Conformité JavaScript ↔ Python | 3 908 cas (S1 à S3 × 3 politiques, grille de 26 actions), 0 écart | idem |
| Journal chaîné : empreintes JavaScript ↔ Python | identiques sur les 3 journaux de scénarios | idem |
| Rejeu avec ou sans gouvernance (S1 à S4, dans Nolo) | 0 violation avec, 6 sans | idem |
| Recherche du conseiller : parité BM25 JavaScript ↔ `kb/bm25.py` | 40 questions, mêmes 5 fragments dans le même ordre | idem |
| Évaluation du conseiller (Q23 à Q40, base embarquée de 816 fragments) | document 18/18 ; référence exacte 15/18 (12/18 sans les expressions `courant_fr`, ajoutées en voyant Q23, Q26, Q30) ; anglais 5/5 | `docs/quality/eval-conseiller-2026-11-09.txt` |
| Règles de triage v2 | 390 / 390 témoins ; 0 violation de monotonie sur 5 000 | `docs/quality/preuve-2026-11-09-vague-a.txt` |
| Évaluation de la recherche (BM25, `kb/`, version publique) | document attendu 33/40 ; référence exacte 29/40 | idem |
| Base publique | 2 034 fragments, 21 documents ; base embarquée : 816 fragments (tous les `CMR-` et 50 `INT-` cités), 1,04 Mo | `preuve-2026-11-09-vague-a.txt`, `preuve-2026-11-09-vague-b.txt` |
| Inspection visuelle (47 états × 4 largeurs) | 188 mesures, 0 défaut, 0 erreur de console | `docs/quality/preuve-2026-11-09-vague-c.txt` |
| Contrôle avant publication | 0 PDF, 0 secret, 0 fragment réservé | à relancer avant chaque envoi |
| Spécifications | 146 dossiers, 483 exigences, 280 tâches, 415 tests ; `trace.py` : 0 erreur | `python3 tools/trace.py` |
| Tâches restantes | 30 (dont 15 de la vague D, 4 de l'équipe, 4 bloquées par une décision) ; 11 écarts | `docs/specifications/INDEX-TACHES.md`, `ECARTS.md` |

## 5. Prochaine tâche, par vague

| Vague | Prochaine tâche | Vérification |
|---|---|---|
| C — reste (approuvée, D-038) | TASK-013-10-03 (assertions de contenu des 73 tests « état capturé »), TEST-013-08-01 (rechargement hors ligne) ; bloquées : SF-001-09 (D-013), SF-008-06 (D-014), SF-007-12 (D-016), SF-013-05 (Q-013-05-01) | `INDEX-TACHES.md` |
| C — tâches de l'équipe | validation clinique (TASK-001-05-01, TASK-001-06-01), avis du juriste (TASK-001-06-02), ChromaDB (TASK-011-03-02) | hors de l'environnement de Claude |
| D — à approuver | DDXPlus (SF-001-19 ; les deux JSON manquants sont arrivés dans `../ddxplus-english/`), scénario S4 Python (SF-012-05), carte publique (SF-002-08), vidéo (SF-017-03) | — |
| Décisions | Q-013-05-01 (rouge des erreurs de saisie), Q-016-02-01 (seuil de pertinence du conseiller), constitution 2.0.0 (D-033), Q-007-14-01, Q-013-10-01, Q-017-02-01 | `docs/product/decisions.md` |

## 6. Points de vigilance (à ne pas oublier)

- Le brouillon du 4 novembre n'a jamais été versé : le rapport a été rédigé à partir du dépôt le 2026-11-09 (choix du propriétaire). Avant l'envoi : compléter les coordonnées de l'équipe et le lien de la vidéo, puis `python3 tools/rapport_pdf.py` et `python3 tools/verifier_rapport.py`. Ne pas mettre d'adresse e-mail réelle dans le dépôt public sans accord (Q-017-02-01).
- Avant tout `git push` : `python3 tools/controle_publication.py` (code 0).
- Nolo n'utilise pas encore le moteur v1 ni le référentiel de 110 entrées : sa liste de 28 signes est propre (SF-001-04, SF-001-07).
- Les tests d'interface « état capturé » ne doivent jamais être annoncés comme réussis.
- Le dépôt public ne contient pas le guide OMS-AFRO SBC 2014 (tous droits réservés) : ne pas le réintroduire (`python3 tools/verifier_base.py`).

## 7. Dépôt distant

- Distant : `https://github.com/Padre237/nolo.git`, branche `main`.
- Le 2026-11-09 (session D-037), le dossier local est devenu un dépôt git (`git init`, `git reset origin/main`) : le distant ne contenait que `LICENSE` (commit initial).

## 8. Journal des sessions

| Date | Travail | Preuves |
|---|---|---|
| 2026-11-03 → 11-04 | Spécifications v1.3 (BOUSSOLE), gouvernance Python, scénarios S1 à S3, base v8 | `docs/quality/preuve-2026-11-04-*` |
| 2026-11-07 | Consentement (D-028), inscription et fiches (D-029), tendances (D-032), base v9 | `docs/quality/2026-11-07-*` |
| 2026-11-08 → 11-09 | Application Nolo (D-034), hôpital, centres spécialisés et console du ministère (D-035) | inspection visuelle |
| 2026-11-09 | Assemblage du dépôt (MT-002) ; rédaction SDD complète, catalogue v2, rétro-spécification, `CLAUDE.md`, `ETAT.md`, commandes `.claude/commands/` (D-036) ; suites relancées ; 76 statuts d'interface corrigés en « état capturé » | `preuve-2026-11-09-suites.txt`, `-inspection-visuelle.txt`, `-croisement.txt` |
| 2026-11-09 | Vague C, troisième lot (11 tâches) : `chargerReferentiel`, `src/server/domain/referentiel_symptomes.py`, `src/server/agents/triage.py`, `src/server/api/orientation.py`, `tests/regression/test_donnees_triage.py`, `tests/js/referentiel_c.test.mjs`, `tests/unit/test_extraction.py`, cas `html`/`patch` dans `tools/inspecter.py` | `preuve-2026-11-09-vague-c3.txt` |
| 2026-11-09 | Vague C, deuxième lot (11 tâches) : `app/js/domain/triage.js` et copie du moteur (`tools/maj_moteur_nolo.py`), `empreinte_canonique` du paquet (`construire_paquet.py`, `empreinte.mjs`), `tests/js/regles_acceptation.test.mjs`, `tools/lire_journal.py`, `dedupliquer`, `docs/architecture/agents/`, `docs/product/roles.md`, `docs/compliance/aipd.md` ; script de preuve corrigé (pytest `-v`) | `preuve-2026-11-09-vague-c2.txt` |
| 2026-11-09 | Vague C, premier lot (38 tâches) : recherches, fiabilité des pharmacies (`app/js/domain/fiabilite.js`, oracle `tools/exporter_fiabilite.py`), position (`position.js`), routeur extrait, `envoi.js`, règles `kb/rules` exportées (`app/data/regles.json`), conditions à 16 rubriques, `#/pro/conditions`, console (SC, échéances), jetons de couleur et exceptions déclarées, `tools/maj_sw.py` ; rapport de soumission mis à jour ; Q-013-05-01 ouverte | `preuve-2026-11-09-vague-c.txt` |
| 2026-11-09 | Envoi du dépôt sur GitHub (jeton fourni par le propriétaire). Vagues B et C approuvées (D-038) : politique 1.4.0 et `tools/politique_json.py` ; base embarquée (`tools/exporter_base.py`) ; Conformité, orchestrateur, journal, parcours, cellule, A/B et conseiller en JavaScript ; oracles `--exporter-attendus` et `tools/exporter_classements.py` ; panneau « Comment Nolo a décidé » ; vues journal, cellule et A/B de la console ; `#/droits` ; `tools/evaluer_conseiller.mjs` ; `tools/inspecter.py` : 46 états, variable `NOLO_CHROME` ; 44 tests ajoutés (rouge puis vert, sauf 5 écrits avec le code, signalés dans la preuve) | `preuve-2026-11-09-vague-b.txt`, `eval-conseiller-2026-11-09.txt` |
| 2026-11-09 | Vague A approuvée (D-037) : `tools/controle_publication.py` (TASK-017-02-02) ; README : quatre verdicts (FR-2306) ; rapport technique anglais rédigé depuis le dépôt, PDF de 5 pages, `tools/rapport_pdf.py`, `tools/verifier_rapport.py` (TASK-017-01-01) ; 32 tests ajoutés (rouge puis vert) ; Q-017-01-01, Q-017-01-02, Q-017-02-01 ouvertes ; `.venv` par uv ; dépôt git initialisé | `preuve-2026-11-09-vague-a.txt` |
