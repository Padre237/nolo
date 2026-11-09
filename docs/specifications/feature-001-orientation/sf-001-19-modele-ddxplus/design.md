# SF-001-19 — Modèle DDXPlus sur l'appareil, parité et évaluation — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-19 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1561, FR-1562, FR-1563, FR-1564, FR-1565, FR-1566 |
| ADR | — |
| État d'implémentation | Non implémenté |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-19-01 | FR-1561 | `tools/ddxplus/entrainer.py`, `app/js/domain/modele.js` (à créer) | export JSON ; `inferer` | Modèle et moteur |
| DES-001-19-02 | FR-1562, FR-1563 | `kb/datasets/ddxplus.md`, `tools/ddxplus/evaluer.py` | fiche ; évaluation | Documentation et mesure |
| DES-001-19-03 | FR-1564, FR-1565, FR-1566 | `rules/ddxplus_correspondance.yaml`, `rules/ddxplus_retraits.yaml` | tables | Correspondance, retraits, catégories |

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
