# Index des tâches restantes

Généré par `python3 tools/sdd_index.py` — ne pas modifier à la main.

30 tâches dont le statut n'est pas « Fait ». Vagues : A soumission, B agents dans Nolo, C écarts de l'existant, D suite (catalogue §6).
Rappel : une tâche ne démarre que si son dossier est `APPROVED` ou `READY_FOR_DEV` (CLAUDE.md, protocole).

## Vague C (15 tâches)

| Dossier | Tâche | Statut | Exigences | Fichiers | Dépend de | Tests |
|---|---|---|---|---|---|---|
| [MT-001](maintenance/mt-001-migration-arborescence/tasks.md) Migration de l'arborescence vers `src/` | **TASK-M01-01** Mesurer l'état avant migration | À faire | FR-1403, FR-1404 |  | aucune | TEST-M01-01 |
| [MT-001](maintenance/mt-001-migration-arborescence/tasks.md) Migration de l'arborescence vers `src/` | **TASK-M01-02** Créer le module de chemins et déplacer le code | À faire | FR-1401, FR-1402, NFR-1401, NFR-1402 |  | TASK-M01-01 | TEST-M01-02 |
| [MT-001](maintenance/mt-001-migration-arborescence/tasks.md) Migration de l'arborescence vers `src/` | **TASK-M01-03** Réécrire les contrôles existants en tests pytest | À faire | FR-1403 |  | TASK-M01-02 | TEST-M01-03 |
| [MT-001](maintenance/mt-001-migration-arborescence/tasks.md) Migration de l'arborescence vers `src/` | **TASK-M01-04** Vérifier l'identité de l'évaluation et de la base | À faire | FR-1404 |  | TASK-M01-02 | TEST-M01-04, TEST-M01-05 |
| [MT-001](maintenance/mt-001-migration-arborescence/tasks.md) Migration de l'arborescence vers `src/` | **TASK-M01-05** Exclure les documents non publiables | À faire | FR-1405 |  | TASK-M01-02 | TEST-M01-06 |
| [MT-001](maintenance/mt-001-migration-arborescence/tasks.md) Migration de l'arborescence vers `src/` | **TASK-M01-06** Configurer pytest | À faire | FR-1406 |  | TASK-M01-03 | TEST-M01-07 |
| [SF-001-05](feature-001-orientation/sf-001-05-regles-enfant-pcime/tasks.md) Règles PCIME de l'enfant de 2 mois à 5 ans | **TASK-001-05-01** Faire valider les règles PCIME et leur correspondance par un clinicien | À faire | FR-131, FR-132, FR-133, FR-134, FR-135 |  | aucun (tâche de l'équipe, hors environnement de Claude) | TEST-001-05-02, TEST-001-05-03, TEST-001-05-04, TEST-001-05-05, TEST-001-05-06 (à relancer après toute correction) |
| [SF-001-06](feature-001-orientation/sf-001-06-regles-iitt/tasks.md) Critères de l'outil IITT (12 ans et plus, moins de 12 ans) | **TASK-001-06-01** Faire valider la transcription IITT et sa correspondance par un clinicien | À faire | FR-140, FR-141, FR-142, FR-143, FR-144, FR-145, FR-146 |  | aucun (tâche de l'équipe, hors environnement de Claude) | TEST-001-06-01 à TEST-001-06-05 (à relancer après toute correction) |
| [SF-001-06](feature-001-orientation/sf-001-06-regles-iitt/tasks.md) Critères de l'outil IITT (12 ans et plus, moins de 12 ans) | **TASK-001-06-02** Obtenir l'avis du juriste sur la grossesse, le priapisme et la lacune L13 | À faire | FR-146 |  | aucun (tâche de l'équipe) | TEST-001-06-05 |
| [SF-001-09](feature-001-orientation/sf-001-09-cas-ambigu/tasks.md) Cas ambigu : relèvement prudent et renvoi vers un soignant | **TASK-001-09-01** État « rien reconnu » et seuil d'ambiguïté | À faire | FR-180, FR-181 | `app/js/screens/patient/verifier.js`, `app/js/domain/engine.js` (`nonReconnus`) | D-013 approuvée | TEST-001-09-01, TEST-001-09-02 |
| [SF-007-12](feature-007-gouvernance/sf-007-12-rejeu/tasks.md) Rejeu d'une session | **TASK-007-12-01** Rejeu | À faire | FR-773, FR-774 | `tools/scenarios/rejouer.py` | D-016 | TEST-007-12-01, TEST-007-12-02 |
| [SF-008-06](feature-008-consentements-droits/sf-008-06-droits-decision-automatisee/tasks.md) Droits face à la décision automatisée | **TASK-008-06-01** Bloc des droits sur les écrans de résultat | À faire | FR-108, FR-851 | `app/js/ui/components.js`, cinq écrans, catalogues | D-014 | TEST-008-06-01 |
| [SF-011-03](feature-011-base-connaissances/sf-011-03-recherche/tasks.md) Recherche documentaire (BM25 ; ChromaDB en option) | **TASK-011-03-02** Ingestion ChromaDB et mesure (poste de l'équipe) | À faire | FR-1110, FR-1111 | `kb/ingest_chroma.py`, `docs/quality/` | — | TEST-011-03-02, TEST-011-03-03 |
| [SF-013-05](feature-013-application/sf-013-05-design-system/tasks.md) Design system « Premium Medical Intelligence » | **TASK-013-05-05** Appliquer la décision sur Q-013-05-01 (rouge des erreurs de saisie) | À faire | FR-1322 | `app/css/components.css`, `app/css/pro.css`, `app/docs/DESIGN.md` | décision du propriétaire sur Q-013-05-01 | TEST-013-05-03 |
| [SF-013-10](feature-013-application/sf-013-10-inspection-visuelle/tasks.md) Inspection visuelle automatisée | **TASK-013-10-03** Assertions de contenu par état | À faire | FR-1347 | `tools/inspecter.py` | — | TEST-013-10-03 |

## Vague D (15 tâches)

| Dossier | Tâche | Statut | Exigences | Fichiers | Dépend de | Tests |
|---|---|---|---|---|---|---|
| [SF-001-19](feature-001-orientation/sf-001-19-modele-ddxplus/tasks.md) Modèle DDXPlus sur l'appareil, parité et évaluation | **TASK-001-19-01** Télécharger DDXPlus et écrire la fiche | À faire | FR-1562 | `kb/datasets/ddxplus.md` | — | TEST-001-19-02 |
| [SF-001-19](feature-001-orientation/sf-001-19-modele-ddxplus/tasks.md) Modèle DDXPlus sur l'appareil, parité et évaluation | **TASK-001-19-02** Audit des éléments, correspondance, catégories | À faire | FR-1564, FR-1565, FR-1566 | `rules/ddxplus_*.yaml` | — | TEST-001-19-04, TEST-001-19-05 |
| [SF-001-19](feature-001-orientation/sf-001-19-modele-ddxplus/tasks.md) Modèle DDXPlus sur l'appareil, parité et évaluation | **TASK-001-19-03** Entraîner, exporter, moteur JS, parité | À faire | FR-1561 | `tools/ddxplus/`, `app/js/domain/modele.js`, `app/tests/modele.test.mjs` | TASK-001-19-02 | TEST-001-19-01 |
| [SF-001-19](feature-001-orientation/sf-001-19-modele-ddxplus/tasks.md) Modèle DDXPlus sur l'appareil, parité et évaluation | **TASK-001-19-04** Évaluation et recalage des seuils | À faire | FR-1563 | `tools/ddxplus/evaluer.py`, `app/js/domain/engine.js` (`POLITIQUE`) | TASK-001-19-03 | TEST-001-19-03 |
| [SF-002-08](feature-002-surveillance/sf-002-08-carte-publique/tasks.md) Carte épidémiologique publique | **TASK-002-08-01** Carte publique | À faire | FR-208, FR-255 | `app/js/screens/patient/carte.js`, `app/js/app.js` (route `#/carte`) | — | TEST-002-08-01, TEST-002-08-02 |
| [SF-002-10](feature-002-surveillance/sf-002-10-aire-frontaliere/tasks.md) Signal en aire frontalière | **TASK-002-10-01** Attribut et mention | À faire | FR-209 | `app/js/domain/surveillance.js`, console | — | TEST-002-10-01 |
| [SF-002-11](feature-002-surveillance/sf-002-11-signalement-communautaire/tasks.md) Signalement d'un événement communautaire | **TASK-002-11-01** Formulaire et circuit | À faire | FR-1601, FR-1602 | `app/js/screens/patient/signaler-evenement.js` | — | TEST-002-11-01, TEST-002-11-02 |
| [SF-006-05](feature-006-fiabilite-pharmacies/sf-006-05-decision-rafale/tasks.md) Décision du modérateur sur une rafale | **TASK-006-05-01** Règle de référence | À faire | FR-610 | `kb/services/orientation_services.py` (référence Python) ; `kb/rules/fiabilite_pharmacies.yaml` | — | TEST-006-05-01 |
| [SF-006-06](feature-006-fiabilite-pharmacies/sf-006-06-contestation/tasks.md) Contestation par la pharmacie | **TASK-006-06-01** Règle de référence | À faire | FR-607 | `kb/services/orientation_services.py` (référence Python) ; `kb/rules/fiabilite_pharmacies.yaml` | — | TEST-006-06-01 |
| [SF-006-07](feature-006-fiabilite-pharmacies/sf-006-07-consultation-pharmacie/tasks.md) Consultation de son score par la pharmacie | **TASK-006-07-01** Règle de référence | À faire | FR-622 | `app/js/screens/pro/vue-fiabilite.js` | — | TEST-006-07-01 |
| [SF-006-08](feature-006-fiabilite-pharmacies/sf-006-08-signalement-sensible/tasks.md) Signalement sur une classe sensible | **TASK-006-08-01** Règle de référence | Partiel | FR-609 | `kb/services/orientation_services.py` (référence Python) ; `kb/rules/fiabilite_pharmacies.yaml` | — | TEST-006-08-01 |
| [SF-009-03](feature-009-acces-roles-comptes/sf-009-03-compte-pseudonyme/tasks.md) Compte pseudonyme du citoyen | **TASK-009-03-01** Pseudonyme local | À faire | FR-912, FR-913 | `app/js/domain/pseudonyme.js` | D-011 ; SF-007-07 | TEST-009-03-01, TEST-009-03-02 |
| [SF-012-05](feature-012-donnees-scenarios/sf-012-05-scenario-s4/tasks.md) Scénario S4 : module POC gouverné et non gouverné | **TASK-012-05-01** Scénario S4 | À faire | FR-1216, FR-1217 | `tools/scenarios/executer.py`, `app/js/agents/ab.js` | SF-007-17 | TEST-012-05-01 |
| [SF-016-05](feature-016-conseiller-droits/sf-016-05-llm-local/tasks.md) LLM local optionnel : reformuler les extraits, jamais décider | **TASK-016-05-01** Adaptateur et garde de citation | À faire | FR-2218, FR-2219 | `app/js/agents/conseiller/llm.js` | — | TEST-016-05-01, TEST-016-05-02 |
| [SF-017-03](feature-017-livrables/sf-017-03-video/tasks.md) Vidéo de démonstration (≤ 7 min) | **TASK-017-03-01** Tourner et monter | À faire | FR-2312, FR-2313, FR-2314, FR-2315 | `tools/video/`, `docs/submission/video/` | Validation du déroulé | TEST-017-03-01, TEST-017-03-02, TEST-017-03-03 |

