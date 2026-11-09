# SF-013-03 — Rendu, mise à jour du DOM et délégation des événements — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-034 |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le rendu passe par un gabarit `html` qui échappe tout, une mise à jour du DOM par fusion qui garde le focus et les saisies, et une délégation unique des événements par attributs `data-*`.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Application | Rendre | Injecter du HTML non échappé | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1310 | `html` MUST échapper toute valeur interpolée sauf `raw(...)` explicite. | D-034 | Haute | UNDER_REVIEW |
| FR-1311 | `patch(cible, balisage)` MUST fusionner par clé (`data-cle` ou `id`), ignorer les enfants de `data-garder`, garder le focus, et ne synchroniser la valeur d'un champ que si le gabarit porte un attribut `value` (les champs non contrôlés, comme les mots de passe, gardent leur saisie). | Correction du 2026-11-09 | Haute | UNDER_REVIEW |
| FR-1312 | Les événements MUST être délégués : `data-act` (clic), `data-input`, `data-change`, `data-submit`, et `keydown` (Entrée, Espace) sur `[role="button"][data-act]`. | D-034 | Haute | UNDER_REVIEW |
| FR-1313 | `annonce(message, { ico, duree, code })` MUST afficher une annonce et la lire aux lecteurs d'écran (`aria-live`). | D-034 | Moyenne | UNDER_REVIEW |

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
| CA-013-03-01 | FR-1310 | Étant donné `<img onerror>` dans une saisie, quand on la rend, alors texte échappé. | TEST-013-03-01 |
| CA-013-03-02 | FR-1311 | Étant donné un mot de passe saisi, quand l'écran se re-rend, alors la saisie est conservée et le focus aussi. | TEST-013-03-02 |
| CA-013-03-03 | FR-1312 | Étant donné une région de la carte au clavier, quand on presse Espace, alors l'action s'exécute. | TEST-013-03-03 |
| CA-013-03-04 | FR-1313 | Étant donné un ajout de signe, quand il est fait, alors annonce visible et dans la région `aria-live`. | TEST-013-03-04 |

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
4. `app/js/core/dom.js`
5. `app/js/app.js`
