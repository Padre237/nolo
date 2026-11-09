# SF-013-02 — Routes, gardes et interface des écrans — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1305, FR-1306, FR-1307, FR-1308 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-013-02-01 | FR-1305, FR-1306, FR-1307 | `app/js/app.js` | `ROUTES`, `SANS_CONSENTEMENT`, `lireRoute`, `remplacer`, rendu | Routeur |
| DES-013-02-02 | FR-1308 | écrans | `render` | Un h1 |

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
