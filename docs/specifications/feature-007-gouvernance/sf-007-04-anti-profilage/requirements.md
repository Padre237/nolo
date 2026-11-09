# SF-007-04 — Contrôle anti-profilage — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 |
| Bloquant | Aucun |
| Dépend de | SF-007-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Contrôle anti-profilage : règle de l'agent Conformité, décidée depuis la politique et citée.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent Conformité | Décider | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-704 | contrôle anti-profilage : refus de toute requête qui relie dans la durée une personne à ses symptômes, recherches ou positions. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-735 | L'action `profil.relier_dans_la_duree` MUST être `BLOQUE` (`PROFILAGE_INTERDIT`) dans tous les modes, en citant les art. 44 et 65-66. | Contrats de gouvernance | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-007-04-01 | Voir la table des actions | `src/server/agents/conformite.py > TABLE` ; `config/policy.yaml` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-007-04-01 | FR-704, FR-735 | Étant donné `profil.relier_dans_la_duree` dans chaque mode, quand on décide, alors BLOQUE cité art. 44 et 65-66. | TEST-007-04-01 |

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
