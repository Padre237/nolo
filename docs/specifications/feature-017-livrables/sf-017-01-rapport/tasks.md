# SF-017-01 — Rapport technique (5 pages, anglais) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-01 |
| Version | 2.0.0 |
| Statut | IN_PROGRESS |
| Exigences couvertes | FR-2301, FR-2302, FR-2303, FR-2304 |
| État d'implémentation | Implémenté — rapport, PDF et contrôles du 2026-11-09 (D-037, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-017-01-01 — Mettre à jour le rapport
- Exigences : FR-2301, FR-2302, FR-2303, FR-2304
- Conception : DES-017-01-01
- Fichiers à lire : `docs/traceability/matrix.md`, `docs/ETAT.md`
- Fichiers à créer ou modifier : `docs/submission/`
- Résultat attendu : Rapport conforme
- Dépend de : —
- Condition de fin : TEST-017-01-01, TEST-017-01-02, TEST-017-01-03 réussis
- Tests : TEST-017-01-01, TEST-017-01-02, TEST-017-01-03
- Statut : Fait (2026-11-09) — `docs/submission/rapport-technique-en.md`, PDF `../livrables/rapport-technique-en.pdf` (`tools/rapport_pdf.py`), contrôle `tools/verifier_rapport.py` ; coordonnées de l'équipe et lien de la vidéo laissés à compléter

### TASK-017-01-02 — Appliquer les décisions sur Q-017-01-01 et Q-017-01-02
- Exigences : FR-2301, FR-2302
- Conception : DES-017-01-01
- Fichiers à lire : `docs/product/decisions.md`, §9 de `requirements.md` et de `design.md` de ce dossier
- Fichiers à créer ou modifier : `requirements.md` (FR-2302), `design.md` (DES-017-01-01, §9), `docs/submission/rapport-technique-en.md` si la décision le demande
- Résultat attendu : FR-2302 et DES-017-01-01 conformes à la décision ; écarts du §9 retirés
- Dépend de : décision du propriétaire sur Q-017-01-01 et Q-017-01-02
- Condition de fin : TEST-017-01-01, TEST-017-01-02 réussis
- Tests : TEST-017-01-01, TEST-017-01-02
- Statut : Fait (2026-11-09) — D-038 : FR-2302 et DES-017-01-01 corrigés, §9 de design.md vidé

