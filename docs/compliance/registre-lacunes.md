# Registre des lacunes — politiques, standards et données

Chaque lacune est reliée : au texte (`chunk_id`), à la parade retenue dans le prototype, aux exigences qui la mettent en œuvre (`FR-xxx`), au paramètre de `config/policy.yaml` qui la représente, et à une piste pour le régulateur. Le message à porter dans le rapport : **le prototype fonctionne aujourd'hui sans attendre les textes manquants, en choisissant toujours l'option la plus protectrice ; chaque lacune devient un paramètre que le régulateur peut basculer et dont il peut simuler l'effet.**

Statuts : [Fait] constat tiré du texte ; [Hyp] absence de texte constatée dans les sources réunies, à confirmer auprès du MINSANTE, du MINPOSTEL ou de l'APDP.

Version du 2026-11-09 : reprise du registre du projet (L1 à L14, 2026-11-07) et ajout de L15 et L16 proposées avec le module POC (D-033), que la console du ministère affiche déjà (SF-015-06).

## Vue d'ensemble

| ID | Lacune | Statut | Parade dans le prototype | Paramètre `policy.yaml` | Exigences |
|---|---|---|---|---|---|
| L1 | Profilage autorisé sous conditions (art. 44) mais pénalement sanctionné (art. 65) | Fait | Aucun profil individuel ; agrégats seulement | `decision_automatisee.profilage.autorise: false` | FR-105, FR-704, FR-706 |
| L2 | Pas de texte sectoriel santé (art. 72) | Hyp | Règles les plus strictes par défaut ; données de santé traitées comme sensibles | `texte_sectoriel_sante_publie` | FR-702, FR-703 |
| L3 | Décrets transfert (art. 32) et analyse d'impact (art. 33) ; APDP non opérationnelle | Hyp | LLM local ; seules les données anonymisées sortent ; analyse d'impact rédigée volontairement | `decret_transfert_publie`, `apdp_operationnelle` | FR-705, FR-708 |
| L4 | Pas de cadre de partage application → SIMR ; responsable de traitement flou | Hyp | Consentement séparé ; agrégats ; validation humaine par le point focal | `cadre_partage_app_simr`, `consentement.surveillance` | FR-201 à FR-208 |
| L5 | Pas de cadre pour les logiciels d'aide à l'orientation ; l'établissement de diagnostics par une personne non habilitée est un exercice illégal de la médecine (loi 90/036, art. 16, 2°, transcription non officielle) sans qu'aucun texte ne qualifie un logiciel | Hyp | Règles déterministes relues par un clinicien ; depuis D-026, aucun niveau affiché hors urgence ; depuis D-033, pistes seulement dans un module expérimental gouverné, en mode démo | `llm.usage_interdit`, `diagnostic_poc.*` (proposé) | FR-101 à FR-104, FR-1521 à FR-1528 |
| L6 | Le guide SBC 2023 ne prévoit ni canal numérique ni clause de protection des données | Fait | Signal émis comme « rumeur à vérifier » dans le circuit SBC existant | `surveillance.validation_humaine_obligatoire` | FR-203, FR-205 |
| L7 | Standards : Y.3172 sans nœud consentement/finalité ni contrôle de conformité par agent ; AI Readiness 2.0 sans responsabilité entre agents | Reco | Nœud P instancié par l'agent Conformité ; journal indiquant quel agent a décidé | — | FR-701, FR-709 |
| L8 | Art. 19 : conditions de publicité non publiées ; un classement non payant en relève-t-il ? | Hyp | Neutralité commerciale ; formule publique ; aucun champ sponsor | `conditions_publicite_art19_publiees` | FR-406, FR-605 |
| L9 | Pas de registre ouvert des pharmacies agréées ni de format de déclaration de stock | Hyp | Liste d'agrément simulée ; format de déclaration proposé ; fraîcheur affichée | `registre_ouvert_pharmacies` | FR-401, FR-402, FR-501, FR-1030 |
| L10 | Aucun texte sur la notation publique d'établissements de santé | Hyp | Score lissé, gel des rafales, contestation 72 h, modération humaine | `notation_etablissements.*` | FR-601 à FR-608 |
| L11 | Art. 48 : interdiction sans dérogation (vie sexuelle, génétique et biométrie en santé, origine linguistique…), y compris pour la santé publique | Fait | Ne jamais collecter ; recherches révélatrices exécutées sur l'appareil ; aucune question génétique | `donnees_sensibles.categories_interdites_art48` | FR-111, FR-112, FR-308, FR-408, FR-609, FR-712, FR-713 |
| L12 | Art. 19 : tout traitement de données personnelles soumis à autorisation préalable de l'APDP, modalités renvoyées à un texte réglementaire, autorité non opérationnelle | Fait (exigence) + Hyp (non opérationnelle) | Démo sur données synthétiques ; mode de production « sans données personnelles » ; fonctions personnelles activées seulement avec une référence d'autorisation | `autorisation_prealable.*` | FR-207, FR-714, FR-715 |
| L13 | Art. 48 et triage : l'IITT fait de l'« agression sexuelle » un critère de prise en charge rapide, que l'art. 48 interdit de traiter sans dérogation | Fait (textes) + Hyp (portée) | Critère jamais demandé ni traité ; information neutre sur l'écran d'urgence, sans question ni enregistrement [PROPOSITION] | `donnees_sensibles.categories_interdites_art48` | FR-146 (SF-001-06), FR-121 et FR-122 (SF-001-03) |
| L14 | Les textes de loi de la base sont en français seulement (sauf la loi 2019/019, dont la version anglaise officielle est versée le 2026-11-07), alors que l'interface doit être bilingue d'égale valeur et que la version anglaise des lois fait foi au même titre que la version française (loi 2019/019, art. 2, 5 et 24) | Fait (contenu de la base ; obligation de publication bilingue) + Hyp (version anglaise effectivement publiée et accessible pour chaque texte) | Traductions anglaises **non officielles**, marquées, liées à l'empreinte du fragment ; le texte français reste la référence ; versions anglaises officielles à verser (`kb/sources_en_attente.md`) | `langues.textes_de_loi` | FR-1119 à FR-1121 ; D-027 |
| L15 | Pas de données cliniques ouvertes au Cameroun pour entraîner ou évaluer un modèle d'aide à l'orientation ; nomenclature des formations sanitaires et plateaux techniques absente de la base | Hyp | Jeu synthétique DDXPlus (CC-BY) limité aux plaintes respiratoires ; fiche descriptive ; évaluation publiée ; détection hors champ ; correspondance pathologie → structure marquée « à valider » | `diagnostic_poc.*` (proposé) | FR-1541, FR-1542, FR-1562, FR-1563 |
| L16 | La loi 2024/017 ne dit pas si un calcul exécuté uniquement sur le téléphone, dont l'éditeur ne reçoit rien, est un traitement dont il est responsable | Hyp | Rien ne quitte l'appareil, rien n'est journalisé (pistes, recherches sensibles, besoins dérivés) ; avis du juriste demandé | `diagnostic_poc.transmission_serveur: false` (proposé) | FR-308, FR-408, FR-1525, FR-186 |

## Points à vérifier (pas encore des lacunes)

| ID | Point | Pourquoi | Action |
|---|---|---|---|
| V1 | ~~Art. 48 : portée de l'interdiction « en matière de santé »~~ **Résolu le 2026-11-03** | Texte officiel relu par l'équipe : la santé en général n'est pas dans la liste ; seules la génétique et la biométrie « en matière de santé » le sont, avec la vie sexuelle et les autres catégories | Fragment `CMR-LOI-2024-017::0048` corrigé (champ `correction`) ; nouvelle lacune L11 |
| V5 | ~~Art. 19 : alinéa 1 illisible~~ **Résolu le 2026-11-03** | Texte officiel relu : l'al. 1 soumet **tout** traitement à autorisation préalable ; l'al. 2 vise l'interconnexion des fichiers de données sensibles, relatives aux mineurs (virgule ambiguë : lecture large retenue) | Fragment `::0020` corrigé ; nouvelle lacune L12 |
| V6 | Articulation des art. 5, 48, 65 et 66 — **Position conservatoire arrêtée le 2026-11-03** | Le juriste de l'équipe retient que l'art. 66 al. 1 (et non l'art. 65, qui vise le profilage) fait du consentement exprès une condition nécessaire mais non suffisante : il ne déroge pas à l'art. 48 | `docs/compliance/note-interpretation-donnees-sensibles.md` ; à confirmer par un juriste spécialisé avant production |
| V7 | Validation clinique d'un outil d'orientation | Aucun texte réuni ne désigne qui peut valider des règles de triage numériques (ordre professionnel, MINSANTE) | Collecter le texte ; en attendant, triage limité au mode démo (FR-113) |
| V2 | Applicabilité de l'art. 29 de la loi 2010/012 (conservation 10 ans) à une application | Vise les exploitants de systèmes d'information (`CMR-LOI-2010-012::0034`) | Avis juridique ; en attendant, le journal ne contient aucune donnée identifiante |
| V3 | Texte imposant l'ordonnance pour certaines classes | Non réuni dans la base | Collecter le texte officiel ; en attendant, mention « Délivré sur ordonnance » sur les DCI marquées |
| V4 | Textes sur la transfusion (loi de 2003, politique 2025, plan 2025-2030) | Non réunis dans la base | Collecter ; en attendant, délivrance « sur prescription uniquement » |
| V8 | Portée de la loi 2019/019 pour l'exploitant de l'application | [Fait] La loi s'applique aux institutions publiques nationales et aux collectivités territoriales décentralisées (`CMR-LOI-2019-019::0003`, art. 3) ; l'État « encourage » la promotion des langues officielles dans les entités privées (`::0004`, art. 4) ; l'entité publique est une personne morale de droit public, dont les établissements et entreprises publics (`::0007`, art. 7 b). Le bilinguisme est donc une obligation si l'exploitant est une entité publique, une bonne pratique encouragée sinon | Désigner l'exploitant visé (question au propriétaire) ; en attendant, bilinguisme intégral appliqué comme une obligation (Principe XIV) |
| V9 | Le « pas de diagnostic » s'applique-t-il à un logiciel ? | La loi 90/036 (transcription non officielle) vise « toute personne non habilitée » qui prend part habituellement à l'établissement de diagnostics (`CMR-LOI-90-036::0015`, art. 16, 2°) ; la loi 90/035 réserve aux pharmaciens les produits destinés au diagnostic (art. 13) ; aucun texte réuni ne vise un logiciel d'aide à l'orientation | Avis du juriste ; en attendant, pistes seulement en mode démo (D-033), aucune hors démo |

## Détail

### L11 — Interdiction sans dérogation de l'art. 48
- **Constat** [Fait] : l'art. 48 al. 1 interdit « tout traitement » des données relatives notamment à la vie sexuelle, à l'origine linguistique ou régionale, à la génétique et à la biométrie en matière de santé (`CMR-LOI-2024-017::0048`, texte officiel). Contrairement au RGPD art. 9, qui pose une interdiction puis des exceptions (`INT-UE-RGPD-2016-679::0107`), l'article ne prévoit aucune dérogation. L'art. 5 range la santé parmi les données sensibles (`CMR-LOI-2024-017::0005`) et l'art. 66 al. 1 sanctionne leur mise ou conservation en mémoire sans consentement exprès (`CMR-LOI-2024-017::0062`). Position du juriste de l'équipe : ce consentement est nécessaire mais ne lève pas l'interdiction de l'art. 48 (`docs/compliance/note-interpretation-donnees-sensibles.md`).
- **Conséquences** [Hyp] : la lecture littérale empêche un programme de dépistage génétique de la drépanocytose, la biométrie dans un dossier de santé, ou un service numérique de planification familiale de traiter les données qui leur sont propres. Une application peut aussi révéler la vie sexuelle d'une personne par ses recherches (contraception, antirétroviraux).
- **Parade** : le système ne collecte jamais ces catégories ; les recherches qui pourraient les révéler sont faites sur l'appareil ; aucune question génétique ; pas de biométrie côté serveur ; la langue reste une préférence locale ; en mode POC, une piste relevant de l'art. 48 donne un message neutre (SF-001-16).
- **Piste pour le régulateur** : dérogations encadrées pour la santé publique, la prévention et les soins, sur le modèle du RGPD art. 9 al. 2.
- **Démonstration « et si »** : `derogation_par_consentement: true` montre ce qu'un futur texte permettrait et ce qui resterait bloqué.

### L12 — Autorisation préalable de tout traitement (art. 19)
- **Constat** [Fait] : l'art. 19 al. 1 soumet le traitement des données à caractère personnel à une autorisation préalable de l'APDP ; l'al. 2 soumet à une autorisation distincte l'interconnexion des fichiers de données sensibles, relatives aux mineurs ; l'al. 3 renvoie les modalités à un texte réglementaire (`CMR-LOI-2024-017::0020`). [Hyp] Ni l'autorité ni ce texte ne sont opérationnels.
- **Risque** : aucun service numérique de santé ne peut aujourd'hui traiter légalement des données personnelles.
- **Parade** : trois modes (`demo_synthetique`, `sans_donnees_personnelles`, `complet` avec référence d'autorisation) ; dossier d'autorisation préparé à l'avance (analyse d'impact, registre des traitements, matrice de traçabilité).
- **Piste pour le régulateur** : régime proportionné au risque ; procédure accélérée pour les bacs à sable réglementaires.
- **Exemple international** : `INT-UE-RGPD-2016-679::0050` (considérant 89).

### L13 — Triage des victimes de violences sexuelles et art. 48
- **Constat** [Fait] : l'IITT classe « Agression sexuelle » parmi les critères jaunes (`INT-OMS-IITT-FR::0000` à `::0002`) ; l'art. 48 al. 1 interdit tout traitement des données relatives à la vie sexuelle, sans dérogation (`CMR-LOI-2024-017::0048`) ; D-008.
- **Parade** : critère jamais affiché, indexé ni utilisé (D-022) ; information neutre sur l'écran d'urgence, sans question ni enregistrement [PROPOSITION].
- **Piste** : dérogation encadrée pour la prise en charge sanitaire (`INT-UE-RGPD-2016-679::0107`).

### L14 — Textes de loi en français seulement, interface bilingue
- **Constat** : voir la vue d'ensemble ; la loi 2019/019 impose la publication des textes dans les deux langues, chaque version faisant foi (`CMR-LOI-2019-019::0005`, `::0024`) ; sa version anglaise officielle est versée (`CMR-LOI-2019-019-EN`).
- **Parade** : 8 fragments anglais officiels reliés ; 20 traductions non officielles marquées « Unofficial translation » (`kb/traductions/citations_en.yaml`, contrôle `kb/traductions/verifier_traductions.py`) ; glossaire de requêtes.
- **Mesure** : questions anglaises sur des lois sans version anglaise : 0/5 ; sur la loi 2019/019 : 2/2 (`kb/README.md`, version 9).
- **Piste** : publier les versions française et anglaise des textes en format ouvert.

### L15 — Pas de données cliniques ouvertes (proposée, D-033)
- **Constat** [Hyp] : aucun jeu de données camerounais ouvert reliant des symptômes à des diagnostics confirmés n'a été trouvé. [Fait] Le meilleur jeu public trouvé (DDXPlus, CC-BY) est synthétique, calé sur la population de New York et limité aux plaintes respiratoires ; il ne contient ni paludisme, ni typhoïde, ni maladies diarrhéiques. [Hyp] La nomenclature officielle des formations sanitaires et de leurs plateaux techniques n'est pas dans la base.
- **Parade** : fiche descriptive, évaluation publiée, détection hors champ, correspondance marquée « à valider » (SF-001-15 à SF-001-19). Aujourd'hui Nolo utilise une table de démonstration, pas encore le modèle DDXPlus.
- **Piste** : ouvrir des données anonymisées de la SIMR et du DHIS2 ; publier la carte sanitaire en format ouvert ; constituer un jeu étiqueté avec avis éthique.

### L16 — Traitement sur l'appareil (proposée, D-033)
- **Constat** [Hyp] : la loi 2024/017 ne dit pas si un calcul exécuté uniquement sur le téléphone, dont l'éditeur ne reçoit rien, est un traitement dont il est responsable. La protection des catégories de l'art. 48 (scénario S2, SF-001-16, SF-001-10) repose sur ce point.
- **Parade** : rien ne quitte l'appareil, rien n'est journalisé.
- **Piste** : le préciser dans un texte d'application. Avis du juriste demandé.

### L1 — Profilage : autorisé sous conditions, puni pénalement
- **Constat** [Fait] : `CMR-LOI-2024-017::0044` (art. 44) ; `CMR-LOI-2024-017::0062` (art. 65).
- **Parade** : aucune donnée rattachée durablement à une personne ; position arrondie ; historique désactivé ; agrégats.
- **Exemple international** : RGPD art. 22 (`INT-UE-RGPD-2016-679::0127`).

### L2 — Absence de texte sectoriel santé
- **Constat** [Fait] : `CMR-LOI-2024-017::0068` (art. 72). [Hyp] Aucun texte identifié.
- **Exemple international** : RGPD art. 9 (`INT-UE-RGPD-2016-679::0107`).

### L3 — Décrets manquants et APDP
- **Constat** [Fait] : `CMR-LOI-2024-017::0033` (art. 32), `CMR-LOI-2024-017::0034` (art. 33). [Hyp] Textes non publiés.
- **Parade** : LLM et embeddings locaux ; analyse d'impact volontaire (`INT-UE-RGPD-2016-679::0143`).

### L4 — Partage application → SIMR
- **Constat** [Fait] : `CMR-LOI-2024-017::0011` (art. 9). [Hyp] Aucun texte ne désigne le responsable de traitement d'un signal issu d'une application.
- **Parade** : consentement distinct ; seuil de 5 ; aucune localisation individuelle transmise (scénario S3, SF-002-07).

### L5 — Logiciels d'aide à l'orientation
- **Constat** : voir la vue d'ensemble et V9 ; [Fait] outils conçus pour des soignants (`INT-OMS-PCIME-MANUEL::0028`, `INT-OMS-IITT-FR::0000`) ; loi 90/036 art. 2, 16, 17 (`CMR-LOI-90-036::0001`, `::0015`, `::0016`, transcription non officielle) ; loi 90/035 art. 13, 15, 16 (`CMR-LOI-90-035::0012`, `::0013`, `::0014`) ; droits de l'art. 44 (`CMR-LOI-2024-017::0044`).
- **Parade** : D-026 (reformulation, fiche pour le soignant, alerte limitée à l'urgence) ; D-033 (pistes seulement dans un module POC gouverné, en démo).
- **Exemple international** : AI Act, annexe III point 5 (`INT-UE-AI-ACT-2024-1689::0203`).

### L6 à L10
- **L6** : guide SBC sans canal numérique ni clause de confidentialité (`CMR-MINSANTE-GUIDE-SBC-2023::0000`, `::0018`) ; parade : « rumeur à vérifier » validée par le point focal.
- **L7** : standards (Y.3172, AI Readiness 2.0) ; parade : nœud P instancié par l'agent Conformité ; responsabilité entre agents dans le journal.
- **L8** : publicité (`CMR-LOI-90-035::0017`) ; parade : aucun paiement, formule publique.
- **L9** : registre et format de stock ; parade : liste simulée, format proposé, expiration à 48 h.
- **L10** : notation publique ; parade : score lissé, gel, contestation, modération humaine.
