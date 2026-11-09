# Plan de mise aux normes du hackathon – Système agentique d'orientation sanitaire et de surveillance syndromique (Cameroun)

*Version du 2 novembre 2026, mise à jour le 3 novembre : application seule (pas de SMS/USSD) ; ajout de la recherche de services, de médicaments et de sang, et de la fiabilité des pharmacies. Soumission : 10 novembre 2026.*
*Légende : **[Fait]** = tiré des documents du projet ou de la loi · **[Reco]** = recommandation · **[Hyp]** = hypothèse à vérifier.*

## 0. Les règles du jeu à exploiter
- [Fait] Les critères sont connus d'avance (« examen à livre ouvert ») : qualité de la base de connaissances, capacité des agents dans les scénarios, analyse des lacunes, auditabilité, correspondance avec Y.3172 et AI Readiness.
- [Fait] Selon les mentors (session 3), **l'analyse des lacunes est la partie la plus valorisée**. Les tableaux de correspondance sont plus faciles, mais leur niveau de détail compte.
- [Fait] Un **prototype fonctionnel est obligatoire** : un simple pitch deck n'est pas présélectionné. La précision du modèle et le modèle économique ne sont **pas** évalués.
- [Fait] Bonus (session 2) : montrer la **différence entre un agent gouverné par les politiques et un agent non gouverné**. Bonus aussi pour la journalisation, la traçabilité du raisonnement et les scénarios d'erreur.
- [Fait] La base de connaissances doit être un **vrai RAG ou graphe** interrogeable, pas une bibliographie. Environ 30 documents suffisent. Les documents doivent être réels, ouverts et officiels : pas d'articles de presse, rien de confidentiel.
- [Fait] On est évalué sur **ce qu'on déclare avoir implémenté** : les scénarios démontrés doivent être documentés précisément.

## 1. Positionnement
[Reco] Le projet se présente comme un *système multi-agents d'orientation sanitaire et de surveillance syndromique, gouverné par les politiques camerounaises, supervisé par l'humain et complémentaire de la SIMR*. Il **oriente** vers un niveau de soins et ne pose **jamais de diagnostic**. Il est accessible par une application.

**Cas d'usage :**
1. **Orientation** à partir des symptômes : niveau d'urgence et structure adaptée.
2. **Recherche explicite d'un service** (cardiologie, neurologie, pédiatrie…) : établissements dans un rayon de 5 km, élargi automatiquement à 10, 20 puis 50 km s'il y a moins de 3 résultats. Aucune redirection vers une spécialité à partir des symptômes.
3. **Recherche d'un médicament** (DCI) dans les officines et pharmacies hospitalières agréées, selon les stocks qu'elles déclarent elles-mêmes. Mention « délivré sur ordonnance » ; aucune alternative ni posologie.
4. **Recherche d'un groupe sanguin** dans les banques de sang, selon les niveaux déclarés par les établissements (disponible, faible, rupture) ; appel au don en cas de tension.
5. **Fiabilité des pharmacies** : aucune pharmacie ne paie pour être référencée ou classée. Les utilisateurs signalent si le médicament déclaré était présent ; un score lissé départage les pharmacies proches.
6. **Surveillance** syndromique validée par un humain.

## 2. Agents
| Agent | Rôle | Type exigé par le hackathon |
|---|---|---|
| Orchestrateur | Reçoit l'intention, répartit les tâches, arbitre les conflits | Coordination multi-agents |
| Triage | Code les symptômes en SNOMED CT (GPS, CC BY 4.0) et applique des règles OMS pour fixer le niveau d'urgence | Solution innovante |
| Ressources | Trouve la structure ou la pharmacie adaptée (OSM / healthsites.io, pharmacies de garde) | Solution innovante |
| Conformité (RAG) | Approuve ou bloque chaque action et cite l'article applicable | Conseiller politique et juridique |
| Surveillance | Agrège les données, détecte les anomalies, émet un signal « à vérifier » | Solution innovante |
| District / SIMR (simulé) | Joue l'équipe de surveillance du MINSANTE | Participant institutionnel |
| APDP (simulé) | Joue l'Autorité de protection des données | Participant institutionnel |
| Humain | Agent de santé ou point focal de surveillance qui valide | Garde-fou humain |
| Disponibilités | Reçoit les déclarations de stock (médicaments, sang), vérifie leur fraîcheur et l'agrément de l'établissement | Solution innovante |
| Fiabilité | Calcule le score des déclarations, détecte les rafales de faux signalements, gèle les baisses | Solution innovante + coordination |
| Modérateur (humain) | Tranche les contestations des pharmacies et les rafales détectées | Garde-fou humain |
| Journal d'audit | Trace chaque décision en JSON | Auditabilité |

## 3. Deux pipelines Y.3172 (à détailler nœud par nœud dans le rapport)
**A. Orientation**
- SRC : symptômes saisis dans l'application, âge, position GPS (avec consentement), registres ouverts de structures.
- C : passerelle API de l'application.
- PP : codage SNOMED, minimisation de la géolocalisation (arrondie), pseudonymisation, détection de la langue (français/anglais).
- M : LLM + règles de triage déterministes pour les signes d'alerte + classement des structures.
- P : pas de diagnostic ni de prescription ; escalade obligatoire en cas d'urgence ; consentement (art. 9) ; consentement parental si moins de 18 ans (art. 9.3) ; pas de transfert hors du pays sans autorisation (art. 32).
- D : service de notification de l'application.
- SINK : patient (recommandation + itinéraire) ; agent de santé (cas ambigus).

**B. Surveillance**
- SRC : symptômes codés et pseudonymisés (consentement séparé).
- C / PP : agrégation par aire de santé et par semaine ; seuil minimal de N cas par zone ; décalage dans le temps.
- M : détection d'anomalies sur séries temporelles (CUSUM ou Farrington).
- P : validation humaine avant toute alerte ; détail visible par les autorités seulement ; obligations de la SIMR et du RSI.
- D / SINK : tableau de bord du district sanitaire ; export compatible DHIS2 (cible).

## 4. Base de connaissances
À ajouter pour les nouveaux cas d'usage : Politique nationale de transfusion sanguine (janvier 2025), Plan stratégique national de transfusion sanguine 2025-2030, loi de décembre 2003 régissant la transfusion sanguine (numéro et texte officiel à trouver), texte officiel sur l'ordonnance obligatoire.
Voir `claude/base-connaissances-README.md` (16 documents, 1 887 fragments) et `claude/correspondance-articles-pipeline-agents.md`. Chaque fragment indexé porte : document, autorité émettrice, date, article, URL, langue, type, nature de la source, droits.

## 5. Analyse des lacunes (cœur de la note)
Constats tirés de la loi 2024/017 (OCR du PDF du projet, à recouper avec le texte officiel) :
- **L1 – Contradiction sur le profilage.** [Fait] La définition du profilage inclut explicitement la santé et la localisation. L'art. 44 autorise une décision automatisée, profilage compris, avec un consentement explicite ou une autorisation légale. Mais l'art. 65 punit de 3 à 10 ans de prison le traitement « à des fins de profilage ». Tout système qui croise symptômes et géolocalisation est donc dans une **zone d'insécurité juridique**. Exemple international : RGPD art. 22 et approche par niveaux de risque du règlement européen sur l'IA.
- **L2 – Pas de cadre sectoriel santé.** [Fait] L'art. 72 renvoie la santé à des « textes spécifiques, en tant que de besoin ». [Hyp] Ces textes n'existent pas encore. Exemple international : hébergement des données de santé (France), règles de l'espace européen des données de santé.
- **L3 – Décrets d'application.** [Fait] Les modalités de l'analyse d'impact (art. 33) et de l'autorisation de transfert (art. 32) sont renvoyées à des textes réglementaires. [Hyp] Ces textes ne sont pas publiés, et le décret d'organisation de l'APDP non plus selon des sources secondaires. Cela bloque en pratique le cloud, les API de LLM et le Sandbox hébergé aux Émirats.
- **L4 – Réutilisation pour la surveillance.** [Fait] L'art. 9 prévoit des exceptions au consentement : « préservation de la santé » et « mission d'intérêt public ». [Reco/Hyp] Il manque un cadre de partage de données entre une application citoyenne ou privée et la SIMR. On ne sait pas clairement qui est responsable du traitement.
- **L5 – IA médicale.** [Hyp] Il n'existe pas de cadre pour les logiciels d'aide à l'orientation ou au diagnostic. Exemple international : le règlement européen sur l'IA classe à haut risque les systèmes de tri des patients des services d'urgence (annexe III, point 5).
- **L6 – Signalement numérique.** [Fait] Le guide SBC 2023 prévoit des canaux humains (ASCP, ligne verte 1510) mais pas les signaux issus d'une application ni d'un agent d'IA, et ne contient aucune clause de protection des données. Exemple international : Influenzanet.
- **L8 – Publicité et classement des pharmacies.** [Fait] L'art. 19 de la loi 90/035 encadre la publicité des médicaments et des établissements pharmaceutiques (conditions fixées par la tutelle après avis de l'Ordre). [Hyp] Ces conditions ne sont pas publiées, et aucun texte ne dit si un classement non payant fondé sur des signalements d'usagers en relève.
- **L9 – Registre et données de stock.** [Hyp] Aucun registre ouvert des pharmacies agréées ni aucun format standard de déclaration des stocks (médicaments, sang) n'a été identifié ; la responsabilité en cas de déclaration erronée n'est pas définie.
- **L10 – Notation publique d'établissements de santé.** [Hyp] Aucun texte n'encadre la notation d'établissements de santé par les usagers (droit de réponse, modération, manipulation).
- **L7 – Lacunes des normes.** [Reco] Y.3172 n'a pas de nœud explicite pour la gestion du consentement et de la finalité, ni pour une vérification de conformité par agent. AI Readiness 2.0 ne traite pas la responsabilité *entre agents* : à formuler précisément, pas simplement « ne couvre pas l'IA agentique ».

## 6. Scénarios d'erreur (événements révélés progressivement)
1. **Urgence de nuit** : douleur thoracique, la pharmacie la plus proche est fermée. Escalade vers les urgences ; refus de proposer un médicament ; journalisation.
2. **Regroupement de cas** fièvre + éruption (type Mpox) sur J1 à J4. Le district demande les localisations précises ; l'APDP refuse ; données agrégées ; validation humaine ; notification SIMR et RSI.
3. **Transfert hors du pays** : l'API du LLM est hébergée à l'étranger. L'agent conformité bloque le transfert (art. 32), bascule sur un modèle local ou anonymise.
4. **Utilisateur mineur** : consentement parental requis (art. 9.3), parcours adapté.
5. **Comparaison A/B** : le même scénario sans agent conformité, puis avec. On montre la différence (bonus).
6. **Recherche de neurologue** : moins de 3 résultats à 5, 10 et 20 km ; élargissement signalé jusqu'à 50 km.
7. **Campagne de faux signalements** contre une pharmacie : 14 signalements négatifs en 2 h depuis des comptes récents ; l'agent Fiabilité gèle la baisse et saisit le modérateur. Comparaison A/B sur les données simulées : score affiché de 50 % sans protection, de 78 % avec.
8. **Besoin de sang O- la nuit** : triage en urgence d'abord ; banques proches en rupture ; élargissement ; message « délivrance sur prescription uniquement » ; appel au don.
9. **Recherche d'un antirétroviral** : recherche anonyme, signalement pseudonymisé.
10. **« Non délivré, ordonnance manquante »** : aucune pénalité pour la pharmacie ; refus de proposer une alternative.

## 7. Auditabilité
Chaque décision produit un journal JSON : identifiant de session, agent, entrée, fragments de la base récupérés (document et article), décision, justification, validateur humain, horodatage. La démo montre un écran de consultation des traces.

## 8. AI Readiness 2.0 : dimensions retenues (inutile de couvrir les 13)
Marketplace de données et modèles (métadonnées, OSM, SNOMED GPS) · analyse entre domaines (santé + télécoms : réseaux mobiles et données ; extension à la santé animale, approche « Une seule santé ») · contextualisation (français/anglais, langues locales) · niveau d'intégration · interface humaine · alignement stratégique (MINSANTE, MINPOSTEL, APDP) · collaboration avec l'IA · impact humain · politique d'IA · inclusion (l'application seule limite la portée aux utilisateurs de smartphone : limite à déclarer) · infrastructure numérique et énergie.

## 9. Plan sur 8 jours (équipe de 4 au maximum)
Rôles : (1) base de connaissances et politiques, (2) agents et orchestration, (3) données, géolocalisation et surveillance, (4) rapport, démo et GitHub.
- **3–4 nov.** : collecte et ingestion de la base ; squelette des agents ; données synthétiques ; envoyer un design initial aux mentors pour avis et éventuels crédits Sandbox.
- **5–6 nov.** : agents triage, ressources et conformité + journaux ; scénarios 1 et 3.
- **7 nov.** : agents surveillance et institutionnels ; scénarios 2 et 4 ; comparaison A/B.
- **8 nov.** : rapport de 5 pages (modèle officiel), tableaux de correspondance et des lacunes.
- **9 nov.** : README, licence, vidéo de 5 à 7 minutes, relecture, liste complète des membres.
- **10 nov.** : soumission (marge de sécurité).

## 10. Pièges à éviter
Pitch deck sans prototype · correspondance vague · politiques inventées ou tirées de la presse · documents confidentiels · « diagnostic » · vidéo de plus de 7 minutes · lacune trop générique · membres de l'équipe oubliés dans le rapport.
