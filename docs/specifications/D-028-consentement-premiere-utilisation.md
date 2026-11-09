# D-028 — Consentement à la première utilisation

Spécification compacte (tranche verticale, D-025) · Version 0.1.0 · 2026-11-07
Statut : **UNDER_REVIEW**. L'approche (trois cases, lien sous les cases, « Continuer sans partager ») a été validée par le propriétaire le 2026-11-07. Le texte des conditions reste à relire par le juriste de l'équipe.

Légende : [Fait] tiré d'un texte · [Choix] décision de l'équipe · [PROPOSITION] à valider.

## 1. Décision à ajouter à `docs/product/decisions.md`

| ID | Date | Question | Décision | Statut | Par | Portée |
|---|---|---|---|---|---|---|
| D-028 | 2026-11-07 | Où sont traitées les données du citoyen, et comment son consentement est-il recueilli ? | Les données du citoyen sont envoyées au serveur pour chaque finalité qu'il accepte. À la première utilisation (et à chaque nouvelle version des conditions), un écran présente **trois cases distinctes, non cochées** : orientation, surveillance, signalements de stocks. Le lien vers la page « Conditions d'utilisation et politique de données » est placé **sous les cases**. Un bouton **« Continuer sans partager »** laisse l'alerte d'urgence et les recherches disponibles sur l'appareil. Restent inchangés : les catégories de l'art. 48 sont retirées avant tout envoi (FR-111) et les recherches sensibles restent sur l'appareil (Principe XI, D-008) ; le fonctionnement sur données réelles reste subordonné à l'autorisation de l'APDP (art. 19, Principe XIII). | Décidé | Propriétaire | SF-001-01, SF-001-13, F-002, F-006, F-009 |

**Ce que D-028 modifie.** D-026 disait que tout le parcours « Décrire ce que je ressens » se faisait sur le téléphone. Désormais, la description part au serveur si la case « orientation » est cochée. Sans case cochée, rien ne change : aucun symptôme ne quitte le téléphone (Principe XI, dernier MUST, toujours respecté).

**Conséquence pour le rapport.** La phrase « les symptômes ne quittent jamais le téléphone » devient « sans consentement, les symptômes ne quittent jamais le téléphone ; avec le consentement d'orientation, ils sont envoyés sans les catégories de l'art. 48 ». Le scénario S1 reste valable : il démontre le cas sans consentement.

## 2. Fondements

| Fondement | Contenu | Usage |
|---|---|---|
| [Fait] Loi 2024/017, art. 9 al. 1 | Consentement « préalable, libre, éclairé, spécifique et univoque » | Une case par finalité, non cochée, avant toute collecte |
| [Fait] Art. 9 al. 2 | Dérogation au consentement quand le traitement est nécessaire à la préservation de la santé de la personne ou d'une autre personne | Alerte d'urgence sans consentement |
| [Fait] Art. 9 al. 3 | Avant 18 ans, le consentement n'est valable qu'appuyé par celui du père, de la mère ou du représentant légal | Case d'accord parental |
| [Fait] Art. 11 | Finalités déterminées, explicites et légitimes ; pas de traitement ultérieur incompatible | Nouveau consentement si les conditions changent |
| [Fait] Art. 14 et 21 | Information claire, au plus tard lors de la collecte : identité, finalités, catégories, destinataires, possibilité de refuser, droits, durée de conservation, transferts | Contenu obligatoire de la page |
| [Fait] Art. 38 al. 1 | Le retrait du consentement est un motif d'effacement | Retrait dans « Mes données » |
| [Fait] Art. 40 al. 3 | Le parent peut s'opposer au traitement des données du mineur collectées sans son consentement | Page, section Mineurs |
| [Fait] Art. 13 al. 2, art. 28, art. 47 | Durées de conservation et délais de réponse renvoyés à l'autorisation, au référentiel de l'APDP et à un texte réglementaire | Lacune L15 proposée |
| [Fait] Art. 48 ; note du juriste (D-008) | Interdiction sans dérogation ; consentement nécessaire mais non suffisant | Rien ne change pour ces catégories |
| Exemple international : RGPD art. 7 al. 3 et 4, considérant 43 | Consentement distinct par opération ; service non conditionné ; retrait aussi simple que l'accord | Conforte le choix de trois cases et du bouton « Continuer sans partager » |

## 3. Exigences

Numérotation provisoire `FR-CONS-xx` [PROPOSITION : numéros définitifs à attribuer dans le catalogue, §3].

| ID | Exigence | Source |
|---|---|---|
| FR-CONS-01 | L'écran de première utilisation s'affiche au premier lancement et à chaque nouvelle version des conditions, avant toute fonction qui envoie une donnée personnelle. | Art. 9 al. 1, art. 11, art. 21 |
| FR-CONS-02 | L'écran présente trois cases distinctes (orientation, surveillance, signalements), aucune cochée par défaut, chacune avec une phrase qui dit ce qui est envoyé. | Art. 9 al. 1, art. 21 ; Principe XI |
| FR-CONS-03 | Le lien vers la page « Conditions d'utilisation et politique de données » est placé directement sous les trois cases et s'ouvre sans effacer les choix en cours. | Art. 14, art. 21 ; [Choix] propriétaire |
| FR-CONS-04 | « Continuer sans partager » enregistre les trois finalités à « non », quel que soit l'état des cases, et ne bloque aucune fonction locale (alerte d'urgence, recherches sans compte). | Art. 9 al. 2 ; FR-112 ; Principe XIII |
| FR-CONS-05 | Si au moins une case est cochée, la personne indique si elle a 18 ans ou plus. Si elle a moins de 18 ans, une case d'accord du père, de la mère ou du représentant légal est exigée. | Art. 9 al. 3 |
| FR-CONS-06 | Le choix est enregistré sur l'appareil avec la version des conditions et la date. Il ne contient ni nom, ni téléphone, ni e-mail, ni position, ni langue. Il accompagne chaque demande au serveur pour que l'agent Conformité vérifie la finalité (contrôle 3). | Principe III, Principe XIV |
| FR-CONS-07 | La personne peut modifier ou retirer chaque consentement à tout moment, aussi simplement qu'elle l'a donné, dans « Mes données » ; un retrait entraîne l'effacement des données de la finalité. **Hors de cette livraison : écran « Mes données » à construire.** | Art. 38 al. 1 |
| FR-CONS-08 | L'écran et la page sont en français et en anglais, d'égale valeur ; les catalogues de l'écran ont exactement les mêmes clés. | Principe XIV ; D-027 |
| FR-CONS-09 | La page contient toutes les informations de l'art. 21, plus la logique et les conséquences de la décision automatisée, dans les deux langues. | Art. 21, art. 44 |
| FR-CONS-10 | Le bandeau d'urgence et la mention « système automatisé, pas de diagnostic » restent visibles sur l'écran de première utilisation. | Principe IX |

## 4. Critères d'acceptation

| ID | Critère | Exigences | Test |
|---|---|---|---|
| CA-CONS-01 | À l'état initial, les trois cases sont décochées et « Valider mes choix » refuse la validation (code `E-CONS-AUCUNE-CASE`). | FR-CONS-02 | `consentement.test.mjs` |
| CA-CONS-02 | Avec au moins une case cochée et l'âge non renseigné, la validation est refusée (`E-CONS-AGE`). | FR-CONS-05 | idem |
| CA-CONS-03 | « Moins de 18 ans » sans accord parental : refus (`E-CONS-PARENTAL`) ; avec accord : accepté, et l'enregistrement porte `accord_parental: true`. | FR-CONS-05 | idem |
| CA-CONS-04 | « Continuer sans partager » produit trois finalités à `false`, même si des cases étaient cochées. | FR-CONS-04 | idem |
| CA-CONS-05 | L'enregistrement contient exactement : `version_conditions`, `date`, `finalites`, `majeur`, `accord_parental`. | FR-CONS-06 | idem |
| CA-CONS-06 | Un enregistrement absent, illisible ou d'une autre version des conditions redemande le consentement. | FR-CONS-01 | idem |
| CA-CONS-07 | Les catalogues français et anglais ont les mêmes clés, sans valeur vide. | FR-CONS-08 | idem |
| CA-CONS-08 | Dans l'écran, le lien vers les conditions suit la troisième case et précède la question d'âge ; il s'ouvre dans un nouvel onglet. | FR-CONS-03 | idem (lecture du HTML) + parcours navigateur |
| CA-CONS-09 | La page des conditions a les mêmes 20 sections en français et en anglais, dont les 8 sections qui couvrent les informations de l'art. 21 et l'art. 44 (responsable, choix, données jamais collectées, décision automatisée, destinataires, transferts, conservation, droits). | FR-CONS-08, FR-CONS-09 | idem |
| CA-CONS-10 | Parcours navigateur : cocher une case, choisir « moins de 18 ans », valider → message d'accord parental ; cocher l'accord, valider → confirmation listant la finalité ; passer en anglais → textes anglais. | FR-CONS-02 à 05, 08, 10 | `parcours_consentement.py` |

## 5. Fichiers livrés

| Fichier | Rôle |
|---|---|
| `src/client/pwa/premiere-utilisation.html` | Écran de première utilisation (module ES, sans étape de construction) |
| `src/client/pwa/conditions.html` | Page bilingue « Conditions d'utilisation et politique de données » |
| `src/client/pwa/js/consentement.mjs` | Logique pure : validation, enregistrement, nouvelle version |
| `src/client/pwa/js/i18n-consentement.mjs` | Catalogues français et anglais de l'écran |
| `tests/js/consentement.test.mjs` | CA-CONS-01 à 09 |
| `tools/parcours_consentement.py` | CA-CONS-10 (navigateur sans interface) |
| `apercu/premiere-utilisation-autonome.html` | Copie autonome pour l'aperçu, générée ; ne pas intégrer |

L'emplacement `src/client/pwa/` est une [PROPOSITION] : à aligner sur l'arborescence du dépôt.

## 6. Points ouverts

| ID | Point | Proposition | Bloquant pour |
|---|---|---|---|
| P1 | Coordonnées du responsable du traitement (adresse, e-mail) | À fournir par le chef d'équipe | Publication de la page |
| P2 | Durées de conservation | Propositions surlignées dans la page : description effacée dès la réponse ; signes de surveillance supprimés après regroupement, au plus tard 14 jours ; signalements 12 mois ; identifiant pseudonyme jusqu'à suppression ou 12 mois sans activité ; journal : à fixer | Juriste |
| P3 | Signalement d'un médicament lié à la vie sexuelle (ARV, contraception) : même sous pseudonyme, il révèle une donnée de l'art. 48 | Ne pas l'enregistrer côté serveur (le signalement reste impossible pour ces médicaments) | Juriste ; SF-006 |
| P4 | D-011 (compte pseudonyme) et D-004 (numéros 119, 112) toujours « Proposé » | La page et l'écran les utilisent tels quels | Équipe |
| P5 | Questions posées à l'assistant « Mes droits santé » sans case cochée | Traitées pour répondre, non conservées | Équipe |
| P6 | Écran « Mes données » (consulter, télécharger, retirer, effacer) | À spécifier et construire après la soumission | FR-CONS-07 |
| P7 | Lacune **L15** à ajouter au registre : durées de conservation (art. 13 al. 2, art. 28) et délais de réponse aux demandes (art. 47) renvoyés à l'autorisation, au référentiel de l'APDP et à un texte réglementaire non publiés | Parade : durées proposées, publiées dans la page et paramétrées dans `policy.yaml` ; recommandation au régulateur : publier le référentiel | Rapport (analyse des lacunes) |
| P8 | Rapport de soumission EN et FR, section 2 | Remplacer « les symptômes ne quittent jamais le téléphone » par la formule du §1 | Rapport |
