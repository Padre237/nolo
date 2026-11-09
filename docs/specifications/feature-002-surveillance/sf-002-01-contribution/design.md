# SF-002-01 — Contribution consentie à la surveillance — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-201, FR-220, FR-221, FR-222 |
| ADR | — |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-002-01-01 | FR-201, FR-220 | `app/js/domain/envoi.js` (à créer) | `preparerEnvoi(cas, 'surveillance')` | Charge minimale |
| DES-002-01-02 | FR-221 | `src/server/domain/surveillance.py` | réception et déduplication | Référence serveur |
| DES-002-01-03 | FR-222 | `src/server/agents/conformite.py` | action `surveillance.contribuer` | Décision |

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
- Nolo ne transmet aucune contribution (pas de serveur) : les comptes de la console sont fictifs (`compteAire`, `compteRegion`).
