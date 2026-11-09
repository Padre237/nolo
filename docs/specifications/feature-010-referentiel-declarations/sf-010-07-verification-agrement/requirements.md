# SF-010-07 — Vérification de l'agrément avant toute visibilité — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-029a (FR-ETS-07, 08 ; CA-ETS-05, 06, 12) |
| Bloquant | Aucun |
| Dépend de | SF-010-06, SF-015-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le format du NIU ne prouve rien : un établissement n'est visible des citoyens qu'une fois vérifié. Dans le prototype, un NIU de la liste simulée est vérifié d'office ; sinon le dossier attend le vérificateur, qui accepte ou refuse avec un motif.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Vérificateur (ministère) | Accepter, refuser avec motif, suspendre | Rendre visible un dossier sans décision | Session ministère |
| Établissement | Voir son état et le motif d'un refus | Être visible avant vérification | Compte confirmé |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1029 | Un établissement MUST n'être visible des citoyens que si son compte est actif et sa vérification `VERIFIE` (`visibles`). | FR-ETS-07 | Haute | UNDER_REVIEW |
| FR-1030 | Si le NIU figure dans `AGREMENT_SIMULE`, la vérification MUST être immédiate ; sinon l'état est `EN_ATTENTE_VERIFICATION` et le dossier va dans la file du vérificateur. | FR-ETS-08 ; CA-ETS-05 | Haute | UNDER_REVIEW |
| FR-1031 | Modifier le NIU d'un établissement vérifié MUST le repasser en `EN_ATTENTE_VERIFICATION`. | CA-ETS-12 | Haute | UNDER_REVIEW |
| FR-1032 | Après un refus, le motif MUST s'afficher sur l'accueil de l'établissement ; après acceptation, il apparaît dans les recherches. | CA-ETS-06 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-010-07-01 | Aucun registre public des établissements agréés : liste simulée | Lacune L9 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-010-07-01 | FR-1029 | Étant donné un établissement non vérifié avec du stock, quand on cherche ce médicament, alors il n'apparaît pas. | TEST-010-07-01 |
| CA-010-07-02 | FR-1030 | Étant donné `M041618186649L`, quand on envoie la fiche, alors `VERIFIE` ; avec un autre NIU, `EN_ATTENTE_VERIFICATION`. | TEST-010-07-02; CA-ETS-05 |
| CA-010-07-03 | FR-1031 | Étant donné un établissement vérifié, quand on modifie son NIU, alors `EN_ATTENTE_VERIFICATION`. | TEST-010-07-03; CA-ETS-12 |
| CA-010-07-04 | FR-1032 | Étant donné un refus motivé, quand l'établissement ouvre son accueil, alors le motif s'affiche. | TEST-010-07-04; CA-ETS-06 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-010-referentiel-declarations/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/facilities.js`
5. `app/js/domain/pro.js`
6. `app/js/screens/pro/compte.js`
7. `app/js/screens/pro/tableau.js`
