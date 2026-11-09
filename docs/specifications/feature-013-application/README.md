# F-013 — Socle de l'application Nolo

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Spécification v1.3 003 (FR-306) ; D-027 ; D-034 |
| Plage FR | FR-1301 à FR-1399 |
| Plage NFR | NFR-1301 à NFR-1399 |

## Objectif
Le socle commun de la PWA : routes et gardes, rendu, langues d'égale valeur, design system « Premium Medical Intelligence », accessibilité, mouvement, hors ligne, page hébergée et inspection visuelle.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-013-01](sf-013-01-accueil-navigation/requirements.md) | Accueil, navigation et bandeau d'urgence | FR-306, FR-1301, FR-1302, FR-1303 | UNDER_REVIEW | Implémenté | SF-013-02 | Aucun | P0 |
| [SF-013-02](sf-013-02-routeur-gardes/requirements.md) | Routes, gardes et interface des écrans | FR-1305, FR-1306, FR-1307, FR-1308 | UNDER_REVIEW | Implémenté | Aucune | Aucun | P0 |
| [SF-013-03](sf-013-03-rendu-evenements/requirements.md) | Rendu, mise à jour du DOM et délégation des événements | FR-1310, FR-1311, FR-1312, FR-1313 | UNDER_REVIEW | Implémenté | Aucune | Aucun | P0 |
| [SF-013-04](sf-013-04-langues/requirements.md) | Deux langues d'égale valeur et typographie française | FR-1315, FR-1316, FR-1317, FR-1318 | UNDER_REVIEW | Implémenté | Aucune | Aucun | P0 |
| [SF-013-05](sf-013-05-design-system/requirements.md) | Design system « Premium Medical Intelligence » | FR-1320, FR-1321, FR-1322, FR-1323, FR-1324 | UNDER_REVIEW | Implémenté | Aucune | Aucun | P0 |
| [SF-013-06](sf-013-06-accessibilite/requirements.md) | Accessibilité | FR-1326, FR-1327, FR-1328, FR-1329, FR-1330 | UNDER_REVIEW | Implémenté | SF-013-03 | Aucun | P0 |
| [SF-013-07](sf-013-07-mouvement/requirements.md) | Mouvement et micro-interactions | FR-1332, FR-1333, FR-1334 | UNDER_REVIEW | Implémenté | SF-013-02 | Aucun | P0 |
| [SF-013-08](sf-013-08-hors-ligne/requirements.md) | Fonctionnement hors ligne (PWA) | FR-1336, FR-1337, FR-1338 | UNDER_REVIEW | Implémenté | SF-013-02 | Aucun | P0 |
| [SF-013-09](sf-013-09-page-hebergee/requirements.md) | Page hébergée dans un cadre (artefact) | FR-1340, FR-1341, FR-1342 | UNDER_REVIEW | Implémenté | SF-013-02 | Aucun | P0 |
| [SF-013-10](sf-013-10-inspection-visuelle/requirements.md) | Inspection visuelle automatisée | FR-1344, FR-1345, FR-1346, FR-1347 | UNDER_REVIEW | Implémenté | SF-013-06 | Aucun | P0 |
| [SF-013-11](sf-013-11-etat-stockage/requirements.md) | État de l'application et stockage local | FR-1348, FR-1349, FR-1350 | UNDER_REVIEW | Implémenté | Aucune | Aucun | P0 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

