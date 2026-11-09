# SF-001-14 — Questions de sécurité et alerte d'urgence — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-14 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-026 ; D-033 (FR-DX-03) ; PCIME (signes généraux de danger) |
| Bloquant | Aucun |
| Dépend de | SF-001-13, SF-001-12 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Avant toute piste, Nolo pose quelques questions fermées de danger adaptées à l'âge. Un « oui », ou un signe de danger écrit, affiche immédiatement l'écran d'urgence et masque toute piste.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Répondre oui / non ; appeler | Voir des pistes en présence d'un danger | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1511 | `questionsDanger(profil)` MUST poser, pour un enfant de moins de 5 ans : ne peut pas boire ou téter, vomit tout, convulsions, très endormi, tirage ; sinon : essoufflé au repos, douleur de poitrine, lèvres bleues, confusion, convulsions. | PCIME ; D-026 | Haute | UNDER_REVIEW |
| FR-1512 | Tant qu'une question de sécurité n'a pas de réponse, le bouton « Voir mes pistes » MUST rester inactif, avec la raison affichée (`data-inactif`, pas `aria-disabled`). | D-034 | Haute | UNDER_REVIEW |
| FR-1513 | Un « oui » à une question, ou un signe `danger` dans la description, MUST mener à l'écran Urgence, sans aucune piste. | FR-DX-03 | Haute | UNDER_REVIEW |
| FR-1514 | L'écran Urgence MUST afficher l'alerte, les signes de danger en cause (écrits et répondus, sans doublon), deux appels en grand (119, 112) et le lien vers les urgences les plus proches (enfant : urgences pédiatriques en premier). | D-026 ; FR-DX-17 | Haute | UNDER_REVIEW |
| FR-1515 | La couleur rouge MUST être réservée à l'urgence (alerte, boutons d'appel, `bouton--urgence`). | D-034 (design system) | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-168 (SF-001-07) : le moteur v1 s'ajoute à ces questions
- FR-195 (SF-001-12) : barre de sécurité masquée sur l'écran Urgence

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-14-01 | Critères observables sans appareil de mesure | D-020 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-14-01 | FR-1511 | Étant donné un enfant de 3 ans, quand on demande les questions, alors 5 questions PCIME ; pour un adulte, les 5 questions adultes. | TEST-001-14-01 |
| CA-001-14-02 | FR-1512 | Étant donné une question sans réponse, quand on touche « Voir mes pistes », alors rien ne se passe et la raison est annoncée. | TEST-001-14-02 |
| CA-001-14-03 | FR-1513 | Étant donné « il tousse et a de la fièvre » et « oui » à « convulsions », quand on analyse, alors issue `urgence`, aucune piste. | TEST-001-14-03 |
| CA-001-14-04 | FR-1514 | Étant donné « convulsions » écrit et « oui » à « convulsions », quand l'écran Urgence s'affiche, alors le signe n'apparaît qu'une fois. | TEST-001-14-04 |
| CA-001-14-05 | FR-1515 | Étant donné les feuilles de style, quand on liste les usages de `--urgence`, `--urgence-fond`, `--urgence-texte` et `--urgence-trait`, alors ils ne concernent que l'alerte, les appels et `bouton--urgence`. | TEST-001-14-05 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-001-orientation/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/engine.js`
5. `app/js/screens/patient/verifier.js`
6. `app/js/screens/patient/urgence.js`
7. `app/css/screens.css`
