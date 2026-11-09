# SF-013-04 — Deux langues d'égale valeur et typographie française — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-027 ; loi 2019/019 ; Principe XIV |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Toute l'interface existe en français et en anglais, avec exactement les mêmes clés ; la langue se choisit et se garde ; la typographie française est corrigée automatiquement.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen, professionnel | Choisir sa langue | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1315 | Les catalogues `fr.js` et `en.js` MUST avoir exactement les mêmes clés, aucune valeur vide, et des listes de même longueur. | D-027 ; CA-CONS-07 | Haute | UNDER_REVIEW |
| FR-1316 | La langue initiale MUST être la langue gardée, sinon celle du navigateur (anglais si elle commence par `en`, sinon français) ; la bascule la garde (`nolo:langue`). | D-027 | Haute | UNDER_REVIEW |
| FR-1317 | `typoFr` MUST insérer une espace fine insécable avant ? ! ; et une insécable avant : et entre un nombre et son unité (« 18 ans »). | D-034 | Moyenne | UNDER_REVIEW |
| FR-1318 | `translator(lang)` MUST rendre `t(cle, params)`, `t.list`, `t.num`, `t.km` ; une clé absente est signalée en développement et rendue telle quelle. | D-034 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-013-04-01 | Anglais et français, langues officielles d'égale valeur | `CMR-LOI-2019-019::0002` ; `CMR-LOI-2019-019::0005` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-013-04-01 | FR-1315 | Étant donné les catalogues, quand on compare, alors mêmes clés, aucun vide, listes égales. | TEST-013-04-01 |
| CA-013-04-02 | FR-1316 | Étant donné un navigateur en `en-GB` sans choix gardé, quand Nolo démarre, alors anglais ; après bascule, le choix est gardé. | TEST-013-04-02 |
| CA-013-04-03 | FR-1317 | Étant donné « Pourquoi ? 18 ans », quand on applique `typoFr`, alors espace fine avant ? et insécable dans « 18 ans ». | TEST-013-04-03 |
| CA-013-04-04 | FR-1318 | Étant donné une clé absente, quand on appelle `t`, alors la clé est rendue telle quelle ; `t.list` rend un tableau, `t.km(2.5)` « 2,5 km » en français. | TEST-013-04-04 |

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
4. `app/js/i18n/fr.js`
5. `app/js/i18n/en.js`
6. `app/js/core/i18n.js`
7. `app/js/etat.js`
