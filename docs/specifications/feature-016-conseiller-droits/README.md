# F-016 — Conseiller « Mes droits santé »

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | D-026 ; AG-06 |
| Plage FR | FR-2201 à FR-2299 |
| Plage NFR | NFR-2201 à NFR-2299 |

## Objectif
Un agent conseiller juridique que citoyens, établissements et ministère interrogent en langage courant ; il répond seulement à partir des articles de la base, qu'il cite, et refuse quand il ne trouve aucun fondement.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-016-01](sf-016-01-index-navigateur/requirements.md) | Recherche dans la base depuis le navigateur (BM25 et glossaire) | FR-2201, FR-2202, FR-2203, FR-2204, NFR-2201 | UNDER_REVIEW | Non implémenté | SF-011-08 | Aucun | P1 |
| [SF-016-02](sf-016-02-reponse-extractive/requirements.md) | Réponse extractive citée et refus sans fondement | FR-2206, FR-2207, FR-2208, FR-2209 | UNDER_REVIEW | Non implémenté | SF-016-01 | Aucun | P1 |
| [SF-016-03](sf-016-03-interface-conseiller/requirements.md) | Interface du conseiller (citoyen, établissement, ministère) | FR-2211, FR-2212, FR-2213 | UNDER_REVIEW | Non implémenté | SF-016-02, SF-013-04 | Aucun | P1 |
| [SF-016-04](sf-016-04-evaluation-conseiller/requirements.md) | Évaluation du conseiller | FR-2215, FR-2216 | UNDER_REVIEW | Non implémenté | SF-016-01 | Aucun | P1 |
| [SF-016-05](sf-016-05-llm-local/requirements.md) | LLM local optionnel : reformuler les extraits, jamais décider | FR-2218, FR-2219 | UNDER_REVIEW | Non implémenté | SF-016-02 | Ollama sur le poste de l'équipe (indisponible dans l'environnement de Claude) | P2 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

