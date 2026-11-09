# SF-001-12 — Numéros d'urgence et barre de sécurité — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-114) ; D-004 (Proposé) |
| Bloquant | D-004 |
| Dépend de | SF-007-01, SF-013-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Les numéros d'urgence affichés viennent d'une source, avec leur statut ; un numéro non confirmé n'est jamais affiché. La barre de sécurité reste visible partout, sauf sur l'écran d'urgence qui la remplace.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Appeler le 119 ou le 112 | Voir un numéro non sourcé (le 111) | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-114 | les numéros d'urgence affichés MUST provenir de `policy.yaml > numeros_urgence` (valeur, source, statut) ; un numéro au statut `a_confirmer` n'est pas affiché. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-195 | La barre de sécurité (`barreSecurite`) MUST être fixe en bas de chaque écran citoyen et proposer « Appeler le 119 » et « Appeler le 112 » ; elle est masquée sur l'écran d'urgence, qui affiche ses propres appels en grand. | D-034 | Haute | UNDER_REVIEW |
| FR-196 | Les numéros affichés par Nolo MUST être lus depuis la politique (`policy.yaml` converti, SF-007-17) et non écrits dans les catalogues. | FR-114 ; écart constaté | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-12-01 | 119 (assistance médicale) et 112 ; 1510 pour signaler un événement de santé ; 111 écarté faute de source | D-004 (Proposé) |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-12-01 | FR-114, FR-196 | Étant donné `numeros_urgence` avec 111 `a_confirmer`, quand Nolo s'affiche, alors seuls 119 et 112 apparaissent. | TEST-001-12-01 |
| CA-001-12-02 | FR-195 | Étant donné n'importe quel écran citoyen, quand on fait défiler, alors la barre reste visible et ne masque pas le pied de page ; sur l'écran Urgence elle est absente. | TEST-001-12-02 |

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
4. `app/js/ui/components.js`
5. `app/css/components.css`
6. `app/js/domain/politique.js`
