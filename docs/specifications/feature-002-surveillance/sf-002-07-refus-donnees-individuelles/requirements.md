# SF-002-07 — Refus de transmettre des données individuelles — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-206) ; FR-711 |
| Bloquant | Aucun |
| Dépend de | SF-007-03, SF-007-15 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Même sur demande du district, ni position individuelle ni donnée identifiante ne sort : la Conformité bloque et fournit l'agrégat ; le contact individuel passe par l'agent de santé communautaire.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| District (demandeur) | Demander | Obtenir une liste nominative ou des positions | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-206 | aucune position individuelle ni donnée identifiante n'est transmise au district, même sur demande. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-251 | Le bouton « Demander la localisation des cas » de la console MUST afficher le refus, sa raison (articles cités) et le repli « agrégat ; contact via l'ASCP ». | D-035 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-002-07-01 | Consentement et confidentialité des données sanitaires | `CMR-LOI-2024-017::0011` ; `INT-OMS-RSI-2005-AMENDE-2022::0054` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-002-07-01 | FR-206 | Étant donné le scénario S3 à J2 15:00, quand le district demande la liste nominative, alors BLOQUE `DONNEES_INDIVIDUELLES_INTERDITES`, repli agrégat. | TEST-002-07-01 |
| CA-002-07-02 | FR-251 | Étant donné la console, quand on demande la localisation, alors le refus, ses articles et le repli s'affichent. | TEST-002-07-02 |

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
4. `src/server/agents/conformite.py`
5. `app/js/screens/ministere/console.js`
