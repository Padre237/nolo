// Vague C — recherches explicites (SF-003-01, SF-003-02, SF-003-04, SF-004-01, SF-005-01, SF-005-02, SF-010-03).
import test from 'node:test';
import assert from 'node:assert/strict';
import * as F from '../js/domain/facilities.js';
import { lireJson } from './outils.mjs';

const regles = lireJson('../data/regles.json');
const lundi10h = new Date('2026-11-09T09:00:00Z'); // lundi 10 h à Douala
const ouvert = { h24: true };
const neuro = (id, x, extra = {}) => ({ id, nom: id, type: 'hopital', x, y: 0, verifie: true, specialites: { neurologie: 'tous' }, ...ouvert, ...extra });
const banque = (id, x, niveau, sangH = 1) => ({ id, nom: id, type: 'centre_transfusion', x, y: 0, verifie: true, ...ouvert, sang: { 'B−': niveau, 'O−': niveau }, sangH });

test('TEST-003-02-01 : élargir jusqu’à obtenir 3 résultats (rayon 50 km)', () => {
  const liste = [neuro('a', 12), neuro('b', 40), neuro('c', -40)];
  const r = F.chercherSpecialite('neurologie', { quand: lundi10h, liste });
  assert.equal(r.rayon, 50);
  assert.equal(r.resultats.length, 3);
  assert.equal(r.elargi, true);
  const deux = F.chercherSpecialite('neurologie', { quand: lundi10h, liste: [neuro('a', 3), neuro('b', 4), neuro('c', 8)] });
  assert.equal(deux.rayon, 10);
  assert.equal(regles.recherche_specialite.recherche.resultats_minimum, F.RESULTATS_MINIMUM);
});

test('TEST-003-02-02 : une structure ouverte passe avant une structure fermée plus proche', () => {
  const fermee = neuro('fermee', 1, { h24: false, horaires: [null, null, null, null, null, null, null] });
  const r = F.chercherSpecialite('neurologie', { quand: lundi10h, liste: [fermee, neuro('ouverte', 3), neuro('x', 4)] });
  assert.deepEqual(r.resultats.map((e) => e.id).slice(0, 2), ['ouverte', 'x']);
  assert.equal(r.resultats.at(-1).id, 'fermee');
});

test('TEST-003-01-03 : saisie libre « cœur » → cardiologie (synonymes de recherche_specialite.yaml)', () => {
  const syn = regles.recherche_specialite.specialites;
  assert.equal(F.resoudreSpecialite('cœur', syn), 'cardiologie');
  assert.equal(F.resoudreSpecialite('  Coeur ', syn), 'cardiologie');
  assert.equal(F.resoudreSpecialite('bébé', syn), 'pediatrie');
  assert.equal(F.resoudreSpecialite('zorglub', syn), null);
});

test('TEST-003-04-01 : le centre de dialyse fictif apparaît pour la néphrologie, type centre spécialisé', () => {
  const r = F.chercherSpecialite('nephrologie', { quand: lundi10h });
  const cs = r.resultats.find((e) => e.id === 'cs-dialyse');
  assert.ok(cs);
  assert.equal(cs.type, 'centre_specialise');
});

test('TEST-004-01-01 à 03 : catalogue des DCI et filtre', () => {
  assert.equal(F.DCI.length, 16);
  assert.deepEqual(F.DCI.filter((d) => d.sensible).map((d) => d.id).sort(), ['levonorgestrel', 'tld']);
  for (const d of F.DCI) assert.ok(d.fr && d.en, d.id);
  assert.deepEqual(F.filtrerDci('misoprostol', 'fr'), []);
  const p = F.filtrerDci('PARACE', 'fr');
  assert.ok(p.length <= 8 && p.some((d) => d.id === 'paracetamol'));
  assert.equal(F.filtrerDci('', 'fr').length, 8);
});

test('TEST-005-01-01 : sang — rupture exclue, « disponible » avant « faible », puis distance', () => {
  const r = F.chercherSang('O−', { liste: [banque('faible-1km', 1, 'faible'), banque('dispo-4km', 4, 'disponible'), banque('rupture', 0.5, 'rupture')] });
  assert.deepEqual(r.resultats.map((x) => x.e.id), ['dispo-4km', 'faible-1km']);
});

test('TEST-005-02-01 : appel au don seulement si la majorité des banques est en rupture', () => {
  const deux = F.chercherSang('B−', { liste: [banque('a', 1, 'rupture'), banque('b', 2, 'rupture'), banque('c', 3, 'disponible')] });
  assert.equal(deux.appelAuDon, true);
  const une = F.chercherSang('B−', { liste: [banque('a', 1, 'rupture'), banque('b', 2, 'faible'), banque('c', 3, 'disponible')] });
  assert.equal(une.appelAuDon, false);
});

test('TEST-010-03-02 : une déclaration de sang de plus de 6 h n’est plus montrée', () => {
  const r = F.chercherSang('O−', { liste: [banque('vieille', 1, 'disponible', 6.02), banque('fraiche', 2, 'disponible', 5.9)] });
  assert.deepEqual(r.resultats.map((x) => x.e.id), ['fraiche']);
  assert.equal(regles.disponibilites.sang.fraicheur_declaration_h, F.FRAICHEUR_SANG_H);
});
