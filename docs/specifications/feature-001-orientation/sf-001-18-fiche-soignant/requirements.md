# SF-001-18 — Fiche à montrer au soignant (carnet) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-18 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | D-026 ; D-033 (FR-DX-22) ; D-034 |
| Bloquant | Aucun |
| Dépend de | SF-001-13, SF-001-15, SF-013-09 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une fiche lisible au téléphone, à montrer à l'accueil : signes reformulés, signes absents, durée, réponses de sécurité, pistes (mode démonstration, sauf art. 48) avec leur origine, code court de la fiche. Elle s'imprime quand la page n'est pas hébergée dans un cadre.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Afficher, imprimer, terminer | — | — |
| Soignant | Lire et contester les pistes | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1546 | La fiche MUST reprendre : pour qui et âge, signes présents, signes absents, durée, réponses de sécurité, et en mode démonstration les pistes avec score et origine (patients simulés). | D-026 ; FR-DX-22 | Haute | UNDER_REVIEW |
| FR-1547 | La fiche MUST porter un code court de 6 caractères en deux groupes (`ABC-DEF`), sans 0/O ni 1/I (`codeFiche`). | D-034 | Moyenne | UNDER_REVIEW |
| FR-1548 | Le bouton « Imprimer » MUST être masqué quand la page est hébergée dans un cadre (`encadre`), l'impression y étant refusée. | D-034 | Moyenne | UNDER_REVIEW |
| FR-1549 | « Terminer » MUST effacer le cas en mémoire et revenir à l'accueil. | Principe XI | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-1538 (SF-001-16) : fiche limitée aux signes pour l'art. 48

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
| CA-001-18-01 | FR-1546 | Étant donné un parcours complet, quand la fiche s'affiche, alors tous les éléments y figurent. | TEST-001-18-01 |
| CA-001-18-02 | FR-1547 | Étant donné une graine quelconque, quand on calcule le code, alors 7 caractères au format `XXX-XXX` dans l'alphabet sans 0, O, 1, I. | TEST-001-18-02 |
| CA-001-18-03 | FR-1548 | Étant donné la page dans un cadre, quand la fiche s'affiche, alors pas de bouton Imprimer. | TEST-001-18-03 |
| CA-001-18-04 | FR-1549 | Étant donné « Terminer », quand on revient à l'accueil, alors `store.cas` vaut `null`. | TEST-001-18-04 |

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
4. `app/js/screens/patient/fiche.js`
5. `app/js/domain/engine.js`
