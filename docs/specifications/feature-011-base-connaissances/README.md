# F-011 — Base de connaissances

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Base v1 à v9 ; D-027 |
| Plage FR | FR-1101 à FR-1199 |
| Plage NFR | NFR-1101 à NFR-1199 |

## Objectif
Constituer, corriger, rechercher et évaluer la base des textes officiels (v9 : 2 055 fragments, 22 documents ; version publique sans le texte « tous droits réservés »), et la rendre utilisable par les agents dans le navigateur.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-011-01](sf-011-01-ingestion/requirements.md) | Ingestion et découpage des sources | FR-1101, FR-1102, FR-1103, FR-1104 | UNDER_REVIEW | Implémenté | Aucune | Aucun | P0 |
| [SF-011-02](sf-011-02-corrections/requirements.md) | Corrections sur le texte officiel | FR-1106, FR-1107 | UNDER_REVIEW | Implémenté | SF-011-01 | Aucun | P0 |
| [SF-011-03](sf-011-03-recherche/requirements.md) | Recherche documentaire (BM25 ; ChromaDB en option) | FR-1109, FR-1110, FR-1111 | UNDER_REVIEW | Partiellement implémenté | SF-011-01 | Aucun | P0 |
| [SF-011-04](sf-011-04-evaluation/requirements.md) | Évaluation de la recherche | FR-1113, FR-1114 | UNDER_REVIEW | Implémenté | SF-011-03 | Aucun | P0 |
| [SF-011-05](sf-011-05-correspondance/requirements.md) | Correspondance article → nœud Y.3172 → agent | FR-1116, FR-1117 | UNDER_REVIEW | Implémenté | SF-011-01 | Aucun | P0 |
| [SF-011-06](sf-011-06-traductions/requirements.md) | Traductions, versions anglaises officielles et glossaire | FR-1119, FR-1120, FR-1121 | UNDER_REVIEW | Implémenté | SF-011-01 | Aucun | P0 |
| [SF-011-07](sf-011-07-version-publique/requirements.md) | Version publique de la base (droits) | FR-1123, FR-1124, FR-1125 | UNDER_REVIEW | Implémenté | SF-011-01 | Aucun | P0 |
| [SF-011-08](sf-011-08-base-embarquee/requirements.md) | Base embarquée dans Nolo pour les agents | FR-1127, FR-1128, FR-1129, NFR-1101 | UNDER_REVIEW | Non implémenté | SF-011-07 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

