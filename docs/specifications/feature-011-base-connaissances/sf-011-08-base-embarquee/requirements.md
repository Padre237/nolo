# SF-011-08 — Base embarquée dans Nolo pour les agents — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | AG-02, AG-05, AG-06 |
| Bloquant | Aucun |
| Dépend de | SF-011-07 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Nolo embarque, hors ligne, les fragments dont ses agents ont besoin : ceux cités par la politique et la Conformité, et l'index des textes camerounais pour le conseiller, avec leurs traductions.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agents de Nolo | Lire un fragment, chercher | Charger un texte réservé | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1127 | `tools/exporter_base.py` MUST produire `app/data/base.json` : tous les fragments `CMR-` de la version publique et les fragments `INT-` cités par la politique, la Conformité et la correspondance, avec article, titre, statut et traductions. | AG-02, AG-06 | Haute | UNDER_REVIEW |
| FR-1128 | `app/js/domain/base.js` MUST exposer `fragment(id, lang)` (texte, article, titre, statut, version anglaise officielle ou traduction marquée) et lever `E-BASE-FRAGMENT-INCONNU` pour un identifiant absent. | AG-05 | Haute | UNDER_REVIEW |
| FR-1129 | La base embarquée MUST être mise en cache par le service worker (hors ligne). | SF-013-08 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| NFR-1101 | Taille raisonnable | `app/data/base.json` ≤ 3 Mio | UNDER_REVIEW |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| — | Aucune | — |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-011-08-01 | FR-1127 | Étant donné l'export, quand on contrôle, alors tous les fragments cités par la politique et la Conformité sont présents, aucun `INT-OMS-AFRO-SBC-2014`. | TEST-011-08-01 |
| CA-011-08-02 | FR-1128 | Étant donné `CMR-LOI-2019-019::0005` en anglais, quand on le lit, alors la version officielle `CMR-LOI-2019-019-EN::0005` ; un identifiant inconnu lève l'erreur. | TEST-011-08-02 |
| CA-011-08-03 | FR-1129 | Étant donné l'application hors ligne, quand on lit un fragment, alors il est disponible. | TEST-011-08-03 |

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
4. `tools/exporter_base.py`
5. `app/js/domain/base.js`
6. `app/sw.js`
