# SF-010-10 — Tableau « Services et urgences » de l'hôpital — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-035 |
| Bloquant | Aucun |
| Dépend de | SF-010-06, SF-010-11 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Un panneau de signalétique, inspiré des panneaux d'orientation des hôpitaux, résume pour l'établissement et pour le citoyen : urgences 24 h, urgences pédiatriques, maternité, spécialités et modalités, imagerie, laboratoire, lits, pharmacie de garde, banque de sang.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Hôpital, centre de santé, centre spécialisé | Voir son tableau des services | — | Session pro |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1044 | Le tableau MUST être déduit de la fiche (H2, H2a, H2b, H3, H4, H5, H5a, H6, H7, H8, H9, H10) sans nouvelle saisie. | D-035 | Haute | UNDER_REVIEW |
| FR-1045 | Chaque ligne MUST dire « oui / non / non renseigné » en texte, avec une pastille ; les lits sont affichés en tranches (`moins_10` … `250_plus`), jamais en nombre exact. | D-035 | Haute | UNDER_REVIEW |
| FR-1046 | Les spécialités MUST afficher leur modalité (consultation, hospitalisation…) et leurs jours. | D-035 | Moyenne | UNDER_REVIEW |

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
| CA-010-10-01 | FR-1044, FR-1045 | Étant donné le compte hôpital de démonstration, quand on ouvre « Services », alors chaque ligne reflète la fiche et les lits sont une tranche. | TEST-010-10-01 |
| CA-010-10-02 | FR-1046 | Étant donné la pédiatrie en consultation lundi-vendredi, quand on lit sa ligne, alors modalité et jours. | TEST-010-10-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-010-referentiel-declarations/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/pro/vue-services.js`
