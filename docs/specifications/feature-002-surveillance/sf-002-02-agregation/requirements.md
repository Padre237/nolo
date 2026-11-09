# SF-002-02 — Agrégation par aire et semaine avec seuil de 5 — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-202) ; D-007 |
| Bloquant | Aucun |
| Dépend de | SF-002-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le système ne manipule que des agrégats (aire de santé × semaine × syndrome). Sous 5 cas, rien n'est publié ; la carte publique est décalée de 7 jours.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Ministère, point focal | Lire les agrégats | Voir une cellule de moins de 5 cas en clair | Session ministère |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-202 | agrégation par aire de santé et semaine épidémiologique ; seuil minimal de 5 cas par cellule pour tout affichage (valeur confirmée par l'équipe le 2026-11-03). | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-225 | `publiable(n)` MUST renvoyer faux sous `SEUIL` (5) ; une cellule non publiable s'affiche hachurée « moins de 5 », jamais avec son nombre. | D-007 | Haute | UNDER_REVIEW |
| FR-226 | Les syndromes MUST être : respiratoire, fièvre, diarrhée, éruption (`SYNDROMES`), regroupant des codes `SYM-NNN`. | D-035 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-002-02-01 | Seuil de 5 cas et décalage de 7 jours | `config/policy.yaml > surveillance` ; D-007 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-002-02-01 | FR-202, FR-225 | Étant donné une aire à 3 cas, quand on l'affiche, alors hachures et « moins de 5 », sans le nombre. | TEST-002-02-01 |
| CA-002-02-02 | FR-226 | Étant donné la console, quand on lit le sélecteur, alors les quatre syndromes. | TEST-002-02-02 |

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
4. `app/js/domain/surveillance.js`
5. `app/js/ui/carte.js`
