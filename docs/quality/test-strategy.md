# Stratégie de test

Version 1.0.0 · 2026-11-03 · Statut : UNDER_REVIEW

## 1. Principes
1. Les tests sont **spécifiés avant le code** dans le `tests.md` de chaque sous-fonctionnalité ; chaque test cite au moins une exigence (`FR-`/`NFR-`) et un critère d'acceptation (`CA-`).
2. Un test n'est déclaré réussi que s'il a été **exécuté** ; la preuve (commande, date, sortie ou rapport JUnit) est conservée dans `tests/reports/AAAA-MM-JJ/` et référencée dans le `tests.md` (« Statut d'exécution »).
3. Données de test : uniquement synthétiques (`data/synthetic/`, `tests/fixtures/`). Horloge fixée par défaut au 2026-10-20 22:00 +01:00 (ADR-013).
4. Un test qui dépend d'un composant indisponible dans l'environnement de Claude (Ollama, ChromaDB, FastAPI) porte la mention « exécutable seulement chez l'équipe » et n'est jamais compté comme réussi par Claude.
5. Toute correction de défaut commence par un test de régression qui échoue.

## 2. Niveaux et outils
| Niveau | Objet | Outil | Emplacement |
|---|---|---|---|
| Unitaire (serveur) | Logique pure (`src/server/domain`, `governance`) | pytest | `tests/unit/` |
| Unitaire (appareil) | Modules `src/client/ondevice/*.js` | `node --test` | `tests/js/` |
| Parité | Même résultat Python et JS (ADR-015) | pytest + Node en sous-processus | `tests/parity/` |
| Intégration | Route → orchestrateur → agents → stockage → journal | pytest + client ASGI en processus (`tests/support/asgi_client.py`) | `tests/integration/` |
| Contrat d'API | Réponses et erreurs conformes aux schémas pydantic exportés | pytest + jsonschema | `tests/contract/` |
| Composant / interface | États d'écran, textes FR/EN, accessibilité de base | Playwright (Python) | `tests/ui/` |
| Bout en bout | Parcours complets dans le navigateur contre un serveur uvicorn local | Playwright (Python) | `tests/e2e/` |
| Acceptation | Critères `CA-` et scénarios de démo (fichiers `data/synthetic/scenario_*.jsonl`) | pytest | `tests/acceptance/` |
| Sécurité et autorisation | Rôles, jetons, champs interdits, positions trop précises, modes | pytest | `tests/security/` |
| Validation et limites | Bornes (rayon, délais, seuils, tailles) | pytest, `node --test` | avec les tests unitaires |
| Régression | Contrôles existants de `kb/services/test_services.py` (11) puis tests remplaçants | pytest | `tests/regression/` |
| Défaillance et reprise | Base, LLM, journal ou politique indisponibles ; redémarrage | pytest | `tests/resilience/` |

Nommage : `test_<sf>_<nn>_<objet>` (ex. `test_007_09_03_chaine_rompue_detectee`), l'identifiant `TEST-007-09-03` figurant dans la docstring.

## 3. Critères de sortie par porte
| Porte | Critère |
|---|---|
| G4 (tests spécifiés) | Chaque exigence possédée par la sous-fonctionnalité a au moins un test ; chaque critère d'acceptation a au moins un test d'acceptation ou d'intégration |
| G7 (vérification) | 100 % des tests de la sous-fonctionnalité exécutés ; 0 échec non documenté ; tests de régression de toutes les sous-fonctionnalités déjà `DONE` exécutés et réussis |
| G8 (acceptation) | Chaque critère d'acceptation vérifié, avec preuve |

Couverture de code visée (indicative, mesurée par `python3 -m trace` faute de `coverage`) : 90 % des lignes de `src/server/domain` et `src/server/governance`.

## 4. Régression existante
Les 11 contrôles de `kb/services/test_services.py` ont été exécutés le 2026-11-03 : 11/11 réussis (preuve : `docs/quality/preuve-2026-11-03-test_services.txt`). L'évaluation de recherche `kb/eval/run_eval.py --embed bm25` a donné 20/20 (preuve : `docs/quality/preuve-2026-11-03-run_eval.txt`). Ils restent exécutés à chaque changement jusqu'à leur remplacement par des tests pytest équivalents (MT-001), sauf quand une exigence approuvée impose un comportement différent : le contrôle est alors remplacé, et le remplacement est consigné dans le `tests.md` concerné.

## 5. Outil de traçabilité
`tools/trace.py` (outillage documentaire, hors produit) lit tous les dossiers, vérifie les identifiants, les références croisées et les fragments cités, puis régénère `docs/traceability/matrix.md`. Il échoue (code de sortie 1) si : un identifiant est dupliqué ; une exigence n'a pas de propriétaire unique ; une exigence possédée n'a pas d'élément de conception, de tâche ou de test ; un élément de conception, une tâche ou un test ne cite aucune exigence ; une exigence citée n'existe pas ; un `chunk_id` cité n'existe pas dans `kb/kb_chunks.jsonl` ; un dossier n'a pas ses quatre fichiers ; un statut est invalide.
