# SF-002-12 — Carte interactive des symptômes pour le ministère — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1606, FR-1607, FR-1608, FR-1609, FR-1610, FR-1611 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-002-12-01 | FR-1606, FR-1609 | `app/js/ui/carte.js`, `app/js/domain/carte-regions.js`, `app/tools/carte.py` | `carteRegions`, `legende`, `TEINTES`, `VUE`, `REGIONS_SVG` | Carte |
| DES-002-12-02 | FR-1607, FR-1611 | `app/js/screens/ministere/console.js` | vue `carte`, actions `syndrome`, curseur, `region` | Filtres et panneau |
| DES-002-12-03 | FR-1608 | `app/js/app.js` | délégation `keydown` sur `[role="button"][data-act]` | Clavier |
| DES-002-12-04 | FR-1610 | `app/js/ui/carte.js` | `schemaAires` | Schéma des aires |

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
- Aucun écart connu.
