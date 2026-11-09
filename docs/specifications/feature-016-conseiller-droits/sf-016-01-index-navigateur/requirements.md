# SF-016-01 — Recherche dans la base depuis le navigateur (BM25 et glossaire) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | D-026 ; D-027 ; AG-06 |
| Bloquant | Aucun |
| Dépend de | SF-011-08 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Le conseiller cherche dans un index BM25 des fragments embarqués, d'abord dans les textes camerounais, puis dans les exemples internationaux ; une question en anglais est enrichie par le glossaire anglais → français.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent Conseiller | Chercher dans la base embarquée | Chercher sur le web ; inventer une source | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2201 | `chercher(question, { lang, k: 5 })` MUST rendre les k fragments les mieux classés par BM25 (mêmes paramètres et même tokenisation que `kb/bm25.py`). | ADR-007 | Haute | UNDER_REVIEW |
| FR-2202 | La recherche MUST d'abord se limiter aux `doc_id` commençant par `CMR-`, puis, si aucun fragment ne dépasse le seuil de pertinence, s'étendre aux `INT-`, en le disant. | README de la base (recommandations) | Haute | UNDER_REVIEW |
| FR-2203 | Une question en anglais MUST être enrichie par les termes français du glossaire avant la recherche ; la question n'est jamais traduite automatiquement en entier. | D-027 | Haute | UNDER_REVIEW |
| FR-2204 | Les classements JavaScript MUST être identiques à ceux de `kb/bm25.py` sur les 40 questions (mêmes `chunk_id` dans le même ordre au top 5). | Parité | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| NFR-2201 | Recherche rapide hors ligne | ≤ 50 ms par question sur l'index des textes camerounais (Node 22) | UNDER_REVIEW |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| — | Aucune | — |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-016-01-01 | FR-2201, FR-2204 | Étant donné les 40 questions, quand on compare JS et Python, alors mêmes 5 fragments dans le même ordre. | TEST-016-01-01 |
| CA-016-01-02 | FR-2202 | Étant donné « Qui a le droit de vendre des médicaments au public ? », quand on cherche, alors des fragments `CMR-` d'abord. | TEST-016-01-02 |
| CA-016-01-03 | FR-2203 | Étant donné « Can someone who is not a doctor make a diagnosis? », quand on enrichit, alors les termes français du glossaire sont ajoutés et un fragment `CMR-LOI-90-036` apparaît au top 5. | TEST-016-01-03 |

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
4. `app/js/agents/conseiller/bm25.js`
5. `app/js/agents/conseiller/glossaire.js`
6. `app/data/glossaire.json`
