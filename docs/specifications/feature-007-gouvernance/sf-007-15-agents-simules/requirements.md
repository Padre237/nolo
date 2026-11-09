# SF-007-15 — Agents institutionnels simulés (District/SIMR, APDP) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-15 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | Spécification v1.3 (FR-711) |
| Bloquant | Aucun |
| Dépend de | SF-007-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Des agents jouant le district et l'APDP reçoivent des informations différentes, ont des mandats différents et produisent des positions journalisées distinctes ; un désaccord est tracé, jamais tranché automatiquement en faveur du partage.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent District (simulé) | Demander des données pour la riposte | Obtenir une liste nominative | — |
| Agent APDP (simulé) | Donner un avis sur un traitement | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-711 | les agents institutionnels simulés (District/SIMR, APDP) produisent des positions journalisées distinctes ; un désaccord est tracé, jamais résolu automatiquement en faveur du partage. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-783 | Chaque agent institutionnel MUST avoir un mandat écrit (rôle, informations reçues, décisions possibles, articles qui fondent son mandat). | Exigences du hackathon (coordination multi-agents) | Haute | UNDER_REVIEW |

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
| CA-007-15-01 | FR-711 | Étant donné S3 à J2 15:00, quand le district demande la liste nominative, alors sa demande, le blocage de Conformité et le repli sont trois entrées distinctes. | TEST-007-15-01 |
| CA-007-15-02 | FR-783 | Étant donné le dépôt, quand on ouvre `docs/architecture/agents/`, alors un mandat par agent. | TEST-007-15-02 |

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
5. `docs/architecture/agents/*.md`
