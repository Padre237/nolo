# SF-011-01 — Ingestion et découpage des sources — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Base v1 à v9 |
| Bloquant | Aucun |
| Dépend de | Aucune |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Chaque texte officiel est découpé en fragments traçables (un par article pour les lois et règlements, ~350 mots pour les guides) avec ses métadonnées, de façon reproductible.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Ajouter une source, reconstruire | Changer un `chunk_id` existant | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1101 | `kb/build_kb.py` MUST reconstruire `kb/kb_chunks.jsonl` depuis `kb/pages/` et `kb/text/` de façon déterministe. | Base v6 | Haute | UNDER_REVIEW |
| FR-1102 | Chaque fragment MUST porter : `chunk_id`, `doc_id`, `title`, `authority`, `date`, `doc_type`, `jurisdiction`, `language`, `url`, `source_kind`, `rights_note`, `extraction`, `status_note`, `article`, `section`, `page_start`, `page_end`, `qa_flags`, `text`. | Base v6 | Haute | UNDER_REVIEW |
| FR-1103 | Ajouter une source MUST laisser inchangés tous les fragments existants (contrôle par empreinte). | Base v8, v9 | Haute | UNDER_REVIEW |
| FR-1104 | `kb/sources.json` MUST décrire chaque source : titre, autorité, date, type, langue, URL, nature, droits, mode d'extraction. | Base v6 | Haute | UNDER_REVIEW |

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
| CA-011-01-01 | FR-1101, FR-1103 | Étant donné la version publique, quand on reconstruit dans un dossier temporaire, alors fichier identique octet pour octet (le 2026-11-09, les 1 893 fragments de la v6 ont aussi été trouvés identiques dans la v9 complète). | TEST-011-01-01 |
| CA-011-01-02 | FR-1102 | Étant donné chaque fragment, quand on valide, alors les 19 champs ; `chunk_id` uniques ; aucun texte vide. | TEST-011-01-02 |
| CA-011-01-03 | FR-1104 | Étant donné `sources.json`, quand on le lit, alors 22 sources décrites. | TEST-011-01-03 |

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
4. `kb/build_kb.py`
5. `kb/sources.json`
