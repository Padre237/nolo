# SF-001-06 — Critères de l'outil IITT (12 ans et plus, moins de 12 ans) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des symptômes |
| Sous-fonctionnalité | SF-001-06 |
| Version | 1.0.0 |
| Statut | READY_FOR_DEV |
| Référence approuvée | Spécifications v1.3 (approuvées le 2026-11-03) : aucune exigence propre ; source décidée par D-012 et D-019 ; FR-101, FR-104 (SF-001-07) et FR-113 (SF-001-04) s'appliquent |
| Bloquant | Aucun pour la démonstration ; validation clinique (V7, D-020, D-021) et avis du juriste (D-022) avant tout usage hors démo |
| Dépend de | SF-001-03 (jetons), SF-001-04 (chargement), SF-001-07 (évaluation) |

## 1. Objectif métier et résultat attendu
Fournir au moteur les critères rouges et jaunes de l'outil de triage intégré inter-agences (IITT, OMS–CICR–MSF), version française, pour les personnes de 12 ans et plus et de moins de 12 ans, en ne gardant que ce qu'un non-professionnel peut observer sans appareil (D-020). Résultat observable : une personne de 58 ans avec une douleur thoracique apparue récemment obtient `urgence` immédiate ; un nourrisson de 5 jours avec n'importe quel symptôme obtient `urgence` immédiate ; aucun critère touchant à la vie sexuelle n'est demandé ni traité.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, jeton) |
|---|---|---|---|
| Moteur de triage (appareil, SF-001-07) | Évaluer les critères | Modifier un critère | Fichier de règles valide (SF-001-04) |
| Clinicien validateur | Valider la transcription et la correspondance D-021 | Ajouter un critère sans texte source | Nouvelle version approuvée |
| Juriste | Rendre l'avis demandé par D-022 (grossesse, priapisme, L13) | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-140 | Les critères d'outil `iitt_12_ans_plus` MUST s'appliquer aux tranches de `12_17_ans` à `plus_70_ans` et ceux d'outil `iitt_moins_12_ans` aux tranches de `moins_8_jours` à `5_11_ans`, sauf les critères dont la source fixe un âge : douleur abdominale ou thoracique aiguë après 50 ans (`51_70_ans`, `plus_70_ans`) ; brûlé de plus de 70 ans (`plus_70_ans`) ; brûlé de moins de 2 ans (`moins_8_jours` à `6_mois_2_ans`) ; nourrisson de moins de 8 jours (`moins_8_jours`) ; nourrisson de 8 jours à 6 mois (`8_jours_2_mois`, `2_6_mois`) ; grossesse avec critères rouges chez l'enfant (`5_11_ans`). | Règles `rules/triage_signes_alerte.v2.yaml` ; D-023 | Haute | UNDER_REVIEW |
| FR-141 | Les 13 critères rouges de 12 ans et plus (IITT12-R-01 à R-13) MUST produire `urgence`, priorité immédiate. | Règles `rules/…v2.yaml` ; D-021 | Haute | UNDER_REVIEW |
| FR-142 | Les 22 critères jaunes de 12 ans et plus (IITT12-J-01 à J-22) MUST produire `urgence`, priorité rapide. | Règles `rules/…v2.yaml` ; D-021 | Haute | UNDER_REVIEW |
| FR-143 | Les 16 critères rouges de moins de 12 ans (IITTM12-R-01 à R-16) MUST produire `urgence`, priorité immédiate. | Règles `rules/…v2.yaml` ; D-021 | Haute | UNDER_REVIEW |
| FR-144 | Les 16 critères jaunes de moins de 12 ans (IITTM12-J-01 à J-16) MUST produire `urgence`, priorité rapide. | Règles `rules/…v2.yaml` ; D-021 | Haute | UNDER_REVIEW |
| FR-145 | Les cinq composites MUST suivre la carte de référence et la page 1 de l'IITT : détresse respiratoire de l'adulte et de l'enfant (difficulté à respirer et au moins un signe de la carte), traumatisme à haut risque par le contexte (traumatisme et anticoagulants ou grossesse), grossesse avec au moins un des huit critères rouges, et « hypothermie ou fièvre » réduit à la fièvre (l'hypothermie demande une mesure). | Règles `rules/…v2.yaml` ; D-020 | Haute | UNDER_REVIEW |
| FR-146 | Les conditions et les composites MUST NOT utiliser `agression_sexuelle` (art. 48, L13), `priapisme` (D-022), un signe vital mesuré, `violence_agressivite`, `pli_cutane_lent` ou `hypothermie` ; le critère « Douleur testiculaire/scrotale aiguë ou priapisme » ne retient que la douleur ; les critères « 2 des signes suivants » sont évalués sur les seuls signes observables. | Décisions D-020, D-022 | Haute | UNDER_REVIEW |
| FR-147 | Chaque critère et chaque composite MUST porter `texte_source` (texte exact de la page concernée) et `fragments` ; chaque texte source MUST figurer mot pour mot dans au moins un de ses fragments ; la mention « (sans critères rouges) » est satisfaite par construction, un critère rouge l'emportant toujours. | Nouvelle [PROPOSITION] ; D-012 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-101, FR-104, FR-110 (SF-001-07) : niveau calculé par les règles ; quatre niveaux ; journal de chaque décision.
- FR-113 (SF-001-04) : règles sans `validateur_clinique` chargées en démonstration seulement, avec la mention.
- FR-111 (SF-001-02) : rien n'est demandé sur la vie sexuelle ; mentions spontanées retirées.
- FR-121, FR-123 (SF-001-03) : liste fermée qui rend chaque critère accessible ; fermeture des implications.
- FR-102 (SF-001-11) : aucun nom de maladie dans les sorties.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|

Aucune exigence non fonctionnelle propre (voir SF-001-04 et SF-001-07).

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, règle `rules/…`, décision) |
|---|---|---|
| BR-001-06-01 | Transcription à l'identique des critères observables sans appareil ; les libellés courants sont des traductions à valider | D-012, D-020 ; `INT-OMS-IITT-FR::0000` à `::0004` |
| BR-001-06-02 | Rouge → `urgence` immédiate ; jaune → `urgence` rapide, car l'IITT suppose une personne déjà arrivée aux urgences | D-021 (validation clinique requise) |
| BR-001-06-03 | L'IITT est un outil de triage en établissement ; l'étape 3 (signes vitaux) n'est pas utilisée ; limite déclarée dans chaque réponse de démonstration | Lacune L5 ; `policy.yaml > triage.mention_demo` |
| BR-001-06-04 | Le critère jaune « Agression sexuelle » n'est jamais demandé ni traité ; « priapisme » est exclu en attendant l'avis du juriste | Art. 48 (`CMR-LOI-2024-017::0048`) ; D-008, D-022 ; lacune L13 |
| BR-001-06-05 | La grossesse est une donnée de santé gardée sur l'appareil, jamais transmise ni journalisée | D-022 ; `CMR-LOI-2024-017::0005` |
| BR-001-06-06 | Le PDF de l'IITT n'indique pas de licence ; la version MC-IITT est sous CC BY-NC-SA 3.0 IGO : ne pas publier les PDF dans le dépôt avant vérification | `kb/sources.json` (`INT-OMS-IITT-FR`, `INT-OMS-MC-IITT-FR`) ; MT-001 (`.gitignore` de `kb/raw*`) |

## 7. Préconditions et postconditions
- Préconditions : fichier de règles valide et chargé (SF-001-04) ; référentiel 1.1.0 ; tranche déclarée.
- Postconditions (succès) : les critères satisfaits sont connus du moteur avec leur couleur et leurs fragments.
- Postconditions (échec) : fichier invalide → refusé par SF-001-04.

## 8. Scénarios
### 8.1 Nominal
1. Une personne de 58 ans (`51_70_ans`) coche « Douleur à la poitrine apparue récemment ».
2. IITT12-R-12 est satisfaite → `urgence` immédiate.
### 8.2 Alternatifs
- A1 — Adulte de 40 ans qui respire mal et ne peut plus parler sans aide → composite de détresse respiratoire → IITT12-R-03 → `urgence` immédiate.
- A2 — Adulte de 40 ans blessé et sous anticoagulants → IITT12-R-07 → `urgence` immédiate ; blessé sans autre élément → IITT12-J-17 → `urgence` rapide.
- A3 — Nourrisson de 5 jours qui tousse → IITTM12-R-09 → `urgence` immédiate ; à 3 mois → IITTM12-J-09 → `urgence` rapide ; à 8 mois, toux seule → `consultation_48h`.
- A4 — Enfant de 7 ans aux yeux enfoncés qui boit peu → IITTM12-R-06 (2 des 3 signes observables) → `urgence` immédiate.
### 8.3 Cas limites et exceptions
- L1 — Adulte de 30 ans, douleur thoracique aiguë seule → aucun critère → `consultation_48h` (fidèle à la source ; question Q-001-06-01).
- L2 — Adulte, fièvre et maux de tête → IITT12-R-06 → `urgence` immédiate (question Q-001-06-02).
- L3 — Brûlure : 80 ans → immédiate (R-08) ; 40 ans → rapide (J-17) ; 1 an → immédiate (IITTM12-R-11) ; 4 ans → rapide (IITTM12-J-11).
- L4 — Mention d'agression sexuelle : retirée par SF-001-02, aucun critère ne la traite ; l'écran d'urgence reste accessible (L13).

## 9. Validation des entrées et gestion des erreurs
| Entrée | Règle de validation | Erreur |
|---|---|---|
| Fichier de règles | Schéma `triage-regles/2` et règles de FR-146 et FR-147 | Refus du chargement (SF-001-04) |

## 10. Critères d'acceptation
| ID | Exigences | Critère (Étant donné / Quand / Alors, mesurable) |
|---|---|---|
| CA-001-06-01 | FR-140 | Étant donné le fichier de règles ; quand on évalue `douleur_thoracique_aigue` à 30 puis 58 ans, `brulure` à 40 puis 80 ans et à 4 ans puis 1 an, `toux` à 5 jours, 3 mois et 8 mois ; alors on obtient respectivement `consultation_48h`, immédiate ; rapide, immédiate ; rapide, immédiate ; immédiate, rapide, `consultation_48h` |
| CA-001-06-02 | FR-141, FR-142 | Étant donné les règles d'outil `iitt_12_ans_plus` ; quand on les compte et qu'on évalue un témoin minimal de chacune dans chacune de ses tranches ; alors 13 rouges et 22 jaunes, et chaque témoin donne au moins le niveau et la priorité de sa couleur |
| CA-001-06-03 | FR-143, FR-144 | Même critère pour `iitt_moins_12_ans` : 16 rouges et 16 jaunes, tous les témoins conformes |
| CA-001-06-04 | FR-145 | Étant donné les composites ; quand on évalue (adulte) `difficulte_respiratoire` seul puis avec `incapacite_parler_marcher`, (4 ans) `difficulte_respiratoire` avec `battement_ailes_nez_geignement`, (adulte) `traumatisme` avec `sous_anticoagulants`, (10 ans) `grossesse` avec `cephalee_intense` ; alors `consultation_48h`, puis immédiate, immédiate, immédiate, immédiate |
| CA-001-06-05 | FR-146 | Étant donné le fichier ; quand on cherche les jetons exclus dans toutes les conditions et tous les composites ; alors 0 occurrence ; et (7 ans) `yeux_creuses` + `boit_peu` donne `urgence` immédiate |
| CA-001-06-06 | FR-147 | Étant donné les 67 critères et les 5 composites ; quand on vérifie chaque texte source ; alors 100 % sont retrouvés mot pour mot dans leurs fragments |

## 11. Dépendances et intégrations
- SF-001-03 (jetons, liste fermée), SF-001-04 (chargement), SF-001-07 (évaluation), SF-001-02 (retrait des mentions), SF-001-12 (écran des numéros d'urgence, parade proposée pour L13).

## 12. Exclusions (hors périmètre)
- Étape 3 de l'IITT (signes vitaux), critères d'établissement, MC-IITT (support de formation, ingéré mais non transcrit).
- Toute transcription de « Agression sexuelle » et de « priapisme » (BR-001-06-04).

## 13. Questions ouvertes
| ID | Question | Bloquante | Proposition |
|---|---|---|---|
| Q-001-06-01 | Douleur thoracique aiguë seule avant 51 ans → `consultation_48h` : acceptable en auto-orientation ? | Non pour la démo | Clinicien (V7) ; aucune règle ajoutée sans source |
| Q-001-06-02 | Fièvre + maux de tête chez l'adulte → `urgence` immédiate (IITT12-R-06) : en zone d'endémie palustre, beaucoup d'adultes fébriles seront orientés vers les urgences. Acceptable ? | Non pour la démo | Clinicien ; garder la transcription fidèle en attendant |
| Q-001-06-03 | Enfant fébrile et agité → `urgence` immédiate (IITTM12-R-08) : acceptable ? | Non pour la démo | Clinicien |
| Q-001-06-04 | Difficulté à respirer seule (adulte ou enfant) → `consultation_48h`, faute de signe observable de la carte : acceptable ? | Non pour la démo | Clinicien ; la PCIME compte la respiration, ce qui n'est pas observable ici |
| Q-001-06-05 | Les critères « 2 des signes » réduits aux signes observables (IITT12-R-06 sans hypothermie, IITTM12-R-06 sans pli cutané) peuvent sous-classer. Acceptable ? | Non pour la démo | Clinicien |
| Q-001-06-06 | IITTM12-R-16 est limitée à `5_11_ans` mais IITTM12-J-15 (« Grossesse ») s'applique à toutes les tranches de moins de 12 ans : faut-il limiter J-15 à `5_11_ans` ? | Non | Clinicien et équipe ; lié à Q-001-03-03 |
| Q-001-06-07 | Parade pour L13 : afficher sur l'écran d'urgence une information neutre (numéros, structures) sans aucune question sur l'agression ? | Non | Juriste ; à porter par SF-001-12 |
| Q-001-06-08 | Licence du PDF IITT ? | Non pour la démo ; oui avant publication des PDF | Vérifier auprès de l'OMS (BR-001-06-06) |

## 14. Sources
- `rules/triage_signes_alerte.v2.yaml` (67 critères IITT, 5 composites, 5 exclusions) ; `docs/quality/preuve-2026-11-04-generation-donnees.txt`.
- `INT-OMS-IITT-FR::0000` à `::0004` (page 1 : 12 ans et plus ; page 2 : moins de 12 ans ; page 3 : carte de référence) ; `INT-OMS-MC-IITT-FR::0000`.
- `CMR-LOI-2024-017::0005`, `::0048` ; `docs/product/decisions.md` (D-008, D-012, D-019 à D-023) ; `docs/compliance/registre-lacunes.md` (L5, L13).
