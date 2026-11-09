# SF-013-11 — État de l'application et stockage local — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-11 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-034 |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Un état unique, observé par le rendu ; le stockage local est préfixé, tolérant aux erreurs et ne garde que ce qui doit l'être (consentement, langue, signalements, comptes pro de démonstration, session).

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Application | Lire et écrire l'état | Garder un cas, une piste ou un texte libre | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1348 | `local.read/write/remove` MUST préfixer les clés par `nolo:` et intercepter les erreurs (stockage indisponible ou plein). | D-034 | Haute | UNDER_REVIEW |
| FR-1349 | Seules les clés `langue`, `consentement`, `signalements`, `pro-comptes`, `pro-session`, `pro-essais`, `ministere-session`, `ministere-decisions`, `ministere-dossiers` MUST être écrites. | Principe XI | Haute | UNDER_REVIEW |
| FR-1350 | `createStore(initial)` MUST notifier un rendu à chaque `set`, sans dépendance circulaire (`app/js/etat.js`). | D-034 | Moyenne | UNDER_REVIEW |

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
| CA-013-11-01 | FR-1348 | Étant donné un stockage qui lève une erreur, quand on lit ou écrit, alors aucune erreur propagée. | TEST-013-11-01 |
| CA-013-11-02 | FR-1349 | Étant donné un parcours complet, quand on liste `localStorage`, alors seulement les clés autorisées. | TEST-013-11-02 |
| CA-013-11-03 | FR-1350 | Étant donné un `set`, quand il est appelé, alors un rendu. | TEST-013-11-03 |

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
4. `app/js/core/store.js`
5. `app/js/etat.js`
