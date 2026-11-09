# SF-007-10 — Contrôle des champs interdits du journal — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-713) |
| Bloquant | Aucun |
| Dépend de | SF-007-09 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le journal refuse toute entrée qui contient un champ interdit (texte libre des symptômes, langue, requête sensible, donnée génétique ou biométrique) et trace le refus.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Journal | Refuser | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-713 | le journal MUST NOT contenir la langue de l'utilisateur, une requête révélant la vie sexuelle, une donnée génétique ou biométrique ; un contrôle automatique rejette l'événement. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-765 | Un événement rejeté MUST produire l'entrée `journal.violation_bloquee` (sans le contenu interdit). | CA-DEMO-03 | Haute | UNDER_REVIEW |

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
| CA-007-10-01 | FR-713, FR-765 | Étant donné un événement avec `texte_libre_symptomes`, quand on l'écrit, alors `ChampInterdit` et une entrée `journal.violation_bloquee`. | TEST-007-10-01 |

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
