// SF-016-04 — Évaluation du conseiller (TEST-016-04-01, TEST-016-04-02).
import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluer, CIBLES } from '../../tools/evaluer_conseiller.mjs';

const r = evaluer();

test('TEST-016-04-01 : rapport avec les deux mesures sur Q23 à Q40', () => {
  assert.equal(r.total, 18);
  assert.equal(r.lignes.length, 18);
  assert.ok(Number.isInteger(r.document) && Number.isInteger(r.reference));
  assert.ok(r.reference <= r.document);
});

test('TEST-016-04-02 : cibles atteintes (document ≥ 11/18 ; anglais ≥ 3/5)', () => {
  assert.ok(r.document >= CIBLES.document, `document ${r.document}/18`);
  assert.ok(r.anglais >= CIBLES.anglais, `anglais ${r.anglais}/5`);
});
