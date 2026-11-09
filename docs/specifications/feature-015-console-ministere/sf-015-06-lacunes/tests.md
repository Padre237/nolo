# SF-015-06 — Registre des lacunes dans la console — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2130, FR-2131 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-015-06-01 — Lacunes bilingues
- Type : Interface
- Exigences : FR-2130
- Critères d'acceptation : CA-015-06-01
- Étant donné : la vue
- Quand : lecture FR et EN
- Alors : trois éléments chacune
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-015-06-02 — Cohérence avec le registre
- Type : Unitaire
- Exigences : FR-2131
- Critères d'acceptation : CA-015-06-02
- Étant donné : registre et catalogues
- Quand : comparaison
- Alors : mêmes identifiants
- Données : —
- Automatisation : `app/tests/qualite.test.mjs` › « TEST-015-06-02 : lacunes de la console = registre docs/compliance/registre-lacunes.md » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

