# SF-006-02 — Calcul et affichage du score — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-02 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Non implémenté |
| Origine | Spécification v1.3 ; D-001 à D-003 |
| Bloquant | Aucun |
| Dépend de | SF-006-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le score lissé de chaque pharmacie est calculé à partir des signalements pondérés et affiché en clair.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Modérateur, pharmacie ou citoyen | Selon la règle | Voir une identité | Compte vérifié pour la pharmacie |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-604 | score = (positifs + 2) / (total + 4), fenêtre 30 jours, décroissance de demi-vie 15 jours. | Référence v1.3 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-006-02-01 | Paramètres | `kb/rules/fiabilite_pharmacies.yaml` ; D-001, D-002, D-003 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-006-02-01 | FR-604 | Étant donné 6 positifs sur 8 dans la fenêtre, quand on calcule, alors (6 + 2) / (8 + 4) ≈ 0,667 avant décroissance. | TEST-006-02-01, TEST-006-02-02 |

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
