# SF-011-03 — Recherche documentaire (BM25 ; ChromaDB en option) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-011 Base de connaissances |
| Sous-fonctionnalité | SF-011-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1109, FR-1110, FR-1111 |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-011-03-01 — BM25
- Exigences : FR-1109
- Conception : DES-011-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/bm25.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-011-03-01 réussis
- Tests : TEST-011-03-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-011-03-02 — Ingestion ChromaDB et mesure (poste de l'équipe)
- Exigences : FR-1110, FR-1111
- Conception : DES-011-03-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/ingest_chroma.py`, `docs/quality/`
- Résultat attendu : Mesure datée
- Dépend de : —
- Condition de fin : TEST-011-03-02, TEST-011-03-03 réussis
- Tests : TEST-011-03-02, TEST-011-03-03
- Statut : À faire

