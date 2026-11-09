# SF-017-01 — Rapport technique (5 pages, anglais) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-01 |
| Version | 2.0.0 |
| Statut | IN_PROGRESS |
| État d'implémentation | Implémenté — rapport, PDF et contrôles du 2026-11-09 (D-037, D-038) |
| Origine | Règles du hackathon ; modèle de soumission |
| Bloquant | Aucun |
| Dépend de | F-001 à F-016 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Le rapport suit le modèle officiel, en anglais, 5 pages au plus, et décrit Nolo tel qu'il est dans le dépôt : chiffres mesurés, réel et simulé distingués, correspondance Y.3172 et AI Readiness 2.0, lacunes.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Rédiger, relire, envoyer | Annoncer un chiffre ou une fonction absents du dépôt | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2301 | Le rapport MUST suivre les sections du modèle et tenir en 5 pages. | Modèle de soumission | Haute | APPROVED |
| FR-2302 | Le rapport MUST porter le nom Nolo, le lien du dépôt, et les chiffres prouvés de la base v9 publique (2 034 fragments, 21 documents ; 22 fiches dans `kb/sources.json`, dont une de métadonnées seulement) et des tests réellement exécutés (D-038). | Écart constaté : brouillon « BOUSSOLE », 1 893 fragments | Haute | APPROVED |
| FR-2303 | Chaque fonction décrite MUST être marquée implémentée ou prévue, conformément aux dossiers SDD. | Protocole SDD | Haute | APPROVED |
| FR-2304 | Le rapport MUST décrire le module POC comme une preuve de concept gouvernée, avec ses lacunes (L5, L15, L16). | D-033 | Haute | APPROVED |

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
| CA-017-01-01 | FR-2301 | Étant donné le PDF, quand on compte les pages, alors ≤ 5 ; sections du modèle présentes. | TEST-017-01-01 |
| CA-017-01-02 | FR-2302 | Étant donné le texte, quand on y cherche « BOUSSOLE » et « 1,893 », alors aucune occurrence ; le lien du dépôt est présent. | TEST-017-01-02 |
| CA-017-01-03 | FR-2303, FR-2304 | Étant donné chaque fonction citée, quand on la compare à la matrice, alors son état concorde. | TEST-017-01-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| Q-017-01-01 | FR-2302 demande les chiffres « 2 055 fragments, 22 documents » de la version de travail. Aucun fichier de preuve ne les porte : seul `kb/README.md` les cite, et la version de travail n'est pas dans le dépôt. | Garder dans le rapport les chiffres prouvés (version publique : 2 034 fragments, 21 documents ; 22 fiches dans `kb/sources.json`, dont une de métadonnées seulement) et retirer « 2 055 » de FR-2302 ; ou prouver 2 055 sur le poste de l'équipe | Résolue (D-038) : chiffres prouvés gardés, FR-2302 corrigée |
| Q-017-01-02 | DES-017-01-01 place le PDF dans `docs/submission/`, mais FR-2308 et `tools/verifier_base.py` interdisent tout PDF dans l'arborescence (et `.gitignore` exclut `*.pdf`). | Produire le PDF hors du dépôt (`../livrables/rapport-technique-en.pdf`, `tools/rapport_pdf.py`) et corriger DES-017-01-01 | Résolue (D-038) : PDF dans `../livrables/`, DES-017-01-01 corrigé |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-017-livrables/README.md`
3. les quatre fichiers de ce dossier
4. `docs/submission/rapport-technique-en.md`
