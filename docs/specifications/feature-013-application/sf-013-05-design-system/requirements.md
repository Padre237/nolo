# SF-013-05 — Design system « Premium Medical Intelligence » — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-034 ; `app/docs/DIRECTION.md`, `app/docs/DESIGN.md` |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une identité unique et reconnaissable, inspirée de la signalétique hospitalière : motif points → ligne → anneau, typographie Atkinson Hyperlegible Next (OFL, auto-hébergée), palette forêt et menthe, rouge réservé à l'urgence, ambre réservé aux données fictives et au POC ; aucun tableau de bord SaaS générique.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Créer un écran | Introduire une couleur ou une police hors système | Revue |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1320 | Couleurs, espacements, rayons, courbes et durées MUST venir des jetons de `app/css/tokens.css` ; aucune valeur de couleur en dur hors de ce fichier. | D-034 | Haute | UNDER_REVIEW |
| FR-1321 | Les polices MUST être Atkinson Hyperlegible Next et Mono, servies depuis `app/assets/fonts/` avec leur licence OFL. | D-034 | Haute | UNDER_REVIEW |
| FR-1322 | Le rouge MUST être réservé à l'urgence et l'ambre aux données fictives et au module POC. | D-034 | Haute | UNDER_REVIEW |
| FR-1323 | Les composants partagés MUST être ceux de `app/js/ui/components.js` et `app/css/components.css` (bouton, choix, champ, puce, étiquette, panneau, encart, ligne de structure, motif) ; un nouvel écran n'en crée pas d'équivalent. | D-034 | Moyenne | UNDER_REVIEW |
| FR-1324 | `app/docs/DESIGN.md` MUST décrire chaque jeton et composant et être mis à jour avec eux. | D-034 | Moyenne | UNDER_REVIEW |

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
| CA-013-05-01 | FR-1320 | Étant donné `app/css/*.css` hors `tokens.css`, quand on cherche des couleurs en dur (`#`, `rgb(`), alors seulement les exceptions listées dans `DESIGN.md`. | TEST-013-05-01 |
| CA-013-05-02 | FR-1321 | Étant donné le réseau, quand l'application se charge, alors aucune police externe ; `OFL-atkinson.txt` présent. | TEST-013-05-02 |
| CA-013-05-03 | FR-1322 | Étant donné les usages de `--urgence*` et `--ambre*`, quand on les liste, alors conformes à leur réservation. | TEST-013-05-03 |
| CA-013-05-04 | FR-1323, FR-1324 | Étant donné `DESIGN.md`, quand on compare aux composants, alors chacun est documenté. | TEST-013-05-04 |

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
4. `app/css/tokens.css`
5. `app/assets/fonts/`
6. `app/js/ui/components.js`
7. `app/css/components.css`
8. `app/docs/DESIGN.md`
