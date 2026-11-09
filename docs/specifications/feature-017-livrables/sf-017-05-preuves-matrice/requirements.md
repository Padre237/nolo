# SF-017-05 — Preuves d'exécution et matrice de traçabilité — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Protocole SDD |
| Bloquant | Aucun |
| Dépend de | Toutes |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Chaque affirmation de réussite renvoie à une preuve datée ; la matrice générée relie exigences, conception, tâches, tests, implémentation et vérification, sans orphelin.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe, jury | Vérifier | Déclarer un test réussi sans preuve | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2320 | `python3 tools/trace.py` MUST sortir en 0 (aucune erreur de structure) et régénérer `docs/traceability/matrix.md`. | Protocole SDD | Haute | UNDER_REVIEW |
| FR-2321 | `docs/quality/` MUST contenir, pour chaque livraison, la sortie datée des suites (`pytest`, `node --test` des deux projets, scénarios, base) et de l'inspection visuelle. | Protocole SDD | Haute | UNDER_REVIEW |
| FR-2322 | Chaque test dont le statut cite une preuve de suites comme réussite MUST citer un nom de test ou une commande présents dans ce fichier de preuve ; `python3 tools/croiser_preuves.py <preuve>` le vérifie et sort en 0. | Constat du 2026-11-09 (Protocole SDD : pas de réussite sans exécution) | Haute | UNDER_REVIEW |

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
| CA-017-05-01 | FR-2320 | Étant donné le dépôt, quand on lance `tools/trace.py`, alors code 0 et matrice à jour. | TEST-017-05-01 |
| CA-017-05-02 | FR-2321 | Étant donné la livraison du 2026-11-09, quand on ouvre `docs/quality/`, alors `preuve-2026-11-09-suites.txt` et `preuve-2026-11-09-inspection-visuelle.txt`. | TEST-017-05-02 |
| CA-017-05-03 | FR-2322 | Étant donné `docs/quality/preuve-2026-11-09-suites.txt`, quand on lance `python3 tools/croiser_preuves.py docs/quality/preuve-2026-11-09-suites.txt`, alors « problèmes : 0 ». | TEST-017-05-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-017-livrables/README.md`
3. les quatre fichiers de ce dossier
4. `tools/trace.py`
5. `tools/croiser_preuves.py`
6. `docs/quality/`
