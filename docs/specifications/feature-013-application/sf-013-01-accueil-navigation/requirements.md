# SF-013-01 — Accueil, navigation et bandeau d'urgence — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-306) ; D-034 |
| Bloquant | Aucun |
| Dépend de | SF-013-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
L'accueil propose une action maîtresse (« Décrire ce que je ressens »), la recherche, et un annuaire des autres espaces (établissements, ministère) ; un bandeau d'urgence reste toujours accessible.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Choisir une action | — | Consentement valide |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-306 | bandeau fixe « En cas d'urgence, rendez-vous aux urgences les plus proches. » | Référence v1.3 | Haute | REMPLACÉE par FR-195 (barre de sécurité avec appels) et FR-1301 |
| FR-1301 | L'accueil MUST présenter le panneau principal avec l'action maîtresse « Décrire ce que je ressens », la recherche, et l'annuaire des espaces (établissements, ministère). | D-034 ; D-035 | Haute | UNDER_REVIEW |
| FR-1302 | L'en-tête MUST porter le logo Nolo, le retour quand il existe, l'étape du parcours et la bascule FR/EN (44 px). | D-034 | Haute | UNDER_REVIEW |
| FR-1303 | Le pied de page MUST lier Conditions, Mes données, Espace établissement, Espace ministère et n'être jamais masqué par la barre de sécurité. | D-034 | Moyenne | UNDER_REVIEW |

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
| CA-013-01-01 | FR-1301 | Étant donné l'accueil, quand on le lit, alors action maîtresse, recherche et annuaire. | TEST-013-01-01 |
| CA-013-01-02 | FR-1302, FR-306 | Étant donné chaque écran citoyen, quand on lit l'en-tête et le bas, alors logo, bascule et barre de sécurité. | TEST-013-01-02 |
| CA-013-01-03 | FR-1303 | Étant donné le bas d'une page longue, quand on y arrive, alors le pied est entièrement visible au-dessus de la barre. | TEST-013-01-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-013-application/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/patient/accueil.js`
5. `app/js/ui/components.js`
