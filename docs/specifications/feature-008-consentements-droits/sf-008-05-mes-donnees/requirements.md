# SF-008-05 — « Mes données » : modifier, retirer, effacer — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-028 (FR-CONS-07) |
| Bloquant | Aucun |
| Dépend de | SF-008-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
À tout moment, la personne modifie ou retire chaque consentement aussi simplement qu'elle l'a donné, et peut effacer tout ce que Nolo garde sur l'appareil.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Modifier, retirer tout, effacer tout | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-841 | L'écran « Mes données » MUST montrer l'état de chaque finalité et permettre de le changer puis d'enregistrer. | FR-CONS-07 | Haute | UNDER_REVIEW |
| FR-842 | « Retirer » MUST enregistrer l'équivalent de « sans partage » (`sansPartage`). | FR-CONS-07 | Haute | UNDER_REVIEW |
| FR-843 | « Effacer » MUST supprimer les clés `consentement`, `signalements`, `pro-comptes`, `pro-session`, `pro-essais` et ramener à l'écran de première utilisation. | FR-CONS-07 | Haute | UNDER_REVIEW |
| FR-844 | Le retrait de la finalité « signalements » MUST effacer les signalements enregistrés sur l'appareil. | FR-CONS-07 | Moyenne | UNDER_REVIEW |

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
| CA-008-05-01 | FR-841 | Étant donné surveillance décochée puis enregistrée, quand on relit, alors `finalites.surveillance === false`. | TEST-008-05-01 |
| CA-008-05-02 | FR-842 | Étant donné « Retirer », quand on relit, alors trois finalités à `false`. | TEST-008-05-02 |
| CA-008-05-03 | FR-843 | Étant donné « Effacer », quand on lit le stockage, alors aucune des cinq clés et l'écran de première utilisation s'affiche. | TEST-008-05-03 |
| CA-008-05-04 | FR-844 | Étant donné deux signalements et le retrait de « signalements », quand on enregistre, alors la clé `signalements` est vide. | TEST-008-05-04 |

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
4. `app/js/screens/patient/mes-donnees.js`
