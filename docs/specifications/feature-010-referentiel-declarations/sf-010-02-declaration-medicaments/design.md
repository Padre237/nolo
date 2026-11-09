# SF-010-02 — Déclaration du stock de médicaments (import d'un fichier) — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-401, FR-1006, FR-1007, FR-1008, FR-1009, FR-1010 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-010-02-01 | FR-1007, FR-1008 | `app/js/domain/pro.js` | `lireFichier`, `MODELE_CSV`, `EXEMPLE_CSV`, `NIVEAUX_STOCK`, `FORMES` | Lecture et contrôle |
| DES-010-02-02 | FR-1009 | `app/js/domain/pro.js` | `fraicheur` | Expiration et alerte |
| DES-010-02-03 | FR-1006, FR-1010, FR-401 | `app/js/screens/pro/vue-stock.js` | actions `modele`, `copier-modele`, `exemple-stock`, `confirmer-stock` | Onglet Stock |
| DES-010-02-04 | FR-1007, FR-1008, FR-1009 | `src/server/etablissements/stock.py` | import XLSX/CSV, rapport | Référence serveur |

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
