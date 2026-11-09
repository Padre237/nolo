# SF-010-01 — Référentiel des établissements (tuile de démonstration) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-01 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Catalogue v1 ; D-033 (FR-DX-23) ; D-035 |
| Bloquant | Aucun |
| Dépend de | SF-012-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une tuile de district fictive regroupe les établissements visibles (hôpitaux, CMA, CSI, cliniques, pharmacies, centre de transfusion, centres spécialisés) avec types, horaires, spécialités, services, stocks et sang ; les comptes vérifiés de l'espace pro s'y ajoutent.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Lire la tuile sur l'appareil | Voir un établissement non vérifié | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1001 | La tuile MUST contenir au moins 20 établissements fictifs couvrant chaque niveau (`centre_sante`, `hopital_district`, `hopital_urgences_24h`) et chaque spécialité utilisée par les pistes. | FR-DX-23 | Haute | UNDER_REVIEW |
| FR-1002 | Chaque établissement MUST porter : id, nom, type, catégorie, position (décalage en km), horaires par jour, spécialités et modalités, services, stock, sang, `verifie`, `actif`. | D-029 | Haute | UNDER_REVIEW |
| FR-1003 | Les établissements des comptes pro vérifiés MUST être fusionnés à la tuile (`definirSupplementaires`, `fusion`) sans doublon d'identifiant. | D-029 | Haute | UNDER_REVIEW |
| FR-1004 | Toutes les données de la tuile MUST être marquées fictives (commentaire d'en-tête, mention à l'écran, numéros d'appel désactivés). | Règles du hackathon | Haute | UNDER_REVIEW |

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
| CA-010-01-01 | FR-1001 | Étant donné la tuile, quand on compte, alors ≥ 20 établissements et chaque niveau et spécialité des pistes couverts. | TEST-010-01-01 |
| CA-010-01-02 | FR-1003 | Étant donné le compte de démonstration hôpital vérifié, quand on cherche, alors son établissement apparaît une seule fois. | TEST-010-01-02 |
| CA-010-01-03 | FR-1004 | Étant donné une ligne de structure, quand on l'inspecte, alors le bouton d'appel est désactivé et décrit par `#numeros-fictifs`. | TEST-010-01-03 |
| CA-010-01-04 | FR-1002 | Étant donné chaque établissement, quand on valide son schéma, alors tous les champs requis sont présents. | TEST-010-01-04 |

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
4. `app/js/domain/facilities.js`
5. `app/js/screens/pro/compte.js`
