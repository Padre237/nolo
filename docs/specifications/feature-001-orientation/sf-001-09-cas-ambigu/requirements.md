# SF-001-09 — Cas ambigu : relèvement prudent et renvoi vers un soignant — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-09 |
| Version | 2.0.0 |
| Statut | APPROVED |
| État d'implémentation | Non implémenté |
| Origine | Catalogue v1 ; D-013 (Proposé) |
| Bloquant | D-013 |
| Dépend de | SF-001-07, SF-008-06 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Quand l'information est insuffisante (aucun signe reconnu, âge incertain), le système ne devine pas : il relève prudemment, propose la liste fermée et rappelle la possibilité de parler à un soignant.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Compléter avec la liste ; demander une intervention humaine | Recevoir une piste sans signe reconnu | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-180 | Si aucun signe n'est reconnu dans la description, le système MUST proposer la liste fermée des signes au lieu de conclure. | D-026 | Haute | UNDER_REVIEW |
| FR-181 | Si la part de passages non reconnus dépasse le seuil `ambiguite` (0,7 proposé, D-013), le système MUST l'indiquer et proposer la liste. | D-013 (Proposé) | Moyenne | UNDER_REVIEW |
| FR-182 | Tout écran de résultat MUST offrir l'accès à une intervention humaine (art. 44). | Art. 44 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-108 (SF-008-06) : droits affichés

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
| CA-001-09-01 | FR-180 | Étant donné « blabla », quand on analyse, alors l'écran « Vérifier » ne montre aucun signe et propose la liste. | TEST-001-09-01 |
| CA-001-09-02 | FR-181 | Étant donné un texte dont 80 % des segments ne sont pas reconnus, quand on analyse, alors la mention « une partie n'a pas été comprise » s'affiche. | TEST-001-09-02 |
| CA-001-09-03 | FR-182 | Étant donné l'écran des pistes, du hors champ ou de l'urgence, quand il s'affiche, alors le lien « Parler à un soignant » est présent. | TEST-001-09-03 |

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
4. `app/js/screens/patient/verifier.js`
5. `app/js/ui/components.js`
