# SF-013-07 — Mouvement et micro-interactions — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-034 |
| Bloquant | Aucun |
| Dépend de | SF-013-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le mouvement sert la compréhension (changement d'écran, apparition d'une annonce, motif de l'accueil) ; il respecte la préférence de mouvement réduit et n'interrompt jamais une action.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Toute personne | — | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1332 | Les changements de route MUST utiliser les View Transitions quand elles existent, sauf premier rendu et mouvement réduit ; leurs promesses rejetées sont interceptées (aucune erreur en console). | D-034 ; correction du 2026-11-09 | Haute | UNDER_REVIEW |
| FR-1333 | Avec `prefers-reduced-motion: reduce`, toute animation MUST être supprimée ou réduite à un fondu. | D-034 | Haute | UNDER_REVIEW |
| FR-1334 | Les annonces MUST apparaître avec `@starting-style` et la courbe `--courbe`, en moins de 300 ms. | D-034 | Moyenne | UNDER_REVIEW |

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
| CA-013-07-01 | FR-1332 | Étant donné 39 états parcourus, quand on lit la console, alors aucune erreur « Transition was skipped ». | TEST-013-07-01 |
| CA-013-07-02 | FR-1333 | Étant donné le mouvement réduit, quand on change d'écran, alors aucune transition. | TEST-013-07-02 |
| CA-013-07-03 | FR-1334 | Étant donné une annonce, quand elle apparaît, alors durée ≤ 300 ms. | TEST-013-07-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-013-application/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/app.js`
5. `app/css/base.css`
6. `app/css/components.css`
