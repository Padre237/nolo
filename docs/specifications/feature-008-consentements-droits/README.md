# F-008 — Consentements et droits

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Spécification v1.3 001, 002, 007 ; D-028 |
| Plage FR | FR-801 à FR-899 |
| Plage NFR | NFR-801 à NFR-899 |

## Objectif
Recueillir trois consentements distincts et révocables, gérer l'âge et l'accord parental, informer (art. 21) et rappeler les droits face à la décision automatisée (art. 44).

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-008-01](sf-008-01-premiere-utilisation/requirements.md) | Écran de première utilisation et consentement à l'orientation | FR-106, FR-801, FR-802, FR-803, FR-804, FR-805, FR-806 | UNDER_REVIEW | Implémenté | SF-013-02, SF-008-08 | Aucun | P0 |
| [SF-008-02](sf-008-02-consentement-surveillance/requirements.md) | Consentement à la surveillance | FR-811, FR-812 | UNDER_REVIEW | Implémenté | SF-008-01 | Aucun | P0 |
| [SF-008-03](sf-008-03-geolocalisation/requirements.md) | Position du citoyen : géolocalisation consentie ou quartier saisi | FR-821, FR-822, FR-823 | UNDER_REVIEW | Non implémenté | SF-008-01 | Aucun | P1 |
| [SF-008-04](sf-008-04-mineurs/requirements.md) | Âge et accord parental | FR-107, FR-831, FR-832 | UNDER_REVIEW | Implémenté | SF-008-01 | Aucun | P0 |
| [SF-008-05](sf-008-05-mes-donnees/requirements.md) | « Mes données » : modifier, retirer, effacer | FR-841, FR-842, FR-843, FR-844 | UNDER_REVIEW | Implémenté | SF-008-01 | Aucun | P0 |
| [SF-008-06](sf-008-06-droits-decision-automatisee/requirements.md) | Droits face à la décision automatisée | FR-108, FR-851 | UNDER_REVIEW | Partiellement implémenté | SF-001-09 | D-014 | P1 |
| [SF-008-07](sf-008-07-transparence/requirements.md) | Transparence : système automatisé et raison de la réponse | FR-109, FR-861, FR-862 | UNDER_REVIEW | Implémenté | SF-013-01 | Aucun | P0 |
| [SF-008-08](sf-008-08-page-conditions/requirements.md) | Page « Conditions d'utilisation et politique de données » | FR-871, FR-872, FR-873 | UNDER_REVIEW | Implémenté | SF-008-01, SF-013-04 | Aucun | P0 |
| [SF-008-09](sf-008-09-consentement-signalements/requirements.md) | Consentement aux signalements | FR-881 | UNDER_REVIEW | Implémenté | SF-008-01, SF-006-01 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

