# SF-001-10 — « Où aller » : structure adaptée aux besoins — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Catalogue v1 ; D-033 (FR-DX-17 à FR-DX-21) |
| Bloquant | Aucun |
| Dépend de | SF-001-15, SF-010-01, SF-003-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
À partir des besoins déduits des pistes (niveau de soins, spécialité, services), choisir sur le téléphone la structure ouverte la plus proche qui les couvre, dire pourquoi, et proposer un repli quand rien ne couvre tout. La personne peut toujours choisir une autre structure.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Voir la structure recommandée, la raison, d'autres structures, l'itinéraire | Voir une structure non vérifiée | Mode démonstration (POC) |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-185 | Le niveau recommandé MUST être le plus élevé des niveaux des pistes affichées ; la spécialité est celle de la 1re piste ; si la personne a moins de 15 ans, `pediatrie` est ajoutée. | FR-DX-17 (D-033) | Haute | UNDER_REVIEW |
| FR-186 | La structure MUST être choisie sur l'appareil, parmi les établissements visibles (vérifiés, SF-010-07) qui couvrent les besoins, triés par ouverture puis distance, rayon 5 km élargi à 10, 20 puis 50 km. | FR-DX-18, FR-DX-19 (D-033) | Haute | UNDER_REVIEW |
| FR-187 | Si aucune structure ne couvre tous les besoins, le système MUST proposer la plus proche du niveau requis et nommer ce qui manque. | FR-DX-19 | Haute | UNDER_REVIEW |
| FR-188 | La recommandation MUST afficher sa raison (niveau, spécialité, piste) et la mention « correspondance à valider par un clinicien » ; un lien « Voir d'autres structures » est toujours présent. | FR-DX-20 | Haute | UNDER_REVIEW |
| FR-189 | Le panneau de direction MUST montrer le nom, l'état d'ouverture, la distance en km, l'adresse et l'itinéraire ; le bouton d'appel d'une structure fictive est désactivé et relié à la mention « numéros fictifs ». | D-034 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-1029 (SF-010-07) : un établissement non vérifié n'est jamais proposé

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-10-01 | Aucun critère commercial dans le tri | Principe VII ; FR-303 |
| BR-001-10-02 | Le serveur ne reçoit ni niveau, ni spécialité, ni service dérivé d'une piste | FR-DX-18 ; `CMR-LOI-2024-017::0048` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-10-01 | FR-185 | Étant donné les pistes pneumonie (hôpital de district) et rhume (centre de santé) pour un enfant de 4 ans, quand on calcule les besoins, alors niveau `hopital_district`, spécialités pneumologie et pédiatrie. | TEST-001-10-01 |
| CA-001-10-02 | FR-186 | Étant donné une structure couvrante ouverte à 3 km et une fermée à 1 km, quand on recommande, alors l'ouverte est proposée. | TEST-001-10-02 |
| CA-001-10-03 | FR-187 | Étant donné aucun hôpital avec radiographie à 50 km, quand on recommande, alors la structure du niveau requis la plus proche est proposée avec « pas de radiographie sur place ». | TEST-001-10-03 |
| CA-001-10-04 | FR-188 | Étant donné une recommandation, quand elle s'affiche, alors la raison, la mention de validation et « Voir d'autres structures » sont présentes. | TEST-001-10-04 |
| CA-001-10-05 | FR-189 | Étant donné la structure recommandée, quand on lit le panneau, alors le bouton d'appel est désactivé et décrit par `#numeros-fictifs`. | TEST-001-10-04 |

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
5. `app/js/domain/facilities.js`
6. `app/js/screens/patient/ou-aller.js`
