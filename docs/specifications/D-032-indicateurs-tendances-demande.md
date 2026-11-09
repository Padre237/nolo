# D-032 — Indicateurs et tendances de la demande (tableau de bord des établissements)

Spécification compacte · Version 0.2.0 · 2026-11-07
Statut : **APPROVED** par le propriétaire le 2026-11-07 (réponses à Q1, Q3 et Q4). Implémentée le même jour ; voir §10 pour l'état exact et les écarts.

Légende : [Fait] tiré d'un texte ou d'une mesure · [Choix] décision du propriétaire · [PROPOSITION] à valider.

## 1. Décision

| ID | Date | Question | Décision | Statut | Par |
|---|---|---|---|---|---|
| D-032 | 2026-11-07 | Que voit un établissement de la demande des citoyens ? | Les services les plus recherchés (médicaments, spécialités, groupes sanguins), dans sa zone ou dans n'importe quelle autre, filtrables par région, département, arrondissement et service. La localisation s'appuie sur les polygones administratifs fournis par l'équipe. | Décidé (principe) | Propriétaire |
| D-032a | 2026-11-07 | Comment le faire sans exposer les citoyens ? | Compteurs anonymes par zone, service et semaine, incrémentés au moment de la recherche, sans rien garder de la recherche ; seuil de 5 ; valeurs arrondies à 5 ; semaines complètes seulement ; recherches sensibles jamais comptées ; aucune alerte (§4). | **Décidé** | Propriétaire |
| D-032c | 2026-11-07 | Peut-on compter les recherches d'un citoyen qui n'a coché aucune case ? | Oui, de façon anonyme à la collecte, avec une mention dans la politique de données des citoyens | **Décidé** | Juriste de l'équipe |
| D-032d | 2026-11-07 | Source et licence des polygones | OpenStreetMap, ODbL 1.0 : attribution « © OpenStreetMap contributors » avec lien vers la licence ; base dérivée (polygones + codes INS) publiée sous ODbL | **Décidé** | Propriétaire (source) ; licence vérifiée sur les pages officielles d'OpenStreetMap |
| D-032b | 2026-11-07 | Indicateurs propres à l'établissement | Visibilité, fraîcheur et régularité du stock, taux de rupture, qualité des imports, complétude de la fiche ; fiabilité, signalements et contestations avec la vue Fiabilité (§5). Pas de compteur d'apparitions ni de rang face aux concurrents. | Implémenté (non contesté) | Claude |

## 2. Les données géographiques reçues : rapport de qualité

Fichiers reçus le 2026-11-07 : `cmr_ADM1.geojson`, `cmr_ADM2.geojson`, `cmr_ADM3.geojson`, `departements.csv`, `arrondissements.csv`. Analyse par script, sur la totalité de chaque fichier.

| Fichier | Entités | Propriétés | Système de coordonnées | Sommets |
|---|---|---|---|---|
| ADM1 (régions) | 10 polygones | `name` seulement, en anglais (« Far North ») | CRS84 (longitude, latitude) | 3 357 |
| ADM2 (départements) | 60 polygones (58 départements ; Sanaga-Maritime et Ndian en deux morceaux) | `name` seulement, sans accents | CRS84 | 7 800 |
| ADM3 (arrondissements) | 360 (354 polygones, 6 multipolygones) | `name` seulement | CRS84 | 53 019 |
| `departements.csv` | 58 lignes | code INS (4 chiffres), libellé, région (code à 2 lettres) | — | — |
| `arrondissements.csv` | 360 lignes | code INS (6 chiffres), libellé, département | — | — |

**Constats** [Fait, mesuré] :

1. **Aucun code dans les polygones.** Le lien avec les codes INS se fait par le nom. Les 58 départements se rapprochent tous (3 variantes d'orthographe : Kadei/Kadey, Kupe-Manenguba/Koupé-Manengouba, Nyong-et-So/Nyong-et-So'o) ; les 10 régions, par traduction.
2. **Les couches ADM2 et ADM3 ne s'emboîtent pas.** Sur 360 arrondissements, 124 tombent entièrement dans un département, 159 à plus de 90 %, 56 entre 70 et 89 %, 21 à moins de 70 %. Exemple : d'après ADM2, Yaoundé I, II et VII seraient surtout dans la Lékié. La couche ADM2 est beaucoup plus simplifiée ; elle vient probablement d'une autre source.
3. **Arrondissements : 313 rapprochés par le nom, 11 proposés** (orthographe très proche : Mouloundou → Moloundou, Tabati → Tibati, Ngan'ha → Nganha…), **36 à rapprocher par l'équipe**. Les 36 polygones restants portent souvent le nom d'une localité plutôt que celui de l'arrondissement (Idenau, Benakuma, Fonfuka…) ; je ne les devine pas. Fichier : `donnees/correspondance-arrondissements-a-valider.csv` (colonne `code_ins_valide` à remplir).
4. **Couverture.** Aucun chevauchement entre arrondissements (0 point sur 3 814 d'une grille de 0,1°). 15 points de la grille sont dans le pays (selon ADM1) mais hors de tout arrondissement : des bandes le long des frontières, de 0,1 à environ 12 km du plus proche arrondissement.
5. **Source et licence inconnues** : les fichiers ne contiennent aucune métadonnée. Le hackathon exige du matériel ouvert ; il faut la source et la licence avant de publier le dépôt.
6. **Découpage administratif ≠ districts de santé.** La surveillance (D-007) agrège par aire de santé ; ces tendances, par arrondissement. Les deux coexistent ; le rapport doit le dire.

**Conséquences pour la conception** [PROPOSITION] :
- On localise **uniquement avec ADM3**. Le département et la région se déduisent du **code INS** de l'arrondissement (2 premiers chiffres = région, 4 = département). ADM1 et ADM2 ne servent pas au calcul : cela évite les erreurs du constat 2.
- Une position hors de tout arrondissement est rattachée à l'arrondissement le plus proche s'il est à moins de 15 km ; sinon elle n'est comptée qu'au niveau national.
- Tant qu'un polygone n'a pas de code INS validé, ses recherches sont comptées sous un identifiant provisoire et n'apparaissent qu'au niveau national.

## 3. Le comptage

**Ce qui est compté** : les recherches citoyennes **traitées par le serveur** :
- médicament (DCI non sensible) ;
- spécialité (hors liste sensible) ;
- groupe sanguin.

**Jamais compté** :
- les médicaments sensibles : leur recherche se fait sur le téléphone, le serveur ne la voit pas (art. 48, Principe XI) ;
- les spécialités sensibles : psychiatrie, oncologie, infectiologie-VIH, addictologie, gynécologie-obstétrique, planification familiale (FR-305) ;
- les produits de l'art. 75 (refusés) et les saisies non reconnues.

**Au moment de la recherche**, et seulement à ce moment :
1. La position, déjà arrondie à environ 1 km sur le téléphone (Principe V), est rattachée à un arrondissement.
2. Le serveur ajoute 1 au compteur `(arrondissement, semaine ISO, type, service, satisfaite)`. « Satisfaite » signifie qu'au moins un établissement a été trouvé dans le rayon maximal de 50 km.
3. Rien d'autre n'est écrit : ni heure, ni position, ni session, ni identifiant, ni entrée au journal d'audit.

**Information du citoyen** : une ligne s'ajoute à la politique de données (D-028, §11 et §12) : « Vos recherches non sensibles sont comptées de façon anonyme, par arrondissement et par semaine, sans être conservées. » [Q4]

## 4. La vue « Tendances de la demande »

**Filtres** : niveau (national, région, département, arrondissement) ; zone (listes en cascade) ; type (médicament, spécialité, sang) ; service ; période (4, 8 ou 12 dernières semaines complètes). Zone par défaut : l'arrondissement de l'établissement, calculé depuis sa position avec les mêmes polygones.

**Contenu**
1. **Les plus recherchés** : 10 premiers services de la zone et de la période, avec leur volume.
2. **Demande non satisfaite** : 10 premiers services recherchés sans aucun résultat à moins de 50 km, avec la part de recherches non satisfaites. C'est l'indicateur des ruptures réelles d'une zone.
3. **Évolution** : volume par semaine du service choisi. Une flèche de tendance n'apparaît que si la variation dépasse 20 % et que les deux périodes comptent chacune au moins 20 recherches.
4. **Carte** : les arrondissements colorés par classe de volume, sans fond de carte (les polygones suffisent ; pas d'accès réseau requis).

**Règles d'affichage (garde-fous)** [PROPOSITION, Q3]
- **Semaines complètes seulement** : la semaine en cours n'est jamais montrée (décalage de 1 à 7 jours).
- **Seuil** : une case de moins de 5 recherches s'affiche « moins de 5 » et sort des classements (même seuil que la surveillance, D-007).
- **Arrondi à 5** près de tous les volumes affichés, pour empêcher de retrouver une petite case par différence entre niveaux.
- **Aucune alerte ni notification** : un pic de recherches d'antipaludiques ressemble à un signal épidémique, ce qui relève du point focal (Principe X). Pas d'export brut.
- **Même vue pour tous** les établissements vérifiés ; aucune option payante (Principe VII).

## 5. La vue « Mes indicateurs »

| Indicateur | Calcul | Disponible |
|---|---|---|
| État de visibilité | Compte actif, établissement vérifié, stock de moins de 48 h | Maintenant |
| Fraîcheur du stock | Plus ancienne déclaration + 48 h ; alerte 12 h avant | Maintenant |
| Régularité des mises à jour | Jours avec un stock valide ÷ jours depuis la vérification (30 jours) | Calcul à ajouter sur le journal |
| Lignes déclarées | Nombre de lignes, réparties en disponible, faible et rupture | Maintenant |
| Taux de rupture déclaré | Lignes en rupture ÷ lignes déclarées | Maintenant |
| Qualité des imports | Lignes rejetées ÷ lignes envoyées au dernier import, par motif | Maintenant |
| Complétude de la fiche | Réponses ÷ questions visibles ; photo de façade | Maintenant |
| Score de fiabilité et son évolution sur 30 jours | Score lissé (F-006) | Avec la vue Fiabilité |
| Signalements reçus (30 jours) | Trouvé, absent, stock non à jour, non délivré faute d'ordonnance | Avec la vue Fiabilité |
| Contestations | Ouvertes, délai restant au modérateur (72 h), décisions | Avec la vue Fiabilité |

## 6. Exigences

Numérotation provisoire `FR-TEND-xx` [PROPOSITION : numéros définitifs dans le catalogue].

| ID | Exigence |
|---|---|
| FR-TEND-01 | Une recherche non sensible traitée par le serveur incrémente un seul compteur (arrondissement, semaine ISO, type, service, satisfaite) ; rien d'autre n'est conservé. |
| FR-TEND-02 | Médicaments sensibles, spécialités sensibles, produits de l'art. 75 et saisies inconnues ne sont jamais comptés. |
| FR-TEND-03 | La localisation utilise les polygones ADM3 ; la hiérarchie vient du code INS ; une position hors polygone est rattachée au plus proche à moins de 15 km, sinon au niveau national. |
| FR-TEND-04 | Un polygone sans code INS validé n'est visible qu'au niveau national. |
| FR-TEND-05 | Seules les semaines ISO complètes sont affichées. |
| FR-TEND-06 | Toute valeur inférieure à 5 s'affiche « moins de 5 » et sort des classements ; les autres valeurs sont arrondies à 5. |
| FR-TEND-07 | Filtres : niveau, zone, type, service, période ; zone par défaut : l'arrondissement de l'établissement. |
| FR-TEND-08 | La vue montre les 10 services les plus recherchés, les 10 plus souvent non satisfaits, l'évolution hebdomadaire et une carte par classes. |
| FR-TEND-09 | Aucune alerte, aucune notification, aucun export brut. |
| FR-TEND-10 | La vue est réservée aux établissements vérifiés et identique pour tous. |
| FR-TEND-11 | La vue « Mes indicateurs » affiche les indicateurs du §5 disponibles à ce jour. |
| FR-TEND-12 | Textes en français et en anglais, d'égale valeur (Principe XIV). |

## 7. Critères d'acceptation

| ID | Critère |
|---|---|
| CA-TEND-01 | Après une recherche de paracétamol depuis Douala, le compteur (Douala V, semaine, médicament, paracétamol, satisfaite) vaut 1 de plus ; la base ne contient ni heure, ni position, ni identifiant de la recherche. |
| CA-TEND-02 | Une recherche de lévonorgestrel ou de psychiatrie ne modifie aucun compteur. |
| CA-TEND-03 | Le point (9,7679 ; 4,0511) est rattaché à Douala V, code 050405 ; le département affiché est le Wouri et la région le Littoral, quoi qu'en dise la couche ADM2. |
| CA-TEND-04 | Un point à 0,5 km d'un arrondissement, dans une bande hors polygone, est rattaché à cet arrondissement ; un point à 20 km n'est compté qu'au niveau national. |
| CA-TEND-05 | Une case de 3 recherches s'affiche « moins de 5 » et n'apparaît pas dans le classement ; une case de 23 s'affiche 25. |
| CA-TEND-06 | Le lundi, la semaine qui vient de commencer n'apparaît pas ; la semaine précédente, oui. |
| CA-TEND-07 | Avec 30 recherches non satisfaites d'artésunate sur 40 dans un arrondissement, l'artésunate figure dans la demande non satisfaite avec « 75 % ». |
| CA-TEND-08 | Un établissement non vérifié n'a pas accès à la vue. |
| CA-TEND-09 | Aucune route ne renvoie les compteurs bruts. |
| CA-TEND-10 | Les catalogues de textes français et anglais ont les mêmes clés. |

## 8. Données de démonstration

Pour la vidéo, des compteurs **synthétiques** (générateur à graine fixe, marqués « données fictives ») couvrent 12 semaines et quelques arrondissements de Douala, Yaoundé et Garoua. Ils incluent une rupture d'artésunate visible dans la demande non satisfaite. Aucun vrai citoyen n'est simulé un par un.

## 9. Questions ouvertes

| ID | Question | Proposition par défaut |
|---|---|---|
| Q1 | Source et licence des polygones et des CSV | **Résolu** : OpenStreetMap, ODbL (D-032d). Reste à noter la date d'extraction et l'origine des listes de codes INS |
| Q2 | Les 36 arrondissements à rapprocher et les 11 propositions | L'équipe remplit `code_ins_valide` dans le fichier fourni |
| Q3 | Garde-fous du §4 (seuil 5, arrondi 5, semaines complètes, exclusions, aucune alerte) | **Résolu** : acceptés |
| Q4 | Base du comptage pour un citoyen qui n'a coché aucune case (D-028) | **Résolu** : oui (D-032c) ; mention ajoutée à la politique des citoyens (§11 et §14 de conditions.html) |
| Q5 | Rattachement des positions hors polygone | Plus proche arrondissement à moins de 15 km |
| Q6 | Définition de « satisfaite » | Au moins un résultat à moins de 50 km |
| Q7 | Mettre les districts de santé en filtre plus tard ? | Oui, quand leurs polygones seront disponibles |

## 10. État de l'implémentation (2026-11-07)

| Élément | État |
|---|---|
| Référentiel des zones (`tools/preparer_zones.py`) : 313 arrondissements avec code INS validé, 47 provisoires ; géométries simplifiées pour la carte (53 019 → 17 605 sommets) ; licence ODbL et attribution | Fait |
| Localisation par les polygones ADM3, hiérarchie par code INS, repli à 15 km, sinon niveau national | Fait (CA-TEND-03, 04) |
| Compteur unique par recherche, sans heure, position ni identifiant ; recherches sensibles, produits de l'art. 75 et saisies inconnues jamais comptés | Fait pour la recherche de médicament ; `compter_recherche()` prête pour les recherches de spécialité et de sang, à brancher à l'intégration |
| Seuil de 5, arrondi à 5, semaines complètes, demande non satisfaite, tendance, série hebdomadaire, classes de carte | Fait (CA-TEND-05 à 07, 09) |
| Vue réservée aux établissements vérifiés ; aucune route de compteurs bruts | Fait (CA-TEND-08, 09) |
| Vue « Tendances » : filtres en cascade, classement cliquable, demande non satisfaite, graphique hebdomadaire, carte des arrondissements sans fond de carte avec attribution OpenStreetMap | Fait ; au niveau « arrondissement », la carte montre tout le département avec les mêmes règles |
| Vue « Mes indicateurs » | Fait, sauf fiabilité, signalements et contestations (vue Fiabilité à venir) |
| Données de démonstration : `tools/generer_tendances_demo.py` (compteurs fictifs, graine fixe, rupture d'artésunate à Douala V) | Fait |
| Mention du comptage dans la politique de données des citoyens (D-028) | Fait |
| Couleurs de la carte : dégradé ordinal à 5 classes, validé par script (une seule teinte, clarté croissante, écarts visibles entre classes, contraste de la classe la plus claire) ; « moins de 5 » hachuré | Fait |
| Restent : les 36 arrondissements à rapprocher et les 11 propositions à confirmer (`donnees/zones/correspondance-arrondissements.csv`, puis relancer `tools/preparer_zones.py`) | Équipe |
