# SF-002-11 — Signalement d'un événement communautaire — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-11 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | D-026 ; guide SBC 2023 (détection par la communauté) |
| Bloquant | Aucun |
| Dépend de | SF-002-04 |
| Priorité | P2 |

## 1. Objectif métier et résultat attendu
Tout membre de la communauté peut signaler une situation menaçante (mêmes symptômes chez plusieurs personnes, décès inexpliqués, animaux morts) sans donner de donnée de santé sur lui-même ; le signal va au point focal.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Membre de la communauté | Signaler un événement | Donner une donnée de santé sur soi | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1601 | Le formulaire MUST proposer les événements des définitions SC1 à SC8, l'aire et la date, sans aucun champ sur la santé de la personne qui signale. | D-026 | Moyenne | UNDER_REVIEW |
| FR-1602 | Le signalement MUST arriver au point focal au statut `a_trier` et suivre le circuit de SF-002-04. | D-026 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-002-11-01 | Détection par tout membre de la communauté | `CMR-MINSANTE-GUIDE-SBC-2023::0047` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-002-11-01 | FR-1601 | Étant donné le formulaire, quand on liste ses champs, alors événement, aire, date seulement. | TEST-002-11-01 |
| CA-002-11-02 | FR-1602 | Étant donné un signalement envoyé, quand le point focal ouvre la console, alors il est `a_trier`. | TEST-002-11-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-002-surveillance/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/patient/signaler-evenement.js`
