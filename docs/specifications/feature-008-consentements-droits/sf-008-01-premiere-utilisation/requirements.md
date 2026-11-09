# SF-008-01 — Écran de première utilisation et consentement à l'orientation — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-106) ; D-028 (FR-CONS-01, 02, 04, 06, 10) |
| Bloquant | Aucun |
| Dépend de | SF-013-02, SF-008-08 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Au premier lancement, et à chaque nouvelle version des conditions, Nolo présente trois cases distinctes non cochées (orientation, surveillance, signalements), un lien vers les conditions et « Continuer sans partager ». Le choix est enregistré sur l'appareil, sans rien d'identifiant.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Cocher, valider, continuer sans partager, lire les conditions | Être considéré d'accord par défaut | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-106 | le consentement à l'orientation MUST être recueilli avant la saisie, sauf détection d'urgence où l'orientation urgente s'affiche quand même (base « préservation de la vie »). | Référence v1.3 | Haute | REMPLACÉE par FR-801 et FR-803 (D-028 : rien ne part sans consentement ; l'urgence reste locale) |
| FR-801 | L'écran de première utilisation MUST s'afficher au premier lancement et dès que `version_conditions` enregistrée diffère de `VERSION_CONDITIONS`, avant toute fonction qui enverrait une donnée personnelle. | FR-CONS-01 (D-028) | Haute | UNDER_REVIEW |
| FR-802 | L'écran MUST présenter trois cases distinctes (orientation, surveillance, signalements), aucune cochée par défaut, chacune avec une phrase qui dit ce qui serait envoyé ; « Valider » sans case cochée est refusé (`E-CONS-AUCUNE-CASE`). | FR-CONS-02 | Haute | UNDER_REVIEW |
| FR-803 | « Continuer sans partager » MUST enregistrer les trois finalités à `false`, quel que soit l'état des cases, et ne bloquer aucune fonction locale (urgence, recherches). | FR-CONS-04 | Haute | UNDER_REVIEW |
| FR-804 | L'enregistrement MUST contenir exactement `version_conditions`, `date`, `finalites`, `majeur`, `accord_parental` — ni nom, ni téléphone, ni e-mail, ni position, ni langue. | FR-CONS-06 | Haute | UNDER_REVIEW |
| FR-805 | La barre de sécurité et la mention « système automatisé, il ne remplace pas un soignant » MUST rester visibles sur l'écran de première utilisation. | FR-CONS-10 | Haute | UNDER_REVIEW |
| FR-806 | Le bouton « Valider » MUST rester activable et expliquer le refus (`data-inactif` + message), jamais `aria-disabled` qui empêche l'explication. | D-034 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-831 (SF-008-04) : question d'âge et accord parental
- FR-871 (SF-008-08) : lien vers les conditions sous les cases

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-008-01-01 | Consentement préalable, libre, éclairé et spécifique par finalité | `CMR-LOI-2024-017::0011` (art. 9) |
| BR-008-01-02 | Version des conditions : `2026-11-07` | `VERSION_CONDITIONS` (`app/js/domain/consent.js`) |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-008-01-01 | FR-802 | Étant donné l'état initial, quand on valide, alors refus `E-CONS-AUCUNE-CASE`. | TEST-008-01-01; CA-CONS-01 |
| CA-008-01-02 | FR-803 | Étant donné deux cases cochées, quand on choisit « Continuer sans partager », alors trois finalités à `false`. | TEST-008-01-02; CA-CONS-04 |
| CA-008-01-03 | FR-804 | Étant donné un choix validé, quand on lit l'enregistrement, alors exactement cinq champs. | TEST-008-01-03; CA-CONS-05 |
| CA-008-01-04 | FR-801 | Étant donné un enregistrement absent, illisible ou d'une autre version, quand l'application démarre, alors l'écran de première utilisation s'affiche. | TEST-008-01-04; CA-CONS-06 |
| CA-008-01-05 | FR-805, FR-806 | Étant donné l'écran de première utilisation, quand on l'inspecte, alors barre de sécurité et mention présentes ; « Valider » sans case annonce la raison. | TEST-008-01-05 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-008-consentements-droits/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/consent.js`
5. `app/js/screens/patient/bienvenue.js`
6. `app/js/app.js`
