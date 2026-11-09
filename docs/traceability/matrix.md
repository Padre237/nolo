# Matrice de traçabilité

Générée par `python3 tools/trace.py` — ne pas modifier à la main.

Sous-fonctionnalités : 146 · Exigences possédées : 483 · Éléments de conception : 277 · Tâches : 280 · Tests : 415
Erreurs : 0 · Avertissements : 0

## Statut des dossiers

| Statut | Nombre |
|---|---|
| APPROVED | 4 |
| IN_PROGRESS | 1 |
| IN_TESTING | 53 |
| READY_FOR_DEV | 10 |
| UNDER_REVIEW | 78 |

## Exigence → conception → tâches → tests → implémentation → vérification

| Exigence | Sous-fonctionnalité | Statut | Conception | Tâches | Tests | Implémentation | Vérification |
|---|---|---|---|---|---|---|---|
| FR-101 | SF-001-07 | REMPLACÉE par FR-165 (règles v2, D-019) |  |  |  | Non commencé | 0/0 exécutés et réussis |
| FR-102 | SF-001-11 | REMPLACÉE par FR-190 et FR-191 (D-033 : pistes nommées en mode POC) |  |  |  | Non commencé | 0/0 exécutés et réussis |
| FR-103 | SF-001-03 | REMPLACÉE par FR-120 (D-018) |  |  |  | Non commencé | 0/0 exécutés et réussis |
| FR-104 | SF-001-07 | REMPLACÉE par FR-166 (D-026 : seul « urgence » est affiché) |  |  |  | Non commencé | 0/0 exécutés et réussis |
| FR-105 | SF-001-01 | UNDER_REVIEW | DES-001-01-03 | TASK-001-01-03 | TEST-001-01-05 | Fait (2026-11-09) — `app/tests/saisie.test.mjs` ; `erreurs` exporté ; limite de 600 caractères appliquée à la saisie | 1/1 exécutés et réussis |
| FR-106 | SF-008-01 | REMPLACÉE par FR-801 et FR-803 (D-028 : rien ne part sans consentement ; l'urgence reste locale) |  |  |  | Non commencé | 0/0 exécutés et réussis |
| FR-107 | SF-008-04 | REMPLACÉE par FR-831 et FR-832 (D-028) |  |  |  | Non commencé | 0/0 exécutés et réussis |
| FR-108 | SF-008-06 | UNDER_REVIEW | DES-008-06-01 | TASK-008-06-01 | TEST-008-06-01 | Non commencé | 0/1 exécutés et réussis |
| FR-109 | SF-008-07 | UNDER_REVIEW | DES-008-07-02 | TASK-008-07-02 | TEST-008-07-02 | Fait (2026-11-09) — `raisonIssue` sur urgence, pistes, confidentiel, hors champ et « Où aller » | 1/1 exécutés et réussis |
| FR-110 | SF-001-07 | UNDER_REVIEW | DES-001-07-02 | TASK-001-07-02 | TEST-001-07-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-111 | SF-001-02 | UNDER_REVIEW | DES-001-02-01 | TASK-001-02-01 | TEST-001-02-01 | Fait (2026-11-09) — `app/js/domain/envoi.js` | 1/1 exécutés et réussis |
| FR-112 | SF-001-08 | UNDER_REVIEW | DES-001-08-01 | TASK-001-08-01 | TEST-001-08-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-113 | SF-001-04 | UNDER_REVIEW | DES-001-04-02 | TASK-001-04-02 | TEST-001-04-01 | Fait (2026-11-09) — `empreinte_canonique` (`tools/demo/construire_paquet.py`), vérifiée par `chargerPaquet` (`src/client/ondevice/empreinte.mjs`) | 1/1 exécutés et réussis |
| FR-114 | SF-001-12 | UNDER_REVIEW | DES-001-12-02 | TASK-001-12-02 | TEST-001-12-01 | Fait (2026-11-09) — `numerosUrgence` (`app/js/domain/politique.js`) ; barre de sécurité, écran Urgence, onglet Sang | 1/1 exécutés et réussis |
| FR-120 | SF-001-03 | UNDER_REVIEW | DES-001-03-01 | TASK-001-03-01, TASK-001-03-05 | TEST-001-03-01, TEST-001-03-11 | Fait (2026-11-09) — `chargerPaquet` et `chargerReferentiel` (repli sur la version embarquée) dans `src/client/ondevice/referentiel.mjs` (nom du fichier livré par l'incrément D-025), Fait (2026-11-09) — `src/server/domain/referentiel_symptomes.py` (`charger_referentiel`, `valider_referentiel`, `filtrer_propositions`) | 2/2 exécutés et réussis |
| FR-121 | SF-001-03 | UNDER_REVIEW | DES-001-03-02 | TASK-001-03-02, TASK-001-03-07 | TEST-001-03-02, TEST-001-03-03, TEST-001-03-13 | Fait (2026-11-09) — `listeFermee` (`referentiel.mjs`), déjà livrée ; tests ajoutés, Fait (2026-11-09) — `tests/regression/test_donnees_triage.py` (génération dans un répertoire temporaire, vérificateur des règles) | 3/3 exécutés et réussis |
| FR-122 | SF-001-03 | UNDER_REVIEW | DES-001-03-03 | TASK-001-03-04 | TEST-001-03-05, TEST-001-03-14 | Fait (2026-11-09) — `normaliser`, `construireIndex`, `extraire` (`src/client/ondevice/extracteur_lexical.mjs`), déjà livrés ; parité de la normalisation avec Python testée | 2/2 exécutés et réussis |
| FR-123 | SF-001-03 | UNDER_REVIEW | DES-001-03-04 | TASK-001-03-03 | TEST-001-03-07 | Fait (2026-11-09) — `fermer` (`referentiel.mjs`), déjà livrée ; test existant rattaché | 1/1 exécutés et réussis |
| FR-124 | SF-001-03 | UNDER_REVIEW | DES-001-03-05 | TASK-001-03-01, TASK-001-03-05 | TEST-001-03-04, TEST-001-03-08 | Fait (2026-11-09) — `chargerPaquet` et `chargerReferentiel` (repli sur la version embarquée) dans `src/client/ondevice/referentiel.mjs` (nom du fichier livré par l'incrément D-025), Fait (2026-11-09) — `src/server/domain/referentiel_symptomes.py` (`charger_referentiel`, `valider_referentiel`, `filtrer_propositions`) | 2/2 exécutés et réussis |
| FR-125 | SF-001-03 | UNDER_REVIEW | DES-001-03-01 | TASK-001-03-05 | TEST-001-03-01 | Fait (2026-11-09) — `src/server/domain/referentiel_symptomes.py` (`charger_referentiel`, `valider_referentiel`, `filtrer_propositions`) | 1/1 exécutés et réussis |
| FR-126 | SF-001-03 | UNDER_REVIEW | DES-001-03-06 | TASK-001-03-06 | TEST-001-03-09, TEST-001-03-10, TEST-001-03-11 | Fait (2026-11-09) — `src/server/agents/triage.py`, `src/server/api/orientation.py`, `src/server/api/schemas/orientation.py` ; erreurs E-VAL-001, -004, -005, E-MODE-001, E-CONF-003, E-CONF-001, E-INDISP-001 | 3/3 exécutés et réussis |
| FR-127 | SF-001-03 | UNDER_REVIEW | DES-001-03-07 | TASK-001-03-07 | TEST-001-03-12 | Fait (2026-11-09) — `tests/regression/test_donnees_triage.py` (génération dans un répertoire temporaire, vérificateur des règles) | 1/1 exécutés et réussis |
| FR-130 | SF-001-05 | UNDER_REVIEW | DES-001-05-01 | TASK-001-05-02 | TEST-001-05-01 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (moteur du produit) | 1/1 exécutés et réussis |
| FR-131 | SF-001-05 | UNDER_REVIEW | DES-001-05-02 | TASK-001-05-01, TASK-001-05-02 | TEST-001-05-02 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (moteur du produit), À faire | 1/1 exécutés et réussis |
| FR-132 | SF-001-05 | UNDER_REVIEW | DES-001-05-02 | TASK-001-05-01, TASK-001-05-02 | TEST-001-05-03 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (moteur du produit), À faire | 1/1 exécutés et réussis |
| FR-133 | SF-001-05 | UNDER_REVIEW | DES-001-05-03 | TASK-001-05-01, TASK-001-05-02 | TEST-001-05-04 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (moteur du produit), À faire | 1/1 exécutés et réussis |
| FR-134 | SF-001-05 | UNDER_REVIEW | DES-001-05-04 | TASK-001-05-01, TASK-001-05-02 | TEST-001-05-05 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (moteur du produit), À faire | 1/1 exécutés et réussis |
| FR-135 | SF-001-05 | UNDER_REVIEW | DES-001-05-04 | TASK-001-05-01, TASK-001-05-02 | TEST-001-05-06 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (moteur du produit), À faire | 1/1 exécutés et réussis |
| FR-136 | SF-001-05 | UNDER_REVIEW | DES-001-05-05 | TASK-001-05-03 | TEST-001-05-07 | Fait (2026-11-09) — `tests/regression/test_donnees_triage.py` (textes sources, jetons utilisables) | 1/1 exécutés et réussis |
| FR-140 | SF-001-06 | UNDER_REVIEW | DES-001-06-01 | TASK-001-06-01, TASK-001-06-03 | TEST-001-06-01 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (témoins par alternative et par tranche), À faire | 1/1 exécutés et réussis |
| FR-141 | SF-001-06 | UNDER_REVIEW | DES-001-06-02 | TASK-001-06-01, TASK-001-06-03 | TEST-001-06-02 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (témoins par alternative et par tranche), À faire | 1/1 exécutés et réussis |
| FR-142 | SF-001-06 | UNDER_REVIEW | DES-001-06-02 | TASK-001-06-01, TASK-001-06-03 | TEST-001-06-02 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (témoins par alternative et par tranche), À faire | 1/1 exécutés et réussis |
| FR-143 | SF-001-06 | UNDER_REVIEW | DES-001-06-03 | TASK-001-06-01, TASK-001-06-03 | TEST-001-06-03 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (témoins par alternative et par tranche), À faire | 1/1 exécutés et réussis |
| FR-144 | SF-001-06 | UNDER_REVIEW | DES-001-06-03 | TASK-001-06-01, TASK-001-06-03 | TEST-001-06-03 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (témoins par alternative et par tranche), À faire | 1/1 exécutés et réussis |
| FR-145 | SF-001-06 | UNDER_REVIEW | DES-001-06-04 | TASK-001-06-01, TASK-001-06-03 | TEST-001-06-04 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (témoins par alternative et par tranche), À faire | 1/1 exécutés et réussis |
| FR-146 | SF-001-06 | UNDER_REVIEW | DES-001-06-05 | TASK-001-06-01, TASK-001-06-02, TASK-001-06-03, TASK-001-06-04 | TEST-001-06-05, TEST-001-06-06 | Fait (2026-11-09) — `tests/js/regles_acceptation.test.mjs` (témoins par alternative et par tranche), Fait (2026-11-09) — `tests/regression/test_donnees_triage.py` (comptes 13/22/16/16, textes sources, exclusions), À faire | 2/2 exécutés et réussis |
| FR-147 | SF-001-06 | UNDER_REVIEW | DES-001-06-06 | TASK-001-06-04 | TEST-001-06-06 | Fait (2026-11-09) — `tests/regression/test_donnees_triage.py` (comptes 13/22/16/16, textes sources, exclusions) | 1/1 exécutés et réussis |
| FR-150 | SF-001-01 | UNDER_REVIEW | DES-001-01-01 | TASK-001-01-01 | TEST-001-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-151 | SF-001-01 | UNDER_REVIEW | DES-001-01-02 | TASK-001-01-02, TASK-001-01-03 | TEST-001-01-02 | Fait (2026-11-09) — `app/tests/saisie.test.mjs` ; `erreurs` exporté ; limite de 600 caractères appliquée à la saisie, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-152 | SF-001-01 | UNDER_REVIEW | DES-001-01-01 | TASK-001-01-01, TASK-001-01-03 | TEST-001-01-03 | Fait (2026-11-09) — `app/tests/saisie.test.mjs` ; `erreurs` exporté ; limite de 600 caractères appliquée à la saisie, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-153 | SF-001-01 | UNDER_REVIEW | DES-001-01-01 | TASK-001-01-01, TASK-001-01-03 | TEST-001-01-04 | Fait (2026-11-09) — `app/tests/saisie.test.mjs` ; `erreurs` exporté ; limite de 600 caractères appliquée à la saisie, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-154 | SF-001-01 | UNDER_REVIEW | DES-001-01-03 | TASK-001-01-01, TASK-001-01-03 | TEST-001-01-05 | Fait (2026-11-09) — `app/tests/saisie.test.mjs` ; `erreurs` exporté ; limite de 600 caractères appliquée à la saisie, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-155 | SF-001-02 | UNDER_REVIEW | DES-001-02-01 | TASK-001-02-01 | TEST-001-02-01 | Fait (2026-11-09) — `app/js/domain/envoi.js` | 1/1 exécutés et réussis |
| FR-156 | SF-001-02 | UNDER_REVIEW | DES-001-02-02 | TASK-001-02-02 | TEST-001-02-02 | Fait (2026-11-09) — `app/tests/saisie.test.mjs` | 1/1 exécutés et réussis |
| FR-160 | SF-001-04 | UNDER_REVIEW | DES-001-04-01 | TASK-001-04-01 | TEST-001-04-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-161 | SF-001-04 | UNDER_REVIEW | DES-001-04-02 | TASK-001-04-02 | TEST-001-04-03 | Fait (2026-11-09) — `empreinte_canonique` (`tools/demo/construire_paquet.py`), vérifiée par `chargerPaquet` (`src/client/ondevice/empreinte.mjs`) | 1/1 exécutés et réussis |
| FR-165 | SF-001-07 | UNDER_REVIEW | DES-001-07-01 | TASK-001-07-01 | TEST-001-07-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-166 | SF-001-07 | UNDER_REVIEW | DES-001-07-03 | TASK-001-07-03 | TEST-001-07-02 | Fait (2026-11-09) — `app/js/domain/triage.js`, copie versionnée `app/js/vendor/` (`tools/maj_moteur_nolo.py`), `analyser(…, { moteur })`, trace avec la règle citée | 1/1 exécutés et réussis |
| FR-167 | SF-001-07 | UNDER_REVIEW | DES-001-07-01 | TASK-001-07-01 | TEST-001-07-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-168 | SF-001-07 | UNDER_REVIEW | DES-001-07-03 | TASK-001-07-03 | TEST-001-07-05 | Fait (2026-11-09) — `app/js/domain/triage.js`, copie versionnée `app/js/vendor/` (`tools/maj_moteur_nolo.py`), `analyser(…, { moteur })`, trace avec la règle citée | 1/1 exécutés et réussis |
| FR-175 | SF-001-08 | UNDER_REVIEW | DES-001-08-01 | TASK-001-08-01 | TEST-001-08-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-180 | SF-001-09 | UNDER_REVIEW | DES-001-09-01 | TASK-001-09-01 | TEST-001-09-01 | Non commencé | 0/1 exécutés et réussis |
| FR-181 | SF-001-09 | UNDER_REVIEW | DES-001-09-01 | TASK-001-09-01 | TEST-001-09-02 | Non commencé | 0/1 exécutés et réussis |
| FR-182 | SF-001-09 | UNDER_REVIEW | DES-001-09-02 | TASK-001-09-02 | TEST-001-09-03 | Fait (2026-11-09) — `lienSoignant` sur les cinq écrans de résultat (appel du 119 sur l'écran Urgence) | 1/1 exécutés et réussis |
| FR-185 | SF-001-10 | UNDER_REVIEW | DES-001-10-01 | TASK-001-10-01 | TEST-001-10-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-186 | SF-001-10 | UNDER_REVIEW | DES-001-10-02 | TASK-001-10-01 | TEST-001-10-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-187 | SF-001-10 | UNDER_REVIEW | DES-001-10-02 | TASK-001-10-01 | TEST-001-10-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-188 | SF-001-10 | UNDER_REVIEW | DES-001-10-03 | TASK-001-10-02 | TEST-001-10-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-189 | SF-001-10 | UNDER_REVIEW | DES-001-10-03 | TASK-001-10-02 | TEST-001-10-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-190 | SF-001-11 | UNDER_REVIEW | DES-001-11-01 | TASK-001-11-01, TASK-001-11-02 | TEST-001-11-01 | Fait (2026-11-09) — `app/tests/saisie.test.mjs`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-191 | SF-001-11 | UNDER_REVIEW | DES-001-11-02 | TASK-001-11-01 | TEST-001-11-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-192 | SF-001-11 | UNDER_REVIEW | DES-001-11-01 | TASK-001-11-01 | TEST-001-11-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-195 | SF-001-12 | UNDER_REVIEW | DES-001-12-01 | TASK-001-12-01 | TEST-001-12-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-196 | SF-001-12 | UNDER_REVIEW | DES-001-12-02 | TASK-001-12-02 | TEST-001-12-01 | Fait (2026-11-09) — `numerosUrgence` (`app/js/domain/politique.js`) ; barre de sécurité, écran Urgence, onglet Sang | 1/1 exécutés et réussis |
| FR-201 | SF-002-01 | UNDER_REVIEW | DES-002-01-01 | TASK-002-01-01 | TEST-002-01-01 | Fait (2026-11-09) — `preparerEnvoi` : exactement codes, aire, semaine ISO, tranche d'âge | 1/1 exécutés et réussis |
| FR-202 | SF-002-02 | UNDER_REVIEW | DES-002-02-01 | TASK-002-02-01 | TEST-002-02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-203 | SF-002-03 | UNDER_REVIEW | DES-002-03-02 | TASK-002-03-02 | TEST-002-03-02 | Fait (2026-11-09) — `definitionSc` ; bloc « Définition officielle » de la console | 1/1 exécutés et réussis |
| FR-204 | SF-002-04 | UNDER_REVIEW | DES-002-04-01, DES-002-04-02 | TASK-002-04-01, TASK-002-04-02 | TEST-002-04-03, TEST-002-04-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/2 exécutés et réussis |
| FR-205 | SF-002-05 | UNDER_REVIEW | DES-002-05-01 | TASK-002-05-01 | TEST-002-05-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-206 | SF-002-07 | UNDER_REVIEW | DES-002-07-01 | TASK-002-07-01 | TEST-002-07-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-207 | SF-002-09 | UNDER_REVIEW | DES-002-09-01, DES-002-09-02 | TASK-002-09-01 | TEST-002-09-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-208 | SF-002-08 | UNDER_REVIEW | DES-002-08-01 | TASK-002-08-01 | TEST-002-08-01 | Non commencé | 0/1 exécutés et réussis |
| FR-209 | SF-002-10 | UNDER_REVIEW | DES-002-10-01 | TASK-002-10-01 | TEST-002-10-01 | Non commencé | 0/1 exécutés et réussis |
| FR-220 | SF-002-01 | UNDER_REVIEW | DES-002-01-01 | TASK-002-01-01 | TEST-002-01-01 | Fait (2026-11-09) — `preparerEnvoi` : exactement codes, aire, semaine ISO, tranche d'âge | 1/1 exécutés et réussis |
| FR-221 | SF-002-01 | UNDER_REVIEW | DES-002-01-02 | TASK-002-01-02 | TEST-002-01-02 | Fait (2026-11-09) — `dedupliquer` (`src/server/domain/surveillance.py`), appliquée par `agreger` | 1/1 exécutés et réussis |
| FR-222 | SF-002-01 | UNDER_REVIEW | DES-002-01-03 | TASK-002-01-03 | TEST-002-01-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-225 | SF-002-02 | UNDER_REVIEW | DES-002-02-01, DES-002-02-02 | TASK-002-02-01 | TEST-002-02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-226 | SF-002-02 | UNDER_REVIEW | DES-002-02-01 | TASK-002-02-01 | TEST-002-02-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-230 | SF-002-03 | UNDER_REVIEW | DES-002-03-01 | TASK-002-03-01 | TEST-002-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-231 | SF-002-03 | UNDER_REVIEW | DES-002-03-01 | TASK-002-03-01 | TEST-002-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-232 | SF-002-03 | UNDER_REVIEW | DES-002-03-01 | TASK-002-03-01 | TEST-002-03-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-237 | SF-002-04 | UNDER_REVIEW | DES-002-04-01 | TASK-002-04-01 | TEST-002-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-238 | SF-002-04 | UNDER_REVIEW | DES-002-04-01 | TASK-002-04-01 | TEST-002-04-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-239 | SF-002-04 | UNDER_REVIEW | DES-002-04-01 | TASK-002-04-01 | TEST-002-04-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-243 | SF-002-05 | UNDER_REVIEW | DES-002-05-02 | TASK-002-05-02 | TEST-002-05-02 | Fait (2026-11-09) — `echeance`, `heuresDepuisAlerte` ; ligne d'échéance de la console | 1/1 exécutés et réussis |
| FR-246 | SF-002-06 | UNDER_REVIEW | DES-002-06-01 | TASK-002-06-01 | TEST-002-06-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-247 | SF-002-06 | UNDER_REVIEW | DES-002-06-01 | TASK-002-06-01 | TEST-002-06-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-248 | SF-002-06 | UNDER_REVIEW | DES-002-06-01 | TASK-002-06-01 | TEST-002-06-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-251 | SF-002-07 | UNDER_REVIEW | DES-002-07-02 | TASK-002-07-02 | TEST-002-07-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-255 | SF-002-08 | UNDER_REVIEW | DES-002-08-01 | TASK-002-08-01 | TEST-002-08-02 | Non commencé | 0/1 exécutés et réussis |
| FR-258 | SF-002-09 | UNDER_REVIEW | DES-002-09-01 | TASK-002-09-01 | TEST-002-09-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-301 | SF-003-01 | UNDER_REVIEW | DES-003-01-01 | TASK-003-01-01 | TEST-003-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-302 | SF-003-02 | UNDER_REVIEW | DES-003-02-01 | TASK-003-02-01, TASK-003-02-02 | TEST-003-02-01 | Fait (2026-11-09) — `parPaliers` dans `app/js/domain/facilities.js`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-303 | SF-003-02 | UNDER_REVIEW | DES-003-02-01 | TASK-003-02-01 | TEST-003-02-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-304 | SF-003-01 | REMPLACÉE par FR-320 (D-033 : exception du module POC) | DES-003-01-02 |  | TEST-003-01-02 | Non commencé | 0/1 exécutés et réussis |
| FR-305 | SF-003-03 | UNDER_REVIEW | DES-003-03-01 | TASK-003-03-01 | TEST-003-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-306 | SF-013-01 | REMPLACÉE par FR-195 (barre de sécurité avec appels) et FR-1301 | DES-013-01-02 | TASK-013-01-02 | TEST-013-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-307 | SF-003-02 | UNDER_REVIEW | DES-003-02-03 | TASK-003-02-04 | TEST-003-02-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-308 | SF-003-03 | UNDER_REVIEW | DES-003-03-01 | TASK-003-03-01 | TEST-003-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-320 | SF-003-01 | UNDER_REVIEW | DES-003-01-02 | TASK-003-01-01 | TEST-003-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-321 | SF-003-01 | UNDER_REVIEW | DES-003-01-01 | TASK-003-01-01 | TEST-003-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-322 | SF-003-01 | UNDER_REVIEW | DES-003-01-03 | TASK-003-01-02 | TEST-003-01-03 | Fait (2026-11-09) — `resoudreSpecialite` ; champ libre de l'onglet Service | 1/1 exécutés et réussis |
| FR-323 | SF-003-02 | UNDER_REVIEW | DES-003-02-02 | TASK-003-02-03 | TEST-003-02-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-324 | SF-003-02 | UNDER_REVIEW | DES-003-02-02 | TASK-003-02-03 | TEST-003-02-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-325 | SF-003-03 | UNDER_REVIEW | DES-003-03-02 | TASK-003-03-01 | TEST-003-03-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-326 | SF-003-04 | UNDER_REVIEW | DES-003-04-01 | TASK-003-04-01, TASK-003-04-02 | TEST-003-04-01 | Fait (2026-11-09) — `app/tests/recherche.test.mjs`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-327 | SF-003-04 | UNDER_REVIEW | DES-003-04-02 | TASK-003-04-01 | TEST-003-04-01, TEST-003-04-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/2 exécutés et réussis |
| FR-401 | SF-010-02 | UNDER_REVIEW | DES-010-02-03 | TASK-010-02-03 | TEST-010-02-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-402 | SF-004-02 | UNDER_REVIEW | DES-004-02-01 | TASK-004-02-01 | TEST-004-02-01, TEST-004-02-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/2 exécutés et réussis |
| FR-403 | SF-004-02 | REMPLACÉE par FR-422 (mention selon la DCI) |  |  | TEST-004-02-02 | Non commencé | 0/1 exécutés et réussis |
| FR-404 | SF-004-03 | UNDER_REVIEW | DES-004-03-01, DES-004-03-02 | TASK-004-03-01 | TEST-004-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-405 | SF-004-04 | UNDER_REVIEW | DES-004-04-01 | TASK-004-04-01 | TEST-004-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-406 | SF-004-02 | UNDER_REVIEW | DES-004-02-01 | TASK-004-02-01, TASK-004-02-03 | TEST-004-02-03 | Fait (2026-11-09) — section « Classement des résultats » des conditions (FR et EN), Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-407 | SF-004-01 | UNDER_REVIEW | DES-004-01-01 | TASK-004-01-01, TASK-004-01-02 | TEST-004-01-01 | Fait (2026-11-09) — `filtrerDci` (art. 75 exclu, 8 au plus) et ses tests, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-408 | SF-004-04 | UNDER_REVIEW | DES-004-04-01, DES-004-04-02 | TASK-004-04-01, TASK-004-04-02 | TEST-004-04-01, TEST-004-04-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/2 exécutés et réussis |
| FR-420 | SF-004-01 | UNDER_REVIEW | DES-004-01-01 | TASK-004-01-01, TASK-004-01-02 | TEST-004-01-03 | Fait (2026-11-09) — `filtrerDci` (art. 75 exclu, 8 au plus) et ses tests, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-421 | SF-004-01 | UNDER_REVIEW | DES-004-01-02 | TASK-004-01-01, TASK-004-01-02 | TEST-004-01-02 | Fait (2026-11-09) — `filtrerDci` (art. 75 exclu, 8 au plus) et ses tests, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-422 | SF-004-02 | UNDER_REVIEW | DES-004-02-02 | TASK-004-02-02 | TEST-004-02-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-423 | SF-004-02 | UNDER_REVIEW | DES-004-02-01 | TASK-004-02-01 | TEST-004-02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-424 | SF-004-02 | UNDER_REVIEW | DES-004-02-02 | TASK-004-02-02 | TEST-004-02-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-425 | SF-004-03 | UNDER_REVIEW | DES-004-03-01 | TASK-004-03-01 | TEST-004-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-426 | SF-004-04 | UNDER_REVIEW | DES-004-04-01 | TASK-004-04-01 | TEST-004-04-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-501 | SF-010-03 | UNDER_REVIEW | DES-010-03-01 | TASK-010-03-01 | TEST-010-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-502 | SF-005-01 | UNDER_REVIEW | DES-005-01-01 | TASK-005-01-01 | TEST-005-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-503 | SF-005-01 | UNDER_REVIEW | DES-005-01-02 | TASK-005-01-01 | TEST-005-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-504 | SF-005-02 | UNDER_REVIEW | DES-005-02-01 | TASK-005-02-01 | TEST-005-02-01 | Fait (2026-11-09) — `chercherSang` : majorité des banques déclarantes en rupture | 1/1 exécutés et réussis |
| FR-505 | SF-005-03 | UNDER_REVIEW | DES-005-03-01 | TASK-005-03-01 | TEST-005-03-01 | Fait (2026-11-09) — clé `recherche.sangUrgence`, numéro lu dans la politique | 1/1 exécutés et réussis |
| FR-520 | SF-005-01 | UNDER_REVIEW | DES-005-01-01 | TASK-005-01-01, TASK-005-01-02 | TEST-005-01-01 | Fait (2026-11-09) — `app/tests/recherche.test.mjs`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-521 | SF-005-01 | UNDER_REVIEW | DES-005-01-02 | TASK-005-01-01 | TEST-005-01-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-522 | SF-005-03 | UNDER_REVIEW | DES-005-03-01 | TASK-005-03-01 | TEST-005-03-01 | Fait (2026-11-09) — clé `recherche.sangUrgence`, numéro lu dans la politique | 1/1 exécutés et réussis |
| FR-601 | SF-006-01 | UNDER_REVIEW | DES-006-01-01 | TASK-006-01-02 | TEST-006-01-01 | Fait (2026-11-09) — quatre choix (`recherche.choix.*`), messages d'ordonnance et de revue humaine | 1/1 exécutés et réussis |
| FR-602 | SF-006-01 | UNDER_REVIEW | DES-006-01-02 | TASK-006-01-03 | TEST-006-01-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-603 | SF-006-01 | UNDER_REVIEW | DES-006-01-02 | TASK-006-01-03 | TEST-006-01-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-604 | SF-006-02 | UNDER_REVIEW | DES-006-02-01 | TASK-006-02-01, TASK-006-02-02 | TEST-006-02-01, TEST-006-02-02 | Fait (2026-11-09) — `scoreFiabilite` ; affichage « Déclarations fiables à … % sur … vérifications », Fait (code existant, rétro-spécifié le 2026-11-09) | 2/2 exécutés et réussis |
| FR-605 | SF-006-03 | UNDER_REVIEW | DES-006-03-01 | TASK-006-03-01, TASK-006-03-02 | TEST-006-03-01, TEST-006-03-02 | Fait (2026-11-09) — `departager` ; tri des pharmacies dans `chercherMedicament`, Fait (code existant, rétro-spécifié le 2026-11-09) | 2/2 exécutés et réussis |
| FR-606 | SF-006-04 | UNDER_REVIEW | DES-006-04-01 | TASK-006-04-01, TASK-006-04-02 | TEST-006-04-01, TEST-006-04-02 | Fait (2026-11-09) — gel dans `scoreFiabilite` ; rafale fictive sur « ph-marche », Fait (code existant, rétro-spécifié le 2026-11-09) | 2/2 exécutés et réussis |
| FR-607 | SF-006-06 | UNDER_REVIEW | DES-006-06-01 | TASK-006-06-01 | TEST-006-06-01 | Non commencé | 0/1 exécutés et réussis |
| FR-608 | SF-006-01 | UNDER_REVIEW | DES-006-01-02 | TASK-006-01-03 | TEST-006-01-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-609 | SF-006-08 | UNDER_REVIEW | DES-006-08-01 | TASK-006-08-01 | TEST-006-08-01 | Partiel (code existant incomplet, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-610 | SF-006-05 | UNDER_REVIEW | DES-006-05-01 | TASK-006-05-01 | TEST-006-05-01 | Non commencé | 0/1 exécutés et réussis |
| FR-620 | SF-006-01 | UNDER_REVIEW | DES-006-01-01 | TASK-006-01-01 | TEST-006-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-621 | SF-006-01 | UNDER_REVIEW | DES-006-01-01 | TASK-006-01-01 | TEST-006-01-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-622 | SF-006-07 | UNDER_REVIEW | DES-006-07-01 | TASK-006-07-01 | TEST-006-07-01 | Non commencé | 0/1 exécutés et réussis |
| FR-701 | SF-007-02 | UNDER_REVIEW | DES-007-02-01 | TASK-007-02-01 | TEST-007-02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-702 | SF-007-03 | UNDER_REVIEW | DES-007-03-01 | TASK-007-03-01 | TEST-007-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-703 | SF-007-03 | UNDER_REVIEW | DES-007-03-01 | TASK-007-03-01 | TEST-007-03-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-704 | SF-007-04 | UNDER_REVIEW | DES-007-04-01 | TASK-007-04-01 | TEST-007-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-705 | SF-007-05 | UNDER_REVIEW | DES-007-05-01 | TASK-007-05-01 | TEST-007-05-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-706 | SF-007-09 | UNDER_REVIEW | DES-007-09-01 | TASK-007-09-01 | TEST-007-09-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-707 | SF-007-13 | UNDER_REVIEW | DES-007-13-01 | TASK-007-13-01 | TEST-007-13-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-708 | SF-007-16 | UNDER_REVIEW | DES-007-16-01 | TASK-007-16-01 | TEST-007-16-01 | Fait (2026-11-09) — `docs/compliance/aipd.md` (5 finalités et le POC, risques, mesures, conditions du mode complet) | 1/1 exécutés et réussis |
| FR-709 | SF-007-09 | UNDER_REVIEW | DES-007-09-01 | TASK-007-09-01 | TEST-007-09-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-710 | SF-007-14 | UNDER_REVIEW | DES-007-14-01 | TASK-007-14-01 | TEST-007-14-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-711 | SF-007-15 | UNDER_REVIEW | DES-007-15-01 | TASK-007-15-01 | TEST-007-15-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-712 | SF-007-06 | UNDER_REVIEW | DES-007-06-01 | TASK-007-06-01 | TEST-007-06-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-713 | SF-007-10 | UNDER_REVIEW | DES-007-10-01 | TASK-007-10-01 | TEST-007-10-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-714 | SF-007-07 | UNDER_REVIEW | DES-007-07-01 | TASK-007-07-01 | TEST-007-07-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-715 | SF-007-08 | UNDER_REVIEW | DES-007-08-01 | TASK-007-08-01 | TEST-007-08-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-720 | SF-007-01 | UNDER_REVIEW | DES-007-01-01 | TASK-007-01-01 | TEST-007-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-721 | SF-007-01 | UNDER_REVIEW | DES-007-01-01 | TASK-007-01-01 | TEST-007-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-722 | SF-007-01 | UNDER_REVIEW | DES-007-01-01 | TASK-007-01-01 | TEST-007-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-723 | SF-007-01 | UNDER_REVIEW | DES-007-01-01 | TASK-007-01-01 | TEST-007-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-725 | SF-007-02 | UNDER_REVIEW | DES-007-02-01 | TASK-007-02-01 | TEST-007-02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-726 | SF-007-02 | UNDER_REVIEW | DES-007-02-01 | TASK-007-02-01 | TEST-007-02-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-730 | SF-007-03 | UNDER_REVIEW | DES-007-03-01 | TASK-007-03-01 | TEST-007-03-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-731 | SF-007-03 | UNDER_REVIEW | DES-007-03-01 | TASK-007-03-01 | TEST-007-03-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-732 | SF-007-03 | UNDER_REVIEW | DES-007-03-02 | TASK-007-03-02 | TEST-007-03-05 | Fait (2026-11-09) — `diagnostic.afficher_hypotheses`, `orientation.recommander_structure` (26 actions) ; `config/policy.yaml` 1.4.0 (`diagnostic_poc`, `tendances`) | 1/1 exécutés et réussis |
| FR-735 | SF-007-04 | UNDER_REVIEW | DES-007-04-01 | TASK-007-04-01 | TEST-007-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-738 | SF-007-05 | UNDER_REVIEW | DES-007-05-01 | TASK-007-05-01 | TEST-007-05-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-741 | SF-007-06 | UNDER_REVIEW | DES-007-06-01 | TASK-007-06-01 | TEST-007-06-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-744 | SF-007-07 | UNDER_REVIEW | DES-007-07-01 | TASK-007-07-01 | TEST-007-07-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-747 | SF-007-08 | UNDER_REVIEW | DES-007-08-01 | TASK-007-08-01 | TEST-007-08-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-760 | SF-007-09 | UNDER_REVIEW | DES-007-09-01 | TASK-007-09-01 | TEST-007-09-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-761 | SF-007-09 | UNDER_REVIEW | DES-007-09-02 | TASK-007-09-02 | TEST-007-09-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-765 | SF-007-10 | UNDER_REVIEW | DES-007-10-01 | TASK-007-10-01 | TEST-007-10-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-768 | SF-007-11 | UNDER_REVIEW | DES-007-11-01 | TASK-007-11-01 | TEST-007-11-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-769 | SF-007-11 | UNDER_REVIEW | DES-007-11-02 | TASK-007-11-02 | TEST-007-11-02 | Fait (2026-11-09) — `tools/lire_journal.py` (ordre, agent, décision, fragments avec article, version, validateur ; vérification de la chaîne) | 1/1 exécutés et réussis |
| FR-773 | SF-007-12 | UNDER_REVIEW | DES-007-12-01 | TASK-007-12-01 | TEST-007-12-01 | Non commencé | 0/1 exécutés et réussis |
| FR-774 | SF-007-12 | UNDER_REVIEW | DES-007-12-01 | TASK-007-12-01 | TEST-007-12-02 | Non commencé | 0/1 exécutés et réussis |
| FR-777 | SF-007-13 | UNDER_REVIEW | DES-007-13-01 | TASK-007-13-01 | TEST-007-13-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-780 | SF-007-14 | UNDER_REVIEW | DES-007-14-01 | TASK-007-14-01 | TEST-007-14-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-783 | SF-007-15 | UNDER_REVIEW | DES-007-15-02 | TASK-007-15-02 | TEST-007-15-02 | Fait (2026-11-09) — `docs/architecture/agents/` : District, APDP, vérificateur d'agrément | 1/1 exécutés et réussis |
| FR-787 | SF-007-16 | UNDER_REVIEW | DES-007-16-01 | TASK-007-16-01 | TEST-007-16-01 | Fait (2026-11-09) — `docs/compliance/aipd.md` (5 finalités et le POC, risques, mesures, conditions du mode complet) | 1/1 exécutés et réussis |
| FR-801 | SF-008-01 | UNDER_REVIEW | DES-008-01-01, DES-008-01-03 | TASK-008-01-01, TASK-008-01-02 | TEST-008-01-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-802 | SF-008-01 | UNDER_REVIEW | DES-008-01-01, DES-008-01-02 | TASK-008-01-01 | TEST-008-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-803 | SF-008-01 | UNDER_REVIEW | DES-008-01-01 | TASK-008-01-01 | TEST-008-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-804 | SF-008-01 | UNDER_REVIEW | DES-008-01-01 | TASK-008-01-01 | TEST-008-01-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-805 | SF-008-01 | UNDER_REVIEW | DES-008-01-02 | TASK-008-01-02 | TEST-008-01-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-806 | SF-008-01 | UNDER_REVIEW | DES-008-01-02 | TASK-008-01-02 | TEST-008-01-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-811 | SF-008-02 | UNDER_REVIEW | DES-008-02-01 | TASK-008-02-01 | TEST-008-02-01 | Fait (2026-11-09) — garde de finalité dans `preparerEnvoi` (`E-ENVOI-SANS-CONSENTEMENT`) | 1/1 exécutés et réussis |
| FR-812 | SF-008-02 | UNDER_REVIEW | DES-008-02-02 | TASK-008-02-02 | TEST-008-02-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-821 | SF-008-03 | UNDER_REVIEW | DES-008-03-01 | TASK-008-03-01 | TEST-008-03-01 | Fait (2026-11-09) — `app/js/domain/position.js`, `app/js/ui/position.js` ; recherche et « Où aller » | 1/1 exécutés et réussis |
| FR-822 | SF-008-03 | UNDER_REVIEW | DES-008-03-01 | TASK-008-03-01 | TEST-008-03-02 | Fait (2026-11-09) — `app/js/domain/position.js`, `app/js/ui/position.js` ; recherche et « Où aller » | 1/1 exécutés et réussis |
| FR-823 | SF-008-03 | UNDER_REVIEW | DES-008-03-02 | TASK-008-03-02 | TEST-008-03-03 | Fait (2026-11-09) — repli sur le point de référence (cadre, hors district) et mention | 1/1 exécutés et réussis |
| FR-831 | SF-008-04 | UNDER_REVIEW | DES-008-04-01 | TASK-008-04-01 | TEST-008-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-832 | SF-008-04 | UNDER_REVIEW | DES-008-04-01 | TASK-008-04-01 | TEST-008-04-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-841 | SF-008-05 | UNDER_REVIEW | DES-008-05-01 | TASK-008-05-01 | TEST-008-05-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-842 | SF-008-05 | UNDER_REVIEW | DES-008-05-01 | TASK-008-05-01 | TEST-008-05-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-843 | SF-008-05 | UNDER_REVIEW | DES-008-05-01 | TASK-008-05-01 | TEST-008-05-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-844 | SF-008-05 | UNDER_REVIEW | DES-008-05-01 | TASK-008-05-02 | TEST-008-05-04 | Fait (2026-11-09) — `enregistrer` et `retirer` de « Mes données » | 1/1 exécutés et réussis |
| FR-851 | SF-008-06 | UNDER_REVIEW | DES-008-06-01 | TASK-008-06-01 | TEST-008-06-01 | Non commencé | 0/1 exécutés et réussis |
| FR-861 | SF-008-07 | UNDER_REVIEW | DES-008-07-01 | TASK-008-07-01 | TEST-008-07-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-862 | SF-008-07 | UNDER_REVIEW | DES-008-07-02 | TASK-008-07-02 | TEST-008-07-02 | Fait (2026-11-09) — `raisonIssue` sur urgence, pistes, confidentiel, hors champ et « Où aller » | 1/1 exécutés et réussis |
| FR-871 | SF-008-08 | UNDER_REVIEW | DES-008-08-01 | TASK-008-08-01 | TEST-008-08-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-872 | SF-008-08 | UNDER_REVIEW | DES-008-08-02 | TASK-008-08-02 | TEST-008-08-02 | Fait (2026-11-09) — sections `classement`, `securite`, `contact`, `version` ajoutées ; données collectées et jamais collectées | 1/1 exécutés et réussis |
| FR-873 | SF-008-08 | UNDER_REVIEW | DES-008-08-02 | TASK-008-08-02 | TEST-008-08-02 | Fait (2026-11-09) — sections `classement`, `securite`, `contact`, `version` ajoutées ; données collectées et jamais collectées | 1/1 exécutés et réussis |
| FR-881 | SF-008-09 | UNDER_REVIEW | DES-008-09-01 | TASK-008-09-01 | TEST-008-09-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-901 | SF-009-01 | UNDER_REVIEW | DES-009-01-01 | TASK-009-01-01 | TEST-009-01-01 | Fait (2026-11-09) — `docs/product/roles.md` (8 rôles, permissions sourcées) | 1/1 exécutés et réussis |
| FR-902 | SF-009-01 | UNDER_REVIEW | DES-009-01-02 | TASK-009-01-02 | TEST-009-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-905 | SF-009-02 | UNDER_REVIEW | DES-009-02-01, DES-009-02-04 | TASK-009-02-01 | TEST-009-02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-906 | SF-009-02 | UNDER_REVIEW | DES-009-02-02, DES-009-02-04 | TASK-009-02-02 | TEST-009-02-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-907 | SF-009-02 | UNDER_REVIEW | DES-009-02-03, DES-009-02-04 | TASK-009-02-03 | TEST-009-02-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-908 | SF-009-02 | UNDER_REVIEW | DES-009-02-01 | TASK-009-02-01 | TEST-009-02-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-909 | SF-009-02 | UNDER_REVIEW | DES-009-02-04 | TASK-009-02-04 | TEST-009-02-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-912 | SF-009-03 | UNDER_REVIEW | DES-009-03-01 | TASK-009-03-01 | TEST-009-03-01 | Non commencé | 0/1 exécutés et réussis |
| FR-913 | SF-009-03 | UNDER_REVIEW | DES-009-03-01 | TASK-009-03-01 | TEST-009-03-02 | Non commencé | 0/1 exécutés et réussis |
| FR-916 | SF-009-04 | UNDER_REVIEW | DES-009-04-01 | TASK-009-04-01 | TEST-009-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-919 | SF-009-05 | UNDER_REVIEW | DES-009-05-01 | TASK-009-05-01 | TEST-009-05-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-920 | SF-009-05 | UNDER_REVIEW | DES-009-05-01 | TASK-009-05-01 | TEST-009-05-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-921 | SF-009-05 | UNDER_REVIEW | DES-009-05-01 | TASK-009-05-01 | TEST-009-05-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1001 | SF-010-01 | UNDER_REVIEW | DES-010-01-01 | TASK-010-01-01, TASK-010-01-03 | TEST-010-01-01 | Fait (2026-11-09) — `app/tests/qualite.test.mjs`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1002 | SF-010-01 | UNDER_REVIEW | DES-010-01-01 | TASK-010-01-01, TASK-010-01-03 | TEST-010-01-04 | Fait (2026-11-09) — `app/tests/qualite.test.mjs`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1003 | SF-010-01 | UNDER_REVIEW | DES-010-01-02 | TASK-010-01-02 | TEST-010-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1004 | SF-010-01 | UNDER_REVIEW | DES-010-01-01 | TASK-010-01-01 | TEST-010-01-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1006 | SF-010-02 | UNDER_REVIEW | DES-010-02-03 | TASK-010-02-03 | TEST-010-02-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1007 | SF-010-02 | UNDER_REVIEW | DES-010-02-01, DES-010-02-04 | TASK-010-02-01, TASK-010-02-04 | TEST-010-02-02, TEST-010-02-06 | Fait (code existant, rétro-spécifié le 2026-11-09) | 2/2 exécutés et réussis |
| FR-1008 | SF-010-02 | UNDER_REVIEW | DES-010-02-01, DES-010-02-04 | TASK-010-02-01, TASK-010-02-04 | TEST-010-02-01, TEST-010-02-06 | Fait (code existant, rétro-spécifié le 2026-11-09) | 2/2 exécutés et réussis |
| FR-1009 | SF-010-02 | UNDER_REVIEW | DES-010-02-02, DES-010-02-04 | TASK-010-02-02, TASK-010-02-04 | TEST-010-02-03, TEST-010-02-06 | Fait (code existant, rétro-spécifié le 2026-11-09) | 2/2 exécutés et réussis |
| FR-1010 | SF-010-02 | UNDER_REVIEW | DES-010-02-03 | TASK-010-02-03 | TEST-010-02-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1013 | SF-010-03 | UNDER_REVIEW | DES-010-03-01 | TASK-010-03-01 | TEST-010-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1014 | SF-010-03 | UNDER_REVIEW | DES-010-03-02 | TASK-010-03-02 | TEST-010-03-02 | Fait (2026-11-09) — `chercherSang` ; `sangH` des comptes d'établissement | 1/1 exécutés et réussis |
| FR-1016 | SF-010-04 | UNDER_REVIEW | DES-010-04-01 | TASK-010-04-01 | TEST-010-04-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1017 | SF-010-04 | UNDER_REVIEW | DES-010-04-02 | TASK-010-04-01 | TEST-010-04-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1018 | SF-010-04 | UNDER_REVIEW | DES-010-04-02 | TASK-010-04-01 | TEST-010-04-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1019 | SF-010-04 | UNDER_REVIEW | DES-010-04-03 | TASK-010-04-02 | TEST-010-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1020 | SF-010-04 | UNDER_REVIEW | DES-010-04-04 | TASK-010-04-03 | TEST-010-04-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1021 | SF-010-04 | UNDER_REVIEW | DES-010-04-02 | TASK-010-04-01 | TEST-010-04-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1022 | SF-010-04 | UNDER_REVIEW | DES-010-04-03 | TASK-010-04-02 | TEST-010-04-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1023 | SF-010-05 | UNDER_REVIEW | DES-010-05-01 | TASK-010-05-01 | TEST-010-05-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1024 | SF-010-05 | UNDER_REVIEW | DES-010-05-02 | TASK-010-05-01 | TEST-010-05-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1025 | SF-010-05 | UNDER_REVIEW | DES-010-05-01 | TASK-010-05-01 | TEST-010-05-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1026 | SF-010-06 | UNDER_REVIEW | DES-010-06-01, DES-010-06-03 | TASK-010-06-01 | TEST-010-06-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1027 | SF-010-06 | UNDER_REVIEW | DES-010-06-01, DES-010-06-03 | TASK-010-06-01 | TEST-010-06-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1028 | SF-010-06 | UNDER_REVIEW | DES-010-06-01, DES-010-06-02, DES-010-06-03 | TASK-010-06-01, TASK-010-06-02 | TEST-010-06-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1029 | SF-010-07 | UNDER_REVIEW | DES-010-07-01 | TASK-010-07-01 | TEST-010-07-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1030 | SF-010-07 | UNDER_REVIEW | DES-010-07-02 | TASK-010-07-02 | TEST-010-07-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1031 | SF-010-07 | UNDER_REVIEW | DES-010-07-02 | TASK-010-07-02 | TEST-010-07-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1032 | SF-010-07 | UNDER_REVIEW | DES-010-07-03 | TASK-010-07-03 | TEST-010-07-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1033 | SF-010-06 | UNDER_REVIEW | DES-010-06-01 | TASK-010-06-01 | TEST-010-06-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1034 | SF-010-08 | UNDER_REVIEW | DES-010-08-01, DES-010-08-02 | TASK-010-08-01, TASK-010-08-02 | TEST-010-08-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1035 | SF-010-08 | UNDER_REVIEW | DES-010-08-01, DES-010-08-02 | TASK-010-08-01, TASK-010-08-02 | TEST-010-08-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1036 | SF-010-08 | UNDER_REVIEW | DES-010-08-01, DES-010-08-02 | TASK-010-08-01, TASK-010-08-02 | TEST-010-08-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1037 | SF-010-06 | UNDER_REVIEW | DES-010-06-01 | TASK-010-06-01 | TEST-010-06-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1038 | SF-010-09 | UNDER_REVIEW | DES-010-09-01 | TASK-010-09-01 | TEST-010-09-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1039 | SF-010-06 | UNDER_REVIEW | DES-010-06-02 | TASK-010-06-02 | TEST-010-06-06 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1040 | SF-010-09 | UNDER_REVIEW | DES-010-09-01, DES-010-09-02 | TASK-010-09-01 | TEST-010-09-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1041 | SF-010-09 | UNDER_REVIEW | DES-010-09-03 | TASK-010-09-02 | TEST-010-09-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1042 | SF-010-09 | UNDER_REVIEW | DES-010-09-03 | TASK-010-09-02 | TEST-010-09-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1044 | SF-010-10 | UNDER_REVIEW | DES-010-10-01 | TASK-010-10-01 | TEST-010-10-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1045 | SF-010-10 | UNDER_REVIEW | DES-010-10-01 | TASK-010-10-01 | TEST-010-10-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1046 | SF-010-10 | UNDER_REVIEW | DES-010-10-01 | TASK-010-10-01 | TEST-010-10-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1049 | SF-010-11 | UNDER_REVIEW | DES-010-11-01 | TASK-010-11-01 | TEST-010-11-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1050 | SF-010-11 | UNDER_REVIEW | DES-010-11-02 | TASK-010-11-02 | TEST-010-11-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1053 | SF-010-12 | UNDER_REVIEW | DES-010-12-01 | TASK-010-12-01 | TEST-010-12-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1054 | SF-010-12 | UNDER_REVIEW | DES-010-12-01 | TASK-010-12-01 | TEST-010-12-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1057 | SF-010-13 | UNDER_REVIEW | DES-010-13-01 | TASK-010-13-01 | TEST-010-13-01 | Fait (2026-11-09) — `app/js/screens/pro/conditions.js`, catalogues `pro.conditionsPage` | 1/1 exécutés et réussis |
| FR-1101 | SF-011-01 | UNDER_REVIEW | DES-011-01-01 | TASK-011-01-01 | TEST-011-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1102 | SF-011-01 | UNDER_REVIEW | DES-011-01-01 | TASK-011-01-01 | TEST-011-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1103 | SF-011-01 | UNDER_REVIEW | DES-011-01-01 | TASK-011-01-01 | TEST-011-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1104 | SF-011-01 | UNDER_REVIEW | DES-011-01-02 | TASK-011-01-02 | TEST-011-01-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1106 | SF-011-02 | UNDER_REVIEW | DES-011-02-01 | TASK-011-02-01 | TEST-011-02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1107 | SF-011-02 | UNDER_REVIEW | DES-011-02-01 | TASK-011-02-01 | TEST-011-02-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1109 | SF-011-03 | UNDER_REVIEW | DES-011-03-01 | TASK-011-03-01 | TEST-011-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1110 | SF-011-03 | UNDER_REVIEW | DES-011-03-02 | TASK-011-03-02 | TEST-011-03-02 | Non commencé | 0/1 exécutés et réussis |
| FR-1111 | SF-011-03 | UNDER_REVIEW | DES-011-03-02 | TASK-011-03-02 | TEST-011-03-03 | Non commencé | 0/1 exécutés et réussis |
| FR-1113 | SF-011-04 | UNDER_REVIEW | DES-011-04-01 | TASK-011-04-01 | TEST-011-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1114 | SF-011-04 | UNDER_REVIEW | DES-011-04-01 | TASK-011-04-02 | TEST-011-04-02 | Fait (2026-11-09) | 1/1 exécutés et réussis |
| FR-1116 | SF-011-05 | UNDER_REVIEW | DES-011-05-01 | TASK-011-05-01 | TEST-011-05-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1117 | SF-011-05 | UNDER_REVIEW | DES-011-05-01 | TASK-011-05-01 | TEST-011-05-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1119 | SF-011-06 | UNDER_REVIEW | DES-011-06-01 | TASK-011-06-01 | TEST-011-06-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1120 | SF-011-06 | UNDER_REVIEW | DES-011-06-01 | TASK-011-06-01 | TEST-011-06-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1121 | SF-011-06 | UNDER_REVIEW | DES-011-06-01 | TASK-011-06-01 | TEST-011-06-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1123 | SF-011-07 | UNDER_REVIEW | DES-011-07-01 | TASK-011-07-01 | TEST-011-07-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1124 | SF-011-07 | UNDER_REVIEW | DES-011-07-01 | TASK-011-07-01 | TEST-011-07-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1125 | SF-011-07 | UNDER_REVIEW | DES-011-07-02 | TASK-011-07-02 | TEST-011-07-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1127 | SF-011-08 | UNDER_REVIEW | DES-011-08-01 | TASK-011-08-01 | TEST-011-08-01 | Fait (2026-11-09) — `tools/exporter_base.py` → `app/data/base.json` (816 fragments, 1,04 Mo) et `app/data/glossaire.json` ; `app/js/domain/base.js` ; `app/sw.js` | 1/1 exécutés et réussis |
| FR-1128 | SF-011-08 | UNDER_REVIEW | DES-011-08-02 | TASK-011-08-01 | TEST-011-08-02 | Fait (2026-11-09) — `tools/exporter_base.py` → `app/data/base.json` (816 fragments, 1,04 Mo) et `app/data/glossaire.json` ; `app/js/domain/base.js` ; `app/sw.js` | 1/1 exécutés et réussis |
| FR-1129 | SF-011-08 | UNDER_REVIEW | DES-011-08-02 | TASK-011-08-01 | TEST-011-08-03 | Fait (2026-11-09) — `tools/exporter_base.py` → `app/data/base.json` (816 fragments, 1,04 Mo) et `app/data/glossaire.json` ; `app/js/domain/base.js` ; `app/sw.js` | 1/1 exécutés et réussis |
| FR-1201 | SF-012-01 | UNDER_REVIEW | DES-012-01-01 | TASK-012-01-01 | TEST-012-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1202 | SF-012-01 | UNDER_REVIEW | DES-012-01-01 | TASK-012-01-01 | TEST-012-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1204 | SF-012-02 | UNDER_REVIEW | DES-012-02-01 | TASK-012-02-01 | TEST-012-02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1205 | SF-012-02 | UNDER_REVIEW | DES-012-02-01 | TASK-012-02-01 | TEST-012-02-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1207 | SF-012-03 | UNDER_REVIEW | DES-012-03-01 | TASK-012-03-01 | TEST-012-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1208 | SF-012-03 | UNDER_REVIEW | DES-012-03-01 | TASK-012-03-01 | TEST-012-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1209 | SF-012-03 | UNDER_REVIEW | DES-012-03-01 | TASK-012-03-02 | TEST-012-03-02 | Fait (2026-11-09) — `--exporter-attendus` (livré avec TASK-007-17-02) ; test d'acceptation pytest | 1/1 exécutés et réussis |
| FR-1211 | SF-012-04 | UNDER_REVIEW | DES-012-04-01 | TASK-012-04-01 | TEST-012-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1212 | SF-012-04 | UNDER_REVIEW | DES-012-04-02 | TASK-012-04-02 | TEST-012-04-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1213 | SF-012-04 | UNDER_REVIEW | DES-012-04-03 | TASK-012-04-03 | TEST-012-04-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1216 | SF-012-05 | UNDER_REVIEW | DES-012-05-01 | TASK-012-05-01 | TEST-012-05-01 | Non commencé | 0/1 exécutés et réussis |
| FR-1217 | SF-012-05 | UNDER_REVIEW | DES-012-05-01 | TASK-012-05-01 | TEST-012-05-01 | Non commencé | 0/1 exécutés et réussis |
| FR-1301 | SF-013-01 | UNDER_REVIEW | DES-013-01-01 | TASK-013-01-01 | TEST-013-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1302 | SF-013-01 | UNDER_REVIEW | DES-013-01-02 | TASK-013-01-02 | TEST-013-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1303 | SF-013-01 | UNDER_REVIEW | DES-013-01-02 | TASK-013-01-02 | TEST-013-01-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1305 | SF-013-02 | UNDER_REVIEW | DES-013-02-01 | TASK-013-02-01, TASK-013-02-03 | TEST-013-02-01 | Fait (2026-11-09) — `app/js/core/routeur.js` (`lireRoute`, `routeGardee`), utilisé par `app.js`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1306 | SF-013-02 | UNDER_REVIEW | DES-013-02-01 | TASK-013-02-01, TASK-013-02-03 | TEST-013-02-02 | Fait (2026-11-09) — `app/js/core/routeur.js` (`lireRoute`, `routeGardee`), utilisé par `app.js`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1307 | SF-013-02 | UNDER_REVIEW | DES-013-02-01 | TASK-013-02-01 | TEST-013-02-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1308 | SF-013-02 | UNDER_REVIEW | DES-013-02-02 | TASK-013-02-02 | TEST-013-02-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1310 | SF-013-03 | UNDER_REVIEW | DES-013-03-01 | TASK-013-03-01, TASK-013-03-03 | TEST-013-03-01 | Fait (2026-11-09) — cas dédiés dans `tools/inspecter.py` (navigateur réel : échappement, saisie et focus conservés), Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1311 | SF-013-03 | UNDER_REVIEW | DES-013-03-01 | TASK-013-03-01, TASK-013-03-03 | TEST-013-03-02 | Fait (2026-11-09) — cas dédiés dans `tools/inspecter.py` (navigateur réel : échappement, saisie et focus conservés), Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1312 | SF-013-03 | UNDER_REVIEW | DES-013-03-02 | TASK-013-03-02 | TEST-013-03-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1313 | SF-013-03 | UNDER_REVIEW | DES-013-03-02 | TASK-013-03-02 | TEST-013-03-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1315 | SF-013-04 | UNDER_REVIEW | DES-013-04-01 | TASK-013-04-01 | TEST-013-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1316 | SF-013-04 | UNDER_REVIEW | DES-013-04-02 | TASK-013-04-02 | TEST-013-04-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1317 | SF-013-04 | UNDER_REVIEW | DES-013-04-02 | TASK-013-04-02 | TEST-013-04-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1318 | SF-013-04 | UNDER_REVIEW | DES-013-04-02 | TASK-013-04-02 | TEST-013-04-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1320 | SF-013-05 | UNDER_REVIEW | DES-013-05-01 | TASK-013-05-01, TASK-013-05-04 | TEST-013-05-01 | Fait (2026-11-09) — `app/tests/qualite.test.mjs` ; jetons `--sur-sombre*`, `--ferme-sur-sombre`, `--hachure`, `--voile-clair` ; exceptions déclarées dans `app/docs/DESIGN.md`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1321 | SF-013-05 | UNDER_REVIEW | DES-013-05-02 | TASK-013-05-02 | TEST-013-05-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1322 | SF-013-05 | UNDER_REVIEW | DES-013-05-01 | TASK-013-05-01, TASK-013-05-04, TASK-013-05-05 | TEST-013-05-03 | Fait (2026-11-09) — `app/tests/qualite.test.mjs` ; jetons `--sur-sombre*`, `--ferme-sur-sombre`, `--hachure`, `--voile-clair` ; exceptions déclarées dans `app/docs/DESIGN.md`, Fait (code existant, rétro-spécifié le 2026-11-09), À faire | 1/1 exécutés et réussis |
| FR-1323 | SF-013-05 | UNDER_REVIEW | DES-013-05-03 | TASK-013-05-03 | TEST-013-05-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1324 | SF-013-05 | UNDER_REVIEW | DES-013-05-03 | TASK-013-05-03 | TEST-013-05-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1326 | SF-013-06 | UNDER_REVIEW | DES-013-06-01 | TASK-013-06-01 | TEST-013-06-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1327 | SF-013-06 | UNDER_REVIEW | DES-013-06-01 | TASK-013-06-01 | TEST-013-06-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1328 | SF-013-06 | UNDER_REVIEW | DES-013-06-01 | TASK-013-06-01 | TEST-013-06-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1329 | SF-013-06 | UNDER_REVIEW | DES-013-06-01 | TASK-013-06-01 | TEST-013-06-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1330 | SF-013-06 | UNDER_REVIEW | DES-013-06-02 | TASK-013-06-02 | TEST-013-06-04 | Fait (2026-11-09) — `app/tests/qualite.test.mjs` (15 paires de jetons) | 1/1 exécutés et réussis |
| FR-1332 | SF-013-07 | UNDER_REVIEW | DES-013-07-01 | TASK-013-07-01 | TEST-013-07-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1333 | SF-013-07 | UNDER_REVIEW | DES-013-07-01 | TASK-013-07-01 | TEST-013-07-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1334 | SF-013-07 | UNDER_REVIEW | DES-013-07-02 | TASK-013-07-02 | TEST-013-07-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1336 | SF-013-08 | UNDER_REVIEW | DES-013-08-01 | TASK-013-08-01, TASK-013-08-02 | TEST-013-08-01 | Fait (2026-11-09) — `tools/maj_sw.py` et contrôle de la liste dans `app/tests/qualite.test.mjs` ; le rechargement hors ligne (TEST-013-08-01) reste à faire dans un navigateur, Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1337 | SF-013-08 | UNDER_REVIEW | DES-013-08-02 | TASK-013-08-01 | TEST-013-08-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1338 | SF-013-08 | UNDER_REVIEW | DES-013-08-03 | TASK-013-08-01 | TEST-013-08-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1340 | SF-013-09 | UNDER_REVIEW | DES-013-09-01 | TASK-013-09-01 | TEST-013-09-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1341 | SF-013-09 | UNDER_REVIEW | DES-013-09-01 | TASK-013-09-01 | TEST-013-09-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1342 | SF-013-09 | UNDER_REVIEW | DES-013-09-01 | TASK-013-09-01 | TEST-013-09-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1344 | SF-013-10 | UNDER_REVIEW | DES-013-10-01 | TASK-013-10-01 | TEST-013-10-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1345 | SF-013-10 | UNDER_REVIEW | DES-013-10-01 | TASK-013-10-01 | TEST-013-10-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1346 | SF-013-10 | UNDER_REVIEW | DES-013-10-01 | TASK-013-10-02 | TEST-013-10-02 | Fait (2026-11-09) | 1/1 exécutés et réussis |
| FR-1347 | SF-013-10 | UNDER_REVIEW | DES-013-10-01 | TASK-013-10-03 | TEST-013-10-03 | Non commencé | 0/1 exécutés et réussis |
| FR-1348 | SF-013-11 | UNDER_REVIEW | DES-013-11-01 | TASK-013-11-01 | TEST-013-11-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1349 | SF-013-11 | UNDER_REVIEW | DES-013-11-02 | TASK-013-11-02 | TEST-013-11-02 | Fait (2026-11-09) — `app/tests/qualite.test.mjs` (contrôle statique des clés écrites) | 1/1 exécutés et réussis |
| FR-1350 | SF-013-11 | UNDER_REVIEW | DES-013-11-01 | TASK-013-11-01 | TEST-013-11-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1401 | MT-001 | UNDER_REVIEW | DES-M01-01 | TASK-M01-02 | TEST-M01-02 | Non commencé | 0/1 exécutés et réussis |
| FR-1402 | MT-001 | UNDER_REVIEW | DES-M01-02 | TASK-M01-02 | TEST-M01-02 | Non commencé | 0/1 exécutés et réussis |
| FR-1403 | MT-001 | UNDER_REVIEW | DES-M01-03 | TASK-M01-01, TASK-M01-03 | TEST-M01-01, TEST-M01-03 | Non commencé | 1/2 exécutés et réussis |
| FR-1404 | MT-001 | UNDER_REVIEW | DES-M01-04 | TASK-M01-01, TASK-M01-04 | TEST-M01-01, TEST-M01-04, TEST-M01-05 | Non commencé | 1/3 exécutés et réussis |
| FR-1405 | MT-001 | UNDER_REVIEW | DES-M01-05 | TASK-M01-05 | TEST-M01-06 | Non commencé | 0/1 exécutés et réussis |
| FR-1406 | MT-001 | UNDER_REVIEW | DES-M01-06 | TASK-M01-06 | TEST-M01-07 | Non commencé | 0/1 exécutés et réussis |
| FR-1501 | SF-001-13 | UNDER_REVIEW | DES-001-13-01 | TASK-001-13-01 | TEST-001-13-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1502 | SF-001-13 | UNDER_REVIEW | DES-001-13-01 | TASK-001-13-01 | TEST-001-13-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1503 | SF-001-13 | UNDER_REVIEW | DES-001-13-01 | TASK-001-13-01 | TEST-001-13-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1504 | SF-001-13 | UNDER_REVIEW | DES-001-13-02 | TASK-001-13-02, TASK-001-13-04 | TEST-001-13-04 | Fait (2026-11-09) — `app/tests/saisie.test.mjs`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1505 | SF-001-13 | UNDER_REVIEW | DES-001-13-01 | TASK-001-13-01 | TEST-001-13-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1506 | SF-001-13 | UNDER_REVIEW | DES-001-13-01 | TASK-001-13-01 | TEST-001-13-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1507 | SF-001-13 | UNDER_REVIEW | DES-001-13-03 | TASK-001-13-03 | TEST-001-13-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1508 | SF-001-13 | UNDER_REVIEW | DES-001-13-03 | TASK-001-13-03, TASK-001-13-04 | TEST-001-13-05 | Fait (2026-11-09) — `app/tests/saisie.test.mjs`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1511 | SF-001-14 | UNDER_REVIEW | DES-001-14-01 | TASK-001-14-01 | TEST-001-14-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1512 | SF-001-14 | UNDER_REVIEW | DES-001-14-02 | TASK-001-14-02 | TEST-001-14-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1513 | SF-001-14 | UNDER_REVIEW | DES-001-14-01 | TASK-001-14-01 | TEST-001-14-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1514 | SF-001-14 | UNDER_REVIEW | DES-001-14-03 | TASK-001-14-03 | TEST-001-14-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1515 | SF-001-14 | UNDER_REVIEW | DES-001-14-03 | TASK-001-14-03 | TEST-001-14-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1521 | SF-001-15 | UNDER_REVIEW | DES-001-15-03 | TASK-001-15-03 | TEST-001-15-01 | Fait (2026-11-09) — `moduleActif` (`app/js/domain/politique.js`) ; route `#/pistes` absente hors démonstration ; parcours Vérifier → Où aller sans piste | 1/1 exécutés et réussis |
| FR-1522 | SF-001-15 | UNDER_REVIEW | DES-001-15-01 | TASK-001-15-01 | TEST-001-15-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1523 | SF-001-15 | UNDER_REVIEW | DES-001-15-02 | TASK-001-15-02 | TEST-001-15-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1524 | SF-001-15 | UNDER_REVIEW | DES-001-15-02 | TASK-001-15-02 | TEST-001-15-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1525 | SF-001-15 | UNDER_REVIEW | DES-001-15-01 | TASK-001-15-01 | TEST-001-15-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1526 | SF-001-15 | UNDER_REVIEW | DES-001-15-03 | TASK-001-15-04 | TEST-001-15-06 | Fait (2026-11-09) — `deciderResultat` (`app/js/agents/parcours.js`) appelé par « Vérifier » avant tout affichage ; journal : module, empreinte, nombre | 1/1 exécutés et réussis |
| FR-1527 | SF-001-15 | UNDER_REVIEW | DES-001-15-03 | TASK-001-15-04 | TEST-001-15-06 | Fait (2026-11-09) — `deciderResultat` (`app/js/agents/parcours.js`) appelé par « Vérifier » avant tout affichage ; journal : module, empreinte, nombre | 1/1 exécutés et réussis |
| FR-1528 | SF-001-15 | UNDER_REVIEW | DES-001-15-02 | TASK-001-15-05 | TEST-001-15-07 | Fait (2026-11-09) — clé `pistes.tableDemo` affichée en tête de l'encart d'origine | 1/1 exécutés et réussis |
| FR-1536 | SF-001-16 | UNDER_REVIEW | DES-001-16-01 | TASK-001-16-01 | TEST-001-16-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1537 | SF-001-16 | UNDER_REVIEW | DES-001-16-02 | TASK-001-16-01 | TEST-001-16-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1538 | SF-001-16 | UNDER_REVIEW | DES-001-16-03 | TASK-001-16-02 | TEST-001-16-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1541 | SF-001-17 | UNDER_REVIEW | DES-001-17-01 | TASK-001-17-01 | TEST-001-17-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1542 | SF-001-17 | UNDER_REVIEW | DES-001-17-01 | TASK-001-17-01 | TEST-001-17-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1543 | SF-001-17 | UNDER_REVIEW | DES-001-17-02 | TASK-001-17-02 | TEST-001-17-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1546 | SF-001-18 | UNDER_REVIEW | DES-001-18-01 | TASK-001-18-01 | TEST-001-18-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1547 | SF-001-18 | UNDER_REVIEW | DES-001-18-02 | TASK-001-18-02 | TEST-001-18-02 | Fait (2026-11-09) — `app/tests/saisie.test.mjs` | 1/1 exécutés et réussis |
| FR-1548 | SF-001-18 | UNDER_REVIEW | DES-001-18-01 | TASK-001-18-01 | TEST-001-18-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1549 | SF-001-18 | UNDER_REVIEW | DES-001-18-01 | TASK-001-18-01 | TEST-001-18-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1561 | SF-001-19 | UNDER_REVIEW | DES-001-19-01 | TASK-001-19-03 | TEST-001-19-01 | Non commencé | 0/1 exécutés et réussis |
| FR-1562 | SF-001-19 | UNDER_REVIEW | DES-001-19-02 | TASK-001-19-01 | TEST-001-19-02 | Non commencé | 0/1 exécutés et réussis |
| FR-1563 | SF-001-19 | UNDER_REVIEW | DES-001-19-02 | TASK-001-19-04 | TEST-001-19-03 | Non commencé | 0/1 exécutés et réussis |
| FR-1564 | SF-001-19 | UNDER_REVIEW | DES-001-19-03 | TASK-001-19-02 | TEST-001-19-04 | Non commencé | 0/1 exécutés et réussis |
| FR-1565 | SF-001-19 | UNDER_REVIEW | DES-001-19-03 | TASK-001-19-02 | TEST-001-19-05 | Non commencé | 0/1 exécutés et réussis |
| FR-1566 | SF-001-19 | UNDER_REVIEW | DES-001-19-03 | TASK-001-19-02 | TEST-001-19-05 | Non commencé | 0/1 exécutés et réussis |
| FR-1601 | SF-002-11 | UNDER_REVIEW | DES-002-11-01 | TASK-002-11-01 | TEST-002-11-01 | Non commencé | 0/1 exécutés et réussis |
| FR-1602 | SF-002-11 | UNDER_REVIEW | DES-002-11-01 | TASK-002-11-01 | TEST-002-11-02 | Non commencé | 0/1 exécutés et réussis |
| FR-1606 | SF-002-12 | UNDER_REVIEW | DES-002-12-01 | TASK-002-12-01 | TEST-002-12-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-1607 | SF-002-12 | UNDER_REVIEW | DES-002-12-02 | TASK-002-12-02 | TEST-002-12-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1608 | SF-002-12 | UNDER_REVIEW | DES-002-12-03 | TASK-002-12-03 | TEST-002-12-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1609 | SF-002-12 | UNDER_REVIEW | DES-002-12-01 | TASK-002-12-01 | TEST-002-12-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1610 | SF-002-12 | UNDER_REVIEW | DES-002-12-04 | TASK-002-12-04 | TEST-002-12-04 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1611 | SF-002-12 | UNDER_REVIEW | DES-002-12-02 | TASK-002-12-02 | TEST-002-12-05 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-1901 | SF-007-17 | UNDER_REVIEW | DES-007-17-01 | TASK-007-17-01, TASK-007-17-04 | TEST-007-17-01 | Fait (2026-11-09) — `app/js/agents/conformite.js`, `app/js/agents/orchestrateur.js`, `app/js/agents/parcours.js`, `app/js/agents/nolo.js` ; 0 écart de parité, Fait (2026-11-09) — `app/tests/parite_conformite.test.mjs`, `app/tests/orchestrateur.test.mjs` (rouges avant le code) | 1/1 exécutés et réussis |
| FR-1902 | SF-007-17 | UNDER_REVIEW | DES-007-17-02 | TASK-007-17-01, TASK-007-17-04 | TEST-007-17-02 | Fait (2026-11-09) — `app/js/agents/conformite.js`, `app/js/agents/orchestrateur.js`, `app/js/agents/parcours.js`, `app/js/agents/nolo.js` ; 0 écart de parité, Fait (2026-11-09) — `app/tests/parite_conformite.test.mjs`, `app/tests/orchestrateur.test.mjs` (rouges avant le code) | 1/1 exécutés et réussis |
| FR-1903 | SF-007-17 | UNDER_REVIEW | DES-007-17-03 | TASK-007-17-03 | TEST-007-17-03 | Fait (2026-11-09) — `tools/politique_json.py` (et `--verifier`), `app/data/politique.json` 1.4.0, `app/js/domain/politique.js` | 1/1 exécutés et réussis |
| FR-1904 | SF-007-17 | UNDER_REVIEW | DES-007-17-02, DES-007-17-04 | TASK-007-17-01, TASK-007-17-02, TASK-007-17-04 | TEST-007-17-04 | Fait (2026-11-09) — `app/js/agents/conformite.js`, `app/js/agents/orchestrateur.js`, `app/js/agents/parcours.js`, `app/js/agents/nolo.js` ; 0 écart de parité, Fait (2026-11-09) — `app/tests/parite_conformite.test.mjs`, `app/tests/orchestrateur.test.mjs` (rouges avant le code), Fait (2026-11-09) — `tools/scenarios/executer.py --exporter-attendus` : 3 908 cas, 89 décisions distinctes (S1 à S3 × 3 politiques, grille de 26 actions) | 1/1 exécutés et réussis |
| FR-1905 | SF-007-17 | UNDER_REVIEW | DES-007-17-01 | TASK-007-17-01, TASK-007-17-04 | TEST-007-17-05 | Fait (2026-11-09) — `app/js/agents/conformite.js`, `app/js/agents/orchestrateur.js`, `app/js/agents/parcours.js`, `app/js/agents/nolo.js` ; 0 écart de parité, Fait (2026-11-09) — `app/tests/parite_conformite.test.mjs`, `app/tests/orchestrateur.test.mjs` (rouges avant le code) | 1/1 exécutés et réussis |
| FR-1911 | SF-007-18 | UNDER_REVIEW | DES-007-18-01 | TASK-007-18-01, TASK-007-18-02 | TEST-007-18-01 | Fait (2026-11-09) — `app/js/ui/decision.js` ; panneau sur pistes, urgence, confidentiel, hors champ, Où aller, recherche ; catalogues `decision.*`, Fait (2026-11-09) — `app/tests/decision.test.mjs` | 1/1 exécutés et réussis |
| FR-1912 | SF-007-18 | UNDER_REVIEW | DES-007-18-01 | TASK-007-18-01, TASK-007-18-02 | TEST-007-18-02 | Fait (2026-11-09) — `app/js/ui/decision.js` ; panneau sur pistes, urgence, confidentiel, hors champ, Où aller, recherche ; catalogues `decision.*`, Fait (2026-11-09) — `app/tests/decision.test.mjs` | 1/1 exécutés et réussis |
| FR-1913 | SF-007-18 | UNDER_REVIEW | DES-007-18-02 | TASK-007-18-01, TASK-007-18-02 | TEST-007-18-03 | Fait (2026-11-09) — `app/js/ui/decision.js` ; panneau sur pistes, urgence, confidentiel, hors champ, Où aller, recherche ; catalogues `decision.*`, Fait (2026-11-09) — `app/tests/decision.test.mjs` | 1/1 exécutés et réussis |
| FR-1914 | SF-007-18 | UNDER_REVIEW | DES-007-18-01 | TASK-007-18-01, TASK-007-18-02 | TEST-007-18-04 | Fait (2026-11-09) — `app/js/ui/decision.js` ; panneau sur pistes, urgence, confidentiel, hors champ, Où aller, recherche ; catalogues `decision.*`, Fait (2026-11-09) — `app/tests/decision.test.mjs` | 1/1 exécutés et réussis |
| FR-1915 | SF-007-18 | UNDER_REVIEW | DES-007-18-02 | TASK-007-18-01, TASK-007-18-02 | TEST-007-18-05 | Fait (2026-11-09) — `app/js/ui/decision.js` ; panneau sur pistes, urgence, confidentiel, hors champ, Où aller, recherche ; catalogues `decision.*`, Fait (2026-11-09) — `app/tests/decision.test.mjs` | 1/1 exécutés et réussis |
| FR-1921 | SF-007-19 | UNDER_REVIEW | DES-007-19-01 | TASK-007-19-01, TASK-007-19-02 | TEST-007-19-01 | Fait (2026-11-09) — `app/js/agents/cellule.js` (`derouler`, `MANDATS`), Fait (2026-11-09) — `app/tests/cellule.test.mjs` | 1/1 exécutés et réussis |
| FR-1922 | SF-007-19 | UNDER_REVIEW | DES-007-19-01 | TASK-007-19-01, TASK-007-19-02 | TEST-007-19-02 | Fait (2026-11-09) — `app/js/agents/cellule.js` (`derouler`, `MANDATS`), Fait (2026-11-09) — `app/tests/cellule.test.mjs` | 1/1 exécutés et réussis |
| FR-1923 | SF-007-19 | UNDER_REVIEW | DES-007-19-02 | TASK-007-19-01, TASK-007-19-02 | TEST-007-19-03 | Fait (2026-11-09) — `app/js/agents/cellule.js` (`derouler`, `MANDATS`), Fait (2026-11-09) — `app/tests/cellule.test.mjs` | 1/1 exécutés et réussis |
| FR-1924 | SF-007-19 | UNDER_REVIEW | DES-007-19-01 | TASK-007-19-01, TASK-007-19-02 | TEST-007-19-04 | Fait (2026-11-09) — `app/js/agents/cellule.js` (`derouler`, `MANDATS`), Fait (2026-11-09) — `app/tests/cellule.test.mjs` | 1/1 exécutés et réussis |
| FR-1925 | SF-007-19 | UNDER_REVIEW | DES-007-19-03 | TASK-007-19-01, TASK-007-19-03 | TEST-007-19-01 | Fait (2026-11-09) — `app/tests/cellule.test.mjs`, Fait (2026-11-09) — vue `#/ministere/coordination` (fil daté, avis APDP, décision motivée du point focal) | 1/1 exécutés et réussis |
| FR-1931 | SF-007-20 | UNDER_REVIEW | DES-007-20-01 | TASK-007-20-01 | TEST-007-20-01 | Fait (2026-11-09) — `app/tests/ab.test.mjs`, `app/js/agents/ab.js`, vue `#/ministere/ab` (6 violations sans gouvernance, 0 avec ; mode simulé) | 1/1 exécutés et réussis |
| FR-1932 | SF-007-20 | UNDER_REVIEW | DES-007-20-01 | TASK-007-20-01 | TEST-007-20-01 | Fait (2026-11-09) — `app/tests/ab.test.mjs`, `app/js/agents/ab.js`, vue `#/ministere/ab` (6 violations sans gouvernance, 0 avec ; mode simulé) | 1/1 exécutés et réussis |
| FR-1933 | SF-007-20 | UNDER_REVIEW | DES-007-20-01 | TASK-007-20-01 | TEST-007-20-02 | Fait (2026-11-09) — `app/tests/ab.test.mjs`, `app/js/agents/ab.js`, vue `#/ministere/ab` (6 violations sans gouvernance, 0 avec ; mode simulé) | 1/1 exécutés et réussis |
| FR-1941 | SF-007-21 | UNDER_REVIEW | DES-007-21-01 | TASK-007-21-01 | TEST-007-21-01 | Fait (2026-11-09) — `app/tests/journal.test.mjs`, `app/js/agents/journal.js`, `app/js/core/sha256.js`, `app/js/core/canonique.js` (empreintes identiques au journal Python) | 1/1 exécutés et réussis |
| FR-1942 | SF-007-21 | UNDER_REVIEW | DES-007-21-02 | TASK-007-21-02 | TEST-007-21-02 | Fait (2026-11-09) — vue `#/ministere/journal` : vérifier la chaîne, altérer puis restaurer | 1/1 exécutés et réussis |
| FR-1943 | SF-007-21 | UNDER_REVIEW | DES-007-21-02 | TASK-007-21-02 | TEST-007-21-02 | Fait (2026-11-09) — vue `#/ministere/journal` : vérifier la chaîne, altérer puis restaurer | 1/1 exécutés et réussis |
| FR-1944 | SF-007-21 | UNDER_REVIEW | DES-007-21-01 | TASK-007-21-01 | TEST-007-21-03 | Fait (2026-11-09) — `app/tests/journal.test.mjs`, `app/js/agents/journal.js`, `app/js/core/sha256.js`, `app/js/core/canonique.js` (empreintes identiques au journal Python) | 1/1 exécutés et réussis |
| FR-2001 | SF-014-01 | UNDER_REVIEW | DES-014-01-01 | TASK-014-01-01 | TEST-014-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2002 | SF-014-01 | UNDER_REVIEW | DES-014-01-01 | TASK-014-01-01 | TEST-014-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2005 | SF-014-02 | UNDER_REVIEW | DES-014-02-01, DES-014-02-02 | TASK-014-02-01 | TEST-014-02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2006 | SF-014-02 | UNDER_REVIEW | DES-014-02-01 | TASK-014-02-01 | TEST-014-02-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2009 | SF-014-03 | UNDER_REVIEW | DES-014-03-01 | TASK-014-03-01 | TEST-014-03-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2010 | SF-014-03 | UNDER_REVIEW | DES-014-03-01 | TASK-014-03-01 | TEST-014-03-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2013 | SF-014-04 | UNDER_REVIEW | DES-014-04-01 | TASK-014-04-01 | TEST-014-04-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2014 | SF-014-04 | UNDER_REVIEW | DES-014-04-01, DES-014-04-02 | TASK-014-04-01 | TEST-014-04-01, TEST-014-04-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/2 exécutés et réussis |
| FR-2017 | SF-014-05 | UNDER_REVIEW | DES-014-05-02 | TASK-014-05-01 | TEST-014-05-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2018 | SF-014-05 | UNDER_REVIEW | DES-014-05-01 | TASK-014-05-01 | TEST-014-05-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2021 | SF-014-06 | UNDER_REVIEW | DES-014-06-01 | TASK-014-06-01 | TEST-014-06-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2101 | SF-015-01 | UNDER_REVIEW | DES-015-01-01 | TASK-015-01-01 | TEST-015-01-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2102 | SF-015-01 | UNDER_REVIEW | DES-015-01-01 | TASK-015-01-01 | TEST-015-01-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2106 | SF-015-02 | UNDER_REVIEW | DES-015-02-01 | TASK-015-02-01 | TEST-015-02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2107 | SF-015-02 | UNDER_REVIEW | DES-015-02-01 | TASK-015-02-01 | TEST-015-02-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2108 | SF-015-02 | UNDER_REVIEW | DES-015-02-01 | TASK-015-02-01 | TEST-015-02-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2113 | SF-015-03 | UNDER_REVIEW | DES-015-03-01 | TASK-015-03-01, TASK-015-03-03 | TEST-015-03-01 | Fait (2026-11-09) — `app/tests/qualite.test.mjs`, Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2114 | SF-015-03 | UNDER_REVIEW | DES-015-03-02 | TASK-015-03-02 | TEST-015-03-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2115 | SF-015-03 | UNDER_REVIEW | DES-015-03-02 | TASK-015-03-02 | TEST-015-03-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2119 | SF-015-04 | UNDER_REVIEW | DES-015-04-01 | TASK-015-04-01 | TEST-015-04-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2120 | SF-015-04 | UNDER_REVIEW | DES-015-04-02 | TASK-015-04-02 | TEST-015-04-02 | Fait (2026-11-09) — console : politique complète, version et empreinte canonique vérifiée ; `S.POLITIQUE` retiré | 1/1 exécutés et réussis |
| FR-2124 | SF-015-05 | UNDER_REVIEW | DES-015-05-01 | TASK-015-05-01 | TEST-015-05-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 1/1 exécutés et réussis |
| FR-2125 | SF-015-05 | UNDER_REVIEW | DES-015-05-02 | TASK-015-05-02 | TEST-015-05-02 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2126 | SF-015-05 | UNDER_REVIEW | DES-015-05-02 | TASK-015-05-02 | TEST-015-05-03 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2130 | SF-015-06 | UNDER_REVIEW | DES-015-06-01 | TASK-015-06-01 | TEST-015-06-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2131 | SF-015-06 | UNDER_REVIEW | DES-015-06-02 | TASK-015-06-02 | TEST-015-06-02 | Fait (2026-11-09) — `app/tests/qualite.test.mjs` | 1/1 exécutés et réussis |
| FR-2201 | SF-016-01 | UNDER_REVIEW | DES-016-01-01 | TASK-016-01-01, TASK-016-01-02 | TEST-016-01-01 | Fait (2026-11-09) — `app/js/agents/conseiller/bm25.js`, `app/js/agents/conseiller/glossaire.js` (glossaire 1.2.0, champ `courant_fr`, DES-016-01-03), Fait (2026-11-09) — `app/tests/conseiller.test.mjs`, `tools/exporter_classements.py` (oracle) | 1/1 exécutés et réussis |
| FR-2202 | SF-016-01 | UNDER_REVIEW | DES-016-01-01 | TASK-016-01-01, TASK-016-01-02 | TEST-016-01-02 | Fait (2026-11-09) — `app/js/agents/conseiller/bm25.js`, `app/js/agents/conseiller/glossaire.js` (glossaire 1.2.0, champ `courant_fr`, DES-016-01-03), Fait (2026-11-09) — `app/tests/conseiller.test.mjs`, `tools/exporter_classements.py` (oracle) | 1/1 exécutés et réussis |
| FR-2203 | SF-016-01 | UNDER_REVIEW | DES-016-01-02, DES-016-01-03 | TASK-016-01-01, TASK-016-01-02 | TEST-016-01-03 | Fait (2026-11-09) — `app/js/agents/conseiller/bm25.js`, `app/js/agents/conseiller/glossaire.js` (glossaire 1.2.0, champ `courant_fr`, DES-016-01-03), Fait (2026-11-09) — `app/tests/conseiller.test.mjs`, `tools/exporter_classements.py` (oracle) | 1/1 exécutés et réussis |
| FR-2204 | SF-016-01 | UNDER_REVIEW | DES-016-01-01 | TASK-016-01-01, TASK-016-01-02 | TEST-016-01-01 | Fait (2026-11-09) — `app/js/agents/conseiller/bm25.js`, `app/js/agents/conseiller/glossaire.js` (glossaire 1.2.0, champ `courant_fr`, DES-016-01-03), Fait (2026-11-09) — `app/tests/conseiller.test.mjs`, `tools/exporter_classements.py` (oracle) | 1/1 exécutés et réussis |
| FR-2206 | SF-016-02 | UNDER_REVIEW | DES-016-02-01 | TASK-016-02-01 | TEST-016-02-01 | Fait (2026-11-09) — `app/js/agents/conseiller/repondre.js` (seuil de pertinence 8, BR-016-02-01) | 1/1 exécutés et réussis |
| FR-2207 | SF-016-02 | UNDER_REVIEW | DES-016-02-01 | TASK-016-02-01 | TEST-016-02-02 | Fait (2026-11-09) — `app/js/agents/conseiller/repondre.js` (seuil de pertinence 8, BR-016-02-01) | 1/1 exécutés et réussis |
| FR-2208 | SF-016-02 | UNDER_REVIEW | DES-016-02-01 | TASK-016-02-01 | TEST-016-02-03 | Fait (2026-11-09) — `app/js/agents/conseiller/repondre.js` (seuil de pertinence 8, BR-016-02-01) | 1/1 exécutés et réussis |
| FR-2209 | SF-016-02 | UNDER_REVIEW | DES-016-02-01 | TASK-016-02-01 | TEST-016-02-04 | Fait (2026-11-09) — `app/js/agents/conseiller/repondre.js` (seuil de pertinence 8, BR-016-02-01) | 1/1 exécutés et réussis |
| FR-2211 | SF-016-03 | UNDER_REVIEW | DES-016-03-01 | TASK-016-03-01 | TEST-016-03-01 | Fait (2026-11-09) — `app/js/screens/patient/droits.js`, route `#/droits`, liens depuis l'accueil, le tableau de bord et la console ; catalogues `droits.*` | 1/1 exécutés et réussis |
| FR-2212 | SF-016-03 | UNDER_REVIEW | DES-016-03-01 | TASK-016-03-01 | TEST-016-03-02 | Fait (2026-11-09) — `app/js/screens/patient/droits.js`, route `#/droits`, liens depuis l'accueil, le tableau de bord et la console ; catalogues `droits.*` | 1/1 exécutés et réussis |
| FR-2213 | SF-016-03 | UNDER_REVIEW | DES-016-03-01 | TASK-016-03-01 | TEST-016-03-03 | Fait (2026-11-09) — `app/js/screens/patient/droits.js`, route `#/droits`, liens depuis l'accueil, le tableau de bord et la console ; catalogues `droits.*` | 1/1 exécutés et réussis |
| FR-2215 | SF-016-04 | UNDER_REVIEW | DES-016-04-01 | TASK-016-04-01 | TEST-016-04-01 | Fait (2026-11-09) — `tools/evaluer_conseiller.mjs` → `docs/quality/eval-conseiller-2026-11-09.txt` (document 18/18, référence 15/18, anglais 5/5 ; réserve : sans `courant_fr`, référence 12/18) | 1/1 exécutés et réussis |
| FR-2216 | SF-016-04 | UNDER_REVIEW | DES-016-04-01 | TASK-016-04-01 | TEST-016-04-02 | Fait (2026-11-09) — `tools/evaluer_conseiller.mjs` → `docs/quality/eval-conseiller-2026-11-09.txt` (document 18/18, référence 15/18, anglais 5/5 ; réserve : sans `courant_fr`, référence 12/18) | 1/1 exécutés et réussis |
| FR-2218 | SF-016-05 | UNDER_REVIEW | DES-016-05-01 | TASK-016-05-01 | TEST-016-05-01 | Non commencé | 0/1 exécutés et réussis |
| FR-2219 | SF-016-05 | UNDER_REVIEW | DES-016-05-01 | TASK-016-05-01 | TEST-016-05-02 | Non commencé | 0/1 exécutés et réussis |
| FR-2301 | SF-017-01 | APPROVED | DES-017-01-01 | TASK-017-01-01, TASK-017-01-02 | TEST-017-01-01 | Fait (2026-11-09) — D-038 : FR-2302 et DES-017-01-01 corrigés, §9 de design.md vidé, Fait (2026-11-09) — `docs/submission/rapport-technique-en.md`, PDF `../livrables/rapport-technique-en.pdf` (`tools/rapport_pdf.py`), contrôle `tools/verifier_rapport.py` ; coordonnées de l'équipe et lien de la vidéo laissés à compléter | 1/1 exécutés et réussis |
| FR-2302 | SF-017-01 | APPROVED | DES-017-01-01 | TASK-017-01-01, TASK-017-01-02 | TEST-017-01-02 | Fait (2026-11-09) — D-038 : FR-2302 et DES-017-01-01 corrigés, §9 de design.md vidé, Fait (2026-11-09) — `docs/submission/rapport-technique-en.md`, PDF `../livrables/rapport-technique-en.pdf` (`tools/rapport_pdf.py`), contrôle `tools/verifier_rapport.py` ; coordonnées de l'équipe et lien de la vidéo laissés à compléter | 1/1 exécutés et réussis |
| FR-2303 | SF-017-01 | APPROVED | DES-017-01-01 | TASK-017-01-01 | TEST-017-01-03 | Fait (2026-11-09) — `docs/submission/rapport-technique-en.md`, PDF `../livrables/rapport-technique-en.pdf` (`tools/rapport_pdf.py`), contrôle `tools/verifier_rapport.py` ; coordonnées de l'équipe et lien de la vidéo laissés à compléter | 1/1 exécutés et réussis |
| FR-2304 | SF-017-01 | APPROVED | DES-017-01-01 | TASK-017-01-01 | TEST-017-01-03 | Fait (2026-11-09) — `docs/submission/rapport-technique-en.md`, PDF `../livrables/rapport-technique-en.pdf` (`tools/rapport_pdf.py`), contrôle `tools/verifier_rapport.py` ; coordonnées de l'équipe et lien de la vidéo laissés à compléter | 1/1 exécutés et réussis |
| FR-2306 | SF-017-02 | APPROVED | DES-017-02-01 | TASK-017-02-01 | TEST-017-02-01 | Fait (2026-11-09, demande explicite du propriétaire, D-036) ; README.md et README.fr.md corrigés le 2026-11-09 : quatre verdicts de l'agent Conformité (FR-2306, D-037) | 0/1 exécutés et réussis |
| FR-2307 | SF-017-02 | APPROVED | DES-017-02-01 | TASK-017-02-01 | TEST-017-02-02 | Fait (2026-11-09, demande explicite du propriétaire, D-036) ; README.md et README.fr.md corrigés le 2026-11-09 : quatre verdicts de l'agent Conformité (FR-2306, D-037) | 1/1 exécutés et réussis |
| FR-2308 | SF-017-02 | APPROVED | DES-017-02-01 | TASK-017-02-02 | TEST-017-02-03 | Fait (2026-11-09) | 1/1 exécutés et réussis |
| FR-2309 | SF-017-02 | APPROVED | DES-017-02-01 | TASK-017-02-01 | TEST-017-02-04 | Fait (2026-11-09, demande explicite du propriétaire, D-036) ; README.md et README.fr.md corrigés le 2026-11-09 : quatre verdicts de l'agent Conformité (FR-2306, D-037) | 1/1 exécutés et réussis |
| FR-2312 | SF-017-03 | UNDER_REVIEW | DES-017-03-01 | TASK-017-03-01 | TEST-017-03-01 | Non commencé | 0/1 exécutés et réussis |
| FR-2313 | SF-017-03 | UNDER_REVIEW | DES-017-03-01 | TASK-017-03-01 | TEST-017-03-01 | Non commencé | 0/1 exécutés et réussis |
| FR-2314 | SF-017-03 | UNDER_REVIEW | DES-017-03-01 | TASK-017-03-01 | TEST-017-03-02 | Non commencé | 0/1 exécutés et réussis |
| FR-2315 | SF-017-03 | UNDER_REVIEW | DES-017-03-01 | TASK-017-03-01 | TEST-017-03-03 | Non commencé | 0/1 exécutés et réussis |
| FR-2317 | SF-017-04 | UNDER_REVIEW | DES-017-04-01 | TASK-017-04-01 | TEST-017-04-01 | Fait (2026-11-09) — `kb/README.md` déjà conforme (version publique, procédure UIT) ; contrôle automatisé dans `tests/unit/test_vague_c.py` | 1/1 exécutés et réussis |
| FR-2318 | SF-017-04 | UNDER_REVIEW | DES-017-04-01 | TASK-017-04-01 | TEST-017-04-02 | Fait (2026-11-09) — `kb/README.md` déjà conforme (version publique, procédure UIT) ; contrôle automatisé dans `tests/unit/test_vague_c.py` | 1/1 exécutés et réussis |
| FR-2320 | SF-017-05 | UNDER_REVIEW | DES-017-05-01 | TASK-017-05-01 | TEST-017-05-01 | Fait (2026-11-09, demande explicite du propriétaire, D-036) | 1/1 exécutés et réussis |
| FR-2321 | SF-017-05 | UNDER_REVIEW | DES-017-05-01 | TASK-017-05-01 | TEST-017-05-02 | Fait (2026-11-09, demande explicite du propriétaire, D-036) | 1/1 exécutés et réussis |
| FR-2322 | SF-017-05 | UNDER_REVIEW | DES-017-05-01 | TASK-017-05-02 | TEST-017-05-03 | Fait (2026-11-09, demande explicite du propriétaire, D-036) | 1/1 exécutés et réussis |
| FR-2401 | MT-002 | UNDER_REVIEW | DES-M02-01 | TASK-M02-01 | TEST-M02-01 | Fait (code existant, rétro-spécifié le 2026-11-09) | 0/1 exécutés et réussis |
| FR-2402 | MT-002 | UNDER_REVIEW | DES-M02-01 | TASK-M02-02 | TEST-M02-02 | Fait (2026-11-09, demande explicite du propriétaire, D-036) | 1/1 exécutés et réussis |
| FR-2403 | MT-002 | UNDER_REVIEW | DES-M02-02 | TASK-M02-03 | TEST-M02-03 | Fait (2026-11-09, demande explicite du propriétaire, D-036) | 1/1 exécutés et réussis |
| NFR-101 | SF-001-03 | UNDER_REVIEW | DES-001-03-03 | TASK-001-03-04 | TEST-001-03-06 | Fait (2026-11-09) — `normaliser`, `construireIndex`, `extraire` (`src/client/ondevice/extracteur_lexical.mjs`), déjà livrés ; parité de la normalisation avec Python testée | 1/1 exécutés et réussis |
| NFR-102 | SF-001-03 | UNDER_REVIEW | DES-001-03-01 | TASK-001-03-01 | TEST-001-03-01 | Fait (2026-11-09) — `chargerPaquet` et `chargerReferentiel` (repli sur la version embarquée) dans `src/client/ondevice/referentiel.mjs` (nom du fichier livré par l'incrément D-025) | 1/1 exécutés et réussis |
| NFR-1101 | SF-011-08 | UNDER_REVIEW |  |  | TEST-011-08-04 | Non commencé | 1/1 exécutés et réussis |
| NFR-1401 | MT-001 | UNDER_REVIEW | DES-M01-06 | TASK-M01-02 | TEST-M01-02 | Non commencé | 0/1 exécutés et réussis |
| NFR-1402 | MT-001 | UNDER_REVIEW | DES-M01-01 | TASK-M01-02 | TEST-M01-02 | Non commencé | 0/1 exécutés et réussis |
| NFR-1501 | SF-001-13 | UNDER_REVIEW |  |  | TEST-001-13-06 | Non commencé | 0/1 exécutés et réussis |
| NFR-1901 | SF-007-17 | UNDER_REVIEW |  |  | TEST-007-17-06 | Non commencé | 1/1 exécutés et réussis |
| NFR-2201 | SF-016-01 | UNDER_REVIEW |  |  | TEST-016-01-04 | Non commencé | 1/1 exécutés et réussis |

## Erreurs

Aucune.

## Avertissements

Aucun.
