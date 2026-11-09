# SF-008-08 — Page « Conditions d'utilisation et politique de données » — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-871, FR-872, FR-873 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-008-08-01 | FR-871 | `app/js/screens/patient/bienvenue.js`, `app/js/screens/patient/conditions.js` | brouillon conservé dans `store` | Lien sans perte |
| DES-008-08-02 | FR-872, FR-873 | `app/js/i18n/fr.js`, `app/js/i18n/en.js` | `conditions.sections` (12) | Contenu bilingue |

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
- Aucun écart connu (écarts résolus le 2026-11-09 : 16 sections identifiées (`id`), FR = EN, couvrant les douze rubriques de FR-872).
