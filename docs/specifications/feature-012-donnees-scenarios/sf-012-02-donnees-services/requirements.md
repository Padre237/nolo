# SF-012-02 — Établissements, stocks et signalements simulés (référence Python) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Base v3 |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
37 établissements fictifs, 13 DCI, 247 déclarations de stock, 32 niveaux de sang, 434 signalements dont une campagne de manipulation, pour la logique de référence.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Régénérer | Utiliser des établissements réels | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1204 | `kb/generate_services.py` MUST régénérer les fichiers de `kb/data/synthetic/` à graine fixe, avec `campagne_simulee = True` sur la campagne injectée. | Base v3 | Haute | UNDER_REVIEW |
| FR-1205 | Les 11 contrôles de `kb/services/test_services.py` MUST réussir sur ces données. | Base v3 | Haute | UNDER_REVIEW |

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
| CA-012-02-01 | FR-1204 | Étant donné la graine, quand on régénère, alors identique ; la campagne est marquée. | TEST-012-02-01 |
| CA-012-02-02 | FR-1205 | Étant donné les données, quand on lance les contrôles, alors 11/11. | TEST-012-02-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-012-donnees-scenarios/README.md`
3. les quatre fichiers de ce dossier
4. `kb/generate_services.py`
5. `kb/services/`
