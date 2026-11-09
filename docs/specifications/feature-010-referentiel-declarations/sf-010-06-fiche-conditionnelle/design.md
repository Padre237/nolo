# SF-010-06 — Fiche conditionnelle selon le type — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1026, FR-1027, FR-1028, FR-1033, FR-1037, FR-1039 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-010-06-01 | FR-1026, FR-1027, FR-1028, FR-1033, FR-1037 | `app/js/domain/pro.js` | `QUESTIONS`, `SOINS`, `questionsVisibles`, `nettoyer`, `completude`, `DOMAINES`, `JOURS` | Logique de la fiche |
| DES-010-06-02 | FR-1028, FR-1039 | `app/js/screens/pro/vue-fiche.js` | actions `repondre-fiche`, `envoyer-fiche`, `sp-basculer`, `sp-modalite`, `sp-jour` | Écran de la fiche |
| DES-010-06-03 | FR-1026, FR-1027, FR-1028 | `src/server/etablissements/fiches.py` | questions et contrôles | Référence serveur |

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
