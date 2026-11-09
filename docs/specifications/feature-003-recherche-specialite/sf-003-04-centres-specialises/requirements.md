# SF-003-04 — Centres spécialisés par domaine — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-035 |
| Bloquant | Aucun |
| Dépend de | SF-003-02, SF-010-06 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Les centres spécialisés (dialyse, tuberculose, cancérologie, santé mentale, VIH, ophtalmologie, diabète) apparaissent dans la recherche de la spécialité de leur domaine.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Trouver un centre spécialisé par sa spécialité | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-326 | Chaque domaine de centre spécialisé MUST être relié à une spécialité : dialyse → néphrologie, tuberculose → pneumologie, cancérologie → oncologie, santé mentale → psychiatrie, VIH → infectiologie, ophtalmologie → ophtalmologie, diabète → endocrinologie. | D-035 | Haute | UNDER_REVIEW |
| FR-327 | Un centre spécialisé MUST apparaître dans les résultats de la spécialité de son domaine, avec son type « Centre spécialisé ». | D-035 | Haute | UNDER_REVIEW |

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
| CA-003-04-01 | FR-326, FR-327 | Étant donné le centre de dialyse fictif, quand on cherche « néphrologie », alors il apparaît avec le type « Centre spécialisé ». | TEST-003-04-01 |
| CA-003-04-02 | FR-327 | Étant donné le centre de santé mentale fictif, quand on cherche « psychiatrie », alors il apparaît avec la note sensible. | TEST-003-04-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-003-recherche-specialite/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/pro.js`
5. `app/js/domain/facilities.js`
