# SF-014-05 — Accès réservé, sans alerte ni export brut — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-032 (FR-TEND-09, 10 ; CA-TEND-08, 09) |
| Bloquant | Aucun |
| Dépend de | SF-010-07 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Les tendances sont réservées aux établissements vérifiés, identiques pour tous ; aucune alerte, aucune notification, aucun export brut.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement vérifié | Lire | Exporter les compteurs bruts | Compte vérifié |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2017 | La vue MUST n'émettre aucune alerte ni notification et n'offrir aucun export brut ; aucune route ne renvoie les compteurs bruts. | FR-TEND-09 | Haute | UNDER_REVIEW |
| FR-2018 | La vue MUST être réservée aux établissements vérifiés et identique pour tous. | FR-TEND-10 | Haute | UNDER_REVIEW |

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
| CA-014-05-01 | FR-2018 | Étant donné un établissement non vérifié, quand il ouvre Tendances, alors accès refusé. | TEST-014-05-01; CA-TEND-08 |
| CA-014-05-02 | FR-2017 | Étant donné le service, quand on liste ses routes, alors aucune ne renvoie les compteurs bruts. | TEST-014-05-02; CA-TEND-09 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-014-tendances-demande/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/pro/tableau.js`
5. `src/server/etablissements/app.py`
