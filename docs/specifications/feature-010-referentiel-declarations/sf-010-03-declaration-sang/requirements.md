# SF-010-03 — Déclaration des niveaux de sang — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-03 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | Spécification v1.3 (FR-501) ; D-029 |
| Bloquant | Aucun |
| Dépend de | SF-010-07 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Un hôpital avec banque de sang (H8 = oui) ou un centre de transfusion déclare, par groupe, un niveau (disponible, faible, rupture) ; jamais de nombre de poches public.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Hôpital avec banque de sang, centre de transfusion | Déclarer les niveaux par groupe | Publier une quantité | Compte vérifié |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-501 | seuls `banque_de_sang_hospitaliere` et `centre_transfusion` déclarent ; niveaux `disponible`, `faible`, `rupture` ; fraîcheur 6 h. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-1013 | L'onglet « Stock sang » MUST n'exister que pour un centre de transfusion ou un hôpital ayant répondu H8 = oui, et ne proposer que les groupes cochés en H8a (ou B1). | CA-ETS-04 | Haute | UNDER_REVIEW |
| FR-1014 | Une déclaration de sang MUST expirer 6 h après son envoi pour les citoyens. | FR-501 | Haute | UNDER_REVIEW |

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
| CA-010-03-01 | FR-1013, FR-501 | Étant donné un hôpital H8 = non, quand on ouvre son tableau de bord, alors pas d'onglet sang ; H8 = oui avec A+ et O−, deux groupes proposés. | TEST-010-03-01 |
| CA-010-03-02 | FR-1014 | Étant donné une déclaration de 6 h 01, quand on cherche ce groupe, alors absente. | TEST-010-03-02 |

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
4. `app/js/domain/pro.js`
5. `app/js/domain/facilities.js`
