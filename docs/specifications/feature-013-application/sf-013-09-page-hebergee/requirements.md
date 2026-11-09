# SF-013-09 — Page hébergée dans un cadre (artefact) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-034 |
| Bloquant | Aucun |
| Dépend de | SF-013-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Publiée comme page hébergée dans un cadre, Nolo s'adapte aux refus du cadre : pas d'impression, pas de téléchargement, pas de géolocalisation, pas de service worker.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Visiteur de la page hébergée | Utiliser Nolo | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1340 | `encadre` MUST valoir vrai quand `window.self !== window.top` (ou en cas d'erreur d'accès). | D-034 | Haute | UNDER_REVIEW |
| FR-1341 | Dans un cadre, le bouton d'impression MUST être masqué et le téléchargement du modèle de stock remplacé par « Copier le modèle ». | D-034 | Haute | UNDER_REVIEW |
| FR-1342 | Dans un cadre, la position MUST être demandée sans erreur bloquante (repli sur la commune ou le point de référence). | D-034 | Moyenne | UNDER_REVIEW |

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
| CA-013-09-01 | FR-1340, FR-1341 | Étant donné la page dans un cadre, quand on ouvre la fiche et le stock, alors pas d'impression et « Copier le modèle ». | TEST-013-09-01 |
| CA-013-09-02 | FR-1342 | Étant donné la géolocalisation refusée, quand on s'inscrit, alors la commune suffit. | TEST-013-09-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-013-application/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/etat.js`
5. `app/js/screens/patient/fiche.js`
6. `app/js/screens/pro/vue-stock.js`
7. `app/js/screens/pro/inscription.js`
