# SF-XXX-NN — <Nom> — Conception

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | SF-XXX-NN |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-…, NFR-… |
| ADR | ADR-0NN, … |

## 1. Comportement fonctionnel et workflow
1. …

## 2. Interactions utilisateur et états de l'interface
| État | Déclencheur | Affichage (codes i18n) | Actions possibles |
|---|---|---|---|
<ou « Sans objet : traitement sans écran », avec justification>

## 3. Composants et responsabilités
| Composant | Fichier (cible) | Responsabilité |
|---|---|---|

## 4. Modèle de données
<Entités de `docs/architecture/shared/data-model.md` utilisées ; champs ajoutés (à reporter dans le modèle partagé).>

## 5. Contrats d'interface
### 5.1 API
`MÉTHODE /api/v1/…` — rôle requis : … — action de conformité : `…`
Requête :
```json
{}
```
Réponse 200 :
```json
{"donnees": {}, "meta": {}}
```
Erreurs : E-…, E-…
### 5.2 Interfaces internes
```python
def …(…) -> …: ...
```

## 6. Transitions d'état et logique métier
<Algorithme, pseudo-code, tableau d'états.>

## 7. Autorisation et sécurité
- …

## 8. Intégrations externes
- … / Aucune

## 9. Gestion des défaillances et reprise
| Défaillance | Comportement | Journal |
|---|---|---|

## 10. Performance, passage à l'échelle, accessibilité
- …

## 11. Décisions
- ADR appliquées : …
- Décisions à formaliser (nouvel ADR, nouvelle action de conformité, nouveau code d'erreur) : …

## 12. Éléments de conception et couverture
| ID | Élément | Exigences couvertes |
|---|---|---|
| DES-XXX-NN-01 | … | FR-… |

## 13. Existant et écarts
| Élément existant | Fichier | État (conforme / écart / absent) | Preuve | Correction |
|---|---|---|---|---|
