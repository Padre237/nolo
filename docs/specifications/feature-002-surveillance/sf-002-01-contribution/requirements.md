# SF-002-01 — Contribution consentie à la surveillance — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-01 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |
| Origine | Spécification v1.3 (FR-201) ; D-028 |
| Bloquant | Aucun |
| Dépend de | SF-008-02, SF-001-02, SF-007-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une personne qui a coché « surveillance » transmet ses signes codés, l'aire de santé, la semaine épidémiologique et une tranche d'âge — ni nom, ni position précise, ni piste, ni catégorie de l'art. 48.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen (case surveillance) | Contribuer | Transmettre un texte, une piste ou une position précise | Case « surveillance » ; mode autorisé |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-201 | seules les sessions avec consentement « surveillance » distinct contribuent ; refuser ce consentement n'affecte pas l'orientation. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-220 | Une contribution MUST contenir exactement : codes `SYM-NNN`, aire de santé, semaine ISO, tranche d'âge ; rien d'autre. | Spécification POC § 8 ; D-028 | Haute | UNDER_REVIEW |
| FR-221 | Le serveur MUST dédupliquer les contributions d'un même appareil pour une même semaine et un même syndrome. | Catalogue v1 (SF-002-01) | Moyenne | UNDER_REVIEW |
| FR-222 | L'agent Conformité MUST autoriser `surveillance.contribuer` avant l'envoi (consentement exprès vérifié). | FR-701 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-811 (SF-008-02) : garde de la case surveillance
- FR-1525 (SF-001-15) : aucune piste n'est versée à la surveillance

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-002-01-01 | Les hypothèses n'alimentent jamais la surveillance | Spécification POC § 8 ; FR-DX-07 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-002-01-01 | FR-201, FR-220 | Étant donné surveillance cochée, quand une contribution est préparée, alors elle contient exactement les quatre champs. | TEST-002-01-01 |
| CA-002-01-02 | FR-221 | Étant donné deux contributions identiques la même semaine, quand le serveur les reçoit, alors un seul compte. | TEST-002-01-02 |
| CA-002-01-03 | FR-222 | Étant donné surveillance non cochée, quand on tente `surveillance.contribuer`, alors BLOQUE `CONSENTEMENT_EXPRES_MANQUANT`. | TEST-002-01-03 |

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
4. `app/js/domain/envoi.js`
5. `src/server/domain/surveillance.py`
6. `src/server/agents/conformite.py`
