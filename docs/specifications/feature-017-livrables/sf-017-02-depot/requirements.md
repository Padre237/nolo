# SF-017-02 — Dépôt GitHub public — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-02 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| État d'implémentation | Implémenté — 2026-11-09 (D-037) : contrôle avant publication et README corrigé ; TEST-017-02-01 (README sur machine propre) non exécuté |
| Origine | Règles du hackathon ; D-036 |
| Bloquant | Aucun |
| Dépend de | MT-002 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le dépôt `Padre237/nolo` contient le code, la base, les spécifications et les preuves, avec un README en anglais (et en français), une licence et les notices de tiers, sans texte réservé ni secret.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Pousser, publier | Publier un secret, un texte réservé ou une donnée réelle | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2306 | `README.md` (anglais) et `README.fr.md` MUST expliquer le problème, l'architecture (agents, Y.3172), le lancement, les tests, ce qui est réel et simulé, et la licence. | Règles du hackathon | Haute | APPROVED |
| FR-2307 | `LICENSE` (MIT, code) et `THIRD_PARTY_NOTICES.md` (sources et licences) MUST être présents. | Sessions 2 et 3 | Haute | APPROVED |
| FR-2308 | Le dépôt MUST ne contenir ni secret, ni PDF source, ni texte « tous droits réservés », ni donnée réelle de personne. | Session 1 (contenu confidentiel = exclusion) | Haute | APPROVED |
| FR-2309 | `.gitignore` MUST exclure caches, données d'exécution (`var/`, `data/runtime/`), PDF bruts (`kb/raw*`). | MT-001 | Haute | APPROVED |

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
| CA-017-02-01 | FR-2306 | Étant donné le README, quand on suit ses commandes sur une machine propre, alors l'application et les tests se lancent. | TEST-017-02-01 |
| CA-017-02-02 | FR-2307 | Étant donné la racine, quand on la liste, alors LICENSE et THIRD_PARTY_NOTICES.md. | TEST-017-02-02 |
| CA-017-02-03 | FR-2308 | Étant donné le dépôt, quand on cherche secrets, PDF et texte de `INT-OMS-AFRO-SBC-2014`, alors rien : ni fragment, ni page, ni texte (seules restent sa fiche de `kb/sources.json` et des mentions documentaires). | TEST-017-02-03 |
| CA-017-02-04 | FR-2309 | Étant donné `.gitignore`, quand on le lit, alors les motifs requis. | TEST-017-02-04 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| Q-017-02-01 | Le contrôle avant publication doit-il aussi chercher des adresses e-mail réelles (FR-2308 : « ni donnée réelle de personne ») ? Le contrôle manuel du 2026-11-09 n'a trouvé que des adresses de démonstration ; `tools/controle_publication.py` ne les cherche pas. | Ajouter une liste blanche des domaines de démonstration (`demo.cm`, `demo.nolo`, `pharmacie-demo.cm`) et signaler toute autre adresse | Ouverte (à trancher par le propriétaire) |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-017-livrables/README.md`
3. les quatre fichiers de ce dossier
