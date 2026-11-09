# SF-015-03 — Offre et demande nationale — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-035 ; D-032 |
| Bloquant | Aucun |
| Dépend de | SF-014-03, SF-002-12 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une carte et un tableau par région : structures, part vérifiée, fraîcheur des stocks, part de ruptures, part de demande non satisfaite et médicament le plus manquant — données fictives.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Analyste du ministère (démo) | Choisir l'indicateur, lire la carte et le tableau | — | Session ministère |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2113 | `offreDemande()` MUST rendre pour chaque région : structures, vérifiées, fraîcheur, rupture, insatisfaction, médicament le plus manquant. | D-035 | Haute | UNDER_REVIEW |
| FR-2114 | Un segment MUST choisir l'indicateur de la carte ; le tableau montre tous les indicateurs, avec la ligne de la région choisie mise en avant. | D-035 | Moyenne | UNDER_REVIEW |
| FR-2115 | La vue MUST rappeler la limite du biais (seuls les usagers de smartphone recherchent) et la source fictive. | D-032 ; lacune | Moyenne | UNDER_REVIEW |

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
| CA-015-03-01 | FR-2113 | Étant donné le Littoral, quand on calcule, alors le médicament le plus manquant est l'artésunate et l'insatisfaction ≥ 11 %. | TEST-015-03-01 |
| CA-015-03-02 | FR-2114 | Étant donné l'indicateur « ruptures », quand on le choisit, alors la carte se recolore et le tableau reste complet. | TEST-015-03-02 |
| CA-015-03-03 | FR-2115 | Étant donné la vue, quand on la lit, alors la mention de biais et de données fictives. | TEST-015-03-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-015-console-ministere/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/surveillance.js`
5. `app/js/screens/ministere/console.js`
