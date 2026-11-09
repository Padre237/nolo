# SF-001-06 — Critères de l'outil IITT (12 ans et plus, moins de 12 ans) — Conception

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | SF-001-06 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-140 à FR-147 |
| ADR | ADR-005 (triage sur l'appareil, moteur monotone), ADR-008 (politique et règles versionnées) |

## 1. Comportement fonctionnel et workflow
Comme SF-001-05, cette sous-fonctionnalité possède un **contenu** : les 67 critères d'outil `iitt_12_ans_plus` et `iitt_moins_12_ans`, les 5 composites et les 5 exclusions du fichier `rules/triage_signes_alerte.v2.yaml`. Le chargement relève de SF-001-04 et l'évaluation de SF-001-07. Les tableaux du §4 sont produits à partir du fichier (empreinte SHA-256 `755d8627840394c6608f4c920772f6ce89d38ee95e9b4fe5d7facd809fc190bb`) pour la relecture clinique ; en cas d'écart, le fichier fait foi.

## 2. Interactions utilisateur et états de l'interface
| État | Déclencheur | Affichage (codes i18n) | Actions possibles |
|---|---|---|---|
| — | — | Aucun écran propre ; la raison affichée par SF-008-07 cite les libellés des jetons en cause | — |

## 3. Composants et responsabilités
| Composant | Fichier | Responsabilité |
|---|---|---|
| Critères IITT | `rules/triage_signes_alerte.v2.yaml` (sections `regles`, `composites`, `exclusions`) | Contenu sourcé |
| Génération | `tools/donnees/generer_regles_triage_v2.py` (existant) | Sérialise le contenu ; résout les fragments par page (`segment`) et par texte exact |
| Contrôle des données | `tools/donnees/verifier_regles_triage_v2.py` (existant) | Sources, scénarios, témoins, monotonie, accessibilité |

## 4. Modèle de données
Préfixe des fragments : `INT-OMS-IITT-FR`. Page 1 (12 ans et plus) : `::0000`, `::0001` ; page 2 (moins de 12 ans) : `::0001` à `::0003` ; page 3 (carte de référence) : `::0003`, `::0004`.

### 4.1 Critères
| ID | Couleur | Tranches | Condition | Texte source (IITT) | Fragments |
|---|---|---|---|---|---|
| IITT12-R-01 | rouge | 12 ans et plus | `inconscient` | « Inconscient » | `::0000` |
| IITT12-R-02 | rouge | 12 ans et plus | `stridor` | « Stridor » | `::0000` |
| IITT12-R-03 | rouge | 12 ans et plus | `detresse_respiratoire_adulte` ou `cyanose` | « Détresse respiratoire* ou cyanose centrale » | `::0000` |
| IITT12-R-04 | rouge | 12 ans et plus | `saignements_abondants` | « Saignements abondants » | `::0000` |
| IITT12-R-05 | rouge | 12 ans et plus | `convulsions_actives` | « Convulsions actives » | `::0000` |
| IITT12-R-06 | rouge | 12 ans et plus | 2 parmi `etat_conscience_altere`, `hypothermie_ou_fievre`, `raideur_nuque`, `cephalee` | « 2 des signes suivants : état de conscience altéré ; hypothermie ou fièvre ; raideur cervicale ; maux de tête » | `::0000` |
| IITT12-R-07 | rouge | 12 ans et plus | `traumatisme_haut_risque` ou `traumatisme_haut_risque_contexte` | « Traumatisme à haut risque* / RISQUE DE TRAUMATISMES SÉVÈRES » | `::0000`, `::0003` |
| IITT12-R-08 | rouge | `plus_70_ans` | `brulure` | « Âge du brûlé < 2 ans ou > 70 ans » | `::0003` |
| IITT12-R-09 | rouge | 12 ans et plus | `empoisonnement_exposition` | « Empoisonnement/ingestion ou exposition à des substances chimiques dangereuses* » | `::0000` |
| IITT12-R-10 | rouge | 12 ans et plus | `membre_menace` | « Risque d'amputation* / douloureux + au moins un des signes suivants : pâleur, faiblesse, engourdissement ou œdème massif après un traumatisme » | `::0000`, `::0003` |
| IITT12-R-11 | rouge | 12 ans et plus | `morsure_serpent` | « Morsure de serpent » | `::0000` |
| IITT12-R-12 | rouge | `51_70_ans`, `plus_70_ans` | `douleur_abdominale_aigue` ou `douleur_thoracique_aigue` | « Douleur abdominale ou thoracique aiguë (> 50 ans) » | `::0000` |
| IITT12-R-13 | rouge | 12 ans et plus | `critere_rouge_grossesse` | « GROSSESSE AVEC AU MOINS UN DES CRITÈRES SUIVANTS : » | `::0000` |
| IITT12-J-01 | jaune | 12 ans et plus | `gonflement_bouche_gorge_cou` | « Gonflement/masse de la bouche, la gorge ou le cou » | `::0000` |
| IITT12-J-02 | jaune | 12 ans et plus | `sifflement` | « Sifflement (sans critères rouges) » | `::0000` |
| IITT12-J-03 | jaune | 12 ans et plus | `vomit_tout` ou `diarrhee_continue` | « Vomit tout ou diarrhée continue » | `::0000` |
| IITT12-J-04 | jaune | 12 ans et plus | `incapacite_boire_se_nourrir` | « Incapacité à boire ou se nourrir » | `::0000` |
| IITT12-J-05 | jaune | 12 ans et plus | `paleur_severe` | « Pâleur sévère (sans critères rouges) » | `::0000` |
| IITT12-J-06 | jaune | 12 ans et plus | `saignements_continus` | « Saignements continus (sans critères rouges) » | `::0000` |
| IITT12-J-07 | jaune | 12 ans et plus | `evanouissement_recent` | « Évanouissement récent » | `::0000` |
| IITT12-J-08 | jaune | 12 ans et plus | `etat_conscience_altere` ou `agitation_irritabilite` | « État de conscience altéré ou agitation (sans critères rouges) » | `::0000` |
| IITT12-J-09 | jaune | 12 ans et plus | `alteration_etat_general` | « Altération de l'état général récent » | `::0000` |
| IITT12-J-10 | jaune | 12 ans et plus | `signes_neuro_focaux` | « Signes neurologiques focaux aigus » | `::0000` |
| IITT12-J-11 | jaune | 12 ans et plus | `troubles_visuels_aigus` | « Troubles visuels aigus » | `::0000` |
| IITT12-J-12 | jaune | 12 ans et plus | `douleur_severe` | « Douleur sévère (sans critères rouges) » | `::0000` |
| IITT12-J-13 | jaune | 12 ans et plus | `eruption_aggravation` | « Nouvelle éruption cutanée qui s'aggrave au fil des heures ou desquamation (sans critères rouges) » | `::0000` |
| IITT12-J-14 | jaune | 12 ans et plus | `deformation_membre` | « Déformation d'un membre importante et visible » | `::0000` |
| IITT12-J-15 | jaune | 12 ans et plus | `fracture_ouverte` | « Fracture ouverte » | `::0000`, `::0001` |
| IITT12-J-16 | jaune | 12 ans et plus | `luxation_suspectee` | « Suspicion de luxation » | `::0000`, `::0001` |
| IITT12-J-17 | jaune | 12 ans et plus | `traumatisme` ou `brulure` | « Autre traumatisme/brûlures (sans critères rouges) » | `::0000`, `::0001` |
| IITT12-J-18 | jaune | 12 ans et plus | `diagnostic_chirurgie_urgente` | « Diagnostic connu nécessitant une intervention chirurgicale d'urgence » | `::0000`, `::0001` |
| IITT12-J-19 | jaune | 12 ans et plus | `douleur_testiculaire` | « Douleur testiculaire/scrotale aiguë ou priapisme » | `::0000`, `::0001` |
| IITT12-J-20 | jaune | 12 ans et plus | `incapacite_uriner` | « Incapacité à uriner » | `::0000`, `::0001` |
| IITT12-J-21 | jaune | 12 ans et plus | `exposition_prophylaxie` | « Exposition nécessitant une prophylaxie d'urgence (ex. morsure d'animal, blessure par piqûre d'aiguille) » | `::0001` |
| IITT12-J-22 | jaune | 12 ans et plus | `grossesse_complications` | « Grossesse adressée pour complications » | `::0001` |
| IITTM12-R-01 | rouge | moins de 12 ans | `inconscient` | « Ne réagit pas » | `::0001` |
| IITTM12-R-02 | rouge | moins de 12 ans | `stridor` | « Stridor » | `::0001` |
| IITTM12-R-03 | rouge | moins de 12 ans | `detresse_respiratoire_enfant` ou `cyanose` | « Détresse respiratoire* ou cyanose centrale » | `::0001` |
| IITTM12-R-04 | rouge | moins de 12 ans | `saignements_abondants` | « Saignements abondants » | `::0001` |
| IITTM12-R-05 | rouge | moins de 12 ans | `extremites_froides` | « Extrémités froides » | `::0001` |
| IITTM12-R-06 | rouge | moins de 12 ans | 2 parmi `lethargie`, `yeux_creuses`, `boit_peu` | « 2 des signes suivants : léthargie ; yeux creusés ; pli cutané qui s'efface très lentement ; boit peu » | `::0001` |
| IITTM12-R-07 | rouge | moins de 12 ans | `convulsions_actives` | « Convulsions actives » | `::0001` |
| IITTM12-R-08 | rouge | moins de 12 ans | (`etat_conscience_altere` ou `agitation_irritabilite` ou `lethargie`) et (`raideur_nuque` ou `hypothermie_ou_fievre`) | « État de conscience altéré (confusion, agitation, irritabilité permanente ou léthargie) avec raideur de la nuque, hypothermie ou fièvre » | `::0001` |
| IITTM12-R-09 | rouge | `moins_8_jours` | au moins un symptôme saisi | « Nourrisson < 8 jours » | `::0001` |
| IITTM12-R-10 | rouge | moins de 12 ans | `traumatisme_haut_risque` ou `traumatisme_haut_risque_contexte` | « Traumatisme à haut risque* / RISQUE DE TRAUMATISMES SÉVÈRES » | `::0001`, `::0002`, `::0003` |
| IITTM12-R-11 | rouge | `moins_8_jours`, `8_jours_2_mois`, `2_6_mois`, `6_mois_2_ans` | `brulure` | « Âge du brûlé < 2 ans ou > 70 ans » | `::0003` |
| IITTM12-R-12 | rouge | moins de 12 ans | `membre_menace` | « Risque d'amputation* » | `::0001`, `::0002` |
| IITTM12-R-13 | rouge | moins de 12 ans | `douleur_testiculaire` | « Douleur testiculaire/scrotale aiguë ou priapisme » | `::0001`, `::0002` |
| IITTM12-R-14 | rouge | moins de 12 ans | `morsure_serpent` | « Morsure de serpent » | `::0001`, `::0002` |
| IITTM12-R-15 | rouge | moins de 12 ans | `empoisonnement_exposition` | « Empoisonnement/ingestion ou exposition à des substances chimiques dangereuses* » | `::0001`, `::0002` |
| IITTM12-R-16 | rouge | `5_11_ans` | `critere_rouge_grossesse` | « Grossesse + critères rouges chez l'adulte » | `::0001`, `::0002` |
| IITTM12-J-01 | jaune | moins de 12 ans | `gonflement_bouche_gorge_cou` | « Tout gonflement/masse de la bouche, la gorge ou le cou » | `::0002` |
| IITTM12-J-02 | jaune | moins de 12 ans | `sifflement` | « Sifflement (sans critères rouges) » | `::0002` |
| IITTM12-J-03 | jaune | moins de 12 ans | `incapacite_boire_se_nourrir` | « Incapacité à boire ou se nourrir » | `::0002` |
| IITTM12-J-04 | jaune | moins de 12 ans | `vomit_tout` | « Vomit tout » | `::0002` |
| IITTM12-J-05 | jaune | moins de 12 ans | `diarrhee_continue` | « Diarrhée continue » | `::0002` |
| IITTM12-J-06 | jaune | moins de 12 ans | `paleur_severe` | « Pâleur sévère (sans critères rouges) » | `::0002` |
| IITTM12-J-07 | jaune | moins de 12 ans | `agitation_irritabilite` ou `lethargie` | « Agitation, irritabilité permanente ou léthargie » | `::0002` |
| IITTM12-J-08 | jaune | moins de 12 ans | `douleur_severe` | « Douleur sévère » | `::0002` |
| IITTM12-J-09 | jaune | `8_jours_2_mois`, `2_6_mois` | au moins un symptôme saisi | « Tout nourrisson âgé de 8 jours à 6 mois » | `::0002` |
| IITTM12-J-10 | jaune | moins de 12 ans | `fonte_musculaire_severe` ou `oedeme_deux_pieds` | « Malnutrition avec fonte musculaire sévère visible OU œdème aux deux pieds » | `::0002` |
| IITTM12-J-11 | jaune | moins de 12 ans | `traumatisme` ou `brulure` | « Traumatisme/brûlures (sans critères rouges) » | `::0002` |
| IITTM12-J-12 | jaune | moins de 12 ans | `diagnostic_chirurgie_urgente` | « Diagnostic connu nécessitant une intervention chirurgicale d'urgence » | `::0002` |
| IITTM12-J-13 | jaune | moins de 12 ans | `eruption_aggravation` | « Nouvelle éruption cutanée qui s'aggrave au fil des heures ou desquamation (sans critères rouges) » | `::0002` |
| IITTM12-J-14 | jaune | moins de 12 ans | `exposition_prophylaxie` | « Exposition nécessitant une prophylaxie d'urgence (ex. morsure d'animal) » | `::0002` |
| IITTM12-J-15 | jaune | moins de 12 ans | `grossesse` | « Grossesse (sans critères rouges) » | `::0002` |
| IITTM12-J-16 | jaune | moins de 12 ans | `cephalee` | « Maux de tête (sans critères rouges) » | `::0002` |

### 4.2 Composites
| Composite | Condition | Texte source | Fragments | Note |
|---|---|---|---|---|
| `hypothermie_ou_fievre` | `fievre` | « hypothermie ou fièvre » | `::0000` | hypothermie exclue : mesure de température nécessaire |
| `detresse_respiratoire_adulte` | `difficulte_respiratoire` ; `respiration_tres_rapide_ou_lente` ou `incapacite_parler_marcher` ou `confusion_somnolence_agitation` ou `muscles_accessoires` | « Signes de détresse respiratoire — Adulte : » | `::0003` |  |
| `detresse_respiratoire_enfant` | `difficulte_respiratoire` ; `respiration_tres_rapide_ou_lente` ou `incapacite_parler_manger_teter` ou `battement_ailes_nez_geignement` ou `muscles_accessoires` | « Signes de détresse respiratoire — Enfant : » | `::0003` |  |
| `traumatisme_haut_risque_contexte` | `traumatisme` ; `sous_anticoagulants` ou `grossesse` | « Patient présentant un trouble de la coagulation ou sous anticoagulants / Grossesse » | `::0003` |  |
| `critere_rouge_grossesse` | `grossesse` ; `saignements_abondants` ou `douleur_abdominale_severe` ou `convulsions` ou `etat_conscience_altere` ou `cephalee_intense` ou `troubles_visuels_aigus` ou `accouchement_declenche` ou `traumatisme` | « GROSSESSE AVEC AU MOINS UN DES CRITÈRES SUIVANTS : » | `::0000` |  |

### 4.3 Exclusions
| Jeton | Motif | Lacune |
|---|---|---|
| `agression_sexuelle` | Art. 48 de la loi 2024/017 (vie sexuelle) ; lecture conservatoire D-008 | L13 |
| `priapisme` | Rattachement possible à la vie sexuelle : exclu en attente de l'avis du juriste (D-022) | L13 |
| `signes_vitaux_haut_risque` | Étape 3 de l'IITT : mesures (FC, FR, température, SpO2, AVPU) impossibles sans appareil ; non utilisées en auto-orientation | L5 |
| `violence_agressivite` | Critère d'établissement (comportement au service des urgences), sans objet en auto-orientation | — |
| `pli_cutane_lent` | Signe d'examen clinique ; la règle « 2 des signes » est appliquée sur les 3 signes observables | — |

Les critères « 2 des signes suivants » sont transcrits sur les seuls signes observables : IITT12-R-06 garde ses 4 signes, mais « hypothermie ou fièvre » n'y vaut que la fièvre ; IITTM12-R-06 passe de 4 à 3 signes (pli cutané retiré). Le critère « Douleur testiculaire/scrotale aiguë ou priapisme » (IITT12-J-19, IITTM12-R-13) ne retient que `douleur_testiculaire`.

## 5. Contrats d'interface
### 5.1 API
Aucune route propre ; le fichier est servi par `GET /api/v1/regles/triage` (SF-001-04).
### 5.2 Interfaces internes
Même contrat de lecture que SF-001-05 (§5.2) ; un composite est un atome de condition évalué récursivement par le moteur (SF-001-07).

## 6. Transitions d'état et logique métier
- Monotonie : toutes les conditions ne portent que sur la présence de jetons, de composites, sur la tranche et sur la durée ; ajouter un jeton ne peut pas abaisser le niveau (ADR-005 ; contrôle de propriété du vérificateur, 0 violation sur 5 000 tirages).
- « (sans critères rouges) » : satisfait par construction, puisque le niveau retenu est le plus élevé.
- Critères sans jeton propre (`symptome_present`) : IITTM12-R-09 et IITTM12-J-09 s'appliquent dès qu'un symptôme est saisi dans leur tranche.

## 7. Autorisation et sécurité
- Aucune donnée personnelle dans le fichier.
- Les jetons `grossesse`, `accouchement_declenche` et `grossesse_complications` (`sante_avis_juriste`) ne sont évalués que sur l'appareil (D-022).
- Aucun jeton exclu ne peut entrer dans une condition : le générateur s'arrête si une condition cite un jeton exclu ou non observable.

## 8. Intégrations externes
- Aucune.

## 9. Gestion des défaillances et reprise
| Défaillance | Comportement | Journal |
|---|---|---|
| Texte source introuvable sur la page attendue à la génération | Le générateur s'arrête (aucun fichier écrit) | Sortie de l'outil |
| Fichier invalide au chargement | Refusé par SF-001-04 | Événement technique |

## 10. Performance, passage à l'échelle, accessibilité
- 67 critères et 5 composites ; évaluation linéaire par SF-001-07.

## 11. Décisions
- ADR appliquées : ADR-005, ADR-008. Décisions : D-008, D-012, D-019, D-020, D-021, D-022, D-023.

## 12. Éléments de conception et couverture
| ID | Élément | Exigences couvertes |
|---|---|---|
| DES-001-06-01 | Tranches des critères, dont les six critères dépendant de l'âge | FR-140 |
| DES-001-06-02 | Critères rouges et jaunes de 12 ans et plus (tableau 4.1) | FR-141, FR-142 |
| DES-001-06-03 | Critères rouges et jaunes de moins de 12 ans (tableau 4.1) | FR-143, FR-144 |
| DES-001-06-04 | Composites (tableau 4.2) | FR-145 |
| DES-001-06-05 | Exclusions et critères réduits aux signes observables (tableau 4.3) | FR-146 |
| DES-001-06-06 | Textes sources exacts par page et contrôles de l'outillage | FR-147 |

## 13. Existant et écarts
| Élément existant | Fichier | État | Preuve | Correction |
|---|---|---|---|---|
| Critères IITT v2 | `rules/triage_signes_alerte.v2.yaml` | Générés le 2026-11-04 ; textes sources retrouvés, témoins et scénarios conformes avec l'évaluateur de référence | `docs/quality/preuve-2026-11-04-generation-donnees.txt` | — |
| Ancien fichier de règles | `kb/rules/triage_signes_alerte.yaml` | Écart : signes de l'adulte sans source, niveaux non conformes à FR-104 | Lecture du 2026-11-04 | Remplacé par la v2 (SF-001-04, MT-001) |
| Scénario 1 de la démonstration | Plan de démonstration | Écart : la douleur thoracique aiguë n'est un critère rouge qu'après 50 ans | Évaluateur de référence (scénarios 1 et 2) | Décrire une personne de 58 ans (proposition, README de F-001) |
