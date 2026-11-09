// Vague C — saisie, reformulation, fiche, filtre de sortie et préparation d'envoi (SF-001-01, SF-001-02,
// SF-001-11, SF-001-13, SF-001-18, SF-002-01, SF-008-02).
import test from 'node:test';
import assert from 'node:assert/strict';
import { translator } from '../js/core/i18n.js';
import * as E from '../js/domain/engine.js';
import { DCI, NOMS_COMMERCIAUX } from '../js/domain/facilities.js';
import { preparerEnvoi } from '../js/domain/envoi.js';
import fr from '../js/i18n/fr.js';
import en from '../js/i18n/en.js';
import { lireTexte } from './outils.mjs';

const ecrits = [];
globalThis.localStorage = { getItem: () => null, setItem: (k, v) => ecrits.push([k, v]), removeItem: () => {} };
const decrire = (await import('../js/screens/patient/decrire.js'));
const verifier = (await import('../js/screens/patient/verifier.js')).default;

test('TEST-001-01-02 : âge de 130 ans refusé (ageMax)', () => {
  assert.deepEqual(decrire.erreurs({ qui: 'moi', age: { valeur: 130, unite: 'ans' }, texte: 'toux' }), { age: 'ageMax' });
  assert.deepEqual(decrire.erreurs({ qui: 'enfant', age: { valeur: 60, unite: 'mois' }, texte: 'toux' }), { age: 'ageMax' });
  assert.deepEqual(decrire.erreurs({ qui: null, age: { valeur: 30, unite: 'ans' }, texte: 'to' }), { qui: 'qui', texte: 'texte' });
});

test('TEST-001-01-03 : 600 caractères au plus ; compteur « 600 / 600 »', () => {
  let cas = null;
  decrire.default.actions.texte({ s: { cas: null }, set: (p) => { cas = p.cas; } }, { value: 'x'.repeat(700) });
  assert.equal(cas.texte.length, 600);
  const s = String(decrire.default.render({ s: { cas }, t: translator('fr') }));
  assert.match(s, /maxlength="600"/);
  assert.ok(s.includes('600 / 600') || s.includes('600&nbsp;/&nbsp;600') || /600\s*\/\s*600/.test(s.replace(/&#?\w+;/g, ' ')));
});

test('TEST-001-01-04 et TEST-001-01-05 : l’exemple remplit sans valider ; rien n’est écrit ni envoyé', () => {
  let cas = null;
  const avant = globalThis.location;
  globalThis.document = { getElementById: () => null };
  decrire.default.actions.exemple({ s: { cas: null }, t: translator('fr'), set: (p) => { cas = p.cas; } }, { dataset: { i: '0' } });
  assert.ok(cas.qui && cas.age.valeur !== null && cas.texte.length > 3);
  assert.equal(cas.tente, false);
  assert.equal(globalThis.location, avant);
  assert.deepEqual(ecrits, []);
  assert.ok(!/fetch\(|local\.write/.test(lireTexte('../js/screens/patient/decrire.js')));
});

test('TEST-001-13-04 : « for two weeks » → 14 jours', () => {
  assert.equal(E.duree('cough for two weeks'), 14);
  assert.equal(E.duree('depuis trois jours'), 3);
  assert.equal(E.duree('since yesterday'), 1);
});

test('TEST-001-13-05 : changer de langue réaffiche les signes sans nouvelle analyse', () => {
  const signes = E.reformuler('Je tousse, le corps chauffe');
  const cas = { qui: 'moi', age: { valeur: 30, unite: 'ans' }, texte: 'x', signes, reponses: {} };
  const frs = String(verifier.render({ s: { cas }, t: translator('fr') }));
  const ens = String(verifier.render({ s: { cas }, t: translator('en') }));
  assert.ok(frs.includes('Toux') && ens.includes('Cough') && !ens.includes('Toux'));
  assert.ok(ens.indexOf('data-act="ouvrir-ajout"') > 0 || ens.includes('puce--suggestion'));
});

test('TEST-001-18-02 : code de fiche au format XXX-XXX, sans 0, O, 1 ni I', () => {
  for (let g = 1; g <= 1000; g++) assert.match(E.codeFiche(g * 7919), /^[ACDEFGHJKLMNPQRTUVWXY34679]{3}-[ACDEFGHJKLMNPQRTUVWXY34679]{3}$/);
});

const textes = (cat) => JSON.stringify(cat).toLowerCase();
const sansAccent = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

test('TEST-001-11-01 : aucun nom de médicament dans les écrans du parcours citoyen ni dans la table des pistes', () => {
  const parcours = ['commun', 'securite', 'accueil', 'decrire', 'verifier', 'pistes', 'orientation', 'fiche', 'urgence', 'art48', 'horsChamp', 'decision', 'droits'];
  const noms = [...DCI.flatMap((d) => [d.fr, d.en]), ...Object.keys(NOMS_COMMERCIAUX)].map((x) => sansAccent(x.toLowerCase()));
  for (const cat of [fr, en]) {
    const t = sansAccent(parcours.map((k) => JSON.stringify(cat[k])).join(' ').toLowerCase());
    for (const n of noms) assert.ok(!new RegExp(`\\b${n.replace(/[+()]/g, '.')}\\b`).test(t), n);
    assert.ok(!/posologie|dosage|mg\/kg|comprimes? par jour/.test(t));
  }
  const p = sansAccent(JSON.stringify(E.PATHOLOGIES).toLowerCase());
  for (const n of noms) assert.ok(!p.includes(n), n);
});

test('TEST-001-02-02 : aucune question sur la vie sexuelle, la génétique ou la biométrie', () => {
  const interdits = /sexuel|sexual|genetique|genetic|genotype|drepanocytose|sickle|empreinte digitale|fingerprint|biometri/;
  for (const cat of [fr, en]) {
    const questions = [cat.verifier.questions, cat.pro.questions || {}, cat.fiche];
    assert.ok(!interdits.test(sansAccent(JSON.stringify(questions).toLowerCase())));
  }
});

test('TEST-001-02-01 et TEST-002-01-01 : la contribution ne contient que quatre champs, des codes SYM-NNN', () => {
  const cas = { qui: 'moi', age: { valeur: 34, unite: 'ans' }, texte: 'J’ai de la fièvre et mon test génétique est positif', signes: { presents: ['SYM-001', 'SYM-002'], absents: [], jours: 2 } };
  const r = preparerEnvoi(cas, 'surveillance', { consentement: { finalites: { surveillance: true } }, aire: 'AS-07', quand: new Date('2026-11-09T09:00:00Z') });
  assert.equal(r.ok, true);
  assert.deepEqual(Object.keys(r.charge).sort(), ['aire', 'codes', 'semaine', 'tranche_age']);
  assert.ok(r.charge.codes.every((c) => /^SYM-\d{3}$/.test(c)));
  const brut = JSON.stringify(r.charge);
  for (const mot of ['fièvre', 'génétique', 'test', 'positif']) assert.ok(!brut.includes(mot), mot);
  assert.equal(r.charge.tranche_age, '18_50_ans');
  assert.match(r.charge.semaine, /^2026-W\d{2}$/);
});

test('TEST-008-02-01 : sans consentement « surveillance », aucune contribution n’est préparée', () => {
  const cas = { qui: 'moi', age: { valeur: 34, unite: 'ans' }, texte: 'x', signes: { presents: ['SYM-001'], absents: [], jours: null } };
  const r = preparerEnvoi(cas, 'surveillance', { consentement: { finalites: { surveillance: false } }, aire: 'AS-07' });
  assert.deepEqual(r, { ok: false, code: 'E-ENVOI-SANS-CONSENTEMENT' });
  assert.equal(preparerEnvoi(cas, 'surveillance', { consentement: null, aire: 'AS-07' }).ok, false);
});
