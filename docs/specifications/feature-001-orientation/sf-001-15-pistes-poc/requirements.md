# SF-001-15 — Pistes expérimentales (POC) : au plus trois, avec leur score et leur origine — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-15 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; table de démonstration en attendant DDXPlus (SF-001-19) |
| Origine | D-033 (spécification POC v0.3, FR-DX-01, 04, 07, 09, 10, 13, 14) |
| Bloquant | Avis du juriste (L5, V9) avant tout usage hors démo |
| Dépend de | SF-001-14, SF-001-16, SF-001-17, SF-007-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
En mode démonstration, après les questions de sécurité, Nolo affiche au plus trois pistes respiratoires avec le score du modèle, « x des y signes typiques présents » et les signes retrouvés, étiquetées comme estimations à confirmer par un soignant. Rien n'est envoyé ni conservé.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Lire ses pistes, aller vers la structure adaptée, produire la fiche | Voir le mot « probabilité » ; voir une piste malgré un danger | Mode `demo_synthetique` et `diagnostic_poc.actif` |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1521 | Le module MUST n'être actif qu'en mode `demo_synthetique` avec `diagnostic_poc.actif: true` ; sinon, l'écran des pistes n'existe pas et le parcours va de « Vérifier » à « Où aller » sans piste. | FR-DX-01 | Haute | UNDER_REVIEW |
| FR-1522 | `analyser` MUST classer les pistes par score normalisé décroissant et en garder au plus 3, chacune avec au moins un signe typique retrouvé. | FR-DX-04 | Haute | UNDER_REVIEW |
| FR-1523 | Chaque piste MUST afficher : nom FR/EN, score du modèle avec l'étiquette « estimation d'un modèle entraîné sur des patients simulés, à confirmer par un soignant », « x des y signes typiques présents », signes retrouvés, source et version du jeu de données. | FR-DX-04 ; Q4 | Haute | UNDER_REVIEW |
| FR-1524 | Le mot « probabilité » / « probability » MUST n'apparaître dans aucun catalogue. | FR-DX-04 | Haute | UNDER_REVIEW |
| FR-1525 | Aucune piste, aucun score et aucun besoin dérivé MUST n'être transmis ni conservé (ni stockage local, ni journal, ni surveillance). | FR-DX-07 ; Q3 | Haute | UNDER_REVIEW |
| FR-1526 | Le journal MUST n'enregistrer que la version du module, l'empreinte du modèle, le verdict de Conformité et le nombre de pistes affichées. | FR-DX-10 | Haute | UNDER_REVIEW |
| FR-1527 | L'agent Conformité MUST autoriser les actions `diagnostic.afficher_hypotheses` et `orientation.recommander_structure` avant l'affichage ; sans décision, rien ne s'affiche. | FR-DX-14 | Haute | UNDER_REVIEW |
| FR-1528 | La table de démonstration (`PATHOLOGIES`, 11 entrées respiratoires) MUST être signalée partout comme « table de démonstration » tant que le modèle DDXPlus (SF-001-19) n'est pas branché. | Écart constaté le 2026-11-09 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-1513 (SF-001-14) : pistes masquées en cas de danger
- FR-1536 (SF-001-16) : message neutre pour l'art. 48
- FR-1541 (SF-001-17) : hors champ

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-15-01 | Seuils : `maxPistes: 3`, `seuilScore: 0.22`, `seuilCouverture: 0.28` (à recalibrer par l'évaluation FR-DX-12) | `POLITIQUE` de `app/js/domain/engine.js` ; D-033 |
| BR-001-15-02 | Module expérimental ; principe I affaibli seulement en mode démonstration (constitution 2.0.0 à approuver) | D-033 ; lacunes L5, L15, L16 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-15-01 | FR-1521 | Étant donné le mode `complet`, quand on finit « Vérifier », alors aucun écran de pistes n'existe. | TEST-001-15-01 |
| CA-001-15-02 | FR-1522 | Étant donné une toux fébrile, quand on analyse, alors au plus 3 pistes, triées par score décroissant. | TEST-001-15-02 |
| CA-001-15-03 | FR-1523 | Étant donné une piste, quand elle s'affiche, alors nom, score étiqueté, « x des y », signes retrouvés et source sont présents. | TEST-001-15-03 |
| CA-001-15-04 | FR-1524 | Étant donné les catalogues FR et EN, quand on y cherche « probabilit », alors zéro occurrence. | TEST-001-15-04 |
| CA-001-15-05 | FR-1525 | Étant donné un parcours avec pistes, quand on lit le stockage local et le réseau, alors aucun code de piste ni score. | TEST-001-15-05 |
| CA-001-15-06 | FR-1526, FR-1527 | Étant donné l'affichage de pistes, quand on lit le journal, alors une décision de Conformité précède l'affichage et l'entrée ne contient que version, empreinte, verdict et nombre. | TEST-001-15-06 |
| CA-001-15-07 | FR-1528 | Étant donné l'écran des pistes, quand il s'affiche avec la table de démonstration, alors la mention « table de démonstration » est visible. | TEST-001-15-07 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-001-orientation/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/engine.js`
5. `app/js/screens/patient/pistes.js`
6. `app/js/i18n/*.js`
7. `app/js/agents/orchestrateur.js`
