# D-029 — Inscription, fiche et tableau de bord des établissements de santé

Spécification compacte · Version 0.2.0 · 2026-11-07
Statut : **APPROVED** par le propriétaire le 2026-11-07 (réponses aux questions Q1 et Q2). Le fil « officine » est implémenté ; voir §14 pour l'état exact et les écarts.

Légende : [Fait] tiré d'un texte · [Choix] décision du propriétaire · [PROPOSITION] à valider.

## 1. Décisions

| ID | Date | Question | Décision | Statut | Par |
|---|---|---|---|---|---|
| D-029 | 2026-11-07 | Comment un établissement rejoint-il la plateforme ? | L'établissement s'inscrit lui-même (« Je suis un établissement de santé ») : e-mail de l'établissement, NIU, nom, position GPS, type, informations de base, mot de passe. Un seul compte par établissement ; qui déclare à l'intérieur de l'établissement relève de lui seul. Il remplit ensuite une fiche détaillée propre à son type (questions conditionnelles, listes fermées) et joint des photos. Les stocks ne font pas partie de la fiche : un onglet « Stock » permet de télécharger un modèle, de le remplir et de l'envoyer. À l'envoi de la fiche, seul le format du NIU est contrôlé ; l'établissement accède alors à son tableau de bord. | Décidé | Propriétaire |
| D-029a | 2026-11-07 | Le contrôle du format du NIU suffit-il pour être visible des citoyens ? | Non. Le format correct donne accès au tableau de bord ; l'établissement n'est visible des citoyens qu'après vérification de son agrément (liste simulée dans le prototype). | Décidé | Propriétaire |
| D-029b | 2026-11-07 | Garde-fous ajoutés | Code de confirmation envoyé à l'e-mail de l'établissement (simulé dans le prototype), qui sert aussi à réinitialiser le mot de passe ; aucune personne reconnaissable sur les photos ; position GPS corrigeable sur une carte. | Décidé | Propriétaire |
| D-003 | 2026-11-03 | Rythme de la baisse progressive | Parts égales quotidiennes sur 7 jours | **Décidé** (était Proposé) | Propriétaire, 2026-11-07 |
| D-030 | 2026-11-07 | Limites des signalements | 1 signalement par compte, par pharmacie, par médicament et par jour ; 5 par compte et par jour ; une pharmacie ne peut pas se signaler elle-même | Décidé | Propriétaire |
| D-031 | 2026-11-07 | Information des professionnels | Une politique de données courte pour les comptes d'établissement (art. 21), sur le modèle de celle du citoyen | Décidé | Propriétaire |

**Ce que D-029 modifie.**
- ADR-012 (jetons d'accès créés par un administrateur) est remplacé, pour les établissements, par un compte avec e-mail et mot de passe. Une nouvelle ADR sera nécessaire.
- Le journal enregistre « l'établissement X a déclaré », et plus le nom d'une personne (compte unique).
- FR-402 est modifiée : le champ « déclarant » désigne l'établissement, et non une personne.

## 2. Fondements

| Fondement | Usage |
|---|---|
| [Fait] Loi 90/035, art. 13, 28, 35, 52 : la vente des médicaments est réservée aux pharmaciens ; l'officine et la pharmacie hospitalière sont tenues par un pharmacien | Seuls les établissements agréés sont visibles (FR-401) ; le NIU ne prouve pas l'agrément (D-029a) |
| [Fait] Loi 90/035, art. 53 : vente de médicaments interdite sur la voie publique et dans les marchés | Raison de la vérification avant publication |
| [Fait] Loi 90/035, art. 75 : produits favorisant l'avortement | Rejetés à l'import du stock |
| [Fait] Loi 90/035, art. 19 : publicité soumise à conditions | Aucun champ promotionnel dans la fiche ; photos de l'établissement, pas de produits |
| [Fait] Loi 2024/017, art. 21 | Information des titulaires de compte (D-031) |
| [Fait] Loi 2024/017, art. 15, 27 | Sécurité des comptes et des fichiers envoyés |
| [Fait] Lacune L9 : aucun registre public des établissements agréés | Liste d'agrément simulée ; la vérification reste à confier à une autorité |
| [Fait] Lacune L8 et Principe VII : neutralité commerciale | Aucun champ « sponsor » ; aucune option payante |

## 3. Le parcours

```
Accueil ─► « Je suis un établissement de santé » ─► Se connecter / S'inscrire
  │
  ├─ S'inscrire : type, nom, e-mail, NIU, position GPS, informations de base, mot de passe
  │      └─► code envoyé à l'e-mail ─► e-mail confirmé ─► compte ACTIF
  │
  └─ Tableau de bord (fiche incomplète) ─► Fiche détaillée selon le type + photos ─► Envoyer
         ├─ NIU au bon format ? non ─► message d'erreur, rien n'est enregistré comme soumis
         └─ oui ─► FICHE SOUMISE : tableau de bord complet
                    └─ Vérification de l'agrément
                          ├─ trouvé dans la liste ─► VÉRIFIÉ : visible des citoyens
                          └─ non trouvé ─► EN ATTENTE : invisible ; dossier dans la file du vérificateur
                                              ├─ validé ─► VÉRIFIÉ
                                              └─ refusé (motif) ─► REFUSÉ : invisible, motif affiché
```

Deux états séparés :

| Axe | Valeurs |
|---|---|
| Compte | `EMAIL_NON_CONFIRME`, `ACTIF`, `DESACTIVE` (par l'établissement), `SUSPENDU` (par un administrateur) |
| Visibilité publique | `FICHE_INCOMPLETE`, `EN_ATTENTE_VERIFICATION`, `VERIFIE`, `REFUSE` |

Un établissement n'apparaît dans les recherches que si le compte est `ACTIF`, la visibilité est `VERIFIE`, et (pour les stocks) la déclaration a moins de 48 h.

**Modification d'un champ sensible** : changer le NIU, le type ou de plus de 500 m la position fait repasser la visibilité à `EN_ATTENTE_VERIFICATION` [PROPOSITION].

## 4. Écran « S'inscrire »

| Champ | Saisie | Règle |
|---|---|---|
| Type d'établissement | Liste (§5) | Obligatoire ; détermine la fiche |
| Nom de l'établissement | Texte, 3 à 120 caractères | Obligatoire |
| E-mail de l'établissement | E-mail | Obligatoire, unique ; code de confirmation à 6 chiffres, valable 15 min (simulé : affiché dans la console du prototype) |
| NIU | Texte, mis en majuscules, espaces retirés | Obligatoire, unique ; format `^[A-Z][0-9]{12}[A-Z]$` (ex. `M041618186649L`) [règle à confirmer, Q1] |
| Position | GPS du téléphone, récupérée automatiquement | Obligatoire ; précision affichée ; si la précision est moins bonne que 50 m ou si la personne n'est pas sur place, elle déplace le repère sur une carte |
| Région | Liste : Adamaoua, Centre, Est, Extrême-Nord, Littoral, Nord, Nord-Ouest, Ouest, Sud, Sud-Ouest | Obligatoire |
| District de santé | Liste filtrée par région [PROPOSITION : liste à verser, Q5] | Obligatoire |
| Quartier, repère | Texte court | Obligatoire (ex. « face au marché central ») |
| Téléphone de l'établissement | Numéro au format camerounais (+237, 9 chiffres) | Obligatoire |
| Secteur | Public · Privé à but lucratif · Privé confessionnel · Associatif ou ONG | Obligatoire |
| Mot de passe | Deux fois | Au moins 10 caractères ; refusé s'il contient le NIU ou le nom |
| Conditions | Case « J'ai lu les conditions et la politique de données des établissements » (lien sous la case) | Obligatoire (D-031) |

## 5. Types d'établissement [PROPOSITION]

| Code | Libellé | Onglets « Stock » |
|---|---|---|
| `hopital` | Hôpital ou clinique | Médicaments si pharmacie sur place ; Sang si banque de sang sur place |
| `centre_sante` | Centre de santé (centre médical d'arrondissement, centre de santé intégré, centre privé) | Médicaments si pharmacie sur place |
| `officine` | Officine de pharmacie | Médicaments |
| `centre_transfusion` | Centre de transfusion sanguine | Sang |

**Choix de simplification** [PROPOSITION, Q3] : avec un seul compte par établissement, la pharmacie hospitalière et la banque de sang d'un hôpital sont déclarées depuis le compte de l'hôpital, par des onglets qui apparaissent selon ses réponses. Les anciens rôles `pharmacie_hospitaliere` et `banque_de_sang` deviennent des capacités de l'hôpital, et non des comptes séparés.

## 6. Fiche détaillée par type

Conventions : **L** = liste à choix unique · **LM** = liste à choix multiples · **O/N** = oui ou non · « si … » = question affichée seulement dans ce cas. Les seules réponses libres sont signalées « texte ».

### 6.1 Commun à tous les types

| ID | Question | Saisie | Condition |
|---|---|---|---|
| C1 | Ouvert 24 h sur 24, 7 jours sur 7 ? | O/N | — |
| C2 | Jours d'ouverture | LM : lundi … dimanche, jours fériés | si C1 = non |
| C3 | Horaires en semaine / samedi / dimanche et fériés | L par demi-heure (ouverture, fermeture) ou « fermé » | si C1 = non |
| C4 | Accès pour fauteuil roulant | L : oui · partiel · non | — |
| C5 | Langues d'accueil | LM : français · anglais · autre | — |
| C6 | Modes de paiement acceptés sur place | LM : espèces · mobile money · carte bancaire · assurance maladie | — |
| C7 | Prise en charge par une assurance | O/N | si C6 contient « assurance maladie » |
| C8 | Numéro joignable la nuit | Numéro | si C1 = oui ou si l'établissement assure des gardes |
| C9 | Photos | 1 à 5 images JPEG ou PNG, 5 Mo au plus chacune ; la façade est obligatoire | Case obligatoire : « Aucune personne n'est reconnaissable sur ces photos » |

### 6.2 Hôpital ou clinique (`hopital`) et centre de santé (`centre_sante`)

| ID | Question | Saisie | Condition |
|---|---|---|---|
| H1 | Catégorie | L, `hopital` : hôpital de référence national · hôpital régional · hôpital de district · clinique ou hôpital privé ; `centre_sante` : centre médical d'arrondissement · centre de santé intégré · centre de santé privé [PROPOSITION, Q2] | — |
| H2 | Service d'urgences ouvert 24 h sur 24 ? | O/N | — |
| H2a | Urgences pédiatriques | O/N | si H2 = oui |
| H2b | Ambulance | O/N | si H2 = oui |
| H2c | Numéro de l'ambulance | Numéro | si H2b = oui |
| H3 | Spécialités disponibles | LM : les 18 spécialités du référentiel `recherche_specialite.yaml` (la banque de sang est traitée en H8) | — |
| H3a | Pour chaque spécialité cochée : modalité | L : sur place tous les jours · certains jours · médecin de passage (vacation) | si H3 non vide |
| H3b | Jours de consultation | LM : lundi … dimanche | si H3a ≠ « tous les jours » |
| H3c | Consultation sur rendez-vous ? | O/N | si H3 non vide |
| H4 | Maternité | O/N | — |
| H4a | Accouchements 24 h sur 24 | O/N | si H4 = oui |
| H4b | Césarienne possible | O/N | si H4 = oui |
| H4c | Soins aux nouveau-nés (couveuses, néonatologie) | O/N | si H4 = oui |
| H5 | Hospitalisation | O/N | — |
| H5a | Nombre de lits | L : moins de 10 · 10 à 49 · 50 à 99 · 100 à 249 · 250 ou plus | si H5 = oui |
| H6 | Bloc opératoire | O/N | — |
| H6a | Chirurgie d'urgence 24 h sur 24 | O/N | si H6 = oui |
| H7 | Imagerie | LM : radiographie · échographie · scanner · IRM · aucune | — |
| H8 | Banque de sang sur place | O/N | `hopital` seulement |
| H8a | Groupes sanguins gérés | LM : A+ · A− · B+ · B− · AB+ · AB− · O+ · O− | si H8 = oui |
| H8b | Délivrance 24 h sur 24 | O/N | si H8 = oui |
| H9 | Laboratoire d'analyses sur place | O/N | — |
| H9a | Laboratoire ouvert 24 h sur 24 | O/N | si H9 = oui |
| H10 | Pharmacie sur place | O/N | — |
| H10a | Tenue par un pharmacien | O/N | si H10 = oui ; si non, l'onglet « Stock médicaments » n'apparaît pas (loi 90/035) |
| H10b | Pharmacie ouverte 24 h sur 24 | O/N | si H10a = oui |
| H11 | Référence de l'autorisation d'exploitation | Texte (seule réponse libre, utilisée par le vérificateur) | — |

### 6.3 Officine de pharmacie (`officine`)

| ID | Question | Saisie | Condition |
|---|---|---|---|
| O1 | Référence de l'autorisation d'ouverture | Texte (utilisée par le vérificateur) | — |
| O2 | Le pharmacien titulaire est inscrit à l'Ordre | Case obligatoire | — |
| O3 | Numéro d'inscription à l'Ordre du titulaire | Texte | [PROPOSITION, Q4] |
| O4 | Participe au service de garde | O/N | — |
| O5 | Type de garde | LM : nuits · week-ends · jours fériés | si O4 = oui |
| O6 | Ouvert la nuit en dehors des gardes | O/N | si C1 = non |
| O7 | Accepte les ordonnances d'assurance | O/N | si C7 = oui |

### 6.4 Centre de transfusion sanguine (`centre_transfusion`)

| ID | Question | Saisie | Condition |
|---|---|---|---|
| B1 | Groupes sanguins gérés | LM : les 8 groupes | — |
| B2 | Produits délivrés | LM : sang total · concentré de globules rouges · plasma · plaquettes | — |
| B3 | Délivrance 24 h sur 24 | O/N | — |
| B4 | Collecte de dons sur place | O/N | — |
| B5 | Jours de collecte | LM : lundi … dimanche | si B4 = oui |
| B6 | Donneurs accueillis sans rendez-vous | O/N | si B4 = oui |
| B7 | Référence de l'autorisation | Texte | — |

## 7. Onglet « Stock »

### 7.1 Médicaments (officine ; hôpital ou centre de santé si H10a = oui)

1. L'établissement télécharge le modèle `modele-stock-medicaments.xlsx` (également en CSV).
2. Il le remplit et l'envoie. Les PDF et les photos de listes sont refusés : ils ne peuvent pas être lus de façon fiable.
3. Le système lit chaque ligne et affiche un **rapport d'import** : lignes acceptées et lignes rejetées avec leur motif.

| Colonne | Saisie dans le modèle | Contrôle |
|---|---|---|
| `dci` | Liste déroulante dans le tableur (DCI du référentiel) | Doit exister dans le référentiel des DCI (D-015) ; produits de l'art. 75 rejetés |
| `dosage` | Texte court (ex. 500 mg) | Facultatif |
| `forme` | Liste : comprimé · gélule · sirop · suspension · injectable · pommade · suppositoire · autre | Obligatoire |
| `niveau` | Liste : disponible · faible · rupture | Obligatoire |

- Les noms commerciaux sont refusés : le rapport propose la DCI correspondante, sans l'appliquer d'office.
- L'heure de la déclaration est celle de l'envoi, fixée par le serveur. Au bout de **48 h**, une ligne n'est plus montrée aux citoyens (FR-402).
- Le tableau de bord prévient 12 h avant l'expiration. Un bouton « Confirmer mon stock sans changement » renouvelle toutes les lignes.
- Limite : 2 000 lignes par fichier, 2 Mo.
- [PROPOSITION, Q6] : modification rapide d'une ligne depuis le tableau de bord (niveau par liste déroulante), sans renvoyer de fichier.

### 7.2 Sang (hôpital si H8 = oui ; centre de transfusion)

Le modèle `modele-stock-sang.xlsx` a une ligne par groupe géré (H8a ou B1), avec la colonne `niveau` (disponible · faible · rupture). Jamais de nombre de poches. Même rapport, même expiration à 48 h. Un niveau « faible » ou « rupture » déclenche l'appel au don déjà prévu.

## 8. Tableau de bord : vues par type

| Vue | Hôpital / centre | Officine | Transfusion | Contenu |
|---|---|---|---|---|
| Accueil | ✓ | ✓ | ✓ | État du compte et de la vérification, motif d'un refus, alertes (stock qui expire, contestation en cours) |
| Ma fiche | ✓ | ✓ | ✓ | Fiche du §6, modifiable ; champs sensibles : nouvelle vérification |
| Photos | ✓ | ✓ | ✓ | Ajout, retrait, ordre |
| Services et urgences | ✓ | — | — | Résumé de ce que voient les citoyens (spécialités, urgences, maternité) |
| Stock médicaments | si H10a | ✓ | — | Modèle, import, rapport, expiration |
| Stock sang | si H8 | — | ✓ | Modèle, import, niveaux par groupe |
| Fiabilité | si H10a | ✓ | — | Score, signalements sous pseudonyme, contestation sous 7 jours, suivi de la réponse du modérateur (72 h) |
| Aperçu public | ✓ | ✓ | ✓ | La fiche telle qu'un citoyen la voit |
| Compte | ✓ | ✓ | ✓ | Changer l'e-mail (nouveau code), le mot de passe ; désactiver le compte |
| Historique | ✓ | ✓ | ✓ | Les actions du compte : connexions, modifications, imports, contestations |

**Correspondance avec la liste de gestion des comptes du 3 novembre** : modification (Ma fiche, Compte) ; désactivation (par l'établissement) ; réactivation (par l'établissement si `DESACTIVE`, par un administrateur si `SUSPENDU`) ; réinitialisation du mot de passe (code par e-mail) ; rôles et permissions (un rôle `etablissement` avec son type ; voir F-009) ; historique des actions (vue Historique).

**Nouveau rôle** [PROPOSITION, Q7] : `verificateur`, qui traite la file `EN_ATTENTE_VERIFICATION`, valide ou refuse avec motif, et peut suspendre un compte. À ajouter à la matrice des rôles (SF-009-01).

## 9. Sécurité

- Mots de passe : stockés avec une fonction de hachage lente (Argon2id ou bcrypt), jamais en clair.
- 5 échecs de connexion : compte bloqué 15 minutes ; l'événement est journalisé.
- Codes à 6 chiffres valables 15 minutes, usage unique.
- Photos : métadonnées (position, appareil) supprimées à la réception ; type de fichier vérifié sur le contenu, pas sur l'extension.
- Fichiers de stock : lus comme données, jamais exécutés ; formules du tableur ignorées.
- Toutes les actions passent par l'agent Conformité et le journal chaîné, comme le reste du système.

## 10. Exigences

Numérotation provisoire `FR-ETS-xx` [PROPOSITION : numéros définitifs dans le catalogue].

| ID | Exigence |
|---|---|
| FR-ETS-01 | Le bouton « Je suis un établissement de santé » mène à une page « Se connecter / S'inscrire ». |
| FR-ETS-02 | L'inscription exige les champs du §4 ; le compte n'est actif qu'après confirmation de l'e-mail. |
| FR-ETS-03 | Un NIU et un e-mail ne peuvent servir qu'à un seul compte. |
| FR-ETS-04 | La position est prise par le GPS et peut être corrigée sur une carte ; sa précision est affichée. |
| FR-ETS-05 | La fiche affiche seulement les questions de son type et celles dont la condition est remplie ; une question masquée n'est pas enregistrée. |
| FR-ETS-06 | À l'envoi de la fiche, le seul contrôle bloquant propre à D-029 est le format du NIU ; les champs obligatoires visibles doivent être remplis. |
| FR-ETS-07 | Un établissement n'est visible des citoyens que si son compte est actif et sa vérification `VERIFIE`. |
| FR-ETS-08 | Dans le prototype, la vérification compare le NIU à la liste d'agrément simulée ; sinon le dossier va dans la file du vérificateur. |
| FR-ETS-09 | L'onglet Stock fournit un modèle, accepte un fichier XLSX ou CSV, et produit un rapport ligne par ligne ; les lignes rejetées ne sont pas publiées. |
| FR-ETS-10 | Une ligne de stock n'est plus montrée aux citoyens 48 h après son envoi ; le tableau de bord prévient 12 h avant. |
| FR-ETS-11 | Les onglets du tableau de bord dépendent du type et des réponses (§8). |
| FR-ETS-12 | Les photos sont acceptées seulement avec la case « aucune personne reconnaissable » ; leurs métadonnées sont supprimées. |
| FR-ETS-13 | Le compte peut être modifié, désactivé et réactivé ; le mot de passe se réinitialise par code e-mail ; l'historique du compte est consultable. |
| FR-ETS-14 | La fiche et le tableau de bord sont en français et en anglais, d'égale valeur (Principe XIV). |
| FR-ETS-15 | Aucun champ de la fiche ne permet une mise en avant payante ou promotionnelle (Principe VII). |

## 11. Critères d'acceptation

| ID | Critère |
|---|---|
| CA-ETS-01 | `M041618186649L` est accepté ; `M04161818664L` (11 chiffres), `041618186649L`, `M041618186649` et `M0416181866A9L` sont refusés avec un message clair. |
| CA-ETS-02 | Une seconde inscription avec le même NIU ou le même e-mail est refusée. |
| CA-ETS-03 | Sans code de confirmation, le compte reste `EMAIL_NON_CONFIRME` et ne peut pas envoyer de fiche. |
| CA-ETS-04 | Pour une officine, aucune question H ou B n'apparaît ; pour un hôpital qui répond H8 = non, H8a et H8b n'apparaissent pas et l'onglet « Stock sang » est absent. |
| CA-ETS-05 | Une fiche au NIU bien formé mais absent de la liste simulée donne accès au tableau de bord avec l'état `EN_ATTENTE_VERIFICATION`, et l'établissement n'apparaît dans aucune recherche citoyenne. |
| CA-ETS-06 | Après validation par le vérificateur, il apparaît dans les recherches ; après refus, le motif s'affiche sur son accueil. |
| CA-ETS-07 | Un fichier de stock avec une DCI inconnue, un nom commercial, un produit de l'art. 75 et un niveau hors liste produit 4 lignes rejetées avec 4 motifs distincts ; les autres lignes sont publiées. |
| CA-ETS-08 | Un PDF envoyé dans l'onglet Stock est refusé. |
| CA-ETS-09 | 48 h et 1 minute après l'envoi, la ligne n'apparaît plus dans la recherche de médicament ; « Confirmer mon stock » la fait revenir. |
| CA-ETS-10 | Une photo contenant des coordonnées GPS dans ses métadonnées est stockée sans elles. |
| CA-ETS-11 | 5 mots de passe faux de suite bloquent la connexion 15 minutes. |
| CA-ETS-12 | Modifier le NIU d'un établissement vérifié le repasse en `EN_ATTENTE_VERIFICATION`. |
| CA-ETS-13 | Les catalogues de textes français et anglais de la fiche ont les mêmes clés. |

## 12. Questions ouvertes

| ID | Question | Proposition par défaut |
|---|---|---|
| Q1 | Format du NIU : à « la première lettre est-elle toujours M ? », la réponse « oui » peut se lire dans les deux sens | Accepter n'importe quelle lettre majuscule en première et dernière position tant que ce n'est pas précisé |
| Q2 | Catégories d'hôpitaux et de centres de santé (H1) : la nomenclature officielle n'est pas dans la base | Liste du §6.2, à corriger par l'équipe ; texte officiel à verser |
| Q3 | La pharmacie et la banque de sang d'un hôpital sont-elles gérées depuis le compte de l'hôpital ? | Oui (§5) |
| Q4 | Demander le numéro d'inscription du pharmacien à l'Ordre ? C'est une donnée personnelle du titulaire | Le demander, uniquement pour le vérificateur, jamais affiché au public |
| Q5 | Liste des districts de santé par région | À verser dans la base ; en démonstration, quelques districts fictifs |
| Q6 | Modification rapide d'une ligne de stock dans le tableau de bord, en plus du fichier | Oui |
| Q7 | Qui vérifie l'agrément hors démonstration (Ordre, MINSANTE, équipe) ? | Rôle `verificateur` dans le prototype ; autorité à désigner (lacune L9) |
| Q8 | Laboratoires d'analyses et cabinets médicaux : types à part entière ? | Non pour le prototype ; un hôpital déclare son laboratoire (H9) |

## 13. Découpage proposé avant le 10 novembre

La démonstration (S1 à S3) n'utilise pas encore la console des établissements. Pour montrer le parcours sans risquer l'échéance [PROPOSITION] :

1. **Prioritaire** : inscription d'une officine, contrôle du NIU, état « en attente » puis « vérifié » par la liste simulée, import du modèle de stock avec son rapport, visibilité dans la recherche de médicament. Ce fil sert une scène courte de la vidéo.
2. **Si le temps le permet** : fiche hôpital complète (§6.2) et onglet sang.
3. **Après la soumission** : vue Fiabilité intégrée, rôle vérificateur, historique, réinitialisation du mot de passe, politique de données des établissements (D-031).

## 14. État de l'implémentation (2026-11-07, fil « officine »)

Réponses du propriétaire du 2026-11-07 intégrées : Q1 (toute lettre majuscule au début et à la fin du NIU), Q2 (catégories proposées retenues, faute de nomenclature officielle). Q4 restée sans réponse : le numéro d'Ordre est un champ **facultatif**, vu du seul vérificateur.

| Élément | État |
|---|---|
| Inscription, code e-mail simulé, connexion, blocage après 5 échecs | Fait |
| NIU : format, unicité ; e-mail unique | Fait |
| Position GPS récupérée automatiquement, précision affichée, correction par saisie de la latitude et de la longitude | Fait ; **écart** : pas de carte (les fonds de carte demandent un accès réseau que le prototype n'a pas) |
| Fiche officine (C1 à C8, O1 à O7) avec questions conditionnelles, mêmes règles côté client et côté serveur (parité testée sur 500 jeux) | Fait |
| Photos : case « aucune personne », métadonnées supprimées, façade obligatoire | Fait |
| Vérification par la liste simulée ; file d'attente ; décision du vérificateur | Fait ; **écart** : le vérificateur décide par un outil en ligne de commande (`tools/verifier_etablissement.py`), sa console reste à faire |
| Nouvelle vérification après changement de NIU ou déménagement de plus de 500 m | Fait (un déménagement passe toujours par le vérificateur : la liste ne prouve que le NIU) |
| Onglet Stock : modèle XLSX (listes déroulantes) et CSV, import, rapport ligne par ligne, expiration 48 h, alerte 12 h avant, « Confirmer mon stock » | Fait |
| Recherche citoyenne : établissements actifs et vérifiés seulement, rupture exclue, tri ouvert puis distance, élargissement du rayon, mention d'ordonnance ; recherche sensible faite sur le téléphone à partir de la tuile régionale | Fait (page de démonstration) |
| Tableau de bord : Accueil, Ma fiche, Photos, Stock, Aperçu public, Compte, Historique ; désactivation et réactivation | Fait |
| Conditions des établissements (D-031) | Version de travail, passages à compléter surlignés |
| Mots de passe | **Écart** : scrypt (bibliothèque standard) au lieu d'Argon2id ou bcrypt, absents de l'environnement ; même rôle de fonction lente |
| Hôpital, centre de santé, centre de transfusion ; onglet sang ; vue Fiabilité ; réinitialisation du mot de passe ; console du vérificateur | À faire après la soumission (§13) |
| Branchement sur l'agent Conformité et le journal du dépôt | À faire à l'intégration : cette livraison a son propre journal chaîné, de même format |
