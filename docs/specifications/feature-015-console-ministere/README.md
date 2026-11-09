# F-015 — Console du ministère

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | D-035 |
| Plage FR | FR-2101 à FR-2199 |
| Plage NFR | NFR-2101 à NFR-2199 |

## Objectif
Donner au ministère une console de démonstration : vérification des agréments, offre et demande nationale, politique versionnée, simulation « et si » et registre des lacunes (la surveillance relève de F-002).

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-015-01](sf-015-01-navigation-console/requirements.md) | Navigation de la console et chiffres d'en-tête | FR-2101, FR-2102 | UNDER_REVIEW | Implémenté | SF-009-05 | Aucun | P0 |
| [SF-015-02](sf-015-02-agrements/requirements.md) | Vérification des agréments | FR-2106, FR-2107, FR-2108 | UNDER_REVIEW | Implémenté | SF-010-07 | Aucun | P0 |
| [SF-015-03](sf-015-03-offre-demande/requirements.md) | Offre et demande nationale | FR-2113, FR-2114, FR-2115 | UNDER_REVIEW | Implémenté | SF-014-03, SF-002-12 | Aucun | P0 |
| [SF-015-04](sf-015-04-politique-versionnee/requirements.md) | Politique versionnée et empreinte | FR-2119, FR-2120 | UNDER_REVIEW | Partiellement implémenté | SF-007-01, SF-007-17 | Aucun | P0 |
| [SF-015-05](sf-015-05-simulation-et-si/requirements.md) | Simulation « et si » de la politique de surveillance | FR-2124, FR-2125, FR-2126 | UNDER_REVIEW | Implémenté | SF-015-04, SF-002-03 | Aucun | P0 |
| [SF-015-06](sf-015-06-lacunes/requirements.md) | Registre des lacunes dans la console | FR-2130, FR-2131 | UNDER_REVIEW | Implémenté | SF-015-04 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

