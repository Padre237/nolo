# SF-007-14 — Comparaison avec et sans gouvernance (serveur) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-14 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-710) |
| Bloquant | Aucun |
| Dépend de | SF-007-02, SF-012-03 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Rejouer un scénario avec la Conformité désactivée (démonstration seulement) montre les violations que le système commettrait ; il les détecte et les nomme lui-même, journal toujours actif.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe, jury | Comparer | Désactiver la Conformité hors démo | Mode démo |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-710 | mode A/B : commutateur qui désactive l'agent Conformité dans l'environnement de démo seulement, avec rapport de violations. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-780 | Le rapport MUST nommer les violations d'une taxonomie fermée (recherche sensible journalisée, données individuelles transmises, signal publié sans validation humaine, catégorie interdite traitée…) ; au moins 5 violations sans gouvernance, 0 avec. | SC-702 | Haute | UNDER_REVIEW |

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
| CA-007-14-01 | FR-710, FR-780 | Étant donné S2 et S3 `--sans-gouvernance`, quand on lit les rapports, alors violations nommées ; avec gouvernance, aucune. | TEST-007-14-01 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| Q-007-14-01 | Constat du 2026-11-09 : `executer.py --scenario orientation_urgente --sans-gouvernance` sort avec le code 1 et « aucune violation détectée » (le triage reste sur l'appareil, la Conformité n'a rien à bloquer). Faut-il un code de sortie distinct pour « rien à contre-démontrer » ? | Garder le comportement : S1 est hors du critère CA-007-14-01 (S2 et S3 seulement) ; le documenter dans la démonstration plutôt que changer le code. | Ouverte |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-007-gouvernance/README.md`
3. les quatre fichiers de ce dossier
4. `src/server/agents/conformite.py`
5. `tools/scenarios/executer.py`
