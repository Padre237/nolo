# SF-002-10 — Signal en aire frontalière — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | Spécification v1.3 (FR-209) ; D-005 |
| Bloquant | Aucun |
| Dépend de | SF-002-03 |
| Priorité | P2 |

## 1. Objectif métier et résultat attendu
Un signal dans une aire frontalière rappelle d'informer le point focal national RSI ; le circuit transfrontalier reste hors périmètre.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Point focal | Lire la mention | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-209 | un signal portant sur une aire frontalière (attribut de l'aire dans le référentiel) affiche la mention « informer le point focal national RSI » ; le circuit transfrontalier est hors périmètre du prototype. | Référence v1.3 | Moyenne | UNDER_REVIEW |

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
| CA-002-10-01 | FR-209 | Étant donné une aire marquée frontalière, quand un signal y est ouvert, alors la mention s'affiche. | TEST-002-10-01 |

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
4. `app/js/domain/surveillance.js`
