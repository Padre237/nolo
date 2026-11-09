# SF-001-04 — Chargement et contrôle du paquet de règles de triage (moteur v1) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-113) ; D-006 ; D-025 |
| Bloquant | Aucun |
| Dépend de | SF-007-01, SF-001-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le moteur v1 (`src/client/ondevice/`) charge un paquet versionné (règles PCIME et IITT v2, référentiel, mention de démonstration) dont l'intégrité est vérifiée. Hors du mode démonstration, il refuse un paquet sans validateur clinique.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe (mainteneur) | Construire le paquet | Publier un paquet sans validateur hors démo | Mode `demo_synthetique` pour les règles non validées |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-113 | le système MUST refuser de charger un fichier de règles de triage dont le champ `validateur_clinique` est vide hors du mode `demo_synthetique` ; en mode démo, la mention de démonstration est affichée. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-160 | `tools/demo/construire_paquet.py` MUST produire `src/client/ondevice/paquet_triage.json` contenant les règles v2, le référentiel, les empreintes SHA-256 de chaque source et la mention de démonstration. | D-025 | Haute | UNDER_REVIEW |
| FR-161 | Au chargement, le moteur MUST recalculer les empreintes et refuser un paquet dont une empreinte diffère. | D-025 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-714 (SF-007-07) : détermination du mode

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-04-01 | Règles non validées cliniquement pour le Cameroun | `config/policy.yaml > triage.validation_clinique_obtenue: false` ; lacune V7 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-04-01 | FR-113 | Étant donné un paquet sans validateur, quand le mode est `complet`, alors le chargement est refusé ; en `demo_synthetique`, il est accepté et la mention s'affiche. | TEST-001-04-01 |
| CA-001-04-02 | FR-160 | Étant donné les sources v2, quand on lance la construction, alors le paquet contient règles, référentiel, empreintes et mention. | TEST-001-04-02 |
| CA-001-04-03 | FR-161 | Étant donné une règle modifiée après construction, quand le moteur charge le paquet, alors il le refuse. | TEST-001-04-03 |

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
4. `tools/demo/construire_paquet.py`
5. `src/client/ondevice/moteur_triage.mjs`
