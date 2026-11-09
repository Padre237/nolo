# SF-010-04 — Inscription d'un établissement en quatre étapes — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-029 (FR-ETS-01 à 04, CA-ETS-01, 02) |
| Bloquant | Aucun |
| Dépend de | SF-009-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Depuis « Je suis un établissement de santé », l'établissement choisit son type, donne son identité (nom, NIU, e-mail, téléphone, commune), sa position (GPS ou carte) et son mot de passe.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement | S'inscrire | Avoir deux comptes ; s'inscrire avec un NIU mal formé | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1016 | Le bouton « Je suis un établissement de santé » MUST mener à « Se connecter / S'inscrire » (`#/pro`). | FR-ETS-01 | Haute | UNDER_REVIEW |
| FR-1017 | L'inscription MUST se faire en 4 étapes : type, identité, position, sécurité ; « Précédent » garde les saisies. | D-029 | Haute | UNDER_REVIEW |
| FR-1018 | Les types MUST être : officine, hôpital, centre de santé, centre spécialisé, centre de transfusion (`TYPES`). | D-029 ; D-035 | Haute | UNDER_REVIEW |
| FR-1019 | Le NIU MUST respecter `^[A-Z][0-9]{12}[A-Z]$` après normalisation (majuscules, espaces retirés), avec un message clair sinon. | CA-ETS-01 | Haute | UNDER_REVIEW |
| FR-1020 | Un NIU et un e-mail MUST ne servir qu'à un seul compte. | FR-ETS-03 ; CA-ETS-02 | Haute | UNDER_REVIEW |
| FR-1021 | La position MUST être prise par le GPS quand c'est possible, corrigeable, et sa précision affichée ; refusée dans un cadre, la saisie de la commune suffit. | FR-ETS-04 | Moyenne | UNDER_REVIEW |
| FR-1022 | E-mail et téléphone MUST être contrôlés (`erreurEmail`, `erreurTelephone` : format camerounais +237 et 9 chiffres). | D-029 | Haute | UNDER_REVIEW |

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
| CA-010-04-01 | FR-1019 | Étant donné `M041618186649L`, quand on valide, alors accepté ; `M04161818664L`, `041618186649L`, `M041618186649`, `M0416181866A9L` refusés. | TEST-010-04-01; CA-ETS-01 |
| CA-010-04-02 | FR-1020 | Étant donné un compte existant, quand on réinscrit le même NIU ou le même e-mail, alors refus. | TEST-010-04-02; CA-ETS-02 |
| CA-010-04-03 | FR-1017, FR-1018 | Étant donné l'étape 2, quand on revient à l'étape 1 puis repart, alors les saisies sont conservées ; 5 types proposés. | TEST-010-04-03 |
| CA-010-04-04 | FR-1021, FR-1022 | Étant donné un téléphone « 12345 », quand on valide l'identité, alors refus ; dans un cadre, la commune suffit pour la position. | TEST-010-04-04 |
| CA-010-04-05 | FR-1016 | Étant donné l'accueil, quand on touche « Je suis un établissement de santé », alors `#/pro`. | TEST-010-04-05 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-010-referentiel-declarations/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/patient/accueil.js`
5. `app/js/screens/pro/entree.js`
6. `app/js/screens/pro/inscription.js`
7. `app/js/domain/pro.js`
8. `app/js/screens/pro/compte.js`
9. `src/server/etablissements/service.py`
