# SF-008-07 — Transparence : système automatisé et raison de la réponse — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-109) ; INT-UE-AI-ACT art. 50 (exemple) |
| Bloquant | Aucun |
| Dépend de | SF-013-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La personne sait toujours qu'elle parle à un système automatisé qui ne remplace pas un soignant, et pourquoi elle reçoit cette réponse.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Lire la mention et la raison | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-109 | chaque réponse MUST indiquer qu'elle provient d'un système automatisé et donner la raison en une phrase. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-861 | La mention `commun.automatise` MUST figurer sur l'accueil, l'écran de première utilisation et chaque écran de résultat. | FR-109 | Haute | UNDER_REVIEW |
| FR-862 | Chaque écran de résultat MUST donner sa raison en une phrase (danger repéré, plainte non respiratoire, score insuffisant, catégorie protégée, besoins couverts). | FR-109 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-008-07-01 | Informer les personnes qu'elles interagissent avec une IA (exemple international) | `INT-UE-AI-ACT-2024-1689::0088` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-008-07-01 | FR-861 | Étant donné l'accueil et les écrans de résultat, quand on les lit, alors la mention est présente. | TEST-008-07-01 |
| CA-008-07-02 | FR-109, FR-862 | Étant donné chaque issue (`urgence`, `hors_champ` × 2, `art48`, `pistes`), quand l'écran s'affiche, alors une phrase de raison propre à l'issue. | TEST-008-07-02 |

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
4. `app/js/i18n/*.js`
