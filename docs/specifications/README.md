# Catalogue des fonctionnalités et sous-fonctionnalités — v2

Version 2.0.0 · 2026-11-09 · Statut du catalogue : UNDER_REVIEW · Décision D-036 (rédaction SDD complète, granularité maximale).
Référence v1.3 archivée : `docs/archive/baseline-v1.3/` ; catalogue v1 (BOUSSOLE, 2026-11-03) remplacé — correspondance dans `correspondance-v1-v2.md`.

## 1. Règles de rédaction

1. Un dossier par sous-fonctionnalité : `requirements.md`, `design.md`, `tasks.md`, `tests.md`. Aucune section supprimée (écrire « Aucun » ou « Sans objet »).
2. Une exigence a une seule sous-fonctionnalité propriétaire (§3 de `requirements.md`) ; les autres la citent au §4.
3. Les exigences v1.3 gardent leur identifiant et leur texte ; une exigence dépassée reste listée avec le statut « REMPLACÉE par … » et n'a plus ni conception, ni tâche, ni test propres.
4. **Granularité** : une exigence = un comportement observable et testable ; un critère d'acceptation mesurable par exigence au moins ; une tâche ≈ un fichier ou une fonction ; chaque tâche cite ses exigences, sa conception, les fichiers à lire et à modifier, ses tests et sa condition de fin.
5. Une valeur métier non décidée est une question ouverte (`Q-…`) avec une proposition ; jamais présentée comme acquise. Une cible chiffrée proposée par Claude porte « [PROPOSITION, à valider] ».
6. Un test n'est marqué « Exécuté … réussi » que s'il cite un fichier de preuve daté de `docs/quality/` ; sinon « Non exécuté ».
7. Les dossiers rétro-spécifiés décrivent le code tel qu'il est ; tout écart connu entre la spécification et le code figure au §9 de `design.md` et a une tâche « À faire ».
8. Chaque `requirements.md` se termine par le §10 « Contexte à charger » : la liste exacte des fichiers à lire avant d'y travailler.

## 2. Deux axes de statut

| Axe | Valeurs | Où |
|---|---|---|
| Statut du dossier (spécification) | DRAFT → UNDER_REVIEW → APPROVED → READY_FOR_DEV → IN_PROGRESS → IN_TESTING → DONE | ligne « Statut » de chaque fichier ; lue par `tools/trace.py` |
| État d'implémentation | Implémenté (rétro-spécifié) · Partiellement implémenté · Non implémenté | ligne « État d'implémentation » ; statut de chaque tâche : « Fait », « Partiel », « À faire » |

Tous les dossiers v2 sont livrés en **UNDER_REVIEW** : aucune tâche « À faire » ne démarre avant l'approbation explicite du propriétaire (voir `CLAUDE.md`).

## 3. Plages d'identifiants

| Fonctionnalité | Exigences fonctionnelles | Non fonctionnelles |
|---|---|---|
| F-001 Orientation à partir des signes | FR-120 à FR-199 (v1) ; FR-1501 à FR-1599 (v2) | NFR-101 à NFR-199 ; NFR-1501 à NFR-1599 |
| F-002 Surveillance syndromique | FR-220 à FR-299 ; FR-1601 à FR-1649 | NFR-201 à NFR-299 |
| F-003 Recherche d'un service ou d'une spécialité | FR-320 à FR-399 | NFR-301 à NFR-399 |
| F-004 Recherche d'un médicament | FR-420 à FR-499 | NFR-401 à NFR-499 |
| F-005 Recherche de sang | FR-520 à FR-599 | NFR-501 à NFR-599 |
| F-006 Fiabilité des déclarations | FR-620 à FR-699 | NFR-601 à NFR-699 |
| F-007 Gouvernance, conformité, audit et agents | FR-720 à FR-799 ; FR-1901 à FR-1999 (agents dans l'application) | NFR-701 à NFR-799 ; NFR-1901 à NFR-1999 |
| F-008 Consentements et droits | FR-801 à FR-899 | NFR-801 à NFR-899 |
| F-009 Accès, rôles et comptes | FR-901 à FR-999 | NFR-901 à NFR-999 |
| F-010 Espace établissement | FR-1001 à FR-1099 | NFR-1001 à NFR-1099 |
| F-011 Base de connaissances | FR-1101 à FR-1199 | NFR-1101 à NFR-1199 |
| F-012 Données fictives et scénarios | FR-1201 à FR-1299 | NFR-1201 à NFR-1299 |
| F-013 Socle de l'application Nolo | FR-1301 à FR-1399 | NFR-1301 à NFR-1399 |
| F-014 Tendances de la demande | FR-2001 à FR-2099 | NFR-2001 à NFR-2099 |
| F-015 Console du ministère | FR-2101 à FR-2199 | NFR-2101 à NFR-2199 |
| F-016 Conseiller « Mes droits santé » | FR-2201 à FR-2299 | NFR-2201 à NFR-2299 |
| F-017 Livrables de soumission | FR-2301 à FR-2399 | NFR-2301 à NFR-2399 |
| MT Maintenance | FR-1401 à FR-1499 (MT-001) ; FR-2401 à FR-2499 (MT-002) | NFR-1401 à NFR-1499 ; NFR-2401 à NFR-2499 |

Identifiants dérivés : `CA-FFF-SS-NN` (critère), `BR-…` (règle), `DES-…` (conception), `TASK-…`, `TEST-…`, `Q-…` ; pour la maintenance `MT-00N` : `CA-M0N-NN`.

## 4. Fonctionnalités

| ID | Nom | Dossier | Origine | Sous-fonctionnalités |
|---|---|---|---|---|
| F-001 | Orientation à partir des signes | [`feature-001-orientation/`](feature-001-orientation/README.md) | Spécification v1.3 001 ; D-018 ; D-026 ; D-027 ; D-033 (POC) ; D-034 | 19 |
| F-002 | Surveillance syndromique | [`feature-002-surveillance/`](feature-002-surveillance/README.md) | Spécification v1.3 002 ; guide SBC 2023 ; RSI ; D-035 | 12 |
| F-003 | Recherche d'un service ou d'une spécialité | [`feature-003-recherche-specialite/`](feature-003-recherche-specialite/README.md) | Spécification v1.3 003 ; D-035 | 4 |
| F-004 | Recherche d'un médicament | [`feature-004-recherche-medicament/`](feature-004-recherche-medicament/README.md) | Spécification v1.3 004 | 4 |
| F-005 | Recherche de sang | [`feature-005-recherche-sang/`](feature-005-recherche-sang/README.md) | Spécification v1.3 005 | 3 |
| F-006 | Fiabilité des déclarations | [`feature-006-fiabilite-pharmacies/`](feature-006-fiabilite-pharmacies/README.md) | Spécification v1.3 006 ; D-001 à D-003 ; D-030 | 8 |
| F-007 | Gouvernance, conformité, audit et agents | [`feature-007-gouvernance/`](feature-007-gouvernance/README.md) | Spécification v1.3 007 ; D-008 ; D-025 ; AG-01 à AG-08 (2026-11-09) | 21 |
| F-008 | Consentements et droits | [`feature-008-consentements-droits/`](feature-008-consentements-droits/README.md) | Spécification v1.3 001, 002, 007 ; D-028 | 9 |
| F-009 | Accès, rôles et comptes | [`feature-009-acces-roles-comptes/`](feature-009-acces-roles-comptes/README.md) | D-011 ; D-029 | 5 |
| F-010 | Espace établissement | [`feature-010-referentiel-declarations/`](feature-010-referentiel-declarations/README.md) | Spécification v1.3 004, 005 ; D-029 ; D-031 ; D-035 | 13 |
| F-011 | Base de connaissances | [`feature-011-base-connaissances/`](feature-011-base-connaissances/README.md) | Base v1 à v9 ; D-027 | 8 |
| F-012 | Données fictives et scénarios | [`feature-012-donnees-scenarios/`](feature-012-donnees-scenarios/README.md) | D-025 ; D-033 | 5 |
| F-013 | Socle de l'application Nolo | [`feature-013-application/`](feature-013-application/README.md) | Spécification v1.3 003 (FR-306) ; D-027 ; D-034 | 11 |
| F-014 | Tendances de la demande | [`feature-014-tendances-demande/`](feature-014-tendances-demande/README.md) | D-032 | 6 |
| F-015 | Console du ministère | [`feature-015-console-ministere/`](feature-015-console-ministere/README.md) | D-035 | 6 |
| F-016 | Conseiller « Mes droits santé » | [`feature-016-conseiller-droits/`](feature-016-conseiller-droits/README.md) | D-026 ; AG-06 | 5 |
| F-017 | Livrables de soumission | [`feature-017-livrables/`](feature-017-livrables/README.md) | Règles du hackathon | 5 |
| MT | Maintenance | [`maintenance/`](maintenance/README.md) | D-010 ; D-036 | 2 |

## 5. Sous-fonctionnalités

| ID | Nom | Exigences possédées | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|
| [SF-001-01](feature-001-orientation/sf-001-01-saisie-signes/requirements.md) | Saisie des signes et du contexte (pour qui, âge, description) | FR-105, FR-150, FR-151, FR-152, FR-153, FR-154 | Implémenté | SF-013-02, SF-013-04, SF-008-01 | Aucun | P0 |
| [SF-001-02](feature-001-orientation/sf-001-02-retrait-mentions-interdites/requirements.md) | Retrait des mentions interdites avant tout envoi | FR-111, FR-155, FR-156 | Partiellement implémenté | SF-001-01, SF-001-13 | Aucun | P0 |
| [SF-001-03](feature-001-orientation/sf-001-03-codage-symptomes/requirements.md) | Codage des symptômes par le référentiel interne (moteur v1) | FR-103 (remplacée), FR-120 à FR-127, NFR-101, NFR-102 | Implémenté (moteur v1 `src/client/ondevice/`), non branché à Nolo | SF-001-02, SF-001-04, SF-007-03 | — | P0 |
| [SF-001-04](feature-001-orientation/sf-001-04-paquet-regles/requirements.md) | Chargement et contrôle du paquet de règles de triage (moteur v1) | FR-113, FR-160, FR-161 | Implémenté | SF-007-01, SF-001-03 | Aucun | P0 |
| [SF-001-05](feature-001-orientation/sf-001-05-regles-enfant-pcime/requirements.md) | Règles PCIME de l'enfant de 2 mois à 5 ans (moteur v1) | FR-130 à FR-136 | Données générées et contrôlées ; moteur v1 | SF-001-03, SF-001-04 | — | P0 |
| [SF-001-06](feature-001-orientation/sf-001-06-regles-iitt/requirements.md) | Critères de l'outil IITT (moteur v1) | FR-140 à FR-147 | Données générées et contrôlées ; moteur v1 | SF-001-03, SF-001-04 | — | P0 |
| [SF-001-07](feature-001-orientation/sf-001-07-calcul-niveau/requirements.md) | Calcul du niveau d'urgence (moteur v1) — affiché seulement s'il vaut « urgence » | FR-101, FR-104, FR-110, FR-165, FR-166, FR-167, FR-168 | Implémenté | SF-001-03, SF-001-04, SF-001-05, SF-001-06, SF-007-09 | Aucun | P0 |
| [SF-001-08](feature-001-orientation/sf-001-08-urgence-sans-consentement/requirements.md) | Urgence sur l'appareil sans consentement | FR-112, FR-175 | Implémenté | SF-001-14, SF-008-01 | Aucun | P0 |
| [SF-001-09](feature-001-orientation/sf-001-09-cas-ambigu/requirements.md) | Cas ambigu : relèvement prudent et renvoi vers un soignant | FR-180, FR-181, FR-182 | Non implémenté | SF-001-07, SF-008-06 | D-013 | P1 |
| [SF-001-10](feature-001-orientation/sf-001-10-structure-adaptee/requirements.md) | « Où aller » : structure adaptée aux besoins | FR-185, FR-186, FR-187, FR-188, FR-189 | Implémenté | SF-001-15, SF-010-01, SF-003-02 | Aucun | P0 |
| [SF-001-11](feature-001-orientation/sf-001-11-filtre-sortie/requirements.md) | Filtre de sortie : aucun médicament, posologie ni alternative | FR-102, FR-190, FR-191, FR-192 | Implémenté | SF-001-15 | Aucun | P0 |
| [SF-001-12](feature-001-orientation/sf-001-12-numeros-urgence/requirements.md) | Numéros d'urgence et barre de sécurité | FR-114, FR-195, FR-196 | Implémenté | SF-007-01, SF-013-01 | D-004 | P0 |
| [SF-001-13](feature-001-orientation/sf-001-13-reformulation/requirements.md) | « Décrire ce que je ressens » : reformulation bilingue, négation et durée | FR-1501, FR-1502, FR-1503, FR-1504, FR-1505, FR-1506, FR-1507, FR-1508, NFR-1501 | Implémenté | SF-001-01, SF-013-04 | Aucun | P0 |
| [SF-001-14](feature-001-orientation/sf-001-14-securite-urgence/requirements.md) | Questions de sécurité et alerte d'urgence | FR-1511, FR-1512, FR-1513, FR-1514, FR-1515 | Implémenté | SF-001-13, SF-001-12 | Aucun | P0 |
| [SF-001-15](feature-001-orientation/sf-001-15-pistes-poc/requirements.md) | Pistes expérimentales (POC) : au plus trois, avec leur score et leur origine | FR-1521, FR-1522, FR-1523, FR-1524, FR-1525, FR-1526, FR-1527, FR-1528 | Partiellement implémenté | SF-001-14, SF-001-16, SF-001-17, SF-007-03 | Avis du juriste (L5, V9) avant tout usage hors démo | P0 |
| [SF-001-16](feature-001-orientation/sf-001-16-message-neutre-art48/requirements.md) | Message neutre pour une piste relevant de l'art. 48 | FR-1536, FR-1537, FR-1538 | Implémenté | SF-001-15 | Aucun | P0 |
| [SF-001-17](feature-001-orientation/sf-001-17-hors-champ/requirements.md) | Hors champ du modèle expérimental | FR-1541, FR-1542, FR-1543 | Implémenté | SF-001-15 | Aucun | P0 |
| [SF-001-18](feature-001-orientation/sf-001-18-fiche-soignant/requirements.md) | Fiche à montrer au soignant (carnet) | FR-1546, FR-1547, FR-1548, FR-1549 | Implémenté | SF-001-13, SF-001-15, SF-013-09 | Aucun | P0 |
| [SF-001-19](feature-001-orientation/sf-001-19-modele-ddxplus/requirements.md) | Modèle DDXPlus sur l'appareil, parité et évaluation | FR-1561, FR-1562, FR-1563, FR-1564, FR-1565, FR-1566 | Non implémenté | SF-001-15, SF-011-01, SF-012-05 | Téléchargement de DDXPlus (figshare) par l'équipe ; réseau du poste | P1 |
| [SF-002-01](feature-002-surveillance/sf-002-01-contribution/requirements.md) | Contribution consentie à la surveillance | FR-201, FR-220, FR-221, FR-222 | Partiellement implémenté | SF-008-02, SF-001-02, SF-007-03 | Aucun | P0 |
| [SF-002-02](feature-002-surveillance/sf-002-02-agregation/requirements.md) | Agrégation par aire et semaine avec seuil de 5 | FR-202, FR-225, FR-226 | Implémenté | SF-002-01 | Aucun | P0 |
| [SF-002-03](feature-002-surveillance/sf-002-03-detection-signal/requirements.md) | Détection des regroupements (CUSUM) et définitions de cas | FR-203, FR-230, FR-231, FR-232 | Implémenté | SF-002-02 | Aucun | P0 |
| [SF-002-04](feature-002-surveillance/sf-002-04-validation-point-focal/requirements.md) | Validation du signal par le point focal | FR-204, FR-237, FR-238, FR-239 | Implémenté | SF-002-03, SF-009-01 | Aucun | P0 |
| [SF-002-05](feature-002-surveillance/sf-002-05-delais-rappels/requirements.md) | Délais SBC et rappels | FR-205, FR-243 | Partiellement implémenté | SF-002-04 | Aucun | P1 |
| [SF-002-06](feature-002-surveillance/sf-002-06-decision-rsi/requirements.md) | Instrument de décision du RSI (annexe 2) | FR-246, FR-247, FR-248 | Implémenté | SF-002-04 | Aucun | P0 |
| [SF-002-07](feature-002-surveillance/sf-002-07-refus-donnees-individuelles/requirements.md) | Refus de transmettre des données individuelles | FR-206, FR-251 | Implémenté | SF-007-03, SF-007-15 | Aucun | P0 |
| [SF-002-08](feature-002-surveillance/sf-002-08-carte-publique/requirements.md) | Carte épidémiologique publique | FR-208, FR-255 | Non implémenté | SF-002-02 | Aucun | P1 |
| [SF-002-09](feature-002-surveillance/sf-002-09-export-agrege/requirements.md) | Export agrégé compatible DHIS2 | FR-207, FR-258 | Implémenté | SF-002-04, SF-007-08 | Aucun | P0 |
| [SF-002-10](feature-002-surveillance/sf-002-10-aire-frontaliere/requirements.md) | Signal en aire frontalière | FR-209 | Non implémenté | SF-002-03 | Aucun | P2 |
| [SF-002-11](feature-002-surveillance/sf-002-11-signalement-communautaire/requirements.md) | Signalement d'un événement communautaire | FR-1601, FR-1602 | Non implémenté | SF-002-04 | Aucun | P2 |
| [SF-002-12](feature-002-surveillance/sf-002-12-carte-symptomes-ministere/requirements.md) | Carte interactive des symptômes pour le ministère | FR-1606, FR-1607, FR-1608, FR-1609, FR-1610, FR-1611 | Implémenté | SF-002-02, SF-002-03, SF-013-06 | Aucun | P0 |
| [SF-003-01](feature-003-recherche-specialite/sf-003-01-resolution-specialite/requirements.md) | Choix de la spécialité dans une liste fermée | FR-301, FR-304, FR-320, FR-321, FR-322 | Implémenté | SF-013-04 | Aucun | P0 |
| [SF-003-02](feature-003-recherche-specialite/sf-003-02-rayon-progressif/requirements.md) | Recherche par rayon progressif et tri public | FR-302, FR-303, FR-307, FR-323, FR-324 | Implémenté | SF-003-01, SF-010-01 | Aucun | P0 |
| [SF-003-03](feature-003-recherche-specialite/sf-003-03-recherche-sensible-appareil/requirements.md) | Spécialités sensibles : recherche sur l'appareil, jamais comptée | FR-305, FR-308, FR-325 | Implémenté | SF-003-02, SF-014-01 | Aucun | P0 |
| [SF-003-04](feature-003-recherche-specialite/sf-003-04-centres-specialises/requirements.md) | Centres spécialisés par domaine | FR-326, FR-327 | Implémenté | SF-003-02, SF-010-06 | Aucun | P0 |
| [SF-004-01](feature-004-recherche-medicament/sf-004-01-catalogue-dci/requirements.md) | Catalogue des DCI et normalisation de la saisie | FR-407, FR-420, FR-421 | Implémenté | SF-013-04 | Aucun | P0 |
| [SF-004-02](feature-004-recherche-medicament/sf-004-02-recherche-stocks/requirements.md) | Recherche dans les stocks déclarés et classement | FR-402, FR-403, FR-406, FR-422, FR-423, FR-424 | Implémenté | SF-004-01, SF-010-02, SF-006-02 | Aucun | P0 |
| [SF-004-03](feature-004-recherche-medicament/sf-004-03-refus-alternative/requirements.md) | Aucune alternative, posologie ni promotion | FR-404, FR-425 | Implémenté | SF-004-02 | Aucun | P0 |
| [SF-004-04](feature-004-recherche-medicament/sf-004-04-medicament-sensible-appareil/requirements.md) | Médicaments sensibles : recherche sur l'appareil, sans signalement ni comptage | FR-405, FR-408, FR-426 | Implémenté | SF-004-02 | Aucun | P0 |
| [SF-005-01](feature-005-recherche-sang/sf-005-01-recherche-groupe/requirements.md) | Recherche d'un groupe sanguin | FR-502, FR-503, FR-520, FR-521 | Implémenté | SF-010-03, SF-003-02 | Aucun | P0 |
| [SF-005-02](feature-005-recherche-sang/sf-005-02-appel-au-don/requirements.md) | Appel au don | FR-504 | Partiellement implémenté | SF-005-01 | Aucun | P1 |
| [SF-005-03](feature-005-recherche-sang/sf-005-03-priorite-triage/requirements.md) | La recherche de sang ne court-circuite jamais l'alerte d'urgence | FR-505, FR-522 | Implémenté | SF-005-01, SF-001-12 | Aucun | P0 |
| [SF-006-01](feature-006-fiabilite-pharmacies/sf-006-01-soumission-signalement/requirements.md) | Soumission d'un signalement | FR-601, FR-602, FR-603, FR-608, FR-620, FR-621 | Partiellement implémenté | SF-008-09, SF-007-03 | Aucun | P0 |
| [SF-006-02](feature-006-fiabilite-pharmacies/sf-006-02-calcul-score/requirements.md) | Calcul et affichage du score | FR-604 | Non implémenté | SF-006-01 | Aucun | P0 |
| [SF-006-03](feature-006-fiabilite-pharmacies/sf-006-03-departage/requirements.md) | Départage des pharmacies proches | FR-605 | Non implémenté | SF-006-01 | Aucun | P0 |
| [SF-006-04](feature-006-fiabilite-pharmacies/sf-006-04-rafale-gel/requirements.md) | Détection de rafale et gel | FR-606 | Non implémenté | SF-006-01 | Aucun | P0 |
| [SF-006-05](feature-006-fiabilite-pharmacies/sf-006-05-decision-rafale/requirements.md) | Décision du modérateur sur une rafale | FR-610 | Non implémenté | SF-006-01 | Aucun | P0 |
| [SF-006-06](feature-006-fiabilite-pharmacies/sf-006-06-contestation/requirements.md) | Contestation par la pharmacie | FR-607 | Non implémenté | SF-006-01 | Aucun | P1 |
| [SF-006-07](feature-006-fiabilite-pharmacies/sf-006-07-consultation-pharmacie/requirements.md) | Consultation de son score par la pharmacie | FR-622 | Non implémenté | SF-006-01 | Aucun | P1 |
| [SF-006-08](feature-006-fiabilite-pharmacies/sf-006-08-signalement-sensible/requirements.md) | Signalement sur une classe sensible | FR-609 | Partiellement implémenté | SF-006-01 | Aucun | P1 |
| [SF-007-01](feature-007-gouvernance/sf-007-01-politique/requirements.md) | Chargement et versionnement de la politique | FR-720, FR-721, FR-722, FR-723 | Implémenté | MT-001 | Aucun | P0 |
| [SF-007-02](feature-007-gouvernance/sf-007-02-orchestrateur/requirements.md) | Orchestration et contrôle préalable obligatoire | FR-701, FR-725, FR-726 | Implémenté | SF-007-01, SF-007-03, SF-007-09 | Aucun | P0 |
| [SF-007-03](feature-007-gouvernance/sf-007-03-evaluation-conformite/requirements.md) | Évaluation de conformité (quatre verdicts cités) | FR-702, FR-703, FR-730, FR-731, FR-732 | Implémenté | SF-007-01, SF-011-03 | Aucun | P0 |
| [SF-007-04](feature-007-gouvernance/sf-007-04-anti-profilage/requirements.md) | Contrôle anti-profilage | FR-704, FR-735 | Implémenté | SF-007-03 | Aucun | P0 |
| [SF-007-05](feature-007-gouvernance/sf-007-05-transferts/requirements.md) | Contrôle des transferts hors du pays | FR-705, FR-738 | Implémenté | SF-007-03 | Aucun | P0 |
| [SF-007-06](feature-007-gouvernance/sf-007-06-categories-interdites/requirements.md) | Blocage des catégories de l'art. 48 | FR-712, FR-741 | Implémenté | SF-007-03 | Aucun | P0 |
| [SF-007-07](feature-007-gouvernance/sf-007-07-modes/requirements.md) | Modes de fonctionnement | FR-714, FR-744 | Implémenté | SF-007-03 | Aucun | P0 |
| [SF-007-08](feature-007-gouvernance/sf-007-08-interconnexions/requirements.md) | Contrôle des interconnexions externes | FR-715, FR-747 | Implémenté | SF-007-03 | Aucun | P0 |
| [SF-007-09](feature-007-gouvernance/sf-007-09-journal-ecriture/requirements.md) | Écriture du journal d'audit chaîné | FR-706, FR-709, FR-760, FR-761 | Implémenté | MT-001 | Aucun | P0 |
| [SF-007-10](feature-007-gouvernance/sf-007-10-champs-interdits/requirements.md) | Contrôle des champs interdits du journal | FR-713, FR-765 | Implémenté | SF-007-09 | Aucun | P0 |
| [SF-007-11](feature-007-gouvernance/sf-007-11-journal-consultation/requirements.md) | Consultation du journal et vérification de la chaîne (serveur) | FR-768, FR-769 | Partiellement implémenté | SF-007-09, SF-009-01 | Aucun | P0 |
| [SF-007-12](feature-007-gouvernance/sf-007-12-rejeu/requirements.md) | Rejeu d'une session | FR-773, FR-774 | Non implémenté | SF-007-09 | D-016 | P1 |
| [SF-007-13](feature-007-gouvernance/sf-007-13-simulation/requirements.md) | Simulation « et si » de la politique (serveur) | FR-707, FR-777 | Implémenté | SF-007-01, SF-012-03 | Aucun | P0 |
| [SF-007-14](feature-007-gouvernance/sf-007-14-comparaison-ab/requirements.md) | Comparaison avec et sans gouvernance (serveur) | FR-710, FR-780 | Implémenté | SF-007-02, SF-012-03 | Aucun | P0 |
| [SF-007-15](feature-007-gouvernance/sf-007-15-agents-simules/requirements.md) | Agents institutionnels simulés (District/SIMR, APDP) | FR-711, FR-783 | Partiellement implémenté | SF-007-02 | Aucun | P0 |
| [SF-007-16](feature-007-gouvernance/sf-007-16-aipd/requirements.md) | Analyse d'impact versionnée | FR-708, FR-787 | Non implémenté | Aucune | Aucun | P1 |
| [SF-007-17](feature-007-gouvernance/sf-007-17-gouvernance-navigateur/requirements.md) | Gouvernance dans Nolo : orchestrateur, Conformité et politique dans le navigateur | FR-1901, FR-1902, FR-1903, FR-1904, FR-1905, NFR-1901 | Non implémenté | SF-007-01, SF-007-03, SF-011-08 | Aucun | P0 |
| [SF-007-18](feature-007-gouvernance/sf-007-18-comment-nolo-a-decide/requirements.md) | Panneau « Comment Nolo a décidé » | FR-1911, FR-1912, FR-1913, FR-1914, FR-1915 | Non implémenté | SF-007-17, SF-007-21, SF-011-08 | Aucun | P0 |
| [SF-007-19](feature-007-gouvernance/sf-007-19-cellule-coordination/requirements.md) | Cellule de coordination multi-agents (console du ministère) | FR-1921, FR-1922, FR-1923, FR-1924, FR-1925 | Non implémenté | SF-007-15, SF-007-17, SF-002-04 | Aucun | P0 |
| [SF-007-20](feature-007-gouvernance/sf-007-20-sans-gouvernance-navigateur/requirements.md) | « Rejouer sans gouvernance » dans Nolo | FR-1931, FR-1932, FR-1933 | Non implémenté | SF-007-17, SF-007-19 | Aucun | P1 |
| [SF-007-21](feature-007-gouvernance/sf-007-21-journal-navigateur/requirements.md) | Journal d'audit chaîné dans Nolo et sa vérification | FR-1941, FR-1942, FR-1943, FR-1944 | Non implémenté | SF-007-17 | Aucun | P0 |
| [SF-008-01](feature-008-consentements-droits/sf-008-01-premiere-utilisation/requirements.md) | Écran de première utilisation et consentement à l'orientation | FR-106, FR-801, FR-802, FR-803, FR-804, FR-805, FR-806 | Implémenté | SF-013-02, SF-008-08 | Aucun | P0 |
| [SF-008-02](feature-008-consentements-droits/sf-008-02-consentement-surveillance/requirements.md) | Consentement à la surveillance | FR-811, FR-812 | Implémenté | SF-008-01 | Aucun | P0 |
| [SF-008-03](feature-008-consentements-droits/sf-008-03-geolocalisation/requirements.md) | Position du citoyen : géolocalisation consentie ou quartier saisi | FR-821, FR-822, FR-823 | Non implémenté | SF-008-01 | Aucun | P1 |
| [SF-008-04](feature-008-consentements-droits/sf-008-04-mineurs/requirements.md) | Âge et accord parental | FR-107, FR-831, FR-832 | Implémenté | SF-008-01 | Aucun | P0 |
| [SF-008-05](feature-008-consentements-droits/sf-008-05-mes-donnees/requirements.md) | « Mes données » : modifier, retirer, effacer | FR-841, FR-842, FR-843, FR-844 | Implémenté | SF-008-01 | Aucun | P0 |
| [SF-008-06](feature-008-consentements-droits/sf-008-06-droits-decision-automatisee/requirements.md) | Droits face à la décision automatisée | FR-108, FR-851 | Partiellement implémenté | SF-001-09 | D-014 | P1 |
| [SF-008-07](feature-008-consentements-droits/sf-008-07-transparence/requirements.md) | Transparence : système automatisé et raison de la réponse | FR-109, FR-861, FR-862 | Implémenté | SF-013-01 | Aucun | P0 |
| [SF-008-08](feature-008-consentements-droits/sf-008-08-page-conditions/requirements.md) | Page « Conditions d'utilisation et politique de données » | FR-871, FR-872, FR-873 | Implémenté | SF-008-01, SF-013-04 | Aucun | P0 |
| [SF-008-09](feature-008-consentements-droits/sf-008-09-consentement-signalements/requirements.md) | Consentement aux signalements | FR-881 | Implémenté | SF-008-01, SF-006-01 | Aucun | P0 |
| [SF-009-01](feature-009-acces-roles-comptes/sf-009-01-roles-permissions/requirements.md) | Matrice des rôles et permissions | FR-901, FR-902 | Implémenté | Aucune | Aucun | P0 |
| [SF-009-02](feature-009-acces-roles-comptes/sf-009-02-authentification-pro/requirements.md) | Authentification des établissements (un compte par établissement) | FR-905, FR-906, FR-907, FR-908, FR-909 | Implémenté | SF-009-01, SF-010-04 | Aucun | P0 |
| [SF-009-03](feature-009-acces-roles-comptes/sf-009-03-compte-pseudonyme/requirements.md) | Compte pseudonyme du citoyen | FR-912, FR-913 | Non implémenté | SF-009-01, SF-007-07 | D-011 ; autorisation APDP (L12) | P2 |
| [SF-009-04](feature-009-acces-roles-comptes/sf-009-04-usage-anonyme/requirements.md) | Usage anonyme sans compte | FR-916 | Implémenté | SF-009-01 | Aucun | P0 |
| [SF-009-05](feature-009-acces-roles-comptes/sf-009-05-session-ministere/requirements.md) | Session de démonstration du ministère | FR-919, FR-920, FR-921 | Implémenté | SF-009-01, SF-015-01 | Aucun | P0 |
| [SF-010-01](feature-010-referentiel-declarations/sf-010-01-referentiel-etablissements/requirements.md) | Référentiel des établissements (tuile de démonstration) | FR-1001, FR-1002, FR-1003, FR-1004 | Implémenté | SF-012-04 | Aucun | P0 |
| [SF-010-02](feature-010-referentiel-declarations/sf-010-02-declaration-medicaments/requirements.md) | Déclaration du stock de médicaments (import d'un fichier) | FR-401, FR-1006, FR-1007, FR-1008, FR-1009, FR-1010 | Implémenté | SF-010-07, SF-004-01 | Aucun | P0 |
| [SF-010-03](feature-010-referentiel-declarations/sf-010-03-declaration-sang/requirements.md) | Déclaration des niveaux de sang | FR-501, FR-1013, FR-1014 | Partiellement implémenté | SF-010-07 | Aucun | P1 |
| [SF-010-04](feature-010-referentiel-declarations/sf-010-04-inscription/requirements.md) | Inscription d'un établissement en quatre étapes | FR-1016, FR-1017, FR-1018, FR-1019, FR-1020, FR-1021, FR-1022 | Implémenté | SF-009-02 | Aucun | P0 |
| [SF-010-05](feature-010-referentiel-declarations/sf-010-05-code-confirmation/requirements.md) | Code de confirmation de l'e-mail | FR-1023, FR-1024, FR-1025 | Implémenté | SF-010-04 | Aucun | P0 |
| [SF-010-06](feature-010-referentiel-declarations/sf-010-06-fiche-conditionnelle/requirements.md) | Fiche conditionnelle selon le type | FR-1026, FR-1027, FR-1028, FR-1033, FR-1037, FR-1039 | Implémenté | SF-010-05 | Aucun | P0 |
| [SF-010-07](feature-010-referentiel-declarations/sf-010-07-verification-agrement/requirements.md) | Vérification de l'agrément avant toute visibilité | FR-1029, FR-1030, FR-1031, FR-1032 | Implémenté | SF-010-06, SF-015-02 | Aucun | P0 |
| [SF-010-08](feature-010-referentiel-declarations/sf-010-08-photos/requirements.md) | Photos de l'établissement | FR-1034, FR-1035, FR-1036 | Implémenté | SF-010-06 | Aucun | P0 |
| [SF-010-09](feature-010-referentiel-declarations/sf-010-09-tableau-de-bord/requirements.md) | Tableau de bord de l'établissement et chemin de vérification | FR-1038, FR-1040, FR-1041, FR-1042 | Implémenté | SF-010-05, SF-010-07 | Aucun | P0 |
| [SF-010-10](feature-010-referentiel-declarations/sf-010-10-services-urgences/requirements.md) | Tableau « Services et urgences » de l'hôpital | FR-1044, FR-1045, FR-1046 | Implémenté | SF-010-06, SF-010-11 | Aucun | P0 |
| [SF-010-11](feature-010-referentiel-declarations/sf-010-11-specialites-modalites/requirements.md) | Saisie des spécialités et de leurs modalités (hôpital) | FR-1049, FR-1050 | Implémenté | SF-010-06 | Aucun | P0 |
| [SF-010-12](feature-010-referentiel-declarations/sf-010-12-comptes-demo/requirements.md) | Comptes de démonstration (officine et hôpital) | FR-1053, FR-1054 | Implémenté | SF-010-04 | Aucun | P0 |
| [SF-010-13](feature-010-referentiel-declarations/sf-010-13-politique-professionnels/requirements.md) | Politique de données des professionnels | FR-1057 | Partiellement implémenté | SF-010-04 | Aucun | P1 |
| [SF-011-01](feature-011-base-connaissances/sf-011-01-ingestion/requirements.md) | Ingestion et découpage des sources | FR-1101, FR-1102, FR-1103, FR-1104 | Implémenté | Aucune | Aucun | P0 |
| [SF-011-02](feature-011-base-connaissances/sf-011-02-corrections/requirements.md) | Corrections sur le texte officiel | FR-1106, FR-1107 | Implémenté | SF-011-01 | Aucun | P0 |
| [SF-011-03](feature-011-base-connaissances/sf-011-03-recherche/requirements.md) | Recherche documentaire (BM25 ; ChromaDB en option) | FR-1109, FR-1110, FR-1111 | Partiellement implémenté | SF-011-01 | Aucun | P0 |
| [SF-011-04](feature-011-base-connaissances/sf-011-04-evaluation/requirements.md) | Évaluation de la recherche | FR-1113, FR-1114 | Implémenté | SF-011-03 | Aucun | P0 |
| [SF-011-05](feature-011-base-connaissances/sf-011-05-correspondance/requirements.md) | Correspondance article → nœud Y.3172 → agent | FR-1116, FR-1117 | Implémenté | SF-011-01 | Aucun | P0 |
| [SF-011-06](feature-011-base-connaissances/sf-011-06-traductions/requirements.md) | Traductions, versions anglaises officielles et glossaire | FR-1119, FR-1120, FR-1121 | Implémenté | SF-011-01 | Aucun | P0 |
| [SF-011-07](feature-011-base-connaissances/sf-011-07-version-publique/requirements.md) | Version publique de la base (droits) | FR-1123, FR-1124, FR-1125 | Implémenté | SF-011-01 | Aucun | P0 |
| [SF-011-08](feature-011-base-connaissances/sf-011-08-base-embarquee/requirements.md) | Base embarquée dans Nolo pour les agents | FR-1127, FR-1128, FR-1129, NFR-1101 | Non implémenté | SF-011-07 | Aucun | P0 |
| [SF-012-01](feature-012-donnees-scenarios/sf-012-01-donnees-patients-surveillance/requirements.md) | Patients et séries de surveillance synthétiques (référence Python) | FR-1201, FR-1202 | Implémenté | Aucune | Aucun | P0 |
| [SF-012-02](feature-012-donnees-scenarios/sf-012-02-donnees-services/requirements.md) | Établissements, stocks et signalements simulés (référence Python) | FR-1204, FR-1205 | Implémenté | Aucune | Aucun | P0 |
| [SF-012-03](feature-012-donnees-scenarios/sf-012-03-scenarios/requirements.md) | Scénarios S1 à S3 et exécuteur | FR-1207, FR-1208, FR-1209 | Implémenté | SF-012-01, SF-012-02, F-007 | Aucun | P0 |
| [SF-012-04](feature-012-donnees-scenarios/sf-012-04-donnees-nolo/requirements.md) | Données fictives de Nolo | FR-1211, FR-1212, FR-1213 | Implémenté | Aucune | Aucun | P0 |
| [SF-012-05](feature-012-donnees-scenarios/sf-012-05-scenario-s4/requirements.md) | Scénario S4 : module POC gouverné et non gouverné | FR-1216, FR-1217 | Non implémenté | SF-001-15, SF-007-17, SF-007-20 | Aucun | P1 |
| [SF-013-01](feature-013-application/sf-013-01-accueil-navigation/requirements.md) | Accueil, navigation et bandeau d'urgence | FR-306, FR-1301, FR-1302, FR-1303 | Implémenté | SF-013-02 | Aucun | P0 |
| [SF-013-02](feature-013-application/sf-013-02-routeur-gardes/requirements.md) | Routes, gardes et interface des écrans | FR-1305, FR-1306, FR-1307, FR-1308 | Implémenté | Aucune | Aucun | P0 |
| [SF-013-03](feature-013-application/sf-013-03-rendu-evenements/requirements.md) | Rendu, mise à jour du DOM et délégation des événements | FR-1310, FR-1311, FR-1312, FR-1313 | Implémenté | Aucune | Aucun | P0 |
| [SF-013-04](feature-013-application/sf-013-04-langues/requirements.md) | Deux langues d'égale valeur et typographie française | FR-1315, FR-1316, FR-1317, FR-1318 | Implémenté | Aucune | Aucun | P0 |
| [SF-013-05](feature-013-application/sf-013-05-design-system/requirements.md) | Design system « Premium Medical Intelligence » | FR-1320, FR-1321, FR-1322, FR-1323, FR-1324 | Implémenté | Aucune | Aucun | P0 |
| [SF-013-06](feature-013-application/sf-013-06-accessibilite/requirements.md) | Accessibilité | FR-1326, FR-1327, FR-1328, FR-1329, FR-1330 | Implémenté | SF-013-03 | Aucun | P0 |
| [SF-013-07](feature-013-application/sf-013-07-mouvement/requirements.md) | Mouvement et micro-interactions | FR-1332, FR-1333, FR-1334 | Implémenté | SF-013-02 | Aucun | P0 |
| [SF-013-08](feature-013-application/sf-013-08-hors-ligne/requirements.md) | Fonctionnement hors ligne (PWA) | FR-1336, FR-1337, FR-1338 | Implémenté | SF-013-02 | Aucun | P0 |
| [SF-013-09](feature-013-application/sf-013-09-page-hebergee/requirements.md) | Page hébergée dans un cadre (artefact) | FR-1340, FR-1341, FR-1342 | Implémenté | SF-013-02 | Aucun | P0 |
| [SF-013-10](feature-013-application/sf-013-10-inspection-visuelle/requirements.md) | Inspection visuelle automatisée | FR-1344, FR-1345, FR-1346, FR-1347 | Implémenté | SF-013-06 | Aucun | P0 |
| [SF-013-11](feature-013-application/sf-013-11-etat-stockage/requirements.md) | État de l'application et stockage local | FR-1348, FR-1349, FR-1350 | Implémenté | Aucune | Aucun | P0 |
| [SF-014-01](feature-014-tendances-demande/sf-014-01-compteurs-anonymes/requirements.md) | Compteurs anonymes de la demande | FR-2001, FR-2002 | Implémenté | SF-014-02 | Aucun | P0 |
| [SF-014-02](feature-014-tendances-demande/sf-014-02-zones/requirements.md) | Zones : arrondissements, départements, régions | FR-2005, FR-2006 | Implémenté | SF-012-04 | Aucun | P0 |
| [SF-014-03](feature-014-tendances-demande/sf-014-03-seuil-arrondi/requirements.md) | Seuil de 5, arrondi à 5, semaines complètes | FR-2009, FR-2010 | Implémenté | SF-014-01 | Aucun | P0 |
| [SF-014-04](feature-014-tendances-demande/sf-014-04-filtres-classement/requirements.md) | Filtres, classements et demande non satisfaite | FR-2013, FR-2014 | Implémenté | SF-014-03 | Aucun | P0 |
| [SF-014-05](feature-014-tendances-demande/sf-014-05-acces-sans-alerte/requirements.md) | Accès réservé, sans alerte ni export brut | FR-2017, FR-2018 | Implémenté | SF-010-07 | Aucun | P0 |
| [SF-014-06](feature-014-tendances-demande/sf-014-06-mes-indicateurs/requirements.md) | « Mes indicateurs » | FR-2021 | Implémenté | SF-010-09 | Aucun | P0 |
| [SF-015-01](feature-015-console-ministere/sf-015-01-navigation-console/requirements.md) | Navigation de la console et chiffres d'en-tête | FR-2101, FR-2102 | Implémenté | SF-009-05 | Aucun | P0 |
| [SF-015-02](feature-015-console-ministere/sf-015-02-agrements/requirements.md) | Vérification des agréments | FR-2106, FR-2107, FR-2108 | Implémenté | SF-010-07 | Aucun | P0 |
| [SF-015-03](feature-015-console-ministere/sf-015-03-offre-demande/requirements.md) | Offre et demande nationale | FR-2113, FR-2114, FR-2115 | Implémenté | SF-014-03, SF-002-12 | Aucun | P0 |
| [SF-015-04](feature-015-console-ministere/sf-015-04-politique-versionnee/requirements.md) | Politique versionnée et empreinte | FR-2119, FR-2120 | Partiellement implémenté | SF-007-01, SF-007-17 | Aucun | P0 |
| [SF-015-05](feature-015-console-ministere/sf-015-05-simulation-et-si/requirements.md) | Simulation « et si » de la politique de surveillance | FR-2124, FR-2125, FR-2126 | Implémenté | SF-015-04, SF-002-03 | Aucun | P0 |
| [SF-015-06](feature-015-console-ministere/sf-015-06-lacunes/requirements.md) | Registre des lacunes dans la console | FR-2130, FR-2131 | Implémenté | SF-015-04 | Aucun | P0 |
| [SF-016-01](feature-016-conseiller-droits/sf-016-01-index-navigateur/requirements.md) | Recherche dans la base depuis le navigateur (BM25 et glossaire) | FR-2201, FR-2202, FR-2203, FR-2204, NFR-2201 | Non implémenté | SF-011-08 | Aucun | P1 |
| [SF-016-02](feature-016-conseiller-droits/sf-016-02-reponse-extractive/requirements.md) | Réponse extractive citée et refus sans fondement | FR-2206, FR-2207, FR-2208, FR-2209 | Non implémenté | SF-016-01 | Aucun | P1 |
| [SF-016-03](feature-016-conseiller-droits/sf-016-03-interface-conseiller/requirements.md) | Interface du conseiller (citoyen, établissement, ministère) | FR-2211, FR-2212, FR-2213 | Non implémenté | SF-016-02, SF-013-04 | Aucun | P1 |
| [SF-016-04](feature-016-conseiller-droits/sf-016-04-evaluation-conseiller/requirements.md) | Évaluation du conseiller | FR-2215, FR-2216 | Non implémenté | SF-016-01 | Aucun | P1 |
| [SF-016-05](feature-016-conseiller-droits/sf-016-05-llm-local/requirements.md) | LLM local optionnel : reformuler les extraits, jamais décider | FR-2218, FR-2219 | Non implémenté | SF-016-02 | Ollama sur le poste de l'équipe (indisponible dans l'environnement de Claude) | P2 |
| [SF-017-01](feature-017-livrables/sf-017-01-rapport/requirements.md) | Rapport technique (5 pages, anglais) | FR-2301, FR-2302, FR-2303, FR-2304 | Partiellement implémenté | F-001 à F-016 | Aucun | P0 |
| [SF-017-02](feature-017-livrables/sf-017-02-depot/requirements.md) | Dépôt GitHub public | FR-2306, FR-2307, FR-2308, FR-2309 | Partiellement implémenté | MT-002 | Aucun | P0 |
| [SF-017-03](feature-017-livrables/sf-017-03-video/requirements.md) | Vidéo de démonstration (≤ 7 min) | FR-2312, FR-2313, FR-2314, FR-2315 | Non implémenté | F-001, F-007, F-010, F-015 | Aucun | P1 |
| [SF-017-04](feature-017-livrables/sf-017-04-base-publiee/requirements.md) | Base de connaissances livrée | FR-2317, FR-2318 | Implémenté | SF-011-07 | Aucun | P0 |
| [SF-017-05](feature-017-livrables/sf-017-05-preuves-matrice/requirements.md) | Preuves d'exécution et matrice de traçabilité | FR-2320, FR-2321, FR-2322 | Implémenté | Toutes | Aucun | P0 |
| [MT-001](maintenance/mt-001-migration-arborescence/requirements.md) | Migration de l'arborescence vers src/ | FR-1401 à FR-1406, NFR-1401, NFR-1402 | Rédigé ; non exécuté (le code lit encore kb/, data/, rules/) | — | — | P1 |
| [MT-002](maintenance/mt-002-assemblage-depot/requirements.md) | Assemblage du monorepo Nolo | FR-2401, FR-2402, FR-2403 | Implémenté | MT-001 | Aucun | P0 |

## 6. Ordre de travail proposé (à approuver)

| Vague | Contenu | Pourquoi |
|---|---|---|
| A — Soumission (9-10 nov.) | MT-002 ; SF-017-05 ; SF-017-02 ; SF-011-04 (preuve v9) ; SF-017-01 (rapport) | Livrer un dépôt vérifiable et un rapport exact |
| B — Agents dans Nolo (AG-01 à AG-08) | SF-011-08 → SF-007-17 → SF-007-21 → SF-007-18 → SF-007-19 → SF-007-20 ; SF-016-01 à SF-016-04 | Rendre l'agentique visible et auditable dans l'application (critères du jury) |
| C — Écarts de l'existant | Tâches « À faire » et « Partiel » des dossiers implémentés (liste : `INDEX-TACHES.md`, écarts : `ECARTS.md`) | Aligner le code sur sa spécification |
| D — Suite | SF-001-19 (DDXPlus), SF-012-05 (S4), SF-006-*, SF-002-08, SF-002-10, SF-002-11, SF-009-03, SF-016-05, SF-017-03 (vidéo) | Après la soumission ou pour la finale |

## 7. Index générés

- `INDEX-TACHES.md` : toutes les tâches « À faire » et « Partiel », par vague et par dossier (`python3 tools/sdd_index.py`).
- `ECARTS.md` : tous les écarts spécification ↔ code (§9 des `design.md`).
- `../traceability/matrix.md` : exigence → conception → tâches → tests → implémentation → vérification (`python3 tools/trace.py`).

