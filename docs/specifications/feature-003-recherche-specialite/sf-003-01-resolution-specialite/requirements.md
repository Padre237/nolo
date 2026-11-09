# SF-003-01 — Choix de la spécialité dans une liste fermée — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-301, FR-304) |
| Bloquant | Aucun |
| Dépend de | SF-013-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La personne choisit explicitement un service dans une liste fermée de 19 spécialités (libellés FR/EN). Aucune recherche de spécialité n'est déclenchée à partir des symptômes, hors module POC.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Choisir une spécialité | Recevoir une spécialité déduite de ses symptômes hors POC | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-301 | liste fermée de spécialités avec synonymes (`rules/recherche_specialite.yaml`). | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-304 | MUST NOT déclencher une recherche de spécialité depuis des symptômes. | Référence v1.3 | Haute | REMPLACÉE par FR-320 (D-033 : exception du module POC) |
| FR-320 | La recherche de spécialité MUST n'être lancée que par un choix explicite dans `SPECIALITES` ; la seule exception est la spécialité de la 1re piste dans « Où aller », en mode démonstration (SF-001-10). | D-033 | Haute | UNDER_REVIEW |
| FR-321 | La liste MUST contenir les 19 identifiants de `SPECIALITES`, chacun avec un libellé FR et EN (`specialites.*`). | D-027 | Haute | UNDER_REVIEW |
| FR-322 | Les synonymes de `rules/recherche_specialite.yaml` (« cœur » → cardiologie) MUST être reconnus par une saisie libre quand elle sera ajoutée à Nolo. | FR-301 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| — | Aucune | — |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-003-01-01 | FR-321 | Étant donné les catalogues, quand on liste `specialites.*`, alors 19 clés identiques en FR et EN. | TEST-003-01-01 |
| CA-003-01-02 | FR-320, FR-304 | Étant donné un parcours « Décrire » sans module POC, quand il se termine, alors aucune recherche de spécialité n'a été lancée. | TEST-003-01-02 |
| CA-003-01-03 | FR-322, FR-301 | Étant donné la saisie « cœur », quand on la résout, alors `cardiologie`. | TEST-003-01-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-003-recherche-specialite/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/facilities.js`
5. `app/js/i18n/*.js`
6. `app/js/screens/patient/chercher.js`
7. `kb/services/orientation_services.py`
