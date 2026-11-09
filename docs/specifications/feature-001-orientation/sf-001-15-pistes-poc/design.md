# SF-001-15 — Pistes expérimentales (POC) : au plus trois, avec leur score et leur origine — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-15 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1521, FR-1522, FR-1523, FR-1524, FR-1525, FR-1526, FR-1527, FR-1528 |
| ADR | — |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-15-01 | FR-1522, FR-1525 | `app/js/domain/engine.js` | `analyser`, `score`, `PATHOLOGIES`, `POLITIQUE` | Calcul local, rien n'est stocké |
| DES-001-15-02 | FR-1523, FR-1524, FR-1528 | `app/js/screens/patient/pistes.js`, `app/js/i18n/*.js` | `nomPiste`, `render` | Affichage étiqueté |
| DES-001-15-03 | FR-1521, FR-1526, FR-1527 | `app/js/agents/orchestrateur.js` (à créer, SF-007-17) | actions `diagnostic.afficher_hypotheses`, `orientation.recommander_structure` | Garde du module et journal |

## 3. États et interface
| État | Déclencheur | Affichage (clés i18n) | Actions possibles |
|---|---|---|---|
| — | Sans objet (aucun écran) | — | — |

## 4. Données
| Champ | Type | Contrainte | Source |
|---|---|---|---|
| — | — | Aucune donnée propre | — |

## 5. Contrats d'interface
Aucun contrat propre.

## 6. Erreurs
| Code | Condition | Rendu |
|---|---|---|
| — | Aucune erreur propre | — |

## 7. Journal et confidentialité
- Aucun événement de journal propre ; rien n'est transmis.

## 8. Accessibilité, langues et mouvement
- Sans objet.

## 9. Écarts entre cette spécification et le code
- FR-1521 : le module est toujours actif (aucune lecture du mode ni de `diagnostic_poc.actif`).
- FR-1526, FR-1527 : aucune décision de Conformité ni journal dans Nolo (AG-01, SF-007-17).
- FR-1528 : la mention « table de démonstration » figure dans le code, pas à l'écran.
