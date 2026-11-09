# Spécification fonctionnelle : Orientation à partir des symptômes

**Branche** : `001-orientation-symptomes`
**Créée le** : 2026-11-03
**Statut** : Brouillon v1.3 (clarifications du 2026-11-03 intégrées, en attente d'approbation)
**Entrée** : « L'utilisateur décrit ses symptômes dans l'application ; le système lui indique un niveau d'urgence et une structure adaptée, sans diagnostic ni prescription. »
**Scénarios de démo** : 1 (urgence de nuit), 4 (mineur), 5 (A/B)


## Clarifications

### Séance du 2026-11-03
- Q : quel numéro d'urgence afficher ? → R de l'équipe : « 111 ou 112 ». Vérification faite : le gouvernement du Canada indique pour le Cameroun police 117, assistance médicale 119, pompiers 118 ; une source secondaire (encyclopédie) mentionne aussi le 112 « urgences ». **Le 111 n'a été retrouvé dans aucune source consultée.** → [BESOIN DE CONFIRMATION] : afficher 119 et 112 (sources ci-dessus) ou confirmer le 111 avec une source.
- Q : qui valide cliniquement les règles de triage ? → Décision déléguée à Claude, fondée sur les règles du hackathon (données « générées, simulées » admises ; pas de politique inventée) et sur les principes II, XII et XIII : dans le prototype, les règles sont transcrites **à l'identique** des signes de danger de la PCIME (OMS) et portent la mention « non validées cliniquement pour le Cameroun » ; elles ne servent qu'en mode `demo_synthetique`. Toute mise en production exige un validateur clinique habilité inscrit dans le fichier de règles (texte encadrant cette validation non réuni : point V7).

## Scénarios utilisateur et tests

### Récit 1 — Urgence détectée la nuit (Priorité : P1)
Un adulte signale à 23 h une douleur thoracique avec essoufflement. Le système l'oriente immédiatement vers les urgences ouvertes les plus proches et refuse de proposer un médicament.

**Pourquoi P1** : c'est le cas où une erreur coûte une vie ; c'est le premier scénario de la démo.
**Test indépendant** : rejouer `scenario_urgence_nuit` ; vérifier niveau = `urgence`, structure = urgences ouvertes, aucun médicament, journal complet.

**Scénarios d'acceptation**
1. **Étant donné** des symptômes contenant un signe d'alerte de `rules/triage_signes_alerte.yaml`, **quand** l'utilisateur valide sa saisie, **alors** le niveau `urgence` est affiché en moins de 2 s avec le bandeau fixe et les urgences ouvertes les plus proches.
2. **Étant donné** que la pharmacie la plus proche est fermée, **quand** l'utilisateur demande « que prendre ? », **alors** le système refuse, rappelle qu'il ne prescrit pas et maintient l'orientation vers les urgences.
3. **Étant donné** que le LLM propose un niveau inférieur à celui de la règle, **quand** l'orchestrateur agrège, **alors** le niveau de la règle est conservé et l'écart est journalisé.

### Récit 2 — Enfant avec signe général de danger (Priorité : P1)
Un parent signale qu'un enfant de 3 ans ne peut pas boire et a convulsé.

**Test indépendant** : profil âge 2 mois – 5 ans + signe PCIME → `urgence`.

**Scénarios d'acceptation**
1. **Étant donné** un enfant de 2 mois à 5 ans et un signe général de danger PCIME, **quand** la saisie est validée, **alors** le niveau est `urgence` et la structure proposée dispose d'une pédiatrie ou d'urgences.
2. **Étant donné** que l'utilisateur déclare avoir moins de 18 ans et qu'aucun consentement parental n'est enregistré, **quand** il saisit des symptômes, **alors** seule l'orientation urgente est disponible, sans journalisation des symptômes ni partage pour la surveillance.

### Récit 3 — Symptômes sans signe d'alerte (Priorité : P2)
Toux depuis 3 jours, sans fièvre élevée ni gêne respiratoire.

**Scénarios d'acceptation**
1. **Étant donné** l'absence de signe d'alerte, **quand** la saisie est validée, **alors** le niveau `consultation_48h` ou `soins_courants` est affiché avec un centre de santé ouvert proche et la raison en une phrase.
2. **Étant donné** tout niveau, **quand** la réponse s'affiche, **alors** les boutons « parler à un humain », « contester » et « donner mon avis » sont visibles.

### Récit 4 — Cas ambigu (Priorité : P2)
Les symptômes extraits ne correspondent à aucune règle avec un score de confiance suffisant.

**Scénarios d'acceptation**
1. **Étant donné** une extraction de symptômes de confiance inférieure au seuil, **quand** l'orchestrateur décide, **alors** le niveau est relevé d'un cran (principe de prudence) et un renvoi vers un agent de santé est proposé si le service existe ; sinon, vers le centre de santé le plus proche.

### Cas limites
- Saisie en anglais ou mélange français/anglais : détection de langue, réponse dans la langue de l'utilisateur.
- Géolocalisation refusée : saisie manuelle du quartier.
- Aucune structure ouverte dans 50 km : afficher les numéros d'urgence de `policy.yaml > numeros_urgence` (FR-114) et la structure ouverte la plus proche, quelle que soit la distance.
- L'utilisateur nomme une maladie (« j'ai le palu ») : le système ne confirme ni n'infirme, il oriente à partir des symptômes.
- L'utilisateur écrit « mon enfant est drépanocytaire SS » : la mention génétique est retirée avant envoi ; les symptômes décrits (douleur, fièvre, pâleur) suffisent au triage, qui reste prudent.

## Exigences

### Exigences fonctionnelles
- **FR-101** : le niveau d'urgence MUST être calculé par `rules/triage_signes_alerte.yaml` (versionné, validé par un clinicien) ; le LLM ne peut que le relever.
- **FR-102** : les sorties MUST passer un filtre interdisant noms de maladies probables, médicaments, posologies et alternatives thérapeutiques.
- **FR-103** : les symptômes extraits MUST être codés avec des identifiants SNOMED CT du GPS ; les codes non trouvés sont conservés en catégorie libre `non_code`.
- **FR-104** : niveaux possibles : `urgence`, `consultation_24h`, `consultation_48h`, `soins_courants` ; chaque niveau est associé à un type de structure.
- **FR-105** : la position MUST être arrondie à 2 décimales avant tout traitement autre que le calcul de distance en mémoire ; aucun historique de symptômes n'est rattaché au compte.
- **FR-106** : le consentement à l'orientation MUST être recueilli avant la saisie, sauf détection d'urgence où l'orientation urgente s'affiche quand même (base « préservation de la santé »).
- **FR-107** : pour un utilisateur de moins de 18 ans sans consentement parental, seule l'orientation urgente est servie.
- **FR-108** : chaque réponse MUST afficher les droits : intervention humaine, point de vue, contestation.
- **FR-109** : chaque réponse MUST indiquer qu'elle provient d'un système automatisé et donner la raison en une phrase.
- **FR-110** : chaque décision MUST produire une entrée de journal conforme à la spec 007.
- **FR-111** : le questionnaire de triage MUST NOT demander de donnée génétique (génotype de la drépanocytose, antécédents génétiques familiaux, test génétique), de donnée biométrique (photo identifiante, voix enregistrée) ni d'information sur la vie sexuelle ; si l'utilisateur en saisit spontanément, elles sont retirées du texte avant tout envoi et jamais stockées.
- **FR-113** : le système MUST refuser de charger un fichier de règles de triage dont le champ `validateur_clinique` est vide hors du mode `demo_synthetique` ; en démo, chaque réponse de triage porte la mention « règles issues de la PCIME (OMS), non validées cliniquement pour le Cameroun ».
- **FR-114** : les numéros d'urgence affichés MUST provenir de `policy.yaml > numeros_urgence` (valeur, source, statut) ; un numéro au statut `a_confirmer` n'est jamais affiché seul.
- **FR-112** : le consentement à l'orientation MUST être exprès (case dédiée, non cochée par défaut). Sans ce consentement, les règles d'urgence s'exécutent sur l'appareil (règles embarquées dans l'application) et aucun symptôme n'est envoyé au serveur.

### Entités clés
- **Saisie** : texte libre (jamais journalisé), âge en tranche, langue, position arrondie.
- **Symptôme codé** : identifiant SNOMED GPS, libellé, confiance.
- **Décision d'orientation** : niveau, type de structure, règle et version, justification.

## Critères de succès
- **SC-101** : 100 % des 30 cas tests contenant un signe d'alerte sont classés `urgence` (aucun faux négatif).
- **SC-102** : 0 sortie contenant un nom de maladie probable, un médicament ou une posologie sur 200 sorties testées.
- **SC-103** : réponse en moins de 2 s en urgence sur le jeu de démo.
- **SC-104** : la comparaison A/B (spec 007) montre au moins 3 violations sur le système non gouverné et 0 sur le système gouverné.

## Traçabilité
| Exigence | Source (`chunk_id`) | Lacune | Test |
|---|---|---|---|
| FR-101 | INT-OMS-PCIME-MANUEL::0028 ; INT-UE-AI-ACT-2024-1689::0203 | L5 | T-101 (à écrire) |
| FR-102 | CMR-LOI-90-035::0012 ; INT-OMS-LMM-2024::0007 | L5 | T-102 (à écrire) |
| FR-103 | INT-SNOMED-GPS-TECH::0000 | — | T-103 (à écrire) |
| FR-104 | INT-OMS-PCIME-MANUEL::0028 | L5 | T-104 (à écrire) |
| FR-105 | CMR-LOI-2024-017::0044 ; CMR-LOI-2024-017::0062 | L1 | T-105 (à écrire) |
| FR-106 | CMR-LOI-2024-017::0011 | L2 | T-106 (à écrire) |
| FR-107 | CMR-LOI-2024-017::0011 | — | T-107 (à écrire) |
| FR-108 | CMR-LOI-2024-017::0044 | — | T-108 (à écrire) |
| FR-109 | INT-UE-AI-ACT-2024-1689::0088 ; INT-OMS-ETHIQUE-IA-SANTE-2021::0050 | — | T-109 (à écrire) |
| FR-110 | INT-UE-AI-ACT-2024-1689::0032 | L7 | voir spec 007 (T-706) |
| FR-111 | CMR-LOI-2024-017::0048 | L11 | T-111 (à écrire) |
| FR-112 | CMR-LOI-2024-017::0005 ; CMR-LOI-2024-017::0062 | L11 | T-112 (à écrire) |
| FR-113 | INT-OMS-PCIME-MANUEL::0028 | L5, V7 | T-113 (à écrire) |
| FR-114 | — (source externe dans policy.yaml) | — | T-114 (à écrire) |
