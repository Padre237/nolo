# SF-001-15 — Pistes expérimentales (POC) : au plus trois, avec leur score et leur origine — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-15 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1521, FR-1522, FR-1523, FR-1524, FR-1525, FR-1526, FR-1527, FR-1528 |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; table de démonstration en attendant DDXPlus (SF-001-19) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-15-01 — Calcul et classement des pistes
- Exigences : FR-1522, FR-1525
- Conception : DES-001-15-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/engine.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-15-02, TEST-001-15-05 réussis
- Tests : TEST-001-15-02, TEST-001-15-05
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-15-02 — Écran des pistes étiqueté
- Exigences : FR-1523, FR-1524
- Conception : DES-001-15-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/pistes.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-001-15-03, TEST-001-15-04 réussis
- Tests : TEST-001-15-03, TEST-001-15-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-15-03 — Garde du module (mode et `diagnostic_poc.actif`)
- Exigences : FR-1521
- Conception : DES-001-15-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/app.js` (garde de route), `app/js/domain/politique.js`
- Résultat attendu : Pistes absentes hors démo
- Dépend de : SF-007-17
- Condition de fin : TEST-001-15-01 réussis
- Tests : TEST-001-15-01
- Statut : Fait (2026-11-09) — `moduleActif` (`app/js/domain/politique.js`) ; route `#/pistes` absente hors démonstration ; parcours Vérifier → Où aller sans piste

### TASK-001-15-04 — Décision de Conformité et journal avant affichage
- Exigences : FR-1526, FR-1527
- Conception : DES-001-15-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/agents/orchestrateur.js`, `app/js/screens/patient/pistes.js`
- Résultat attendu : Décision citée, journal minimal
- Dépend de : SF-007-17
- Condition de fin : TEST-001-15-06 réussis
- Tests : TEST-001-15-06
- Statut : Fait (2026-11-09) — `deciderResultat` (`app/js/agents/parcours.js`) appelé par « Vérifier » avant tout affichage ; journal : module, empreinte, nombre

### TASK-001-15-05 — Mention « table de démonstration » à l'écran
- Exigences : FR-1528
- Conception : DES-001-15-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/pistes.js`, catalogues
- Résultat attendu : Mention visible
- Dépend de : —
- Condition de fin : TEST-001-15-07 réussis
- Tests : TEST-001-15-07
- Statut : Fait (2026-11-09) — clé `pistes.tableDemo` affichée en tête de l'encart d'origine

