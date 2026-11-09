# SF-007-09 — Écriture du journal d'audit chaîné — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-706, FR-709) ; ADR-010 |
| Bloquant | Aucun |
| Dépend de | MT-001 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Chaque décision entre dans un journal en ajout seul, chaque entrée portant l'empreinte de la précédente ; l'entrée nomme l'agent décideur et les contributeurs.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Orchestrateur | Écrire | Modifier une entrée | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-706 | journal en ajout seul, chaîné par SHA-256, sans les champs interdits de `policy.yaml > journal_audit.champs_interdits`. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-709 | chaque entrée de journal nomme l'agent décideur et les agents contributeurs (responsabilité entre agents). | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-760 | Une entrée MUST contenir : horodatage, session pseudonyme, agent, contributeurs, action, entrée minimisée, fragments, politique (version, clés), décision, repli, justification, validateur humain, `hash_precedent`, `hash`. | Contrats §6 | Haute | UNDER_REVIEW |
| FR-761 | Les pseudonymes de session MUST être des HMAC stables et non réversibles. | ADR-011 | Haute | UNDER_REVIEW |

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
| CA-007-09-01 | FR-706, FR-760 | Étant donné trois entrées écrites, quand on vérifie la chaîne, alors valide ; chaque entrée a ses champs. | TEST-007-09-01 |
| CA-007-09-02 | FR-709 | Étant donné une décision à plusieurs agents, quand on lit l'entrée, alors décideur et contributeurs. | TEST-007-09-02 |
| CA-007-09-03 | FR-761 | Étant donné le même identifiant deux fois, quand on pseudonymise, alors même valeur, et aucune inversion possible. | TEST-007-09-03 |

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
4. `src/server/gouvernance/journal.py`
