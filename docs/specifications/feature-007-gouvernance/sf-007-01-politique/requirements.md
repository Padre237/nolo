# SF-007-01 — Chargement et versionnement de la politique — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Catalogue v1 ; ADR-008 |
| Bloquant | Aucun |
| Dépend de | MT-001 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
L'état du droit est écrit dans `config/policy.yaml` (version, date d'effet, valeurs et sources) ; le code le lit, ne l'écrit jamais, et peut en dériver des variantes « et si » en mémoire.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Modifier la politique par une nouvelle version | Modifier une valeur sans changer la version | Revue |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-720 | `Politique.charger` MUST lire `config/policy.yaml`, calculer son empreinte canonique SHA-256 et exposer `version` et `empreinte`. | ADR-008 | Haute | UNDER_REVIEW |
| FR-721 | `Politique.valeur(chemin)` MUST lever `ClePolitiqueInconnue` pour une clé absente ; aucune valeur juridique n'est codée en dur dans les agents. | ADR-008 | Haute | UNDER_REVIEW |
| FR-722 | `Politique.source(chemin)` MUST rendre les `chunk_id` cités par la clé ou son parent. | ADR-008 | Haute | UNDER_REVIEW |
| FR-723 | `Politique.variante(changements)` MUST produire une politique en mémoire, marquée `variante_de`, sans écrire sur disque. | FR-707 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-007-01-01 | Mode par défaut si incertain : BLOQUER | `config/policy.yaml > mode_par_defaut_si_incertain` ; Principe III |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-007-01-01 | FR-720, FR-721, FR-722, FR-723 | Étant donné la politique 1.3.0, quand on lit une valeur, sa source et une variante, alors valeur, `chunk_id` cités et variante marquée, fichier inchangé. | TEST-007-01-01 |

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
4. `src/server/gouvernance/politique.py`
