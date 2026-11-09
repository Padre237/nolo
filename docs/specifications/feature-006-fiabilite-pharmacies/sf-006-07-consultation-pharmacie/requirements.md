# SF-006-07 — Consultation de son score par la pharmacie — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | Spécification v1.3 ; D-001 à D-003 |
| Bloquant | Aucun |
| Dépend de | SF-006-01 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
La pharmacie voit son score et ses motifs agrégés, jamais les signalements individuels.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Modérateur, pharmacie ou citoyen | Selon la règle | Voir une identité | Compte vérifié pour la pharmacie |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-622 | Une pharmacie vérifiée MUST voir son propre score, son évolution et les motifs agrégés, jamais les signalements individuels ni les pseudonymes. | Catalogue v1 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-006-07-01 | Paramètres | `kb/rules/fiabilite_pharmacies.yaml` ; D-001, D-002, D-003 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-006-07-01 | FR-622 | Étant donné une pharmacie vérifiée, quand elle ouvre sa vue, alors son score et des motifs agrégés, aucun pseudonyme. | TEST-006-07-01 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-006-fiabilite-pharmacies/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/pro/vue-fiabilite.js`
