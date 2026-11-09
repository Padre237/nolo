# F-010 — Espace établissement

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Spécification v1.3 004, 005 ; D-029 ; D-031 ; D-035 |
| Plage FR | FR-1001 à FR-1099 |
| Plage NFR | NFR-1001 à NFR-1099 |

## Objectif
Permettre à chaque établissement (officine, hôpital, centre de santé, centre spécialisé, centre de transfusion) de s'inscrire, de remplir une fiche conditionnelle, d'être vérifié, de déclarer ses stocks et de publier ses services.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-010-01](sf-010-01-referentiel-etablissements/requirements.md) | Référentiel des établissements (tuile de démonstration) | FR-1001, FR-1002, FR-1003, FR-1004 | UNDER_REVIEW | Implémenté | SF-012-04 | Aucun | P0 |
| [SF-010-02](sf-010-02-declaration-medicaments/requirements.md) | Déclaration du stock de médicaments (import d'un fichier) | FR-401, FR-1006, FR-1007, FR-1008, FR-1009, FR-1010 | UNDER_REVIEW | Implémenté | SF-010-07, SF-004-01 | Aucun | P0 |
| [SF-010-03](sf-010-03-declaration-sang/requirements.md) | Déclaration des niveaux de sang | FR-501, FR-1013, FR-1014 | UNDER_REVIEW | Partiellement implémenté | SF-010-07 | Aucun | P1 |
| [SF-010-04](sf-010-04-inscription/requirements.md) | Inscription d'un établissement en quatre étapes | FR-1016, FR-1017, FR-1018, FR-1019, FR-1020, FR-1021, FR-1022 | UNDER_REVIEW | Implémenté | SF-009-02 | Aucun | P0 |
| [SF-010-05](sf-010-05-code-confirmation/requirements.md) | Code de confirmation de l'e-mail | FR-1023, FR-1024, FR-1025 | UNDER_REVIEW | Implémenté | SF-010-04 | Aucun | P0 |
| [SF-010-06](sf-010-06-fiche-conditionnelle/requirements.md) | Fiche conditionnelle selon le type | FR-1026, FR-1027, FR-1028, FR-1033, FR-1037, FR-1039 | UNDER_REVIEW | Implémenté | SF-010-05 | Aucun | P0 |
| [SF-010-07](sf-010-07-verification-agrement/requirements.md) | Vérification de l'agrément avant toute visibilité | FR-1029, FR-1030, FR-1031, FR-1032 | UNDER_REVIEW | Implémenté | SF-010-06, SF-015-02 | Aucun | P0 |
| [SF-010-08](sf-010-08-photos/requirements.md) | Photos de l'établissement | FR-1034, FR-1035, FR-1036 | UNDER_REVIEW | Implémenté | SF-010-06 | Aucun | P0 |
| [SF-010-09](sf-010-09-tableau-de-bord/requirements.md) | Tableau de bord de l'établissement et chemin de vérification | FR-1038, FR-1040, FR-1041, FR-1042 | UNDER_REVIEW | Implémenté | SF-010-05, SF-010-07 | Aucun | P0 |
| [SF-010-10](sf-010-10-services-urgences/requirements.md) | Tableau « Services et urgences » de l'hôpital | FR-1044, FR-1045, FR-1046 | UNDER_REVIEW | Implémenté | SF-010-06, SF-010-11 | Aucun | P0 |
| [SF-010-11](sf-010-11-specialites-modalites/requirements.md) | Saisie des spécialités et de leurs modalités (hôpital) | FR-1049, FR-1050 | UNDER_REVIEW | Implémenté | SF-010-06 | Aucun | P0 |
| [SF-010-12](sf-010-12-comptes-demo/requirements.md) | Comptes de démonstration (officine et hôpital) | FR-1053, FR-1054 | UNDER_REVIEW | Implémenté | SF-010-04 | Aucun | P0 |
| [SF-010-13](sf-010-13-politique-professionnels/requirements.md) | Politique de données des professionnels | FR-1057 | UNDER_REVIEW | Partiellement implémenté | SF-010-04 | Aucun | P1 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

