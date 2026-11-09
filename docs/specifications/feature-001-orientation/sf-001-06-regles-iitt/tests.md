# SF-001-06 — Critères de l'outil IITT (12 ans et plus, moins de 12 ans) — Tests

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | SF-001-06 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Niveaux | Validation/limites, Intégration (moteur et règles), Sécurité/autorisation, Régression |

## 1. Stratégie locale
- Les tests du produit s'exécutent contre le moteur de SF-001-07 (`node --test`) et restent « Non exécuté » tant qu'il n'existe pas.
- Les critères d'acceptation ont été recalculés le 2026-11-04 avec l'évaluateur de **référence** de l'outillage avant rédaction ; le vérificateur des données (textes sources, 390 témoins, scénarios, monotonie, accessibilité) a réussi. Preuve : `docs/quality/preuve-2026-11-04-generation-donnees.txt`. Ces contrôles portent sur les données, pas sur le produit.

## 2. Cas de test

### TEST-001-06-01 — Critères dépendant de l'âge
- Type : Validation/limites
- Exigences : FR-140
- Critères d'acceptation : CA-001-06-01
- Étant donné : le fichier de règles chargé
- Quand : on évalue `douleur_thoracique_aigue` (30 et 58 ans), `brulure` (40 et 80 ans, 4 ans et 1 an), `toux` (5 jours, 3 mois, 8 mois)
- Alors : `consultation_48h` et immédiate ; rapide et immédiate ; rapide et immédiate ; immédiate, rapide et `consultation_48h`
- Données : 9 cas
- Automatisation : `tests/js/regles_iitt.test.mjs` (« âge »)
- Statut d'exécution : Non exécuté

### TEST-001-06-02 — Critères de 12 ans et plus
- Type : Intégration
- Exigences : FR-141, FR-142
- Critères d'acceptation : CA-001-06-02
- Étant donné : les règles d'outil `iitt_12_ans_plus`
- Quand : on les compte puis on évalue un témoin minimal par alternative et par tranche
- Alors : 13 rouges, 22 jaunes ; 100 % des témoins donnent au moins le niveau et la priorité de leur couleur
- Données : témoins générés depuis le fichier
- Automatisation : `tests/js/regles_iitt.test.mjs` (« 12 ans et plus »)
- Statut d'exécution : Non exécuté

### TEST-001-06-03 — Critères de moins de 12 ans
- Type : Intégration
- Exigences : FR-143, FR-144
- Critères d'acceptation : CA-001-06-03
- Étant donné : les règles d'outil `iitt_moins_12_ans`
- Quand : même procédure que TEST-001-06-02
- Alors : 16 rouges, 16 jaunes ; 100 % des témoins conformes
- Données : témoins générés depuis le fichier
- Automatisation : `tests/js/regles_iitt.test.mjs` (« moins de 12 ans »)
- Statut d'exécution : Non exécuté

### TEST-001-06-04 — Composites
- Type : Intégration
- Exigences : FR-145
- Critères d'acceptation : CA-001-06-04
- Étant donné : les composites
- Quand : on évalue les 5 cas de CA-001-06-04
- Alors : `consultation_48h`, puis `urgence` immédiate pour les 4 autres
- Données : 5 cas
- Automatisation : `tests/js/regles_iitt.test.mjs` (« composites »)
- Statut d'exécution : Non exécuté

### TEST-001-06-05 — Exclusions et critères réduits aux signes observables
- Type : Sécurité/autorisation
- Exigences : FR-146
- Critères d'acceptation : CA-001-06-05
- Étant donné : le fichier chargé
- Quand : on cherche `agression_sexuelle`, `priapisme`, `signes_vitaux_haut_risque`, `violence_agressivite`, `pli_cutane_lent`, `hypothermie` dans toutes les conditions et tous les composites, puis on évalue (7 ans) `yeux_creuses` + `boit_peu`
- Alors : 0 occurrence ; `urgence` immédiate (IITTM12-R-06)
- Données : fichier livré
- Automatisation : `tests/js/regles_iitt.test.mjs` (« exclusions »)
- Statut d'exécution : Non exécuté (absence des jetons exclus contrôlée le 2026-11-04 par le générateur de règles : réussi)

### TEST-001-06-06 — Provenance des critères IITT
- Type : Régression
- Exigences : FR-147, FR-146
- Critères d'acceptation : CA-001-06-06
- Étant donné : le fichier de règles et `kb/kb_chunks.jsonl`
- Quand : on vérifie les comptes, les textes sources et les exclusions
- Alors : 13/22/16/16 ; 100 % des textes sources des 67 critères et des 5 composites retrouvés mot pour mot ; 0 jeton exclu
- Données : fichiers livrés
- Automatisation : `tests/regression/test_donnees_triage.py::test_regles_iitt`
- Statut d'exécution : Non exécuté (contrôle équivalent des données exécuté le 2026-11-04 : 90 textes sources retrouvés pour 75 règles et 5 composites ; preuve `docs/quality/preuve-2026-11-04-generation-donnees.txt`)

## 3. Couverture
| Exigence | Tests |
|---|---|
| FR-140 | TEST-001-06-01 |
| FR-141 | TEST-001-06-02 |
| FR-142 | TEST-001-06-02 |
| FR-143 | TEST-001-06-03 |
| FR-144 | TEST-001-06-03 |
| FR-145 | TEST-001-06-04 |
| FR-146 | TEST-001-06-05, TEST-001-06-06 |
| FR-147 | TEST-001-06-06 |
