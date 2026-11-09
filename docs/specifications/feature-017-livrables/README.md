# F-017 — Livrables de soumission

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Règles du hackathon |
| Plage FR | FR-2301 à FR-2399 |
| Plage NFR | NFR-2301 à NFR-2399 |

## Objectif
Produire et contrôler les livrables du hackathon : rapport de 5 pages en anglais, dépôt GitHub public, base de connaissances, vidéo de démonstration, preuves d'exécution.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-017-01](sf-017-01-rapport/requirements.md) | Rapport technique (5 pages, anglais) | FR-2301, FR-2302, FR-2303, FR-2304 | IN_PROGRESS | Partiellement implémenté | F-001 à F-016 | Aucun | P0 |
| [SF-017-02](sf-017-02-depot/requirements.md) | Dépôt GitHub public | FR-2306, FR-2307, FR-2308, FR-2309 | IN_TESTING | Implémenté | MT-002 | Aucun | P0 |
| [SF-017-03](sf-017-03-video/requirements.md) | Vidéo de démonstration (≤ 7 min) | FR-2312, FR-2313, FR-2314, FR-2315 | UNDER_REVIEW | Non implémenté | F-001, F-007, F-010, F-015 | Aucun | P1 |
| [SF-017-04](sf-017-04-base-publiee/requirements.md) | Base de connaissances livrée | FR-2317, FR-2318 | UNDER_REVIEW | Implémenté | SF-011-07 | Aucun | P0 |
| [SF-017-05](sf-017-05-preuves-matrice/requirements.md) | Preuves d'exécution et matrice de traçabilité | FR-2320, FR-2321, FR-2322 | UNDER_REVIEW | Implémenté | Toutes | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

