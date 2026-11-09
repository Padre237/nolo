# CLAUDE.md — Nolo : règles de travail du dépôt

Nolo (« santé » en douala) : application web progressive qui aide une personne au Cameroun à décrire ce qu'elle ressent, à être alertée en cas de danger, à trouver la bonne structure, un service, un médicament ou du sang ; espace des établissements de santé ; console du ministère (surveillance, agréments, politique). Agents gouvernés par le droit camerounais, journal chaîné, base de connaissances traçable. ITU AI for Good Lab Hackathon (soumission le 10 novembre 2026 ; équipe CENADI EQUIPE 2).

Ce fichier est lu au début de chaque session. Il prime sur toute habitude de génération rapide. **Le dépôt est la mémoire du projet : rien de ce qui compte ne doit vivre seulement dans une conversation.**

## 0. Reprendre le travail (à faire à chaque nouvelle session, dans cet ordre)

1. Lire ce fichier en entier.
2. Lire `docs/ETAT.md` : ce qui est fait, ce qui est en cours, **la prochaine tâche** et la commande qui la vérifie, les décisions en attente.
3. Ouvrir le dossier de la prochaine tâche (`docs/specifications/feature-…/sf-…/`) et lire le §10 de son `requirements.md` : la liste exacte des fichiers à charger. Ne charger rien d'autre tant que la tâche ne l'exige pas.
4. Vérifier le statut du dossier : une tâche « À faire » ne démarre que si le dossier est `APPROVED` ou `READY_FOR_DEV`. Sinon : **s'arrêter**, présenter la spécification, ses critères et le plan, et demander l'approbation explicite (protocole §1).
5. Exécuter la tâche selon le §11 (fin de tâche) : tests écrits avant le code, exécution réelle, preuve datée, statuts mis à jour, `docs/ETAT.md` mis à jour.

Les commandes `/reprendre`, `/specifier`, `/implementer` et `/verifier` (`.claude/commands/`) déroulent ces étapes.

## 1. Protocole obligatoire (texte du propriétaire du projet)

Le protocole fourni par le propriétaire s'applique sans exception. Texte intégral : `docs/product/protocole-sdd.md` ; version condensée en annexe A. En résumé :

- **Aucune implémentation sans dossier de spécification complet, approuvé et READY_FOR_DEV**, quelle que soit la taille du changement (bouton, champ, règle de validation, route, schéma, correctif).
- Chaque fonctionnalité, sous-fonctionnalité, workflow ou changement possède son propre dossier : `requirements.md`, `design.md`, `tasks.md`, `tests.md`.
- Granularité **fonctionnelle**, pas technique : une capacité métier = une sous-fonctionnalité ; à l'intérieur, granularité maximale (catalogue §1, règle 4).
- Ne jamais inventer une exigence, ni trancher seul une décision métier ambiguë : la consigner en question ouverte (`Q-…`) puis en décision (`D-…`) dans `docs/product/decisions.md`.
- Ne jamais déclarer un test réussi sans l'avoir exécuté ; joindre la preuve (commande, sortie, date) dans `docs/quality/`.
- La spécification est la source de vérité : le code s'y conforme, pas l'inverse. Un écart découvert se consigne au §9 du `design.md` avec une tâche.

## 2. Workflow en 8 étapes (à suivre dans l'ordre)

1. **Analyse** : lire ce fichier, la documentation concernée et le code existant avant toute proposition.
2. **Spécification** : `requirements.md` (exigences identifiées, critères d'acceptation mesurables, cas limites, exclusions, questions).
3. **Conception** : `design.md` (workflow, états d'interface, composants, modèle de données, contrats, erreurs, sécurité, ADR, écarts).
4. **Planification** : `tasks.md` (tâches atomiques, ordonnées, liées à une exigence et à des tests, avec fichiers à lire et à modifier).
5. **Validation** : `tests.md` (tests définis avant le code, liés aux exigences).
6. **Implémentation** : uniquement les tâches approuvées, dans les conventions existantes (§7).
7. **Vérification** : exécuter les tests, consigner les résultats réels, corriger, relancer.
8. **Revue** : rapport final (annexe A, §8).

Portes de qualité : exigences → conception → tâches → tests → **approbation explicite** → implémentation → vérification → acceptation. Une porte franchie ne se contourne jamais.

## 3. Deux axes de statut

| Axe | Valeurs |
|---|---|
| Dossier (spécification), ligne « Statut » | `DRAFT` → `UNDER_REVIEW` → `APPROVED` → `READY_FOR_DEV` → `IN_PROGRESS` → `IN_TESTING` → `DONE` |
| Implémentation, ligne « État d'implémentation » et statut de chaque tâche | Implémenté (rétro-spécifié) / Partiellement implémenté / Non implémenté ; tâches « Fait », « Partiel », « À faire » |

APPROVED ≠ READY_FOR_DEV : un dossier approuvé reste bloqué tant qu'une décision bloquante ou une dépendance subsiste (colonne « Bloquant »). Au 2026-11-09, **tous les dossiers sont UNDER_REVIEW** : le code existant a été rétro-spécifié (D-036) ; rien de nouveau ne s'implémente avant l'approbation du propriétaire.

## 4. Carte du dépôt

| Chemin | Contenu |
|---|---|
| `app/` | **L'application Nolo** (PWA, JavaScript sans compilation) : `index.html`, `css/`, `js/{core,domain,screens,ui,i18n}`, `assets/`, `sw.js`, `manifest.webmanifest`, `tests/` (Node), `docs/DIRECTION.md` et `docs/DESIGN.md` (design system), `tools/carte.py` |
| `src/server/agents/` | Agent Conformité, orchestrateur (Python, référence et oracle des agents de Nolo) |
| `src/server/gouvernance/` | Politique codée, journal chaîné SHA-256, contrats |
| `src/server/domain/` | Ressources (tuile, recherche sensible), surveillance (scénarios) |
| `src/server/etablissements/` | Service de référence D-029 / D-032 (Starlette) : inscription, fiches, stocks, tendances, zones |
| `src/client/ondevice/` | Moteur de triage v1 (JavaScript, parité stricte avec Python), CLI |
| `src/client/pwa/` | Pages de référence du service D-029 (non utilisées par Nolo) |
| `config/` | `policy.yaml` (état du droit, **seule source** des valeurs juridiques) et `variantes/` (« et si ») |
| `kb/` | Base de connaissances v9, version publique (2 034 fragments, 21 documents), sources, correspondance, évaluation, traductions |
| `rules/`, `data/`, `donnees/` | Règles de triage v2 et référentiel ; données synthétiques ; zones (ODbL), agréments simulés |
| `tools/` | `trace.py`, `sdd_index.py`, `verifier_base.py`, `inspecter.py`, `scenarios/`, `demo/`, `donnees/`, outils D-029 |
| `tests/` | `unit/`, `integration/` (gouvernance, scénarios), `python/` (D-029, D-032), `js/` (moteur v1, catalogues D-029), `reports/` (journaux de scénarios) |
| `docs/` | `ETAT.md` (état et prochaine tâche), `product/`, `architecture/`, `compliance/`, `specifications/`, `quality/` (preuves datées), `traceability/` (matrice générée), `archive/` |
| `.claude/commands/` | Commandes `/reprendre`, `/specifier`, `/implementer`, `/verifier` |

## 5. Sources de vérité (une seule par sujet)

| Sujet | Fichier |
|---|---|
| État du projet, prochaine tâche, journal des sessions | `docs/ETAT.md` |
| Principes non négociables | `docs/product/constitution.md` (1.3.2 ; 2.0.0 proposée par D-033) |
| Vision, périmètre, glossaire | `docs/product/vision.md`, `docs/product/glossary.md` |
| Décisions métier datées (D-001 à D-036) | `docs/product/decisions.md` |
| État du droit codé | `config/policy.yaml` — jamais de règle juridique codée en dur ailleurs |
| Lacunes (L1 à L16) et interprétations juridiques | `docs/compliance/` |
| Architecture, contrats, ADR | `docs/architecture/` |
| Catalogue v2 des fonctionnalités et sous-fonctionnalités | `docs/specifications/README.md` (correspondance v1 → v2 : `correspondance-v1-v2.md`) |
| Tâches restantes et écarts (générés) | `docs/specifications/INDEX-TACHES.md`, `docs/specifications/ECARTS.md` via `python3 tools/sdd_index.py` |
| Dossiers de sous-fonctionnalités | `docs/specifications/feature-XXX-*/sf-XXX-NN-*/` |
| Matrice de traçabilité (générée) | `docs/traceability/matrix.md` via `python3 tools/trace.py` |
| Design system de Nolo | `app/docs/DESIGN.md`, `app/css/tokens.css` |
| Spécifications v1.3 approuvées (historique) | `docs/archive/baseline-v1.3/` — ne plus modifier |

## 6. Conventions d'identifiants

| Objet | Format | Exemple |
|---|---|---|
| Fonctionnalité | `F-XXX` | F-001 |
| Sous-fonctionnalité | `SF-XXX-NN` | SF-001-14 |
| Exigence fonctionnelle | `FR-NNN` ou `FR-NNNN` (plages par fonctionnalité : catalogue §3) | FR-101, FR-1511 |
| Exigence non fonctionnelle | `NFR-NNN` ou `NFR-NNNN` | NFR-1501 |
| Règle métier, critère, conception, tâche, test, question | `BR-`, `CA-`, `DES-`, `TASK-`, `TEST-`, `Q-` + `XXX-NN-NN` | TASK-001-14-02 |
| Maintenance | `MT-00N` ; dérivés `…-M0N-NN` | TASK-M02-02 |
| Décision, dépendance, ADR, lacune | `D-NNN`, `DEP-NNN`, `ADR-NNN`, `L-NN` / `V-N` | D-036, L15 |

Les identifiants FR-101 à FR-715 viennent des spécifications v1.3 et ne changent jamais. Les identifiants des livraisons du 7 et du 8 novembre (`FR-CONS-…`, `FR-ETS-…`, `FR-TEND-…`, `FR-DX-…`, `CA-…`) sont repris dans la colonne « Origine » des nouvelles exigences : les noms de tests de `app/tests/` les citent encore.

## 7. Conventions de code

**Nolo (`app/`)**
- JavaScript en modules ES, sans compilation ni dépendance ; aucun CDN, aucune police externe.
- Rendu : gabarit `html` (échappement systématique), `patch` pour mettre à jour le DOM, délégation par `data-act`, `data-input`, `data-change`, `data-submit`. Un écran = `{ id, titre, chrome, garde?, render, actions?, apres? }` dans `app/js/screens/`.
- Logique pure dans `app/js/domain/` (testable sous Node) ; aucune logique métier dans les écrans.
- Textes : toujours par `t('cle')` ; chaque clé existe dans `fr.js` **et** `en.js` (test bloquant) ; typographie française automatique (`typoFr`).
- Styles : seulement les jetons de `app/css/tokens.css` ; rouge réservé à l'urgence, ambre aux données fictives et au POC ; cibles ≥ 44 px ; focus visible ; un seul h1 ; `prefers-reduced-motion` respecté.
- Stockage local : `local.read/write` (préfixe `nolo:`), seulement les clés autorisées (SF-013-11) ; jamais de texte libre, de piste ni de cas.
- Toute nouvelle route ou tout nouveau fichier est ajouté à `app/sw.js` (`FICHIERS`) et la `VERSION` change.

**Python (`src/`, `tools/`, `kb/`)**
- Bibliothèque standard d'abord ; PyYAML, Starlette, Pillow, openpyxl déjà utilisés ; aucune nouvelle dépendance sans ADR.
- Toute valeur juridique est lue dans `config/policy.yaml` (`Politique.valeur`) ; tout article cité est un `chunk_id` existant de `kb/kb_chunks.jsonl`.
- Les agents de Nolo (JavaScript) doivent rendre les mêmes décisions que la référence Python (tests de parité, SF-007-17).

## 8. Contraintes du projet (rappel)

- Accès par application seulement (PWA) ; français et anglais d'égale valeur (Principe XIV).
- Hors du module POC (mode démonstration), aucun diagnostic ni niveau autre que l'alerte d'urgence ; jamais de médicament, de posologie ni d'alternative.
- Catégories de l'art. 48 jamais collectées ; recherches qui peuvent révéler la vie sexuelle exécutées sur l'appareil, jamais comptées ni signalables.
- Aucune pharmacie ne paie ; classement par critères publics.
- Trois modes (`demo_synthetique`, `sans_donnees_personnelles`, `complet`) ; Nolo fonctionne en `demo_synthetique`.
- **Données fictives ou synthétiques seulement** ; aucun établissement, aucune personne réels ; numéros d'appel des structures désactivés.
- Droits : aucun texte « tous droits réservés » (guide OMS-AFRO SBC 2014 retiré), aucun PDF source dans le dépôt ; licences dans `THIRD_PARTY_NOTICES.md`.
- La console du ministère est une démonstration sous la marque Nolo : ni logo ni nom officiel.

## 9. Commandes

```bash
# Nolo
python3 -m http.server 8765 --bind 127.0.0.1 -d app      # puis http://127.0.0.1:8765/
cd app && node --test tests/*.test.mjs && cd ..           # 33 tests (domaine, langues, surveillance)
python3 tools/inspecter.py /tmp/nolo-captures 360,390,768,1440   # inspection visuelle réelle, 39 états × 4 largeurs (code 0 = aucun défaut)

# Gouvernance, scénarios, service des établissements
python3 -m pytest -q                                       # gouvernance, scénarios S1 à S3, service D-029 / D-032
node --test tests/js/*.test.mjs                            # moteur v1 (parité) et catalogues D-029
python3 tools/scenarios/executer.py --scenario regroupement [--sans-gouvernance] [--politique config/variantes/<v>.yaml]
python3 tools/lancer_demo.py --neuf --avec-tendances        # service de référence D-029 sur http://127.0.0.1:8000

# Base de connaissances
python3 tools/verifier_base.py --reconstruire              # schéma, droits, citations, reconstruction identique
python3 -I kb/eval/run_eval.py --embed bm25                # évaluation de la recherche (40 questions)
python3 -I kb/traductions/verifier_traductions.py          # traductions et glossaire

python3 -I kb/services/test_services.py                   # orientation vers les services (fiabilité, rayon, classes sensibles)

# Règles de triage et paquet de l'appareil
python3 tools/donnees/verifier_regles_triage_v2.py         # 390 témoins, monotonie sur 5 000 tirages
python3 tools/demo/construire_paquet.py                    # reconstruit src/client/ondevice/paquet_triage.json (doit rester identique)

# Spécifications et preuves
python3 tools/trace.py                                     # matrice ; code 0 = aucune erreur de traçabilité
python3 tools/sdd_index.py                                 # INDEX-TACHES.md et ECARTS.md
python3 tools/croiser_preuves.py docs/quality/<preuve>.txt # chaque test « Exécuté » est retrouvé dans sa preuve (code 0)

# Livrables (SF-017-01, SF-017-02)
python3 tools/controle_publication.py                      # avant tout envoi : 0 PDF, 0 secret, rien du texte réservé (code 0)
python3 tools/rapport_pdf.py                               # PDF du rapport, hors du dépôt : ../livrables/rapport-technique-en.pdf
python3 tools/verifier_rapport.py                          # sections, 5 pages au plus, chiffres, états concordants (code 0)
```

Les scénarios réécrivent `tests/reports/2026-11-04/` : sauvegarder ce dossier avant et le restaurer après (`/verifier` le fait). `orientation_urgente --sans-gouvernance` sort en code 1 par construction (Q-007-14-01).

## 10. Environnement de vérification de Claude (constaté le 2026-11-09)

Disponibles : Python 3, PyYAML, pytest, Starlette, Pillow, openpyxl, numpy, scikit-learn, Node 22, Playwright (Python), Chrome (`/usr/bin/google-chrome`), ffmpeg. Indisponibles : installation de paquets (réseau limité), ChromaDB, Ollama, voix de synthèse. Tout test qui dépend d'un composant indisponible est marqué « poste de l'équipe » et n'est jamais déclaré réussi par Claude.

Poste de l'équipe (constaté le 2026-11-09, session D-037) : Python 3.12 sans `python3-venv` ni Starlette ; `.venv` créé par `uv venv .venv` puis `uv pip install --python .venv/bin/python -r requirements.txt` ; préfixer les commandes par `PATH="$PWD/.venv/bin:$PATH"`. Chromium « headless shell » de Playwright (`~/.cache/ms-playwright`), `pdfinfo` et LibreOffice disponibles ; Playwright (Python) absent, donc `tools/inspecter.py` non relançable sans installation.

## 11. Fin de tâche (liste à cocher, dans l'ordre)

1. Les tests de la tâche ont été écrits **avant** le code et ont échoué une fois (rouge), puis réussissent (vert).
2. Toutes les suites concernées ont été relancées (§9) ; la sortie datée est dans `docs/quality/preuve-AAAA-MM-JJ-<sujet>.txt`.
3. Pour une interface : `python3 tools/inspecter.py` relancé, sortie datée jointe.
4. Dans le dossier : statut de la tâche passé à « Fait (date) », statut d'exécution des tests mis à jour avec le nom du fichier de preuve, écart retiré du §9 de `design.md` s'il est résolu, état d'implémentation mis à jour.
5. `python3 tools/sdd_index.py` puis `python3 tools/trace.py` (code 0).
6. `docs/ETAT.md` : nouvelle ligne au journal des sessions, prochaine tâche mise à jour.
7. Rapport final à l'utilisateur (annexe A, §8). Commit seulement si l'utilisateur le demande.

## 12. Ce qu'il ne faut jamais faire

- Implémenter une tâche d'un dossier `UNDER_REVIEW`.
- Écrire une valeur juridique, un numéro d'urgence ou un seuil ailleurs que dans `config/policy.yaml` (écarts existants listés dans `ECARTS.md`).
- Annoncer un chiffre (tests, évaluation, taille de la base) sans fichier de preuve.
- Présenter une donnée fictive comme réelle, une traduction non officielle comme officielle, une piste du POC comme un diagnostic.
- Ajouter au dépôt un PDF source, un texte « tous droits réservés », un secret ou une donnée personnelle réelle.

---

## Annexe A — Protocole SDD strict (version condensée ; le texte intégral `docs/product/protocole-sdd.md` fait foi)

1. **Core directive.** No feature, workflow, change, or technical modification may be implemented without a complete, approved, and development-ready specification. This applies universally, regardless of complexity or size. There are no exceptions for supposedly simple tasks. The objective is complete traceability between business requirements, functional specifications, technical design, implementation tasks, and automated tests.
2. **Mandatory specification lifecycle.** Every feature, sub-feature, workflow, and change must have its own package: (A) Requirements — business objective, FR-XXX, NFR-XXX, business rules, roles and permissions, pre/postconditions, normal and alternative scenarios, edge cases, input validation and error handling, dependencies, explicit exclusions; unambiguous, testable, independently understandable. (B) Design — functional behaviour and workflows, user interactions and interface states, architecture and component responsibilities, data models, API contracts with schemas and error codes, state transitions, authorization and security, external integrations, failure handling and recovery, performance/scalability/accessibility, ADRs; explains HOW without undocumented behaviour. (C) Tasks — TASK-XXX referencing requirement IDs, affected components and files, expected output, dependencies, completion conditions, required tests; atomic, ordered, independently verifiable, executable by another developer or a fresh session without guessing. (D) Tests — unit, integration, API/contract, component/UI, end-to-end, acceptance, security/authorization, validation/boundary, regression, failure/recovery; every test references its requirement; acceptance criteria measurable, preferably Given/When/Then. A requirement without a verification method is incomplete.
3. **Development-ready standard.** READY_FOR_DEV only when: all FR defined; business rules documented; scenarios and edge cases covered; design sufficiently detailed; interfaces and contracts defined; tasks decomposed and traceable; acceptance criteria measurable; tests specified and mapped; dependencies and unresolved decisions identified; no blocking ambiguity remains. Statuses: DRAFT, UNDER_REVIEW, APPROVED, READY_FOR_DEV, IN_PROGRESS, IN_TESTING, DONE. Never confuse APPROVED with READY_FOR_DEV; never mark READY_FOR_DEV with blocking decisions unresolved.
4. **Strict implementation gate.** Before writing or modifying production code: inspect architecture and implementation; identify affected specifications; verify requirements, design, tasks and tests exist; verify they are approved and READY_FOR_DEV; present the implementation plan; obtain explicit authorization. If anything is missing, incomplete or outdated, stop and complete the documentation first. No bypass for small changes, bug fixes or refactoring. For urgent bug fixes, document defect, expected behaviour, reproduction, regression tests and corrective design before fixing.
5. **Traceability and consistency.** Maintain a bidirectional matrix REQUIREMENT → DESIGN → TASK → TEST → IMPLEMENTATION → VERIFICATION. Detect and report requirements without design, design without requirements, tasks without requirement references, requirements without tests, tests without expected behaviour, implementations without approved specifications, undocumented behaviour. Keep documentation synchronized with the code; on requirement change, perform impact analysis and update design, tasks, tests and traceability before continuing.
6. **Project-wide discipline.** Read CLAUDE.md and relevant documentation first; inspect existing code; reuse established patterns; avoid unnecessary dependencies and abstractions; preserve backward compatibility unless authorized; consider security, performance, maintainability, scalability; never silently change schemas, API contracts or business rules; never introduce scope beyond approved requirements; no duplicate documentation, one authoritative source per feature or workflow.
7. **Quality gates.** G1 requirements complete; G2 design complete; G3 tasks complete; G4 tests complete; G5 explicit owner approval; G6 only approved tasks implemented; G7 tests executed, failures resolved or documented; G8 all requirements verified against acceptance criteria. A feature cannot be DONE if any gate failed.
8. **Final reporting.** For every completed feature: specification reference and version; requirements implemented; design decisions; tasks completed; files and components modified; tests executed and actual results; acceptance criteria verification; traceability status; known limitations and risks. Never fabricate test results or claim completion without evidence.
9. **Operating principle.** Not an autonomous code generator but a disciplined engineering agent accountable for the whole lifecycle. Every delivered behaviour must be explicitly required, designed, decomposed, testable, traceable, implemented per specification and verified against measurable acceptance criteria. When in doubt: stop, investigate, document, request clarification. Never guess.
