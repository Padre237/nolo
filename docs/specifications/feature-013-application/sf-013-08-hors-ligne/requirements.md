# SF-013-08 — Fonctionnement hors ligne (PWA) — Exigences

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |
| Origine | D-034 ; ADR-003 |
| Bloquant | Aucun |
| Dépend de | SF-013-02 |
| Priorité | P0 |

## 1. Objectif métier et résultat attendu
Nolo s'installe comme une application et fonctionne sans réseau : le service worker met en cache tous les fichiers et la tuile du district.

## 2. Rôles et conditions d'accès
| Rôle | Peut | Ne peut pas | Condition (mode, consentement, compte) |
|---|---|---|---|
| Citoyen | Installer, utiliser hors ligne | — | — |

## 3. Exigences fonctionnelles possédées
| ID | Exigence | Origine | Priorité | Statut |
|---|---|---|---|---|
| FR-1336 | `app/sw.js` MUST mettre en cache tous les fichiers de l'application (liste `FICHIERS`) sous une `VERSION` qui change à chaque livraison, et supprimer les anciens caches. | ADR-003 | Haute | UNDER_REVIEW |
| FR-1337 | `app/manifest.webmanifest` MUST déclarer nom, nom court, langue, `start_url`, `display: standalone`, couleurs et icônes 192 et 512 (dont `maskable`). | ADR-003 | Haute | UNDER_REVIEW |
| FR-1338 | L'échec d'enregistrement du service worker MUST être silencieux : l'application marche quand même. | D-034 | Haute | UNDER_REVIEW |

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
| CA-013-08-01 | FR-1336 | Étant donné l'application chargée une fois, quand on coupe le réseau et recharge, alors tous les écrans s'affichent. | TEST-013-08-01 |
| CA-013-08-02 | FR-1337 | Étant donné le manifeste, quand on le valide, alors tous les champs présents. | TEST-013-08-02 |
| CA-013-08-03 | FR-1338 | Étant donné les service workers bloqués, quand on charge, alors aucune erreur visible. | TEST-013-08-03 |

## 8. Hors périmètre
Rien de particulier.

## 9. Questions ouvertes
| ID | Question | Proposition | Statut |
|---|---|---|---|
| — | Aucune | — | — |

## 10. Contexte à charger avant de travailler sur ce dossier
Lire dans cet ordre, et rien d'autre tant que la tâche n'exige pas davantage :
1. `CLAUDE.md` puis `docs/ETAT.md`
2. `docs/specifications/feature-013-application/README.md`
3. les quatre fichiers de ce dossier
4. `app/sw.js`
5. `app/manifest.webmanifest`
6. `app/js/app.js`
