# F-005 — Recherche de sang

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Spécification v1.3 005 |
| Plage FR | FR-520 à FR-599 |
| Plage NFR | NFR-501 à NFR-599 |

## Objectif
Trouver une banque de sang ou un centre de transfusion qui déclare un groupe disponible, en niveaux et jamais en quantités.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-005-01](sf-005-01-recherche-groupe/requirements.md) | Recherche d'un groupe sanguin | FR-502, FR-503, FR-520, FR-521 | UNDER_REVIEW | Implémenté | SF-010-03, SF-003-02 | Aucun | P0 |
| [SF-005-02](sf-005-02-appel-au-don/requirements.md) | Appel au don | FR-504 | UNDER_REVIEW | Partiellement implémenté | SF-005-01 | Aucun | P1 |
| [SF-005-03](sf-005-03-priorite-triage/requirements.md) | La recherche de sang ne court-circuite jamais l'alerte d'urgence | FR-505, FR-522 | UNDER_REVIEW | Implémenté | SF-005-01, SF-001-12 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

