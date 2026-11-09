# SF-012-04 — Données fictives de Nolo — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-033 ; D-034 ; D-035 |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Nolo embarque ses propres données fictives : la tuile du district, les comptes de démonstration, les séries de surveillance (10 régions, 12 aires, 12 semaines, deux regroupements injectés), les tendances et les tracés des régions.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Modifier les données fictives | Utiliser des données réelles de personnes ou d'établissements | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1211 | Les séries de surveillance MUST être déterministes (`hasard` à graine) et contenir exactement deux regroupements injectés (AS-07 diarrhée : 7, 15, 24 aux semaines 10 à 12 ; Nord éruption : +16, +29 aux semaines 11 et 12). | D-035 | Haute | UNDER_REVIEW |
| FR-1212 | Les tracés des régions MUST être produits par `app/tools/carte.py` depuis Natural Earth admin-1 (domaine public), simplifiés, et versionnés dans `app/js/domain/carte-regions.js`. | D-035 | Haute | UNDER_REVIEW |
| FR-1213 | Toutes les données de Nolo MUST être fictives et marquées : en-têtes de fichiers, mentions à l'écran (ambre réservé aux données fictives et au POC), numéros désactivés. | Règles du hackathon ; D-034 | Haute | UNDER_REVIEW |

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
| CA-012-04-01 | FR-1211 | Étant donné deux exécutions, quand on compare les séries, alors identiques ; `signaux()` rend les deux regroupements. | TEST-012-04-01 |
| CA-012-04-02 | FR-1212 | Étant donné `app/tools/carte.py`, quand on le relance sur la même source, alors le même fichier. | TEST-012-04-02 |
| CA-012-04-03 | FR-1213 | Étant donné les écrans de démonstration, quand on les inspecte, alors mentions fictives présentes. | TEST-012-04-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-012-donnees-scenarios/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/surveillance.js`
5. `app/tools/carte.py`
6. `app/js/domain/carte-regions.js`
7. `app/js/domain/*.js`
8. `app/css/tokens.css`
