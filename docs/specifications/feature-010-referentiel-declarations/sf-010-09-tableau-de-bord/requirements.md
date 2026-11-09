# SF-010-09 — Tableau de bord de l'établissement et chemin de vérification — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-029 (FR-ETS-11, FR-ETS-13) |
| Bloquant | Aucun |
| Dépend de | SF-010-05, SF-010-07 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le tableau de bord montre où en est l'établissement (chemin : inscrit → e-mail confirmé → fiche envoyée → vérifié → visible) et propose les vues utiles à son type : accueil, fiche, services, stock, tendances, indicateurs, aperçu public, compte.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement | Naviguer entre ses vues, modifier, désactiver, réactiver, voir l'historique | Voir les vues d'un autre type | Session pro |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1038 | Les vues MUST dépendre du type et des réponses : « Services » pour hôpital, centre de santé et centre spécialisé ; « Stock » s'il existe au moins un onglet de stock. | FR-ETS-11 | Haute | UNDER_REVIEW |
| FR-1040 | Le chemin de vérification MUST montrer l'étape atteinte (`etapeAtteinte`) et la prochaine action. | D-029 | Haute | UNDER_REVIEW |
| FR-1041 | L'aperçu public MUST montrer l'établissement tel que le voit le citoyen, sans les références du vérificateur. | D-029 | Moyenne | UNDER_REVIEW |
| FR-1042 | La vue Compte MUST permettre de désactiver et réactiver le compte et montrer l'historique du compte (journal de l'appareil). | FR-ETS-13 | Moyenne | UNDER_REVIEW |

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
| CA-010-09-01 | FR-1038 | Étant donné une officine, quand on lit la navigation, alors pas de « Services » ; un hôpital l'a. | TEST-010-09-01 |
| CA-010-09-02 | FR-1040 | Étant donné un compte confirmé sans fiche, quand on ouvre l'accueil, alors le chemin s'arrête à « e-mail confirmé » et propose « Remplir la fiche ». | TEST-010-09-02 |
| CA-010-09-03 | FR-1041 | Étant donné l'aperçu, quand on le lit, alors aucune référence du vérificateur. | TEST-010-09-03 |
| CA-010-09-04 | FR-1042 | Étant donné la vue Compte, quand on désactive, alors l'historique gagne une ligne datée. | TEST-010-09-04 |

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
4. `app/js/screens/pro/tableau.js`
5. `app/js/screens/pro/entree.js`
6. `app/js/screens/pro/compte.js`
