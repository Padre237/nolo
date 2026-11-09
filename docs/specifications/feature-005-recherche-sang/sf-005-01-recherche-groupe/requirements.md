# SF-005-01 — Recherche d'un groupe sanguin — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-005 Recherche de sang |
| Sous-fonctionnalité | SF-005-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-501 côté lecture, FR-502, FR-503) |
| Bloquant | Aucun |
| Dépend de | SF-010-03, SF-003-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La personne choisit un groupe (A+ … O−) ; Nolo montre les banques de sang et centres de transfusion qui le déclarent disponible ou faible, en niveaux, jamais en poches.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Choisir un groupe, voir les structures | Voir une quantité | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-502 | jamais de quantité exacte publique. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-503 | mention « délivrance sur prescription uniquement ». | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-520 | `chercherSang(groupe)` MUST exclure les déclarations `rupture` et trier « disponible » avant « faible », puis par distance. | D-029 | Haute | UNDER_REVIEW |
| FR-521 | Les 8 groupes MUST être proposés en boutons (`aria-pressed`), avec le signe moins typographique (−). | D-034 | Moyenne | UNDER_REVIEW |

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
| CA-005-01-01 | FR-520 | Étant donné O− disponible à 4 km et faible à 1 km, quand on cherche, alors le disponible vient d'abord. | TEST-005-01-01 |
| CA-005-01-02 | FR-502, FR-503 | Étant donné les résultats, quand on les lit, alors aucun nombre de poches et la mention de prescription. | TEST-005-01-02 |
| CA-005-01-03 | FR-521 | Étant donné l'onglet Sang, quand on le lit, alors 8 boutons dont un seul pressé. | TEST-005-01-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-005-recherche-sang/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/facilities.js`
5. `app/js/screens/patient/chercher.js`
