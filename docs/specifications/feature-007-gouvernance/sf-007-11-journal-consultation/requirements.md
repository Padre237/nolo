# SF-007-11 — Consultation du journal et vérification de la chaîne (serveur) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-11 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |
| Origine | Catalogue v1 |
| Bloquant | Aucun |
| Dépend de | SF-007-09, SF-009-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Un auditeur lit une session dans l'ordre (agent, décision, fragments, versions, validateur) et détecte toute entrée modifiée après coup.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Auditeur | Lire, vérifier | Modifier | Rôle auditeur |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-768 | `verifier_chaine` MUST désigner la première entrée dont l'empreinte ou le chaînage ne correspond pas. | ADR-010 | Haute | UNDER_REVIEW |
| FR-769 | Une commande MUST afficher une session lisible : ordre, agent, décision, fragments (identifiant et article), versions, validateur. | Catalogue v1 | Moyenne | UNDER_REVIEW |

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
| CA-007-11-01 | FR-768 | Étant donné une entrée modifiée, quand on vérifie, alors son identifiant est signalé. | TEST-007-11-01 |
| CA-007-11-02 | FR-769 | Étant donné le journal de S3, quand on lance la commande de lecture, alors les 25 événements dans l'ordre. | TEST-007-11-02 |

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
5. `tools/lire_journal.py`
