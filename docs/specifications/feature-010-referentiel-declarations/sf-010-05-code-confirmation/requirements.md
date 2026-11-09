# SF-010-05 — Code de confirmation de l'e-mail — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-029b ; CA-ETS-03 |
| Bloquant | Aucun |
| Dépend de | SF-010-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le compte n'est actif qu'après saisie d'un code à 6 chiffres envoyé à l'e-mail ; dans le prototype, l'envoi est simulé et le code est affiché.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement | Saisir le code, en demander un nouveau | Envoyer une fiche sans code | Inscription faite |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1023 | Un code de 6 chiffres (`codeConfirmation`) MUST être créé à l'inscription, valable 15 minutes et à usage unique. | D-029b | Haute | UNDER_REVIEW |
| FR-1024 | Sans code valide, le compte MUST rester `EMAIL_NON_CONFIRME` et ne pas pouvoir envoyer de fiche. | CA-ETS-03 | Haute | UNDER_REVIEW |
| FR-1025 | Dans le prototype, le code MUST être affiché dans une boîte « courrier simulé » clairement marquée ; « Renvoyer » crée un nouveau code. | D-029b | Moyenne | UNDER_REVIEW |

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
| CA-010-05-01 | FR-1023 | Étant donné un code utilisé, quand on le ressaisit, alors refus ; après 15 min, refus. | TEST-010-05-01 |
| CA-010-05-02 | FR-1024 | Étant donné un compte sans code, quand on tente d'envoyer la fiche, alors refus. | TEST-010-05-02; CA-ETS-03 |
| CA-010-05-03 | FR-1025 | Étant donné l'écran du code, quand on l'inspecte, alors la boîte simulée et « Renvoyer ». | TEST-010-05-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-010-referentiel-declarations/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/pro/code.js`
5. `app/js/domain/pro.js`
6. `app/js/screens/pro/tableau.js`
