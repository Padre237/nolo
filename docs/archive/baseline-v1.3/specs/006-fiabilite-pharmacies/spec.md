# Spécification fonctionnelle : Fiabilité des déclarations des pharmacies

**Branche** : `006-fiabilite-pharmacies`
**Créée le** : 2026-11-03
**Statut** : Brouillon v1.3 (clarifications du 2026-11-03 intégrées, en attente d'approbation) — logique implémentée en partie dans `score_fiabilite` (`rules/fiabilite_pharmacies.yaml`)
**Entrée** : « Aucune pharmacie ne paie. Les utilisateurs signalent s'ils ont trouvé le médicament déclaré disponible ; un score lissé et protégé contre la manipulation départage les pharmacies proches. »
**Scénarios de démo** : 7 (campagne contre PH-20), 10 (ordonnance manquante)


## Clarifications

### Séance du 2026-11-03
- Q : délai dont dispose la pharmacie pour contester ? → R : **7 jours** après la baisse ou le signalement contesté (décision de l'équipe). Le modérateur répond ensuite sous 72 h.
- Q : si le modérateur juge la rafale fondée, la baisse s'applique-t-elle d'un coup ? → R : **progressivement** (décision de l'équipe). Rythme : [PROPOSITION À APPROUVER] étalement linéaire sur 7 jours.

## Scénarios utilisateur et tests

### Récit 1 — Campagne de faux signalements (Priorité : P1)
14 signalements négatifs contre PH-20 depuis des comptes de 0 à 2 jours.

**Test indépendant** : `services/test_services.py` (PH-20).

1. **Étant donné** au moins 8 signalements négatifs en 3 h, **alors** la baisse est gelée (score calculé sans la rafale), le modérateur humain est saisi et la pharmacie est notifiée.
2. **Étant donné** la comparaison A/B, **alors** le score affiché est de 78 % avec protection et de 50 % sans.

### Récit 2 — Pharmacie réellement peu fiable (Priorité : P1)
1. **Étant donné** PH-25 et des signalements négatifs étalés dans le temps par des comptes anciens, **alors** son score (65 %) est inférieur à celui de ses voisines (79 à 89 %) et elle descend au départage.

### Récit 3 — Signalement neutre (Priorité : P2)
1. **Étant donné** « non délivré, ordonnance manquante », **alors** aucune pénalité n'est appliquée et aucune alternative n'est proposée.
2. **Étant donné** « non délivré, autre raison », **alors** le signalement est neutre et part en revue humaine.

### Récit 4 — Contestation (Priorité : P2)
1. **Étant donné** une pharmacie qui conteste dans les 7 jours suivant une baisse ou un signalement, **alors** la contestation est enregistrée et le modérateur rend une décision motivée sous 72 h, journalisée.
2. **Étant donné** une contestation déposée après 7 jours, **alors** elle est refusée automatiquement avec le motif « hors délai », journalisé.
3. **Étant donné** que le modérateur n'a pas répondu sous 72 h, **alors** une alerte de dépassement est journalisée et le score reste en l'état (aucune baisse supplémentaire pendant l'instruction).

### Récit 5 — Rafale jugée fondée (Priorité : P2)
1. **Étant donné** une rafale gelée que le modérateur juge fondée (par exemple une vraie rupture), **quand** il lève le gel, **alors** l'écart entre le score gelé et le score complet est appliqué progressivement, par parts égales chaque jour pendant 7 jours [PROPOSITION À APPROUVER], et chaque étape est journalisée.
2. **Étant donné** que le modérateur juge la rafale infondée, **alors** les signalements de la rafale sont exclus définitivement du calcul, avec motif journalisé.

## Exigences
- **FR-601** : 4 choix de signalement (trouvé, introuvable, ordonnance manquante, autre raison) avec effets définis dans `rules/fiabilite_pharmacies.yaml`.
- **FR-602** : pénalité pleine seulement si la déclaration a moins de 6 h ; sinon poids 0,25.
- **FR-603** : comptes de moins de 7 jours : poids 0,5.
- **FR-604** : score = (positifs + 2) / (total + 4), fenêtre 30 jours, décroissance de demi-vie 15 jours.
- **FR-605** : la fiabilité ne départage que les pharmacies à moins de 1 km d'écart ; jamais de critère payant.
- **FR-606** : rafale (≥ 8 négatifs en 3 h) → gel et saisine du modérateur humain.
- **FR-607** : la pharmacie peut contester pendant 7 jours après une baisse ou un signalement ; le modérateur rend une décision motivée sous 72 h ; une contestation hors délai est refusée avec motif ; un dépassement des 72 h est journalisé ; tout est tracé dans le journal d'audit.
- **FR-610** : lorsqu'une rafale gelée est jugée fondée, la baisse est appliquée progressivement, par parts égales quotidiennes sur 7 jours [PROPOSITION À APPROUVER] ; lorsqu'elle est jugée infondée, ses signalements sont exclus du calcul.
- **FR-608** : signalants pseudonymisés par hachage ; aucune identité exposée à la pharmacie.
- **FR-609** : un signalement portant sur une classe pouvant révéler la vie sexuelle est enregistré sans la DCI ni la classe (« produit déclaré : trouvé / introuvable ») et sans lien avec le compte ; la protection contre les rafales s'appuie sur un jeton anonyme limité en nombre par appareil.

## Critères de succès
- **SC-601** : tests PH-20 et PH-25 à 100 %.
- **SC-602** : sur 20 campagnes simulées, la baisse affichée est inférieure à 5 points avant décision humaine.

## Traçabilité
| Exigence | Source (`chunk_id`) | Lacune | Test |
|---|---|---|---|
| FR-601 à FR-604 | — (choix équipe) | L10 | test_services.py : PH-25 |
| FR-605 | CMR-LOI-90-035::0017 | L8 | T-605 à écrire |
| FR-606 | CMR-LOI-2024-017::0044 | L10 | test_services.py : PH-20 |
| FR-607 | CMR-LOI-2024-017::0044 | L10 | T-607 à écrire (dans le délai, hors délai, dépassement 72 h) |
| FR-610 | — (choix équipe) | L10 | T-610 à écrire (application sur 7 jours, exclusion si infondée) |
| FR-608 | CMR-LOI-2024-017::0011 | — | T-608 à écrire |
| FR-609 | CMR-LOI-2024-017::0048 | L11 | T-609 à écrire |
