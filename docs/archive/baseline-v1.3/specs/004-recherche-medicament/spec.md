# Spécification fonctionnelle : Recherche d'un médicament selon les stocks déclarés

**Branche** : `004-recherche-medicament`
**Créée le** : 2026-11-03
**Statut** : Brouillon — logique implémentée dans `rechercher_medicament` et `demander_alternative`
**Entrée** : « L'utilisateur cherche un médicament (DCI) ; le système affiche les officines et pharmacies hospitalières agréées qui le déclarent disponible, avec la fraîcheur de la déclaration. »
**Scénarios de démo** : 1 (enchaînement après l'urgence), 9 (antirétroviral), 10 (ordonnance manquante)

## Scénarios utilisateur et tests

### Récit 1 — Trouver un médicament (Priorité : P1)
1. **Étant donné** la DCI « amoxicilline », **alors** seules des officines agréées ou pharmacies hospitalières apparaissent, triées par distance puis par fiabilité (départage si écart < 1 km), avec la mention « Délivré sur ordonnance » et l'heure de déclaration.
2. **Étant donné** une déclaration de plus de 12 h, **alors** elle est marquée « à confirmer » ; au-delà de 48 h elle n'est plus affichée.

### Récit 2 — Demande d'alternative ou de posologie (Priorité : P1)
1. **Étant donné** « par quoi remplacer ? » ou « combien en prendre ? », **alors** le système refuse et renvoie vers le pharmacien.

### Récit 3 — Classe sensible (Priorité : P1)
1. **Étant donné** un antirétroviral, **alors** la recherche est anonyme (pas de pseudonyme dans le journal), aucun historique, et tout signalement ultérieur est pseudonymisé.
2. **Étant donné** un produit visé par l'art. 75 de la loi 90/035, **alors** il n'est pas recherchable.

### Cas limites
- Nom commercial saisi : conversion vers la DCI sans afficher de marque.
- Aucune pharmacie : élargissement comme la spec 003, puis message « non déclaré disponible à proximité ».

## Exigences
- **FR-401** : seuls les établissements de type `officine_agreee` ou `pharmacie_hospitaliere` peuvent déclarer.
- **FR-402** : format de déclaration : DCI, niveau, horodatage, déclarant authentifié ; fraîcheur 12 h ; expiration 48 h.
- **FR-403** : mention « Délivré sur ordonnance » sur chaque résultat.
- **FR-404** : MUST NOT suggérer d'alternative, indiquer une posologie ni promouvoir un produit.
- **FR-405** : classes sensibles : recherche anonyme, sans historique.
- **FR-406** : aucun classement payant ; formule de tri publiée.
- **FR-407** : produits de l'art. 75 exclus du catalogue.
- **FR-408** : pour les classes pouvant révéler la vie sexuelle (contraception, antirétroviraux), la recherche MUST s'exécuter sur l'appareil à partir de la liste des stocks de la zone téléchargée en bloc (toutes classes confondues, pour ne rien révéler) ; aucune requête contenant la DCI n'atteint le serveur ni le journal.

## Critères de succès
- **SC-401** : tests existants à 100 % ; 0 réponse d'alternative ou de posologie sur 50 formulations testées.

## Traçabilité
| Exigence | Source (`chunk_id`) | Lacune | Test |
|---|---|---|---|
| FR-401 | CMR-LOI-90-035::0049 | L9 | test_services.py : établissements agréés |
| FR-402 | — (format proposé) | L9 | T-402 à écrire |
| FR-403 | CMR-LOI-90-035::0012 | V3 | test_services.py : amoxicilline |
| FR-404 | CMR-LOI-90-035::0012 ; CMR-LOI-90-035::0017 | L8 | test_services.py : alternative refusée ; T-404 (50 formulations) à écrire |
| FR-405 | CMR-LOI-2024-017::0011 | L2 | test_services.py : ARV (partiel) |
| FR-406 | CMR-LOI-90-035::0017 | L8 | T-406 à écrire |
| FR-407 | CMR-LOI-90-035::0072 | — | T-407 à écrire |
| FR-408 | CMR-LOI-2024-017::0048 | L11 | T-408 à écrire (vérifier qu'aucune DCI sensible n'apparaît dans les requêtes ni le journal) |
