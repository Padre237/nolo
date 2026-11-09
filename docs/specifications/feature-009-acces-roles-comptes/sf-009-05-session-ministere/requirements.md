# SF-009-05 — Session de démonstration du ministère — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-035 |
| Bloquant | Aucun |
| Dépend de | SF-009-01, SF-015-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La console du ministère s'ouvre par une session de démonstration sur l'appareil, clairement marquée ; elle ne prétend être aucune autorité réelle.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent du ministère (démo) | Ouvrir et quitter la console | Se présenter comme une autorité réelle | Session de démonstration |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-919 | La console MUST s'ouvrir par « Ouvrir la console de démonstration » qui crée la clé locale `ministere-session`, et se fermer par « Quitter ». | D-035 | Haute | UNDER_REVIEW |
| FR-920 | La console MUST porter la marque Nolo et la mention « démonstration, données fictives », sans logo ni nom officiel du ministère. | D-035 ; règle de non-usurpation | Haute | UNDER_REVIEW |
| FR-921 | Les rôles affichés à l'entrée (point focal, vérificateur, analyste) MUST être décrits comme des rôles de démonstration. | D-035 | Moyenne | UNDER_REVIEW |

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
| CA-009-05-01 | FR-919 | Étant donné l'entrée, quand on ouvre puis quitte, alors la clé est créée puis supprimée. | TEST-009-05-01 |
| CA-009-05-02 | FR-920, FR-921 | Étant donné la console, quand on l'inspecte, alors aucun logo officiel et la mention de démonstration. | TEST-009-05-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-009-acces-roles-comptes/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/ministere/console.js`
