# SF-017-02 — Dépôt GitHub public — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-02 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| Exigences couvertes | FR-2306, FR-2307, FR-2308, FR-2309 |
| État d'implémentation | Implémenté — 2026-11-09 (D-037) : contrôle avant publication et README corrigé ; TEST-017-02-01 (README sur machine propre) non exécuté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-017-02-01 — Fichiers de racine
- Exigences : FR-2306, FR-2307, FR-2309
- Conception : DES-017-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `README.md`, `README.fr.md`, `THIRD_PARTY_NOTICES.md`, `.gitignore`, `requirements.txt`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-017-02-01, TEST-017-02-02, TEST-017-02-04 réussis
- Tests : TEST-017-02-01, TEST-017-02-02, TEST-017-02-04
- Statut : Fait (2026-11-09, demande explicite du propriétaire, D-036) ; README.md et README.fr.md corrigés le 2026-11-09 : quatre verdicts de l'agent Conformité (FR-2306, D-037)

### TASK-017-02-02 — Contrôle avant publication
- Exigences : FR-2308
- Conception : DES-017-02-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/controle_publication.py` (créer)
- Résultat attendu : Rien d'interdit
- Dépend de : —
- Condition de fin : TEST-017-02-03 réussis
- Tests : TEST-017-02-03
- Statut : Fait (2026-11-09)

