# SF-005-02 — Appel au don — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-005 Recherche de sang |
| Sous-fonctionnalité | SF-005-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |
| Origine | Spécification v1.3 (FR-504) |
| Bloquant | Aucun |
| Dépend de | SF-005-01 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Quand les réserves du groupe demandé sont basses dans le rayon, Nolo invite à donner son sang au centre de transfusion.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Lire l'appel au don | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-504 | appel au don déclenché si la majorité des banques du rayon sont en rupture pour le groupe demandé. | Référence v1.3 | Haute | UNDER_REVIEW |

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
| CA-005-02-01 | FR-504 | Étant donné 3 banques dont 2 en rupture pour B−, quand on cherche B−, alors l'appel au don s'affiche ; avec 1 sur 3, il ne s'affiche pas. | TEST-005-02-01 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-005-recherche-sang/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/facilities.js`
