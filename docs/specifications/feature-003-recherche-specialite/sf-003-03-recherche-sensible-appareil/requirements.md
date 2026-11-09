# SF-003-03 — Spécialités sensibles : recherche sur l'appareil, jamais comptée — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-305, FR-308) ; D-032 |
| Bloquant | Aucun |
| Dépend de | SF-003-02, SF-014-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une recherche de gynécologie-obstétrique, psychiatrie, oncologie ou infectiologie se fait sur le téléphone, n'entre ni dans un journal nominatif ni dans un historique, et n'est jamais comptée dans les tendances.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Chercher une spécialité sensible | Voir sa recherche conservée | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-305 | recherches sensibles hors journal nominatif et hors historique. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-308 | les spécialités pouvant révéler la vie sexuelle (gynécologie-obstétrique, planification familiale, infectiologie VIH) MUST être recherchées sur l'appareil à partir de la liste téléchargée en bloc ; le serveur ne reçoit pas la requête. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-325 | Pour une spécialité de `SPECIALITES_SENSIBLES`, l'écran MUST afficher la note « recherche faite sur votre téléphone, jamais comptée » au lieu de la note de comptage anonyme. | D-032 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-003-03-01 | Art. 48 : vie sexuelle | `CMR-LOI-2024-017::0048` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-003-03-01 | FR-305, FR-308 | Étant donné une recherche de psychiatrie, quand on observe le réseau et le stockage, alors aucune requête et aucune trace. | TEST-003-03-01 |
| CA-003-03-02 | FR-325 | Étant donné une spécialité sensible, quand les résultats s'affichent, alors la note « sur votre téléphone » remplace la note de comptage. | TEST-003-03-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-003-recherche-specialite/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/facilities.js`
5. `app/js/screens/patient/chercher.js`
