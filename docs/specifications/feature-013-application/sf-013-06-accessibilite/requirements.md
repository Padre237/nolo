# SF-013-06 — Accessibilité — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-06 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | D-034 ; WCAG 2.2 AA (cible) |
| Bloquant | Aucun |
| Dépend de | SF-013-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Nolo se lit et s'utilise au clavier et au lecteur d'écran, avec des cibles d'au moins 44 px, un focus visible, un lien d'évitement et des textes d'erreur reliés.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Toute personne | Utiliser Nolo au clavier ou au lecteur d'écran | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1326 | Toute cible interactive MUST mesurer au moins 44 × 44 px, sauf les colonnes de graphique qui ont un tableau équivalent. | D-034 | Haute | UNDER_REVIEW |
| FR-1327 | Le focus MUST être visible (`--focus`, `--focus-sur-sombre` sur fond sombre) sur tout élément interactif. | D-034 | Haute | UNDER_REVIEW |
| FR-1328 | Un lien d'évitement MUST mener au contenu principal ; chaque écran a un seul h1 ; les erreurs sont reliées par `aria-describedby`. | D-034 | Haute | UNDER_REVIEW |
| FR-1329 | Un bouton indisponible MUST rester focusable et expliquer pourquoi (`data-inactif` + texte), jamais `aria-disabled` seul. | Correction du 2026-11-09 | Haute | UNDER_REVIEW |
| FR-1330 | Les textes MUST respecter un contraste AA (4,5:1 ; 3:1 pour les grands textes et les traits d'interface). | WCAG 2.2 | Haute | UNDER_REVIEW |

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
| CA-013-06-01 | FR-1326 | Étant donné 39 états à 360, 390, 768 et 1440 px, quand on mesure, alors aucune cible < 44 px hors colonnes de graphique. | TEST-013-06-01 |
| CA-013-06-02 | FR-1327, FR-1328 | Étant donné la navigation au clavier, quand on tabule, alors focus visible ; le lien d'évitement apparaît en premier. | TEST-013-06-02 |
| CA-013-06-03 | FR-1329 | Étant donné « Voir mes pistes » indisponible, quand on le touche, alors la raison est annoncée. | TEST-013-06-03 |
| CA-013-06-04 | FR-1330 | Étant donné les paires de jetons texte/fond, quand on calcule les contrastes, alors ≥ 4,5:1. | TEST-013-06-04 |

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
4. `app/css/base.css`
5. `app/css/components.css`
6. `app/css/tokens.css`
