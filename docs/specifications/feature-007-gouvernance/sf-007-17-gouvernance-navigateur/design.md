# SF-007-17 — Gouvernance dans Nolo : orchestrateur, Conformité et politique dans le navigateur — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-17 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1901, FR-1902, FR-1903, FR-1904, FR-1905, NFR-1901 |
| ADR | ADR-017 (à écrire : agents dans le navigateur, Python oracle) |
| État d'implémentation | Non implémenté |

## 1. Vue d'ensemble
Nouveaux modules : `app/js/agents/conformite.js` (port de `src/server/agents/conformite.py`), `app/js/agents/orchestrateur.js`, `app/js/domain/politique.js` (charge `app/data/politique.json`). L'oracle : `tools/scenarios/executer.py --exporter-attendus tests/js/fixtures/decisions_attendues.json` (option à ajouter).

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-007-17-01 | FR-1901, FR-1905 | `app/js/agents/orchestrateur.js` (à créer) | `executer({ demandeur, action, categories, finalite, destination }, faire)` | Orchestrateur |
| DES-007-17-02 | FR-1902, FR-1904 | `app/js/agents/conformite.js` (à créer) | `decider(demande, politique)`, `TABLE` | Conformité (port) |
| DES-007-17-03 | FR-1903 | `tools/politique_json.py` (à créer), `app/js/domain/politique.js` (à créer), `app/data/politique.json` | conversion et chargement | Politique unique |
| DES-007-17-04 | FR-1904 | `tools/scenarios/executer.py`, `app/tests/parite_conformite.test.mjs` (à créer) | export des décisions attendues ; test de parité | Oracle |

## 3. États et interface
| État | Déclencheur | Affichage (clés i18n) | Actions possibles |
|---|---|---|---|
| — | Sans objet (aucun écran) | — | — |

## 4. Données
| Champ | Type | Contrainte | Source |
|---|---|---|---|
| — | — | Aucune donnée propre | — |

## 5. Contrats d'interface
```js
// app/js/agents/conformite.js
export function decider(demande, politique) // → { verdict: 'AUTORISE'|'AUTORISE_AVEC_CONDITIONS'|'BLOQUE'|'BLOQUE_SANS_FONDEMENT', conditions: string[], fragments: string[], cles: string[], version, repli, justification }
// app/js/agents/orchestrateur.js
export async function executer(demande, faire) // journalise (SF-007-21) puis appelle faire(decision) si autorisé ; lève E-AGENT-SANS-DECISION sinon
```

## 6. Erreurs
| Code | Condition | Rendu |
|---|---|---|
| E-AGENT-SANS-DECISION | Action exécutée sans décision | Erreur levée ; rien n'est affiché |
| E-AGENT-ACTION-INCONNUE | Action hors catalogue | `BLOQUE_SANS_FONDEMENT` |

## 7. Journal et confidentialité
- Aucun événement de journal propre ; rien n'est transmis.

## 8. Accessibilité, langues et mouvement
- Sans objet.

## 9. Écarts entre cette spécification et le code
- Aucun écart connu.
