// SF-015-04 — Politique versionnée dans la console (TEST-015-04-01, TEST-015-04-02).
import test from 'node:test';
import assert from 'node:assert/strict';
import { translator } from '../js/core/i18n.js';
import { creerPolitique } from '../js/domain/politique.js';
import { empreinte } from '../js/core/canonique.js';
import { politiqueBrute, lireTexte } from './outils.mjs';

globalThis.localStorage = { getItem: (k) => (k === 'nolo:ministere-session' ? 'true' : null), setItem() {}, removeItem() {} };
const { installer } = await import('../js/agents/nolo.js');
const { store } = await import('../js/etat.js');
const ministere = (await import('../js/screens/ministere/console.js')).default;
const politique = creerPolitique(politiqueBrute());
installer({ politique });
const vue = (lang) => String(ministere.render({ s: store.get(), t: translator(lang), params: ['politique'] }));
const deseche = (x) => x.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

test('TEST-015-04-01 : l’empreinte affichée est celle du JSON affiché', () => {
  const sortie = vue('fr');
  const json = JSON.parse(deseche(sortie.match(/<pre class="code mono" data-cle="politique-json">([\s\S]*?)<\/pre>/)[1]));
  const affichee = sortie.match(/class="mono empreinte" title="([^"]+)"/)[1];
  assert.equal(empreinte(json), affichee);
  assert.equal(affichee, politiqueBrute().empreinte_canonique);
});

test('TEST-015-04-02 : même version que config/policy.yaml ; aucune seconde politique codée en dur', () => {
  const version = lireTexte('../../config/policy.yaml').match(/^version: "([^"]+)"/m)[1];
  assert.ok(vue('fr').includes(translator('fr')('ministere.politique.version', { v: version })));
  assert.ok(!/S\.POLITIQUE/.test(lireTexte('../js/screens/ministere/console.js')));
});
