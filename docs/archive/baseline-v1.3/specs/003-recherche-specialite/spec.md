# Spécification fonctionnelle : Recherche explicite d'une spécialité

**Branche** : `003-recherche-specialite`
**Créée le** : 2026-11-03
**Statut** : Brouillon — logique déjà implémentée dans `services/orientation_services.py::rechercher_specialite`
**Entrée** : « L'utilisateur cherche explicitement une spécialité (cardiologie, neurologie, pédiatrie…) ; le système affiche les établissements qui la proposent dans un rayon de 5 km, élargi si nécessaire. Aucune redirection vers une spécialité à partir des symptômes. »
**Scénario de démo** : 6 (neurologue)

## Scénarios utilisateur et tests

### Récit 1 — Élargissement automatique du rayon (Priorité : P1)
**Test indépendant** : `services/test_services.py` (neurologue).

**Scénarios d'acceptation**
1. **Étant donné** la saisie « neurologue », **quand** moins de 3 résultats sont trouvés à 5 km, **alors** le rayon s'élargit à 10, 20 puis 50 km, et l'élargissement est affiché (« aucun résultat à 5 km, recherche élargie à 50 km »).
2. **Étant donné** des résultats, **alors** ils sont triés par ouverture puis distance, sans aucun critère payant.

### Récit 2 — Synonymes et saisie inconnue (Priorité : P2)
1. **Étant donné** « cœur », **alors** la spécialité `cardiologie` est reconnue.
2. **Étant donné** une saisie hors de la liste fermée de 19 spécialités, **alors** aucun résultat n'est inventé ; la liste des spécialités est proposée.

### Récit 3 — Recherche sensible (Priorité : P1)
1. **Étant donné** une spécialité de la liste sensible (psychiatrie, oncologie, infectiologie VIH, addictologie, gynécologie-obstétrique, planification familiale), **quand** la recherche est faite, **alors** elle n'est ni journalisée avec le pseudonyme, ni ajoutée à un historique, ni utilisée pour la surveillance.

### Cas limites
- Recherche depuis l'écran d'orientation : impossible de lier automatiquement un niveau d'urgence à une spécialité.
- Aucune structure dans 50 km : afficher la plus proche, quelle que soit la distance.

## Exigences
- **FR-301** : liste fermée de spécialités avec synonymes (`rules/recherche_specialite.yaml`).
- **FR-302** : rayon initial 5 km ; paliers 10, 20, 50 km ; minimum 3 résultats.
- **FR-303** : tri par ouverture puis distance ; aucun critère commercial.
- **FR-304** : MUST NOT déclencher une recherche de spécialité depuis des symptômes.
- **FR-305** : recherches sensibles hors journal nominatif et hors historique.
- **FR-306** : bandeau fixe « En cas d'urgence, rendez-vous aux urgences les plus proches. »
- **FR-307** : position arrondie à 2 décimales dans le journal.
- **FR-308** : les spécialités pouvant révéler la vie sexuelle (gynécologie-obstétrique, planification familiale, infectiologie VIH) MUST être recherchées sur l'appareil : l'application télécharge la liste des établissements de la zone (toutes spécialités) et filtre localement ; le serveur ne reçoit pas la spécialité demandée.

## Critères de succès
- **SC-301** : tests du service à 100 %.
- **SC-302** : 0 recherche sensible retrouvable dans le journal associée à un pseudonyme.

## Traçabilité
| Exigence | Source (`chunk_id`) | Lacune | Test |
|---|---|---|---|
| FR-302, FR-303 | — (choix équipe) | L8 | test_services.py : neurologue, cœur |
| FR-301 | — | — | test_services.py : saisie inconnue |
| FR-304 | INT-OMS-LMM-2024::0007 | L5 | T-304 à écrire |
| FR-305 | CMR-LOI-2024-017::0011 ; CMR-LOI-2024-017::0048 | L1, L2, V1 | test_services.py : psychiatrie (partiel) ; T-305 à écrire |
| FR-306 | INT-OMS-ETHIQUE-IA-SANTE-2021::0002 | — | test_services.py : psychiatrie |
| FR-307 | CMR-LOI-2024-017::0062 | L1 | T-307 à écrire |
| FR-308 | CMR-LOI-2024-017::0048 | L11 | T-308 à écrire |
