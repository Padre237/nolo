# SF-001-17 — Hors champ du modèle expérimental — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-17 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-033 (FR-DX-05, FR-DX-21) |
| Bloquant | Aucun |
| Dépend de | SF-001-15 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Quand la plainte n'est pas respiratoire ou que le modèle n'est pas assez sûr, Nolo le dit au lieu d'imposer une maladie, et oriente vers le centre de santé ouvert le plus proche.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Lire le message, trouver un centre de santé, produire la fiche | Recevoir une piste imposée | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1541 | `analyser` MUST renvoyer `hors_champ` (raison `non_respiratoire`) si aucun signe respiratoire n'est présent. | FR-DX-05 | Haute | UNDER_REVIEW |
| FR-1542 | `analyser` MUST renvoyer `hors_champ` (raison `faible`) si le score de la 1re piste est sous `seuilScore` ou sa couverture sous `seuilCouverture`. | FR-DX-05 | Haute | UNDER_REVIEW |
| FR-1543 | L'écran « Hors champ » MUST expliquer la raison en une phrase, proposer le centre de santé ouvert le plus proche et la fiche. | FR-DX-21 | Haute | UNDER_REVIEW |

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
| CA-001-17-01 | FR-1541 | Étant donné « diarrhée depuis hier », quand on analyse, alors `hors_champ` / `non_respiratoire`. | TEST-001-17-01 |
| CA-001-17-02 | FR-1542 | Étant donné « fièvre et frissons » (paludisme suspect), quand on analyse, alors `hors_champ`. | TEST-001-17-01 |
| CA-001-17-03 | FR-1543 | Étant donné l'écran Hors champ, quand il s'affiche, alors raison, centre de santé et lien vers la fiche. | TEST-001-17-02 |

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
4. `app/js/domain/engine.js`
5. `app/js/screens/patient/hors-champ.js`
