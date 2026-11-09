# SF-007-21 — Journal d'audit chaîné dans Nolo et sa vérification — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-21 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | AG-03 |
| Bloquant | Aucun |
| Dépend de | SF-007-17 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Nolo tient sur l'appareil un journal chaîné (SHA-256, WebCrypto) des décisions, sans donnée personnelle ; la console le montre et vérifie la chaîne : une entrée modifiée est désignée.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Auditeur, jury | Lire et vérifier | Modifier sans que ce soit vu | Session ministère pour la vue |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1941 | Chaque décision de `orchestrateur.executer` MUST écrire une entrée chaînée (`hash_precedent`, `hash`) avec les champs de FR-760, sans champ interdit (FR-713). | AG-03 | Haute | UNDER_REVIEW |
| FR-1942 | La console MUST afficher le journal (agent, action, décision, fragments, version) et un bouton « Vérifier la chaîne » qui désigne la première entrée invalide. | AG-03 | Haute | UNDER_REVIEW |
| FR-1943 | Un mode démonstration « altérer une entrée » MUST permettre de montrer la détection, puis restaurer. | AG-03 | Moyenne | UNDER_REVIEW |
| FR-1944 | Les empreintes MUST être identiques à celles que calcule `src/server/gouvernance/journal.py` pour la même entrée canonique. | AG-03 ; AG-04 | Haute | UNDER_REVIEW |

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
| CA-007-21-01 | FR-1941 | Étant donné un parcours avec pistes, quand on lit le journal, alors une entrée par décision, chaînée, sans texte libre. | TEST-007-21-01 |
| CA-007-21-02 | FR-1942, FR-1943 | Étant donné une entrée altérée, quand on vérifie, alors elle est désignée ; après restauration, chaîne valide. | TEST-007-21-02 |
| CA-007-21-03 | FR-1944 | Étant donné une entrée canonique, quand on calcule l'empreinte en JS et en Python, alors même valeur. | TEST-007-21-03 |

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
4. `app/js/agents/journal.js`
5. `app/js/screens/ministere/console.js`
