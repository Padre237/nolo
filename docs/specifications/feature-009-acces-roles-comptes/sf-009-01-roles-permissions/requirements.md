# SF-009-01 — Matrice des rôles et permissions — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Catalogue v1 ; D-029 ; D-035 |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Un document unique dit qui peut faire quoi : citoyen anonyme, citoyen consentant, établissement (compte unique), vérificateur, point focal, agent du ministère, auditeur, équipe.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Tenir la matrice à jour | Ajouter un rôle sans décision | Décision journalisée |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-901 | `docs/product/roles.md` MUST lister chaque rôle avec ses permissions par fonction (lecture, écriture, décision) et la source de chaque permission (décision, article). | Catalogue v1 | Haute | UNDER_REVIEW |
| FR-902 | Chaque écran professionnel ou ministériel MUST vérifier le rôle de la session avant d'afficher ses données (garde de route). | D-029 ; D-035 | Haute | UNDER_REVIEW |

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
| CA-009-01-01 | FR-901 | Étant donné le dépôt, quand on ouvre `docs/product/roles.md`, alors les 8 rôles et leurs permissions sourcées. | TEST-009-01-01 |
| CA-009-01-02 | FR-902 | Étant donné aucune session pro, quand on ouvre `#/pro/tableau`, alors redirection vers `#/pro`. | TEST-009-01-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-009-acces-roles-comptes/README.md`
3. les quatre fichiers de ce dossier
4. `docs/product/roles.md`
5. `app/js/screens/pro/tableau.js`
6. `app/js/screens/ministere/console.js`
