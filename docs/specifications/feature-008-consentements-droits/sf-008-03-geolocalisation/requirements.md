# SF-008-03 — Position du citoyen : géolocalisation consentie ou quartier saisi — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-03 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Non implémenté |
| Origine | Catalogue v1 ; `policy.yaml > consentement.geolocalisation` |
| Bloquant | Aucun |
| Dépend de | SF-008-01 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Pour trier les structures par distance, Nolo utilise la position du téléphone avec un accord explicite, arrondie à 2 décimales et gardée en mémoire seulement ; à défaut, la personne choisit son quartier.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Autoriser la position ou choisir un quartier | Voir sa position envoyée | Accord du navigateur |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-821 | La position MUST n'être demandée qu'au moment d'une recherche ou d'une recommandation, après une phrase qui dit pourquoi ; un refus propose la saisie du quartier. | `policy.yaml > consentement.geolocalisation` | Haute | UNDER_REVIEW |
| FR-822 | La position MUST être arrondie à 2 décimales dès sa lecture et gardée en mémoire de l'onglet seulement. | FR-105 | Haute | UNDER_REVIEW |
| FR-823 | Dans une page hébergée dans un cadre (géolocalisation refusée), Nolo MUST utiliser le point de référence de démonstration et le dire. | D-034 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-105 (SF-001-01) : position arrondie, aucun historique

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
| CA-008-03-01 | FR-821 | Étant donné une recherche, quand on refuse la position, alors la liste des quartiers apparaît. | TEST-008-03-01 |
| CA-008-03-02 | FR-822 | Étant donné une position (4.05123, 9.76789), quand elle est lue, alors (4.05, 9.77) en mémoire, rien en stockage. | TEST-008-03-02 |
| CA-008-03-03 | FR-823 | Étant donné la page dans un cadre, quand on recherche, alors le point de référence est utilisé et la mention s'affiche. | TEST-008-03-03 |

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
4. `app/js/domain/position.js`
5. `app/js/domain/facilities.js`
