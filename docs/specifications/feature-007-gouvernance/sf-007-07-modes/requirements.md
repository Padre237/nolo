# SF-007-07 — Modes de fonctionnement — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 |
| Bloquant | Aucun |
| Dépend de | SF-007-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Modes de fonctionnement : règle de l'agent Conformité, décidée depuis la politique et citée.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent Conformité | Décider | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-714 | au démarrage, l'orchestrateur MUST déterminer le mode (`demo_synthetique`, `sans_donnees_personnelles`, `complet`) à partir de `policy.yaml > autorisation_prealable` ; sans référence d'autorisation APDP, le mode `complet` est impossible. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-744 | Le mode `complet` MUST exiger une référence d'autorisation APDP non vide ; à défaut, `sans_donnees_personnelles` (ou `demo_synthetique` si la démonstration est demandée). | Contrats de gouvernance | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-007-07-01 | Voir la table des actions | `src/server/agents/conformite.py > TABLE` ; `config/policy.yaml` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-007-07-01 | FR-714, FR-744 | Étant donné aucune référence APDP, quand on résout le mode, alors jamais `complet`. | TEST-007-07-01 |

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
