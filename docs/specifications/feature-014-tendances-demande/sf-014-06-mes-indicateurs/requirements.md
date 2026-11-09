# SF-014-06 — « Mes indicateurs » — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-032 (FR-TEND-11) |
| Bloquant | Aucun |
| Dépend de | SF-010-09 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La vue « Mes indicateurs » affiche les indicateurs propres à l'établissement disponibles à ce jour (complétude de la fiche, fraîcheur du stock, part de lignes rejetées, visibilité).

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement | Lire ses indicateurs | — | Session pro |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2021 | La vue MUST afficher : complétude de la fiche (%), fraîcheur du stock (âge de la dernière confirmation), part de lignes rejetées au dernier import, visibilité (visible / invisible et pourquoi). | FR-TEND-11 | Moyenne | UNDER_REVIEW |

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
| CA-014-06-01 | FR-2021 | Étant donné l'officine de démonstration après import de l'exemple, quand on ouvre « Mes indicateurs », alors 40 % de lignes rejetées et « Visible ». | TEST-014-06-01 |

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
4. `app/js/screens/pro/tableau.js`
