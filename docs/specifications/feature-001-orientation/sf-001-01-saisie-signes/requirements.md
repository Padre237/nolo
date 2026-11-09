# SF-001-01 — Saisie des signes et du contexte (pour qui, âge, description) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-01 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté (2026-11-09, D-038) |
| Origine | Spécification v1.3 (FR-105) ; D-026 ; D-034 |
| Bloquant | Aucun |
| Dépend de | SF-013-02, SF-013-04, SF-008-01 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La personne indique pour qui elle cherche (elle-même ou un enfant), l'âge (en ans ou en mois) et décrit avec ses mots ce qu'elle ressent. Le formulaire guide sans bloquer : exemples à toucher, erreurs claires, compteur de caractères. Résultat observable : un « cas » complet en mémoire de l'onglet, jamais enregistré ni envoyé, prêt pour la reformulation (SF-001-13).

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Choisir « moi » ou « un enfant », saisir l'âge, écrire jusqu'à 600 caractères, toucher un exemple, passer par la liste | Valider un cas incomplet | Consentement « orientation » non requis : tout reste sur l'appareil |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-105 | la position MUST être arrondie à 2 décimales avant tout traitement autre que le calcul de distance en mémoire ; aucun historique de symptômes n'est rattaché à un compte. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-150 | L'écran « Décrire » MUST demander, dans cet ordre : pour qui (moi / un enfant), l'âge (nombre et unité ans ou mois), puis la description libre. | D-026 | Haute | UNDER_REVIEW |
| FR-151 | La validation MUST refuser : « pour qui » absent ; âge absent, négatif, supérieur à 120 ans ou à 59 mois ; description de moins de 3 caractères ; chaque refus affiche un message sous le champ concerné et le relie par `aria-describedby`. | D-026 | Haute | UNDER_REVIEW |
| FR-152 | La description MUST être limitée à 600 caractères, avec un compteur visible « n / 600 ». | D-034 | Moyenne | UNDER_REVIEW |
| FR-153 | Toucher un exemple MUST remplir « pour qui », l'âge, l'unité et la description de l'exemple, sans valider automatiquement. | D-034 | Moyenne | UNDER_REVIEW |
| FR-154 | Le cas (pour qui, âge, texte) MUST rester en mémoire de l'onglet seulement (`store.cas`) : il n'est ni écrit dans le stockage local ni transmis ; « Recommencer » ou la fermeture de l'onglet l'efface. | Principe XI ; FR-105 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-1501 (SF-001-13) : la description est reformulée sur l'appareil
- FR-801 (SF-008-01) : le consentement « orientation » ne conditionne que l'envoi au serveur

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-01-01 | Aucune donnée génétique, biométrique ni sur la vie sexuelle n'est demandée | `CMR-LOI-2024-017::0048` ; FR-111 |
| BR-001-01-02 | Les exemples sont fictifs et bilingues (`decrire.exemples` en FR et EN, mêmes clés) | D-027 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-01-01 | FR-150 | Étant donné l'écran « Décrire », quand il s'affiche, alors les trois groupes apparaissent dans l'ordre pour qui, âge, description. | TEST-001-01-01 |
| CA-001-01-02 | FR-151 | Étant donné un âge de 130 ans, quand on valide, alors le message `decrire.erreurs.ageMax` s'affiche sous l'âge et le champ porte `aria-invalid="true"`. | TEST-001-01-02 |
| CA-001-01-03 | FR-152 | Étant donné 600 caractères saisis, quand on tape encore, alors rien n'est ajouté et le compteur indique 600 / 600. | TEST-001-01-03 |
| CA-001-01-04 | FR-153 | Étant donné l'exemple n° 1, quand on le touche, alors les champs sont remplis et l'écran reste « Décrire ». | TEST-001-01-04 |
| CA-001-01-05 | FR-154, FR-105 | Étant donné un cas saisi, quand on lit le stockage local, alors aucune clé ne contient le texte ni l'âge ; aucune requête réseau n'est émise. | TEST-001-01-05 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-001-orientation/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/patient/decrire.js`
5. `app/js/etat.js`
