# SF-015-04 — Politique versionnée et empreinte — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2119, FR-2120 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-015-04-01 | FR-2119 | `app/js/screens/ministere/console.js` | vue `politique`, `POLITIQUE`, empreinte | Affichage |
| DES-015-04-02 | FR-2120 | `app/js/domain/politique.js` (à créer, SF-007-17), `tools/politique_json.py` (à créer) | conversion YAML → JSON | Source unique |

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
- Aucun écart connu (écarts résolus le 2026-11-09 : la console lit `app/data/politique.json` (1.4.0, converti de `config/policy.yaml`) ; l'ancienne politique 1.3.2 écrite à la main est retirée de `surveillance.js` ; empreinte calculée par `app/js/core/sha256.js`, même résultat que WebCrypto).
