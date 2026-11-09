# SF-006-01 — Soumission d'un signalement — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-01 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |
| Origine | Spécification v1.3 (FR-601 à FR-603, FR-608) ; D-030 |
| Bloquant | Aucun |
| Dépend de | SF-008-09, SF-007-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Après une recherche de médicament, la personne qui a coché « signalements » dit si le médicament était là. Le signalement est lié à un pseudonyme, limité en nombre et sans effet direct sur le classement.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen (case signalements) | Signaler | Signaler plus de 5 fois par jour, deux fois le même couple pharmacie-médicament le même jour, ou sa propre pharmacie | Case « signalements » |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-601 | 4 choix de signalement (trouvé, introuvable, ordonnance manquante, autre raison) avec effets définis dans `rules/fiabilite_pharmacies.yaml`. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-602 | pénalité pleine seulement si la déclaration a moins de 6 h ; sinon poids 0,25. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-603 | comptes de moins de 7 jours : poids 0,5. | Référence v1.3 | Moyenne | UNDER_REVIEW |
| FR-608 | signalants pseudonymisés par hachage ; aucune identité exposée à la pharmacie. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-620 | Un compte MUST pouvoir faire au plus 1 signalement par pharmacie, par médicament et par jour, et 5 par jour en tout ; une pharmacie ne peut pas se signaler elle-même. | D-030 | Haute | UNDER_REVIEW |
| FR-621 | Le signalement MUST être enregistré sur l'appareil (`signalements`) avec la pharmacie, la DCI, la valeur et le jour, et remercier la personne. | D-028 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-006-01-01 | Effets et poids des signalements | `kb/rules/fiabilite_pharmacies.yaml` |
| BR-006-01-02 | Signalements pseudonymisés | `CMR-LOI-2024-017::0011` ; `CMR-LOI-2024-017::0020` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-006-01-01 | FR-601 | Étant donné un résultat, quand on ouvre « Vous y êtes allé ? », alors quatre choix sont proposés. | TEST-006-01-01 |
| CA-006-01-02 | FR-620 | Étant donné 5 signalements aujourd'hui, quand on en fait un 6e, alors refus annoncé ; même couple deux fois, refus. | TEST-006-01-02 |
| CA-006-01-03 | FR-602, FR-603 | Étant donné une déclaration de 8 h et un compte de 3 jours, quand le score est calculé, alors poids 0,25 × 0,5. | TEST-006-01-03 |
| CA-006-01-04 | FR-608, FR-621 | Étant donné un signalement, quand on lit le stockage, alors pharmacie, DCI, valeur, jour et aucun identifiant de personne. | TEST-006-01-04 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-006-fiabilite-pharmacies/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/patient/chercher.js`
5. `kb/services/orientation_services.py`
6. `kb/rules/fiabilite_pharmacies.yaml`
