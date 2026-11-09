# Spécification fonctionnelle : Surveillance syndromique validée par un humain

**Branche** : `002-surveillance-syndromique`
**Créée le** : 2026-11-03
**Statut** : Brouillon v1.3 (clarifications du 2026-11-03 intégrées, en attente d'approbation)
**Entrée** : « Les symptômes des utilisateurs consentants alimentent une carte épidémiologique agrégée ; les anomalies deviennent des signaux à vérifier par le point focal du district, en complément de la SIMR et de DHIS2. »
**Scénario de démo** : 2 (regroupement fièvre + éruption, J1 à J4, données `scenario_regroupement.jsonl`, aire AS-07)


## Clarifications

### Séance du 2026-11-03
- Q : seuil de 5 cas par cellule et décalage de 7 jours de la carte publique ? → R : **confirmés** par l'équipe.
- Q : circuit RSI transfrontalier ? → Décision déléguée à Claude, fondée sur les règles du hackathon (scénarios réalistes, lacunes documentées plutôt qu'inventées) : **hors du périmètre du prototype**. Le système s'arrête à la décision humaine du point focal (instrument de l'annexe 2 du RSI présenté pour décision) ; la notification à l'OMS et l'échange avec les pays voisins relèvent du point focal national RSI. Limite déclarée dans le rapport ; aucun échange transfrontalier de données n'est simulé.

## Scénarios utilisateur et tests

### Récit 1 — Détection d'un regroupement et validation humaine (Priorité : P1)
Entre J1 et J4, des cas « fièvre + éruption » s'accumulent dans l'aire AS-07 au-delà du seuil attendu.

**Test indépendant** : rejouer `scenario_regroupement.jsonl` ; vérifier qu'un signal « à vérifier » apparaît chez le point focal, mappé sur la définition communautaire correspondante, et qu'aucune notification ne part avant validation.

**Scénarios d'acceptation**
1. **Étant donné** des séries hebdomadaires par aire de santé, **quand** l'algorithme (CUSUM ou équivalent) dépasse son seuil, **alors** un signal est créé avec : aire, semaine, effectif agrégé, définition SC correspondante, statut `a_verifier`.
2. **Étant donné** un signal `a_verifier`, **quand** 24 h passent sans action, **alors** un rappel est envoyé au point focal et l'événement est journalisé (délai SBC).
3. **Étant donné** que le point focal valide, **quand** il clique « confirmer », **alors** un export agrégé compatible DHIS2 est préparé et l'échéance d'évaluation du risque (48 h) est affichée ; la question RSI (annexe 2) est présentée pour décision humaine.
4. **Étant donné** que le point focal rejette, **alors** le signal passe à `rejete` avec motif, sans aucune diffusion.

### Récit 2 — Le district demande les localisations précises (Priorité : P1)
Au J3, le district demande la liste des positions exactes des cas.

**Scénarios d'acceptation**
1. **Étant donné** une demande de données individuelles, **quand** l'agent Conformité l'évalue, **alors** il refuse en citant `policy.yaml > surveillance.localisation_individuelle_partageable: false` et les articles applicables, et propose l'agrégat le plus fin autorisé (aire de santé).
2. **Étant donné** ce refus, **quand** l'agent APDP simulé est consulté, **alors** sa position est journalisée à côté de celle du district (désaccord tracé, aucune donnée transmise).

### Récit 3 — Carte publique (Priorité : P2)
**Scénarios d'acceptation**
1. **Étant donné** une aire avec moins de 5 cas sur la semaine, **quand** la carte publique est générée, **alors** l'aire apparaît « effectif insuffisant », sans chiffre.
2. **Étant donné** les données de la semaine courante, **alors** la carte publique n'affiche que des données décalées de 7 jours.

### Cas limites
- Un même utilisateur signale plusieurs fois : déduplication par jeton de session haché sur 7 jours, sans identité.
- Consentement à la surveillance retiré : les contributions futures cessent ; les agrégats déjà calculés restent.
- Données d'une aire frontalière : traitées comme les autres ; le signal porte la mention « aire frontalière — informer le point focal national RSI » ; aucun échange transfrontalier (hors périmètre, voir Clarifications).

## Exigences

### Exigences fonctionnelles
- **FR-201** : seules les sessions avec consentement « surveillance » distinct contribuent ; refuser ce consentement n'affecte pas l'orientation.
- **FR-202** : agrégation par aire de santé et semaine épidémiologique ; seuil minimal de 5 cas par cellule pour tout affichage (valeur confirmée par l'équipe le 2026-11-03).
- **FR-203** : chaque signal MUST être associé à une définition communautaire officielle (SC1 à SC8, `rules/sbc_definitions.yaml`) ou marqué `hors_definition`.
- **FR-204** : aucun signal ne sort du système sans validation explicite d'un point focal authentifié.
- **FR-205** : les délais SBC (notification 24 h, triage 24 h, évaluation 48 h) MUST être suivis et rappelés.
- **FR-206** : aucune position individuelle ni donnée identifiante n'est transmise au district, même sur demande.
- **FR-207** : export agrégé au format compatible DHIS2 (cible ; maquette dans le prototype). Aucun fichier de données personnelles n'est interconnecté sans l'autorisation de l'art. 19 al. 2 (spec 007, FR-715) ; la surveillance entière n'est active qu'en mode `complet` (FR-714).
- **FR-208** : carte publique décalée de 7 jours, cellules sous le seuil masquées (valeur confirmée par l'équipe le 2026-11-03).
- **FR-209** : un signal portant sur une aire frontalière (attribut de l'aire dans le référentiel) affiche la mention « informer le point focal national RSI » ; le système n'émet aucune donnée hors du pays.

### Entités clés
- **Contribution** : codes SNOMED, aire, semaine, tranche d'âge, jeton haché.
- **Série** : aire × semaine × syndrome → effectif.
- **Signal** : aire, période, définition SC, score d'anomalie, statut (`a_verifier`, `confirme`, `rejete`), validateur.

## Critères de succès
- **SC-201** : le regroupement injecté (AS-07, semaines 18 à 20) est détecté au plus tard à J3.
- **SC-202** : 0 donnée individuelle transmise dans tous les scénarios, y compris la demande du district.
- **SC-203** : 100 % des signaux portent un statut et un validateur dans le journal.

## Traçabilité
| Exigence | Source (`chunk_id`) | Lacune | Test |
|---|---|---|---|
| FR-201 | CMR-LOI-2024-017::0011 | L4 | T-201 |
| FR-202, FR-208 | CMR-LOI-2024-017::0062 ; INT-OMS-RSI-2005-AMENDE-2022::0054 | L1 | T-202 |
| FR-203 | CMR-MINSANTE-GUIDE-SBC-2023::0028 | L6 | T-203 |
| FR-204 | CMR-MINSANTE-GUIDE-SBC-2023::0018 ; INT-UE-AI-ACT-2024-1689::0035 | L6 | T-204 |
| FR-205 | CMR-MINSANTE-GUIDE-SBC-2023::0018 ; INT-OMS-RSI-2005-AMENDE-2022::0012 | — | T-205 |
| FR-206 | CMR-LOI-2024-017::0011 ; INT-OMS-RSI-2005-AMENDE-2022::0054 | L4 | T-206 |
| FR-209 | INT-OMS-RSI-2005-AMENDE-2022::0012 | L4 | T-209 |
| FR-207 | INT-OMS-AFRO-SIMR-3E-INTRO::0003 ; CMR-LOI-2024-017::0020 | L12, V5 | T-207 |

Tous les tests T-2xx sont à écrire.
