# SF-012-03 — Scénarios S1 à S3 et exécuteur — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-03 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | D-025 ; CA-DEMO-01 à 06 |
| Bloquant | Aucun |
| Dépend de | SF-012-01, SF-012-02, F-007 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Trois scénarios de bout en bout (orientation urgente, médicament sensible, regroupement J1 à J4), exécutables avec ou sans gouvernance et sous une variante, produisent un rapport JSON et un journal chaîné.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe, jury | Exécuter | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1207 | `tools/scenarios/executer.py --scenario <id>` MUST produire `rapport_<id>.json` (conformité étape par étape) et `journal_<id>.jsonl` chaîné, et sortir en 0 si tout est conforme. | D-025 | Haute | UNDER_REVIEW |
| FR-1208 | Chaque étape MUST afficher l'attendu, l'obtenu, la conformité et l'identifiant d'audit. | D-025 | Haute | UNDER_REVIEW |
| FR-1209 | L'exécuteur MUST pouvoir exporter les décisions attendues pour la parité de Nolo (`--exporter-attendus`). | AG-04 | Haute | UNDER_REVIEW |

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
| CA-012-03-01 | FR-1207, FR-1208 | Étant donné `regroupement`, quand on exécute, alors 7 étapes conformes, 25 événements chaînés, code 0. | TEST-012-03-01 |
| CA-012-03-02 | FR-1209 | Étant donné l'option, quand on l'utilise, alors un fichier de décisions attendues. | TEST-012-03-02 |

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
4. `tools/scenarios/executer.py`
