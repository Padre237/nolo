# SF-002-01 — Contribution consentie à la surveillance — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-201, FR-220, FR-221, FR-222 |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-002-01-01 — Charge minimale de la contribution
- Exigences : FR-201, FR-220
- Conception : DES-002-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/envoi.js`
- Résultat attendu : Quatre champs
- Dépend de : SF-001-02
- Condition de fin : TEST-002-01-01 réussis
- Tests : TEST-002-01-01
- Statut : Fait (2026-11-09) — `preparerEnvoi` : exactement codes, aire, semaine ISO, tranche d'âge

### TASK-002-01-02 — Déduplication côté serveur
- Exigences : FR-221
- Conception : DES-002-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/domain/surveillance.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-002-01-02 réussis
- Tests : TEST-002-01-02
- Statut : Fait (2026-11-09) — `dedupliquer` (`src/server/domain/surveillance.py`), appliquée par `agreger`

### TASK-002-01-03 — Décision de Conformité
- Exigences : FR-222
- Conception : DES-002-01-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/agents/conformite.py`
- Résultat attendu : BLOQUE sans consentement
- Dépend de : —
- Condition de fin : TEST-002-01-03 réussis
- Tests : TEST-002-01-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

