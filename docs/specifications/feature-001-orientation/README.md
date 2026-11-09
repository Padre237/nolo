# F-001 — Orientation à partir des signes

| Champ | Valeur |
|---|---|
| Version | 2.0.0 (catalogue v2, D-036) |
| Statut | UNDER_REVIEW |
| Origine | Spécification v1.3 001 ; D-018 ; D-026 ; D-027 ; D-033 (POC) ; D-034 |
| Plage FR | FR-120 à FR-199 (v1) ; FR-1501 à FR-1599 (v2) |
| Plage NFR | NFR-101 à NFR-199 ; NFR-1501 à NFR-1599 |

## Objectif
Permettre à une personne de décrire ce qu'elle ressent avec ses mots, de recevoir ses signes reformulés en termes clairs, d'être alertée immédiatement si un signe de danger est présent, puis — en mode démonstration seulement — de voir au plus trois pistes expérimentales et la structure adaptée, avec une fiche à montrer au soignant. Rien ne quitte le téléphone.

## Sous-fonctionnalités
| ID | Nom | Exigences possédées | Statut du dossier | État d'implémentation | Dépend de | Bloquant | Prio |
|---|---|---|---|---|---|---|---|
| [SF-001-01](sf-001-01-saisie-signes/requirements.md) | Saisie des signes et du contexte (pour qui, âge, description) | FR-105, FR-150, FR-151, FR-152, FR-153, FR-154 | UNDER_REVIEW | Implémenté | SF-013-02, SF-013-04, SF-008-01 | Aucun | P0 |
| [SF-001-02](sf-001-02-retrait-mentions-interdites/requirements.md) | Retrait des mentions interdites avant tout envoi | FR-111, FR-155, FR-156 | UNDER_REVIEW | Partiellement implémenté | SF-001-01, SF-001-13 | Aucun | P0 |
| [SF-001-04](sf-001-04-paquet-regles/requirements.md) | Chargement et contrôle du paquet de règles de triage (moteur v1) | FR-113, FR-160, FR-161 | UNDER_REVIEW | Implémenté | SF-007-01, SF-001-03 | Aucun | P0 |
| [SF-001-07](sf-001-07-calcul-niveau/requirements.md) | Calcul du niveau d'urgence (moteur v1) — affiché seulement s'il vaut « urgence » | FR-101, FR-104, FR-110, FR-165, FR-166, FR-167, FR-168 | UNDER_REVIEW | Implémenté | SF-001-03, SF-001-04, SF-001-05, SF-001-06, SF-007-09 | Aucun | P0 |
| [SF-001-08](sf-001-08-urgence-sans-consentement/requirements.md) | Urgence sur l'appareil sans consentement | FR-112, FR-175 | UNDER_REVIEW | Implémenté | SF-001-14, SF-008-01 | Aucun | P0 |
| [SF-001-09](sf-001-09-cas-ambigu/requirements.md) | Cas ambigu : relèvement prudent et renvoi vers un soignant | FR-180, FR-181, FR-182 | UNDER_REVIEW | Non implémenté | SF-001-07, SF-008-06 | D-013 | P1 |
| [SF-001-10](sf-001-10-structure-adaptee/requirements.md) | « Où aller » : structure adaptée aux besoins | FR-185, FR-186, FR-187, FR-188, FR-189 | UNDER_REVIEW | Implémenté | SF-001-15, SF-010-01, SF-003-02 | Aucun | P0 |
| [SF-001-11](sf-001-11-filtre-sortie/requirements.md) | Filtre de sortie : aucun médicament, posologie ni alternative | FR-102, FR-190, FR-191, FR-192 | UNDER_REVIEW | Implémenté | SF-001-15 | Aucun | P0 |
| [SF-001-12](sf-001-12-numeros-urgence/requirements.md) | Numéros d'urgence et barre de sécurité | FR-114, FR-195, FR-196 | UNDER_REVIEW | Implémenté | SF-007-01, SF-013-01 | D-004 | P0 |
| [SF-001-13](sf-001-13-reformulation/requirements.md) | « Décrire ce que je ressens » : reformulation bilingue, négation et durée | FR-1501, FR-1502, FR-1503, FR-1504, FR-1505, FR-1506, FR-1507, FR-1508, NFR-1501 | UNDER_REVIEW | Implémenté | SF-001-01, SF-013-04 | Aucun | P0 |
| [SF-001-14](sf-001-14-securite-urgence/requirements.md) | Questions de sécurité et alerte d'urgence | FR-1511, FR-1512, FR-1513, FR-1514, FR-1515 | UNDER_REVIEW | Implémenté | SF-001-13, SF-001-12 | Aucun | P0 |
| [SF-001-15](sf-001-15-pistes-poc/requirements.md) | Pistes expérimentales (POC) : au plus trois, avec leur score et leur origine | FR-1521, FR-1522, FR-1523, FR-1524, FR-1525, FR-1526, FR-1527, FR-1528 | UNDER_REVIEW | Partiellement implémenté | SF-001-14, SF-001-16, SF-001-17, SF-007-03 | Avis du juriste (L5, V9) avant tout usage hors démo | P0 |
| [SF-001-16](sf-001-16-message-neutre-art48/requirements.md) | Message neutre pour une piste relevant de l'art. 48 | FR-1536, FR-1537, FR-1538 | UNDER_REVIEW | Implémenté | SF-001-15 | Aucun | P0 |
| [SF-001-17](sf-001-17-hors-champ/requirements.md) | Hors champ du modèle expérimental | FR-1541, FR-1542, FR-1543 | UNDER_REVIEW | Implémenté | SF-001-15 | Aucun | P0 |
| [SF-001-18](sf-001-18-fiche-soignant/requirements.md) | Fiche à montrer au soignant (carnet) | FR-1546, FR-1547, FR-1548, FR-1549 | UNDER_REVIEW | Implémenté | SF-001-13, SF-001-15, SF-013-09 | Aucun | P0 |
| [SF-001-19](sf-001-19-modele-ddxplus/requirements.md) | Modèle DDXPlus sur l'appareil, parité et évaluation | FR-1561, FR-1562, FR-1563, FR-1564, FR-1565, FR-1566 | UNDER_REVIEW | Non implémenté | SF-001-15, SF-011-01, SF-012-05 | Téléchargement de DDXPlus (figshare) par l'équipe ; réseau du poste | P1 |

## Comment travailler dans cette fonctionnalité
1. Choisir la prochaine tâche dans `docs/ETAT.md` (jamais au hasard).
2. Lire le §10 de `requirements.md` du dossier concerné : il liste le contexte exact à charger.
3. Appliquer le protocole de `CLAUDE.md` (spécification approuvée, tests avant le code, preuve d'exécution).

