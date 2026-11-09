# SF-008-06 — Droits face à la décision automatisée — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-06 |
| Version | 2.0.0 |
| Statut | APPROVED |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |
| Origine | Spécification v1.3 (FR-108) ; art. 44 ; D-014 (Proposé) |
| Bloquant | D-014 |
| Dépend de | SF-001-09 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Chaque écran de résultat rappelle trois droits : demander une intervention humaine, donner son point de vue, contester.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Exercer ses droits | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-108 | chaque réponse MUST afficher les droits : intervention humaine, point de vue, contestation. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-851 | Le bloc des droits MUST apparaître sur les écrans pistes, hors champ, confidentiel, urgence et « Où aller », dans la langue de l'interface, avec un lien vers la section « Décision automatisée » des conditions. | Art. 44 ; FR-108 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-008-06-01 | Droits d'intervention humaine, d'exprimer son point de vue et de contester | `CMR-LOI-2024-017::0044` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-008-06-01 | FR-108, FR-851 | Étant donné chacun des cinq écrans, quand il s'affiche, alors le bloc des trois droits et le lien sont présents. | TEST-008-06-01 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-008-consentements-droits/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/ui/components.js`
