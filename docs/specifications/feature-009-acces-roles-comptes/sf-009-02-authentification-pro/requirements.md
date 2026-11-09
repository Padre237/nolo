# SF-009-02 — Authentification des établissements (un compte par établissement) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-029 (remplace ADR-012 pour les établissements) ; FR-ETS-02, FR-ETS-13, CA-ETS-11 |
| Bloquant | Aucun |
| Dépend de | SF-009-01, SF-010-04 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Chaque établissement a un seul compte (e-mail + mot de passe). Le mot de passe n'est jamais gardé en clair ; 5 échecs bloquent 15 minutes ; la session se ferme à la demande.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Établissement | Se connecter, se déconnecter, changer son mot de passe | Avoir deux comptes | E-mail confirmé |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-905 | Le mot de passe MUST être conservé sous forme d'empreinte salée : PBKDF2-SHA-256 (WebCrypto) dans Nolo, scrypt dans le service de référence ; jamais en clair. | D-029 | Haute | UNDER_REVIEW |
| FR-906 | Un mot de passe MUST faire au moins 10 caractères, mêler lettres et chiffres et ne contenir ni le NIU ni le nom de l'établissement (`erreurMotDePasse`). | D-029 | Haute | UNDER_REVIEW |
| FR-907 | 5 mots de passe faux de suite MUST bloquer la connexion de cet e-mail 15 minutes, avec la durée restante affichée. | CA-ETS-11 | Haute | UNDER_REVIEW |
| FR-908 | La session MUST être ouverte à la connexion réussie et fermée par « Se déconnecter » ; elle ne contient que l'e-mail du compte. | D-029 | Haute | UNDER_REVIEW |
| FR-909 | Un compte désactivé MUST rendre l'établissement invisible des citoyens ; sa réactivation le rend de nouveau visible s'il est vérifié. | FR-ETS-13 | Moyenne | UNDER_REVIEW |

## 4. Exigences référencées (possédées par d'autres sous-fonctionnalités)
Aucune.

## 5. Exigences non fonctionnelles
| ID | Exigence | Mesure | Statut |
|---|---|---|---|
| — | Aucune exigence non fonctionnelle propre | — | — |

## 6. Règles métier et contraintes
| ID | Règle | Source (chunk_id, clé `policy.yaml`, décision) |
|---|---|---|
| BR-009-02-01 | Sécurité des traitements | Loi 2024/017 art. 15 et 27 (D-029 §2) |

## 7. Critères d'acceptation
| ID | Exigences | Critère (étant donné, quand, alors) | Vérifié par |
|---|---|---|---|
| CA-009-02-01 | FR-905 | Étant donné une inscription, quand on lit le stockage, alors aucune trace du mot de passe en clair. | TEST-009-02-01 |
| CA-009-02-02 | FR-906 | Étant donné « motdepasse », « M041618186649L1 » ou « Pharmacie2026 » pour la Pharmacie…, quand on valide, alors refus avec le motif. | TEST-009-02-02 |
| CA-009-02-03 | FR-907 | Étant donné 5 échecs, quand on retente avec le bon mot de passe, alors refus et « réessayez dans 15 min ». | TEST-009-02-03; CA-ETS-11 |
| CA-009-02-04 | FR-908 | Étant donné une session, quand on se déconnecte, alors `nolo:pro-session` est vide et le tableau de bord inaccessible. | TEST-009-02-04 |
| CA-009-02-05 | FR-909 | Étant donné un compte vérifié désactivé, quand on cherche ses médicaments, alors il n'apparaît pas ; réactivé, il revient. | TEST-009-02-05 |

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
4. `app/js/screens/pro/compte.js`
5. `app/js/domain/pro.js`
6. `app/js/screens/pro/entree.js`
7. `src/server/etablissements/securite.py`
