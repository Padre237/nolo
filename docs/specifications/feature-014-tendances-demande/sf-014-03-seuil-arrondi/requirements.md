# SF-014-03 — Seuil de 5, arrondi à 5, semaines complètes — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-032 (FR-TEND-05, 06 ; CA-TEND-05, 06) |
| Bloquant | Aucun |
| Dépend de | SF-014-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Rien ne permet de reconnaître une personne : moins de 5 s'affiche « moins de 5 » et sort des classements, le reste est arrondi à 5, et seules les semaines ISO complètes sont montrées.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement vérifié | Lire les tendances | Voir un compte exact ou une semaine en cours | Compte vérifié |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2009 | Toute valeur inférieure à 5 MUST s'afficher « moins de 5 » et sortir des classements ; les autres valeurs sont arrondies à 5 (`afficher`). | FR-TEND-06 | Haute | UNDER_REVIEW |
| FR-2010 | Seules les semaines ISO complètes MUST être affichées (`semaineIso`). | FR-TEND-05 | Haute | UNDER_REVIEW |

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
| CA-014-03-01 | FR-2009 | Étant donné 3 et 23, quand on affiche, alors « moins de 5 » (hors classement) et 25. | TEST-014-03-01; CA-TEND-05 |
| CA-014-03-02 | FR-2010 | Étant donné un lundi, quand on affiche, alors la semaine qui commence n'apparaît pas. | TEST-014-03-02; CA-TEND-06 |

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
4. `app/js/domain/trends.js`
