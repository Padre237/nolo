# F-009 — Accès, rôles et comptes

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | D-011 ; D-029 |
| Plage FR | FR-901 à FR-999 |
| Plage NFR | NFR-901 à NFR-999 |

## Objectif
Définir qui peut faire quoi, authentifier les établissements (un compte par établissement) et les acteurs du ministère, et permettre l'usage anonyme du citoyen.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-009-01](sf-009-01-roles-permissions/requirements.md) | Matrice des rôles et permissions | FR-901, FR-902 | UNDER_REVIEW | Implémenté | Aucune | Aucun | P0 |
| [SF-009-02](sf-009-02-authentification-pro/requirements.md) | Authentification des établissements (un compte par établissement) | FR-905, FR-906, FR-907, FR-908, FR-909 | UNDER_REVIEW | Implémenté | SF-009-01, SF-010-04 | Aucun | P0 |
| [SF-009-03](sf-009-03-compte-pseudonyme/requirements.md) | Compte pseudonyme du citoyen | FR-912, FR-913 | UNDER_REVIEW | Non implémenté | SF-009-01, SF-007-07 | D-011 ; autorisation APDP (L12) | P2 |
| [SF-009-04](sf-009-04-usage-anonyme/requirements.md) | Usage anonyme sans compte | FR-916 | UNDER_REVIEW | Implémenté | SF-009-01 | Aucun | P0 |
| [SF-009-05](sf-009-05-session-ministere/requirements.md) | Session de démonstration du ministère | FR-919, FR-920, FR-921 | UNDER_REVIEW | Implémenté | SF-009-01, SF-015-01 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

