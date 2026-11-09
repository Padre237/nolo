# SF-011-07 — Version publique de la base (droits) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Base v6 (limites, droits) ; D-036 |
| Bloquant | Aucun |
| Dépend de | SF-011-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le dépôt public ne contient aucun texte « tous droits réservés » ni aucun PDF dont la licence n'est pas vérifiée ; chaque source garde ses métadonnées et son lien.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Publier | Publier un texte sous droits réservés | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1123 | Les fragments et pages de `INT-OMS-AFRO-SBC-2014` (« tous droits réservés ») MUST être retirés de la version publique ; `sources.json` garde ses métadonnées avec `public_repository`. | README de la base, limite 9 | Haute | UNDER_REVIEW |
| FR-1124 | Aucun PDF source (dont IITT, licence non indiquée) MUST être publié ; les transcriptions restent des citations attribuées. | README de la base, limites 9 et 11 | Haute | UNDER_REVIEW |
| FR-1125 | `THIRD_PARTY_NOTICES.md` MUST lister chaque source et sa licence (CC BY-NC-SA 3.0 IGO, CC BY-ND 4.0, ODbL, OFL, domaine public…). | Règles du hackathon | Haute | UNDER_REVIEW |

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
| CA-011-07-01 | FR-1123 | Étant donné le dépôt, quand on cherche `INT-OMS-AFRO-SBC-2014` dans `kb_chunks.jsonl` et `kb/pages/`, alors rien (2 034 fragments). | TEST-011-07-01 |
| CA-011-07-02 | FR-1124 | Étant donné le dépôt, quand on cherche des `*.pdf`, alors aucun. | TEST-011-07-02 |
| CA-011-07-03 | FR-1125 | Étant donné `THIRD_PARTY_NOTICES.md`, quand on le lit, alors chaque source et sa licence. | TEST-011-07-03 |

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
4. `kb/kb_chunks.jsonl`
5. `kb/pages/`
6. `kb/sources.json`
