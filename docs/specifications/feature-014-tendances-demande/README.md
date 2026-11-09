# F-014 — Tendances de la demande

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | D-032 |
| Plage FR | FR-2001 à FR-2099 |
| Plage NFR | NFR-2001 à NFR-2099 |

## Objectif
Montrer aux établissements vérifiés les services les plus recherchés et la demande non satisfaite, par zone et par semaine, à partir de compteurs anonymes (seuil de 5, arrondi à 5).

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-014-01](sf-014-01-compteurs-anonymes/requirements.md) | Compteurs anonymes de la demande | FR-2001, FR-2002 | UNDER_REVIEW | Implémenté | SF-014-02 | Aucun | P0 |
| [SF-014-02](sf-014-02-zones/requirements.md) | Zones : arrondissements, départements, régions | FR-2005, FR-2006 | UNDER_REVIEW | Implémenté | SF-012-04 | Aucun | P0 |
| [SF-014-03](sf-014-03-seuil-arrondi/requirements.md) | Seuil de 5, arrondi à 5, semaines complètes | FR-2009, FR-2010 | UNDER_REVIEW | Implémenté | SF-014-01 | Aucun | P0 |
| [SF-014-04](sf-014-04-filtres-classement/requirements.md) | Filtres, classements et demande non satisfaite | FR-2013, FR-2014 | UNDER_REVIEW | Implémenté | SF-014-03 | Aucun | P0 |
| [SF-014-05](sf-014-05-acces-sans-alerte/requirements.md) | Accès réservé, sans alerte ni export brut | FR-2017, FR-2018 | UNDER_REVIEW | Implémenté | SF-010-07 | Aucun | P0 |
| [SF-014-06](sf-014-06-mes-indicateurs/requirements.md) | « Mes indicateurs » | FR-2021 | UNDER_REVIEW | Implémenté | SF-010-09 | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

