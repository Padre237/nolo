# SF-004-02 — Recherche dans les stocks déclarés et classement — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-02 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-402, FR-403, FR-406) ; D-029 |
| Bloquant | Aucun |
| Dépend de | SF-004-01, SF-010-02, SF-006-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Nolo montre les officines et pharmacies hospitalières vérifiées dont le stock déclaré (disponible ou faible) a moins de 48 h, par rayon progressif, triées par ouverture puis distance.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Voir où le médicament est déclaré disponible | Voir une déclaration expirée ou en rupture | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-402 | format de déclaration : DCI, niveau, horodatage, déclarant authentifié ; fraîcheur 12 h ; expiration 48 h. | Référence v1.3 ; D-029 (déclarant = établissement) | Haute | UNDER_REVIEW |
| FR-403 | mention « Délivré sur ordonnance » sur chaque résultat. | Référence v1.3 | Haute | REMPLACÉE par FR-422 (mention selon la DCI) |
| FR-406 | aucun classement payant ; formule de tri publiée. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-422 | La mention « Délivré sur ordonnance » MUST apparaître sur chaque résultat d'une DCI marquée `ordonnance`. | D-029 | Haute | UNDER_REVIEW |
| FR-423 | `chercherMedicament` MUST exclure les lignes `rupture` et celles de 48 h ou plus (`FRAICHEUR_H`), puis appliquer les paliers 5, 10, 20, 50 km et le tri ouverture puis distance. | FR-ETS-10 (D-029) | Haute | UNDER_REVIEW |
| FR-424 | Chaque résultat MUST afficher le niveau (disponible, faible) avec sa couleur et son texte, et l'âge de la déclaration. | D-034 | Moyenne | UNDER_REVIEW |

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
| CA-004-02-01 | FR-423 | Étant donné une ligne en rupture et une ligne vieille de 49 h, quand on cherche, alors aucune des deux n'apparaît. | TEST-004-02-01 |
| CA-004-02-02 | FR-422, FR-403 | Étant donné l'amoxicilline, quand les résultats s'affichent, alors chaque ligne porte « Délivré sur ordonnance ». | TEST-004-02-02 |
| CA-004-02-03 | FR-406 | Étant donné la formule de tri, quand on lit la page des conditions, alors elle est publiée (ouverture, distance). | TEST-004-02-03 |
| CA-004-02-04 | FR-402, FR-424 | Étant donné une ligne de 3 h « faible », quand elle s'affiche, alors niveau « faible » (texte et couleur) et « il y a 3 h ». | TEST-004-02-04 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-004-recherche-medicament/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/facilities.js`
5. `app/js/screens/patient/chercher.js`
