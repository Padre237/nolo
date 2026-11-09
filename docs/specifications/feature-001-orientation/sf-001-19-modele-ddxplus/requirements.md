# SF-001-19 — Modèle DDXPlus sur l'appareil, parité et évaluation — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-19 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | D-033 (FR-DX-02, 11, 12, 15, 16, 23) |
| Bloquant | Téléchargement de DDXPlus (figshare) par l'équipe ; réseau du poste |
| Dépend de | SF-001-15, SF-011-01, SF-012-05 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Remplacer la table de démonstration par un modèle simple entraîné sur DDXPlus (CC-BY), exécuté en JavaScript sur l'appareil, avec un évaluateur Python de référence, une fiche descriptive du jeu de données et une évaluation publiée.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Télécharger, auditer, entraîner, exporter, évaluer | Utiliser un élément relevant de l'art. 48 ou exigeant un appareil | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1561 | L'inférence MUST se faire sur l'appareil à partir d'un modèle exporté en JSON (Bayes naïf ou petit réseau) ; parité 100 % avec l'évaluateur Python sur 10 000 patients du jeu de test et 400 tirages ; aucune requête réseau. | FR-DX-02 | Haute | UNDER_REVIEW |
| FR-1562 | Une fiche `kb/datasets/ddxplus.md` MUST décrire URL, licence CC-BY et attribution, version, taille, pathologies, limites déclarées, maladies absentes importantes au Cameroun, résultats de l'évaluation. | FR-DX-11 | Haute | UNDER_REVIEW |
| FR-1563 | Une évaluation datée (`docs/quality/`) MUST publier précision top-1 et top-3, la part des « pneumonie grave » PCIME dont la 1re piste est bénigne, la part hors champ ; les seuils de `POLITIQUE` sont recalés sur elle. | FR-DX-12 | Haute | UNDER_REVIEW |
| FR-1564 | Une table MUST relier chaque élément DDXPlus utilisé à un `SYM-NNN` ou à une question fermée bilingue ; couverture 100 %. | FR-DX-15 | Haute | UNDER_REVIEW |
| FR-1565 | Les éléments relevant de l'art. 48 ou exigeant un appareil de mesure MUST être retirés avant l'entraînement ; la liste motivée est relue par le juriste. | FR-DX-16 | Haute | UNDER_REVIEW |
| FR-1566 | Chaque pathologie MUST porter `categorie_juridique` (`sante_art5` ou `art48`), validée par le juriste. | FR-DX-06 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-19-01 | Licence CC-BY : attribution obligatoire dans le rapport et l'écran « À propos » | DDXPlus (figshare 20043374) |
| BR-001-19-02 | Patients synthétiques calés sur New York ; ni paludisme, ni typhoïde, ni diarrhées | Lacune L15 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-19-01 | FR-1561 | Étant donné le modèle exporté, quand on compare JS et Python sur 10 000 patients et 400 tirages, alors 0 écart et 0 requête réseau. | TEST-001-19-01 |
| CA-001-19-02 | FR-1562 | Étant donné le dépôt, quand on ouvre `kb/datasets/ddxplus.md`, alors toutes les rubriques sont présentes. | TEST-001-19-02 |
| CA-001-19-03 | FR-1563 | Étant donné la commande d'évaluation, quand on la lance, alors le rapport daté contient les quatre mesures. | TEST-001-19-03 |
| CA-001-19-04 | FR-1564 | Étant donné la table, quand on la contrôle, alors 100 % des éléments utilisés sont reliés. | TEST-001-19-04 |
| CA-001-19-05 | FR-1565, FR-1566 | Étant donné la liste des éléments retirés et le tableau des catégories, quand on contrôle les catalogues, alors aucune question retirée n'y figure et chaque pathologie a sa catégorie. | TEST-001-19-05 |

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
4. `tools/ddxplus/entrainer.py`
5. `app/js/domain/modele.js`
6. `kb/datasets/ddxplus.md`
7. `tools/ddxplus/evaluer.py`
8. `rules/ddxplus_correspondance.yaml`
9. `rules/ddxplus_retraits.yaml`
