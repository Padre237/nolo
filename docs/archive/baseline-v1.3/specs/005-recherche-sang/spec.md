# Spécification fonctionnelle : Recherche d'un groupe sanguin

**Branche** : `005-recherche-sang`
**Créée le** : 2026-11-03
**Statut** : Brouillon — logique implémentée dans `rechercher_sang`
**Entrée** : « L'utilisateur cherche un groupe sanguin ; le système affiche les banques de sang qui le déclarent disponible (disponible, faible, rupture) et lance un appel au don en cas de tension. »
**Scénario de démo** : 8 (O- la nuit)

## Scénarios utilisateur et tests

### Récit 1 — O- la nuit (Priorité : P1)
1. **Étant donné** une recherche de sang depuis le parcours d'orientation, **alors** le triage passe d'abord (une hémorragie active déclenche `urgence`).
2. **Étant donné** que les banques proches sont en rupture, **alors** le rayon s'élargit, seules les banques non en rupture sont listées, et la mention « délivrance sur prescription uniquement » s'affiche.
3. **Étant donné** une tension (rupture majoritaire), **alors** un appel au don est affiché avec le centre de transfusion le plus proche et ses horaires.

### Cas limites
- Centre de transfusion fermé la nuit : affiché avec ses horaires d'ouverture, pas comme disponible immédiatement.
- Déclaration de plus de 6 h : marquée « à confirmer ».

## Exigences
- **FR-501** : seuls `banque_de_sang_hospitaliere` et `centre_transfusion` déclarent ; niveaux `disponible`, `faible`, `rupture` ; fraîcheur 6 h.
- **FR-502** : jamais de quantité exacte publique.
- **FR-503** : mention « délivrance sur prescription uniquement ».
- **FR-504** : appel au don déclenché si la majorité des banques du rayon sont en rupture pour le groupe demandé.
- **FR-505** : la recherche de sang ne court-circuite jamais le triage.

## Critères de succès
- **SC-501** : test « O- » à 100 % ; 0 banque en rupture listée comme disponible.

## Traçabilité
| Exigence | Source | Lacune | Test |
|---|---|---|---|
| FR-501, FR-502 | — (textes transfusion à collecter) | L9, V4 | test_services.py : O- |
| FR-503 | — | V4 | T-503 à écrire |
| FR-504 | INT-OMS-ETHIQUE-IA-SANTE-2021::0002 | — | test_services.py : appel au don |
| FR-505 | INT-OMS-PCIME-MANUEL::0028 | L5 | T-505 à écrire |
