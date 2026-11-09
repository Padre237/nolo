# Base de connaissances et données du prototype – Orientation sanitaire et surveillance (Cameroun)

Version 9, du 7 novembre 2026, préparée pour l'ITU AI for Good Lab Hackathon (soumission du 10 novembre 2026). **Version publique (dépôt) : 2 034 fragments issus de 21 documents**, dont 11 textes camerounais (dont une version anglaise officielle) et 10 références internationales. La version de travail en compte 2 055 issus de 22 documents : les 21 fragments du guide OMS-AFRO de 2014 sur la SBC, « tous droits réservés », sont retirés du dépôt public (D-036) ; sa fiche reste dans `sources.json` avec son URL. Contrôle : `python3 tools/verifier_base.py --reconstruire`.

Changements de la version 9 (7 novembre, fin d'après-midi) :
- **version anglaise officielle de la loi n° 2019/019** (`CMR-LOI-2019-019-EN`, 31 fragments) : copie certifiée conforme publiée sur prc.cm, fournie par l'équipe ; découpage par « Section », **aligné rang pour rang sur la version française** (`CMR-LOI-2019-019::0013` ↔ `CMR-LOI-2019-019-EN::0013`) ; c'est la **première version anglaise officielle d'un texte camerounais dans la base** ;
- `build_kb.py` : mode de découpage `section_cmr_en` (« SECTION N: », contexte « CHAPTER … ») ; les autres documents sont découpés exactement comme avant ;
- `traductions/citations_en.yaml` 1.1.0 : 8 fragments de la loi 2019/019 reliés à leur fragment anglais officiel (statut `anglais_officiel_dans_la_base`), contrôlés par `verifier_traductions.py` ;
- 2 questions d'évaluation en anglais (Q39, Q40).

Changements de la version 8 (après-midi du 7 novembre) :
- **loi n° 2019/019 portant promotion des langues officielles** (`CMR-LOI-2019-019`, 31 fragments) : copie certifiée conforme de la Présidence, fournie par l'équipe ; reconnaissance de texte relue page par page sur l'image ;
- **loi n° 90/036 relative à l'exercice et à l'organisation de la profession de médecin** (`CMR-LOI-90-036`, 62 fragments) et **son décret d'application de 1992** (`CMR-DECRET-1992-MEDECIN`, 38 fragments) : **transcription non officielle** fournie par l'équipe (document Word reproduisant une page web), à remplacer par le texte du Journal officiel ;
- 4 questions d'évaluation (Q35 à Q38), 7 lignes de correspondance, 6 entrées du glossaire de requêtes.

Changements de la version 7 (matin du 7 novembre, décisions D-026 et D-027) :
- **traductions anglaises des fragments cités par la démonstration** (`traductions/citations_en.yaml`) : 20 traductions non officielles marquées comme telles, liées à l'empreinte du fragment source et provisoires (une version anglaise officielle est déjà repérée pour 11 d'entre elles : loi 2024/017 et guide SBC) ; pour les textes de l'OMS et de l'UE, la version anglaise officielle est à verser au lieu d'être traduite ;
- **glossaire de requêtes anglais → français** (`traductions/glossaire_requetes.yaml`) pour l'assistant « Mes droits santé » ;
- contrôle `traductions/verifier_traductions.py` (empreintes, passages recopiés mot pour mot, termes du glossaire présents dans la base) ;
- **12 questions d'évaluation** ajoutées pour l'assistant (Q23 à Q34, dont 4 en anglais) ;
- **registre des sources en attente** (`sources_en_attente.md`).

## Contenu

| Fichier | Contenu |
|---|---|
| `kb_chunks.jsonl` | Les 2 034 fragments de la version publique, prêts pour le RAG |
| `sources.json` | Catalogue des 22 sources (dont une en métadonnées seulement) : titre, autorité, date, type, langue, URL, nature de la source, droits, mode d'extraction |
| `mapping/correspondance_articles_pipeline_agents.csv` | **48 articles ou rubriques clés** (12 ajoutés le 2026-11-07 : assistant, signalement communautaire, lois 90/036 et 2019/019) reliés au nœud Y.3172 qu'ils gouvernent, à l'agent qui les applique et à leur usage (règle, garde-fou, lacune, exemple international), avec les `chunk_ids` correspondants |
| `eval/questions_test.jsonl` + `eval/run_eval.py` | 40 questions types par agent (22 de la version 6, 18 ajoutées le 2026-11-07 pour l'assistant « Mes droits santé »), avec la réponse attendue, et le script d'évaluation |
| `traductions/citations_en.yaml` | 34 entrées : 20 traductions non officielles (lois camerounaises, guide SBC, PSNSN), 8 fragments de la loi 2019/019 reliés à leur version anglaise officielle versée, 1 dont la source donne déjà l'anglais (définitions SC du guide SBC), 1 original anglais, 4 dont la version anglaise officielle est à verser |
| `traductions/glossaire_requetes.yaml` | 38 correspondances entre mots anglais courants et termes français présents dans les fragments |
| `traductions/verifier_traductions.py` | Contrôle des traductions et du glossaire (code de sortie 1 en cas d'écart) |
| `sources_en_attente.md` | Textes versés le 2026-11-07 et textes encore en attente (dont les versions anglaises officielles), avec les copies repérées et leur nature |
| `build_kb.py` | Reconstruit `kb_chunks.jsonl` depuis `pages/` et `text/` |
| `ingest_chroma.py` | Ingestion dans ChromaDB (embedding Ollama local) et recherche |
| `bm25.py` | Recherche lexicale BM25 sans dépendance, à combiner avec les embeddings (recherche hybride) |
| `rules/` | Définitions officielles du guide SBC (SC1 à SC8, 18 définitions de cas) et règles de triage de la version 1 (`triage_signes_alerte.yaml`, **remplacé** par `rules/triage_signes_alerte.v2.yaml` du dépôt du projet : 75 règles PCIME et IITT sourcées) |
| `generate_synthetic.py`, `data/synthetic/` | Données synthétiques : patients, séries de surveillance, scénario J1 à J4 |
| `rules/recherche_specialite.yaml`, `rules/disponibilites.yaml`, `rules/fiabilite_pharmacies.yaml` | Règles des nouveaux cas d'usage : recherche de service (rayon de 5 km élargi), médicaments et sang déclarés par les établissements, score de fiabilité et anti-manipulation |
| `generate_services.py` | Données simulées : 37 établissements fictifs, 13 médicaments (DCI), 247 déclarations de stock, 32 niveaux de sang, 434 signalements (dont une campagne de manipulation), 5 scénarios |
| `services/orientation_services.py`, `services/test_services.py` | Logique de référence (recherche, score, gel, journal d'audit) et 11 tests, tous réussis |

## Les 22 sources

| doc_id | Document | Langue | Source | Fragments |
|---|---|---|---|---|
| CMR-LOI-2024-017 | Loi n° 2024/017 (protection des données) | fr | Copie certifiée conforme (prc.cm), **reconnaissance de texte** | 72 |
| CMR-LOI-90-035 | Loi n° 90/035 (profession de pharmacien) | fr | Fichier de l'équipe (origine à préciser) | 123 |
| CMR-LOI-2010-012 | Loi n° 2010/012 (cybersécurité et cybercriminalité) | fr | Site du MINPOSTEL (copie archivée) | 103 |
| CMR-LOI-2010-013 | Loi n° 2010/013 (communications électroniques) | fr | **Copie hébergée par un site tiers**, à recouper avec le recueil de l'ART | 112 |
| CMR-LOI-2015-006 | Loi n° 2015/006 modifiant la loi 2010/013 | fr | art.cm | 10 |
| CMR-MINSANTE-GUIDE-SBC-2023 | Guide de surveillance à base communautaire | fr | biblio-minsante.cm | 66 |
| CMR-MINSANTE-PSNSN-2026-2030 | Plan stratégique national de santé numérique | fr | minsante.cm | 118 |
| INT-OMS-RSI-2005-AMENDE-2022 | Règlement sanitaire international (amendé en 2014 et 2022) | fr | OMS | 118 |
| INT-UE-RGPD-2016-679 | RGPD | fr | EUR-Lex | 233 |
| INT-UE-AI-ACT-2024-1689 | Règlement européen sur l'IA, version consolidée du 27.07.2026 | fr | EUR-Lex (version documentaire) | 227 |
| INT-OMS-ETHIQUE-IA-SANTE-2021 | OMS, *Ethics and governance of AI for health* | en | OMS | 227 |
| INT-OMS-LMM-2024 | OMS, *Guidance on large multi-modal models* | en | OMS | 116 |
| INT-OMS-PCIME-MANUEL | OMS, Manuel sur la PCIME (2001) | fr | OMS | 238 |
| INT-OMS-AFRO-SIMR-3E-INTRO | Guide technique SIMR, 3e édition – **section d'introduction seulement** | fr | OMS-AFRO | 97 |
| INT-OMS-AFRO-SBC-2014 | OMS-AFRO, guide de mise en place de la SBC — **métadonnées seulement** (tous droits réservés ; fragments retirés de la version publique) | fr | OMS-AFRO | 0 (21 dans la version de travail) |
| INT-SNOMED-GPS-TECH | SNOMED CT GPS, *Technical Application* (licence du GPS : CC BY-ND 4.0 ; non utilisé, D-018) | en | docs.snomed.org | 6 |
| INT-OMS-IITT-FR | OMS, CICR, MSF : outil de triage intégré inter-agences (IITT), version française — 12 ans et plus, moins de 12 ans, carte de référence | fr | Fichier fourni par l'équipe ; **transcription manuelle** vérifiée sur l'image ; licence non indiquée, à vérifier | 5 |
| INT-OMS-MC-IITT-FR | OMS, CICR, MSF : MC-IITT (afflux massif de blessés), catégories de triage | fr | Fichier fourni par l'équipe ; CC BY-NC-SA 3.0 IGO | 1 |
| CMR-LOI-2019-019 | Loi n° 2019/019 (promotion des langues officielles) | fr | Copie certifiée conforme (Présidence), fournie par l'équipe ; **reconnaissance de texte relue sur l'image** | 31 |
| CMR-LOI-2019-019-EN | Law No. 2019/019 (promotion of official languages), **version anglaise officielle** | en | Copie certifiée conforme (prc.cm), fournie par l'équipe ; **texte relu sur l'image** | 31 |
| CMR-LOI-90-036 | Loi n° 90/036 (exercice et organisation de la profession de médecin) | fr | **Transcription non officielle** fournie par l'équipe | 62 |
| CMR-DECRET-1992-MEDECIN | Décret du 22 juillet 1992 fixant les modalités d'application de la loi 90/036 | fr | **Transcription non officielle** fournie par l'équipe ; numéro à vérifier | 38 |

### Découpage
- Lois camerounaises et règlements européens, RSI : **un fragment par article**, et un par annexe pour les textes européens et le RSI. Un article de plus de 450 mots est découpé en parties (`Article 9 (partie 1/3)`). Les considérants du RGPD sont regroupés sous « Préambule et considérants ».
- Guides et stratégies : fragments d'environ 350 mots, avec la rubrique et les pages.
- Les champs de chaque fragment : `chunk_id`, `doc_id`, `title`, `authority`, `date`, `doc_type`, `jurisdiction`, `language`, `url`, `source_kind`, `rights_note`, `extraction`, `status_note`, `article`, `section`, `page_start`, `page_end`, `qa_flags`, `text`, et `correction` lorsqu'un article a été relu sur le texte officiel.

## Résultats de l'évaluation (40 questions types, mesure du 7 novembre 2026, base version 9)

| Recherche | Questions | Document attendu dans le top 5 | Référence attendue dans le top 5 |
|---|---|---|---|
| BM25 (`bm25.py`, sans modèle) | Q01 à Q22 (version 6) | 22/22 | 22/22 |
| BM25 | Q23 à Q30, Q35 à Q37 (assistant, français, formulées comme un citoyen) | 9/11 | 5/11 |
| BM25 | Q31 à Q34, Q38 (assistant, anglais, sur des lois sans version anglaise dans la base) | **0/5** | **0/5** |
| BM25 | Q39, Q40 (assistant, anglais, sur la loi 2019/019 dont la version anglaise officielle est versée) | **2/2** | **2/2** |
| BM25 | Total | 33/40 | 29/40 |
| Embedding « hash » (test de la chaîne seulement) | Total | 19/40 | 14/40 |
| Ollama + ChromaDB | **à mesurer chez vous** : `python eval/run_eval.py --embed ollama` | | |

Preuve : `docs/quality/preuve-2026-11-07-base-connaissances-v9.txt` du dépôt du projet (mesures précédentes : `preuve-2026-11-07-base-connaissances.txt` pour la version 7, `…-v8.txt` pour la version 8).

**Ce que ces chiffres montrent :**
- Les 22 questions de la version 6 ont été rédigées en connaissant les documents, avec leurs mots : elles favorisent la recherche lexicale et surestiment la qualité. Les questions formulées comme un citoyen (« Qui a le droit de vendre des médicaments au public ? ») trouvent souvent le bon texte mais pas le bon article (art. 75 au lieu de l'art. 13 de la loi 90/035), et le RGPD passe parfois devant la loi camerounaise (Q23, Q28).
- **Une question en anglais ne trouve aucun texte camerounais**, y compris « Can someone who is not a doctor make a diagnosis? » (Q38) : les lois sont en français, et BM25 ne rapproche pas les deux langues. C'est la raison du glossaire de requêtes (D-027), dont l'effet n'est pas encore mesuré : la conversion des requêtes n'est pas écrite.
- **Dès que la version anglaise officielle d'une loi est versée, les questions anglaises la trouvent** (Q39, Q40 : 2/2, au bon article). Les versions anglaises officielles règlent donc à la fois la question juridique (texte qui fait foi) et la recherche en anglais ; le glossaire reste utile pour les textes qui n'en ont pas.
- Recommandations : recherche hybride (BM25 + embedding multilingue), filtrage par `doc_id` selon l'agent (l'assistant ne cherche que dans les textes camerounais avant les exemples internationaux), glossaire pour les questions en anglais ; faire écrire d'autres questions par des membres de l'équipe qui ne connaissent pas les textes.

## Utilisation

```bash
pip install chromadb ollama && ollama pull nomic-embed-text
python ingest_chroma.py ingest --embed ollama
python ingest_chroma.py query "transfert de données vers l'étranger" --k 5 --embed ollama
python ingest_chroma.py query "systèmes de tri des patients" --embed bm25     # sans modèle
python eval/run_eval.py --embed bm25
python3 traductions/verifier_traductions.py                                 # traductions et glossaire
```

Avec le code de référence UIT (`CrashingGuru/ITUAIReadiness`), ajoutez dans `simulation/server/knowledge/ingest.py` le motif `(r"(?i)cameroun|cameroon|MINSANTE", "Cameroon")`, ou chargez directement `kb_chunks.jsonl`.

## Limites connues (à déclarer ou corriger)

1. **Loi 2024/017** : reconnaissance de texte d'un PDF scanné. Les en-têtes des articles 13, 40, 52, 58, 64 et 66 sont illisibles (leur texte est rattaché à l'article précédent, et ces fragments sont signalés dans `qa_flags`). Certains passages sont abîmés par les tampons. **Relisez chaque citation sur le texte officiel.** Les articles relus sont placés dans `corrections/CMR-LOI-2024-017.json` et remplacent l'OCR à la reconstruction (`python3 build_kb.py`) sans changer les `chunk_id`. Articles relus à ce jour : 19 et 48 ; libellé du fragment des articles 65 et 66 corrigé.
2. **Loi 90/035** : les en-têtes des articles 14 et 32 sont mal reconnus, et le fragment `CMR-LOI-90-035::0064` porte un numéro douteux. L'origine du fichier et le statut de modification de la loi sont à préciser.
3. **Loi 2010/013** : copie hébergée par un site tiers. À recouper avec le *Recueil des textes* de l'ART (édition 2023).
4. **Loi 2015/006** : c'est une loi modificative. Ses fragments citent les articles de la loi 2010/013 dans leur nouvelle rédaction, d'où un découpage par fenêtres plutôt que par article.
5. **SIMR, 3e édition** : seule la section d'introduction est présente, sur 11 sections.
6. **PCIME** : document de 2001, sans numéros de page dans le texte extrait (page 0). Vérifiez s'il existe des mises à jour.
7. **Règlement européen sur l'IA** : version consolidée, qui n'a qu'une valeur documentaire. Les numéros de page suivent l'ordre du texte.
8. **Documents en anglais** (OMS 2021, OMS 2024, SNOMED) : utilisez un modèle d'embedding multilingue, ou posez les questions dans les deux langues.
9. **Droits pour le dépôt public** :
   - CC BY-NC-SA 3.0 IGO (OMS 2021, OMS 2024, SIMR) : republication possible à des fins non commerciales, avec attribution.
   - PCIME : reproduction interdite à des fins commerciales.
   - **OMS-AFRO SBC 2014 : « tous droits réservés »**. Ne publiez pas son texte intégral sur GitHub sans autorisation : gardez ses métadonnées et son lien, et retirez ses fragments de la version publique.
   - SNOMED CT GPS : CC BY-ND 4.0 (`INT-SNOMED-GPS-TECH::0000`) ; le prototype n'utilise aucun contenu SNOMED (D-018).
   - IITT : licence non indiquée dans le PDF ; MC-IITT : CC BY-NC-SA 3.0 IGO. Ne publiez pas les PDF (`raw/iitt/`) avant vérification ; les fragments transcrits restent des citations attribuées.
10. **ChromaDB** n'a pas pu être testé dans l'environnement de préparation (installation de paquets bloquée). BM25, lui, a été testé.
11. **IITT** : outil conçu pour le triage en établissement par des soignants ; l'étape 3 (signes vitaux) n'est pas utilisable en auto-orientation (lacune L5). Transcription manuelle de 3 pages en colonnes : relisez toute citation sur le PDF.
12. **Traductions anglaises** : 20 traductions sont **non officielles**, préparées par Claude le 2026-11-07 et non relues (`relu_par: null`) ; plusieurs portent sur des fragments dont la reconnaissance de texte est abîmée (art. 9, 32, 44, 65 et 66 de la loi 2024/017 ; art. 13, 16, 53 et 75 de la loi 90/035) : les mots reconstitués et les passages illisibles sont signalés entre crochets. Une traduction ne remplace jamais le texte français. Dès qu'une version anglaise officielle sera versée, elle remplacera la traduction correspondante (lacune L14).
13. **Loi 90/036 et décret de 1992 : transcription non officielle.** Le fichier fourni reproduit une page web (coquille à l'art. 1er : « protection » pour « profession ») ; l'article de publication porte le n° 62 ici et le n° 63 dans une autre reproduction en ligne ; le décret porte le n° « 92-36 » ici et « 92-265-PM » dans les autres sources. L'« Article premier » de la loi et du décret n'est pas reconnu par le découpage (il n'est pas numéroté en chiffres) : il se trouve dans le fragment `::0000`, avec l'en-tête, libellé « Préambule et considérants ». Toute citation porte la mention « transcription non officielle » jusqu'au versement du texte du Journal officiel.
14. **Loi 2019/019** : reconnaissance de texte d'une copie certifiée conforme scannée, relue et corrigée page par page sur l'image par Claude le 2026-11-07, à relire par l'équipe ; les coquilles de l'original sont conservées (« la diffusions », « ENTITEES »).
15. **Textes manquants** : la Constitution, le texte officiel de la loi 90/036 et les versions anglaises officielles des autres lois (que l'équipe n'a pas) ; voir `sources_en_attente.md`.
16. **Loi 2019/019, deux versions qui font foi** : les versions française et anglaise ne disent pas toujours exactement la même chose (art. 5 al. 1 « administrations et organismes publics » / « public services and bodies » ; art. 19 al. 2 « le timbre » / « the header » ; art. 13 al. 1 « langues de travail » / « official working languages »). Citer la version de la langue de l'interface, sans traduire l'une à partir de l'autre.

## Données synthétiques (métadonnées AI Readiness 2.0)

| Jeu | Origine | Volume | Biais et limites |
|---|---|---|---|
| `patients.csv` | Synthétique, 17 profils pondérés | 600 consultations | Proportions non calées sur des données réelles ; la colonne `triage_attendu` utilise les anciens niveaux (à régénérer avec les niveaux FR-104 et les règles v2) |
| `surveillance_hebdo.csv` | Synthétique (loi de Poisson) | 960 lignes | Regroupement injecté dans AS-07, semaines 18 à 20 |
| `scenario_regroupement.jsonl` | Rédigé d'après les délais du guide SBC | 7 événements | Scénario de démonstration |
| `etablissements.csv` et fichiers liés | Simulé : établissements, positions et téléphones **fictifs** autour d'un point de référence | 37 établissements | Ne correspondent à aucun établissement réel ; à remplacer par healthsites / OSM |
| `signalements.csv` | Simulé, pseudonymes hachés | 434 signalements | Campagne de manipulation injectée (`campagne_simulee = True`) |

Aucune donnée réelle de patient n'est utilisée. Les liens vers les données géographiques ouvertes se trouvent dans `liens-telechargement.md`.
