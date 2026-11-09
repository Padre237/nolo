# SF-007-13 — Simulation « et si » de la politique (serveur) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-13 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-707) |
| Bloquant | Aucun |
| Dépend de | SF-007-01, SF-012-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Un régulateur change une valeur de la politique, rejoue les scénarios et lit le rapport des décisions qui changent.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Régulateur | Simuler | Écrire la variante sur disque | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-707 | mode simulation : modification de `policy.yaml`, rejeu des scénarios, rapport de différences. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-777 | `--politique config/variantes/<v>.yaml` MUST produire un rapport de différences non vide quand la variante change un verdict. | CA-DEMO-06 | Haute | UNDER_REVIEW |

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
| CA-007-13-01 | FR-707, FR-777 | Étant donné `et-si-derogation-art48.yaml`, quand on exécute S2, alors le rapport montre BLOQUE → AUTORISE_AVEC_CONDITIONS. | TEST-007-13-01 |

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
4. `tools/scenarios/executer.py`
5. `config/variantes/`
