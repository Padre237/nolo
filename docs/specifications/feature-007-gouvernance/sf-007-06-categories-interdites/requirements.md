# SF-007-06 — Blocage des catégories de l'art. 48 — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 |
| Bloquant | Aucun |
| Dépend de | SF-007-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Blocage des catégories de l'art. 48 : règle de l'agent Conformité, décidée depuis la politique et citée.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent Conformité | Décider | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-712 | l'agent Conformité MUST bloquer toute action portant sur une catégorie de `donnees_sensibles.categories_interdites_art48`, quel que soit le consentement ; repli `appareil` pour les recherches, `agregat` pour la surveillance. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-741 | La dérogation simulée (« et si ») MUST transformer ce blocage en `AUTORISE_AVEC_CONDITIONS` avec la condition `derogation_art48_simulee`. | Contrats de gouvernance | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-007-06-01 | Voir la table des actions | `src/server/agents/conformite.py > TABLE` ; `config/policy.yaml` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-007-06-01 | FR-712, FR-741 | Étant donné la variante `et-si-derogation-art48`, quand on décide une recherche sensible, alors `AUTORISE_AVEC_CONDITIONS` avec la condition simulée. | TEST-007-06-01 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-007-gouvernance/README.md`
3. les quatre fichiers de ce dossier
4. `src/server/agents/conformite.py`
