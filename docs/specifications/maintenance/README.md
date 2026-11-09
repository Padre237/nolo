# MT — Maintenance

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | D-010 ; D-036 |
| Plage FR | FR-1401 à FR-1499 (MT-001) ; FR-2401 à FR-2499 (MT-002) |
| Plage NFR | NFR-1401 à NFR-1499 ; NFR-2401 à NFR-2499 |

## Objectif
Opérations sur l'arborescence et l'outillage, sans changement de comportement du produit.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [MT-002](mt-002-assemblage-depot/requirements.md) | Assemblage du monorepo Nolo | FR-2401, FR-2402, FR-2403 | UNDER_REVIEW | Implémenté | MT-001 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

