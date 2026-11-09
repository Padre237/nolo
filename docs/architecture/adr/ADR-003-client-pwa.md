# ADR-003 — Client : PWA sans étape de construction

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
L'accès se fait uniquement par application. Le registre npm est inaccessible ici ; Node 22 et Playwright sont présents. Plusieurs traitements doivent rester sur l'appareil (FR-111, FR-112, FR-308, FR-408).

## Décision
Application web progressive en HTML et modules JavaScript natifs (ES2022), sans framework ni bundler ; textes dans `src/client/i18n/fr.json` et `en.json` ; logique sur l'appareil dans `src/client/ondevice/` en modules purs testés par `node --test` ; écrans testés par Playwright.

## Conséquences
Installable sur smartphone, testable ici, sans dépendance externe. Une application native pourra réutiliser les modules `ondevice/` plus tard.

## Alternatives écartées
React Native ou Flutter : construction impossible ici et coût trop élevé avant le 10 novembre.

## Exigences concernées
FR-111, FR-112, FR-308, FR-408, SF-013-01
