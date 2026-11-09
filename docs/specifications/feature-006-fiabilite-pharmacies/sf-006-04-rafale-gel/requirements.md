# SF-006-04 — Détection de rafale et gel — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-04 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | Spécification v1.3 ; D-001 à D-003 |
| Bloquant | Aucun |
| Dépend de | SF-006-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une rafale de signalements négatifs gèle le score et saisit un modérateur humain.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Modérateur, pharmacie ou citoyen | Selon la règle | Voir une identité | Compte vérifié pour la pharmacie |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-606 | rafale (≥ 8 négatifs en 3 h) → gel et saisine du modérateur humain. | Référence v1.3 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-006-04-01 | Paramètres | `kb/rules/fiabilite_pharmacies.yaml` ; D-001, D-002, D-003 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-006-04-01 | FR-606 | Étant donné 8 négatifs en 2 h, quand le 8e arrive, alors le score est gelé et une saisine est créée. | TEST-006-04-01, TEST-006-04-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-006-fiabilite-pharmacies/README.md`
3. les quatre fichiers de ce dossier
4. `kb/services/orientation_services.py`
5. `kb/rules/fiabilite_pharmacies.yaml`
