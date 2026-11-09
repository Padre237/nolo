# SF-001-07 — Calcul du niveau d'urgence (moteur v1) — affiché seulement s'il vaut « urgence » — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-07 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-101, FR-104, FR-110) ; D-021 ; D-026 |
| Bloquant | Aucun |
| Dépend de | SF-001-03, SF-001-04, SF-001-05, SF-001-06, SF-007-09 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le moteur v1 calcule un niveau à partir des règles PCIME et IITT. Depuis D-026, seul le niveau « urgence » produit un affichage (alerte) ; les autres niveaux ne sont jamais montrés. Le moteur est monotone : ajouter un signe ne fait jamais baisser le niveau.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Agent Triage (appareil) | Calculer le niveau à partir des jetons | Afficher un niveau autre qu'« urgence » ; nommer une maladie | Toujours, sans consentement |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-101 | le niveau d'urgence MUST être calculé par `rules/triage_signes_alerte.yaml` (versionné, validé par un clinicien) ; le LLM ne peut que le relever. | Référence v1.3 | Haute | REMPLACÉE par FR-165 (règles v2, D-019) |
| FR-104 | niveaux possibles : `urgence`, `consultation_24h`, `consultation_48h`, `soins_courants` ; chaque niveau est associé à un type de structure. | Référence v1.3 | Haute | REMPLACÉE par FR-166 (D-026 : seul « urgence » est affiché) |
| FR-110 | chaque décision MUST produire une entrée de journal conforme à la spec 007. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-165 | Le niveau MUST être calculé par les règles v2 (`rules/triage_signes_alerte.v2.yaml`, 75 règles PCIME et IITT sourcées) ; le plus élevé des niveaux déclenchés l'emporte (monotonie). | D-019 ; D-021 | Haute | UNDER_REVIEW |
| FR-166 | Seul le niveau `urgence` MUST produire un affichage (alerte, SF-001-14) ; tout autre niveau n'est ni affiché ni transmis. | D-026 | Haute | UNDER_REVIEW |
| FR-167 | Le moteur JavaScript MUST rendre exactement le même niveau que l'évaluateur Python de référence sur les 19 scénarios, les 42 phrases et 400 tirages aléatoires. | D-025 | Haute | UNDER_REVIEW |
| FR-168 | Nolo MUST utiliser le moteur v1 pour détecter l'urgence, en plus des questions de sécurité (SF-001-14) ; un signe déclenchant `urgence` dans l'un ou l'autre suffit. | D-026 ; écart constaté le 2026-11-09 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-706 (SF-007-09) : journal chaîné

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-07-01 | Règles non validées cliniquement ; démonstration seulement | D-006 ; lacune V7 |
| BR-001-07-02 | Correspondance couleurs → niveaux à valider par un clinicien | D-021 (Proposé) |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-07-01 | FR-165 | Étant donné les 390 témoins (un par règle et par tranche), quand on les évalue, alors chacun donne le niveau attendu ; sur 5 000 tirages, ajouter un signe ne baisse jamais le niveau. | TEST-001-07-01 |
| CA-001-07-02 | FR-166 | Étant donné un cas `consultation_48h`, quand Nolo affiche le résultat, alors aucun niveau n'est montré. | TEST-001-07-02 |
| CA-001-07-03 | FR-167 | Étant donné les cas de parité, quand on lance les tests Node, alors 0 écart avec Python. | TEST-001-07-03 |
| CA-001-07-04 | FR-110 | Étant donné une décision du moteur côté serveur, quand elle est journalisée, alors l'entrée ne contient qu'une empreinte et la règle, jamais le texte. | TEST-001-07-04 |
| CA-001-07-05 | FR-168 | Étant donné « mon enfant de 3 ans a des lèvres bleues », quand Nolo analyse, alors l'alerte d'urgence s'affiche, que la question de sécurité ait été répondue ou non. | TEST-001-07-05 |

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
4. `src/client/ondevice/moteur_triage.mjs`
5. `src/server/agents/orchestrateur.py`
6. `src/server/gouvernance/journal.py`
7. `app/js/domain/engine.js`
