# SF-010-04 — Inscription d'un établissement en quatre étapes — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1016, FR-1017, FR-1018, FR-1019, FR-1020, FR-1021, FR-1022 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-010-04-01 | FR-1016 | `app/js/screens/patient/accueil.js`, `app/js/screens/pro/entree.js` | lien et écran d'entrée | Accès |
| DES-010-04-02 | FR-1017, FR-1018, FR-1021 | `app/js/screens/pro/inscription.js` | 4 étapes, `PICTO`, actions `precedent`, `gps` | Parcours |
| DES-010-04-03 | FR-1019, FR-1022 | `app/js/domain/pro.js` | `normaliserNiu`, `erreurNiu`, `erreurEmail`, `erreurTelephone`, `TYPES`, `COMMUNES` | Contrôles |
| DES-010-04-04 | FR-1020 | `app/js/screens/pro/compte.js`, `src/server/etablissements/service.py` | unicité | Un compte par NIU et e-mail |

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
