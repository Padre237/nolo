# MT-002 — Assemblage du monorepo Nolo — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | MT Maintenance |
| Sous-fonctionnalité | MT-002 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-036 |
| Bloquant | Aucun |
| Dépend de | MT-001 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Réunir dans un seul dépôt, sans changer aucun comportement : l'application Nolo (`app/`), la gouvernance et les agents Python (`src/server/`), le service des établissements (D-029, D-032), le moteur v1 (`src/client/ondevice/`), la base v9 publique (`kb/`), la politique (`config/`), les outils, les tests et la documentation.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Assembler | Changer un comportement pendant l'assemblage | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2401 | L'arborescence MUST être : `app/`, `src/server/{agents,gouvernance,domain,etablissements}`, `src/client/{ondevice,pwa}`, `config/`, `kb/`, `rules/`, `data/`, `donnees/`, `tools/`, `tests/{unit,integration,python,js,reports}`, `docs/`. | D-036 | Haute | UNDER_REVIEW |
| FR-2402 | Après assemblage, toutes les suites MUST passer sans modification de code : `python3 -m pytest -q` (20 + 64), `node --test tests/js/*.test.mjs` (11 + 4), `cd app && node --test tests/*.test.mjs` (33), les scénarios S1 à S3. | D-036 | Haute | UNDER_REVIEW |
| FR-2403 | `CLAUDE.md`, `docs/ETAT.md` et `docs/specifications/README.md` MUST décrire cette arborescence. | D-036 | Haute | UNDER_REVIEW |

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
| CA-M02-01 | FR-2401 | Étant donné le dépôt, quand on liste la racine, alors l'arborescence attendue. | TEST-M02-01 |
| CA-M02-02 | FR-2402 | Étant donné le dépôt assemblé, quand on lance les suites, alors toutes réussissent (preuve `preuve-2026-11-09-suites.txt`). | TEST-M02-02 |
| CA-M02-03 | FR-2403 | Étant donné les trois documents, quand on les lit, alors l'arborescence y est décrite. | TEST-M02-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/maintenance/README.md`
3. les quatre fichiers de ce dossier
4. `docs/ETAT.md`
5. `docs/specifications/README.md`
