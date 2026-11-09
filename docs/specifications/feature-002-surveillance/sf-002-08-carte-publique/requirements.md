# SF-002-08 — Carte épidémiologique publique — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | Spécification v1.3 (FR-208) ; D-007 |
| Bloquant | Aucun |
| Dépend de | SF-002-02 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Une carte publique, décalée de 7 jours et sans cellule sous le seuil, informe la population sans permettre de reconnaître quiconque.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Public | Consulter la carte | Voir une cellule fine ou la semaine en cours | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-208 | carte publique décalée de 7 jours, cellules sous le seuil masquées (valeur confirmée par l'équipe le 2026-11-03). | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-255 | La carte publique MUST être une vue en lecture seule de la carte du ministère, limitée aux régions, sans signal ni décision. | D-035 | Moyenne | UNDER_REVIEW |

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
| CA-002-08-01 | FR-208 | Étant donné la semaine en cours et la précédente, quand on ouvre la carte publique, alors seules les semaines antérieures à J−7 ; aucune cellule < 5. | TEST-002-08-01 |
| CA-002-08-02 | FR-255 | Étant donné la carte publique, quand on l'inspecte, alors aucune liste de signaux ni bouton de décision. | TEST-002-08-02 |

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
4. `app/js/screens/patient/carte.js`
