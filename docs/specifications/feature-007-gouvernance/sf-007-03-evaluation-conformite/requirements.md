# SF-007-03 — Évaluation de conformité (quatre verdicts cités) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-702, FR-703) ; D-008 |
| Bloquant | Aucun |
| Dépend de | SF-007-01, SF-011-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
L'agent Conformité décide chaque demande selon un ordre fixe — art. 48, mode, consentement, profilage, destination, règles de l'action — et cite toujours au moins un fragment de la base, sauf « bloqué, sans fondement ».

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent Conformité | Décider | Être contourné par un LLM | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-702 | la décision de Conformité est l'une de : `AUTORISE`, `AUTORISE_AVEC_CONDITIONS`, `BLOQUE`, `BLOQUE_SANS_FONDEMENT` ; elle cite au moins un `chunk_id` sauf pour le dernier cas. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-703 | l'agent Conformité lit l'état du droit dans `policy.yaml` et non dans ses consignes ; un LLM ne peut pas transformer un `BLOQUE` de règle en `AUTORISE`. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-730 | L'ordre d'évaluation MUST être : (1) catégories de l'art. 48, (2) mode, (3) consentement exprès de la finalité et accord parental, (4) profilage, (5) destination, (6) règles propres à l'action ; la première règle qui bloque l'emporte. | Contrats de gouvernance §2 | Haute | UNDER_REVIEW |
| FR-731 | Une action absente du catalogue (`TABLE`, 24 actions) MUST rendre `BLOQUE_SANS_FONDEMENT` (`ACTION_HORS_CATALOGUE`). | Principe III | Haute | UNDER_REVIEW |
| FR-732 | Le catalogue MUST gagner `diagnostic.afficher_hypotheses` et `orientation.recommander_structure` (26 actions), avec leurs verdicts par mode et leurs fragments (L5, V9, art. 48). | FR-DX-14 (D-033) | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-007-03-01 | Consentement nécessaire mais pas suffisant face à l'art. 48 | D-008 ; `CMR-LOI-2024-017::0048` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-007-03-01 | FR-702 | Étant donné toutes les actions dans les trois modes, quand on décide, alors chaque verdict cite ≥ 1 fragment existant ou vaut `BLOQUE_SANS_FONDEMENT`. | TEST-007-03-01 |
| CA-007-03-02 | FR-730 | Étant donné une demande touchant `vie_sexuelle` avec tous les consentements, quand on décide, alors `BLOQUE` `CATEGORIE_INTERDITE_ART48` avant tout autre contrôle. | TEST-007-03-02 |
| CA-007-03-03 | FR-731 | Étant donné l'action `inventee.x`, quand on décide, alors `BLOQUE_SANS_FONDEMENT`. | TEST-007-03-03 |
| CA-007-03-04 | FR-703 | Étant donné une politique et une consigne contradictoire, quand on décide, alors la politique l'emporte. | TEST-007-03-04 |
| CA-007-03-05 | FR-732 | Étant donné les deux nouvelles actions en `demo_synthetique`, quand on décide, alors `AUTORISE_AVEC_CONDITIONS` cité ; en `complet`, `BLOQUE`. | TEST-007-03-05 |

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
5. `config/policy.yaml`
