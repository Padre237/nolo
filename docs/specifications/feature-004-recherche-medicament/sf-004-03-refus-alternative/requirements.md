# SF-004-03 — Aucune alternative, posologie ni promotion — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-404) ; loi 90/035 |
| Bloquant | Aucun |
| Dépend de | SF-004-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Nolo n'indique jamais un autre médicament, une dose ni une mise en avant de produit : la délivrance et le conseil restent au pharmacien.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Chercher une DCI | Recevoir une alternative ou une dose | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-404 | MUST NOT suggérer d'alternative, indiquer une posologie ni promouvoir un produit. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-425 | Quand aucune structure ne déclare la DCI, l'écran MUST dire « aucune pharmacie ne le déclare disponible » et proposer d'élargir ou de demander au pharmacien, sans proposer d'autre DCI. | FR-404 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-004-03-01 | Préparation et vente des médicaments réservées aux pharmaciens | `CMR-LOI-90-035::0012` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-004-03-01 | FR-404, FR-425 | Étant donné une DCI sans résultat, quand l'écran s'affiche, alors aucune autre DCI ni dose n'est mentionnée. | TEST-004-03-01 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-004-recherche-medicament/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/patient/chercher.js`
5. `kb/services/orientation_services.py`
