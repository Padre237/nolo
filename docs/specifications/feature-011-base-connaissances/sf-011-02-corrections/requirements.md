# SF-011-02 — Corrections sur le texte officiel — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Base v4, v5 |
| Bloquant | Aucun |
| Dépend de | SF-011-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Les articles relus sur la copie officielle (art. 19 et 48 de la loi 2024/017) remplacent l'OCR à la reconstruction, sans changer les identifiants.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Ajouter une correction relue | Corriger sans source | Relecture sur l'image |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1106 | `kb/corrections/<doc_id>.json` MUST remplacer le texte d'un fragment à la reconstruction et marquer le champ `correction`, sans changer le `chunk_id`. | Base v4 | Haute | UNDER_REVIEW |
| FR-1107 | Les fragments à l'en-tête illisible MUST porter un drapeau dans `qa_flags`. | Base v6 | Moyenne | UNDER_REVIEW |

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
| CA-011-02-01 | FR-1106 | Étant donné la correction de l'art. 48, quand on reconstruit, alors `CMR-LOI-2024-017::0048` porte le texte relu et `correction`. | TEST-011-02-01 |
| CA-011-02-02 | FR-1107 | Étant donné les art. 13, 40, 52, 58, 64, 66 illisibles, quand on lit leurs fragments, alors `qa_flags` non vide. | TEST-011-02-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-011-base-connaissances/README.md`
3. les quatre fichiers de ce dossier
4. `kb/corrections/CMR-LOI-2024-017.json`
5. `kb/build_kb.py`
