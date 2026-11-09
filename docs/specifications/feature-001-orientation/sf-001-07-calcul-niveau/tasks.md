# SF-001-07 — Calcul du niveau d'urgence (moteur v1) — affiché seulement s'il vaut « urgence » — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-101, FR-104, FR-110, FR-165, FR-166, FR-167, FR-168 |
| État d'implémentation | Implémenté (2026-11-09, D-038) : urgence seulement dans Nolo |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-07-01 — Moteur v1 et parité
- Exigences : FR-165, FR-167
- Conception : DES-001-07-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/client/ondevice/moteur_triage.mjs`
- Résultat attendu : Parité 0 écart
- Dépend de : —
- Condition de fin : TEST-001-07-01, TEST-001-07-03 réussis
- Tests : TEST-001-07-01, TEST-001-07-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-07-02 — Journalisation des décisions de triage
- Exigences : FR-110
- Conception : DES-001-07-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/agents/orchestrateur.py`
- Résultat attendu : Entrées par empreinte
- Dépend de : —
- Condition de fin : TEST-001-07-04 réussis
- Tests : TEST-001-07-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-07-03 — Brancher le moteur v1 dans Nolo (urgence seulement)
- Exigences : FR-166, FR-168
- Conception : DES-001-07-03
- Fichiers à lire : `src/client/ondevice/moteur_triage.mjs`, `src/client/ondevice/extracteur_lexical.mjs`, `app/js/domain/engine.js`
- Fichiers à créer ou modifier : `app/js/domain/engine.js`, `app/js/vendor/moteur_triage.mjs` (copie versionnée)
- Résultat attendu : Les deux détections s'additionnent ; aucun autre niveau affiché
- Dépend de : SF-001-04
- Condition de fin : TEST-001-07-02, TEST-001-07-05 réussis
- Tests : TEST-001-07-02, TEST-001-07-05
- Statut : Fait (2026-11-09) — `app/js/domain/triage.js`, copie versionnée `app/js/vendor/` (`tools/maj_moteur_nolo.py`), `analyser(…, { moteur })`, trace avec la règle citée

