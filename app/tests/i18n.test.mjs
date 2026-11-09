// CA-CONS-07, CA-ETS-13, CA-TEND-10 : catalogues FR et EN aux mêmes clés, sans valeur vide.
import test from 'node:test';
import assert from 'node:assert/strict';
import fr from '../js/i18n/fr.js';
import en from '../js/i18n/en.js';
import { flatKeys, typoFr } from '../js/core/i18n.js';

test('Mêmes clés en français et en anglais', () => {
  const a = flatKeys(fr).sort(); const b = flatKeys(en).sort();
  assert.deepEqual(a.filter((k) => !b.includes(k)), [], 'clés absentes en anglais');
  assert.deepEqual(b.filter((k) => !a.includes(k)), [], 'clés absentes en français');
});
test('Aucune valeur vide ; listes de même longueur', () => {
  const val = (o, k) => k.split('.').reduce((x, p) => x[p], o);
  for (const k of flatKeys(fr)) {
    const v1 = val(fr, k); const v2 = val(en, k);
    if (Array.isArray(v1)) assert.equal(v1.length, v2.length, k);
    else assert.ok(String(v1).trim() && String(v2).trim(), k);
  }
});
test('FR-DX-04 : le mot « probabilité » n’apparaît dans aucun catalogue', () => {
  assert.ok(!/probabilit/i.test(JSON.stringify(fr)));
  assert.ok(!/probabilit/i.test(JSON.stringify(en)));
});
test('Typographie française : espace fine avant ? et insécable dans « 18 ans »', () => {
  assert.equal(typoFr('Avez-vous 18 ans ?'), 'Avez-vous 18 ans ?');
});
