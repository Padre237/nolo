# SF-016-05 — LLM local optionnel : reformuler les extraits, jamais décider — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | ADR-006 ; FR-703 |
| Bloquant | Ollama sur le poste de l'équipe (indisponible dans l'environnement de Claude) |
| Dépend de | SF-016-02 |
| Priorité | P2 |

## 1. Objectif métier et résultat attendu
Sur le poste de l'équipe, un LLM local (Ollama) peut résumer les extraits trouvés en langage simple, en citant les mêmes fragments ; il ne peut ni ajouter une source ni contredire un verdict.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| LLM local | Résumer les extraits fournis | Ajouter une source ; répondre sans extrait ; changer un verdict | Configuration explicite ; poste de l'équipe |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2218 | Le LLM MUST ne recevoir que la question et les extraits trouvés, et sa sortie MUST être rejetée si elle cite un `chunk_id` absent des extraits. | ADR-006 ; FR-703 | Haute | UNDER_REVIEW |
| FR-2219 | Sans LLM disponible, le conseiller MUST rester extractif (SF-016-02) sans dégradation. | ADR-006 | Haute | UNDER_REVIEW |

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
| CA-016-05-01 | FR-2218 | Étant donné une sortie du LLM citant un fragment non fourni, quand on la contrôle, alors elle est rejetée et la réponse extractive s'affiche. | TEST-016-05-01 |
| CA-016-05-02 | FR-2219 | Étant donné aucun LLM, quand on pose une question, alors la réponse extractive. | TEST-016-05-02 |

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
4. `app/js/agents/conseiller/llm.js`
