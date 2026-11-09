# MT-001 — Migration de l'arborescence vers `src/` — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | Maintenance technique (D-010) |
| Sous-fonctionnalité | MT-001 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Référence approuvée | Aucune exigence v1.3 ; constitution principe XII (documents « tous droits réservés » non publiés) |
| Bloquant | Aucun |
| Dépend de | — |

## 1. Objectif métier et résultat attendu
Rassembler le code existant (écrit avant les spécifications) dans l'arborescence cible du dépôt GitHub (`docs/architecture/system-architecture.md` §5), **sans changer aucun comportement**, afin que toutes les sous-fonctionnalités partent d'une base unique, testable par `pytest`, et que le dépôt public ne contienne aucun document dont la diffusion est interdite.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition |
|---|---|---|---|
| Développeur (équipe ou Claude) | Déplacer des fichiers, adapter les chemins, ajouter des tests de régression | Modifier une règle, un algorithme, un seuil ou une donnée | Approbation explicite de MT-001 |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1401 | Les fichiers de code de `kb/` MUST être déplacés selon la table de correspondance de `design.md` §4 ; les données de la base (`kb/kb_chunks.jsonl`, `kb/sources.json`, `kb/pages/`, `kb/text/`, `kb/corrections/`, `kb/mapping/`, `kb/eval/questions_test.jsonl`) MUST rester sous `kb/`. | Nouvelle [PROPOSITION] (D-010) | Haute | UNDER_REVIEW |
| FR-1402 | Tous les chemins de fichiers du code déplacé MUST être résolus par un module unique `src/server/config.py` (racine du dépôt et sous-répertoires nommés) ; aucun module ne calcule plus de chemin à partir de `__file__` hors de ce module. | Nouvelle [PROPOSITION] | Haute | UNDER_REVIEW |
| FR-1403 | Après migration, les 11 contrôles de `kb/services/test_services.py` MUST être reproduits à l'identique par `tests/regression/test_services_existants.py` (mêmes entrées, mêmes valeurs attendues) et réussir. | Nouvelle [PROPOSITION] | Haute | UNDER_REVIEW |
| FR-1404 | Après migration, `python3 -m src.server.kb.eval.run_eval --embed bm25` MUST donner exactement le même résultat qu'avant (20/20 et 20/20) et la reconstruction de la base MUST produire un `kb/kb_chunks.jsonl` identique octet pour octet. | Nouvelle [PROPOSITION] | Haute | UNDER_REVIEW |
| FR-1405 | Les PDF sources dont les droits ne permettent pas la diffusion (`rights_note` contenant « tous droits réservés » dans `kb/sources.json`) et les répertoires `kb/raw/`, `kb/raw2/` MUST être exclus du dépôt par `.gitignore` ; leurs fragments restent utilisables localement mais ne sont pas publiés (`kb/kb_chunks.public.jsonl` sans ces sources). | Constitution principe XII | Haute | UNDER_REVIEW |
| FR-1406 | Un fichier `pytest.ini` MUST déclarer `testpaths = tests` et le marqueur `equipe_seulement` (tests exécutables seulement chez l'équipe) ; `pytest -q` MUST découvrir les tests de régression. | Nouvelle [PROPOSITION] | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- Aucune. MT-001 ne change aucune exigence fonctionnelle.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| NFR-1401 | Aucune nouvelle dépendance externe | `import` ajoutés ⊂ bibliothèque standard, pydantic, PyYAML, jsonschema, pytest | UNDER_REVIEW |
| NFR-1402 | Migration réversible | Table de correspondance complète dans `design.md` §4 ; aucun fichier supprimé sans équivalent | UNDER_REVIEW |

## 6. Règles métier et contraintes
| ID | Règle | Source |
|---|---|---|
| BR-M01-01 | Aucun changement de règle, de seuil, d'algorithme ou de donnée pendant la migration | D-010 |
| BR-M01-02 | Les écarts connus du code (system-architecture §7) ne sont **pas** corrigés ici ; ils le sont dans les sous-fonctionnalités propriétaires | D-010 |

## 7. Préconditions et postconditions
- Préconditions : MT-001 approuvée ; contrôles existants réussis avant migration (preuve du 2026-11-03).
- Postconditions (succès) : arborescence cible en place ; FR-1403 et FR-1404 vérifiées ; `kb/` ne contient plus que des données.
- Postconditions (échec) : retour à l'état antérieur (copie de sauvegarde `kb.avant-mt001.tar`).

## 8. Scénarios
### 8.1 Nominal
1. Exécuter les contrôles existants et l'évaluation ; enregistrer les sorties.
2. Créer `src/server/config.py`, déplacer les fichiers, adapter les imports et chemins.
3. Exécuter `pytest -q`, l'évaluation et la reconstruction ; comparer aux sorties de l'étape 1.
### 8.2 Alternatifs
- A1 — Une sortie diffère : annuler, corriger l'adaptation de chemin, recommencer.
### 8.3 Cas limites et exceptions
- L1 — Un fichier `__pycache__` est déplacé : il est supprimé, jamais versionné.
- L2 — `kb/raw*` absent sur une machine : la reconstruction utilise les pages extraites, sans erreur.

## 9. Validation des entrées et gestion des erreurs
| Entrée | Règle de validation | Erreur |
|---|---|---|
| Chemin demandé à `config.py` | Nom connu de la table des chemins | `KeyError` explicite au démarrage |

## 10. Critères d'acceptation
| ID | Exigences | Critère (Étant donné / Quand / Alors, mesurable) |
|---|---|---|
| CA-M01-01 | FR-1403 | Étant donné le code migré ; quand on exécute `pytest -q tests/regression` ; alors 11 tests réussissent et aucun n'échoue |
| CA-M01-02 | FR-1404 | Étant donné le code migré ; quand on exécute l'évaluation BM25 ; alors la sortie indique 20/20 et 20/20 |
| CA-M01-03 | FR-1404 | Étant donné le code migré ; quand on reconstruit la base ; alors `sha256sum kb/kb_chunks.jsonl` est identique à l'empreinte d'avant migration |
| CA-M01-04 | FR-1401, FR-1402 | Étant donné le code migré ; quand on cherche `__file__` dans `src/` ; alors seul `src/server/config.py` l'utilise |
| CA-M01-05 | FR-1405 | Étant donné le `.gitignore` ; quand on liste les fichiers suivis par `git ls-files` ; alors aucun fichier de `kb/raw/`, `kb/raw2/` ni aucune source « tous droits réservés » n'apparaît |
| CA-M01-06 | FR-1406 | Étant donné `pytest.ini` ; quand on lance `pytest --markers` ; alors le marqueur `equipe_seulement` est listé |

## 11. Dépendances et intégrations
- Aucune.

## 12. Exclusions (hors périmètre)
- Correction des écarts du code ; découpage de `orientation_services.py` par sous-fonctionnalité ; passage à FastAPI.

## 13. Questions ouvertes
| ID | Question | Bloquante | Proposition |
|---|---|---|---|
| Q-M01-01 | Le dépôt GitHub doit-il contenir l'historique de `kb/` ? | Non | Créer le dépôt après migration (pas d'historique antérieur) |

## 14. Sources
- `docs/product/decisions.md` (D-010) ; `docs/product/constitution.md` (principe XII) ; `docs/quality/preuve-2026-11-03-test_services.txt` ; `docs/quality/preuve-2026-11-03-run_eval.txt`.
