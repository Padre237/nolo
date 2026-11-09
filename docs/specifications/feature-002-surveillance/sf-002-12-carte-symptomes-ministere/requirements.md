# SF-002-12 — Carte interactive des symptômes pour le ministère — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-035 |
| Bloquant | Aucun |
| Dépend de | SF-002-02, SF-002-03, SF-013-06 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La console montre, pour un syndrome et une fenêtre de semaines, une carte des 10 régions (tracés Natural Earth, domaine public) colorée par classes, les signaux en anneaux, un panneau latéral (répartition, 12 semaines en colonnes) et le schéma des 12 aires du district de démonstration.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Analyste du ministère (démo) | Choisir syndrome et semaines, sélectionner une région ou une aire au clavier ou à la souris | Voir une valeur fine | Session ministère |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1606 | La carte MUST dessiner les 10 régions depuis `REGIONS_SVG` (généré par `app/tools/carte.py` à partir de Natural Earth admin-1, simplifié par Douglas-Peucker) et les colorer en 5 classes (`TEINTES`, `BORNES_REGION`). | D-035 | Haute | UNDER_REVIEW |
| FR-1607 | Le syndrome (segment de 4 boutons) et la fenêtre de semaines (curseur) MUST recalculer la carte, la légende et le panneau. | D-035 | Haute | UNDER_REVIEW |
| FR-1608 | Chaque région MUST être focusable (`tabindex=0`, `role=button`), activable au clavier (Entrée, Espace) et nommée par son libellé ; la région choisie est marquée et étiquetée. | D-035 ; SF-013-06 | Haute | UNDER_REVIEW |
| FR-1609 | Les régions avec un signal MUST porter un anneau ; la légende explique classes, hachures et anneau. | D-035 | Haute | UNDER_REVIEW |
| FR-1610 | Le schéma des aires MUST montrer les 12 aires en tuiles, hachurer les cellules < 5, et marquer l'aire signalée. | D-035 ; FR-225 | Haute | UNDER_REVIEW |
| FR-1611 | Le panneau MUST montrer la région choisie : total, répartition par syndrome, 12 semaines en colonnes avec tableau équivalent. | D-035 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-002-12-01 | Tracés : Natural Earth (domaine public) | `app/tools/carte.py` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-002-12-01 | FR-1606 | Étant donné la console, quand la carte s'affiche, alors 10 tracés et 5 classes de couleur. | TEST-002-12-01 |
| CA-002-12-02 | FR-1607 | Étant donné « éruption » et semaines 9 à 12, quand on change le syndrome, alors la carte et le panneau changent. | TEST-002-12-02 |
| CA-002-12-03 | FR-1608 | Étant donné le focus sur une région, quand on presse Entrée, alors elle devient la région choisie. | TEST-002-12-03 |
| CA-002-12-04 | FR-1609, FR-1610 | Étant donné le syndrome diarrhée, quand on lit la carte et le schéma, alors un anneau sur la région du district et AS-07 marquée ; cellules < 5 hachurées. | TEST-002-12-04 |
| CA-002-12-05 | FR-1611 | Étant donné une région choisie, quand on lit le panneau, alors total, répartition et 12 colonnes avec tableau. | TEST-002-12-05 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-002-surveillance/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/ui/carte.js`
5. `app/js/domain/carte-regions.js`
6. `app/tools/carte.py`
7. `app/js/screens/ministere/console.js`
8. `app/js/app.js`
