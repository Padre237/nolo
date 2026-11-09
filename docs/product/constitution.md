# Constitution — Système agentique d'orientation sanitaire et de surveillance syndromique (Cameroun)

Version : 1.3.2 · Ratifiée : 2026-11-03 · Dernière modification : 2026-11-07 (1.3.2, correctif : version anglaise officielle de la loi 2019/019 citée au principe XIV ; 1.3.1, correctif : sources des principes I et XIV citées sur les textes versés dans la base — loi 2019/019, copie certifiée conforme ; loi 90/036, transcription non officielle ; 1.3.0 : principe XIV ajouté en application de la décision D-027 du propriétaire, version mineure ; principe I complété par l'affichage limité à l'alerte d'urgence, D-026, et par la loi 90/036, source secondaire ; modifications précédentes, 2026-11-04 : principe XII, licence SNOMED CT GPS corrigée en CC BY-ND 4.0 et référentiel interne de symptômes, D-018 ; principe II, nom du fichier de règles versionné et sources PCIME et IITT, D-019, D-021)

> **Version 2.0.0 proposée, non ratifiée (D-033, module POC des hypothèses de diagnostic).** Principe I : « Orienter toujours ; des hypothèses de diagnostic et l'orientation qui en découle uniquement dans un module expérimental gouverné, en mode démo ». Principe XI : « jamais collectées ni journalisées ; déduction possible uniquement sur l'appareil ; pour une catégorie de l'art. 48, aucun nom de maladie affiché, seulement un message neutre ; jamais transmise, même anonymisée, y compris de façon indirecte par la structure ou la spécialité recherchée ». Un principe affaibli impose une version MAJEURE : la ratification revient au propriétaire. L'application Nolo implémente déjà le module en mode démonstration (dossiers SF-001-15 à SF-001-19).

Ce document fixe les 14 principes non négociables du projet. Toute spécification, tout plan, toute tâche et tout code doivent s'y conformer. En cas de conflit entre une spécification et la constitution, la constitution l'emporte et la spécification doit être corrigée.

Convention de traçabilité : chaque principe cite ses sources par `chunk_id` de la base de connaissances (`kb_chunks.jsonl`). [Fait] = tiré d'un texte ; [Choix] = décision de conception de l'équipe ; [Hyp] = hypothèse à vérifier.

---

## Principe I — Orienter, jamais diagnostiquer ni prescrire

Le système indique un **niveau d'urgence** et un **type de structure**. Il ne nomme jamais une maladie probable, ne propose jamais de médicament, de posologie ni d'alternative thérapeutique.

- MUST : toute sortie destinée au patient passe un filtre qui rejette les noms de maladies, les posologies et les recommandations de produit.
- MUST : la recherche explicite d'un médicament (spec 004) renvoie des lieux, jamais un conseil.
- MUST (D-026) : au citoyen, seul le niveau `urgence` est montré, sous forme d'alerte ; les autres niveaux restent calculés mais ne sont pas affichés. Le système reformule les signes décrits avec le vocabulaire fermé du référentiel et produit une fiche que la personne montre au soignant : il décrit, le soignant qualifie.
- Sources : [Fait] la vente et la délivrance des médicaments sont réservées aux pharmaciens (`CMR-LOI-90-035::0012`, art. 13 ; `CMR-LOI-90-035::0049`, art. 52), y compris les produits « destinés au diagnostic médical » (art. 13) ; [Fait, transcription non officielle] la loi n° 90/036 du 10 août 1990 qualifie d'exercice illégal de la médecine le fait, pour toute personne non habilitée, même en présence d'un praticien, de prendre part habituellement ou par direction suivie à l'établissement de diagnostics ou aux traitements d'affections (`CMR-LOI-90-036::0015`, art. 16, 2°), puni de six jours à six mois d'emprisonnement et de 200 000 à 2 000 000 FCFA d'amende, ou de l'une de ces peines (`CMR-LOI-90-036::0016`, art. 17) ; texte du Journal officiel à verser (DEP-006) ; aucun texte réuni ne vise un logiciel (point V9) ; [Fait] l'OMS signale les risques de l'usage des grands modèles par les patients pour interpréter leurs symptômes (`INT-OMS-LMM-2024::0007`).

## Principe II — Les signes d'alerte sont déterministes

La détection d'une urgence ne dépend jamais d'un modèle de langage. Une règle fixe, versionnée et relue par un clinicien décide ; le LLM ne peut qu'**ajouter** de la prudence, jamais en retirer.

- MUST : si la règle déterministe classe « urgence », aucune autre sortie ne peut abaisser ce niveau.
- MUST : la règle est dans le fichier de règles de triage versionné (`rules/triage_signes_alerte.v2.yaml` à ce jour), avec son numéro de version et le nom du validateur clinique (vide tant que la validation n'est pas faite : démonstration seulement).
- Sources : [Fait] signes généraux de danger de la PCIME (`INT-OMS-PCIME-MANUEL::0028`) ; [Fait] critères rouges et jaunes de l'outil IITT de l'OMS, du CICR et de MSF (`INT-OMS-IITT-FR::0000` à `::0004`) ; [Fait] le règlement européen sur l'IA classe le tri des patients d'urgence parmi les systèmes à haut risque (`INT-UE-AI-ACT-2024-1689::0203`) — exemple international, non applicable au Cameroun.

## Principe III — Refus par défaut quand la politique est incertaine

Toute action qui touche une donnée personnelle est soumise à l'agent Conformité. S'il ne trouve pas de base légale explicite dans `config/policy.yaml`, il **bloque** et propose la solution dégradée sûre (agrégation, traitement local, anonymisation).

- MUST : une action sans décision de l'agent Conformité ne s'exécute pas (contrôle dans l'orchestrateur, pas dans l'agent métier).
- MUST : chaque décision de Conformité cite au moins un `chunk_id` ou renvoie `BLOQUE_SANS_FONDEMENT`.
- MUST : l'état du droit (décrets publiés ou non, APDP opérationnelle ou non) est lu dans `config/policy.yaml`, jamais codé en dur.
- Sources : [Fait] consentement et dérogations (`CMR-LOI-2024-017::0011`, art. 9) ; [Fait] analyse d'impact préalable (`CMR-LOI-2024-017::0034`, art. 33).

## Principe IV — Aucune donnée ne quitte le pays sans autorisation

Les données personnelles (symptômes, position, recherches sensibles) sont traitées sur une infrastructure située au Cameroun ou sur l'appareil. Un appel à un service hébergé à l'étranger (LLM, cloud, Sandbox) ne reçoit que des données anonymisées ou synthétiques, tant que `policy.yaml` n'indique pas une autorisation de transfert.

- MUST : contrôle `transfert_hors_pays` avant tout appel réseau sortant contenant des données de session.
- Sources : [Fait] autorisation préalable de l'APDP pour tout transfert (`CMR-LOI-2024-017::0033`, art. 32, alinéa 3 renvoyant à un texte réglementaire) ; [Fait] principe de souveraineté des données de santé (`CMR-MINSANTE-PSNSN-2026-2030::0005`).

## Principe V — Pas de profilage individuel

Le système ne construit aucun profil durable d'une personne. Les recherches et les symptômes servent la réponse immédiate puis sont agrégés ou effacés selon `policy.yaml`. La surveillance ne travaille que sur des agrégats.

- MUST : aucune table ne relie dans la durée un identifiant de personne à ses symptômes, recherches et positions.
- MUST : la position est arrondie à 2 décimales (≈ 1 km) avant toute journalisation.
- Sources : [Fait] droit d'opposition à une décision automatisée, profilage compris (`CMR-LOI-2024-017::0044`, art. 44) ; [Fait] sanction pénale du profilage (`CMR-LOI-2024-017::0062`, art. 65). Voir lacune L1.

## Principe VI — L'humain valide ce qui engage

Trois décisions ne sont jamais automatiques :
1. l'émission d'un signal de surveillance vers le district (point focal SIMR) ;
2. la baisse du score d'une pharmacie lors d'une rafale suspecte de signalements, et toute contestation ;
3. la sortie d'un cas « ambigu » du parcours d'orientation (renvoi vers un agent de santé ou une téléconsultation, quand ce service existe).

Pour tout le reste, le système agit seul, et l'utilisateur peut à tout moment demander une intervention humaine, contester et donner son point de vue.

- Sources : [Fait] droit à une intervention humaine et à contester (`CMR-LOI-2024-017::0044`, art. 44 al. 3) ; [Fait] délais de triage et d'évaluation des signaux communautaires (`CMR-MINSANTE-GUIDE-SBC-2023::0018`) ; exemple international : contrôle humain (`INT-UE-AI-ACT-2024-1689::0035`).

## Principe VII — Neutralité commerciale

Aucun établissement ne paie pour apparaître, monter dans un classement ou être mis en avant. Le classement repose uniquement sur des critères publics : ouverture, distance, fraîcheur de la déclaration, fiabilité issue des signalements.

- MUST : aucun champ « sponsor », « partenaire » ou « priorité » dans le modèle de données des établissements.
- MUST : la formule de classement est publiée dans l'application.
- Sources : [Fait] la publicité des médicaments et des établissements pharmaceutiques n'est autorisée que dans les conditions fixées par la tutelle après avis de l'Ordre (`CMR-LOI-90-035::0017`, art. 19). Voir lacune L8.

## Principe VIII — Tout est journalisé et rejouable

Chaque décision d'agent produit une entrée de journal JSON : session (pseudonyme), agent, entrée minimisée, fragments de la base consultés, version de la règle et de `policy.yaml`, décision, justification, validateur humain le cas échéant, horodatage. Le journal est en ajout seul et chaîné par empreinte.

- MUST : rejouer une session à partir du journal donne la même décision (règles et politique versionnées).
- Sources : exemple international : enregistrement automatique des événements (`INT-UE-AI-ACT-2024-1689::0032`) ; [Fait] conservation des données de trafic (`CMR-LOI-2010-012::0034`, art. 29 — application à l'application = [Hyp]).

## Principe IX — Transparence envers l'utilisateur

L'utilisateur sait qu'il échange avec un système automatisé, sait pourquoi une réponse lui est donnée et voit, en urgence, un bandeau fixe : « En cas d'urgence, rendez-vous aux urgences les plus proches. »

- Sources : exemple international : obligation de transparence (`INT-UE-AI-ACT-2024-1689::0088`) ; [Fait] six principes éthiques de l'OMS, dont la transparence et l'explicabilité (`INT-OMS-ETHIQUE-IA-SANTE-2021::0050`).

## Principe X — Complémentaire, jamais concurrent, de la SIMR

Le système ne remplace ni l'ASC, ni la ligne verte, ni la SIMR, ni DHIS2. Ses signaux reprennent les définitions communautaires officielles (SC1 à SC8) et suivent le circuit officiel de validation.

- Sources : [Fait] définitions SC1 à SC8 (`CMR-MINSANTE-GUIDE-SBC-2023::0028`) ; [Fait] SIMR et e-SIMR (`INT-OMS-AFRO-SIMR-3E-INTRO::0003`) ; [Fait] notification à l'OMS sous 24 h après évaluation (`INT-OMS-RSI-2005-AMENDE-2022::0012`).

## Principe XI — Catégories interdites : ne jamais collecter ce que l'art. 48 interdit

La santé est une donnée sensible : elle n'est traitée qu'avec un consentement **exprès**, recueilli par une case dédiée pour chaque finalité. Les catégories de l'art. 48 (vie sexuelle, génétique et biométrie en matière de santé, origine linguistique ou régionale, origine raciale ou ethnique, opinions) ne sont **jamais** collectées, déduites ni journalisées, même avec consentement, car l'article ne prévoit aucune dérogation.

- MUST : le triage ne pose aucune question génétique (génotype de la drépanocytose, antécédents génétiques familiaux, résultat de test génétique) ; il s'appuie sur les symptômes.
- MUST : aucune donnée biométrique n'est collectée par le serveur ; pas de photo identifiante, pas d'empreinte vocale.
- MUST : les recherches qui peuvent révéler la vie sexuelle (contraception, planification familiale, VIH, antirétroviraux, gynécologie) sont exécutées **sur l'appareil**, à partir d'une liste de stocks de la zone téléchargée en bloc : le serveur ne sait pas ce qui a été cherché.
- MUST : la langue de l'interface est une préférence stockée sur l'appareil, jamais journalisée ni utilisée pour déduire une origine.
- MUST : sans consentement exprès, les règles d'urgence s'exécutent sur l'appareil et aucun symptôme n'est envoyé au serveur.
- MUST : aucun paiement dans l'application (art. 48 al. 2).
- Sources : [Fait] interdictions (`CMR-LOI-2024-017::0048`, texte officiel relu par l'équipe) ; [Fait] la santé est une donnée sensible (`CMR-LOI-2024-017::0005`, art. 5) ; [Fait] sanction de la mise ou conservation en mémoire d'une donnée sensible sans consentement exprès (`CMR-LOI-2024-017::0062`, art. 66 al. 1). Position du juriste de l'équipe : le consentement exprès est nécessaire mais pas suffisant face à l'art. 48 (`docs/compliance/note-interpretation-donnees-sensibles.md`). Les rattachements de certaines recherches à la « vie sexuelle » sont une [Hyp] prudente de l'équipe. Voir lacune L11.

## Principe XII — Données synthétiques et licences respectées

Le prototype n'utilise que des données synthétiques ou ouvertes. Les symptômes sont codés par un référentiel interne (D-018) ; aucun contenu SNOMED CT n'est utilisé ni publié. Si le GPS de SNOMED CT est intégré plus tard, sa licence est **CC BY-ND 4.0** (pas d'œuvre dérivée, `INT-SNOMED-GPS-TECH::0000`) : seuls des identifiants seront référencés, sans redistribution du fichier. Les documents « tous droits réservés » ne sont pas publiés dans le dépôt ; l'IITT est cité, et sa licence vérifiée avant toute publication du PDF.

- Sources : [Fait] licence et usages du GPS (`INT-SNOMED-GPS-TECH::0000`) ; [Fait] licence CC BY-NC-SA 3.0 IGO portée sur le MC-IITT (`INT-OMS-MC-IITT-FR::0000`).

## Principe XIII — Aucune donnée personnelle réelle sans autorisation de l'APDP

Tout traitement de données personnelles est soumis à une autorisation préalable de l'APDP, et toute interconnexion ou interopérabilité de fichiers de données sensibles ou relatives aux mineurs à une autorisation distincte. Tant que `policy.yaml` ne porte pas une référence d'autorisation, le système fonctionne en mode `demo_synthetique` (hackathon, Sandbox) ou en mode `sans_donnees_personnelles`.

- MUST : l'orchestrateur lit `autorisation_prealable` au démarrage et désactive les fonctions qui exigent des données personnelles (surveillance, signalements de fiabilité, comptes) si l'autorisation manque.
- MUST : en mode `sans_donnees_personnelles`, les recherches de spécialité, de médicament et de sang restent disponibles sans compte, et le triage s'exécute sur l'appareil.
- MUST : aucun échange avec DHIS2 ou un autre système autre que des agrégats non personnels sans l'autorisation de l'al. 2.
- Sources : [Fait] `CMR-LOI-2024-017::0020` (art. 19, texte officiel relu par l'équipe) ; modalités renvoyées à un texte réglementaire (art. 19 al. 3) ; [Hyp] APDP et texte non opérationnels. Exemple international : le RGPD a supprimé l'obligation générale de notification au profit de l'analyse d'impact ciblée (`INT-UE-RGPD-2016-679::0050`, considérant 89). Voir lacune L12.

## Principe XIV — Deux langues officielles d'égale valeur

Le système parle français et anglais avec la même qualité : aucune langue n'est le repli de l'autre. Le serveur ne manipule que des codes neutres (jetons, verdicts, codes de justification, codes d'erreur) ; les phrases sont rendues au dernier moment dans la langue choisie par la personne. Les textes de loi sont cités dans leur version officielle ; une traduction non officielle peut l'accompagner, toujours marquée comme telle.

- MUST : toute clé de texte existe dans les deux catalogues de langue ; un test bloquant échoue sinon (`config/policy.yaml > langues.egale_valeur`).
- MUST : le texte saisi par la personne n'est jamais traduit automatiquement ; le référentiel de symptômes comprend directement les deux langues.
- MUST : une traduction non officielle est liée à l'empreinte du fragment source ; si le fragment change, elle n'est plus affichée tant qu'elle n'a pas été revue ; elle est remplacée par la version anglaise officielle dès que celle-ci est versée dans la base.
- MUST : la langue choisie reste une préférence de l'appareil, jamais journalisée (Principe XI ; `journal_audit.champs_interdits : langue`).
- Sources : [Fait, source secondaire] Constitution, art. 1er al. 3 : l'anglais et le français, langues officielles d'égale valeur, et promotion du bilinguisme sur tout le territoire (texte reproduit par WIPO Lex et par la presse, pas encore dans la base) ; [Fait] loi n° 2019/019 du 24 décembre 2019 portant promotion des langues officielles (copie certifiée conforme) : l'anglais et le français, langues officielles d'égale valeur (`CMR-LOI-2019-019::0002`, art. 2) ; application aux institutions publiques nationales et aux collectivités territoriales décentralisées (`::0003`, art. 3), promotion « encouragée » dans les entités privées (`::0004`, art. 4) ; usage systématique des deux langues dans les entités publiques et les services ouverts au public, droit d'obtenir informations et documents dans la langue de son choix, publication simultanée des textes législatifs et réglementaires dans les deux langues, chaque version faisant foi (`::0005`, art. 5 al. 2) ; droit de tout usager d'être servi et de communiquer dans l'une ou l'autre langue (`::0013`, art. 13 al. 3 ; `::0015`, art. 15). Version anglaise officielle de la même loi, alignée article par section : `CMR-LOI-2019-019-EN::0002` à `::0005`, `::0013`, `::0015`. Constitution à verser (`kb/sources_en_attente.md`, DEP-006). Décision D-027. Voir la lacune L14 et le point V8.

---

## Contraintes techniques

- Application uniquement (pas de SMS ni d'USSD). Limite d'inclusion déclarée : utilisateurs de smartphone.
- Français et anglais, d'égale valeur (Principe XIV).
- Embeddings et LLM exécutables localement (Ollama) ; ChromaDB ou BM25 pour la recherche.
- `policy.yaml` est la seule source de vérité de l'état du droit ; il est versionné et chaque changement est journalisé.

## Gouvernance de la constitution

- Toute modification exige une entrée dans `docs/compliance/registre-lacunes.md` ou une source nouvelle citée.
- Versionnement sémantique : MAJEUR si un principe est retiré ou affaibli, MINEUR si un principe est ajouté, CORRECTIF pour une reformulation.
- Chaque PR vérifie : aucun principe violé, chaque exigence nouvelle tracée dans `docs/traceability/matrix.md`.
