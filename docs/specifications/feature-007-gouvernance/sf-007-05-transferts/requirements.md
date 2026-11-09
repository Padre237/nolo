# SF-007-05 — Contrôle des transferts hors du pays — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 |
| Bloquant | Aucun |
| Dépend de | SF-007-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Contrôle des transferts hors du pays : règle de l'agent Conformité, décidée depuis la politique et citée.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent Conformité | Décider | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-705 | contrôle de transfert avant tout appel réseau sortant. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-738 | Une destination `hors_cmr` MUST être bloquée pour des données personnelles tant que `transfert_hors_pays.autorise_donnees_personnelles` est faux, avec repli `modele_local`. | Contrats de gouvernance | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-007-05-01 | Voir la table des actions | `src/server/agents/conformite.py > TABLE` ; `config/policy.yaml` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-007-05-01 | FR-705, FR-738 | Étant donné un appel hors du pays avec des symptômes codés, quand on décide, alors BLOQUE `TRANSFERT_SANS_AUTORISATION`, repli `modele_local`. | TEST-007-05-01 |

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
4. `src/server/agents/conformite.py`
