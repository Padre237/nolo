# SF-013-02 — Routes, gardes et interface des écrans — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-02 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | D-034 |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Un routeur par fragment d'URL (`#/route/param`) choisit l'écran par la plus longue correspondance ; une garde renvoie vers le consentement ; chaque écran suit la même interface.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Application | Router | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1305 | `lireRoute()` MUST choisir la route la plus longue qui correspond (`pro/tableau` avant `pro`) et passer le reste comme paramètres. | D-034 | Haute | UNDER_REVIEW |
| FR-1306 | Hors `SANS_CONSENTEMENT`, une route MUST rediriger vers `#/bienvenue` si le consentement n'est pas valide (remplacement d'historique, avec repli). | D-028 | Haute | UNDER_REVIEW |
| FR-1307 | Chaque écran MUST exporter `{ id, titre(ctx), chrome(ctx), garde?(ctx), render(ctx), actions?, apres? }` ; `titre` alimente `document.title`. | D-034 | Haute | UNDER_REVIEW |
| FR-1308 | Le rendu MUST produire une seule balise `h1` par écran dans `main`. | SF-013-06 | Haute | UNDER_REVIEW |

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
| CA-013-02-01 | FR-1305 | Étant donné `#/pro/tableau/stock`, quand on lit la route, alors écran `pro/tableau`, paramètre `stock`. | TEST-013-02-01 |
| CA-013-02-02 | FR-1306 | Étant donné aucun consentement, quand on ouvre `#/decrire`, alors `#/bienvenue`. | TEST-013-02-02 |
| CA-013-02-03 | FR-1307, FR-1308 | Étant donné chaque écran, quand on inspecte, alors l'interface est respectée et un seul h1. | TEST-013-02-03 |

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
4. `app/js/app.js`
