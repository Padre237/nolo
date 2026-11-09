# SF-016-04 — Évaluation du conseiller — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-04 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | AG-06 ; README de la base (évaluation) |
| Bloquant | Aucun |
| Dépend de | SF-016-01 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Le conseiller est mesuré sur les questions Q23 à Q40 (formulées comme un citoyen, dont 7 en anglais) ; la mesure est publiée et datée.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Mesurer | Annoncer un chiffre non mesuré | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2215 | Une commande MUST mesurer, sur Q23 à Q40, la part de questions dont le document attendu est dans le top 5 et dont la référence exacte est dans le top 5, et l'écrire dans `docs/quality/` avec la date. | AG-06 | Haute | UNDER_REVIEW |
| FR-2216 | Cibles [PROPOSITION, à valider] : document attendu ≥ 11/18 (niveau actuel) et, pour Q31 à Q34 et Q38 (anglais sur des lois sans version anglaise), ≥ 3/5 grâce au glossaire (actuellement 0/5). | AG-06 | Moyenne | UNDER_REVIEW |

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
| CA-016-04-01 | FR-2215 | Étant donné la commande, quand on la lance, alors un rapport daté avec les deux mesures. | TEST-016-04-01 |
| CA-016-04-02 | FR-2216 | Étant donné le rapport, quand on le lit, alors document ≥ 11/18 et anglais ≥ 3/5. | TEST-016-04-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| Q-016-04-01 | Les cibles de FR-2216 sont-elles acceptées ? | Oui ; à relever après l'ajout des versions anglaises officielles | Ouverte |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-016-conseiller-droits/README.md`
3. les quatre fichiers de ce dossier
4. `app/tests/conseiller_eval.test.mjs`
5. `tools/evaluer_conseiller.mjs`
