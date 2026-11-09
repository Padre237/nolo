# Spécification fonctionnelle : Gouvernance, conformité et audit (transversale)

**Branche** : `007-gouvernance-conformite-audit`
**Créée le** : 2026-11-03
**Statut** : Brouillon
**Entrée** : « Un agent Conformité, appuyé sur la base de connaissances (RAG) et sur `policy.yaml`, autorise ou bloque chaque action qui touche une donnée personnelle, cite l'article applicable et laisse une trace rejouable. Un régulateur peut modifier `policy.yaml` pour simuler l'effet d'un futur décret. »
**Scénarios de démo** : 3 (transfert vers un LLM étranger puis simulation d'un décret), 5 (A/B gouverné / non gouverné), et le journal de tous les autres

## Scénarios utilisateur et tests

### Récit 1 — Transfert vers un LLM hébergé à l'étranger (Priorité : P1)
Un développeur configure un LLM distant (hors Cameroun) pour améliorer l'extraction des symptômes.

1. **Étant donné** `transfert_hors_pays.autorise_donnees_personnelles: false`, **quand** l'orchestrateur prépare un appel distant contenant des données de session, **alors** l'agent Conformité bloque, cite `CMR-LOI-2024-017::0033` (art. 32) et l'état `decret_transfert_publie: false`, et bascule sur le modèle local.
2. **Étant donné** le même appel avec des données synthétiques, **alors** il est autorisé et journalisé comme tel.

### Récit 2 — Simulation « et si » pour le régulateur (Priorité : P1)
1. **Étant donné** que le régulateur passe `decret_transfert_publie` et `apdp_operationnelle` à `true`, **quand** il rejoue le récit 1, **alors** l'agent Conformité n'oppose plus un blocage absolu : il exige une référence d'autorisation APDP et des clauses contractuelles types, et bloque si elles manquent.
2. **Étant donné** toute modification de `policy.yaml`, **alors** la version est incrémentée et un rapport de différences (décisions qui changent sur le jeu de scénarios) est produit.

### Récit 3 — Comparaison A/B (Priorité : P1)
1. **Étant donné** les 10 scénarios rejoués avec l'agent Conformité désactivé, **alors** un rapport liste les violations (diagnostic émis, transfert, localisation individuelle transmise, baisse non gelée, alternative proposée…).
2. **Étant donné** les mêmes scénarios avec l'agent Conformité, **alors** le rapport montre 0 violation et, pour chaque blocage, l'article cité.

### Récit 3 bis — Mise en production sans autorisation de l'APDP (Priorité : P1)
1. **Étant donné** `autorisation_apdp_obtenue: false`, **quand** le système démarre hors démo, **alors** il passe en mode `sans_donnees_personnelles` : recherches et triage sur l'appareil disponibles ; surveillance, signalements et comptes désactivés avec un message explicatif ; décision journalisée avec `CMR-LOI-2024-017::0020`.
2. **Étant donné** la simulation `autorisation_apdp_obtenue: true` avec une référence, **alors** le rapport de différences liste les fonctions activées ; sans référence, le passage est refusé.

### Récit 4 — Catégorie interdite par l'art. 48 (Priorité : P1)
1. **Étant donné** qu'un agent veut enregistrer « génotype SS » pour affiner le triage, même avec le consentement exprès de l'utilisateur, **alors** l'agent Conformité bloque en citant l'art. 48, précise que le consentement exprès de l'art. 66 al. 1 est nécessaire mais pas suffisant, et renvoie à la note d'interprétation.
2. **Étant donné** la simulation `derogation_par_consentement: true`, **alors** le rapport de différences montre les actions qui deviendraient possibles et celles qui restent bloquées.

### Récit 5 — Consultation du journal (Priorité : P2)
1. **Étant donné** une session, **quand** un auditeur l'ouvre, **alors** il voit, dans l'ordre, chaque agent, sa décision, les fragments consultés, la version de règle et de politique, et le validateur humain éventuel.
2. **Étant donné** une entrée modifiée après coup, **alors** la vérification de la chaîne d'empreintes échoue et signale l'entrée.

### Cas limites
- La recherche RAG ne renvoie aucun fragment pertinent : décision `BLOQUE_SANS_FONDEMENT` (principe III).
- Deux fragments se contredisent (ex. art. 44 et art. 65) : blocage, citation des deux, renvoi vers le registre des lacunes (L1).
- Base de connaissances indisponible : toutes les actions sur données personnelles sont bloquées ; l'orientation urgente reste servie.

## Exigences
- **FR-701** : l'orchestrateur MUST appeler l'agent Conformité avant toute action d'un agent sur une donnée personnelle (nœud P de Y.3172) ; une action sans décision est rejetée.
- **FR-702** : la décision de Conformité est l'une de : `AUTORISE`, `AUTORISE_AVEC_CONDITIONS`, `BLOQUE`, `BLOQUE_SANS_FONDEMENT` ; elle cite au moins un `chunk_id` sauf pour le dernier cas.
- **FR-703** : l'agent Conformité lit l'état du droit dans `policy.yaml` et non dans ses consignes ; un LLM ne peut pas transformer un `BLOQUE` de règle en `AUTORISE`.
- **FR-704** : contrôle anti-profilage : refus de toute requête qui relie dans la durée une personne à ses symptômes, recherches ou positions.
- **FR-705** : contrôle de transfert avant tout appel réseau sortant.
- **FR-706** : journal en ajout seul, chaîné par SHA-256, sans les champs interdits de `policy.yaml > journal_audit.champs_interdits`.
- **FR-707** : mode simulation : modification de `policy.yaml`, rejeu des scénarios, rapport de différences.
- **FR-708** : une analyse d'impact (modèle RGPD art. 35) est versionnée dans le dépôt, en attendant le décret camerounais.
- **FR-709** : chaque entrée de journal nomme l'agent décideur et les agents contributeurs (responsabilité entre agents).
- **FR-710** : mode A/B : commutateur qui désactive l'agent Conformité dans l'environnement de démo seulement, avec rapport de violations.
- **FR-712** : l'agent Conformité MUST bloquer toute action portant sur une catégorie de `donnees_sensibles.categories_interdites_art48`, quel que soit le consentement, tant que `derogation_par_consentement` vaut `false` ; la décision cite `CMR-LOI-2024-017::0048`.
- **FR-713** : le journal MUST NOT contenir la langue de l'utilisateur, une requête révélant la vie sexuelle, une donnée génétique ou biométrique ; un contrôle automatique parcourt le journal et échoue s'il en trouve.
- **FR-714** : au démarrage, l'orchestrateur MUST déterminer le mode (`demo_synthetique`, `sans_donnees_personnelles`, `complet`) à partir de `policy.yaml > autorisation_prealable` ; sans référence d'autorisation APDP, les fonctions exigeant des données personnelles (surveillance, signalements, comptes, historique) sont désactivées et l'interface l'explique ; seules les données synthétiques sont permises en démo.
- **FR-715** : tout échange avec un système externe (DHIS2, SIMR) portant sur des fichiers de données sensibles ou relatives aux mineurs MUST être bloqué sans l'autorisation de l'art. 19 al. 2 ; seuls les agrégats non personnels peuvent sortir.
- **FR-711** : les agents institutionnels simulés (District/SIMR, APDP) produisent des positions journalisées distinctes ; un désaccord est tracé, jamais résolu automatiquement en faveur du partage.

### Entités clés
- **Demande de conformité** : agent demandeur, action, catégories de données, destination, finalité.
- **Décision de conformité** : verdict, fragments cités, clés de `policy.yaml` utilisées, version.
- **Entrée de journal** : voir principe VIII de la constitution.

### Format de l'entrée de journal
```json
{
  "horodatage": "2026-10-20T22:04:11Z",
  "session": "sha256:…",
  "agent": "conformite",
  "contributeurs": ["triage", "orchestrateur"],
  "action": "appel_llm_distant",
  "entree_minimisee": {"categories": ["symptomes_codes"], "destination": "hors_CMR"},
  "fragments": ["CMR-LOI-2024-017::0033"],
  "policy": {"version": "1.0.0", "cles": ["transfert_hors_pays.autorise_donnees_personnelles", "etat_institutionnel.decret_transfert_publie"]},
  "decision": "BLOQUE",
  "repli": "modele_local",
  "justification": "Transfert hors pays soumis à autorisation préalable (art. 32) ; décret non publié.",
  "validateur_humain": null,
  "hash_precedent": "sha256:…"
}
```

## Critères de succès
- **SC-701** : 100 % des décisions de Conformité citent un fragment ou portent `BLOQUE_SANS_FONDEMENT`.
- **SC-702** : A/B : au moins 5 violations détectées sans gouvernance, 0 avec.
- **SC-703** : rejouer une session donne la même décision dans 100 % des cas.
- **SC-704** : sur les 16 questions de `eval/questions_test.jsonl`, le bon article figure dans les 5 premiers fragments pour au moins 15 (actuellement 16/16 en BM25).

## Traçabilité
| Exigence | Source (`chunk_id`) | Lacune | Test |
|---|---|---|---|
| FR-701 | — (Y.3172 nœud P) | L7 | T-701 |
| FR-702, FR-703 | CMR-LOI-2024-017::0011 ; CMR-LOI-2024-017::0034 | L2, L3 | T-702 |
| FR-704 | CMR-LOI-2024-017::0044 ; CMR-LOI-2024-017::0062 | L1 | T-704 |
| FR-705 | CMR-LOI-2024-017::0033 ; CMR-MINSANTE-PSNSN-2026-2030::0005 | L3 | T-705 |
| FR-706 | INT-UE-AI-ACT-2024-1689::0032 ; CMR-LOI-2010-012::0034 | V2 | T-706 |
| FR-707 | CMR-LOI-2024-017::0033 | L3 | T-707 |
| FR-708 | CMR-LOI-2024-017::0034 ; INT-UE-RGPD-2016-679::0143 | L3 | T-708 |
| FR-709 | — | L7 | T-709 |
| FR-710 | — | — | T-710 |
| FR-711 | CMR-LOI-2024-017::0011 | L4 | T-711 |
| FR-714 | CMR-LOI-2024-017::0020 ; INT-UE-RGPD-2016-679::0050 | L12 | T-714 |
| FR-715 | CMR-LOI-2024-017::0020 | L12 | T-715 |
| FR-712 | CMR-LOI-2024-017::0048 ; CMR-LOI-2024-017::0062 | L11, V6 | T-712 |
| FR-713 | CMR-LOI-2024-017::0048 | L11 | T-713 |
| SC-704 | — | — | eval/run_eval.py |

Tous les tests T-7xx sont à écrire, sauf SC-704 déjà mesuré.
