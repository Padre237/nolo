# SF-017-03 — Vidéo de démonstration (≤ 7 min) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Non implémenté |
| Origine | Règles du hackathon ; conseils du mentor (session 4) |
| Bloquant | Aucun |
| Dépend de | F-001, F-007, F-010, F-015 |
| Priorité | P1 |

## 1. Objectif métier et résultat attendu
Une vidéo de 6 min 30 environ, filmée sur l'application réelle, montre que la démo fonctionne, pourquoi elle est agentique et quel problème elle résout ; sous-titres incrustés, script et sous-titres FR/EN fournis.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Équipe | Valider le déroulé, enregistrer une voix éventuelle | Montrer une fonction comme réelle si elle est simulée | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-2312 | La vidéo MUST durer au plus 7 min (cible 6 min 30) et suivre le déroulé validé (problème, agents et Y.3172, parcours citoyen, garde-fous, établissements, ministère, politique et lacunes, réel et simulé). | Règles du hackathon | Haute | UNDER_REVIEW |
| FR-2313 | Elle MUST être filmée sur l'application réelle (Playwright, 1920 × 1080, 30 i/s, H.264), sans maquette. | Proposition du 2026-11-09 | Haute | UNDER_REVIEW |
| FR-2314 | Elle MUST être accompagnée du script de narration minuté et des sous-titres `.srt` en anglais et en français. | Proposition du 2026-11-09 | Moyenne | UNDER_REVIEW |
| FR-2315 | Le fichier MUST rester sous la limite de GitHub (100 Mio) ou être publié dans une Release. | Session 5 ; limites GitHub | Moyenne | UNDER_REVIEW |

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
| CA-017-03-01 | FR-2312, FR-2313 | Étant donné le MP4, quand on lit sa durée et ses propriétés, alors ≤ 7:00, 1920 × 1080, 30 i/s. | TEST-017-03-01 |
| CA-017-03-02 | FR-2314 | Étant donné le dépôt, quand on cherche le script et les `.srt`, alors présents dans les deux langues. | TEST-017-03-02 |
| CA-017-03-03 | FR-2315 | Étant donné le fichier, quand on lit sa taille, alors < 100 Mio. | TEST-017-03-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-017-livrables/README.md`
3. les quatre fichiers de ce dossier
4. `tools/video/`
5. `docs/submission/video/`
