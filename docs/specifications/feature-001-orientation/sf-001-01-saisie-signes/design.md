# SF-001-01 — Saisie des signes et du contexte (pour qui, âge, description) — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-105, FR-150, FR-151, FR-152, FR-153, FR-154 |
| ADR | ADR-003, ADR-005 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
Écran `app/js/screens/patient/decrire.js` (route `#/decrire`). Le cas vit dans `store.cas` (`app/js/etat.js`). La validation est locale ; l'action `analyser` (formulaire) appelle `reformuler` puis mène à `#/verifier`.

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-01-01 | FR-150, FR-152, FR-153 | `app/js/screens/patient/decrire.js` | `render`, `casVide`, actions `exemple`, `age-moins`, `age-plus`, `unite`, `liste` | Formulaire en deux temps (récit + surface) |
| DES-001-01-02 | FR-151 | `app/js/screens/patient/decrire.js` | `erreurs(c)` | Règles de validation et clés `decrire.erreurs.*` |
| DES-001-01-03 | FR-154, FR-105 | `app/js/etat.js` | `store.cas` (non persisté) | Cas en mémoire de l'onglet ; position de référence fixe `ORIGINE` (`app/js/domain/facilities.js`), aucune géolocalisation du citoyen |

## 3. États et interface
| État | Déclencheur | Affichage (clés i18n) | Actions possibles |
|---|---|---|---|
| Vide | Première ouverture | `decrire.titre`, `decrire.chapo`, `decrire.exemplesT` | Choisir, saisir, toucher un exemple |
| Erreurs | Validation refusée (`tente: true`) | `decrire.erreurs.qui\|age\|ageMax\|texte` | Corriger |
| Prêt | Champs valides | Bouton principal actif | Analyser → `#/verifier` |

## 4. Données
| Champ | Type | Contrainte | Source |
|---|---|---|---|
| cas.qui | 'moi' \| 'enfant' | obligatoire | FR-150 |
| cas.age | { valeur: number, unite: 'ans' \| 'mois' } | 0 ≤ valeur ≤ 120 ans ou ≤ 59 mois | FR-151 |
| cas.texte | string | 3 à 600 caractères | FR-151, FR-152 |

## 5. Contrats d'interface
Aucun contrat propre.

## 6. Erreurs
| Code | Condition | Rendu |
|---|---|---|
| qui | « pour qui » absent | `decrire.erreurs.qui` |
| age / ageMax | âge absent ou hors bornes | `decrire.erreurs.age`, `decrire.erreurs.ageMax` |
| texte | moins de 3 caractères | `decrire.erreurs.texte` |

## 7. Journal et confidentialité
- Rien n'est journalisé ni transmis (FR-154).

## 8. Accessibilité, langues et mouvement
- Chaque erreur est reliée au champ (`aria-describedby`) ; boutons ± de 44 px ; unité en `aria-pressed` ; clavier complet.
- Textes en FR et EN d'égale valeur (`app/js/i18n/fr.js`, `en.js`).

## 9. Écarts entre cette spécification et le code
- Aucun écart connu (écarts résolus le 2026-11-09 : les distances partent de la position consentie, du quartier ou du point de référence (SF-008-03)).
