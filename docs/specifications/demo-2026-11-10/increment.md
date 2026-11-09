# Incrément de démonstration — soumission du 10 novembre 2026

| Champ | Valeur |
|---|---|
| Statut | APPROVED (D-025 : plan approuvé par le propriétaire le 2026-11-04 ; le détail ci-dessous vaut spécification d'exécution de ce plan) |
| Version | 1.0.0 |
| Portée | Tranche verticale démontrable ; ne remplace aucun dossier de sous-fonctionnalité |
| Références | Spécifications v1.3 (archive), `docs/architecture/shared/governance-contracts.md`, dossiers SF-001-03/05/06, `config/policy.yaml` 1.3.0 |

## 1. Objectif
Un prototype exécutable pour la soumission : triage sur l'appareil, gouvernance par l'agent Conformité avec journal chaîné, recherche sensible exécutée sur l'appareil, et exécuteur de scénarios montrant les décisions des agents, leurs citations, le mode « et si » et le mode « sans gouvernance ».

## 2. Composants et exigences couvertes
| Composant | Fichiers | Exigences démontrées |
|---|---|---|
| Paquet de triage versionné | `tools/demo/construire_paquet.py` → `src/client/ondevice/paquet_triage.json` | FR-113 (refus hors démo sans validateur), FR-124 (empreintes), SF-001-04 partiel |
| Référentiel et extracteur sur l'appareil | `src/client/ondevice/referentiel.mjs`, `extracteur_lexical.mjs` | FR-120, FR-121, FR-122, FR-123 |
| Moteur de triage sur l'appareil | `src/client/ondevice/moteur_triage.mjs`, `cli/triage.mjs` | FR-101, FR-104, FR-110 (démo), FR-112 (aucun envoi), FR-114, FR-130 à FR-147 (données) |
| Politique | `src/server/gouvernance/politique.py` | FR-701 (§7 des contrats), FR-707 (variante) |
| Journal chaîné | `src/server/gouvernance/journal.py` | FR-706, FR-709, FR-713 (champs interdits), §6 des contrats |
| Agent Conformité | `src/server/agents/conformite.py` | FR-702, FR-712, FR-714, FR-715, §2 et §3 des contrats |
| Orchestrateur | `src/server/agents/orchestrateur.py` | Principe III (aucune action sans décision), FR-709 |
| Domaine (démo) | `src/server/domain/ressources.py`, `surveillance.py` | FR-408 (recherche sensible sur l'appareil via tuile), FR-204/FR-206 (validation humaine, refus des données individuelles) |
| Exécuteur de scénarios | `tools/scenarios/executer.py`, `config/variantes/*.yaml` | FR-707 (« et si »), FR-710 (sans gouvernance), §8 des contrats |

## 3. Scénarios de démonstration
- **S1 `orientation_urgente`** : personne de 58 ans, douleur thoracique apparue récemment → triage sur l'appareil, `urgence` immédiate (IITT12-R-12), numéros d'urgence, mention de démonstration, journalisation par empreinte seulement.
- **S2 `medicament_sensible`** (fichier existant) : recherche d'un antirétroviral → Conformité bloque la recherche serveur (art. 48, vie sexuelle), repli `appareil` : tuile du district téléchargée, recherche locale, le serveur ignore la requête ; signalement « introuvable » accepté seulement `retirer_dci`, `retirer_pseudonyme`.
- **S3 `regroupement`** (fichier existant, étapes J1 à J4) : contributions agrégées par aire et semaine, seuil de 5, signal « à trier » jamais publié sans validation du point focal, demande de liste nominative par le district → BLOQUE, repli `agregat`.
- Chaque scénario s'exécute aussi `--sans-gouvernance` (liste fermée de violations, journal maintenu) et avec `--politique config/variantes/<v>.yaml` (rapport de différences).

## 4. Critères d'acceptation
| ID | Critère |
|---|---|
| CA-DEMO-01 | `node --test tests/js` : parité stricte avec l'évaluateur de référence Python sur les 19 scénarios, les 42 phrases et un échantillon de témoins ; 0 écart |
| CA-DEMO-02 | `node src/client/ondevice/cli/triage.mjs --tranche 51_70_ans --texte "douleur poitrine soudaine"` affiche `urgence` (immédiate, IITT12-R-12), la mention de démonstration, les fragments sources et les numéros d'urgence sans le 111 (`a_confirmer`) ; aucun accès réseau |
| CA-DEMO-03 | `pytest` : chaîne du journal vérifiée ; un champ interdit (`texte_libre_symptomes`) fait rejeter l'événement et écrit `journal.violation_bloquee` ; chaque décision de Conformité porte ≥ 1 fragment ou `BLOQUE_SANS_FONDEMENT` ; table §3 respectée sur les actions implémentées, dans les 3 modes |
| CA-DEMO-04 | `executer.py --scenario medicament_sensible` : verdict `BLOQUE` + repli `appareil` cité `CMR-LOI-2024-017::0048` ; aucune DCI sensible dans le journal ; avec `--sans-gouvernance`, violations `recherche_sensible_journalisee` détectées et rapportées |
| CA-DEMO-05 | `executer.py --scenario regroupement` : aucun agrégat sous 5 cas publié ; transmission individuelle bloquée ; avec `--sans-gouvernance`, violations `donnees_individuelles_transmises` et `signal_sans_validation_humaine` |
| CA-DEMO-06 | `executer.py --scenario medicament_sensible --politique config/variantes/et-si-derogation-art48.yaml` : rapport de différences non vide montrant ce qu'un futur texte d'application changerait |

## 5. Écarts assumés (à reprendre dans les dossiers complets après soumission)
- L'exécuteur appelle l'orchestrateur **en processus**, pas en HTTP sur 127.0.0.1 (§8) : l'API Starlette et le client ASGI restent à faire (SF-013, SF-012-03).
- Les modules de l'appareil sont écrits en `.mjs` (le dossier SF-001-03 disait `.js`).
- `mention_demo` de `policy.yaml` cite seulement la PCIME : la proposition du README de F-001 (citer aussi l'IITT) est appliquée dans le paquet de triage, pas encore dans `policy.yaml`.
- Extraction par LLM (FR-126) non branchée : extraction lexicale seule dans la démo.
- MT-001 non exécutée : le code lit les données en place (`kb/`, `data/`, `rules/`).
- La validation humaine d'un signal est journalisée par un événement direct (`surveillance.valider_signal`, décision `VALIDE`, `validateur_humain` rempli) sans passer par la table §3 : ce n'est pas une action sur des données mais une décision humaine tracée ; l'action sera proposée à la table lors de la rédaction de SF-002-04.
- L'attendu de l'étape 1 de `scenario_medicament_sensible.jsonl` a été précisé (« au moins une pharmacie agréée au stock frais dans le rayon de 5 km ») : l'ancien texte (« 2 pharmacies affichées ») ne correspondait pas aux données synthétiques avec la règle de fraîcheur de 48 h.

## 6. Preuves
`docs/quality/preuve-2026-11-04-demo-*.txt` (pytest, node --test, exécutions des scénarios). Aucun test n'est déclaré réussi sans exécution enregistrée.
