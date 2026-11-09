# SF-001-05 — Règles PCIME de l'enfant de 2 mois à 5 ans — Conception

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | SF-001-05 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-130 à FR-136 |
| ADR | ADR-005 (triage sur l'appareil, moteur monotone), ADR-008 (politique et règles versionnées) |

## 1. Comportement fonctionnel et workflow
Cette sous-fonctionnalité possède un **contenu** : les 8 règles d'outil `pcime` du fichier `rules/triage_signes_alerte.v2.yaml` (généré le 2026-11-04, statut UNDER_REVIEW). Elle n'a pas de code propre : le fichier est chargé et contrôlé par SF-001-04 et évalué par SF-001-07 ; la présente conception fixe le contenu, sa provenance et la façon de le vérifier.

## 2. Interactions utilisateur et états de l'interface
| État | Déclencheur | Affichage (codes i18n) | Actions possibles |
|---|---|---|---|
| — | — | Aucun écran propre ; la raison affichée par SF-008-07 cite les libellés des jetons en cause (BR-001-05-05) | — |

## 3. Composants et responsabilités
| Composant | Fichier | Responsabilité |
|---|---|---|
| Règles PCIME | `rules/triage_signes_alerte.v2.yaml` (section `regles`, `outil: pcime`) | Contenu sourcé |
| Paramètre de déploiement | même fichier, `parametres.risque_paludisme` | Valeur `eleve` (hypothèse, DEP-005) |
| Génération | `tools/donnees/generer_regles_triage_v2.py` (existant) | Sérialise le contenu, résout les fragments par recherche du texte exact |
| Contrôle des données | `tools/donnees/verifier_regles_triage_v2.py` (existant) | Sources, scénarios, témoins par règle, monotonie |

## 4. Modèle de données
Format `schema: triage-regles/2` (décrit dans l'en-tête du fichier, section `semantique`). Règles PCIME :

| ID | Couleur source | Condition | Niveau (D-021) | Texte source (extrait) | Fragments |
|---|---|---|---|---|---|
| PCIME-SGD-01 | `signe_general_danger` | `incapable_de_boire_ou_teter` | `urgence` immédiate | « L’enfant est-il capable de boire ou de téter ? » | `::0028`, `::0029` |
| PCIME-SGD-02 | `signe_general_danger` | `vomit_tout` | `urgence` immédiate | « L’enfant vomit-il tout ce qu’il avale ? » | `::0028`, `::0029` |
| PCIME-SGD-03 | `signe_general_danger` | `convulsions` | `urgence` immédiate | « L’enfant a-t-il des convulsions ? » | `::0028`, `::0029` |
| PCIME-SGD-04 | `signe_general_danger` | `lethargie` ou `inconscient` | `urgence` immédiate | « LÉTHARGIIQUE OU INCONSCIENT » (graphie de la source) | `::0029` et suivants |
| PCIME-MFTG-01 | `signe_general_danger` | `fievre` et `raideur_nuque` | `urgence` immédiate | « … présente un signe général de danger ou une raideur de nuque … » ; « Transférer d’URGENCE à l’hôpital » | `::0063` à `::0066` et suivants |
| PCIME-J-01 | `jaune_pcime` | `fievre` et `risque_paludisme = eleve` | `consultation_24h` | « il faut classer l’enfant qui a de la fièvre » ; « placez-le dans la catégorie jaune » | `::0063` |
| PCIME-J-02 | `jaune_pcime` | `diarrhee` et `sang_dans_selles` | `consultation_24h` | « du sang dans les selles dans la catégorie » | `::0049` |
| PCIME-J-03 | `jaune_pcime` | `diarrhee` et durée ≥ 14 jours | `consultation_24h` | « Si l’enfant a la diarrhée depuis 14 jours ou plus » | `::0049` |

Tranches de chaque règle : `2_6_mois`, `6_mois_2_ans`, `2_5_ans`. Fragments : préfixe `INT-OMS-PCIME-MANUEL`.

## 5. Contrats d'interface
### 5.1 API
Aucune route propre. Le fichier est servi dans le paquet de `GET /api/v1/regles/triage` (SF-001-04).
### 5.2 Interfaces internes
Contrat de lecture par le moteur (SF-001-07) : pour une règle `r`, `r.tranches` contient la tranche déclarée et `r.condition` est vraie sur l'ensemble fermé de jetons, la durée et les paramètres ; la couleur `r.couleur_source` donne le niveau par `correspondance`.

## 6. Transitions d'état et logique métier
- Sémantique (rappel, possédée par SF-001-07) : conditions monotones, niveau retenu = le plus élevé, implications fermées avant évaluation.
- Le paramètre `risque_paludisme` est lu dans le fichier de règles ; il ne dépend pas de la personne (aucune donnée de localisation n'entre dans la règle).

## 7. Autorisation et sécurité
- Le fichier est public (contenu OMS) ; aucune donnée personnelle.
- Mention de démonstration obligatoire tant que `validateur_clinique` est vide (FR-113, SF-001-04). Le libellé actuel de `policy.yaml > triage.mention_demo` ne cite que la PCIME : proposition de modification (README de F-001) pour citer aussi l'IITT.

## 8. Intégrations externes
- Aucune.

## 9. Gestion des défaillances et reprise
| Défaillance | Comportement | Journal |
|---|---|---|
| Texte source introuvable à la génération | Le générateur s'arrête (aucun fichier écrit) | Sortie de l'outil |
| Fichier invalide au chargement | Refusé par SF-001-04 | Événement technique |

## 10. Performance, passage à l'échelle, accessibilité
- 8 règles sur 75 ; aucun effet mesurable sur le temps d'évaluation (SF-001-07).

## 11. Décisions
- ADR appliquées : ADR-005, ADR-008. Décisions : D-006, D-020, D-021, D-023, D-024 ; dépendance DEP-005.

## 12. Éléments de conception et couverture
| ID | Élément | Exigences couvertes |
|---|---|---|
| DES-001-05-01 | Tranches PCIME des 8 règles | FR-130 |
| DES-001-05-02 | Règles SGD-01 à SGD-04 et MFTG-01 (couleur `signe_general_danger`) | FR-131, FR-132 |
| DES-001-05-03 | Règle J-01 conditionnée par `parametres.risque_paludisme` | FR-133 |
| DES-001-05-04 | Règles J-02 et J-03 (dysenterie, diarrhée persistante) et jeton dérivé | FR-134, FR-135 |
| DES-001-05-05 | Champs obligatoires, textes sources exacts, jetons utilisables ; contrôles de l'outillage | FR-136 |

## 13. Existant et écarts
| Élément existant | Fichier | État | Preuve | Correction |
|---|---|---|---|---|
| Règles PCIME v2 | `rules/triage_signes_alerte.v2.yaml` | Générées le 2026-11-04 ; 15/15 cas SGD, scénarios et témoins conformes avec l'évaluateur de référence | `docs/quality/preuve-2026-11-04-generation-donnees.txt` | — |
| Ancien fichier de règles | `kb/rules/triage_signes_alerte.yaml` | Écart : niveaux URGENCE, CONSULTATION_24H, CONSULTATION, SURVEILLANCE non conformes à FR-104 ; jetons absents du référentiel | Lecture du 2026-11-04 ; vérificateur, section 7 | Remplacé par la v2 (SF-001-04, MT-001) |
| Données synthétiques | `kb/data/synthetic/patients.csv` (colonne `triage_attendu`) | Écart : anciens niveaux | Lecture du 2026-11-04 | À régénérer avec les niveaux FR-104 (proposition, README de F-001) |
