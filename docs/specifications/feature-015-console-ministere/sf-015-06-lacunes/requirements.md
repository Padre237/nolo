# SF-015-06 — Registre des lacunes dans la console — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-06 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | D-035 ; registre des lacunes |
| Bloquant | Aucun |
| Dépend de | SF-015-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La console liste les lacunes juridiques et de standards (L1 à L16) avec leur constat et la parade du prototype, en cohérence avec `docs/compliance/registre-lacunes.md`.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Régulateur, jury | Lire les lacunes | — | Session ministère |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2130 | La vue MUST lister chaque lacune avec identifiant, constat et parade, dans les deux langues. | D-035 | Haute | UNDER_REVIEW |
| FR-2131 | Les identifiants et constats MUST correspondre à `docs/compliance/registre-lacunes.md` ; un test compare les deux listes. | Source unique | Haute | UNDER_REVIEW |

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
| CA-015-06-01 | FR-2130 | Étant donné la vue, quand on la lit, alors chaque lacune a ses trois éléments en FR et EN. | TEST-015-06-01 |
| CA-015-06-02 | FR-2131 | Étant donné le registre et les catalogues, quand on compare les identifiants, alors mêmes listes. | TEST-015-06-02 |

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
4. `app/js/i18n/*.js`
5. `app/tests/lacunes.test.mjs`
