# F-003 — Recherche d'un service ou d'une spécialité

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Spécification v1.3 003 ; D-035 |
| Plage FR | FR-320 à FR-399 |
| Plage NFR | NFR-301 à NFR-399 |

## Objectif
Trouver, à la demande explicite de la personne, les structures ouvertes qui offrent un service ou une spécialité, y compris les centres spécialisés, par rayon progressif et critères publics.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-003-01](sf-003-01-resolution-specialite/requirements.md) | Choix de la spécialité dans une liste fermée | FR-301, FR-304, FR-320, FR-321, FR-322 | UNDER_REVIEW | Implémenté | SF-013-04 | Aucun | P0 |
| [SF-003-02](sf-003-02-rayon-progressif/requirements.md) | Recherche par rayon progressif et tri public | FR-302, FR-303, FR-307, FR-323, FR-324 | UNDER_REVIEW | Implémenté | SF-003-01, SF-010-01 | Aucun | P0 |
| [SF-003-03](sf-003-03-recherche-sensible-appareil/requirements.md) | Spécialités sensibles : recherche sur l'appareil, jamais comptée | FR-305, FR-308, FR-325 | UNDER_REVIEW | Implémenté | SF-003-02, SF-014-01 | Aucun | P0 |
| [SF-003-04](sf-003-04-centres-specialises/requirements.md) | Centres spécialisés par domaine | FR-326, FR-327 | UNDER_REVIEW | Implémenté | SF-003-02, SF-010-06 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

