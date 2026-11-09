# SF-008-04 — Âge et accord parental — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-107) ; D-028 (FR-CONS-05) |
| Bloquant | Aucun |
| Dépend de | SF-008-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Si au moins une case est cochée, la personne dit si elle a 18 ans ou plus ; un mineur doit cocher l'accord de son parent ou représentant légal.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen mineur | Partager avec l'accord parental | Partager sans accord | Accord parental |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-107 | pour un utilisateur de moins de 18 ans sans consentement parental, seule l'orientation urgente est servie. | Référence v1.3 | Haute | REMPLACÉE par FR-831 et FR-832 (D-028) |
| FR-831 | La question d'âge MUST n'apparaître que si au moins une case est cochée (`demandeAge`) ; sans réponse, refus `E-CONS-AGE`. | FR-CONS-05 | Haute | UNDER_REVIEW |
| FR-832 | « Moins de 18 ans » MUST exiger la case d'accord parental ; sans elle, refus `E-CONS-PARENTAL` ; avec elle, `accord_parental: true`. | FR-CONS-05 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-008-04-01 | Consentement parental sous 18 ans | `CMR-LOI-2024-017::0011` (art. 9 al. 3) |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-008-04-01 | FR-831 | Étant donné une case cochée et l'âge vide, quand on valide, alors `E-CONS-AGE`. | TEST-008-04-01; CA-CONS-02 |
| CA-008-04-02 | FR-832 | Étant donné « mineur » sans accord, quand on valide, alors `E-CONS-PARENTAL` ; avec accord, accepté. | TEST-008-04-02; CA-CONS-03 |

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
4. `app/js/domain/consent.js`
