# SF-002-02 — Agrégation par aire et semaine avec seuil de 5 — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-202, FR-225, FR-226 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-002-02-01 — Seuil de publication
- Type : Unitaire
- Exigences : FR-202, FR-225
- Critères d'acceptation : CA-002-02-01
- Étant donné : 3 et 7 cas
- Quand : `publiable`
- Alors : faux puis vrai
- Données : —
- Automatisation : `app/tests/surveillance.test.mjs` › « Seuil de publication : moins de 5 → rien ; sinon arrondi à 5 » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-002-02-02 — Quatre syndromes
- Type : Interface
- Exigences : FR-226
- Critères d'acceptation : CA-002-02-02
- Étant donné : la console
- Quand : lecture du sélecteur
- Alors : quatre syndromes
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

