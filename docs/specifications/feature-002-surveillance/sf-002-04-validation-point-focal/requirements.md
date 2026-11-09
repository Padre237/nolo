# SF-002-04 — Validation du signal par le point focal — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-204) ; Principe VI |
| Bloquant | Aucun |
| Dépend de | SF-002-03, SF-009-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Aucun signal ne sort du système sans décision explicite et motivée d'un humain : le point focal confirme ou rejette avec un motif d'au moins 10 caractères, et peut rouvrir.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Point focal (démo) | Confirmer, rejeter, rouvrir | Décider sans motif | Session ministère |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-204 | aucun signal ne sort du système sans validation explicite d'un point focal authentifié. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-237 | Confirmer ou rejeter MUST exiger un motif d'au moins 10 caractères ; sinon le message `ministere.signaux.motifCourt` s'affiche sous le champ. | Principe VI | Haute | UNDER_REVIEW |
| FR-238 | La décision MUST être gardée avec statut, motif et date (`ministere-decisions`) et pouvoir être rouverte. | Principe VI | Haute | UNDER_REVIEW |
| FR-239 | Seul un signal `confirme` MUST permettre l'export et l'instrument RSI. | FR-204 | Haute | UNDER_REVIEW |

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
| CA-002-04-01 | FR-237 | Étant donné un motif de 5 caractères, quand on confirme, alors refus et message sous le champ. | TEST-002-04-01 |
| CA-002-04-02 | FR-238 | Étant donné une confirmation, quand on recharge la console, alors statut, motif et date sont là ; « Rouvrir » remet `a_trier`. | TEST-002-04-02 |
| CA-002-04-03 | FR-204, FR-239 | Étant donné un signal `a_trier`, quand on cherche l'export, alors il n'est pas proposé. | TEST-002-04-03, TEST-002-04-04 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-002-surveillance/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/ministere/console.js`
5. `src/server/domain/surveillance.py`
