# SF-008-02 — Consentement à la surveillance — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Catalogue v1 ; D-028 |
| Bloquant | Aucun |
| Dépend de | SF-008-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La case « surveillance » est distincte : seules les personnes qui l'ont cochée pourront contribuer aux agrégats ; la refuser ne change rien à l'orientation.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Accepter ou refuser la surveillance | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-811 | Une contribution à la surveillance MUST n'être préparée que si `partage(consentement, 'surveillance')` est vrai. | D-028 ; FR-201 | Haute | UNDER_REVIEW |
| FR-812 | Refuser la surveillance MUST laisser l'orientation et les recherches inchangées. | FR-201 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-201 (SF-002-01) : seules les sessions consenties contribuent

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
| CA-008-02-01 | FR-811 | Étant donné surveillance = false, quand on termine un parcours, alors aucune contribution n'est préparée. | TEST-008-02-01 |
| CA-008-02-02 | FR-812 | Étant donné orientation seule, quand on fait le parcours complet, alors toutes les fonctions locales marchent. | TEST-008-02-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-008-consentements-droits/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/envoi.js`
5. `app/js/screens/patient/*.js`
