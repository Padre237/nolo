# Nolo — système de conception (tel que construit)

Décrit l'interface livrée le 9 novembre 2026. Les valeurs vivent dans `css/tokens.css` ; ce document dit à quoi elles servent. La direction d'origine est dans `DIRECTION.md`.

## Monde

Signalétique hospitalière. Le trait qu'on suit jusqu'au bon service devient le motif de Nolo : **signes (points) → parcours (trait) → porte (anneau)**. Il apparaît à quatre endroits, toujours avec un sens :

| Où | Sens |
|---|---|
| En-tête du parcours | Progression Décrire → Vérifier → Pistes → Où aller |
| Écran Vérifier | Un point par signe retenu ; il se dessine une fois, à l'arrivée de la reformulation |
| Panneau de direction | Le trait arrive sur l'anneau qui porte la distance |
| Chemin de vérification (espace pro) | Compte → Fiche → Agrément → Visible |
| Carte du ministère | L'anneau marque une région ou une aire qui porte un signal à vérifier |

## Couleur

Stratégie retenue : fond pierre, forêt pour l'action et l'identité, un seul moment engagé par écran (panneau forêt profond). Deux couleurs à sens unique :

- **Rouge** (`--urgence`) : urgence seulement — barre de sécurité, écran d'urgence, signe de danger.
- **Ambre** (`--experimental`) : POC et données fictives seulement — étiquettes, scores de démonstration, boîte de réception simulée.

Les niveaux de stock combinent forme, mot et teinte : rond plein (disponible), demi-rond (faible), carré vide (rupture). La teinte ne porte jamais seule le sens.

Contrastes vérifiés par script : encre sur pierre 16,2:1 ; texte secondaire 7,1:1 ; texte discret 5,3:1 ; blanc sur forêt 7,8:1 ; menthe vive sur forêt profond 7,1:1 ; ambre sur fond ambre 6,7:1 ; rouge foncé sur fond rouge 8,0:1.

## Typographie

Atkinson Hyperlegible Next (texte et titres) et Atkinson Hyperlegible Mono (codes, NIU), auto-hébergées en WOFF sous-ensemble latin (38 Ko + 19 Ko), licence OFL. Choisies pour la lisibilité (l, I, 1 et 0, O distincts) : public peu alphabétisé, vieux écrans, plein soleil. Corps 17 px sur mobile ; minimum 13 px. Typographie française automatique : espace fine avant ? ! ;, insécable avant : et entre nombre et unité.

## Composants

| Composant | Règle |
|---|---|
| Bouton principal | 56 px ; secondaire 48 px ; appui `scale(.97)` 120 ms |
| Bouton « inactif expliqué » | Reste focalisable, dit pourquoi il ne peut pas agir (pas d'`aria-disabled` muet) |
| Choix (case, pastille, tuile) | Surface entière cliquable ; état coché = bordure forêt + fond menthe |
| Segment Oui / Non | Réponses de sécurité ; état réel (`aria-pressed`) |
| Puce de signe | 44 px, bouton de retrait 44 × 44 |
| Ligne d'action | Liste en filets, pas de cartes répétées |
| Panneau de direction | Le seul aplat sombre de l'écran ; « Allez à » + nom + distance |
| Page de carnet | Fiche soignant : papier réglé, marge menthe, tampon circulaire du code |
| Barre de sécurité | Fixe en bas, jamais coupée ; 119 et 112 en deux cibles de 48 px ; masquée sur l'écran d'urgence qui a ses propres appels géants |

## Espaces professionnels

- **Tableau d'orientation** (Services et urgences) : aplat forêt profond, une ligne par service avec pictogramme, nom et présence (jours, 24 h sur 24), comme le panneau du hall d'un hôpital. Seule la ligne Urgences prend le rouge.
- **Carte des signes** : une seule teinte en 5 classes, de la menthe à la forêt ; « moins de 5 » en hachures ; régions accessibles au clavier (Entrée, Espace) ; panneau latéral et histogramme sur 12 semaines ; aires de santé en schéma de cases (de vrais boutons).
- **Simulation « et si »** : tableau A/B ; les mesures qui changent passent en ambre, couleur réservée au fictif et à l'expérimental.

## Mouvement

Courbe `cubic-bezier(.23, 1, .32, 1)`. Appui 120 ms, état 180 ms, apparition 240 ms, transition d'écran 220 ms (le trait de parcours ne bouge pas). Un seul moment signature : le dessin du motif (900 ms) à la première utilisation, à l'analyse des signes et à l'arrivée sur le panneau de direction. Pas d'animation sur l'accueil (vu souvent). Survol réservé aux pointeurs fins. `prefers-reduced-motion` : tout mouvement retiré.

## Mise en page

Une colonne sous 960 px ; au-delà, récit à gauche (collant), surface de travail à droite (640 px au plus). Espace pro : navigation latérale de 232 px, ou pastilles défilantes sur mobile. Vérifié sans débordement à 360, 390, 768 et 1 440 px.

## Exceptions aux jetons

Contrôlées par `app/tests/qualite.test.mjs` (TEST-013-05-01 et TEST-013-05-03). Hors de `css/tokens.css`, seules ces valeurs littérales sont admises :

- `#fff` : texte et pictogrammes sur les aplats forêt, rouge d'urgence et boutons pleins (équivaut à `--sur-sombre`) ;
- `rgba(` : voiles translucides sur les panneaux sombres et ombres portées.

Usages du rouge hors du sens « urgence », constatés le 2026-11-09 et laissés en l'état en attendant une décision (écart de SF-013-05, Q-013-05-01) :

- Rouge hors urgence : `.champ__erreur` ; `.saisie[aria-invalid="true"]` ; `.rapport__rejets` ; `.orientation__liste li.est-fort`

