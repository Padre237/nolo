# SF-007-19 — Cellule de coordination multi-agents (console du ministère) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-19 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | AG-07 ; FR-711 ; exigences du hackathon (coordination multi-agents) |
| Bloquant | Aucun |
| Dépend de | SF-007-15, SF-007-17, SF-002-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Sur un signal, la console joue la coordination : Surveillance propose, Conformité vérifie, District demande la liste nominative, Conformité refuse et propose l'agrégat, APDP donne un avis indépendant, le point focal décide. Chaque agent a son mandat, ses informations et sa position, journalisée.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agents Surveillance, Conformité, District (simulé), APDP (simulé) | Produire une position selon leur mandat | Trancher un désaccord en faveur du partage | — |
| Point focal (humain) | Décider | — | Session ministère |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1921 | Pour un signal, la cellule MUST dérouler dans l'ordre : proposition de Surveillance, contrôle de Conformité (agrégats, seuil), demande du District, décision de Conformité sur cette demande, avis de l'APDP, décision du point focal. | AG-07 | Haute | UNDER_REVIEW |
| FR-1922 | Chaque agent MUST ne recevoir que les informations de son mandat (le District ne reçoit que des agrégats ; l'APDP reçoit la demande et la décision, pas les données) et produire une position distincte, journalisée. | AG-07 ; FR-711 | Haute | UNDER_REVIEW |
| FR-1923 | La demande de liste nominative du District MUST être `BLOQUE` en citant `CMR-LOI-2024-017::0011` et `INT-OMS-RSI-2005-AMENDE-2022::0054`, avec repli `agregat`. | FR-206 | Haute | UNDER_REVIEW |
| FR-1924 | Un désaccord entre agents MUST être affiché et journalisé ; il n'est jamais résolu automatiquement en faveur du partage ; seule la décision du point focal clôt l'échange. | FR-711 ; Principe VI | Haute | UNDER_REVIEW |
| FR-1925 | L'échange MUST être présenté comme un fil daté (agent, mandat, position, articles cités) et non comme une conversation libre. | AG-07 | Moyenne | UNDER_REVIEW |

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
| CA-007-19-01 | FR-1921, FR-1925 | Étant donné le signal S-AS-07-diarrhee, quand on ouvre la cellule, alors six positions dans l'ordre, datées, avec agent et mandat. | TEST-007-19-01 |
| CA-007-19-02 | FR-1922 | Étant donné la position du District, quand on lit ses entrées, alors seulement des agrégats. | TEST-007-19-02 |
| CA-007-19-03 | FR-1923 | Étant donné la demande nominative, quand Conformité décide, alors BLOQUE avec les deux articles et repli agrégat. | TEST-007-19-03 |
| CA-007-19-04 | FR-1924 | Étant donné un avis APDP défavorable et une demande du District, quand on lit l'échange, alors le désaccord est marqué et l'échange reste ouvert jusqu'à la décision humaine. | TEST-007-19-04 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-007-gouvernance/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/agents/cellule.js`
5. `app/js/agents/conformite.js`
6. `app/js/screens/ministere/console.js`
