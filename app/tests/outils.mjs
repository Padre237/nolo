// Outils communs des tests : chargement des données embarquées sous Node (le navigateur les lit par fetch).
import { readFileSync } from 'node:fs';

export const lireJson = (chemin) => JSON.parse(readFileSync(new URL(chemin, import.meta.url), 'utf8'));
export const lireTexte = (chemin) => readFileSync(new URL(chemin, import.meta.url), 'utf8');

export const politiqueBrute = () => lireJson('../data/politique.json');
export const baseBrute = () => lireJson('../data/base.json');
export const glossaireBrut = () => lireJson('../data/glossaire.json');

/** Horloge fixe (ADR-013) : les tests ne dépendent jamais de l'heure réelle. */
export const horlogeFixe = () => new Date('2026-07-20T08:00:00Z');
