# SF-008-08 — Page « Conditions d'utilisation et politique de données » — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-028 (FR-CONS-03, 08, 09) |
| Bloquant | Aucun |
| Dépend de | SF-008-01, SF-013-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une page bilingue qui donne toutes les informations de l'art. 21 et la logique de la décision automatisée, accessible sous les cases sans perdre les choix en cours.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Lire et revenir à ses choix | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-871 | Le lien vers la page MUST être placé directement sous les trois cases et s'ouvrir sans effacer les choix en cours (retour « Revenir à mes choix »). | FR-CONS-03 | Haute | UNDER_REVIEW |
| FR-872 | La page MUST contenir : responsable, finalités, données collectées et jamais collectées, décision automatisée (art. 44), destinataires, transferts, durées, droits, sécurité, mineurs, contact, version. | FR-CONS-09 ; art. 21 | Haute | UNDER_REVIEW |
| FR-873 | Les versions FR et EN MUST avoir les mêmes sections, d'égale valeur. | FR-CONS-08 ; D-027 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-008-08-01 | Information de la personne concernée | Loi 2024/017 art. 21 |
| BR-008-08-02 | Durées de conservation et coordonnées du responsable : propositions à valider (surlignées) | D-028 §6 ; lacune L15 (registre) |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-008-08-01 | FR-871 | Étant donné deux cases cochées, quand on ouvre les conditions puis « Revenir à mes choix », alors les deux cases sont toujours cochées. | TEST-008-08-01; CA-CONS-08 |
| CA-008-08-02 | FR-872, FR-873 | Étant donné la page FR et EN, quand on liste les sections, alors mêmes sections dans les deux langues, couvrant les douze rubriques. | TEST-008-08-02; CA-CONS-09 |

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
4. `app/js/screens/patient/bienvenue.js`
5. `app/js/screens/patient/conditions.js`
6. `app/js/i18n/fr.js`
7. `app/js/i18n/en.js`
