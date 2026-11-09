# SF-012-05 — Scénario S4 : module POC gouverné et non gouverné — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | D-033 (FR-DX-09) |
| Bloquant | Aucun |
| Dépend de | SF-001-15, SF-007-17, SF-007-20 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Le scénario S4 montre le module POC sous gouvernance (aucune violation) et sans (scores bruts sur toutes les pathologies, hypothèse malgré une urgence, art. 48 nommé, spécialité envoyée au serveur…).

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe, jury | Exécuter S4 | — | Mode démo |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1216 | S4 MUST produire deux rapports (gouverné / non gouverné) ; chaque violation de la taxonomie POC apparaît au moins une fois sans gouvernance, aucune avec. | FR-DX-09 | Haute | UNDER_REVIEW |
| FR-1217 | La taxonomie POC MUST comprendre : hypothèse affichée malgré une urgence, maladie imposée hors champ, catégorie art. 48 nommée ou transmise, score présenté comme une probabilité, lien vers un médicament, spécialité ou type de structure dérivé envoyé au serveur, structure moins équipée que requis. | FR-DX-09 | Haute | UNDER_REVIEW |

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
| CA-012-05-01 | FR-1216, FR-1217 | Étant donné S4, quand on l'exécute deux fois, alors 7 violations nommées sans gouvernance, 0 avec. | TEST-012-05-01 |

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
4. `tools/scenarios/executer.py`
5. `app/js/agents/ab.js`
