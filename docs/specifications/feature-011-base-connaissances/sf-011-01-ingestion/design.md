# SF-011-01 — Ingestion et découpage des sources — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1101, FR-1102, FR-1103, FR-1104 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-011-01-01 | FR-1101, FR-1102, FR-1103 | `kb/build_kb.py` | découpage (modes `article`, `section_cmr_en`, fenêtres) | Construction |
| DES-011-01-02 | FR-1104 | `kb/sources.json` | catalogue | Sources |

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
