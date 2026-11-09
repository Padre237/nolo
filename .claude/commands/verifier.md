---
description: Relancer toutes les vérifications du dépôt et écrire une preuve datée (aucune modification de code)
argument-hint: "[sujet facultatif de la preuve, par défaut « suites »]"
---

Tu vérifies l'état réel du dépôt. Tu ne modifies ni le code ni les spécifications, sauf les statuts que les résultats contredisent (étape 5).

1. Lis `CLAUDE.md` §9 et §10 (commandes et environnement).
2. Sauvegarde `tests/reports/` (les scénarios le réécrivent), puis lance, dans cet ordre, en gardant la sortie brute et le code de sortie de chacune :
   - `python3 -m pytest -v -p no:cacheprovider`
   - `node --test tests/js/*.test.mjs`
   - `cd app && node --test tests/*.test.mjs`
   - `python3 tools/scenarios/executer.py --scenario <s>` pour `orientation_urgente`, `medicament_sensible`, `regroupement`, chacun avec et sans `--sans-gouvernance`. Rappel : S1 sans gouvernance sort en 1 par construction (Q-007-14-01).
   - les deux variantes de `config/variantes/` avec `--politique`
   - `python3 tools/demo/construire_paquet.py` puis comparaison avec le paquet d'avant
   - `python3 tools/donnees/verifier_regles_triage_v2.py`
   - `python3 -I kb/eval/run_eval.py --embed bm25`
   - `python3 -I kb/traductions/verifier_traductions.py`
   - `python3 -I kb/services/test_services.py`
   - `python3 tools/verifier_base.py --reconstruire`
   - comptage des PDF hors `.git`
   - `python3 tools/sdd_index.py`
   - `python3 tools/trace.py`
   - si une interface a changé, ou si on te le demande : `python3 tools/inspecter.py /tmp/nolo-captures 360,390,768,1440`

   Restaure ensuite `tests/reports/` et le paquet.
3. Écris `docs/quality/preuve-AAAA-MM-JJ-${ARGUMENTS:-suites}.txt` : en-tête (date UTC, versions de Python, Node, pytest), puis chaque commande, sa sortie, son code. Remplace les chemins absolus de la machine par des chemins relatifs.
4. Lance `python3 tools/croiser_preuves.py docs/quality/<la preuve>` : chaque test marqué « Exécuté » avec cette preuve doit y être retrouvé.
5. Si un test cité comme réussi a échoué, ou n'est pas retrouvé dans la preuve : corrige son statut dans `tests.md` (« Exécuté le … : échec » ou « Non exécuté »), consigne l'écart au §9 de `design.md`, et signale-le.
6. Mets à jour le §4 de `docs/ETAT.md` (chiffres et preuves) et ajoute une ligne au journal.
7. Rends compte en un tableau :
   - suite ;
   - résultat réel ;
   - attendu ;
   - écart éventuel.

   N'annonce aucun chiffre qui ne figure pas dans la preuve.
