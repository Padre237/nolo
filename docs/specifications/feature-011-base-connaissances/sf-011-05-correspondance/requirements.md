# SF-011-05 — Correspondance article → nœud Y.3172 → agent — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Base v2 à v9 |
| Bloquant | Aucun |
| Dépend de | SF-011-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
48 articles ou rubriques clés sont reliés au nœud Y.3172 qu'ils gouvernent, à l'agent qui les applique et à leur usage (règle, garde-fou, lacune, exemple international), avec leurs `chunk_id`.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Ajouter une ligne | Citer un fragment inexistant | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1116 | `kb/mapping/correspondance_articles_pipeline_agents.csv` MUST relier chaque ligne à des `chunk_id` existants. | Base v9 | Haute | UNDER_REVIEW |
| FR-1117 | `kb/mapping/correspondance.md` MUST être la vue Markdown du CSV, régénérée à chaque modification. | Base v2 | Moyenne | UNDER_REVIEW |

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
| CA-011-05-01 | FR-1116 | Étant donné les 48 lignes, quand on contrôle les fragments, alors tous existent (contrôle du 2026-11-09 : 0 introuvable). | TEST-011-05-01 |
| CA-011-05-02 | FR-1117 | Étant donné le CSV, quand on régénère, alors le Markdown est identique. | TEST-011-05-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-011-base-connaissances/README.md`
3. les quatre fichiers de ce dossier
4. `kb/mapping/`
