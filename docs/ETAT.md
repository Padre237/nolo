# État du projet Nolo

Mis à jour le 2026-11-09 (session de la vague A, D-037). **À lire juste après `CLAUDE.md`, à chaque session.** À mettre à jour à la fin de chaque tâche (CLAUDE.md §11, étape 6).

## 1. En bref

- Le code existant (application Nolo, gouvernance Python, service des établissements, moteur v1, base v9) est réuni dans ce dépôt et **rétro-spécifié** : 146 dossiers de sous-fonctionnalités.
- **Vague A approuvée (D-037)** et livrée le 2026-11-09 : contrôle avant publication (`tools/controle_publication.py`, TASK-017-02-02) et rapport technique (`docs/submission/rapport-technique-en.md`, PDF de 5 pages hors du dépôt, TASK-017-01-01). SF-017-02 est `IN_TESTING`, SF-017-01 `IN_PROGRESS` (TASK-017-01-02 attend la décision sur Q-017-01-01 et Q-017-01-02). Les 144 autres dossiers restent `UNDER_REVIEW`.
- Toutes les suites passent (preuve `docs/quality/preuve-2026-11-09-vague-a.txt`, §4).
- **Rien d'autre ne s'implémente** tant que le propriétaire n'a pas approuvé la vague suivante (§2).
- Soumission du hackathon : **10 novembre 2026**. À compléter par l'équipe dans le rapport : coordonnées de l'équipe et lien de la vidéo.

## 2. Décision attendue du propriétaire (porte G5)

| Objet | À lire | Comment l'enregistrer |
|---|---|---|
| Approbation du catalogue v2 (17 fonctionnalités, 146 sous-fonctionnalités) et de la correspondance v1 → v2 | `docs/specifications/README.md`, `docs/specifications/correspondance-v1-v2.md` | Ligne D-037 dans `docs/product/decisions.md` ; puis, dans chaque dossier approuvé, `Statut` → `APPROVED` (ou `READY_FOR_DEV` si la colonne « Bloquant » vaut « Aucun ») |
| Approbation par vague (possible) | `docs/specifications/INDEX-TACHES.md` | Approuver d'abord la vague A, puis la vague B dans l'ordre du §5 |
| Questions ouvertes | §9 des `requirements.md` (`grep -rn "| Q-" docs/specifications --include=requirements.md`) | Réponse dans la colonne « Statut » de la question, puis décision `D-…` si elle change une règle |
| Constitution 2.0.0 (D-033) | `docs/product/constitution.md` (note en tête) | Décision dédiée ; la version 1.3.2 reste en vigueur d'ici là |

Questions de la vague A (2026-11-09) :
- **Q-017-01-01** : FR-2302 demande « 2 055 fragments, 22 documents » ; aucun fichier de preuve ne porte ce chiffre. Proposition : garder 2 034 / 21 (prouvés) et modifier FR-2302.
- **Q-017-01-02** : le PDF du rapport ne peut pas être dans `docs/submission/` (aucun PDF dans l'arborescence, FR-2308). Proposition : `../livrables/` et corriger DES-017-01-01.
- **Q-017-02-01** : faut-il que le contrôle avant publication cherche aussi les adresses e-mail réelles ? Proposition : liste blanche des domaines de démonstration.

Deux questions nées des contrôles du 2026-11-09 (matin) :
- **Q-013-10-01** : l'inspection visuelle ne contrôle que la mise en page ; 76 tests d'interface restent donc « Non exécuté (état capturé) ». Proposition : FR-1347 et TASK-013-10-03 (assertions de contenu).
- **Q-007-14-01** : `executer.py --scenario orientation_urgente --sans-gouvernance` sort en code 1, par construction (aucune violation à contre-démontrer). Proposition : garder et le documenter.

## 3. Où sont les choses

Carte complète : `CLAUDE.md` §4. Sources de vérité : `CLAUDE.md` §5. En deux lignes : l'application est dans `app/` (PWA sans compilation) ; la référence Python des agents et de la politique est dans `src/server/` et `config/policy.yaml` ; les spécifications sont dans `docs/specifications/feature-XXX-*/sf-XXX-NN-*/` (4 fichiers chacune) ; les preuves sont dans `docs/quality/`.

## 4. Chiffres vérifiés (avec leur preuve)

| Mesure | Valeur | Preuve |
|---|---|---|
| pytest (gouvernance, scénarios, service D-029 / D-032, contrôles des livrables) | 116 réussis (84 + 32 de la vague A) | `docs/quality/preuve-2026-11-09-vague-a.txt` |
| `node --test tests/js/*.test.mjs` (moteur v1, catalogues D-029) | 15 réussis | `docs/quality/preuve-2026-11-09-vague-a.txt` |
| `cd app && node --test tests/*.test.mjs` (Nolo) | 33 réussis | idem |
| Scénarios S1 à S3 avec gouvernance ; S2, S3 sans gouvernance ; deux variantes « et si » | conformes (S1 sans gouvernance : code 1 attendu, Q-007-14-01) | idem |
| Règles de triage v2 | 390 / 390 témoins ; 0 violation de monotonie sur 5 000 | idem |
| Évaluation de la recherche (BM25, version publique) | document attendu 33/40 ; référence exacte 29/40 | idem |
| Base publique | 2 034 fragments, 21 documents (11 camerounais, 10 internationaux) ; 22 fiches dans `kb/sources.json` dont 1 de métadonnées seulement ; 48 lignes de correspondance ; reconstruction identique ; 0 PDF | `docs/quality/preuve-2026-11-09-vague-a.txt` |
| Inspection visuelle (39 états × 4 largeurs) | 156 mesures, 0 défaut, 0 erreur de console | `docs/quality/preuve-2026-11-09-inspection-visuelle.txt` |
| Contrôle avant publication (`tools/controle_publication.py`) | 1 488 fichiers ; 0 PDF, 0 secret, 0 fragment, référence ni page de INT-OMS-AFRO-SBC-2014 | `docs/quality/preuve-2026-11-09-vague-a.txt` |
| Rapport technique (`tools/verifier_rapport.py`) | 6 sections dans l'ordre ; PDF de 5 pages (`pdfinfo`) ; 0 terme périmé ; 36 états concordants | `docs/quality/preuve-2026-11-09-vague-a.txt` |
| Spécifications | 146 dossiers, 483 exigences, 279 tâches, 415 tests ; `trace.py` : 0 erreur | `docs/quality/preuve-2026-11-09-vague-a.txt` |
| Statuts de test (415) | 111 « Exécuté » avec la preuve des suites (croisés : 0 problème), 4 avec la preuve de la vague A (croisés : 0 problème), 5 avec l'inspection, 7 autres (revues, croisement, 1 du 2026-11-03) ; 76 « état capturé » ; 212 non exécutés | `docs/quality/preuve-2026-11-09-croisement.txt`, `python3 tools/croiser_preuves.py docs/quality/preuve-2026-11-09-vague-a.txt` |
| Tâches restantes | 113 (vague A : 1, TASK-017-01-02 en attente de décision ; B : 18 ; C : 79 ; D : 15) ; 39 écarts | `docs/specifications/INDEX-TACHES.md`, `ECARTS.md` |

## 5. Prochaine tâche, par vague

Une tâche ne démarre qu'après approbation de son dossier (§2). Ordre conseillé :

| Vague | Prochaine tâche | Dossier | Vérification | Dépend de |
|---|---|---|---|---|
| **Prochaine** — B, agents dans Nolo (à approuver) | **TASK-011-08-01** Base embarquée (export de `kb/` vers `app/data/base.json`) | `feature-011-base-connaissances/sf-011-08-base-embarquee/` | `cd app && node --test tests/*.test.mjs` ; `python3 tools/controle_publication.py` (aucun fragment réservé exporté) | approbation de la vague B |
| A — reste | **TASK-017-01-02** Appliquer les décisions Q-017-01-01 (chiffre 2 055) et Q-017-01-02 (place du PDF) | `feature-017-livrables/sf-017-01-rapport/` | `python3 tools/verifier_rapport.py` | décision du propriétaire |
| A — reste | TEST-017-02-01 : suivre le README sur une machine propre | `feature-017-livrables/sf-017-02-depot/` | revue | poste propre |
| B | puis SF-007-17 (gouvernance dans le navigateur, parité avec Python) → SF-007-21 (journal chaîné) → SF-007-18 (« Comment Nolo a décidé ») → SF-007-19 (cellule de coordination) → SF-007-20 (rejouer sans gouvernance) → SF-016-01 à SF-016-04 (conseiller) | `feature-007-gouvernance/`, `feature-016-conseiller-droits/` | tests de parité `app/tests/*parite*` | SF-011-08 |
| C — écarts de l'existant | Au choix dans `ECARTS.md` ; prioritaires pour la démo : SF-007-17 (politique 1.3.2 de Nolo ≠ `policy.yaml` 1.3.0, à régler par la conversion), SF-001-15 (POC toujours actif), SF-001-12 (numéros d'urgence écrits en dur), SF-003-02 (rayon : 1 résultat au lieu de 3), SF-005-02 (appel au don) | dossiers cités | tests des dossiers | — |
| D — suite | DDXPlus (SF-001-19), scénario S4 (SF-012-05), carte publique (SF-002-08), vidéo (SF-017-03)… | voir `INDEX-TACHES.md` | — | B pour S4 |

## 6. Points de vigilance (à ne pas oublier)

- Le brouillon du 4 novembre n'a jamais été versé : le rapport a été rédigé à partir du dépôt le 2026-11-09 (choix du propriétaire). Avant l'envoi : compléter les coordonnées de l'équipe et le lien de la vidéo, puis `python3 tools/rapport_pdf.py` et `python3 tools/verifier_rapport.py`. Ne pas mettre d'adresse e-mail réelle dans le dépôt public sans accord (Q-017-02-01).
- Avant tout `git push` : `python3 tools/controle_publication.py` (code 0).
- Nolo n'utilise pas encore le moteur v1 ni le référentiel de 110 entrées : sa liste de 28 signes est propre (SF-001-04, SF-001-07).
- Les tests d'interface « état capturé » ne doivent jamais être annoncés comme réussis.
- Le dépôt public ne contient pas le guide OMS-AFRO SBC 2014 (tous droits réservés) : ne pas le réintroduire (`python3 tools/verifier_base.py`).

## 7. Dépôt distant

- Distant : `https://github.com/Padre237/nolo.git`, branche `main`.
- Le 2026-11-09 (session D-037), le dossier local est devenu un dépôt git (`git init`, `git reset origin/main`) : le distant ne contenait que `LICENSE` (commit initial).

## 8. Journal des sessions

| Date | Travail | Preuves |
|---|---|---|
| 2026-11-03 → 11-04 | Spécifications v1.3 (BOUSSOLE), gouvernance Python, scénarios S1 à S3, base v8 | `docs/quality/preuve-2026-11-04-*` |
| 2026-11-07 | Consentement (D-028), inscription et fiches (D-029), tendances (D-032), base v9 | `docs/quality/2026-11-07-*` |
| 2026-11-08 → 11-09 | Application Nolo (D-034), hôpital, centres spécialisés et console du ministère (D-035) | inspection visuelle |
| 2026-11-09 | Assemblage du dépôt (MT-002) ; rédaction SDD complète, catalogue v2, rétro-spécification, `CLAUDE.md`, `ETAT.md`, commandes `.claude/commands/` (D-036) ; suites relancées ; 76 statuts d'interface corrigés en « état capturé » | `preuve-2026-11-09-suites.txt`, `-inspection-visuelle.txt`, `-croisement.txt` |
| 2026-11-09 | Vague A approuvée (D-037) : `tools/controle_publication.py` (TASK-017-02-02) ; README : quatre verdicts (FR-2306) ; rapport technique anglais rédigé depuis le dépôt, PDF de 5 pages, `tools/rapport_pdf.py`, `tools/verifier_rapport.py` (TASK-017-01-01) ; 32 tests ajoutés (rouge puis vert) ; Q-017-01-01, Q-017-01-02, Q-017-02-01 ouvertes ; `.venv` par uv ; dépôt git initialisé | `preuve-2026-11-09-vague-a.txt` |
