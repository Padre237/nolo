---
description: Écrire ou compléter le dossier SDD d'une sous-fonctionnalité (exigences, conception, tâches, tests) avant tout code
argument-hint: "SF-XXX-NN ou description du besoin"
---

Tu rédiges une spécification. **Aucun code de production dans cette commande.**

1. Lis `CLAUDE.md`, `docs/ETAT.md`, `docs/specifications/README.md` (règles de rédaction §1, plages d'identifiants §3) et `docs/product/decisions.md`.
2. Situe le besoin `$ARGUMENTS` :
   - dossier existant → lis ses quatre fichiers et le code qu'il cite ;
   - besoin nouveau → trouve la fonctionnalité F-XXX qui le possède, le numéro SF-XXX-NN suivant, et la plage d'identifiants FR/NFR libre (vérifie par `grep -rn "FR-NNNN" docs/specifications`).
3. Inspecte le code existant concerné (`app/`, `src/`, `tools/`, `config/policy.yaml`) avant d'écrire : la spécification décrit le comportement voulu, et le §9 de `design.md` décrit tout écart avec le code.
4. Écris ou complète le dossier à partir de `docs/specifications/_templates/`, sans supprimer de section :
   - `requirements.md` : objectif, rôles, exigences possédées (§3, une exigence = un comportement observable), exigences référencées (§4), NFR (§5), règles métier avec leur source (`chunk_id`, clé `policy.yaml`, décision), critères d'acceptation mesurables « étant donné, quand, alors » (§7), hors périmètre, questions ouvertes `Q-…` avec proposition (§9), contexte à charger (§10) ;
   - `design.md` : workflow, états d'interface, éléments de conception `DES-…` (fichier, élément, rôle), données, contrats et erreurs, journal, accessibilité, écarts (§9), ordre de réalisation ;
   - `tasks.md` : tâches atomiques `TASK-…` (≈ un fichier ou une fonction), chacune avec exigences, conception, fichiers à lire et à modifier, résultat attendu, dépendance, condition de fin, tests ;
   - `tests.md` : un test `TEST-…` au moins par critère, avec type, exigences, critère, « étant donné, quand, alors », données, automatisation (nom exact du test à écrire), statut « Non exécuté ».
5. Toute valeur que le propriétaire n'a pas décidée est une question ouverte ou porte « [PROPOSITION, à valider] ». Ne présente jamais une hypothèse comme un fait ; cite la source de chaque règle juridique.
6. Mets le dossier en `UNDER_REVIEW`. Lance `python3 tools/trace.py` (code 0 attendu) et `python3 tools/sdd_index.py`.
7. Ajoute une ligne au journal de `docs/ETAT.md`, puis présente au propriétaire : exigences, critères, plan de tâches, tests, questions ouvertes ; demande l'approbation explicite. Ne passe pas à `/implementer` sans elle.
