# SF-001-08 — Urgence sur l'appareil sans consentement — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-112) ; art. 9 (préservation de la vie) |
| Bloquant | Aucun |
| Dépend de | SF-001-14, SF-008-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une personne qui refuse tout partage reçoit quand même l'alerte d'urgence : la détection tourne sur le téléphone et rien n'est envoyé.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen sans consentement | Décrire, être alerté, appeler les secours | — | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-112 | le consentement à l'orientation MUST être exprès (case dédiée, non cochée par défaut). Sans ce consentement, les règles d'urgence s'exécutent sur l'appareil et aucun symptôme n'est envoyé. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-175 | Le parcours « Décrire → Vérifier → Urgence » MUST fonctionner à l'identique avec « Continuer sans partager » ; seule la mention d'envoi diffère. | D-028 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-801 (SF-008-01) : consentement exprès, cases non cochées

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-08-01 | Base légale : préservation de la vie | `CMR-LOI-2024-017::0011` (art. 9) |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-08-01 | FR-112, FR-175 | Étant donné « Continuer sans partager », quand on décrit un signe de danger, alors l'écran Urgence s'affiche et aucune requête réseau n'est émise. | TEST-001-08-01 |

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
4. `app/js/screens/patient/verifier.js`
5. `app/js/screens/patient/urgence.js`
