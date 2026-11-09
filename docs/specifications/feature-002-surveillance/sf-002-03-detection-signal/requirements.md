# SF-002-03 — Détection des regroupements (CUSUM) et définitions de cas — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-03 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-203) ; ADR-014 ; guide SBC 2023 |
| Bloquant | Aucun |
| Dépend de | SF-002-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Un CUSUM unilatéral sur chaque série (aire ou région × syndrome) repère les hausses anormales ; chaque signal est rattaché à une définition communautaire officielle (SC1 à SC8) ou marqué « hors définition ».

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent Surveillance | Proposer un signal | Publier un signal | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-203 | chaque signal MUST être associé à une définition communautaire officielle (SC1 à SC8, `rules/sbc_definitions.yaml`) ou marqué `hors_definition`. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-230 | `cusum(serie, { k: 0.5, h: 5, seuil: 5 })` MUST cumuler `max(0, S + (x − μ)/σ − k)` avec σ ≥ √μ et lever une alerte quand S > h, uniquement sur une semaine publiable. | ADR-014 | Haute | UNDER_REVIEW |
| FR-231 | `signaux()` MUST rendre exactement les deux regroupements injectés des données fictives (`S-AS-07-diarrhee`, `S-nord-eruption`) et aucun autre. | D-035 | Haute | UNDER_REVIEW |
| FR-232 | Un signal MUST porter : id, zone, syndrome, semaine d'alerte, statut (`a_trier`, `confirme`, `rejete`), série et définition SC. | FR-203 | Haute | UNDER_REVIEW |

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
| CA-002-03-01 | FR-230, FR-231 | Étant donné les données fictives, quand on calcule `signaux()`, alors exactement S-AS-07-diarrhee et S-nord-eruption. | TEST-002-03-01 |
| CA-002-03-02 | FR-203 | Étant donné le signal de diarrhée, quand on l'ouvre, alors la définition SC associée (ou « hors définition ») est affichée. | TEST-002-03-02 |
| CA-002-03-03 | FR-232 | Étant donné un signal, quand on lit son objet, alors les sept champs sont présents. | TEST-002-03-03 |

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
4. `app/js/domain/surveillance.js`
5. `kb/rules/sbc_definitions.yaml`
6. `src/server/domain/surveillance.py`
