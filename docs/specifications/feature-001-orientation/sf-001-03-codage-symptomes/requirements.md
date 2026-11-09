# SF-001-03 — Codage des symptômes par le référentiel interne — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des symptômes |
| Sous-fonctionnalité | SF-001-03 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Référence approuvée | Spécifications v1.3 (approuvées le 2026-11-03) : FR-103, remplacée par FR-120 sur décision du propriétaire (D-018, 2026-11-04) |
| Bloquant | Aucun |
| Dépend de | SF-001-02 (retrait des mentions interdites), SF-001-04 (paquet de règles et de référentiel), SF-007-03 (conformité, pour l'extraction LLM), SF-008-04 (FR-107, mineurs) |

## 1. Objectif métier et résultat attendu
Transformer ce que la personne coche ou écrit en une liste de **jetons** d'un vocabulaire fermé, identique sur l'appareil et sur le serveur, sans dépendre de SNOMED CT (D-018). Résultat observable : la liste présentée ne contient que des signes compréhensibles et autorisés ; chaque règle de triage applicable à la tranche d'âge peut être déclenchée depuis cette liste ; chaque jeton renvoie à une source officielle ; le moteur (SF-001-07) reçoit des jetons valides, complétés par leurs implications.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, jeton) |
|---|---|---|---|
| Citoyen | Cocher dans la liste fermée ; écrire un texte libre analysé sur l'appareil | Voir une entrée exclue ; envoyer un texte non nettoyé | Aucune pour la liste et l'extraction lexicale (sur l'appareil, FR-112) |
| Citoyen (extraction par LLM) | Demander l'analyse du texte nettoyé par le LLM local du serveur | Envoyer sa tranche d'âge (D-023) | Consentement exprès d'orientation ; mode `demo_synthetique` ou `complet` ; majeur, ou consentement parental (FR-107) |
| Agent Triage (serveur) | Proposer des jetons supplémentaires | Renvoyer un jeton hors référentiel, exclu, non observable ou `sante_avis_juriste` | Action `triage.extraction_llm` autorisée par Conformité |
| Équipe (mainteneur) | Régénérer le référentiel avec l'outillage | Modifier un `code` ou un `jeton` existant ; insérer une entrée ailleurs qu'en fin de liste | Nouvelle version approuvée |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-103 | les symptômes extraits MUST être codés avec des identifiants SNOMED CT du GPS ; les codes non trouvés sont conservés en catégorie libre `non_code`. | Référence v1.3 | Haute | REMPLACÉE par FR-120 (D-018) |
| FR-120 | Les symptômes MUST être codés avec les jetons et les codes `SYM-NNN` du référentiel interne `data/referentiels/symptomes.csv` ; ce qui n'est pas reconnu est seulement compté (`non_code`, FR-122), sans que le texte soit conservé ni transmis ; aucun identifiant SNOMED CT n'est utilisé ni inventé. | Décision D-018 | Haute | UNDER_REVIEW |
| FR-121 | La liste fermée d'une tranche d'âge T MUST contenir exactement les entrées `affiche = oui`, dont `sensibilite` ne commence pas par `exclu`, et qui vérifient l'une des deux conditions : (a) `public` couvre T (`tous` : toutes les tranches ; `nourrisson` : `moins_8_jours`, `8_jours_2_mois` ; `enfant` : de `moins_8_jours` à `5_11_ans` ; `adulte` : de `12_17_ans` à `plus_70_ans`) ; (b) le jeton figure, directement ou dans un composite, dans la condition d'une règle applicable à T. Chaque jeton utilisé par une règle applicable à T MUST être présent dans cette liste ou impliqué par une de ses entrées. | Nouvelle [PROPOSITION] ; D-024 | Haute | UNDER_REVIEW |
| FR-122 | L'extracteur lexical, exécuté sur l'appareil, MUST indexer les libellés et synonymes FR et EN des entrées utilisables (`sensibilite` ne commençant pas par `exclu` et `observable_non_professionnel = oui`), quels que soient `affiche` et `public` ; normaliser le texte et les expressions de la même façon (design §6) ; renvoyer tous les jetons dont une expression apparaît dans le texte sous forme de mots entiers (union, sans exclusivité) ; et compter `non_code` comme le nombre de segments du texte (séparés par `. , ; : ! ?` ou un retour à la ligne) sans aucune expression reconnue et contenant au moins un mot de 4 lettres ou plus. | Nouvelle [PROPOSITION] | Haute | UNDER_REVIEW |
| FR-123 | Avant toute évaluation des règles, l'ensemble des jetons MUST être complété par la fermeture transitive de la colonne `implique` (ex. `diarrhee_avec_sang` ajoute `diarrhee` et `sang_dans_selles`). | Nouvelle [PROPOSITION] | Haute | UNDER_REVIEW |
| FR-124 | Le référentiel MUST être validé au chargement : colonnes attendues ; `code` et `jeton` uniques ; `implique` vers des jetons existants ; aucune expression normalisée rattachée à deux jetons ; empreinte SHA-256 égale à celle de `symptomes.meta.yaml` ; côté serveur, en plus, chaque identifiant de `sources` présent dans la base de connaissances. Un référentiel invalide n'est pas chargé ; l'appareil conserve la dernière version valide embarquée. | Nouvelle [PROPOSITION] | Haute | UNDER_REVIEW |
| FR-125 | La colonne `snomed_gps_id` MUST rester vide tant qu'aucun fichier GPS officiel n'est fourni ; son remplissage ultérieur MUST NOT modifier `code` ni `jeton`. | Décision D-018 | Moyenne | UNDER_REVIEW |
| FR-126 | Quand l'extraction par LLM local est autorisée (ADR-006, action `triage.extraction_llm`, `policy.yaml > llm.usage_autorise : extraction_symptomes_vers_codes`), la requête MUST NOT contenir la tranche d'âge (D-023) et le serveur MUST ne renvoyer que des jetons utilisables au sens de FR-122, à l'exclusion de toute entrée `sante_avis_juriste` (D-022) ; un jeton refusé n'est ni renvoyé ni nommé dans le journal, seul leur nombre est journalisé ; si le LLM est indisponible ou ne répond pas dans le délai fixé, l'appareil garde le résultat de l'extraction lexicale. L'appareil n'appelle pas cette route pour une personne de moins de 18 ans sans consentement parental (FR-107). | Nouvelle [PROPOSITION] | Moyenne | UNDER_REVIEW |
| FR-127 | Le référentiel MUST être reproductible et stable : `python3 tools/donnees/generer_referentiel_symptomes.py` régénère un fichier identique octet pour octet ; aucun `code` existant ne change et aucune entrée n'est supprimée (toute nouvelle entrée est ajoutée en fin de liste) ; chaque `libelle_source` figure mot pour mot dans au moins un fragment listé dans `sources`. | Nouvelle [PROPOSITION] | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-111 (SF-001-02) : aucune donnée génétique, biométrique ni sur la vie sexuelle n'est demandée ; les mentions spontanées sont retirées du texte avant tout envoi.
- FR-112 (SF-001-08) : sans consentement exprès, les règles d'urgence s'exécutent sur l'appareil et aucun symptôme n'est envoyé.
- FR-107 (SF-008-04) : moins de 18 ans sans consentement parental, seule l'orientation urgente est servie.
- FR-101 (SF-001-07) : le niveau est calculé par les règles ; le LLM ne peut que le relever.
- FR-105 (SF-001-01) : position arrondie à 2 décimales ; aucun historique de symptômes rattaché au compte.
- FR-705 (SF-007-05) : contrôle de transfert avant tout appel réseau sortant.
- FR-712 (SF-007-06) : blocage des catégories de l'art. 48, quel que soit le consentement.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| NFR-101 | Extraction lexicale rapide sur l'appareil | Médiane ≤ 50 ms sur 100 extractions d'un texte de 500 caractères (Node 22, machine de référence de l'équipe) | UNDER_REVIEW |
| NFR-102 | Référentiel léger à télécharger | Fichier CSV ≤ 100 Kio (35,6 Kio pour la version 1.1.0) | UNDER_REVIEW |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, règle `rules/…`, décision) |
|---|---|---|
| BR-001-03-01 | Aucun contenu SNOMED CT dans le prototype ; licence du GPS CC BY-ND 4.0 si intégré plus tard | D-018 ; `INT-SNOMED-GPS-TECH::0000` |
| BR-001-03-02 | Les libellés en langage courant et les synonymes sont des propositions à valider par un clinicien ; `libelle_source` reste la référence | D-020, D-024 ; lacune V7 |
| BR-001-03-03 | `agression_sexuelle` (art. 48) et `priapisme` (avis du juriste attendu) ne sont jamais affichés, indexés ni utilisés | D-022 ; `CMR-LOI-2024-017::0048` |
| BR-001-03-04 | Le texte libre n'est jamais journalisé | `config/policy.yaml > journal_audit.champs_interdits : texte_libre_symptomes` |
| BR-001-03-05 | Seules les entrées `observable_non_professionnel = oui` peuvent être utilisées par une règle ou reconnues par l'extracteur | D-020 |
| BR-001-03-06 | Les jetons `sante_avis_juriste` (grossesse, accouchement déclenché, grossesse avec complications) restent sur l'appareil : jamais transmis ni journalisés | D-022 |
| BR-001-03-07 | Un `code` attribué ne change jamais ; une nouvelle entrée est ajoutée en fin de liste | `data/referentiels/symptomes.meta.yaml > colonnes.code` |

## 7. Préconditions et postconditions
- Préconditions : référentiel et métadonnées présents et valides ; paquet de règles valide (SF-001-04) ; tranche d'âge déclarée sur l'appareil (SF-001-01).
- Postconditions (succès) : ensemble de jetons fermé par implication ; nombre `non_code` ; aucun texte conservé.
- Postconditions (échec) : référentiel invalide → dernière version valide embarquée ; LLM indisponible ou refusé → extraction lexicale seule.

## 8. Scénarios
### 8.1 Nominal
1. L'application charge le référentiel embarqué et vérifie son empreinte.
2. La personne déclare la tranche `51_70_ans` ; la liste présente les entrées de public `tous` et `adulte` et celles qu'utilise une règle applicable à cette tranche.
3. Elle coche « Douleur à la poitrine apparue récemment » → jeton `douleur_thoracique_aigue`, complété par `douleur_thoracique`.
### 8.2 Alternatifs
- A1 — Texte libre « mal à la poitrine, et j'ai des fourmis dans les doigts » : jeton `douleur_thoracique` ; `non_code = 1` (phrase F21 du jeu de référence).
- A2 — Consentement d'orientation donné, personne majeure, mode autorisé : le texte nettoyé (sans la tranche d'âge) est soumis au LLM local, qui ne peut qu'ajouter des jetons utilisables.
### 8.3 Cas limites et exceptions
- L1 — Saisie en anglais « wheezing and coughing » → `sifflement`, `toux` (E05).
- L2 — « il a un bleu sur le bras » → aucun jeton, `non_code = 1` (F12 : « bleu » n'est plus reconnu comme cyanose).
- L3 — « contractions musculaires dans les jambes » → aucun jeton (F17 : pas d'accouchement ni de grossesse déduits).
- L4 — Mention d'agression sexuelle : retirée par SF-001-02 avant tout traitement ; aucune entrée correspondante n'est indexée.
- L5 — Référentiel téléchargé dont l'empreinte diffère : rejeté, version embarquée conservée, événement technique sans contenu.
- L6 — Le LLM propose `priapisme`, `grossesse` et un jeton inconnu : les trois sont refusés ; le journal indique 3 refus sans les nommer.
- L7 — Enfant de 10 ans déclaré enceinte (règle IITTM12-R-16) : « Maux de tête très intenses » (public `adulte`) figure dans la liste de la tranche `5_11_ans` parce qu'une règle applicable l'utilise.

## 9. Validation des entrées et gestion des erreurs
| Entrée | Règle de validation | Erreur |
|---|---|---|
| Texte libre | ≤ 500 caractères après nettoyage | Message local `SAISIE_TROP_LONGUE` (sur l'appareil) |
| Requête d'extraction | Champ `texte` présent | E-VAL-001 |
| Requête d'extraction | Champ inconnu ou interdit (dont la tranche d'âge) | E-VAL-004 |
| Requête d'extraction | Corps ≤ 32 Kio | E-VAL-005 |
| Requête d'extraction | Consentement exprès d'orientation (`X-Consentements: orientation=1`) | E-CONF-003 |
| Requête d'extraction | Mode `demo_synthetique` ou `complet` | E-MODE-001 |
| Requête d'extraction | Destination autorisée (`serveur_cmr`) | E-CONF-001 |
| Requête d'extraction | LLM disponible dans le délai | E-INDISP-001 (repli lexical) |
| Référentiel | Règles de FR-124 | Rejet du chargement |

## 10. Critères d'acceptation
| ID | Exigences | Critère (Étant donné / Quand / Alors, mesurable) |
|---|---|---|
| CA-001-03-01 | FR-120, FR-125 | Étant donné le référentiel livré ; quand on lit toutes les lignes ; alors 110 entrées sur 110 ont un `code` `SYM-NNN` unique et un `jeton` unique, et 0 a une valeur dans `snomed_gps_id` |
| CA-001-03-02 | FR-121 | Étant donné le référentiel 1.1.0 ; quand on construit la liste fermée de `2_5_ans` puis celle de `5_11_ans` ; alors la première compte 77 entrées, contient `incapable_de_boire_ou_teter` et aucune entrée de public `adulte` ; la seconde contient `cephalee_intense` et `douleur_abdominale_severe` (règle IITTM12-R-16) ; aucune des 10 listes ne contient `agression_sexuelle` ni `priapisme` |
| CA-001-03-03 | FR-122 | Étant donné les 42 phrases de `data/referentiels/phrases_extraction_reference.json` ; quand l'extracteur les traite ; alors 42 sur 42 donnent exactement les jetons et le `non_code` attendus |
| CA-001-03-04 | FR-123 | Étant donné `{diarrhee_avec_sang}` ; quand on ferme l'ensemble ; alors il vaut `{diarrhee_avec_sang, diarrhee, sang_dans_selles}` |
| CA-001-03-05 | FR-124 | Étant donné un référentiel avec un jeton dupliqué, puis un autre dont l'empreinte diffère ; quand l'appareil les charge ; alors les deux chargements sont refusés et la version embarquée reste active |
| CA-001-03-06 | FR-126 | Étant donné un double du LLM qui propose `toux`, `priapisme`, `grossesse` et `jeton_inconnu` ; quand le serveur filtre ; alors seul `toux` est renvoyé et le journal indique 3 refus sans nommer les jetons |
| CA-001-03-07 | FR-127 | Étant donné le dépôt ; quand on relance le générateur deux fois ; alors le fichier est identique octet pour octet, aucun code de la version précédente n'a changé, et chaque texte source est retrouvé dans ses fragments |
| CA-001-03-08 | FR-121 | Étant donné le référentiel et `rules/triage_signes_alerte.v2.yaml` ; quand on parcourt les 10 tranches et les 75 règles ; alors 0 jeton de condition n'est hors de la liste fermée de sa tranche et non impliqué par elle |
| CA-001-03-09 | FR-126 | Étant donné une requête d'extraction contenant un champ `tranche_age` ; quand le serveur la reçoit ; alors elle est rejetée par E-VAL-004 sans traitement |

## 11. Dépendances et intégrations
- Paquet de règles et de référentiel servi à l'appareil : SF-001-04.
- Moteur de triage : SF-001-07. Extraction par LLM : orchestrateur (SF-007-02) et Conformité (SF-007-03).
- Surveillance : les jetons `usage = surveillance` alimentent les définitions de `kb/rules/sbc_definitions.yaml` (SF-002-01).
- Données de démonstration : `kb/data/synthetic/patients.csv` utilise 18 jetons, tous présents dans le référentiel.

## 12. Exclusions (hors périmètre)
- Correspondance avec SNOMED CT ; hiérarchies et raisonnement terminologique ; diagnostic.
- Correction orthographique, reconnaissance vocale ou d'image, langues locales.

## 13. Questions ouvertes
| ID | Question | Bloquante | Proposition |
|---|---|---|---|
| Q-001-03-01 | Qui valide les libellés et synonymes en langage courant (version 1.1.0) ? | Non pour la démo | Un clinicien, avant tout usage hors démo (V7) |
| Q-001-03-02 | Faut-il ajouter des langues locales ? | Non | Hors prototype ; colonnes `libelle_<langue>` plus tard |
| Q-001-03-03 | La règle IITTM12-J-15 (« Grossesse », moins de 12 ans) affiche « Enceinte » pour toutes les tranches d'enfant, nouveau-né compris. Faut-il la limiter ? | Non | Demander au clinicien ; ne rien changer sans avis (transcription fidèle de la source) |
| Q-001-03-04 | Le texte libre envoyé au LLM peut mentionner une grossesse, alors que D-022 la garde sur l'appareil. SF-001-02 doit-elle retirer ces mentions avant envoi ? | Non (la route n'est pas implémentée) | Oui : proposition de modification de SF-001-02 (README de F-001) ; avis du juriste demandé par D-022 |
| Q-001-03-05 | Quel délai maximal pour l'extraction par LLM ? | Non | 3 000 ms, nouvelle clé `llm.delai_extraction_ms` dans `policy.yaml` (proposition de modification) |

## 14. Sources
- `data/referentiels/symptomes.csv` (version 1.1.0), `data/referentiels/symptomes.meta.yaml`, `data/referentiels/phrases_extraction_reference.json` ; `docs/product/decisions.md` (D-018, D-020, D-022, D-023, D-024) ; `docs/quality/preuve-2026-11-04-generation-donnees.txt`.
- `INT-SNOMED-GPS-TECH::0000` ; `INT-OMS-IITT-FR::0000` à `::0004` ; `INT-OMS-PCIME-MANUEL::0028`, `::0029`, `::0042` ; `CMR-MINSANTE-GUIDE-SBC-2023` ; `CMR-LOI-2024-017::0048`.
- `config/policy.yaml > llm`, `> journal_audit.champs_interdits` ; `docs/architecture/shared/governance-contracts.md` §3 (`triage.extraction_llm`) ; `docs/architecture/shared/api-conventions.md`.
- `docs/archive/baseline-v1.3/specs/001-orientation-symptomes/spec.md` (FR-101 à FR-114).
