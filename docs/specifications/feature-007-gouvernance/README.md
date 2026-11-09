# F-007 — Gouvernance, conformité, audit et agents

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Spécification v1.3 007 ; D-008 ; D-025 ; AG-01 à AG-08 (2026-11-09) |
| Plage FR | FR-720 à FR-799 ; FR-1901 à FR-1999 (agents dans l'application) |
| Plage NFR | NFR-701 à NFR-799 ; NFR-1901 à NFR-1999 |

## Objectif
Faire de la loi du code : politique versionnée, agent Conformité consulté avant toute action, journal chaîné vérifiable, modes, « et si », comparaison avec et sans gouvernance, agents institutionnels, et leur visibilité dans l'application (AG-01 à AG-08).

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-007-01](sf-007-01-politique/requirements.md) | Chargement et versionnement de la politique | FR-720, FR-721, FR-722, FR-723 | UNDER_REVIEW | Implémenté | MT-001 | Aucun | P0 |
| [SF-007-02](sf-007-02-orchestrateur/requirements.md) | Orchestration et contrôle préalable obligatoire | FR-701, FR-725, FR-726 | UNDER_REVIEW | Implémenté | SF-007-01, SF-007-03, SF-007-09 | Aucun | P0 |
| [SF-007-03](sf-007-03-evaluation-conformite/requirements.md) | Évaluation de conformité (quatre verdicts cités) | FR-702, FR-703, FR-730, FR-731, FR-732 | UNDER_REVIEW | Implémenté | SF-007-01, SF-011-03 | Aucun | P0 |
| [SF-007-04](sf-007-04-anti-profilage/requirements.md) | Contrôle anti-profilage | FR-704, FR-735 | UNDER_REVIEW | Implémenté | SF-007-03 | Aucun | P0 |
| [SF-007-05](sf-007-05-transferts/requirements.md) | Contrôle des transferts hors du pays | FR-705, FR-738 | UNDER_REVIEW | Implémenté | SF-007-03 | Aucun | P0 |
| [SF-007-06](sf-007-06-categories-interdites/requirements.md) | Blocage des catégories de l'art. 48 | FR-712, FR-741 | UNDER_REVIEW | Implémenté | SF-007-03 | Aucun | P0 |
| [SF-007-07](sf-007-07-modes/requirements.md) | Modes de fonctionnement | FR-714, FR-744 | UNDER_REVIEW | Implémenté | SF-007-03 | Aucun | P0 |
| [SF-007-08](sf-007-08-interconnexions/requirements.md) | Contrôle des interconnexions externes | FR-715, FR-747 | UNDER_REVIEW | Implémenté | SF-007-03 | Aucun | P0 |
| [SF-007-09](sf-007-09-journal-ecriture/requirements.md) | Écriture du journal d'audit chaîné | FR-706, FR-709, FR-760, FR-761 | UNDER_REVIEW | Implémenté | MT-001 | Aucun | P0 |
| [SF-007-10](sf-007-10-champs-interdits/requirements.md) | Contrôle des champs interdits du journal | FR-713, FR-765 | UNDER_REVIEW | Implémenté | SF-007-09 | Aucun | P0 |
| [SF-007-11](sf-007-11-journal-consultation/requirements.md) | Consultation du journal et vérification de la chaîne (serveur) | FR-768, FR-769 | UNDER_REVIEW | Partiellement implémenté | SF-007-09, SF-009-01 | Aucun | P0 |
| [SF-007-12](sf-007-12-rejeu/requirements.md) | Rejeu d'une session | FR-773, FR-774 | UNDER_REVIEW | Non implémenté | SF-007-09 | D-016 | P1 |
| [SF-007-13](sf-007-13-simulation/requirements.md) | Simulation « et si » de la politique (serveur) | FR-707, FR-777 | UNDER_REVIEW | Implémenté | SF-007-01, SF-012-03 | Aucun | P0 |
| [SF-007-14](sf-007-14-comparaison-ab/requirements.md) | Comparaison avec et sans gouvernance (serveur) | FR-710, FR-780 | UNDER_REVIEW | Implémenté | SF-007-02, SF-012-03 | Aucun | P0 |
| [SF-007-15](sf-007-15-agents-simules/requirements.md) | Agents institutionnels simulés (District/SIMR, APDP) | FR-711, FR-783 | UNDER_REVIEW | Partiellement implémenté | SF-007-02 | Aucun | P0 |
| [SF-007-16](sf-007-16-aipd/requirements.md) | Analyse d'impact versionnée | FR-708, FR-787 | UNDER_REVIEW | Non implémenté | Aucune | Aucun | P1 |
| [SF-007-17](sf-007-17-gouvernance-navigateur/requirements.md) | Gouvernance dans Nolo : orchestrateur, Conformité et politique dans le navigateur | FR-1901, FR-1902, FR-1903, FR-1904, FR-1905, NFR-1901 | UNDER_REVIEW | Non implémenté | SF-007-01, SF-007-03, SF-011-08 | Aucun | P0 |
| [SF-007-18](sf-007-18-comment-nolo-a-decide/requirements.md) | Panneau « Comment Nolo a décidé » | FR-1911, FR-1912, FR-1913, FR-1914, FR-1915 | UNDER_REVIEW | Non implémenté | SF-007-17, SF-007-21, SF-011-08 | Aucun | P0 |
| [SF-007-19](sf-007-19-cellule-coordination/requirements.md) | Cellule de coordination multi-agents (console du ministère) | FR-1921, FR-1922, FR-1923, FR-1924, FR-1925 | UNDER_REVIEW | Non implémenté | SF-007-15, SF-007-17, SF-002-04 | Aucun | P0 |
| [SF-007-20](sf-007-20-sans-gouvernance-navigateur/requirements.md) | « Rejouer sans gouvernance » dans Nolo | FR-1931, FR-1932, FR-1933 | UNDER_REVIEW | Non implémenté | SF-007-17, SF-007-19 | Aucun | P1 |
| [SF-007-21](sf-007-21-journal-navigateur/requirements.md) | Journal d'audit chaîné dans Nolo et sa vérification | FR-1941, FR-1942, FR-1943, FR-1944 | UNDER_REVIEW | Non implémenté | SF-007-17 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

