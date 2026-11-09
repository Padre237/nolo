# SF-014-02 — Zones : arrondissements, départements, régions — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-032 (FR-TEND-03, 04 ; CA-TEND-03, 04) |
| Bloquant | Aucun |
| Dépend de | SF-012-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La localisation des compteurs utilise les polygones ADM3 (ODbL) ; la hiérarchie vient du code INS ; une position hors polygone est rattachée au plus proche à moins de 15 km, sinon au niveau national.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Serveur | Rattacher une position à un arrondissement | Garder la position | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2005 | La localisation MUST utiliser les polygones ADM3 ; la hiérarchie vient du code INS ; hors polygone, rattachement au plus proche à moins de 15 km, sinon niveau national. | FR-TEND-03 | Haute | UNDER_REVIEW |
| FR-2006 | Un polygone sans code INS validé MUST n'être visible qu'au niveau national. | FR-TEND-04 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-014-02-01 | Données géographiques sous licence ODbL | `donnees/zones/LICENCE-ODbL.md` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-014-02-01 | FR-2005 | Étant donné (9,7679 ; 4,0511), quand on rattache, alors Douala V (050405), Wouri, Littoral ; un point à 20 km hors polygone : national. | TEST-014-02-01; CA-TEND-03, CA-TEND-04 |
| CA-014-02-02 | FR-2006 | Étant donné un polygone sans code INS, quand on liste les zones visibles, alors absent sauf au niveau national. | TEST-014-02-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-014-tendances-demande/README.md`
3. les quatre fichiers de ce dossier
4. `src/server/etablissements/zones.py`
5. `donnees/zones/`
6. `app/js/domain/trends.js`
