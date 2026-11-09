# SF-015-04 — Politique versionnée et empreinte — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-04 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | D-035 ; ADR-008 |
| Bloquant | Aucun |
| Dépend de | SF-007-01, SF-007-17 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La console affiche la politique en vigueur (JSON) avec sa version et son empreinte SHA-256, pour qu'un auditeur vérifie quelle règle a produit quelle décision.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Auditeur, régulateur (démo) | Lire la politique et son empreinte | Modifier la politique en vigueur | Session ministère |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2119 | La vue MUST afficher la politique en JSON, sa version et son empreinte SHA-256 calculée dans le navigateur (WebCrypto). | D-035 | Haute | UNDER_REVIEW |
| FR-2120 | La politique affichée MUST être celle de `config/policy.yaml` (convertie), avec la même version que le serveur ; aucune seconde politique codée en dur. | ADR-008 ; écart constaté le 2026-11-09 | Haute | UNDER_REVIEW |

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
| CA-015-04-01 | FR-2119 | Étant donné la vue, quand on recalcule l'empreinte du JSON affiché, alors même valeur. | TEST-015-04-01 |
| CA-015-04-02 | FR-2120 | Étant donné `policy.yaml` en 1.3.0, quand on ouvre la vue, alors version 1.3.0. | TEST-015-04-02 |

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
4. `app/js/screens/ministere/console.js`
5. `app/js/domain/politique.js`
6. `tools/politique_json.py`
