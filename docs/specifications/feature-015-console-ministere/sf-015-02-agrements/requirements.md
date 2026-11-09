# SF-015-02 — Vérification des agréments — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-035 ; D-029a |
| Bloquant | Aucun |
| Dépend de | SF-010-07 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le vérificateur voit la file des dossiers : comptes d'établissement en attente sur l'appareil et trois dossiers fictifs ; il agrée, refuse avec motif ou suspend ; l'établissement en est informé.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Vérificateur (démo) | Agréer, refuser avec motif, suspendre | Décider sans motif de refus | Session ministère |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2106 | La file MUST réunir les comptes locaux `EN_ATTENTE_VERIFICATION` et les dossiers fictifs D-1 à D-3, avec type, NIU, commune et date. | D-035 | Haute | UNDER_REVIEW |
| FR-2107 | « Agréer » MUST passer l'établissement en `VERIFIE` (visible) ; « Refuser » exige un motif et passe en `REFUSE` ; « Suspendre » rend invisible un établissement vérifié. | D-029a ; D-035 | Haute | UNDER_REVIEW |
| FR-2108 | Chaque décision MUST être enregistrée dans l'historique du compte (journal de l'appareil) et visible par l'établissement. | Principe VIII | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-015-02-01 | Aucun registre public des agréments : vérification simulée | Lacune L9 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-015-02-01 | FR-2106 | Étant donné un compte en attente sur l'appareil, quand on ouvre Agréments, alors il figure avec les trois dossiers fictifs. | TEST-015-02-01 |
| CA-015-02-02 | FR-2107 | Étant donné ce compte agréé, quand on cherche ses médicaments côté citoyen, alors il apparaît ; refusé sans motif, refus de l'action. | TEST-015-02-02 |
| CA-015-02-03 | FR-2108 | Étant donné un refus motivé, quand l'établissement ouvre son accueil, alors le motif et la date. | TEST-015-02-03 |

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
4. `app/js/screens/ministere/console.js`
