# SF-007-18 — Panneau « Comment Nolo a décidé » — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-18 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | AG-05 |
| Bloquant | Aucun |
| Dépend de | SF-007-17, SF-007-21, SF-011-08 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Sur chaque écran de résultat, un panneau déroulant montre la chaîne des agents qui ont produit la réponse, le nœud Y.3172 de chaque étape, la décision et l'article cité (identifiant, extrait court, statut de vérification).

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen, jury, auditeur | Déplier et lire la chaîne | Voir une donnée personnelle dans la chaîne | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1911 | Les écrans pistes, urgence, confidentiel, hors champ, « Où aller » et recherche MUST offrir un panneau repliable « Comment Nolo a décidé ». | AG-05 | Haute | UNDER_REVIEW |
| FR-1912 | Le panneau MUST lister, dans l'ordre, chaque étape : agent, nœud Y.3172 (SRC, C, PP, M, P, D, SINK), décision, fragments cités. | AG-05 ; Y.3172 | Haute | UNDER_REVIEW |
| FR-1913 | Chaque fragment cité MUST afficher son identifiant, son article, un extrait d'au plus 240 caractères tiré de la base embarquée et le statut de vérification de la source (vérifié, OCR, transcription non officielle). | AG-05 ; D-027 | Haute | UNDER_REVIEW |
| FR-1914 | Le panneau MUST n'afficher aucun texte libre de la personne ni aucun signe de catégorie protégée. | Principe XI | Haute | UNDER_REVIEW |
| FR-1915 | En anglais, l'extrait MUST être la version anglaise officielle quand elle existe, sinon la traduction non officielle marquée comme telle. | D-027 ; `kb/traductions/citations_en.yaml` | Haute | UNDER_REVIEW |

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
| CA-007-18-01 | FR-1911 | Étant donné chacun des six écrans, quand il s'affiche, alors le panneau repliable est présent. | TEST-007-18-01 |
| CA-007-18-02 | FR-1912 | Étant donné l'écran Urgence, quand on déplie, alors au moins : Reformulation (PP), Signes de danger (M), Conformité (P), Orientation (SINK). | TEST-007-18-02 |
| CA-007-18-03 | FR-1913 | Étant donné un fragment cité, quand on lit sa ligne, alors identifiant, article, extrait ≤ 240 caractères et statut. | TEST-007-18-03 |
| CA-007-18-04 | FR-1914 | Étant donné un parcours avec texte libre, quand on lit le panneau, alors aucun mot du texte. | TEST-007-18-04 |
| CA-007-18-05 | FR-1915 | Étant donné l'interface en anglais et un article de la loi 2019/019, quand on déplie, alors l'extrait anglais officiel ; pour la loi 2024/017, la traduction marquée « Unofficial translation ». | TEST-007-18-05 |

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
4. `app/js/ui/decision.js`
5. `app/js/domain/base.js`
