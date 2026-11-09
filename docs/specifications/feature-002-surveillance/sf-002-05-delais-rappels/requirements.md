# SF-002-05 — Délais SBC et rappels — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-05 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; heure d'alerte fictive |
| Origine | Spécification v1.3 (FR-205) ; guide SBC 2023 (SOP 02 à 05) |
| Bloquant | Aucun |
| Dépend de | SF-002-04 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Les délais officiels (notification 24 h, triage 24 h, évaluation du risque 48 h) sont suivis et rappelés au bon acteur.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Chef d'aire, point focal | Recevoir les rappels | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-205 | les délais SBC (notification 24 h, triage 24 h, évaluation 48 h) MUST être suivis et rappelés. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-243 | La console MUST afficher, pour chaque signal, le temps écoulé depuis l'alerte et l'échéance du prochain délai. | FR-205 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-002-05-01 | Délais du circuit SBC | `CMR-MINSANTE-GUIDE-SBC-2023::0018` ; `CMR-MINSANTE-GUIDE-SBC-2023::0019` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-002-05-01 | FR-205 | Étant donné le scénario S3 à J1 18:00, quand on l'exécute, alors le rappel « triage dans les 24 heures » est émis. | TEST-002-05-01 |
| CA-002-05-02 | FR-243 | Étant donné un signal à trier depuis 20 h, quand on l'ouvre, alors « échéance du triage dans 4 h ». | TEST-002-05-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-002-surveillance/README.md`
3. les quatre fichiers de ce dossier
4. `tools/scenarios/executer.py`
5. `src/server/domain/surveillance.py`
6. `app/js/screens/ministere/console.js`
