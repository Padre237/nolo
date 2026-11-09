# Vision du produit

Version 1.0.0 · 2026-11-03 · Statut : UNDER_REVIEW

> **Mise à jour du 2026-11-09.** L'application s'appelle **Nolo** (D-034). Ce qui est montré au citoyen a changé (D-026) : hors du module POC, seule l'alerte d'urgence est affichée, avec la structure à consulter, la fiche de consultation et la raison de chaque choix. Le périmètre s'est étendu à l'espace des établissements (D-029, D-032), aux hôpitaux et centres spécialisés et à la console du ministère (D-035), et aux agents dans le navigateur (D-036). Le découpage à jour est le catalogue v2 (`docs/specifications/README.md`) ; ce document reste la vision d'origine.

## 1. Problème
Au Cameroun, une personne qui se sent malade ne sait pas toujours si elle doit aller aux urgences, consulter dans la journée ou attendre ; elle ne sait pas non plus quel établissement proche est ouvert, offre la spécialité cherchée, ou a le médicament ou le groupe sanguin nécessaire. En parallèle, les signaux précoces d'épidémie remontent par des canaux humains (agents de santé communautaires, ligne verte 1510) que le numérique pourrait compléter. Le droit applicable (loi 2024/017, loi 90/035, guide SBC 2023) est récent et comporte des lacunes que tout service numérique de santé doit gérer.

## 2. Proposition
Une application (pas de SMS ni d'USSD) et un ensemble d'agents gouvernés par le droit camerounais qui :
1. **orientent** à partir des symptômes vers un niveau d'urgence et un type de structure, sans diagnostic ni prescription ;
2. **trouvent** une spécialité (recherche explicite, rayon de 5 km élargi), un médicament (stocks déclarés par les pharmacies agréées) ou un groupe sanguin (niveaux déclarés par les banques de sang) ;
3. **mesurent** la fiabilité des déclarations de stock à partir des signalements des usagers, sans aucun paiement des pharmacies ;
4. **détectent** des signaux syndromiques agrégés, validés par un point focal humain, en complément de la SIMR et de DHIS2 ;
5. **gouvernent** chaque action par un agent Conformité qui cite l'article applicable, lit l'état du droit dans `config/policy.yaml` et journalise tout de façon vérifiable ;
6. **simulent** pour le régulateur l'effet d'un futur texte (« et si ») et comparent le système avec et sans gouvernance.

## 3. Utilisateurs et rôles
| Rôle | Besoin principal |
|---|---|
| Citoyen (anonyme ou avec compte pseudonyme) | Savoir où aller, trouver une ressource, signaler un stock |
| Parent ou représentant légal | Orienter un enfant ; consentir pour un mineur |
| Établissement déclarant (officine agréée, pharmacie hospitalière, banque de sang, centre de transfusion) | Déclarer ses stocks ; voir et contester son score |
| Point focal du district | Valider ou rejeter les signaux ; décider sur l'instrument RSI |
| Modérateur | Trancher les rafales de signalements et les contestations |
| Agent de santé (simulé dans le prototype) | Recevoir les demandes d'intervention humaine |
| Régulateur (APDP, MINSANTE) | Lire la politique, simuler un texte, lire le registre des lacunes |
| Auditeur | Lire le journal, vérifier la chaîne, rejouer une session |

## 4. Périmètre du prototype (hackathon)
- Données **synthétiques** uniquement (établissements, stocks, signalements, patients, séries de surveillance) ; textes juridiques et guides **officiels** dans la base de connaissances.
- Mode de démonstration `demo_synthetique` ; les deux autres modes sont implémentés et démontrables par simulation.
- Démonstration ciblée : 4 scénarios (urgence de nuit puis médicament ; regroupement J1–J4 ; transfert vers un LLM étranger puis simulation d'un décret ; campagne de faux signalements), parmi les 10 scénarios spécifiés.

## 5. Hors périmètre
SMS, USSD, appels vocaux ; diagnostic, prescription, posologie, alternative thérapeutique ; paiement de quelque nature ; publicité ; téléconsultation réelle ; échange transfrontalier de données (D-005) ; intégration réelle avec DHIS2 ou la SIMR (maquette d'export seulement) ; données personnelles réelles.

## 6. Critères du hackathon visés
| Critère | Réponse du produit |
|---|---|
| Base de connaissances traçable | Fragments identifiés par article, corrections sur texte officiel, évaluation de la recherche |
| Capacité des agents dans les scénarios | Orchestrateur, Triage, Ressources, Disponibilités, Fiabilité, Surveillance, Conformité, agents institutionnels simulés |
| Analyse des lacunes | Registre L1–L12 et points V1–V7, chacun relié à une exigence et à un paramètre de `policy.yaml` |
| Auditabilité | Journal chaîné, rejeu, consultation par l'auditeur |
| Alignement Y.3172 et AI Readiness 2.0 | Nœuds SRC/C/PP/M/P/D/SINK instanciés ; dimensions retenues dans `docs/architecture/system-architecture.md` |
| Bonus : gouverné / non gouverné | Comparaison A/B (SF-007-14) |

## 7. Indicateurs de succès du prototype
Repris des critères de succès v1.3 (SC-101 à SC-704) et rattachés aux sous-fonctionnalités dans le catalogue.
