# F-012 — Données fictives et scénarios

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | D-025 ; D-033 |
| Plage FR | FR-1201 à FR-1299 |
| Plage NFR | NFR-1201 à NFR-1299 |

## Objectif
Fournir les données synthétiques et fictives (patients, surveillance, établissements, comptes) et les scénarios exécutables qui démontrent le système, gouverné et non gouverné.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-012-01](sf-012-01-donnees-patients-surveillance/requirements.md) | Patients et séries de surveillance synthétiques (référence Python) | FR-1201, FR-1202 | UNDER_REVIEW | Implémenté | Aucune | Aucun | P0 |
| [SF-012-02](sf-012-02-donnees-services/requirements.md) | Établissements, stocks et signalements simulés (référence Python) | FR-1204, FR-1205 | UNDER_REVIEW | Implémenté | Aucune | Aucun | P0 |
| [SF-012-03](sf-012-03-scenarios/requirements.md) | Scénarios S1 à S3 et exécuteur | FR-1207, FR-1208, FR-1209 | UNDER_REVIEW | Implémenté | SF-012-01, SF-012-02, F-007 | Aucun | P0 |
| [SF-012-04](sf-012-04-donnees-nolo/requirements.md) | Données fictives de Nolo | FR-1211, FR-1212, FR-1213 | UNDER_REVIEW | Implémenté | Aucune | Aucun | P0 |
| [SF-012-05](sf-012-05-scenario-s4/requirements.md) | Scénario S4 : module POC gouverné et non gouverné | FR-1216, FR-1217 | UNDER_REVIEW | Non implémenté | SF-001-15, SF-007-17, SF-007-20 | Aucun | P1 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

