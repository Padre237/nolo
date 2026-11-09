# SF-011-06 — Traductions, versions anglaises officielles et glossaire — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-027 ; base v7 à v9 |
| Bloquant | Aucun |
| Dépend de | SF-011-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Les fragments cités par la démonstration ont une version anglaise : officielle quand elle est versée (loi 2019/019), sinon une traduction non officielle marquée comme telle ; un glossaire anglais → français aide la recherche.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Ajouter une traduction relue | Présenter une traduction comme officielle | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1119 | `kb/traductions/citations_en.yaml` MUST lier chaque traduction à l'empreinte du fragment source et à son statut (`non_officielle`, `anglais_officiel_dans_la_base`, …). | D-027 | Haute | UNDER_REVIEW |
| FR-1120 | `kb/traductions/verifier_traductions.py` MUST échouer (code 1) si une empreinte diffère, si un passage est recopié mot pour mot ou si un terme du glossaire est absent de la base. | D-027 | Haute | UNDER_REVIEW |
| FR-1121 | Une traduction MUST être remplacée par la version anglaise officielle dès qu'elle est versée (lacune L14). | D-027 ; lacune L14 | Haute | UNDER_REVIEW |

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
| CA-011-06-01 | FR-1119, FR-1120 | Étant donné la v9, quand on vérifie, alors « conforme » (34 entrées, 38 du glossaire). | TEST-011-06-01 |
| CA-011-06-02 | FR-1121 | Étant donné la loi 2019/019, quand on lit ses entrées, alors `anglais_officiel_dans_la_base` pour 8 fragments. | TEST-011-06-02 |

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
4. `kb/traductions/`
