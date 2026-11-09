# SF-010-12 — Comptes de démonstration (officine et hôpital) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-034 ; D-035 |
| Bloquant | Aucun |
| Dépend de | SF-010-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Deux boutons ouvrent des comptes de démonstration complets : une officine vérifiée avec du stock et l'hôpital de district fictif (fiche complète, stock et sang), pour montrer l'espace pro en quelques secondes.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Visiteur, jury | Ouvrir un compte de démonstration | Confondre ces comptes avec de vrais établissements | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1053 | « Compte de démonstration — officine » et « — hôpital » MUST créer ou rouvrir `compteDemo()` et `compteDemoHopital()` et ouvrir leur session. | D-034 ; D-035 | Haute | UNDER_REVIEW |
| FR-1054 | Les comptes de démonstration MUST utiliser des NIU de `AGREMENT_SIMULE`, des noms fictifs et porter la mention « démonstration ». | D-034 | Haute | UNDER_REVIEW |

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
| CA-010-12-01 | FR-1053 | Étant donné l'entrée pro, quand on touche « hôpital », alors le tableau de bord de l'hôpital fictif s'ouvre, vérifié, avec Services et Stock. | TEST-010-12-01 |
| CA-010-12-02 | FR-1054 | Étant donné les comptes de démonstration, quand on lit leurs données, alors NIU simulés et mention. | TEST-010-12-02 |

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
4. `app/js/screens/pro/compte.js`
5. `app/js/screens/pro/entree.js`
