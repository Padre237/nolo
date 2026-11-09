# SF-015-01 — Navigation de la console et chiffres d'en-tête — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-035 |
| Bloquant | Aucun |
| Dépend de | SF-009-05 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La console regroupe cinq vues — carte, signaux, agréments, offre et demande, politique et lacunes — avec un bandeau de chiffres clés et des pastilles de compte (signaux à trier, dossiers en attente).

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent du ministère (démo) | Naviguer entre les vues | — | Session ministère |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2101 | La navigation MUST proposer : Carte, Signaux, Agréments, Offre et demande, Politique et lacunes ; la vue courante porte `aria-current`. | D-035 | Haute | UNDER_REVIEW |
| FR-2102 | Le bandeau MUST afficher : signaux à trier, dossiers en attente, structures vérifiées, mode de fonctionnement ; les pastilles de la navigation reprennent les deux premiers. | D-035 | Moyenne | UNDER_REVIEW |

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
| CA-015-01-01 | FR-2101 | Étant donné la console, quand on lit la navigation, alors cinq vues et `aria-current` sur la courante. | TEST-015-01-01 |
| CA-015-01-02 | FR-2102 | Étant donné deux signaux à trier, quand on lit le bandeau et la pastille, alors 2 dans les deux. | TEST-015-01-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-015-console-ministere/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/ministere/console.js`
5. `app/css/ministere.css`
