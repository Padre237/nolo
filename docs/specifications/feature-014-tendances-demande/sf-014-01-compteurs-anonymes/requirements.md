# SF-014-01 — Compteurs anonymes de la demande — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-014 Tendances de la demande |
| Sous-fonctionnalité | SF-014-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-032 (FR-TEND-01, 02 ; CA-TEND-01, 02) |
| Bloquant | Aucun |
| Dépend de | SF-014-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Une recherche non sensible traitée par le serveur incrémente un seul compteur (arrondissement, semaine ISO, type, service, satisfaite) ; rien d'autre n'est gardé. Les recherches sensibles ne sont jamais comptées.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Serveur | Incrémenter un compteur | Garder l'heure, la position ou un identifiant | Mode autorisé |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2001 | Une recherche non sensible MUST incrémenter un seul compteur (arrondissement, semaine ISO, type, service, satisfaite) ; rien d'autre n'est conservé. | FR-TEND-01 | Haute | UNDER_REVIEW |
| FR-2002 | Médicaments sensibles, spécialités sensibles, produits de l'art. 75 et saisies inconnues MUST n'être jamais comptés. | FR-TEND-02 | Haute | UNDER_REVIEW |

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
| CA-014-01-01 | FR-2001 | Étant donné une recherche de paracétamol depuis Douala, quand on lit la base, alors le compteur (Douala V, semaine, médicament, paracétamol, satisfaite) +1, ni heure, ni position, ni identifiant. | TEST-014-01-01; CA-TEND-01 |
| CA-014-01-02 | FR-2002 | Étant donné une recherche de lévonorgestrel ou de psychiatrie, quand on lit la base, alors aucun compteur modifié. | TEST-014-01-02; CA-TEND-02 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-014-tendances-demande/README.md`
3. les quatre fichiers de ce dossier
4. `src/server/etablissements/tendances.py`
