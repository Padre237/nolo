# SF-001-02 — Retrait des mentions interdites avant tout envoi — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-02 |
| Version | 2.0.0 |
| Statut | READY_FOR_DEV |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |
| Origine | Spécification v1.3 (FR-111) ; D-022 |
| Bloquant | Aucun |
| Dépend de | SF-001-01, SF-001-13 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Garantir qu'aucune catégorie de l'art. 48 (vie sexuelle, génétique, biométrie de santé) n'est demandée, ni transmise si la personne l'écrit spontanément. Dans Nolo aujourd'hui rien n'est envoyé ; ce dossier fixe la règle pour le jour où un envoi existera (orientation consentie vers le serveur, surveillance).

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Écrire librement | Être interrogé sur sa vie sexuelle, sa génétique ou sa biométrie | — |
| Agent de l'appareil | Retirer localement les mentions interdites | Les transmettre ou les journaliser | Avant tout envoi |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-111 | le questionnaire de triage MUST NOT demander de donnée génétique (génotype de la drépanocytose, antécédents génétiques familiaux, test génétique), biométrique ou relative à la vie sexuelle ; les mentions spontanées sont retirées du texte avant tout envoi. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-155 | Avant toute transmission d'une donnée issue de la description, l'appareil MUST ne transmettre que des codes `SYM-NNN` (jamais le texte libre) et MUST retirer tout code relevant d'une catégorie interdite. | D-022 ; Principe XI | Haute | UNDER_REVIEW |
| FR-156 | Aucune question de Nolo (écran « Vérifier », fiche, espace pro) MUST porter sur la vie sexuelle, la génétique ou la biométrie ; un test vérifie les catalogues FR et EN. | D-022 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
- FR-712 (SF-007-06) : l'agent Conformité bloque toute catégorie de l'art. 48

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-001-02-01 | Consentement exprès nécessaire mais pas suffisant face à l'art. 48 | D-008 ; `CMR-LOI-2024-017::0048` |
| BR-001-02-02 | Le texte libre n'est jamais journalisé | `config/policy.yaml > journal_audit.champs_interdits` |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-001-02-01 | FR-155, FR-111 | Étant donné la description « j'ai de la fièvre et mon test génétique… », quand une charge utile est préparée pour le serveur, alors elle ne contient que des codes `SYM-NNN` et aucun mot du texte. | TEST-001-02-01 |
| CA-001-02-02 | FR-156 | Étant donné les catalogues FR et EN, quand on y cherche les termes interdits (liste du test), alors aucun libellé de question n'en contient. | TEST-001-02-02 |

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
4. `app/js/domain/envoi.js`
5. `app/js/i18n/fr.js`
6. `app/js/i18n/en.js`
