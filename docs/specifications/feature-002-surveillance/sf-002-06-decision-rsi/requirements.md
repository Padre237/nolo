# SF-002-06 — Instrument de décision du RSI (annexe 2) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | RSI art. 6 et annexe 2 ; D-005 |
| Bloquant | Aucun |
| Dépend de | SF-002-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Pour un signal confirmé, le point focal répond aux quatre questions de l'annexe 2 du RSI ; deux « oui » ou plus indiquent une notification à l'OMS dans les 24 h, qui reste une décision humaine.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Point focal national RSI (démo) | Répondre, décider | Laisser le système notifier seul | Signal confirmé |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-246 | L'instrument MUST poser les quatre questions `grave`, `inhabituel`, `propagation`, `restrictions`. | RSI annexe 2 | Haute | UNDER_REVIEW |
| FR-247 | `decisionRsi` MUST rendre vrai dès 2 « oui » sur 4 et afficher « notification à l'OMS dans les 24 h » comme recommandation, la décision restant au point focal. | RSI art. 6 | Haute | UNDER_REVIEW |
| FR-248 | Les réponses MUST être gardées avec la décision du signal. | Principe VIII | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-002-06-01 | Évaluation par l'instrument de décision et notification sous 24 h | `INT-OMS-RSI-2005-AMENDE-2022::0012` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-002-06-01 | FR-246, FR-247 | Étant donné « grave » et « inhabituel » à oui, quand on évalue, alors notification recommandée ; un seul oui, non. | TEST-002-06-01 |
| CA-002-06-02 | FR-248 | Étant donné des réponses, quand on recharge, alors elles sont conservées. | TEST-002-06-02 |

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
5. `app/js/screens/ministere/console.js`
