// Tests de l'espace ministère : seuil, détection, instrument RSI, simulation « et si ».
import test from 'node:test';
import assert from 'node:assert/strict';
import * as S from '../js/domain/surveillance.js';
import { REGIONS_SVG } from '../js/domain/carte-regions.js';

test('Seuil de publication : moins de 5 → rien ; sinon arrondi à 5', () => {
  assert.equal(S.publiable(4), null);
  assert.equal(S.publiable(23), 25);
});
test('CUSUM : les deux regroupements injectés sont détectés, et seulement eux', () => {
  const ids = S.signaux().map((x) => x.id).sort();
  assert.deepEqual(ids, ['S-AS-07-diarrhee', 'S-nord-eruption']);
});
test('Annexe 2 du RSI : deux « oui » sur quatre déclenchent la notification', () => {
  assert.equal(S.decisionRsi({ grave: true, inhabituel: false, propagation: false, restrictions: false }), false);
  assert.equal(S.decisionRsi({ grave: true, inhabituel: true }), true);
});
test('« Et si » : baisser le seuil publie des cases fines ; agréger au district retarde la détection', () => {
  const a = S.simuler(S.VARIANTE_EN_VIGUEUR);
  const b = S.simuler({ ...S.VARIANTE_EN_VIGUEUR, seuil: 3 });
  const c = S.simuler({ ...S.VARIANTE_EN_VIGUEUR, maille: 'district', seuil: 10 });
  assert.equal(a.fines, 0);
  assert.ok(b.fines > 0);
  assert.ok(c.detection.jours > a.detection.jours);
});
test('Carte : les 10 régions ont un tracé', () => {
  assert.equal(Object.keys(REGIONS_SVG).length, 10);
  for (const r of S.REGIONS) assert.ok(REGIONS_SVG[r.id]?.d.startsWith('M'), r.id);
});
