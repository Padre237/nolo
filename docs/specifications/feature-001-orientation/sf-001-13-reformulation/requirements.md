# SF-001-13 — « Décrire ce que je ressens » : reformulation bilingue, négation et durée — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-13 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-026 ; D-027 |
| Bloquant | Aucun |
| Dépend de | SF-001-01, SF-013-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le téléphone repère dans la description les signes présents, les signes dits absents et la durée, en français (dont des expressions camerounaises) ou en anglais, et les rend en termes clairs dans la langue de l'interface. Il n'ajoute aucun signe et ne nomme aucune maladie.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Voir ses signes reformulés, en retirer, en ajouter depuis la liste | Voir un signe qu'il n'a pas dit | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1501 | `reformuler(texte)` MUST renvoyer `{ presents, absents, jours }` : codes `SYM-NNN` présents, codes niés, durée en jours ou `null`. | D-026 | Haute | UNDER_REVIEW |
| FR-1502 | La reconnaissance MUST ignorer casse, accents et apostrophes typographiques, et ne reconnaître que des mots ou expressions entiers (« ear » n'est pas trouvé dans « year »), un motif terminé par `*` valant début de mot. | D-026 | Haute | UNDER_REVIEW |
| FR-1503 | Un signe précédé (à 30 caractères au plus, 2 mots intercalés au plus) de « pas, pas de, sans, ni, aucun(e), jamais, no, not, without, never » MUST être classé absent, sauf s'il est aussi affirmé ailleurs. | D-026 | Haute | UNDER_REVIEW |
| FR-1504 | La durée MUST être lue dans « depuis / ça fait / cela fait / for / since + nombre (chiffres ou lettres FR/EN) + jours / semaines / mois / days / weeks / months », et « depuis hier / since yesterday » vaut 1 jour. | D-026 | Moyenne | UNDER_REVIEW |
| FR-1505 | Les expressions courantes au Cameroun MUST être reconnues, au minimum « le corps chauffe / corps chaud » (fièvre) et « le nez coule » (nez qui coule). | D-026 | Haute | UNDER_REVIEW |
| FR-1506 | « Toux qui aboie » ou « quintes » MUST impliquer la toux ; « la poitrine se creuse » MUST être un tirage (danger) et jamais une douleur de poitrine. | D-026 ; correction du 2026-11-09 | Haute | UNDER_REVIEW |
| FR-1507 | L'écran « Vérifier » MUST afficher les signes présents comme puces retirables, les signes absents à part, la durée, et permettre d'ajouter un signe depuis la liste fermée (suggestions d'abord). | D-026 | Haute | UNDER_REVIEW |
| FR-1508 | Les libellés MUST venir du référentiel bilingue (`SIGNES[code].fr\|en`) ; changer de langue change l'affichage sans relancer l'analyse. | D-027 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-120 (SF-001-03) : référentiel interne de 110 signes (moteur v1) : le référentiel de Nolo (28 signes) doit converger vers lui (Q-001-13-01)

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| NFR-1501 | Reformulation instantanée | ≤ 20 ms pour 600 caractères (Node 22) | UNDER_REVIEW |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-13-01 | Aucun signe n'est déduit d'un autre, sauf les deux implications de FR-1506 | D-026 |
| BR-001-13-02 | Aucune traduction automatique du texte de la personne | D-027 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-13-01 | FR-1501, FR-1505, FR-1503 | Étant donné « Depuis 3 jours le corps chauffe, il tousse, pas de diarrhée », quand on reformule, alors présents ⊇ {SYM-001, SYM-002}, absents = {SYM-018}, jours = 3. | TEST-001-13-01 |
| CA-001-13-02 | FR-1502 | Étant donné « I have a sore throat and a runny nose since yesterday », quand on reformule, alors SYM-006 et SYM-007 présents, SYM-008 absent de la liste, jours = 1. | TEST-001-13-02 |
| CA-001-13-03 | FR-1506 | Étant donné « sa poitrine se creuse sous les côtes », quand on reformule, alors SYM-094 présent et SYM-012 absent de la liste des présents. | TEST-001-13-03 |
| CA-001-13-04 | FR-1504 | Étant donné « for two weeks », quand on lit la durée, alors 14. | TEST-001-13-04 |
| CA-001-13-05 | FR-1507, FR-1508 | Étant donné des signes reconnus, quand on passe en anglais sur « Vérifier », alors les puces sont en anglais et la liste d'ajout propose d'abord les suggestions. | TEST-001-13-05 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| Q-001-13-01 | Faut-il remplacer les 28 signes de Nolo par les 110 du référentiel v1 (SF-001-03) ? | Oui, après la soumission, en gardant les codes existants et en vérifiant la parité | Ouverte |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-001-orientation/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/engine.js`
5. `app/js/screens/patient/verifier.js`
