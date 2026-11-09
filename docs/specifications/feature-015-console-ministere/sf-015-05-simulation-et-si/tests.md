# SF-015-05 — Simulation « et si » de la politique de surveillance — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2124, FR-2125, FR-2126 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-015-05-01 — Effets d'une variante
- Type : Unitaire
- Exigences : FR-2124
- Critères d'acceptation : CA-015-05-01
- Étant donné : seuil 3 ; maille district
- Quand : `simuler`
- Alors : cellules fines ; détection retardée
- Données : —
- Automatisation : `app/tests/surveillance.test.mjs` › « « Et si » : baisser le seuil publie des cases fines ; agréger au district retarde la détection » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-015-05-02 — Surlignage
- Type : Interface
- Exigences : FR-2125
- Critères d'acceptation : CA-015-05-02
- Étant donné : une variante
- Quand : lecture
- Alors : lignes surlignées
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-015-05-03 — Réinitialiser
- Type : Interface
- Exigences : FR-2126
- Critères d'acceptation : CA-015-05-03
- Étant donné : une variante
- Quand : réinitialiser
- Alors : aucune différence
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

