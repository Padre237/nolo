# SF-004-04 — Médicaments sensibles : recherche sur l'appareil, sans signalement ni comptage — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | Spécification v1.3 (FR-405, FR-408) ; D-008 ; D-032 |
| Bloquant | Aucun |
| Dépend de | SF-004-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
La recherche d'un contraceptif d'urgence ou d'un antirétroviral se fait sur le téléphone ; elle n'est ni comptée, ni signalable, ni conservée.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Chercher un médicament sensible | Signaler un résultat sensible | Aucune |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-405 | classes sensibles : recherche anonyme, sans historique. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-408 | pour les classes pouvant révéler la vie sexuelle (contraception, antirétroviraux), la recherche MUST s'exécuter sur l'appareil à partir de la liste téléchargée en bloc ; le serveur ne reçoit pas la requête. | Référence v1.3 | Haute | UNDER_REVIEW |
| FR-426 | Pour une DCI `sensible`, l'écran MUST afficher la note « sur votre téléphone » et « pas de signalement pour ce médicament », sans bouton « Signaler ». | D-028 ; D-030 | Haute | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-004-04-01 | Art. 48 : vie sexuelle ; consentement exprès insuffisant | `CMR-LOI-2024-017::0048` ; D-008 |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-004-04-01 | FR-405, FR-408 | Étant donné une recherche de lévonorgestrel, quand on observe réseau et stockage, alors aucune requête, aucune trace. | TEST-004-04-01, TEST-004-04-03 |
| CA-004-04-02 | FR-426 | Étant donné la case « signalements » cochée et le TLD, quand les résultats s'affichent, alors aucun bouton « Signaler » et la note d'explication. | TEST-004-04-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-004-recherche-medicament/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/screens/patient/chercher.js`
5. `src/server/domain/ressources.py`
