# SF-011-03 — Recherche documentaire (BM25 ; ChromaDB en option) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-03 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |
| Origine | Base v6 ; ADR-007 |
| Bloquant | Aucun |
| Dépend de | SF-011-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La base se cherche par BM25 sans dépendance ; une recherche vectorielle (ChromaDB + embeddings Ollama) est fournie pour le poste de l'équipe, à combiner (hybride).

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agents | Chercher | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1109 | `kb/bm25.py` MUST chercher sans dépendance externe et rendre les k meilleurs fragments. | ADR-007 | Haute | UNDER_REVIEW |
| FR-1110 | `kb/ingest_chroma.py` MUST ingérer la base dans ChromaDB avec un embedding Ollama local et chercher ; il n'a jamais été exécuté dans l'environnement de Claude. | Base v6 | Moyenne | UNDER_REVIEW |
| FR-1111 | Une recherche hybride (BM25 + embedding multilingue) et un filtrage par `doc_id` selon l'agent SHOULD être évalués sur les 40 questions. | Recommandation du README | Moyenne | UNDER_REVIEW |

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
| CA-011-03-01 | FR-1109 | Étant donné « transfert de données vers l'étranger », quand on cherche par BM25, alors `CMR-LOI-2024-017::0033` au top 5. | TEST-011-03-01 |
| CA-011-03-02 | FR-1110 | Étant donné Ollama sur le poste, quand on ingère puis cherche, alors des résultats et le rapport `--embed ollama`. | TEST-011-03-02 |
| CA-011-03-03 | FR-1111 | Étant donné les deux recherches, quand on évalue l'hybride, alors un rapport daté compare BM25, vectoriel et hybride. | TEST-011-03-03 |

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
4. `kb/bm25.py`
5. `kb/ingest_chroma.py`
