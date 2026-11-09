# SF-007-12 — Rejeu d'une session — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-12 |
| Version | 2.0.0 |
| Statut | APPROVED |
| État d'implémentation | Non implémenté |
| Origine | Catalogue v1 ; D-016 (Proposé) |
| Bloquant | D-016 |
| Dépend de | SF-007-09 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Rejouer une session à partir du journal donne les mêmes décisions, ce qui prouve que la règle — pas le hasard — a décidé.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Auditeur | Rejouer | — | Rôle auditeur |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-773 | Rejouer une session MUST redonner la même décision dans 100 % des cas avec la même politique. | SC-703 | Haute | UNDER_REVIEW |
| FR-774 | Le rejeu MUST signaler les décisions qui changent si l'on change de politique. | FR-707 | Moyenne | UNDER_REVIEW |

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
| CA-007-12-01 | FR-773 | Étant donné le journal de S2, quand on rejoue, alors mêmes verdicts. | TEST-007-12-01 |
| CA-007-12-02 | FR-774 | Étant donné la variante de dérogation, quand on rejoue S2, alors la différence est listée. | TEST-007-12-02 |

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
4. `tools/scenarios/rejouer.py`
