# SF-012-01 — Patients et séries de surveillance synthétiques (référence Python) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Base v3 |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Des patients synthétiques (17 profils, 600 consultations) et des séries hebdomadaires (loi de Poisson, regroupement injecté) servent aux scénarios Python.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Régénérer | Utiliser des données réelles | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1201 | `kb/generate_synthetic.py` MUST régénérer `kb/data/synthetic/patients.csv` et `surveillance_hebdo.csv` à graine fixe. | Base v3 | Haute | UNDER_REVIEW |
| FR-1202 | Les métadonnées AI Readiness 2.0 (origine, volume, biais et limites) MUST être publiées pour chaque jeu. | AI Readiness 2.0 | Haute | UNDER_REVIEW |

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
| CA-012-01-01 | FR-1201 | Étant donné la graine, quand on régénère, alors fichiers identiques. | TEST-012-01-01 |
| CA-012-01-02 | FR-1202 | Étant donné le README de la base, quand on le lit, alors une ligne de métadonnées par jeu. | TEST-012-01-02 |

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
4. `kb/generate_synthetic.py`
5. `kb/README.md`
