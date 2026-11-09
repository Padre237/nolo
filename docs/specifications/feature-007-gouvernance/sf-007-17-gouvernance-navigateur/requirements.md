# SF-007-17 — Gouvernance dans Nolo : orchestrateur, Conformité et politique dans le navigateur — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-17 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | AG-01, AG-02, AG-04 (spécification proposée le 2026-11-09) |
| Bloquant | Aucun |
| Dépend de | SF-007-01, SF-007-03, SF-011-08 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Porter dans Nolo, en JavaScript, l'orchestrateur et l'agent Conformité, à partir de la même politique (`config/policy.yaml` converti en JSON) ; la référence Python reste l'oracle et des tests vérifient les mêmes verdicts.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agents de Nolo | Demander une décision avant d'agir | Agir sans décision | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1901 | Toute action de Nolo listée dans le catalogue (affichage des pistes, recommandation, recherche, signalement, contribution, export, décision du point focal, demande du district) MUST passer par `orchestrateur.executer`, qui demande d'abord une décision à `conformite.decider` ; une action sans décision est rejetée. | AG-01 | Haute | UNDER_REVIEW |
| FR-1902 | Chaque décision MUST citer au moins un `chunk_id` présent dans la base embarquée, ou valoir `BLOQUE_SANS_FONDEMENT`. | AG-02 | Haute | UNDER_REVIEW |
| FR-1903 | La politique MUST être produite par `tools/politique_json.py` depuis `config/policy.yaml` (même version, même empreinte canonique) et chargée par `app/js/domain/politique.js`. | AG-04 ; FR-2120 | Haute | UNDER_REVIEW |
| FR-1904 | Sur les scénarios S1 à S3 et leurs variantes, `conformite.decider` en JavaScript MUST rendre exactement les mêmes verdicts, conditions, replis et fragments que `AgentConformite.decider` en Python (fichiers attendus produits par l'exécuteur). | AG-04 | Haute | UNDER_REVIEW |
| FR-1905 | Le mode MUST être `demo_synthetique` dans Nolo ; les modes `sans_donnees_personnelles` et `complet` sont simulables dans la console seulement. | FR-714 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| NFR-1901 | Décision rapide | ≤ 5 ms par décision (Node 22) ; politique ≤ 30 Kio | UNDER_REVIEW |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| — | Aucune | — |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-007-17-01 | FR-1901 | Étant donné l'affichage des pistes, quand la Conformité n'a pas répondu, alors rien ne s'affiche ; une action inconnue lève une erreur. | TEST-007-17-01 |
| CA-007-17-02 | FR-1902 | Étant donné toutes les décisions de la suite de tests, quand on vérifie leurs fragments, alors chacun existe dans la base embarquée. | TEST-007-17-02 |
| CA-007-17-03 | FR-1903 | Étant donné `policy.yaml` 1.3.0, quand on convertit, alors JSON 1.3.0 de même empreinte canonique. | TEST-007-17-03 |
| CA-007-17-04 | FR-1904 | Étant donné les fichiers attendus de S1 à S3 et des variantes, quand on rejoue en JavaScript, alors 0 écart. | TEST-007-17-04 |
| CA-007-17-05 | FR-1905 | Étant donné Nolo, quand on lit le mode, alors `demo_synthetique`. | TEST-007-17-05 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-007-gouvernance/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/agents/orchestrateur.js`
5. `app/js/agents/conformite.js`
6. `tools/politique_json.py`
7. `app/js/domain/politique.js`
8. `app/data/politique.json`
9. `tools/scenarios/executer.py`
10. `app/tests/parite_conformite.test.mjs`
