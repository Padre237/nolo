# SF-002-09 — Export agrégé compatible DHIS2 — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-207) ; art. 19 |
| Bloquant | Aucun |
| Dépend de | SF-002-04, SF-007-08 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Un signal confirmé peut être exporté en agrégats au format DHIS2 (maquette tant que l'interconnexion n'est pas autorisée) ; aucun fichier de données personnelles n'est interconnecté.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Point focal | Exporter un agrégat | Exporter des données individuelles | Signal confirmé |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-207 | export agrégé au format compatible DHIS2 (cible ; maquette dans le prototype). Aucun fichier de données personnelles n'est interconnecté sans l'autorisation de l'art. 19 al. 2. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-258 | L'export MUST être un JSON `dataValueSet` (dataElement, period, orgUnit, value) arrondi au seuil, marqué `maquette`, copiable. | FR-207 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-002-09-01 | Interconnexion des fichiers sensibles soumise à autorisation distincte | `CMR-LOI-2024-017::0020` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-002-09-01 | FR-207, FR-258 | Étant donné un signal confirmé, quand on exporte, alors un JSON agrégé marqué `maquette`, sans aucune donnée individuelle. | TEST-002-09-01 |

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
4. `app/js/screens/ministere/console.js`
5. `src/server/agents/conformite.py`
