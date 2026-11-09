# SF-009-03 — Compte pseudonyme du citoyen — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | Catalogue v1 ; D-011 (Proposé) |
| Bloquant | D-011 ; autorisation APDP (L12) |
| Dépend de | SF-009-01, SF-007-07 |
| Priorité | P2 |

## 1. Objectif métier et résultat attendu
Plus tard, un compte pseudonyme créé sur l'appareil pourra porter les signalements sans identité ; il n'existe pas dans le prototype.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Créer un pseudonyme sur l'appareil | Donner son nom ou son téléphone | Mode `complet` seulement |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-912 | Le pseudonyme MUST être créé sur l'appareil (HMAC d'un secret local), sans nom, téléphone ni e-mail. | D-011 (Proposé) ; ADR-011 | Moyenne | UNDER_REVIEW |
| FR-913 | Le compte pseudonyme MUST n'être disponible qu'en mode `complet` (autorisation APDP). | FR-714 ; L12 | Haute | UNDER_REVIEW |

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
| CA-009-03-01 | FR-912 | Étant donné la création, quand on lit la charge utile, alors seulement le pseudonyme. | TEST-009-03-01 |
| CA-009-03-02 | FR-913 | Étant donné le mode `demo_synthetique`, quand on cherche la création de compte, alors elle n'existe pas. | TEST-009-03-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-009-acces-roles-comptes/README.md`
3. les quatre fichiers de ce dossier
4. `app/js/domain/pseudonyme.js`
