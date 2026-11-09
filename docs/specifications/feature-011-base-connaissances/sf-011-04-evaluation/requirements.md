# SF-011-04 — Évaluation de la recherche — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Base v6 à v9 |
| Bloquant | Aucun |
| Dépend de | SF-011-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
40 questions types (22 de l'équipe, 18 pour le conseiller, dont 7 en anglais) mesurent si le bon document et le bon article sont trouvés.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Ajouter des questions ; mesurer | Déclarer un chiffre non mesuré | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1113 | `kb/eval/run_eval.py` MUST rendre, pour chaque question, OK / DOC / NON et les totaux « document attendu » et « référence exacte » au top 5. | Base v6 | Haute | UNDER_REVIEW |
| FR-1114 | Toute mesure citée dans un document MUST renvoyer à une preuve datée de `docs/quality/`. | Protocole SDD | Haute | UNDER_REVIEW |

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
| CA-011-04-01 | FR-1113 | Étant donné la v9, quand on évalue en BM25, alors 33/40 et 29/40. | TEST-011-04-01 |
| CA-011-04-02 | FR-1114 | Étant donné le README de la base, quand on cherche la preuve des chiffres, alors un fichier daté existe. | TEST-011-04-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-011-base-connaissances/README.md`
3. les quatre fichiers de ce dossier
4. `kb/eval/run_eval.py`
5. `kb/eval/questions_test.jsonl`
