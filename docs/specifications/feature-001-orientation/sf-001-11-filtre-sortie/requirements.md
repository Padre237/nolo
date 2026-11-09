# SF-001-11 — Filtre de sortie : aucun médicament, posologie ni alternative — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-11 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | Spécification v1.3 (FR-102) ; D-033 |
| Bloquant | Aucun |
| Dépend de | SF-001-15 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Quoi que produise le moteur, l'écran ne propose jamais de médicament, de posologie ni d'alternative thérapeutique. Depuis D-033, en mode démonstration, des pistes peuvent être nommées (sauf art. 48) ; le filtre garde son interdiction sur les produits.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Lire ses pistes et la structure adaptée | Recevoir un nom de médicament ou une posologie | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-102 | les sorties MUST passer un filtre interdisant noms de maladies probables, médicaments, posologies et alternatives thérapeutiques. | Référence v1.3 | Haute | REMPLACÉE par FR-190 et FR-191 (D-033 : pistes nommées en mode POC) |
| FR-190 | Aucun écran du parcours citoyen MUST contenir un nom de médicament, une posologie ou une alternative ; un test parcourt les catalogues et les tables de pistes. | FR-DX-08 | Haute | UNDER_REVIEW |
| FR-191 | Des noms de pistes MUST n'apparaître qu'en mode démonstration, jamais pour une catégorie de l'art. 48, et toujours avec l'étiquette « estimation d'un modèle… à confirmer par un soignant ». | D-033 ; FR-DX-04, FR-DX-06 | Haute | UNDER_REVIEW |
| FR-192 | Aucun lien MUST mener de l'écran des pistes vers la recherche de médicament. | FR-DX-08 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-404 (SF-004-03) : pas d'alternative ni de posologie dans la recherche de médicament

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
| CA-001-11-01 | FR-190 | Étant donné la liste des DCI et noms commerciaux, quand on cherche dans les catalogues des écrans citoyens et dans `PATHOLOGIES`, alors aucune occurrence. | TEST-001-11-01 |
| CA-001-11-02 | FR-191 | Étant donné une piste nommée, quand elle s'affiche, alors l'étiquette d'estimation est présente. | TEST-001-11-02 |
| CA-001-11-03 | FR-192 | Étant donné l'écran des pistes, quand on liste ses liens, alors aucun ne pointe vers `#/chercher` avec l'onglet médicament. | TEST-001-11-03 |

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
4. `app/js/screens/patient/pistes.js`
5. `app/js/i18n/*.js`
