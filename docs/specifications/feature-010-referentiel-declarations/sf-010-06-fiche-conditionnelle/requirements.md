# SF-010-06 — Fiche conditionnelle selon le type — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-029 (FR-ETS-05, 06, 14, 15 ; CA-ETS-04) ; D-035 |
| Bloquant | Aucun |
| Dépend de | SF-010-05 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Chaque type d'établissement remplit une fiche dont les questions dépendent du type et des réponses : C (communes), O (officine), H (hôpital et centre de santé), S (centre spécialisé), B (transfusion). Une question masquée n'est pas enregistrée.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement confirmé | Remplir et envoyer sa fiche | Ajouter un champ promotionnel | E-mail confirmé |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1026 | `questionsVisibles(type, reponses)` MUST ne rendre que les questions du type dont la condition `si` est remplie. | FR-ETS-05 | Haute | UNDER_REVIEW |
| FR-1027 | `nettoyer(type, reponses)` MUST retirer toute réponse à une question masquée avant enregistrement. | FR-ETS-05 | Haute | UNDER_REVIEW |
| FR-1028 | `completude(type, reponses)` MUST compter les questions visibles obligatoires (hors `optionnel`), y compris la complétude des spécialités (modalité et jours) ; l'envoi exige 100 % et le NIU bien formé. | FR-ETS-06 | Haute | UNDER_REVIEW |
| FR-1033 | Le centre spécialisé MUST répondre S1 (domaine), S2 (prestations), S3, S4, S5 ; le centre de transfusion B1, B3, B4, B6, B7. | D-035 ; D-029 | Haute | UNDER_REVIEW |
| FR-1037 | Aucun champ de la fiche MUST permettre une mise en avant payante ou promotionnelle. | FR-ETS-15 ; Principe VII | Haute | UNDER_REVIEW |
| FR-1039 | Les textes de la fiche MUST exister en FR et EN avec les mêmes clés. | FR-ETS-14 ; CA-ETS-13 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-010-06-01 | Publicité des établissements pharmaceutiques encadrée | `CMR-LOI-90-035::0017` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-010-06-01 | FR-1026 | Étant donné une officine, quand on liste les questions, alors aucune H ni B ; un hôpital H8 = non n'a ni H8a ni H8b. | TEST-010-06-01; CA-ETS-04 |
| CA-010-06-02 | FR-1027 | Étant donné une réponse à H8a puis H8 = non, quand on nettoie, alors H8a absente. | TEST-010-06-02 |
| CA-010-06-03 | FR-1028 | Étant donné une fiche d'hôpital sans modalité pour une spécialité cochée, quand on calcule, alors < 100 % et envoi refusé. | TEST-010-06-03 |
| CA-010-06-04 | FR-1033 | Étant donné un centre spécialisé, quand on liste les questions, alors S1 à S5 en plus des communes. | TEST-010-06-04 |
| CA-010-06-05 | FR-1037 | Étant donné la liste `QUESTIONS`, quand on la lit, alors aucun champ de type « mise en avant », « sponsor » ou « promotion ». | TEST-010-06-05 |
| CA-010-06-06 | FR-1039 | Étant donné les catalogues, quand on compare `pro.fiche.*`, alors mêmes clés. | TEST-010-06-06; CA-ETS-13 |

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
4. `app/js/domain/pro.js`
5. `app/js/screens/pro/vue-fiche.js`
6. `src/server/etablissements/fiches.py`
