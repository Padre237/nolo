# SF-009-02 — Authentification des établissements (un compte par établissement) — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-905, FR-906, FR-907, FR-908, FR-909 |
| ADR | ADR-012 (remplacée), ADR-016 (à écrire) |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-009-02-01 | FR-905, FR-908 | `app/js/screens/pro/compte.js` | `empreinte`, `ouvrirSession`, `fermerSession`, `comptes`, `compteCourant` | Comptes sur l'appareil |
| DES-009-02-02 | FR-906 | `app/js/domain/pro.js` | `erreurMotDePasse` | Règles du mot de passe |
| DES-009-02-03 | FR-907 | `app/js/screens/pro/entree.js` | connexion (`pro-essais`) | Blocage |
| DES-009-02-04 | FR-905, FR-906, FR-907, FR-909 | `src/server/etablissements/securite.py`, `service.py` | `hacher_mot_de_passe`, `verifier_mot_de_passe`, `mot_de_passe_acceptable` | Référence serveur |

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
- Nolo : repli d'empreinte non cryptographique si `crypto.subtle` manque (contexte non sécurisé) — prototype seulement, à retirer à l'intégration.
