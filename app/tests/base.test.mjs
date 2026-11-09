// SF-011-08 — Base de connaissances embarquée (TEST-011-08-01 à TEST-011-08-04).
import test from 'node:test';
import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import { creerBase } from '../js/domain/base.js';
import { TABLE } from '../js/agents/conformite.js';
import { baseBrute, politiqueBrute, lireTexte } from './outils.mjs';

const base = creerBase(baseBrute());
const MOTIF = /(?:CMR|INT)-[A-Z0-9-]+::\d{4}/g;

test('TEST-011-08-01 : fragments cités par la politique et la Conformité présents ; aucun texte réservé', () => {
  const cites = new Set(JSON.stringify(politiqueBrute().donnees).match(MOTIF));
  for (const r of Object.values(TABLE)) r.fragments.forEach((f) => cites.add(f));
  assert.ok(cites.size >= 15);
  for (const id of cites) assert.ok(base.existe(id), `absent de la base : ${id}`);
  assert.equal(base.ids().filter((id) => id.startsWith('INT-OMS-AFRO-SBC-2014')).length, 0);
});

test('TEST-011-08-02 : lecture bilingue ; identifiant inconnu', () => {
  const en = base.fragment('CMR-LOI-2019-019::0005', 'en');
  assert.equal(en.idAffiche, 'CMR-LOI-2019-019-EN::0005');
  assert.equal(en.traduction, 'officielle');
  const nonOff = base.fragment('CMR-LOI-2024-017::0011', 'en');
  assert.equal(nonOff.traduction, 'non_officielle');
  assert.match(nonOff.mention, /Unofficial translation/);
  const fr = base.fragment('CMR-LOI-2024-017::0011', 'fr');
  assert.equal(fr.traduction, null);
  assert.equal(fr.statut, 'ocr');
  assert.match(fr.article, /9/);
  assert.throws(() => base.fragment('CMR-INVENTE::0001', 'fr'), (e) => e.code === 'E-BASE-FRAGMENT-INCONNU');
});

test('TEST-011-08-03 : la base est mise en cache par le service worker (hors ligne)', () => {
  const sw = lireTexte('../sw.js');
  for (const f of ['./data/base.json', './data/politique.json', './data/glossaire.json', './js/domain/base.js']) assert.ok(sw.includes(`"${f}"`), f);
});

test('TEST-011-08-04 : taille de la base embarquée ≤ 3 Mio', () => {
  assert.ok(statSync(new URL('../data/base.json', import.meta.url)).size <= 3 * 1024 * 1024);
});
