# SF-005-03 — La recherche de sang ne court-circuite jamais l'alerte d'urgence — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-005 Recherche de sang |
| Sous-fonctionnalité | SF-005-03 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-505) |
| Bloquant | Aucun |
| Dépend de | SF-005-01, SF-001-12 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Chercher du sang ne remplace pas l'appel aux secours : la barre de sécurité reste visible sur l'onglet Sang.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Appeler les secours depuis l'onglet Sang | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-505 | la recherche de sang ne court-circuite jamais le triage. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-522 | L'onglet Sang MUST afficher la barre de sécurité et, en tête, la phrase « en cas d'urgence, appelez d'abord le 119 ». | FR-505 | Haute | UNDER_REVIEW |

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
| CA-005-03-01 | FR-505, FR-522 | Étant donné l'onglet Sang, quand il s'affiche, alors la barre et la phrase sont visibles. | TEST-005-03-01 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-005-recherche-sang/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/patient/chercher.js`
