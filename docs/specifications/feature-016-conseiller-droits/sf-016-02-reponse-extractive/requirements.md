# SF-016-02 — Réponse extractive citée et refus sans fondement — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | D-026 ; AG-06 ; Principe III |
| Bloquant | Aucun |
| Dépend de | SF-016-01 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
La réponse ne contient que des extraits d'articles, chacun avec sa référence, son statut et, en anglais, la version officielle ou la traduction marquée ; sans fragment assez pertinent, le conseiller dit qu'il ne trouve pas de fondement et propose de demander à un juriste.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent Conseiller | Répondre par extraits cités | Rédiger un avis juridique ; inventer un article | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2206 | La réponse MUST se composer de 1 à 3 extraits (≤ 400 caractères chacun) de fragments trouvés, chacun avec `doc_id`, article, titre du texte et statut de vérification. | AG-06 | Haute | UNDER_REVIEW |
| FR-2207 | Si aucun fragment ne dépasse le seuil de pertinence, la réponse MUST être « Je ne trouve pas de fondement dans les textes de la base » (`BLOQUE_SANS_FONDEMENT`), sans extrait. | Principe III | Haute | UNDER_REVIEW |
| FR-2208 | La réponse MUST porter la mention « extraits de textes, pas un avis juridique ; pour votre situation, consultez un juriste ». | Règles du hackathon (pas de conclusion juridique non étayée) | Haute | UNDER_REVIEW |
| FR-2209 | Ni la question ni la réponse MUST être conservées ou transmises. | D-028 (conditions : questions non conservées) | Haute | UNDER_REVIEW |

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
| CA-016-02-01 | FR-2206 | Étant donné « Mes données de santé peuvent-elles partir à l'étranger ? », quand on répond, alors un extrait de l'art. 32 de la loi 2024/017 avec ses références. | TEST-016-02-01 |
| CA-016-02-02 | FR-2207 | Étant donné « Quel est le prix du pain ? », quand on répond, alors le refus sans extrait. | TEST-016-02-02 |
| CA-016-02-03 | FR-2208 | Étant donné toute réponse, quand on la lit, alors la mention. | TEST-016-02-03 |
| CA-016-02-04 | FR-2209 | Étant donné une question, quand on lit stockage et réseau, alors aucune trace. | TEST-016-02-04 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-016-conseiller-droits/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/agents/conseiller/repondre.js`
