# SF-013-10 — Inspection visuelle automatisée — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-034 (étape 7 du protocole de conception) |
| Bloquant | Aucun |
| Dépend de | SF-013-06 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Un script pilote Chrome sur 39 états de l'application à quatre largeurs et mesure débordements, cibles trop petites, erreurs de console et nombre de h1 ; il garde des captures.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Lancer l'inspection | Déclarer une interface conforme sans l'avoir inspectée | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1344 | `tools/inspecter.py` MUST parcourir les 39 états (citoyen, établissement, hôpital, ministère) à 360, 390, 768 et 1440 px et produire un rapport JSON et des captures. | D-034 | Haute | UNDER_REVIEW |
| FR-1345 | Le rapport MUST signaler : débordement horizontal (et éléments fautifs), cibles < 44 px, erreurs de console, nombre de h1 ≠ 1. | D-034 | Haute | UNDER_REVIEW |
| FR-1346 | Toute livraison d'interface MUST joindre la sortie datée de l'inspection dans `docs/quality/`. | Protocole SDD | Haute | UNDER_REVIEW |
| FR-1347 | Proposé : pour chaque état parcouru, l'inspection MUST vérifier les éléments de contenu attendus par les tests d'interface qui la citent (sélecteur ou texte présent, absent, ou compté) et compter un défaut si l'un manque ; un test d'interface ne cite la preuve de l'inspection comme réussite que si son résultat attendu y est vérifié. | Constat du 2026-11-09 (Q-013-10-01) | Haute | UNDER_REVIEW |

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
| CA-013-10-01 | FR-1344, FR-1345 | Étant donné le serveur local, quand on lance l'inspection, alors 156 mesures (39 × 4) sans débordement, sans erreur de console, un h1 chacune. | TEST-013-10-01 |
| CA-013-10-02 | FR-1346 | Étant donné une livraison d'interface, quand on cherche sa preuve, alors un fichier daté. | TEST-013-10-02 |
| CA-013-10-03 | FR-1347 | Étant donné les 76 tests d'interface marqués « état capturé », quand on lance l'inspection, alors chacun a une assertion de contenu nommée par son identifiant TEST- dans le rapport, et le rapport échoue si l'un manque. | TEST-013-10-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| Q-013-10-01 | L'inspection mesure la mise en page seulement : 76 tests d'interface ne peuvent donc pas citer sa preuve comme réussite. Faut-il y ajouter des assertions de contenu ? | Oui : FR-1347, TASK-013-10-03 ; d'ici là, ces tests restent « Non exécuté (état capturé) ». | Ouverte |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-013-application/README.md`
3. les quatre fichiers de ce dossier
4. `tools/inspecter.py`
