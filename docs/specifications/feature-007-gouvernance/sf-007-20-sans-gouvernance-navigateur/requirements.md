# SF-007-20 — « Rejouer sans gouvernance » dans Nolo — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-20 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | AG-08 ; FR-710 |
| Bloquant | Aucun |
| Dépend de | SF-007-17, SF-007-19 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Un bouton de la console rejoue les parcours de démonstration avec la Conformité désactivée et liste les violations, détectées et nommées par le système ; avec la gouvernance, aucune.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Jury, équipe | Rejouer | Désactiver la gouvernance hors démo | Mode démo |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1931 | Le bouton MUST rejouer les parcours S1 à S4 avec `ConformiteSansGouvernance` et afficher les violations de la taxonomie fermée, journal toujours actif. | AG-08 | Haute | UNDER_REVIEW |
| FR-1932 | Le rapport MUST compter au moins 5 violations sans gouvernance et 0 avec, sur les mêmes parcours. | AG-08 ; SC-702 | Haute | UNDER_REVIEW |
| FR-1933 | Le commutateur MUST être impossible hors du mode `demo_synthetique`. | FR-710 | Haute | UNDER_REVIEW |

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
| CA-007-20-01 | FR-1931, FR-1932 | Étant donné le bouton, quand on rejoue, alors ≥ 5 violations nommées sans gouvernance, 0 avec. | TEST-007-20-01 |
| CA-007-20-02 | FR-1933 | Étant donné un mode simulé `complet`, quand on cherche le bouton, alors absent. | TEST-007-20-02 |

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
4. `app/js/agents/ab.js`
