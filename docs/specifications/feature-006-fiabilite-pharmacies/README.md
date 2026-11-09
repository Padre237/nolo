# F-006 — Fiabilité des déclarations

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Spécification v1.3 006 ; D-001 à D-003 ; D-030 |
| Plage FR | FR-620 à FR-699 |
| Plage NFR | NFR-601 à NFR-699 |

## Objectif
Laisser les usagers signaler si un médicament déclaré était réellement disponible, calculer un score public lissé, résister aux rafales de faux signalements et garantir la contestation.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-006-01](sf-006-01-soumission-signalement/requirements.md) | Soumission d'un signalement | FR-601, FR-602, FR-603, FR-608, FR-620, FR-621 | UNDER_REVIEW | Partiellement implémenté | SF-008-09, SF-007-03 | Aucun | P0 |
| [SF-006-02](sf-006-02-calcul-score/requirements.md) | Calcul et affichage du score | FR-604 | UNDER_REVIEW | Non implémenté | SF-006-01 | Aucun | P0 |
| [SF-006-03](sf-006-03-departage/requirements.md) | Départage des pharmacies proches | FR-605 | UNDER_REVIEW | Non implémenté | SF-006-01 | Aucun | P0 |
| [SF-006-04](sf-006-04-rafale-gel/requirements.md) | Détection de rafale et gel | FR-606 | UNDER_REVIEW | Non implémenté | SF-006-01 | Aucun | P0 |
| [SF-006-05](sf-006-05-decision-rafale/requirements.md) | Décision du modérateur sur une rafale | FR-610 | UNDER_REVIEW | Non implémenté | SF-006-01 | Aucun | P0 |
| [SF-006-06](sf-006-06-contestation/requirements.md) | Contestation par la pharmacie | FR-607 | UNDER_REVIEW | Non implémenté | SF-006-01 | Aucun | P1 |
| [SF-006-07](sf-006-07-consultation-pharmacie/requirements.md) | Consultation de son score par la pharmacie | FR-622 | UNDER_REVIEW | Non implémenté | SF-006-01 | Aucun | P1 |
| [SF-006-08](sf-006-08-signalement-sensible/requirements.md) | Signalement sur une classe sensible | FR-609 | UNDER_REVIEW | Partiellement implémenté | SF-006-01 | Aucun | P1 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

