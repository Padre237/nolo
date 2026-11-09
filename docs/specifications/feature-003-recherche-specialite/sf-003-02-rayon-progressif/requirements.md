# SF-003-02 — Recherche par rayon progressif et tri public — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-302, FR-303, FR-307) |
| Bloquant | Aucun |
| Dépend de | SF-003-01, SF-010-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Les structures visibles qui offrent la spécialité sont cherchées à 5 km, puis 10, 20 et 50 km, triées par ouverture puis distance, sans aucun critère commercial.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Voir les structures, leur état d'ouverture, la distance et l'itinéraire | Voir une structure non vérifiée ou payante en tête | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-302 | rayon initial 5 km ; paliers 10, 20, 50 km ; minimum 3 résultats. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-303 | tri par ouverture puis distance ; aucun critère commercial. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-307 | position arrondie à 2 décimales dans le journal. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-323 | Chaque résultat MUST afficher : nom, type, état d'ouverture (ouvert, ferme à, ouvre à), distance en km, modalités de la spécialité (consultation, jours) et un appel désactivé (numéros fictifs). | D-034 ; D-035 | Haute | UNDER_REVIEW |
| FR-324 | Quand le rayon a été élargi, l'écran MUST le dire (« élargi à N km »). | D-034 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-1029 (SF-010-07) : seuls les établissements vérifiés apparaissent

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-003-02-01 | Classement neutre, non payant | Principe VII ; `CMR-LOI-90-035::0017` (art. 19, publicité) |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-003-02-01 | FR-302 | Étant donné 1 neurologue à 12 km et 2 autres à 40 km, quand on cherche, alors le rayon s'élargit jusqu'à 50 km et 3 résultats s'affichent. | TEST-003-02-01 |
| CA-003-02-02 | FR-303 | Étant donné une structure fermée à 1 km et une ouverte à 3 km, quand on trie, alors l'ouverte vient d'abord. | TEST-003-02-02 |
| CA-003-02-03 | FR-307 | Étant donné une recherche journalisée côté serveur, quand on lit l'entrée, alors la position a 2 décimales. | TEST-003-02-03 |
| CA-003-02-04 | FR-323, FR-324 | Étant donné une recherche élargie, quand on lit les résultats, alors chaque ligne a ses éléments et la mention d'élargissement s'affiche. | TEST-003-02-04 |

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
5. `app/js/ui/components.js`
6. `app/js/screens/patient/chercher.js`
7. `kb/services/orientation_services.py`
