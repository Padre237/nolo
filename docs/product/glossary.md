# Glossaire

Version 1.1.0 · 2026-11-09 · ajout des termes de Nolo et de la méthode (D-026 à D-036).

| Terme | Définition dans ce projet |
|---|---|
| Agent | Composant logiciel à responsabilité unique, appelé par l'orchestrateur, qui produit une décision journalisée (ADR-004). |
| Agent Conformité | Agent qui autorise ou bloque une action touchant une donnée personnelle, en citant un fragment de la base et des clés de `policy.yaml`. |
| AIPD | Analyse d'impact relative à la protection des données (FR-708), rédigée volontairement sur le modèle du RGPD art. 35 en l'absence du décret camerounais. |
| Aire de santé | Maille géographique de la surveillance ; dans le prototype, 12 aires fictives (AS-01 à AS-12) d'un district fictif. |
| APDP | Autorité de protection des données à caractère personnel (loi 2024/017). Simulée dans le prototype. |
| Appareil | Le téléphone de l'utilisateur ; « sur l'appareil » = exécuté dans le client sans envoi au serveur. |
| ASC | Agent de santé communautaire. |
| Banque de sang | Établissement de type `banque_de_sang_hospitaliere` (service `banque_de_sang` d'un hôpital) ou `centre_transfusion`. |
| Bandeau d'urgence | Texte fixe « En cas d'urgence, rendez-vous aux urgences les plus proches. » |
| Catégories interdites | Catégories de l'art. 48 al. 1 de la loi 2024/017 (vie sexuelle, génétique et biométrie en matière de santé, origine linguistique ou régionale, origine raciale ou ethnique, opinions). |
| Consentement exprès | Case dédiée, non cochée par défaut, une par finalité (orientation, surveillance, géolocalisation). |
| CUSUM | Somme cumulée ; algorithme de détection de dérive retenu pour la surveillance (ADR-014). |
| DCI | Dénomination commune internationale d'un médicament. |
| Déclaration | Information de stock publiée par un établissement agréé (médicament disponible ou non ; niveau de sang). |
| Départage | Utilisation du score de fiabilité pour ordonner deux pharmacies dont les distances diffèrent de moins de 1 km. |
| Empreinte | SHA-256 d'un contenu canonique ; sert au chaînage du journal et au rejeu sans conserver le contenu. |
| Fragment (`chunk_id`) | Unité de la base de connaissances, identifiée `DOC-ID::NNNN`, rattachée à un article ou une section. |
| Gel | État d'un score de fiabilité dont toute baisse est suspendue après une rafale, jusqu'à décision du modérateur. |
| GPS (SNOMED) | Global Patient Set de SNOMED CT, sous licence CC BY-ND 4.0. Non utilisé dans le prototype (D-018) ; colonne `snomed_gps_id` du référentiel laissée vide. |
| IITT | Outil de triage intégré inter-agences (OMS, CICR, MSF), conçu pour le triage en établissement ; version française ingérée (`INT-OMS-IITT-FR`) et source des règles de triage v2 (D-019). |
| Jeton | Identifiant machine d'un symptôme ou d'un signe (`fievre`, `stridor`…) dans le référentiel interne ; utilisé par les règles. |
| Référentiel de symptômes | `data/referentiels/symptomes.csv` : codes internes `SYM-NNN`, libellés FR/EN, synonymes, sources (D-018). |
| Journal d'audit | Fichier JSON Lines en ajout seul, chaîné par empreinte (ADR-010). |
| Mode | `demo_synthetique`, `sans_donnees_personnelles` ou `complet`, déduit de `policy.yaml` (FR-714). |
| Niveau d'urgence | `urgence`, `consultation_24h`, `consultation_48h`, `soins_courants` (FR-104). Dans Nolo, hors du module POC, seule l'alerte d'urgence est montrée au citoyen (D-026) ; les autres niveaux restent internes au moteur. |
| PCIME | Prise en charge intégrée des maladies de l'enfant (OMS) ; source des signes généraux de danger de l'enfant de 2 mois à 5 ans. |
| Point focal | Personne du district habilitée à valider les signaux de surveillance. |
| Politique (`policy.yaml`) | État du droit codé, versionné ; seule source de vérité juridique du code. |
| Pseudonyme | HMAC-SHA256 d'un identifiant avec un sel secret de déploiement (ADR-011). |
| Rafale | Au moins 8 signalements négatifs en 3 h contre un même établissement. |
| Rayon progressif | Recherche à 5 km puis 10, 20 et 50 km tant que moins de 3 résultats. |
| Rejeu | Réexécution d'une session à partir du journal pour vérifier que la décision est identique. |
| SBC | Surveillance à base communautaire (guide MINSANTE 2023). |
| SC1 à SC8 | Définitions communautaires des signaux du guide SBC 2023. |
| Signal | Anomalie détectée sur une aire et une période, au statut `a_verifier`, `confirme` ou `rejete`. |
| Signalement | Retour d'un usager sur une déclaration de stock : trouvé, introuvable, non délivré (ordonnance manquante), non délivré (autre raison). |
| SIMR | Surveillance intégrée de la maladie et riposte. |
| Tuile | Ensemble des établissements (et de leurs stocks) d'un district, téléchargé en bloc pour une recherche sur l'appareil (ADR-009). |

## Termes de Nolo et de la méthode (2026-11-09)

| Terme | Définition dans ce projet |
|---|---|
| Nolo | Nom de l'application (« santé » en douala, D-034) : PWA sans compilation dans `app/`, en mode `demo_synthetique`. |
| Alerte d'urgence | Seule conclusion médicale que Nolo montre hors du module POC : un signe de danger ou une réponse « oui » à une question de sécurité ouvre l'écran Urgence (SF-001-14). |
| Questions de sécurité | Questions fermées posées après la description (« Vérifier ») pour rechercher un signe de danger (SF-001-14). |
| Module POC | Module expérimental, en mode démonstration seulement, qui affiche au plus trois pistes avec score et origine, jamais comme diagnostic (D-033, SF-001-15). |
| Piste | Hypothèse du module POC, étiquetée « expérimentale », avec son score « x des y signes » et sa source ; jamais un nom de maladie de l'art. 48 (message neutre). |
| Hors champ | Description que Nolo ne sait pas orienter (diarrhée seule, fièvre et frissons…) : renvoi vers un centre de santé avec la raison (SF-001-17). |
| Fiche de consultation | Résumé que la personne montre au soignant : ce qu'elle a décrit, les réponses, la structure proposée ; jamais transmise (SF-001-18). |
| Conseiller « Mes droits santé » | Agent qui répond aux questions de droit par des extraits cités de la base, ou refuse sans fondement (F-016, à construire). |
| Espace établissement | Partie de Nolo réservée aux établissements de démonstration : inscription, fiche, stocks, tendances, indicateurs, compte (F-010, D-029). |
| Inscription (D-029) | Parcours en étapes de création d'un compte d'établissement, avec numéro d'agrément et vérification simulée. |
| Agrément | Autorisation d'exercer d'un établissement ; dans la démo, accordée ou refusée dans la console du ministère, avec motif obligatoire en cas de refus (SF-015-02). |
| Tendances | Vue agrégée de la demande (recherches, demande non satisfaite) pour un établissement et son arrondissement (D-032, F-014). |
| Demande non satisfaite | Recherches d'un produit sans résultat dans une zone ; publiée seulement au-delà du seuil. |
| Seuil de publication | 5 cas par zone (`policy.yaml`, `seuil_minimal_cas_par_zone`) : en dessous, la console ne publie rien et les tendances affichent « moins de 5 » ; au-dessus, arrondi à 5 (D-007, D-032). Dans Nolo, la valeur est encore écrite dans `app/js/domain/surveillance.js` (écart). |
| Console du ministère | Démonstration sous la marque Nolo, sans logo ni nom officiel : carte, signaux, agréments, offre de soins, politique (F-015, D-035). |
| « Et si » | Variante de la politique chargée en mémoire seulement (`config/variantes/`) pour voir l'effet d'un futur texte (FR-707). |
| Agents dans le navigateur | Portage en JavaScript, dans Nolo, de l'orchestrateur, de la Conformité et du journal ; la référence Python sert d'oracle (D-036, SF-007-17). |
| Oracle | Implémentation de référence (Python) dont les décisions attendues sont exportées pour tester la parité du code JavaScript. |
| Parité | Exigence que deux implémentations (JS et Python) rendent les mêmes décisions sur les mêmes cas (tests `*parite*`). |
| Catalogue v2 | Découpage du 2026-11-09 en 17 fonctionnalités et 146 sous-fonctionnalités, avec correspondance v1 → v2 (D-036). |
| Rétro-spécification | Spécification écrite à partir d'un code déjà existant ; statut de tâche « Fait (code existant, rétro-spécifié le 2026-11-09) ». |
| État d'implémentation | Second axe de statut d'un dossier : Implémenté, Partiellement implémenté, Non implémenté (CLAUDE.md §3). |
| Écart | Différence constatée entre une spécification et le code, consignée au §9 du `design.md`, avec une tâche ; liste générée dans `ECARTS.md`. |
| Vague | Ordre de travail : A soumission, B agents dans Nolo, C écarts de l'existant, D suite (`INDEX-TACHES.md`). |
| État capturé | Statut d'un test d'interface dont l'état est atteint et capturé par l'inspection, sans vérification automatique du contenu : il n'est pas déclaré réussi (TASK-013-10-03). |
| Preuve | Fichier daté de `docs/quality/` contenant la commande, la sortie brute et le code de sortie d'une exécution. |
