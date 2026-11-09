# SF-017-04 — Base de connaissances livrée — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Règles du hackathon (knowledge base containing policies) |
| Bloquant | Aucun |
| Dépend de | SF-011-07 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La base livrée est la version publique v9, avec son README, son catalogue des sources, sa correspondance et son évaluation, compatible avec le code de référence de l'UIT.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Livrer | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2317 | Le dossier `kb/` du dépôt MUST contenir `kb_chunks.jsonl` (version publique), `sources.json`, `mapping/`, `eval/`, `traductions/` et un README à jour. | Règles du hackathon | Haute | UNDER_REVIEW |
| FR-2318 | Le README de la base MUST expliquer le chargement dans le code de référence UIT (`CrashingGuru/ITUAIReadiness`). | Session 4 | Moyenne | UNDER_REVIEW |

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
| CA-017-04-01 | FR-2317 | Étant donné `kb/`, quand on le liste, alors les éléments requis et un README daté. | TEST-017-04-01 |
| CA-017-04-02 | FR-2318 | Étant donné le README, quand on le lit, alors la procédure UIT. | TEST-017-04-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-017-livrables/README.md`
3. les quatre fichiers de ce dossier
4. `kb/`
