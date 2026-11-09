# SF-001-05 — Règles PCIME de l'enfant de 2 mois à 5 ans — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des symptômes |
| Sous-fonctionnalité | SF-001-05 |
| Version | 1.0.0 |
| Statut | READY_FOR_DEV |
| Référence approuvée | Spécifications v1.3 (approuvées le 2026-11-03) : aucune exigence propre ; FR-101 et FR-104 (SF-001-07) et FR-113 (SF-001-04) s'appliquent à ces règles |
| Bloquant | Aucun pour la démonstration ; validation clinique (V7, D-006) et DEP-005 avant tout usage hors démo |
| Dépend de | SF-001-03 (jetons), SF-001-04 (chargement du fichier de règles), SF-001-07 (évaluation) |

## 1. Objectif métier et résultat attendu
Fournir au moteur de triage les règles de la PCIME (OMS, 2001) applicables à l'enfant malade de 2 mois à 5 ans, recopiées à l'identique et sourcées, pour que les signes généraux de danger et les catégories jaunes retenues produisent le bon niveau FR-104. Résultat observable : un enfant de 3 ans qui ne peut pas boire obtient `urgence` (priorité immédiate) ; un enfant de 3 ans fébrile en zone à risque élevé de paludisme obtient `consultation_24h` ; chaque décision cite la règle et ses fragments.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, jeton) |
|---|---|---|---|
| Moteur de triage (appareil, SF-001-07) | Évaluer les règles | Modifier une règle | Fichier de règles valide (SF-001-04) |
| Clinicien validateur | Valider les règles et la correspondance D-021 ; renseigner `validateur_clinique` | Ajouter une règle sans texte source | Nouvelle version du fichier, approuvée |
| Équipe (mainteneur) | Régénérer le fichier avec l'outillage | Changer un texte source | Nouvelle version approuvée |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-130 | Les règles d'outil `pcime` MUST s'appliquer uniquement aux tranches `2_6_mois`, `6_mois_2_ans` et `2_5_ans` (de 2 mois révolus à la veille du cinquième anniversaire). | Nouvelle [PROPOSITION] ; D-023 | Haute | UNDER_REVIEW |
| FR-131 | Chacun des quatre signes généraux de danger — incapable de boire ou de téter, vomit tout, convulsions, léthargique ou inconscient — MUST suffire à produire le niveau `urgence`, priorité immédiate (règles PCIME-SGD-01 à SGD-04). | Règle `rules/triage_signes_alerte.v2.yaml` ; D-021 | Haute | UNDER_REVIEW |
| FR-132 | La fièvre associée à une raideur de nuque MUST produire `urgence`, priorité immédiate (règle PCIME-MFTG-01, ligne « Transférer d'URGENCE à l'hôpital »). | Règle `rules/…v2.yaml` ; D-021 | Haute | UNDER_REVIEW |
| FR-133 | La fièvre MUST produire `consultation_24h` (règle PCIME-J-01) seulement quand le paramètre de déploiement `risque_paludisme` vaut `eleve` ; avec toute autre valeur, cette règle ne s'applique pas. | Règle `rules/…v2.yaml` ; DEP-005 | Haute | UNDER_REVIEW |
| FR-134 | La diarrhée avec du sang dans les selles MUST produire `consultation_24h` (règle PCIME-J-02), que les deux signes soient cochés séparément ou reconnus ensemble (jeton dérivé `diarrhee_avec_sang`, SF-001-03). | Règle `rules/…v2.yaml` ; D-024 | Haute | UNDER_REVIEW |
| FR-135 | Une diarrhée déclarée depuis 14 jours ou plus MUST produire `consultation_24h` (règle PCIME-J-03) ; la durée vient de la saisie (SF-001-01). | Règle `rules/…v2.yaml` | Haute | UNDER_REVIEW |
| FR-136 | Chaque règle PCIME MUST porter `id`, `outil`, `couleur_source`, `tranches`, `condition`, `texte_source` et `fragments` ; chaque texte source MUST figurer mot pour mot dans au moins un de ses fragments ; chaque jeton de condition MUST être utilisable au sens de SF-001-03 (observable sans appareil, non exclu). | Nouvelle [PROPOSITION] ; D-006, D-020 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-101, FR-104, FR-110 (SF-001-07) : niveau calculé par les règles, quatre niveaux, journal de chaque décision.
- FR-113 (SF-001-04) : un fichier de règles sans `validateur_clinique` n'est chargé qu'en mode `demo_synthetique`, avec la mention de démonstration.
- FR-102 (SF-001-11) : aucun nom de maladie, médicament ni posologie dans les sorties.
- FR-123 (SF-001-03) : fermeture des implications avant évaluation.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|

Aucune exigence non fonctionnelle propre : la taille et le chargement du paquet relèvent de SF-001-04, le temps d'évaluation de SF-001-07.

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, règle `rules/…`, décision) |
|---|---|---|
| BR-001-05-01 | Les règles sont recopiées à l'identique de la PCIME ; aucune règle n'est ajoutée sans texte source | D-006 ; `INT-OMS-PCIME-MANUEL::0028`, `::0029` |
| BR-001-05-02 | Couleurs : signe général de danger → `urgence` immédiate ; catégorie jaune PCIME → `consultation_24h` | D-021 (validation clinique requise) |
| BR-001-05-03 | « À cinq ans » signifie avant le cinquième anniversaire ; l'enfant de 2 mois appartient à la classe 2 mois à 5 ans | `INT-OMS-PCIME-MANUEL::0016`, `::0017` |
| BR-001-05-04 | Le risque de paludisme est un paramètre du déploiement (`parametres.risque_paludisme`), valeur `eleve` au statut d'hypothèse ; la PCIME parle de risque élevé quand plus de 5 % des maladies fébriles de l'enfant sont dues au paludisme | DEP-005 ; `INT-OMS-PCIME-MANUEL::0056`, `::0063` |
| BR-001-05-05 | Le nom de la classification PCIME (dysenterie, paludisme, maladie fébrile très grave…) n'est jamais montré à l'utilisateur : la raison affichée cite les signes en cause | FR-102 (SF-001-11) ; FR-109 (SF-008-07) |
| BR-001-05-06 | La grille PCIME du nourrisson de 1 semaine à 2 mois n'est pas transcrite ; avant 2 mois, ce sont les critères IITT (SF-001-06) qui s'appliquent | `INT-OMS-PCIME-MANUEL::0014` ; SF-001-06 (IITTM12-R-09, IITTM12-J-09) |

## 7. Préconditions et postconditions
- Préconditions : fichier `rules/triage_signes_alerte.v2.yaml` valide et chargé (SF-001-04) ; référentiel 1.1.0 (SF-001-03) ; tranche et durée déclarées.
- Postconditions (succès) : les règles PCIME satisfaites sont connues du moteur avec leur couleur et leurs fragments.
- Postconditions (échec) : fichier invalide → aucune règle de la nouvelle version n'est utilisée (SF-001-04).

## 8. Scénarios
### 8.1 Nominal
1. Un parent déclare un enfant de 3 ans (`2_5_ans`) qui ne peut pas boire.
2. Le moteur trouve PCIME-SGD-01 satisfaite → `urgence`, priorité immédiate ; la raison affichée cite « Incapable de boire ou de téter ».
### 8.2 Alternatifs
- A1 — Enfant de 3 ans, fièvre seule, `risque_paludisme = eleve` → PCIME-J-01 → `consultation_24h`.
- A2 — Enfant de 3 ans, « diarrhée avec du sang » écrit en texte libre → jeton dérivé, fermeture → PCIME-J-02 → `consultation_24h`.
- A3 — Enfant de 3 ans, diarrhée déclarée depuis 15 jours → PCIME-J-03 → `consultation_24h`.
### 8.3 Cas limites et exceptions
- L1 — Enfant de 5 ans révolus (`5_11_ans`), fièvre seule : aucune règle PCIME ; aucune règle IITT ne couvre la fièvre seule → `consultation_48h` (question Q-001-05-01).
- L2 — Nourrisson de 6 semaines (`8_jours_2_mois`) incapable de téter : règles PCIME non applicables ; IITTM12-J-03 (incapacité à boire ou se nourrir, par implication) et IITTM12-J-09 → `urgence`, priorité rapide (SF-001-06).
- L3 — Diarrhée depuis 13 jours sans autre signe → `consultation_48h`.
- L4 — `risque_paludisme` réglé à une autre valeur que `eleve` → PCIME-J-01 ne s'applique pas.

## 9. Validation des entrées et gestion des erreurs
| Entrée | Règle de validation | Erreur |
|---|---|---|
| Fichier de règles | Schéma `triage-regles/2` et règles de FR-136 | Refus du chargement (SF-001-04) |
| Durée déclarée | Entier de 0 à 365 jours (SF-001-01) | Message local de saisie |

## 10. Critères d'acceptation
| ID | Exigences | Critère (Étant donné / Quand / Alors, mesurable) |
|---|---|---|
| CA-001-05-01 | FR-130 | Étant donné le fichier de règles ; quand on lit les règles d'outil `pcime` ; alors les 8 ont exactement les tranches `2_6_mois`, `6_mois_2_ans`, `2_5_ans` |
| CA-001-05-02 | FR-131 | Étant donné un enfant de chaque tranche PCIME ; quand il présente un seul des 5 jetons `incapable_de_boire_ou_teter`, `vomit_tout`, `convulsions`, `lethargie`, `inconscient` ; alors le niveau est `urgence` immédiate dans 15 cas sur 15 |
| CA-001-05-03 | FR-132 | Étant donné un enfant de 3 ans ; quand il présente `fievre` et `raideur_nuque` ; alors `urgence` immédiate par PCIME-MFTG-01 |
| CA-001-05-04 | FR-133 | Étant donné un enfant de 3 ans fébrile ; quand `risque_paludisme` vaut `eleve` puis `faible` ; alors `consultation_24h` (PCIME-J-01) puis `consultation_48h` |
| CA-001-05-05 | FR-134 | Étant donné un enfant de 3 ans ; quand il présente `diarrhee` et `sang_dans_selles`, puis `diarrhee_avec_sang` seul ; alors `consultation_24h` (PCIME-J-02) dans les deux cas |
| CA-001-05-06 | FR-135 | Étant donné un enfant de 3 ans avec `diarrhee` ; quand la durée vaut 14 puis 13 jours ; alors `consultation_24h` puis `consultation_48h` |
| CA-001-05-07 | FR-136 | Étant donné les 8 règles PCIME ; quand on vérifie chaque texte source et chaque jeton ; alors 100 % des textes sont retrouvés mot pour mot dans leurs fragments et 0 jeton n'est non observable ou exclu |

## 11. Dépendances et intégrations
- SF-001-03 : jetons et implications ; SF-001-04 : chargement et contrôle du fichier ; SF-001-07 : sémantique d'évaluation et choix du niveau.
- SF-001-06 : critères IITT qui couvrent les mêmes enfants ; le niveau retenu est le plus élevé (SF-001-07).

## 12. Exclusions (hors périmètre)
- Signes nécessitant un examen ou une mesure : respiration rapide comptée, tirage observé par un soignant, pli cutané, température mesurée (D-020).
- Classifications PCIME de la toux, de l'oreille, de la malnutrition, de l'anémie, et grille du nourrisson de 1 semaine à 2 mois.
- Traitements et posologies de la PCIME (interdits en sortie, FR-102).

## 13. Questions ouvertes
| ID | Question | Bloquante | Proposition |
|---|---|---|---|
| Q-001-05-01 | Un enfant de 5 à 11 ans avec une fièvre seule obtient `consultation_48h` (aucune règle sourcée). Est-ce acceptable en zone d'endémie palustre ? | Non pour la démo ; oui avant usage réel | Question au clinicien (V7) ; ne rien ajouter sans source |
| Q-001-05-02 | Quelle source officielle fixe le risque de paludisme par district ? | Non pour la démo | DEP-005 ; valeur `eleve` en hypothèse, citée dans la réponse de démonstration |
| Q-001-05-03 | La correspondance « catégorie jaune PCIME → `consultation_24h` » convient-elle ? | Non pour la démo | Validation clinique (D-021) |

## 14. Sources
- `rules/triage_signes_alerte.v2.yaml` (règles PCIME-SGD-01 à 04, PCIME-MFTG-01, PCIME-J-01 à 03) ; `docs/quality/preuve-2026-11-04-generation-donnees.txt`.
- `INT-OMS-PCIME-MANUEL::0014`, `::0016`, `::0017`, `::0028`, `::0029`, `::0049`, `::0056`, `::0063` à `::0066`.
- `docs/product/decisions.md` (D-006, D-020, D-021, D-023, D-024 ; DEP-005).
