---
description: Implémenter une tâche approuvée, tests d'abord, avec preuve datée et mise à jour des statuts
argument-hint: "TASK-XXX-NN-NN"
---

Tu implémentes la tâche `$ARGUMENTS`, et rien d'autre.

**Porte (à vérifier avant d'écrire une ligne)**
1. Lis `CLAUDE.md`, `docs/ETAT.md`, puis les quatre fichiers du dossier de la tâche et les fichiers de son §10 « Contexte à charger ».
2. Arrête-toi et demande l'approbation si l'un de ces points est faux :
   - le dossier est `APPROVED` ou `READY_FOR_DEV` (ligne « Statut ») et sa colonne « Bloquant » vaut « Aucun » ;
   - les tâches dont elle dépend sont « Fait » ;
   - ses tests sont écrits dans `tests.md` ;
   - le propriétaire a approuvé explicitement (décision dans `docs/product/decisions.md` ou message de la session).
3. Présente le plan (fichiers, fonctions, tests) en une liste courte.

**Exécution**
4. Écris d'abord les tests nommés dans le champ « Automatisation » des `TEST-…` de la tâche. Lance-les : ils doivent échouer (rouge). Garde la sortie.
5. Écris le code minimal qui les fait passer, dans les conventions de `CLAUDE.md` §7 :
   - Nolo : modules ES sans compilation, `t('cle')` en français et en anglais, jetons CSS, cibles ≥ 44 px, `app/sw.js` mis à jour ;
   - Python : valeurs juridiques lues dans `config/policy.yaml`, fragments cités existants.
   Aucun comportement hors des exigences de la tâche.
6. Relance les tests de la tâche (vert), puis toutes les suites de `CLAUDE.md` §9 concernées ; pour une interface, `python3 tools/inspecter.py`.
7. Écris la preuve : `docs/quality/preuve-AAAA-MM-JJ-<sujet>.txt` avec, pour chaque commande, la commande, la sortie brute et le code de sortie (rouge puis vert pour les tests nouveaux).

**Mise à jour (dans cet ordre)**
8. Dans le dossier :
   - tâche → « Fait (AAAA-MM-JJ) » ;
   - chaque test exécuté → « Exécuté le AAAA-MM-JJ : réussi (preuve `docs/quality/<fichier>`) » ; un test d'interface n'est « réussi » que si son résultat attendu est vérifié, pas seulement capturé ;
   - écart du §9 de `design.md` retiré s'il est résolu ;
   - « État d'implémentation » mis à jour.
9. Lance `python3 tools/croiser_preuves.py docs/quality/<preuve>` (0 problème), `python3 tools/sdd_index.py`, `python3 tools/trace.py` (code 0).
10. Mets à jour `docs/ETAT.md` : chiffres du §4, prochaine tâche du §5, ligne du journal du §8.
11. Fais le rapport final (CLAUDE.md, annexe A §8) :
    - exigences ;
    - fichiers modifiés ;
    - tests et résultats réels ;
    - critères vérifiés ;
    - limites.

    Ne commite que si le propriétaire le demande.

Si un test échoue et que tu ne sais pas le corriger dans le périmètre de la tâche : statut « Exécuté le … : échec (preuve …) », écart consigné, et question au propriétaire. Ne jamais maquiller un échec.
