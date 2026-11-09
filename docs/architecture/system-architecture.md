# Architecture du système

Version 1.0.0 · 2026-11-03 · Statut : UNDER_REVIEW · ADR : ADR-001 à ADR-015

## 1. Contexte

```
 Citoyen ──(application, FR/EN)──► Client (PWA)  ──HTTPS JSON──►  Serveur API (Cameroun)
                                   │  triage sur l'appareil          │  agents + gouvernance
                                   │  recherches sensibles locales   │  stockage SQLite, journal JSONL
 Établissement, point focal, ─────► Consoles professionnelles ──────►│  base de connaissances (BM25)
 modérateur, régulateur, auditeur                                     │  LLM local optionnel (Ollama)
                                                                      └──► export agrégé (maquette DHIS2)
```
Aucun SMS, aucun USSD. Aucun échange hors du pays sans autorisation (`policy.yaml > transfert_hors_pays`).

## 2. Composants

| Composant | Responsabilité | Où | Sous-fonctionnalités |
|---|---|---|---|
| Client citoyen (PWA) | Écrans, consentements, langue, triage et recherches sensibles sur l'appareil, filtrage des mentions interdites | Appareil | F-001, F-003, F-004, F-005, F-008, F-013 |
| Consoles professionnelles | Écrans par rôle : établissement, point focal, modérateur, agent de santé simulé, régulateur, auditeur | Navigateur | F-002, F-006, F-007, F-009, F-010, SF-013-04 |
| Serveur API | Routes `/api/v1`, validation, authentification, appel de l'orchestrateur | Serveur | Toutes |
| Orchestrateur | Reçoit une intention, appelle Conformité avant tout agent qui touche une donnée personnelle, agrège, journalise | Serveur | SF-007-02 |
| Agent Conformité | Évalue une demande : verdict, fragments cités, clés de politique, repli | Serveur | SF-007-03 à SF-007-08 |
| Agent Triage (serveur) | Extraction optionnelle de symptômes par LLM local, avec consentement ; ne décide jamais du niveau | Serveur | SF-001-03 |
| Moteur de triage | Règles déterministes, monotones, versionnées | Appareil (JS) | SF-001-04 à SF-001-09 |
| Agent Ressources | Recherche de spécialités, de médicaments, de sang ; rayon progressif | Serveur et appareil (tuiles) | F-003, F-004, F-005 |
| Agent Disponibilités | Réception et contrôle des déclarations de stock | Serveur | F-010 |
| Agent Fiabilité | Signalements, score, rafales, gel, application progressive | Serveur | F-006 |
| Agent Surveillance | Contributions, agrégation, détection, signaux | Serveur | F-002 |
| Agents District et APDP simulés | Positions institutionnelles journalisées | Serveur | SF-007-15 |
| Politique | Chargement, validation par schéma, version, empreinte de `config/policy.yaml` | Serveur | SF-007-01 |
| Journal d'audit | Écriture en ajout seul chaînée, contrôle des champs interdits, lecture, vérification | Serveur | SF-007-09 à SF-007-11 |
| Base de connaissances | Fragments, corrections, recherche BM25, évaluation | Serveur (hors ligne pour la construction) | F-011 |
| Données synthétiques | Générateurs et scénarios | Outils | F-012 |

Contrats communs : `docs/architecture/shared/data-model.md`, `api-conventions.md`, `governance-contracts.md`.

## 3. Répartition appareil / serveur (règle de conception)

| Traitement | Appareil | Serveur | Justification |
|---|---|---|---|
| Calcul du niveau d'urgence | Toujours | Jamais | FR-101, FR-112 ; une seule implémentation du moteur (ADR-005) |
| Retrait des mentions génétiques, biométriques, sexuelles du texte saisi | Toujours, avant tout envoi | Contrôle de défense en profondeur | FR-111, FR-712 |
| Extraction de symptômes par LLM | Non | Oui, si consentement exprès et mode le permet | ADR-006 |
| Recherche de spécialité ou de médicament non sensible | Non | Oui (position arrondie) | Code existant, FR-302 |
| Recherche révélant la vie sexuelle (spécialités et classes listées) | Oui, sur tuile de district | Le serveur ne reçoit que la demande de tuile | FR-308, FR-408, ADR-009 |
| Langue de l'interface | Oui | Jamais transmise | Politique `donnees_sensibles.langue`, FR-713 |
| Consentements | Stockés sur l'appareil, transmis comme booléens par requête | Vérifiés par Conformité | FR-106, FR-201 |

Le serveur renvoie des **codes** (niveau, mention, motif) et non des phrases ; le client les traduit (ADR-003). Ainsi la langue ne quitte jamais l'appareil.

## 4. Pipelines selon ITU-T Y.3172

### A. Orientation
| Nœud | Instanciation | Politique et garde-fous |
|---|---|---|
| SRC | Symptômes saisis, tranche d'âge, durée ; position (consentement) ou quartier | Consentement exprès (FR-106) ; mineurs (FR-107) |
| C | Client PWA ; requêtes HTTPS vers le serveur situé au Cameroun | Transfert hors pays bloqué (FR-705) |
| PP | Retrait des mentions interdites (FR-111) ; codage par le référentiel interne de symptômes (FR-120, D-018) ; arrondi de position (FR-105) | Art. 48 ; minimisation |
| M | Moteur de règles déterministe : `rules/triage_signes_alerte.v2.yaml` (PCIME et IITT, 75 règles sourcées) ; LLM local optionnel pour l'extraction | Le LLM ne peut que relever (FR-101) |
| P | Agent Conformité avant chaque action ; filtre de sortie (FR-102) ; droits affichés (FR-108) | `policy.yaml` ; art. 44 |
| D | Proposition de structure (SF-001-10) | Aucun critère payant |
| SINK | Citoyen ; agent de santé simulé pour les cas ambigus et les demandes d'intervention | D-014 |

### B. Surveillance
| Nœud | Instanciation | Politique et garde-fous |
|---|---|---|
| SRC | Contributions consenties (codes, aire, semaine, tranche d'âge) | Consentement distinct (FR-201) ; mode `complet` ou démo |
| C/PP | Déduplication par jeton HMAC ; agrégation aire × semaine ; seuil de 5 | FR-202 |
| M | CUSUM par aire et syndrome (ADR-014) ; correspondance SC1–SC8 | FR-203 |
| P | Validation humaine obligatoire ; refus des données individuelles | FR-204, FR-206 |
| D/SINK | Console du point focal ; carte publique décalée ; export agrégé | FR-207, FR-208, FR-715 |

### C. Ressources (spécialité, médicament, sang)
SRC : référentiel des établissements et déclarations · PP : arrondi de position, normalisation DCI · M : rayon progressif, tri, départage · P : neutralité commerciale (FR-406), recherche sensible locale · SINK : citoyen.

### D. Fiabilité
SRC : signalements · PP : pseudonymisation HMAC, masquage des classes sensibles · M : score lissé, détection de rafale · P : gel, modération humaine, contestation · SINK : citoyen (score affiché), établissement (consultation).

## 5. Arborescence cible du code (après MT-001)

```
src/server/app.py               application ASGI, enregistrement des routes
src/server/config.py            chemins, mode de démarrage, sel de pseudonymisation (variable d'environnement)
src/server/api/<domaine>.py     une route par sous-fonctionnalité exposée
src/server/agents/<agent>.py    orchestrateur, conformite, triage, ressources, disponibilites, fiabilite, surveillance, district_simule, apdp_simule
src/server/domain/<logique>.py  logique pure sans entrée-sortie (rayon, score, cusum…)
src/server/governance/          policy.py, journal.py, modes.py, whatif.py, ab.py, rejeu.py
src/server/storage/             sqlite.py et dépôts par entité
src/server/kb/                  build_kb.py, bm25.py, ingest_chroma.py (déplacés depuis kb/)
src/client/                     index.html, app.js, i18n/fr.json, i18n/en.json, ondevice/*.js, ecrans/*.js
src/consoles/                   index.html, ecrans par rôle
config/policy.yaml              état du droit (versionné)
rules/*.yaml                    règles métier (versionnées)
data/synthetic/, data/referentiels/
kb/                             sources, pages, corrections, kb_chunks.jsonl (données de la base)
tests/unit, tests/integration, tests/contract, tests/e2e, tests/acceptance, tests/js
tools/                          trace.py, scripts de génération
```

## 6. Technologies (résumé des ADR)

| Sujet | Choix | ADR |
|---|---|---|
| Serveur | Python 3.13, Starlette, pydantic 2, sqlite3 (bibliothèque standard), uvicorn | ADR-002 |
| Client | PWA HTML + modules JavaScript sans étape de construction | ADR-003 |
| Agents | Classes Python à contrat commun ; orchestrateur central | ADR-004 |
| Triage | Moteur JS sur l'appareil, règles YAML exportées en JSON | ADR-005 |
| LLM | Ollama local, optionnel, extraction seulement ; extracteur lexical par défaut | ADR-006 |
| Recherche documentaire | BM25 par défaut ; embeddings Ollama et ChromaDB en option | ADR-007 |
| Politique | `policy.yaml` validé par JSON Schema, versionné, simulable | ADR-008 |
| Recherche sensible | Tuile de district téléchargée en bloc | ADR-009 |
| Journal | JSON Lines, ajout seul, chaînage SHA-256 | ADR-010 |
| Pseudonymes | HMAC-SHA256, sel de déploiement | ADR-011 |
| Authentification | Jetons porteurs provisionnés par rôle (prototype) | ADR-012 |
| Horloge | Horloge injectable ; fuseau Africa/Douala | ADR-013 |
| Détection | CUSUM unilatéral | ADR-014 |
| Rayon progressif | Algorithme unique, deux implémentations (Python, JS), tests de parité | ADR-015 |

## 7. Code existant et correspondance

| Fichier actuel | Rôle | Sous-fonctionnalités | État |
|---|---|---|---|
| `kb/build_kb.py`, `kb/sources.json`, `kb/corrections/` | Construction des fragments | SF-011-01, SF-011-02 | Implémenté avant spécification |
| `kb/bm25.py`, `kb/ingest_chroma.py` | Recherche | SF-011-03 | Idem |
| `kb/eval/` | Évaluation (20/20 le 2026-11-03) | SF-011-04 | Idem |
| `kb/mapping/` | Correspondance article → nœud → agent | SF-011-05 | Idem |
| `kb/generate_synthetic.py`, `kb/generate_services.py` | Données synthétiques | SF-012-01, SF-012-02 | Idem |
| `kb/services/orientation_services.py` | Spécialité, médicament, sang, score | SF-003-02, SF-004-02, SF-004-03, SF-005-01, SF-005-02, SF-006-02, SF-006-04 | Idem ; écarts listés ci-dessous |
| `kb/services/test_services.py` | 11 contrôles (11/11 réussis le 2026-11-03, preuve `docs/quality/preuve-2026-11-03-test_services.txt`) | Régression | Conservés jusqu'à leur remplacement |
| `kb/rules/*.yaml` | Règles métier | F-001, F-002, F-003, F-004, F-005, F-006 | À aligner sur v1.3 ; `triage_signes_alerte.yaml` remplacé par la version 2 après approbation |
| `data/referentiels/` (`symptomes.csv` 1.1.0, métadonnées, jeu de 42 phrases, historique), `rules/triage_signes_alerte.v2.yaml` | Référentiel de symptômes, jeu de référence de l'extracteur et règles de triage v2 (générés le 2026-11-04) | SF-001-03, SF-001-05, SF-001-06 | UNDER_REVIEW ; aucun code ne les utilise encore |
| `tools/donnees/` | Générateurs, vérificateur (évaluateur et extracteur de référence) et script de preuve `produire_preuve.sh` | SF-001-03, SF-001-05, SF-001-06 | Outillage hors produit ; preuve du 2026-11-04 : `docs/quality/preuve-2026-11-04-generation-donnees.txt` |
| `src/client/ondevice/` (référentiel, extracteur, moteur, CLI, paquet JSON) | Triage SUR L'APPAREIL, parité testée avec l'évaluateur de référence | SF-001-03, SF-001-07, SF-001-08 (incrément D-025) | Implémenté le 2026-11-04 ; tests `node --test tests/js/*.test.mjs` |
| `src/server/` (`gouvernance/politique.py`, `gouvernance/journal.py`, `agents/conformite.py`, `agents/orchestrateur.py`, `domain/`) | Politique, journal chaîné, agent Conformité (table §3), orchestrateur, tuile et surveillance de démo | SF-007-01 à 03, 05 à 10 ; SF-002, SF-004 (incrément D-025) | Implémenté le 2026-11-04 ; tests `pytest -q` |
| `tools/scenarios/executer.py`, `config/variantes/` | Exécuteur de scénarios : « et si » (FR-707) et sans gouvernance (FR-710), rapport §8 | SF-012-03, SF-007-12 à 14 (incrément D-025) | Implémenté le 2026-11-04 ; preuve `docs/quality/preuve-2026-11-04-demo-tranche-verticale.txt` |

Écarts connus entre le code existant et les exigences approuvées (détail et tâche corrective dans chaque `design.md`) :
1. Recherches sensibles : le journal contient la spécialité (`code=`) ou la DCI (`dci=`) cherchée — contraire à FR-305 et FR-713.
2. Recherches sensibles exécutées côté serveur — contraire à FR-308 et FR-408.
3. Noms de niveaux de `rules/triage_signes_alerte.yaml` (`CONSULTATION`, `SURVEILLANCE`) et de `data/synthetic/patients.csv` différents de FR-104 (`consultation_48h`, `soins_courants`).
4. Appel au don : déclenché si la moitié des banques de tout le référentiel sont faibles ou en rupture ; FR-504 exige la majorité des banques du rayon en rupture.
5. Fraîcheur des niveaux de sang calculée mais non renvoyée (FR-501).
6. Départage des pharmacies par tranches entières de 1 km au lieu d'un écart inférieur à 1 km (FR-605).
7. Aucun journal chaîné, aucune version de politique, aucun passage par Conformité (F-007).
8. Signalement sensible avec DCI et pseudonyme (FR-609) ; pas de limites par compte ni d'exclusion des auto-signalements.

## 8. Sécurité (règles transverses)
- Toute route qui touche une donnée personnelle passe par l'orchestrateur, qui exige une décision de Conformité (FR-701).
- Rôles et permissions : SF-009-01 ; authentification : SF-009-02.
- Le serveur refuse toute position à plus de 2 décimales et tout champ interdit (FR-105, FR-713).
- Secrets (sel HMAC, jetons) dans des variables d'environnement, jamais dans le dépôt.
- Le prototype écoute en local ; le déploiement public n'est pas couvert.

## 9. Dimensions AI Readiness 2.0 retenues
Marketplace de données et modèles ; analyse entre domaines (santé et télécoms) ; contextualisation (FR/EN) ; niveau d'intégration ; interface humaine ; alignement stratégique (MINSANTE, MINPOSTEL, APDP) ; collaboration avec l'IA ; impact humain ; politique d'IA ; inclusion (limite : utilisateurs de smartphone) ; infrastructure numérique.
