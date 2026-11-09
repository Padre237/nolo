# SF-004-01 — Catalogue des DCI et normalisation de la saisie — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-01 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-407) ; D-029 |
| Bloquant | Aucun |
| Dépend de | SF-013-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La personne cherche un médicament par sa dénomination commune (DCI), avec une saisie tolérante (accents, casse). Les produits de l'art. 75 sont exclus du catalogue.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Taper et choisir une DCI | Chercher un produit de l'art. 75 | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-407 | produits de l'art. 75 exclus du catalogue. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-420 | Le catalogue MUST contenir les 16 DCI de `DCI` avec libellés FR/EN, la marque `ordonnance` et la marque `sensible` (lévonorgestrel, TLD). | D-029 | Haute | UNDER_REVIEW |
| FR-421 | La saisie MUST filtrer le catalogue sans tenir compte des accents ni de la casse et proposer au plus 8 DCI. | D-034 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-004-01-01 | Produits favorisant l'avortement interdits à l'exposition et à la vente | `CMR-LOI-90-035::0072` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-004-01-01 | FR-407 | Étant donné `PRODUITS_ART75`, quand on cherche « misoprostol », alors aucune proposition. | TEST-004-01-01 |
| CA-004-01-02 | FR-421 | Étant donné la saisie « PARACE », quand on filtre, alors « Paracétamol » est proposé, 8 propositions au plus. | TEST-004-01-02 |
| CA-004-01-03 | FR-420 | Étant donné le catalogue, quand on le lit, alors 16 entrées bilingues dont 2 sensibles. | TEST-004-01-03 |

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
