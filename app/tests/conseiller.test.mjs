// F-016 — Conseiller « Mes droits santé » : recherche (SF-016-01), réponse (SF-016-02), écran (SF-016-03).
import test from 'node:test';
import assert from 'node:assert/strict';
import { creerBase } from '../js/domain/base.js';
import { creerIndex } from '../js/agents/conseiller/bm25.js';
import { creerGlossaire } from '../js/agents/conseiller/glossaire.js';
import { creerConseiller, MENTION } from '../js/agents/conseiller/repondre.js';
import { translator, flatKeys } from '../js/core/i18n.js';
import fr from '../js/i18n/fr.js';
import en from '../js/i18n/en.js';
import droits from '../js/screens/patient/droits.js';
import { baseBrute, glossaireBrut, lireJson, lireTexte } from './outils.mjs';

const base = creerBase(baseBrute());
const index = creerIndex(base);
const glossaire = creerGlossaire(glossaireBrut());
const conseiller = creerConseiller({ base, index, glossaire });
const oracle = lireJson('../../tests/js/fixtures/classements_attendus.json');

test('TEST-016-01-01 : mêmes 5 fragments, dans le même ordre, que kb/bm25.py (40 questions)', () => {
  assert.equal(oracle.base, baseBrute().empreinte_kb);
  for (const q of oracle.questions) {
    const cmr = index.chercher(q.question, { k: 5, prefixe: 'CMR-' });
    const int = index.chercher(q.question, { k: 5, prefixe: 'INT-' });
    assert.deepEqual(cmr.map((r) => r.id), q.cmr.map((x) => x[0]), `${q.id} CMR`);
    assert.deepEqual(int.map((r) => r.id), q.int.map((x) => x[0]), `${q.id} INT`);
    cmr.forEach((r, i) => assert.ok(Math.abs(r.score - q.cmr[i][1]) < 1e-6, `${q.id} score`));
  }
});

test('TEST-016-01-02 : textes camerounais d’abord', () => {
  const r = conseiller.chercher('Qui a le droit de vendre des médicaments au public ?', 'fr');
  assert.equal(r.etendu, false);
  assert.ok(r.resultats.length && r.resultats.every((x) => x.id.startsWith('CMR-')));
});

test('TEST-016-01-03 : question en anglais enrichie par le glossaire', () => {
  const q = 'Can someone who is not a doctor make a diagnosis?';
  const enrichie = glossaire.enrichir(q);
  assert.ok(enrichie.startsWith(q) && enrichie.length > q.length);
  assert.ok(/médecin|medecine|diagnostic/i.test(enrichie.slice(q.length)));
  const top = index.chercher(enrichie, { k: 5, prefixe: 'CMR-' });
  assert.ok(top.some((x) => x.id.startsWith('CMR-LOI-90-036')), top.map((x) => x.id).join(' '));
});

test('TEST-016-01-04 : recherche rapide (≤ 50 ms par question)', () => {
  for (const q of oracle.questions) {
    const t0 = performance.now(); conseiller.chercher(q.question, 'fr');
    assert.ok(performance.now() - t0 <= 50, q.id);
  }
});

test('TEST-016-02-01 : un extrait cité de l’art. 32 de la loi 2024/017', () => {
  const r = conseiller.repondre('Mes données de santé peuvent-elles partir à l’étranger ?', 'fr');
  assert.equal(r.verdict, 'AUTORISE');
  assert.ok(r.extraits.length >= 1 && r.extraits.length <= 3);
  assert.ok(r.extraits.some((x) => x.doc === 'CMR-LOI-2024-017' && /Article 32\b/.test(x.article)), r.extraits.map((x) => x.id).join(' '));
  for (const x of r.extraits) {
    assert.ok(x.extrait.length <= 401 && x.titre && x.statut && x.article !== undefined);
  }
});

test('TEST-016-02-02 : refus sans fondement, sans extrait', () => {
  for (const q of ['Quel est le prix du pain ?', 'What is the price of bread?']) {
    const r = conseiller.repondre(q, q.startsWith('Q') ? 'fr' : 'en');
    assert.equal(r.verdict, 'BLOQUE_SANS_FONDEMENT', q);
    assert.deepEqual(r.extraits, []);
  }
});

test('TEST-016-02-03 : la mention accompagne toute réponse', () => {
  for (const [q, l] of [['Mes données de santé peuvent-elles partir à l’étranger ?', 'fr'], ['Quel est le prix du pain ?', 'fr'], ['Is it forbidden to process data about sexual life?', 'en']]) {
    const r = conseiller.repondre(q, l);
    assert.equal(r.mention, MENTION[l]);
    assert.match(translator(l)('droits.mention'), /juriste|lawyer/);
  }
});

test('TEST-016-02-04 : ni la question ni la réponse ne sont conservées ou transmises', () => {
  const traces = [];
  const avant = { fetch: globalThis.fetch, localStorage: globalThis.localStorage };
  globalThis.fetch = (...a) => { traces.push(['fetch', a]); return Promise.reject(new Error('interdit')); };
  globalThis.localStorage = { setItem: (...a) => traces.push(['setItem', a]), getItem: () => null, removeItem: () => {} };
  try { conseiller.repondre('Une application peut-elle enregistrer ma religion ?', 'fr'); }
  finally { globalThis.fetch = avant.fetch; globalThis.localStorage = avant.localStorage; }
  assert.deepEqual(traces, []);
  assert.ok(!/localStorage|fetch\(|local\.write/.test(lireTexte('../js/agents/conseiller/repondre.js')));
});

test('TEST-016-03-01 : écran du conseiller — champ de 300 caractères, 4 exemples, réponse', () => {
  const t = translator('fr');
  const vide = String(droits.render({ s: { langue: 'fr', droits: {} }, t, params: [] }));
  assert.match(vide, /maxlength="300"/);
  assert.equal((vide.match(/data-act="exemple"/g) || []).length, 4);
  const plein = String(droits.render({ s: { langue: 'fr', droits: { question: 'x', reponse: conseiller.repondre('Mes données de santé peuvent-elles partir à l’étranger ?', 'fr') } }, t, params: [] }));
  assert.match(plein, /CMR-LOI-2024-017/);
  assert.match(plein, /<details class="decision"/);
});

test('TEST-016-03-02 : liens vers le conseiller dans les espaces professionnel et ministériel', () => {
  assert.match(lireTexte('../js/screens/pro/tableau.js'), /#\/droits/);
  assert.match(lireTexte('../js/screens/ministere/console.js'), /#\/droits/);
});

test('TEST-016-03-03 : catalogues droits.* aux mêmes clés', () => {
  const a = flatKeys(fr.droits, 'droits').sort(); const b = flatKeys(en.droits, 'droits').sort();
  assert.ok(a.length >= 8);
  assert.deepEqual(a, b);
});
