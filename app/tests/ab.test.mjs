// SF-007-20 — Rejouer sans gouvernance dans Nolo (TEST-007-20-01, TEST-007-20-02).
import test from 'node:test';
import assert from 'node:assert/strict';
import { creerPolitique } from '../js/domain/politique.js';
import { rejouer, abDisponible, TAXONOMIE } from '../js/agents/ab.js';
import { politiqueBrute, horlogeFixe } from './outils.mjs';

const politique = creerPolitique(politiqueBrute());

test('TEST-007-20-01 : au moins 5 violations nommées sans gouvernance, 0 avec ; journal toujours actif', () => {
  const sans = rejouer({ politique, gouvernance: false, horloge: horlogeFixe });
  const avec = rejouer({ politique, gouvernance: true, horloge: horlogeFixe });
  assert.ok(sans.violations.length >= 5, `${sans.violations.length} violations`);
  for (const v of sans.violations) assert.ok(TAXONOMIE.includes(v.type), v.type);
  assert.equal(avec.violations.length, 0, JSON.stringify(avec.violations));
  assert.ok(sans.journal.length > 0 && sans.chaineValide);
  assert.ok(avec.journal.length > 0 && avec.chaineValide);
  assert.deepEqual(sans.parcours, avec.parcours);
  assert.ok(sans.parcours.length >= 4);
});

test('TEST-007-20-02 : commutateur impossible hors du mode demo_synthetique', () => {
  assert.equal(abDisponible('demo_synthetique'), true);
  assert.equal(abDisponible('complet'), false);
  assert.equal(abDisponible('sans_donnees_personnelles'), false);
  assert.throws(() => rejouer({ politique, gouvernance: false, mode: 'complet' }), (e) => e.code === 'E-AB-HORS-DEMO');
});
