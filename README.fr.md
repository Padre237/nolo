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

Python 3 (testé en 3.13) et Node 22 ; paquets Python : `requirements.txt`. L'application n'a ni dépendance ni compilation. Les commandes sont les mêmes que dans [README.md](README.md#quick-start), et la liste complète est dans `CLAUDE.md` §9.

```bash
python3 -m http.server 8765 --bind 127.0.0.1 -d app     # http://127.0.0.1:8765/
cd app && node --test tests/*.test.mjs && cd ..
python3 -m pytest -q
node --test tests/js/*.test.mjs
```

## Résultats vérifiés (9 novembre 2026)

| Contrôle | Résultat |
|---|---|
| pytest | 84 réussis |
| Node, moteur et catalogues | 15 réussis |
| Node, application | 33 réussis |
| Règles de triage v2 | 390/390 témoins ; aucune violation de monotonie sur 5 000 tirages |
| Recherche (BM25, top 5) | document attendu 33/40 ; article exact 29/40 |
| Inspection visuelle (39 écrans × 4 largeurs) | 156 mesures, aucun défaut de mise en page, aucune erreur de console |

Les preuves sont `docs/quality/preuve-2026-11-09-suites.txt` et `…-inspection-visuelle.txt`. Les limites sont dans les spécifications. Par exemple, l'inspection contrôle la mise en page, pas le contenu des écrans : 76 tests d'interface sont « capturés, non vérifiés ».

## Organisation du travail

Le projet suit un **développement piloté par les spécifications** strict : aucun code sans dossier approuvé, et aucun test déclaré réussi sans preuve datée.

- Pour reprendre : `CLAUDE.md`, puis `docs/ETAT.md`.
- Catalogue des 17 fonctionnalités et 146 sous-fonctionnalités : `docs/specifications/README.md`.

## Licence

Notre code est sous licence MIT (`LICENSE`). Les documents tiers gardent leur licence : textes de `kb/`, zones dérivées d'OpenStreetMap, polices (voir [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)). Les textes « tous droits réservés » sont exclus du dépôt.
