# SF-001-05 — Règles PCIME de l'enfant de 2 mois à 5 ans — Tests

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | SF-001-05 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Niveaux | Validation/limites, Intégration (moteur et règles), Régression |

## 1. Stratégie locale
- Les tests du produit s'exécutent contre le moteur de SF-001-07 (`node --test`) ; ils restent « Non exécuté » tant que ce moteur n'existe pas.
- L'évaluateur de **référence** de l'outillage (`tools/donnees/verifier_regles_triage_v2.py`) a contrôlé les **données** le 2026-11-04 : scénarios, témoins minimaux par règle (390/390), monotonie, sources. Preuve : `docs/quality/preuve-2026-11-04-generation-donnees.txt`. Les mêmes cas ont été recalculés le 2026-11-04 avec cet évaluateur pour vérifier les critères d'acceptation avant rédaction (15/15 cas SGD).

## 2. Cas de test

### TEST-001-05-01 — Tranches des règles PCIME
- Type : Validation/limites
- Exigences : FR-130
- Critères d'acceptation : CA-001-05-01
- Étant donné : le fichier de règles chargé
- Quand : on filtre les règles d'outil `pcime`, puis on évalue `incapable_de_boire_ou_teter` pour `8_jours_2_mois` et `5_11_ans`
- Alors : 8 règles, toutes de tranches `2_6_mois`, `6_mois_2_ans`, `2_5_ans` ; aucune règle `pcime` parmi les règles satisfaites pour les deux autres tranches
- Données : `rules/triage_signes_alerte.v2.yaml`
- Automatisation : `tests/js/regles_acceptation.test.mjs` › « TEST-001-05-01 : 8 règles PCIME, toutes sur 2_6_mois, 6_mois_2_ans, 2_5_ans » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`)

### TEST-001-05-02 — Signes généraux de danger
- Type : Intégration
- Exigences : FR-131
- Critères d'acceptation : CA-001-05-02
- Étant donné : chacune des 3 tranches PCIME
- Quand : on évalue séparément les 5 jetons `incapable_de_boire_ou_teter`, `vomit_tout`, `convulsions`, `lethargie`, `inconscient`
- Alors : `urgence`, priorité immédiate, dans 15 cas sur 15, avec une règle PCIME-SGD citée
- Données : tableau des 15 cas
- Automatisation : `tests/js/regles_acceptation.test.mjs` › « TEST-001-05-02 : chaque signe général de danger suffit (15 cas sur 15) » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`)

### TEST-001-05-03 — Fièvre et raideur de nuque
- Type : Intégration
- Exigences : FR-132
- Critères d'acceptation : CA-001-05-03
- Étant donné : un enfant de 3 ans (`2_5_ans`)
- Quand : on évalue `fievre` + `raideur_nuque`
- Alors : `urgence`, priorité immédiate, règle PCIME-MFTG-01
- Données : cas unique
- Automatisation : `tests/js/regles_acceptation.test.mjs` › « TEST-001-05-03 : fièvre et raideur de nuque à 3 ans → urgence immédiate (PCIME-MFTG-01) » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`)

### TEST-001-05-04 — Fièvre selon le risque de paludisme
- Type : Intégration
- Exigences : FR-133
- Critères d'acceptation : CA-001-05-04
- Étant donné : un enfant de 3 ans fébrile
- Quand : on évalue avec `risque_paludisme = eleve`, puis avec une copie du fichier où la valeur est `faible`
- Alors : `consultation_24h` (PCIME-J-01), puis `consultation_48h` (aucune règle)
- Données : fichier livré et copie modifiée en mémoire
- Automatisation : `tests/js/regles_acceptation.test.mjs` › « TEST-001-05-04 : fièvre seule — consultation_24h si risque de paludisme élevé, sinon consultation_48h » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`)

### TEST-001-05-05 — Diarrhée avec du sang
- Type : Intégration
- Exigences : FR-134
- Critères d'acceptation : CA-001-05-05
- Étant donné : un enfant de 3 ans
- Quand : on évalue `diarrhee` + `sang_dans_selles`, puis `diarrhee_avec_sang` seul
- Alors : `consultation_24h` (PCIME-J-02) dans les deux cas
- Données : référentiel 1.1.0
- Automatisation : `tests/js/regles_acceptation.test.mjs` › « TEST-001-05-05 : diarrhée avec sang, cochée séparément ou reconnue ensemble → PCIME-J-02 » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`)

### TEST-001-05-06 — Diarrhée persistante, seuil de 14 jours
- Type : Validation/limites
- Exigences : FR-135
- Critères d'acceptation : CA-001-05-06
- Étant donné : un enfant de 3 ans avec `diarrhee`
- Quand : la durée déclarée vaut 14, puis 13 jours
- Alors : `consultation_24h` (PCIME-J-03), puis `consultation_48h`
- Données : cas limites
- Automatisation : `tests/js/regles_acceptation.test.mjs` › « TEST-001-05-06 : diarrhée depuis 14 jours → PCIME-J-03 ; 13 jours → consultation_48h » (`node --test tests/js/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`)

### TEST-001-05-07 — Provenance et jetons des règles PCIME
- Type : Régression
- Exigences : FR-136
- Critères d'acceptation : CA-001-05-07
- Étant donné : le fichier de règles, le référentiel et `kb/kb_chunks.jsonl`
- Quand : on vérifie les champs obligatoires, les textes sources et les jetons des 8 règles
- Alors : 100 % des textes sources retrouvés mot pour mot dans leurs fragments ; 0 jeton non observable ou exclu
- Données : fichiers livrés
- Automatisation : `tests/regression/test_donnees_triage.py::test_regles_pcime_sourcees_et_jetons_utilisables`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

## 3. Couverture
| Exigence | Tests |
|---|---|
| FR-130 | TEST-001-05-01 |
| FR-131 | TEST-001-05-02 |
| FR-132 | TEST-001-05-03 |
| FR-133 | TEST-001-05-04 |
| FR-134 | TEST-001-05-05 |
| FR-135 | TEST-001-05-06 |
| FR-136 | TEST-001-05-07 |
