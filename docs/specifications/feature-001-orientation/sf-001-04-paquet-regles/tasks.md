# SF-001-04 — Chargement et contrôle du paquet de règles de triage (moteur v1) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-113, FR-160, FR-161 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-04-01 — Construction du paquet
- Exigences : FR-160
- Conception : DES-001-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/demo/construire_paquet.py`
- Résultat attendu : Paquet produit
- Dépend de : —
- Condition de fin : TEST-001-04-02 réussis
- Tests : TEST-001-04-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-001-04-02 — Contrôle au chargement
- Exigences : FR-113, FR-161
- Conception : DES-001-04-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/client/ondevice/moteur_triage.mjs`
- Résultat attendu : Paquet refusé si altéré ou sans validateur hors démo
- Dépend de : —
- Condition de fin : TEST-001-04-01, TEST-001-04-03 réussis
- Tests : TEST-001-04-01, TEST-001-04-03
- Statut : Partiel (code existant incomplet, rétro-spécifié le 2026-11-09)

