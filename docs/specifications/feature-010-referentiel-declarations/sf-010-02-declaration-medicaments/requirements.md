# SF-010-02 — Déclaration du stock de médicaments (import d'un fichier) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-401) ; D-029 (FR-ETS-09, FR-ETS-10, CA-ETS-07 à 09) |
| Bloquant | Aucun |
| Dépend de | SF-010-07, SF-004-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une officine ou une pharmacie hospitalière vérifiée télécharge le modèle, l'importe (CSV dans Nolo, XLSX ou CSV dans le service), lit un rapport ligne par ligne et publie seulement les lignes valides, qui expirent 48 h après l'envoi.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement vérifié (officine, pharmacie hospitalière) | Importer, confirmer son stock | Publier une ligne rejetée ; importer un PDF | Compte vérifié |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-401 | seuls les établissements de type `officine_agreee` ou `pharmacie_hospitaliere` peuvent déclarer. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-1006 | L'onglet Stock MUST fournir le modèle (`MODELE_CSV` : `dci;forme;niveau`), un exemple, et l'importer ; dans une page hébergée dans un cadre, le téléchargement est remplacé par « Copier le modèle ». | FR-ETS-09 | Haute | UNDER_REVIEW |
| FR-1007 | `lireFichier` MUST accepter CSV (séparateur `;` ou `,`) et refuser PDF et images avec un motif ; XLSX est accepté par le service de référence. | FR-ETS-09 ; CA-ETS-08 | Haute | UNDER_REVIEW |
| FR-1008 | Chaque ligne MUST être rejetée avec un motif distinct si : DCI inconnue ; nom commercial (DCI proposée, jamais appliquée) ; produit de l'art. 75 ; niveau hors liste (`disponible`, `faible`, `rupture`) ; les autres lignes sont publiées. | CA-ETS-07 | Haute | UNDER_REVIEW |
| FR-1009 | Une ligne MUST cesser d'être visible des citoyens 48 h après son envoi ; le tableau de bord prévient 12 h avant ; « Confirmer mon stock » remet le compteur à zéro. | FR-ETS-10 ; CA-ETS-09 | Haute | UNDER_REVIEW |
| FR-1010 | Le rapport d'import MUST afficher le nombre de lignes acceptées et rejetées et le pourcentage de rejet. | FR-ETS-09 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-010-02-01 | Produits favorisant l'avortement rejetés | `CMR-LOI-90-035::0072` |
| BR-010-02-02 | Vente réservée aux pharmaciens ; seuls les établissements agréés déclarent | `CMR-LOI-90-035::0049` ; `CMR-LOI-90-035::0012` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-010-02-01 | FR-1008 | Étant donné un fichier avec une DCI inconnue, « doliprane », « misoprostol » et un niveau « beaucoup », quand on l'importe, alors 4 rejets aux 4 motifs distincts ; les autres publiées. | TEST-010-02-01, TEST-010-02-06; CA-ETS-07 |
| CA-010-02-02 | FR-1007 | Étant donné un PDF, quand on l'importe, alors refus. | TEST-010-02-02, TEST-010-02-06; CA-ETS-08 |
| CA-010-02-03 | FR-1009 | Étant donné une ligne envoyée il y a 48 h 01, quand on cherche, alors absente ; après « Confirmer », présente. | TEST-010-02-03, TEST-010-02-06; CA-ETS-09 |
| CA-010-02-04 | FR-401 | Étant donné un centre de santé sans pharmacie, quand on ouvre son tableau de bord, alors pas d'onglet Stock. | TEST-010-02-04 |
| CA-010-02-05 | FR-1006, FR-1010 | Étant donné la page dans un cadre, quand on ouvre Stock, alors « Copier le modèle » ; après import, le rapport chiffré s'affiche. | TEST-010-02-05 |

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
4. `app/js/domain/pro.js`
5. `app/js/screens/pro/vue-stock.js`
6. `src/server/etablissements/stock.py`
