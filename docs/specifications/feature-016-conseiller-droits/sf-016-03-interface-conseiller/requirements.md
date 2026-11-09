# SF-016-03 — Interface du conseiller (citoyen, établissement, ministère) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | AG-06 |
| Bloquant | Aucun |
| Dépend de | SF-016-02, SF-013-04 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Le conseiller est accessible depuis l'accueil (« Mes droits santé »), l'espace établissement et la console du ministère, avec des questions d'exemple et la même réponse pour tous.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen, établissement, ministère | Poser une question | — | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2211 | Une route `#/droits` MUST proposer un champ de question (≤ 300 caractères), 4 questions d'exemple et la réponse. | AG-06 | Haute | UNDER_REVIEW |
| FR-2212 | Les espaces professionnel et ministériel MUST offrir un lien vers le conseiller. | AG-06 | Moyenne | UNDER_REVIEW |
| FR-2213 | Toute l'interface MUST exister en FR et EN avec les mêmes clés. | D-027 | Haute | UNDER_REVIEW |

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
| CA-016-03-01 | FR-2211 | Étant donné l'accueil, quand on ouvre « Mes droits santé », alors champ, exemples et réponse. | TEST-016-03-01 |
| CA-016-03-02 | FR-2212 | Étant donné le tableau de bord et la console, quand on cherche le lien, alors présent. | TEST-016-03-02 |
| CA-016-03-03 | FR-2213 | Étant donné les catalogues, quand on compare `droits.*`, alors mêmes clés. | TEST-016-03-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-016-conseiller-droits/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/patient/droits.js`
