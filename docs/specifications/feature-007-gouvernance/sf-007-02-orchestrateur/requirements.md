# SF-007-02 — Orchestration et contrôle préalable obligatoire — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-701) ; ADR-004 |
| Bloquant | Aucun |
| Dépend de | SF-007-01, SF-007-03, SF-007-09 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
L'orchestrateur reçoit chaque demande d'un agent, la fait décider par la Conformité, journalise la décision avec ses citations et n'exécute que ce qui est autorisé, avec les conditions imposées.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agents métier | Demander une action | Exécuter sans décision | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-701 | l'orchestrateur MUST appeler l'agent Conformité avant toute action d'un agent sur une donnée personnelle (nœud P de Y.3172) ; une action sans décision est rejetée. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-725 | `Orchestrateur.executer` MUST journaliser la décision (agent, contributeurs, action, fragments, clés de politique, verdict, repli) avant d'exécuter l'action, et n'exécuter que si le verdict est `AUTORISE` ou `AUTORISE_AVEC_CONDITIONS`. | Principe III | Haute | UNDER_REVIEW |
| FR-726 | Hors mode démonstration, l'entrée de l'action MUST n'être conservée que minimisée (empreinte) dans le journal. | Principe XI | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| — | Aucune | — |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-007-02-01 | FR-701, FR-725 | Étant donné une action autorisée et une action bloquée, quand on les exécute, alors deux entrées de journal et seule l'autorisée est exécutée. | TEST-007-02-01 |
| CA-007-02-02 | FR-726 | Étant donné le mode `sans_donnees_personnelles`, quand une action est journalisée, alors son entrée n'est pas conservée en clair. | TEST-007-02-02 |

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
4. `src/server/agents/orchestrateur.py`
