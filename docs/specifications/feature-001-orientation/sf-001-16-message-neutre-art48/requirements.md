# SF-001-16 — Message neutre pour une piste relevant de l'art. 48 — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-16 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-033 (FR-DX-06, FR-DX-21 ; Q2) |
| Bloquant | Aucun |
| Dépend de | SF-001-15 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Si une piste relève d'une catégorie de l'art. 48 (par exemple une infection VIH initiale), Nolo n'affiche aucun nom de maladie : un message neutre invite à un dépistage confidentiel au centre de santé le plus proche, sans spécialité.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Lire le message neutre et trouver le centre de santé | Voir le nom de la maladie | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1536 | Si une des pistes retenues porte `art48: true`, `analyser` MUST renvoyer l'issue `art48` sans aucune piste. | FR-DX-06 | Haute | UNDER_REVIEW |
| FR-1537 | L'écran « Confidentiel » MUST afficher le message neutre et le centre de santé ouvert le plus proche, sans spécialité ni nom de maladie. | FR-DX-06, FR-DX-21 | Haute | UNDER_REVIEW |
| FR-1538 | La fiche pour le soignant MUST ne porter que les signes dans ce cas. | FR-DX-22 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-16-01 | Traitement interdit sans dérogation : vie sexuelle, génétique, biométrie de santé | `CMR-LOI-2024-017::0048` ; D-008 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-16-01 | FR-1536 | Étant donné des signes évocateurs d'une infection VIH initiale, quand on analyse, alors issue `art48`, zéro piste. | TEST-001-16-01 |
| CA-001-16-02 | FR-1537 | Étant donné l'écran Confidentiel, quand on lit son texte, alors aucun nom de pathologie et un centre de santé proposé. | TEST-001-16-02 |
| CA-001-16-03 | FR-1538 | Étant donné l'issue `art48`, quand on produit la fiche, alors elle ne liste que les signes. | TEST-001-16-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-001-orientation/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/engine.js`
5. `app/js/screens/patient/confidentiel.js`
6. `app/js/screens/patient/fiche.js`
