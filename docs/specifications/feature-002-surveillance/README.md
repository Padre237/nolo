# F-002 — Surveillance syndromique

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Spécification v1.3 002 ; guide SBC 2023 ; RSI ; D-035 |
| Plage FR | FR-220 à FR-299 ; FR-1601 à FR-1649 |
| Plage NFR | NFR-201 à NFR-299 |

## Objectif
Transformer les signes déclarés avec la case « surveillance » en agrégats (aire × semaine, seuil de 5, décalage de 7 jours), détecter les regroupements, les faire valider par un point focal humain et les présenter au ministère sur une carte, sans jamais transmettre de donnée individuelle.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-002-01](sf-002-01-contribution/requirements.md) | Contribution consentie à la surveillance | FR-201, FR-220, FR-221, FR-222 | UNDER_REVIEW | Partiellement implémenté | SF-008-02, SF-001-02, SF-007-03 | Aucun | P0 |
| [SF-002-02](sf-002-02-agregation/requirements.md) | Agrégation par aire et semaine avec seuil de 5 | FR-202, FR-225, FR-226 | UNDER_REVIEW | Implémenté | SF-002-01 | Aucun | P0 |
| [SF-002-03](sf-002-03-detection-signal/requirements.md) | Détection des regroupements (CUSUM) et définitions de cas | FR-203, FR-230, FR-231, FR-232 | UNDER_REVIEW | Implémenté | SF-002-02 | Aucun | P0 |
| [SF-002-04](sf-002-04-validation-point-focal/requirements.md) | Validation du signal par le point focal | FR-204, FR-237, FR-238, FR-239 | UNDER_REVIEW | Implémenté | SF-002-03, SF-009-01 | Aucun | P0 |
| [SF-002-05](sf-002-05-delais-rappels/requirements.md) | Délais SBC et rappels | FR-205, FR-243 | UNDER_REVIEW | Partiellement implémenté | SF-002-04 | Aucun | P1 |
| [SF-002-06](sf-002-06-decision-rsi/requirements.md) | Instrument de décision du RSI (annexe 2) | FR-246, FR-247, FR-248 | UNDER_REVIEW | Implémenté | SF-002-04 | Aucun | P0 |
| [SF-002-07](sf-002-07-refus-donnees-individuelles/requirements.md) | Refus de transmettre des données individuelles | FR-206, FR-251 | UNDER_REVIEW | Implémenté | SF-007-03, SF-007-15 | Aucun | P0 |
| [SF-002-08](sf-002-08-carte-publique/requirements.md) | Carte épidémiologique publique | FR-208, FR-255 | UNDER_REVIEW | Non implémenté | SF-002-02 | Aucun | P1 |
| [SF-002-09](sf-002-09-export-agrege/requirements.md) | Export agrégé compatible DHIS2 | FR-207, FR-258 | UNDER_REVIEW | Implémenté | SF-002-04, SF-007-08 | Aucun | P0 |
| [SF-002-10](sf-002-10-aire-frontaliere/requirements.md) | Signal en aire frontalière | FR-209 | UNDER_REVIEW | Non implémenté | SF-002-03 | Aucun | P2 |
| [SF-002-11](sf-002-11-signalement-communautaire/requirements.md) | Signalement d'un événement communautaire | FR-1601, FR-1602 | UNDER_REVIEW | Non implémenté | SF-002-04 | Aucun | P2 |
| [SF-002-12](sf-002-12-carte-symptomes-ministere/requirements.md) | Carte interactive des symptômes pour le ministère | FR-1606, FR-1607, FR-1608, FR-1609, FR-1610, FR-1611 | UNDER_REVIEW | Implémenté | SF-002-02, SF-002-03, SF-013-06 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

