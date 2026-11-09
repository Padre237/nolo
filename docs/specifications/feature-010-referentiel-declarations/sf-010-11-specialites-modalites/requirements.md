# SF-010-11 — Saisie des spécialités et de leurs modalités (hôpital) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-11 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-035 |
| Bloquant | Aucun |
| Dépend de | SF-010-06 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Dans la fiche, l'hôpital coche ses spécialités et, pour chacune, une modalité et des jours ; les spécialités alimentent la recherche citoyenne.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Hôpital, centre de santé | Cocher, choisir modalité et jours | — | Session pro |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1049 | La question H3 MUST proposer les 19 spécialités ; cocher une spécialité ouvre le choix de la modalité (`modalites.*`) et des jours (`JOURS`). | D-035 | Haute | UNDER_REVIEW |
| FR-1050 | Les spécialités enregistrées MUST être reprises par `versEtablissement` dans la tuile (`specialites: { sp: { m, j } }`). | D-035 | Haute | UNDER_REVIEW |

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
| CA-010-11-01 | FR-1049 | Étant donné H3, quand on coche cardiologie, alors modalité et jours apparaissent. | TEST-010-11-01 |
| CA-010-11-02 | FR-1050 | Étant donné cardiologie enregistrée, quand on cherche cardiologie, alors l'hôpital apparaît avec la modalité. | TEST-010-11-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-010-referentiel-declarations/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/pro/vue-fiche.js`
5. `app/js/screens/pro/compte.js`
