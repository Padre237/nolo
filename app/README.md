# Nolo — de vos signes à la bonne porte

PWA bilingue (français, anglais) de l'équipe **CENADI Équipe 2** pour l'ITU AI for Good Lab Hackathon. « Nolo » veut dire « santé » en douala.

- **Citoyen** : consentement en trois cases (D-028), description libre, signes reformulés, vérification de sécurité, pistes du module expérimental, structure conseillée, fiche pour le soignant ; urgence, message confidentiel (art. 48) et hors champ ; recherche d'un service, d'un médicament ou de sang ; Mes données.
- **Établissement** : inscription en 4 étapes, code e-mail, fiche conditionnelle selon le type (D-029), photos sans métadonnées, import du stock avec rapport ligne par ligne et expiration à 48 h, tendances de la demande (D-032), indicateurs, aperçu public, compte et historique.
- **Hôpitaux et centres spécialisés** : fiche complète (spécialités avec présence et jours, urgences, maternité, bloc, imagerie, laboratoire, banque de sang, pharmacie), vue « Services et urgences » (tableau d'orientation), nouveau type « centre spécialisé » (dialyse, tuberculose, cancérologie, santé mentale, VIH, ophtalmologie, diabète), comptes de démonstration pharmacie et hôpital.
- **Ministère de la Santé (démonstration)** : carte interactive des signes déclarés par région (zoom sur les aires de santé du district de démonstration), détection CUSUM, file du point focal (motif obligatoire, instrument RSI annexe 2, refus des listes nominatives, export DHIS2 simulé), agréments, offre et demande par région, politique en vigueur avec empreinte SHA-256, registre des lacunes et simulation « et si ».

## Lancer

Aucune étape de construction. Servir le dossier en HTTP (les modules ES et WebCrypto l'exigent) :

```sh
python3 -m http.server 8765
# puis ouvrir http://localhost:8765/
```

Tests (Node 18 ou plus) : `node --test tests/*.test.mjs` — 33 tests (consentement, moteur, orientation, NIU, import du stock, tendances, surveillance, instrument RSI, simulation « et si », parité des catalogues FR/EN).

## Ce qui est réel, ce qui est simulé

| Réel dans le prototype | Simulé (marqué « Données fictives ») |
|---|---|
| Règles D-028 (consentement, âge, accord parental, enregistrement à 5 champs) | District, 20 établissements, horaires, stocks, numéros (appels désactivés) |
| Reformulation des signes FR/EN sur l'appareil, négations, durées, expressions camerounaises (« le corps chauffe ») | Table de scores des pistes, en attendant le modèle DDXPlus |
| Signes de danger → urgence, pistes masquées ; art. 48 → message neutre ; hors champ | Liste d'agrément, code e-mail, vérificateur |
| Choix de la structure : niveau le plus élevé, ouverte puis la plus proche, rayon élargi par paliers | Compteurs de tendances (graine fixe) |
| Inscription, NIU, mots de passe PBKDF2, blocage après 5 échecs, import CSV, expiration 48 h | Comptes stockés dans ce navigateur |
| Seuil 5, arrondi à 5, CUSUM, instrument RSI, refus des localisations, simulation « et si » | Séries de surveillance, deux regroupements injectés (diarrhée en AS-07, fièvre et éruption dans le Nord), dossiers d'agrément, offre et demande par région |
| Limites des 10 régions : Natural Earth 1:10m (domaine public), simplifiées par `tools/carte.py` | Aires de santé : schéma, faute de polygones versés |

## Organisation

```
index.html, manifest.webmanifest, sw.js   coque PWA, hors ligne
css/        tokens → base → components → screens → pro
js/core/    gabarits sûrs + mise à jour du DOM, état, traduction
js/domain/  logique pure, testée : consent, engine, facilities, pro, trends
js/i18n/    fr.js, en.js (mêmes clés)
js/ui/      pictogrammes dessinés pour Nolo, composants partagés
js/screens/ patient/ (13 écrans), pro/ (entrée, inscription, code, tableau de bord), ministere/ (console)
tools/      carte.py (génère js/domain/carte-regions.js depuis Natural Earth)
docs/       DIRECTION.md (direction artistique), DESIGN.md (système construit)
tests/      node:test
```

Polices : Atkinson Hyperlegible Next et Mono, SIL Open Font License (`assets/fonts/OFL-atkinson.txt`).
