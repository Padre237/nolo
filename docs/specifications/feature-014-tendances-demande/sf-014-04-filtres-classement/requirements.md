# SF-014-04 — Filtres, classements et demande non satisfaite — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-032 (FR-TEND-07, 08 ; CA-TEND-07) |
| Bloquant | Aucun |
| Dépend de | SF-014-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
L'établissement filtre par niveau (arrondissement, département, région), zone, type et service, et voit les 10 services les plus recherchés, les 10 plus souvent non satisfaits, l'évolution sur 12 semaines (graphique et tableau équivalent).

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement vérifié | Filtrer, lire classements et évolution | — | Compte vérifié |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2013 | Filtres MUST : niveau, zone, type, service, période ; zone par défaut : l'arrondissement de l'établissement. | FR-TEND-07 | Haute | UNDER_REVIEW |
| FR-2014 | La vue MUST montrer les 10 plus recherchés, les 10 plus souvent non satisfaits (avec %), l'évolution hebdomadaire en colonnes et le tableau équivalent pour les lecteurs d'écran. | FR-TEND-08 | Haute | UNDER_REVIEW |

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
| CA-014-04-01 | FR-2014 | Étant donné 30 recherches non satisfaites d'artésunate sur 40 à Douala V, quand on lit la demande non satisfaite, alors artésunate « 75 % ». | TEST-014-04-01; CA-TEND-07 |
| CA-014-04-02 | FR-2013 | Étant donné l'officine de démonstration, quand on ouvre Tendances, alors la zone par défaut est son arrondissement. | TEST-014-04-02 |
| CA-014-04-03 | FR-2014 | Étant donné le graphique, quand on l'inspecte, alors un tableau équivalent existe et les colonnes ont une valeur fixe lisible. | TEST-014-04-03 |

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
4. `app/js/screens/pro/vue-tendances.js`
5. `app/js/domain/trends.js`
