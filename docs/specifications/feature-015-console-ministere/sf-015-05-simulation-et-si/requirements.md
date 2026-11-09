# SF-015-05 — Simulation « et si » de la politique de surveillance — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-035 ; FR-707 |
| Bloquant | Aucun |
| Dépend de | SF-015-04, SF-002-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le régulateur change un paramètre (seuil, décalage, maille, autorisation APDP, dérogation à l'art. 48) et voit, à côté de la politique en vigueur, combien de cellules seraient publiées, combien seraient fines, le délai de détection du regroupement et les fonctions débloquées.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Régulateur (démo) | Simuler, réinitialiser | Appliquer la variante | Session ministère |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2124 | `simuler(v)` MUST rendre `{ publiees, fines, detection: { semaines, jours }, fonctions }` pour une variante `{ seuil, decalage, maille: 'aire'\|'district', apdp, derogation }`. | D-035 | Haute | UNDER_REVIEW |
| FR-2125 | La vue MUST comparer la variante à `VARIANTE_EN_VIGUEUR` côte à côte, en surlignant (ambre) les lignes qui diffèrent. | D-035 | Haute | UNDER_REVIEW |
| FR-2126 | La variante MUST rester en mémoire ; « Réinitialiser » revient à la politique en vigueur ; rien n'est écrit dans la politique. | FR-707 | Haute | UNDER_REVIEW |

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
| CA-015-05-01 | FR-2124 | Étant donné seuil 3, quand on simule, alors des cellules fines sont publiées ; maille district, détection retardée. | TEST-015-05-01 |
| CA-015-05-02 | FR-2125 | Étant donné une variante, quand on lit la comparaison, alors les lignes différentes sont surlignées. | TEST-015-05-02 |
| CA-015-05-03 | FR-2126 | Étant donné une variante, quand on réinitialise, alors la comparaison est vide de différences. | TEST-015-05-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-015-console-ministere/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/surveillance.js`
5. `app/js/screens/ministere/console.js`
