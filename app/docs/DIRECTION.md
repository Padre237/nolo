# Nolo — Direction artistique « Premium Medical Intelligence »

Document de studio. Il fixe le monde visuel avant le code ; `DESIGN.md` décrit ensuite ce qui a été construit.

## 1. Thèse

Nolo transforme des signes décrits avec ses propres mots en **un chemin vers la bonne porte de soins**. Le monde visuel vient de la **signalétique hospitalière** : le trait de couleur au sol qu'on suit jusqu'au bon service, les panneaux à fort contraste, les pictogrammes au trait, les grands caractères lisibles de loin. L'interface refuse le tableau de bord SaaS (tuiles de chiffres, cartes identiques, dégradés « IA »).

Le motif signature : **des points (les signes) qui convergent vers un trait (le parcours) et aboutissent à un anneau (la porte, la structure de soins)**. Il a toujours un sens : progression, état « analyse », repère de structure, tampon de la fiche.

## 2. Monde

| Élément | Choix | Raison |
|---|---|---|
| Fond | Pierre `#F3F5F2` | Lisible en plein jour sur un téléphone d'entrée de gamme, luminosité basse |
| Encre | `#0F1A17` | Contraste 16:1 sur le fond |
| Forêt `#0B5D4B` / forêt profond `#083F33` | Action, identité, panneaux de direction | La croix verte des pharmacies camerounaises, en version profonde et calme |
| Menthe `#E7F3EE` / trait menthe `#B9DCCD` | Sélection, motif | Jamais décoratif seul |
| Rouge `#B42318` | **Réservé à l'urgence** | Un seul sens, jamais ailleurs |
| Ambre `#7A4A05` sur `#FCF2DE` | **Réservé au POC et aux données fictives** | Le jury voit d'un coup d'œil ce qui est expérimental |
| Typographie | **Atkinson Hyperlegible Next** (texte, titres), **Atkinson Hyperlegible Mono** (codes, NIU, numéros) | Conçue par le Braille Institute pour les lecteurs malvoyants : lettres impossibles à confondre (l, I, 1 ; 0, O). Nolo vise des personnes peu alphabétisées, sur de vieux écrans, en plein soleil. Remplace Space Grotesk et Inter, trop répandues. Auto-hébergée (hors ligne). |

Stratégie de couleur : **retenue**, avec un seul moment **engagé** — le panneau de direction forêt profond (accueil, résultat d'orientation, en-tête de l'espace établissement).

## 3. Parcours

**Citoyen** : Première utilisation (consentement D-028) → Accueil → Décrire (qui, âge, texte libre) → Vérifier (signes reformulés + vérification de sécurité) → l'un de : Pistes → Où aller → Fiche ; Urgence ; Message confidentiel (art. 48) ; Hors champ. Plus : recherche d'un service, d'un médicament, de sang ; conditions ; mes données.

**Établissement** : Connexion / Inscription en 4 étapes (type, identité et NIU, position, mot de passe) → code e-mail (simulé) → Tableau de bord : Accueil (chemin de vérification), Ma fiche (questions conditionnelles D-029), Stock (modèle, import, rapport, 48 h), Tendances (D-032 : seuil 5, arrondi 5, semaines complètes), Mes indicateurs, Aperçu public.

## 4. Composition

```
Mobile (360–767)                   Ordinateur (≥ 960)
┌─────────────────────────┐        ┌──────────────────────────────────────────────┐
│ ◎ nolo      [FR|EN]     │        │ ◎ nolo                         [FR|EN]       │
│ ●──●──○──◎  (parcours)  │        ├──────────────────┬───────────────────────────┤
├─────────────────────────┤        │ Titre éditorial  │  Surface de travail       │
│ Titre                   │        │ Contexte         │  (formulaire, résultat)   │
│ Surface de travail      │        │ ●                │  560–640 px               │
│ …                       │        │ │  parcours      │                           │
│ [ Action principale ]   │        │ ●  vertical      │                           │
├─────────────────────────┤        │ ◎                │                           │
│ ☎ Urgence ?  [119][112] │        ├──────────────────┴───────────────────────────┤
└─────────────────────────┘        │ ☎ Urgence ?                     [119] [112]   │
                                   └──────────────────────────────────────────────┘
```

Alignement à gauche partout ; listes en **lignes séparées par des filets** plutôt qu'en cartes ; une seule surface en relief par écran au plus.

## 5. Composants

En-tête (logo, langue, retour) · Trait de parcours (horizontal en mobile, vertical en ordinateur) · Barre de sécurité persistante · Bouton (principal 56 px, secondaire, discret) · Choix (case et pastille dessinées, 48 px min.) · Champ (étiquette visible, aide, erreur sous le champ) · Puce de signe (retirable, 44 px) · Panneau de direction · Ligne de structure · Étiquettes « Expérimental » et « Données fictives » · Page de carnet (fiche soignant) · Chemin de vérification (établissement) · Registre (tableau de stock, rapport d'import) · Graphique hebdomadaire.

## 6. Mouvement

| Moment | Durée, courbe | Pourquoi |
|---|---|---|
| Appui sur un bouton ou un choix | 120 ms, `scale(.97)` | Le téléphone a entendu |
| Changement d'état (sélection, focus) | 180 ms, couleur et bordure | Montrer ce qui a changé |
| Section révélée (âge, accord parental, erreur) | 240 ms, opacité + 6 px | La question apparaît là où on regarde |
| Changement d'écran | Transition de vue, 220 ms ; le trait de parcours reste fixe | Continuité spatiale : seul le contenu change |
| **Moment signature** : analyse des signes | 900 ms, une fois | Les points convergent et le trait se dessine jusqu'à l'anneau |

Courbe : `cubic-bezier(0.23, 1, 0.32, 1)`. Rien au survol sur écran tactile. `prefers-reduced-motion` : couleurs et opacités seulement.

## 7. Voix

Vouvoiement, phrases courtes, verbes d'action. Jamais « diagnostic » ni « probabilité » pour une piste : « piste à confirmer par un soignant ». Les erreurs disent quoi faire. Espaces insécables avant `? : ; !` et dans `18 ans`, `5 km`.

## 8. Ce qui reste fictif (à remplacer)

District, établissements, stocks, compteurs de tendances, table de scores des pistes (en attendant le modèle DDXPlus), numéros de téléphone des structures, code e-mail. Tout est marqué « Données fictives ».
