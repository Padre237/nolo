# Nolo — orientation en santé gouvernée par le droit, pour le Cameroun

*Nolo* veut dire « santé » en douala. Ce dépôt contient la participation de CENADI EQUIPE 2 (Cameroun) à l'**ITU AI for Good Lab Hackathon** (soumission le 10 novembre 2026). English version: [README.md](README.md).

**Soumission :** [rapport technique (PDF, 5 pages, en anglais)](nolo-technical-report.pdf) · [vidéo de démonstration (4:55, en anglais)](nolo-demo.mp4) · [base de connaissances](kb/)

> **Prototype de démonstration.** Nolo n'est pas un dispositif médical : il ne pose aucun diagnostic, ne prescrit rien et ne donne aucune posologie. Tous les établissements, stocks, comptes et séries de surveillance sont **fictifs** ; les appels aux structures sont désactivés. La console du ministère est une démonstration sous la marque Nolo, sans lien avec un ministère, sans nom ni logo officiel.

## Le problème

Au Cameroun, la première décision de santé se prend souvent à la maison, sans repère : ce signe est-il dangereux ? Quelle structure ouverte offre le bon service ? Quelle pharmacie agréée a vraiment le médicament ? Où trouver du sang compatible ce soir ? Les établissements et les autorités n'ont pas de vue agrégée et licite de la demande ni des signaux communautaires précoces. La loi sur les données personnelles (loi n° 2024/017) est exigeante, et plusieurs de ses textes d'application ne sont pas publiés.

## Ce que fait Nolo

| Espace | Ce qu'on peut y faire | État |
|---|---|---|
| Citoyen | Décrire ce qu'on ressent (français ou anglais, expressions camerounaises comprises). Répondre à des questions de sécurité fermées. Recevoir une **alerte d'urgence** en cas de signe de danger. Être orienté vers une structure adaptée, avec la raison. Obtenir une fiche à montrer au soignant. Chercher une spécialité, un médicament (DCI) ou un groupe sanguin. | Construit (navigateur, données fictives) |
| Module expérimental | En mode démonstration seulement : au plus trois *pistes expérimentales*, avec leur score et leur source. Elles ne sont jamais présentées comme un diagnostic ; les catégories de l'art. 48 reçoivent un message neutre. | Construit, démo seulement |
| Établissement | S'inscrire par étapes (vérification d'agrément simulée). Tenir sa fiche et ses stocks : import CSV avec rapport des rejets dans l'application ; CSV et XLSX dans le service Python de référence. Voir les tendances de la demande, avec masquage des petits effectifs. | Construit |
| Console du ministère | Carte syndromique avec signaux CUSUM, sur agrégats seulement. Agréments : accorder ou refuser, avec un motif obligatoire pour un refus. Offre et demande. Politique versionnée, avec variantes « et si ». | Construit (démo) |
| Agents | L'**agent Conformité** et l'**orchestrateur** décident de toute action sur une donnée personnelle, avec quatre verdicts : `AUTORISE`, `AUTORISE_AVEC_CONDITIONS` et `BLOQUE` citent le fragment juridique ; `BLOQUE_SANS_FONDEMENT` bloque une action hors catalogue ou sans fondement juridique à citer. Chaque décision entre dans un journal chaîné SHA-256. Un rejeu sans gouvernance montre les violations qu'on commettrait sans eux. | Construits en Python (référence) ; intégration dans l'application prévue (vague B) |
| Conseiller « Mes droits santé » | Réponses extractives citées, ou refus faute de fondement. | Spécifié, non construit |

## Les agents en bref

Chaque agent a une seule tâche et il est testé seul. Contrairement à un chatbot, aucun texte généré ne décide : les verdicts viennent de règles versionnées ou de comptages, citent leur source, et sont journalisés et rejouables. Le rapport technique (§8) indique aussi où chaque agent peut être réutilisé.

| Agent | Ce qu'il fait dans Nolo | Données et outils | Travaille avec |
|---|---|---|---|
| Orchestrateur | Oriente chaque demande ; n'agit qu'après un verdict de la Conformité ; journalise chaque décision | Registre des agents ; journal d'audit chaîné | Tous les agents |
| Conformité | Contrôle le mode, le consentement, le profilage et la destination, puis les règles de l'action ; quatre verdicts, chacun avec son fragment juridique. Il applique des règles tirées de la loi ; l'autorité reste l'APDP ou le MINSANTE | `policy.yaml` 1.4.0 ; fragments de la base | Orchestrateur ; tous les agents |
| Triage | Sur le téléphone : transforme les mots de la personne en signes, pose les questions de sécurité, déclenche l'alerte d'urgence ; ne baisse jamais l'urgence | 75 règles PCIME/IITT ; 110 signes FR/EN | Orchestrateur ; Ressources |
| Ressources | Trouve une structure vérifiée, un service, un médicament ou du sang, ouverte d'abord, puis la plus proche ; les recherches sensibles restent sur le téléphone | Fiches des établissements ; tuile du district | Disponibilités ; Fiabilité |
| Disponibilités | Reçoit les stocks et niveaux de sang des seuls établissements agréés ; rejette les DCI inconnues et les produits interdits ; expiration à 48 h | Import CSV/XLSX ; liste des DCI | Ressources ; Conformité |
| Fiabilité | Note les pharmacies à partir des constats « trouvé / pas trouvé » ; lissage, gel en cas de rafale, modération humaine | Constats pseudonymes (HMAC) | Ressources ; modérateur |
| Surveillance | Compte les signes consentis par aire, semaine et syndrome ; le CUSUM lève un signal « à vérifier » (SC1 à SC8) ; aucun compte sous 5 | Agrégats ; guide SBC 2023 du MINSANTE | Conformité ; point focal |
| Conseiller en droits | Répond aux questions de santé et de droits des données par des extraits cités de la loi, ou dit qu'aucun texte ne s'applique | BM25 ; glossaire FR/EN | Orchestrateur |

## Comment c'est construit

- **Le droit est exécutable.**
  - `config/policy.yaml` code l'état du droit : seuils, modes, consentements, numéros d'urgence, lacunes. Aucune valeur juridique n'est écrite en dur dans le code ; les exceptions restantes sont listées comme écarts.
  - La base de connaissances (`kb/`) compte **2 034 fragments traçables issus de 21 documents** : lois camerounaises, guide SBC du MINSANTE, RSI, OMS, et RGPD et règlement européen sur l'IA comme références.
  - Une table relie les articles clés au nœud du pipeline qu'ils gouvernent et à l'agent qui les applique.
- **Pipelines ITU-T Y.3172.**
  - Il y en a quatre : orientation, surveillance, ressources, fiabilité, chacun avec ses nœuds SRC → C → PP → M → P → D → SINK.
  - L'agent Conformité instancie le nœud de politique (P) avant chaque nœud qui touche une donnée personnelle (`docs/architecture/system-architecture.md` §4).
- **Trois modes** :
  - `demo_synthetique`, celui de l'application ;
  - `sans_donnees_personnelles` ;
  - `complet`, qui suppose l'autorisation de l'APDP, exigée par la loi et impossible à obtenir aujourd'hui.
- **Registre des lacunes** (`docs/compliance/registre-lacunes.md`) : seize lacunes, chacune notée « constat → garde-fou → paramètre → recommandation ».

## Démarrage

Python 3.12 ou plus récent (testé en 3.12 et 3.13), Node 22 et un navigateur Chromium. L'application n'a ni dépendance ni compilation ; les paquets Python des contrôles et du service des établissements sont dans `requirements.txt`. Aucun composant propriétaire ; ChromaDB et Ollama (recherche par embeddings) sont facultatifs. Les commandes sont les mêmes que dans [README.md](README.md#quick-start), et la liste complète est dans `CLAUDE.md` §9.

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt   # installation (une fois)
export PATH="$PWD/.venv/bin:$PATH"
python3 -m http.server 8765 --bind 127.0.0.1 -d app     # http://127.0.0.1:8765/
cd app && node --test tests/*.test.mjs && cd ..
python3 -m pytest -q
node --test tests/js/*.test.mjs
```

## Scénarios de démonstration (dans l'application)

Ouvrir http://127.0.0.1:8765/ dans un navigateur Chromium. Tous les écrans existent en français et en anglais : bouton FR / EN en haut. Le rapport (§5) détaille les scénarios de gouvernance S1 à S3.

1. **Orientation.** Accepter les finalités, « Décrire ce que je ressens » (`#/decrire`), choisir le premier exemple (ou écrire « J'ai de la fièvre et je tousse depuis 3 jours »), répondre aux questions de sécurité, puis « Où aller » : une structure adaptée avec la raison, et un résumé pour le soignant.
2. **Urgence.** Choisir le deuxième exemple : un signe de danger déclenche l'alerte (119, 112). Ouvrir « Comment Nolo a décidé » : chaque étape, son agent, son nœud Y.3172 et l'article cité.
3. **Protection de l'art. 48.** Écrire « Fièvre, éruption sur la peau, ganglions, mal de gorge et fatigue depuis une semaine » : Nolo ne nomme rien et oriente vers un test confidentiel au centre de santé le plus proche.
4. **Recherches.** Médicament (`#/chercher/medicament`, par exemple paracétamol) et sang (`#/chercher/sang`) : les recherches sensibles s'exécutent sur le téléphone et ne sont jamais comptées.
5. **Établissement de santé.** Depuis l'accueil, « Je suis un établissement de santé », puis le compte de démonstration : stock, import CSV, tendances de la demande.
6. **Console du ministère** (`#/ministere`) : signaux syndromiques ; cellule de coordination, où le district demande des noms et la Conformité bloque ; journal d'audit (altérer une entrée, puis vérifier la chaîne) ; « Avec ou sans gouvernance » (0 violation contre 6) ; « Politique et lacunes » avec la simulation « et si ».
7. **Conseiller en droits** (`#/droits`) : choisir une question d'exemple ; la réponse n'est faite que de passages cités.

## Résultats vérifiés (9 novembre 2026)

| Contrôle | Résultat |
|---|---|
| pytest | 133 réussis |
| Node, moteur, acceptation PCIME/IITT et catalogues | 32 réussis |
| Node, application Nolo | 123 réussis |
| Agents de l'application face à la référence Python | 3 908 décisions de Conformité, 0 différence ; empreintes du journal identiques ; rejeu : 0 violation avec gouvernance, 6 sans |
| Règles de triage v2 | 390/390 témoins ; aucune violation de monotonie sur 5 000 tirages |
| Recherche (BM25, top 5) | document attendu 33/40 ; article exact 29/40 |
| Inspection visuelle (47 écrans × 4 largeurs) | 188 mesures, aucun défaut de mise en page, aucune erreur de console |
| Traçabilité | 146 dossiers de spécification, 0 erreur |

Les preuves sont `docs/quality/preuve-2026-11-09-vague-c3.txt` et `…-vague-b.txt`. Les limites sont dans les spécifications. Par exemple, l'inspection contrôle la mise en page, pas le contenu des écrans : 73 tests d'interface sont « capturés, non vérifiés ».

## Prochaines étapes après le hackathon

- **Validation.** Un clinicien valide les libellés et niveaux du triage, un juriste la lecture de la loi ; d'ici là, les règles ne tournent qu'en mode démonstration.
- **Régulateurs.** Partager le registre des lacunes et l'outil « et si » avec le MINSANTE, le MINPOSTEL et l'APDP. Utiliser dès maintenant le mode sans données personnelles ; le mode complet seulement avec une autorisation de l'art. 19.
- **Normes et recherche.** Proposer le nœud de consentement et de finalité et la responsabilité entre agents à l'UIT-T CE13 (Y.3172) et au cadre AI Readiness ; publier le constat L13.
- **Produit.** Modèle DDXPlus sur l'appareil, carte épidémiologique publique, versions anglaises officielles des lois (L14), puis un pilote dans un district de santé en mode sans données personnelles.

## Organisation du travail

Le projet suit un **développement piloté par les spécifications** strict : aucun code sans dossier approuvé, et aucun test déclaré réussi sans preuve datée.

- Pour reprendre : `CLAUDE.md`, puis `docs/ETAT.md`.
- Catalogue des 17 fonctionnalités et 146 sous-fonctionnalités : `docs/specifications/README.md`.

## Licence

Notre code est sous licence MIT (`LICENSE`). Les documents tiers gardent leur licence : textes de `kb/`, zones dérivées d'OpenStreetMap, polices (voir [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)). Les textes « tous droits réservés » sont exclus du dépôt.
