# F-004 — Recherche d'un médicament

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Spécification v1.3 004 |
| Plage FR | FR-420 à FR-499 |
| Plage NFR | NFR-401 à NFR-499 |

## Objectif
Trouver les officines et pharmacies hospitalières vérifiées qui déclarent un médicament (DCI) disponible, sans alternative, posologie ni promotion.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-004-01](sf-004-01-catalogue-dci/requirements.md) | Catalogue des DCI et normalisation de la saisie | FR-407, FR-420, FR-421 | UNDER_REVIEW | Implémenté | SF-013-04 | Aucun | P0 |
| [SF-004-02](sf-004-02-recherche-stocks/requirements.md) | Recherche dans les stocks déclarés et classement | FR-402, FR-403, FR-406, FR-422, FR-423, FR-424 | UNDER_REVIEW | Implémenté | SF-004-01, SF-010-02, SF-006-02 | Aucun | P0 |
| [SF-004-03](sf-004-03-refus-alternative/requirements.md) | Aucune alternative, posologie ni promotion | FR-404, FR-425 | UNDER_REVIEW | Implémenté | SF-004-02 | Aucun | P0 |
| [SF-004-04](sf-004-04-medicament-sensible-appareil/requirements.md) | Médicaments sensibles : recherche sur l'appareil, sans signalement ni comptage | FR-405, FR-408, FR-426 | UNDER_REVIEW | Implémenté | SF-004-02 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

