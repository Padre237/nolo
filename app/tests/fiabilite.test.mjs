// Vague C — fiabilité des pharmacies dans Nolo (SF-006-01 à SF-006-04) : parité avec la référence Python.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as R from '../js/domain/fiabilite.js';
import { lireJson, lireTexte } from './outils.mjs';

const regles = lireJson('../data/regles.json').fiabilite_pharmacies;
const oracle = lireJson('../../tests/js/fixtures/fiabilite_attendue.json');
const lignes = lireTexte('../../kb/data/synthetic/signalements.csv').trim().split('\n');
const cles = lignes[0].split(',');
const signalements = lignes.slice(1).map((l) => Object.fromEntries(l.split(',').map((v, i) => [cles[i], v])));
// Les horodatages de la référence sont des heures locales sans fuseau : on les lit de la même façon des deux côtés.
const instant = (s) => new Date(`${s}:00Z`);
const lus = signalements.map((r) => ({ ...r, horodatage: instant(r.horodatage) }));

test('TEST-006-02-02, TEST-006-03-02, TEST-006-04-02 : mêmes scores, effectifs et gels que la référence Python', () => {
  for (const a of oracle.attendus) {
    const s = R.scoreFiabilite(a.etab_id, instant(a.instant), lus, regles);
    assert.deepEqual({ score: s.score, n: s.n, gel: s.gel, negatifs_3h: s.negatifs3h }, { score: a.score, n: a.n, gel: a.gel, negatifs_3h: a.negatifs_3h }, `${a.etab_id} ${a.instant}`);
  }
  assert.ok(oracle.attendus.some((a) => a.gel));
});

test('TEST-006-02-01 : 6 positifs sur 8 → (6 + 2) / (8 + 4) avant décroissance', () => {
  const now = new Date('2026-10-01T12:00:00Z');
  const r = (resultat) => ({ etab_id: 'P', resultat, horodatage: now, age_compte_jours: '30', age_declaration_h: '1' });
  const liste = [...Array(6).fill('trouve'), 'introuvable_absent_du_stock', 'introuvable_absent_du_stock'].map(r);
  const s = R.scoreFiabilite('P', now, liste, regles);
  assert.equal(s.score, Math.round(100 * 8 / 12));
  assert.equal(s.n, 8);
});

test('TEST-006-01-03 : poids d’un négatif — déclaration de 8 h (0,25) et compte de 3 jours (0,5)', () => {
  const now = new Date('2026-10-01T12:00:00Z');
  assert.equal(R.poids({ resultat: 'introuvable_absent_du_stock', horodatage: now, age_compte_jours: '3', age_declaration_h: '8' }, now, regles), 0.125);
  assert.equal(R.poids({ resultat: 'trouve', horodatage: now, age_compte_jours: '30', age_declaration_h: '8' }, now, regles), 1);
  assert.equal(R.poids({ resultat: 'non_delivre_ordonnance_manquante', horodatage: now, age_compte_jours: '30', age_declaration_h: '1' }, now, regles), 0);
});

test('TEST-006-03-01 : la fiabilité ne départage qu’à moins de 1 km', () => {
  const sc = { a: 90, b: 60 };
  const d = (x) => x.d;
  const proches = R.departager([{ id: 'b', d: 2.1 }, { id: 'a', d: 2.7 }], { distance: d, score: (x) => sc[x.id], ouvert: () => true });
  assert.deepEqual(proches.map((x) => x.id), ['a', 'b']);
  const loin = R.departager([{ id: 'b', d: 2.1 }, { id: 'a', d: 3.6 }], { distance: d, score: (x) => sc[x.id], ouvert: () => true });
  assert.deepEqual(loin.map((x) => x.id), ['b', 'a']);
});

test('TEST-006-04-01 : 8 négatifs en 2 h → baisse gelée, saisine du modérateur', () => {
  const now = new Date('2026-10-01T12:00:00Z');
  const neg = (min) => ({ etab_id: 'P', resultat: 'introuvable_absent_du_stock', horodatage: new Date(now - min * 60e3), age_compte_jours: '30', age_declaration_h: '1' });
  const pos = (j) => ({ etab_id: 'P', resultat: 'trouve', horodatage: new Date(now - j * 864e5), age_compte_jours: '30', age_declaration_h: '1' });
  const histoire = [pos(2), pos(3), pos(4), pos(5)];
  const avant = R.scoreFiabilite('P', now, histoire, regles);
  const rafale = R.scoreFiabilite('P', now, [...histoire, ...[10, 20, 30, 40, 50, 60, 70, 80].map(neg)], regles);
  assert.equal(rafale.gel, true);
  assert.equal(rafale.score, avant.score);
  assert.equal(rafale.statut, 'gel');
});

test('Démonstration dans Nolo : une pharmacie fictive en rafale est gelée ; les signalements de la personne comptent', () => {
  const now = new Date('2026-11-09T09:00:00Z');
  const demo = R.signalementsDemo(now);
  assert.ok(demo.length > 20);
  assert.equal(R.scoreFiabilite('ph-marche', now, demo, regles).gel, true);
  const avant = R.scoreFiabilite('ph-gare', now, demo, regles);
  const local = R.depuisLocal([{ p: 'ph-gare', d: 'paracetamol', j: '2026-11-09', v: 'trouve' }], now);
  const apres = R.scoreFiabilite('ph-gare', now, [...demo, ...local], regles);
  assert.equal(apres.n, avant.n + 1);
});
