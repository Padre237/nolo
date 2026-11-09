# SF-009-04 — Usage anonyme sans compte — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Catalogue v1 ; D-028 |
| Bloquant | Aucun |
| Dépend de | SF-009-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Tout le parcours citoyen fonctionne sans compte : décrire, être alerté, chercher, produire la fiche.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Tout le parcours sans compte | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-916 | Aucune fonction citoyenne MUST exiger un compte ; seuls les espaces professionnel et ministériel en demandent un. | D-028 | Haute | UNDER_REVIEW |

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
| CA-009-04-01 | FR-916 | Étant donné aucun compte, quand on parcourt décrire, vérifier, pistes, où aller, fiche, recherche, alors tout fonctionne. | TEST-009-04-01 |

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
4. `app/js/app.js`
