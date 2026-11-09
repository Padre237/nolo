# SF-007-16 — Analyse d'impact versionnée — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-16 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Rédigé (2026-11-09, D-038) : projet 0.1.0 à relire par le juriste |
| Origine | Spécification v1.3 (FR-708) ; art. 33 |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Une analyse d'impact sur la protection des données (modèle RGPD art. 35) est versionnée dans le dépôt en attendant le décret camerounais.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe, juriste | Rédiger et relire | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-708 | une analyse d'impact (modèle RGPD art. 35) est versionnée dans le dépôt, en attendant le décret camerounais. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-787 | L'analyse MUST couvrir chaque finalité (orientation, surveillance, signalements, tendances, comptes d'établissement), ses risques, ses mesures et le module POC. | D-033 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-007-16-01 | Analyse d'impact préalable pour les traitements à risque élevé | `CMR-LOI-2024-017::0034` ; `INT-UE-RGPD-2016-679::0143` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-007-16-01 | FR-708, FR-787 | Étant donné le dépôt, quand on ouvre `docs/compliance/aipd.md`, alors les cinq finalités et le POC, avec risques et mesures. | TEST-007-16-01 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-007-gouvernance/README.md`
3. les quatre fichiers de ce dossier
4. `docs/compliance/aipd.md`
