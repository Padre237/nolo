# SF-010-08 — Photos de l'établissement — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-029 (FR-ETS-12, CA-ETS-10) ; D-029b |
| Bloquant | Aucun |
| Dépend de | SF-010-06 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La fiche exige une photo de façade, acceptée seulement avec la case « aucune personne reconnaissable » ; les métadonnées (dont la position GPS) sont supprimées par ré-encodage.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement | Ajouter et retirer des photos | Envoyer une photo avec des personnes reconnaissables | Case cochée |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1034 | Une photo MUST n'être acceptée qu'avec la case « aucune personne reconnaissable » cochée, et dans un format image réel (JPEG, PNG, WebP). | FR-ETS-12 | Haute | UNDER_REVIEW |
| FR-1035 | La photo MUST être ré-encodée (canvas dans Nolo, Pillow dans le service) pour supprimer toutes ses métadonnées. | CA-ETS-10 | Haute | UNDER_REVIEW |
| FR-1036 | La fiche MUST exiger au moins une photo de façade avant l'envoi. | D-029 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-010-08-01 | Pas de photo de produits ; photos de l'établissement seulement | `CMR-LOI-90-035::0017` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-010-08-01 | FR-1034 | Étant donné une photo sans la case, quand on l'ajoute, alors refus ; un fichier texte renommé en .jpg est refusé. | TEST-010-08-01 |
| CA-010-08-02 | FR-1035 | Étant donné une photo avec coordonnées GPS en EXIF, quand elle est enregistrée, alors sans métadonnées. | TEST-010-08-02; CA-ETS-10 |
| CA-010-08-03 | FR-1036 | Étant donné une fiche sans photo, quand on l'envoie, alors refus. | TEST-010-08-03 |

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
4. `app/js/screens/pro/vue-fiche.js`
5. `src/server/etablissements/fiches.py`
