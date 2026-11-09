// Vague C — contrôles de qualité de l'application (SF-010-01, SF-013-02, SF-013-05, SF-013-06, SF-013-08,
// SF-013-11, SF-015-03, SF-015-06).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { lireTexte } from './outils.mjs';
import { ETABLISSEMENTS, SPECIALITES } from '../js/domain/facilities.js';
import { PATHOLOGIES, NIVEAUX } from '../js/domain/engine.js';
import { offreDemande } from '../js/domain/surveillance.js';
import { lireRoute, routeGardee } from '../js/core/routeur.js';
import fr from '../js/i18n/fr.js';
import en from '../js/i18n/en.js';

const CSS = ['base', 'components', 'screens', 'pro', 'ministere'].map((n) => [n, lireTexte(`../css/${n}.css`)]);

test('TEST-010-01-01 et TEST-010-01-04 : tuile fictive — au moins 20 établissements, niveaux et spécialités couverts, schéma', () => {
  assert.ok(ETABLISSEMENTS.length >= 20);
  const rangs = { centre_sante: (e) => ['centre_sante', 'hopital'].includes(e.type), hopital_district: (e) => e.type === 'hopital', hopital_urgences_24h: (e) => e.urgences && e.h24 };
  for (const n of NIVEAUX) assert.ok(ETABLISSEMENTS.some(rangs[n]), n);
  for (const sp of new Set(PATHOLOGIES.map((p) => p.specialite).filter(Boolean))) assert.ok(ETABLISSEMENTS.some((e) => e.specialites?.[sp]), sp);
  for (const e of ETABLISSEMENTS) {
    for (const k of ['id', 'nom', 'type', 'x', 'y', 'quartier']) assert.ok(e[k] !== undefined, `${e.id} : ${k}`);
    assert.ok(e.h24 || Array.isArray(e.horaires), `${e.id} : horaires`);
    assert.ok(typeof e.verifie === 'boolean', `${e.id} : verifie`);
    for (const sp of Object.keys(e.specialites || {})) assert.ok(SPECIALITES.includes(sp), `${e.id} : ${sp}`);
  }
});

test('TEST-013-02-01 et TEST-013-02-02 : routeur — route la plus longue ; garde du consentement', () => {
  const routes = [['', 'accueil'], ['pro', 'pro'], ['pro/tableau', 'tableau'], ['decrire', 'decrire'], ['bienvenue', 'bienvenue']];
  const r = lireRoute('#/pro/tableau/stock', routes);
  assert.deepEqual([r.cle, r.params], ['pro/tableau', ['stock']]);
  assert.equal(lireRoute('#/inconnue', routes).cle, '');
  assert.equal(routeGardee('decrire', null, new Set(['bienvenue'])), '#/bienvenue');
  assert.equal(routeGardee('bienvenue', null, new Set(['bienvenue'])), null);
});

test('TEST-013-05-01 et TEST-013-05-03 : couleurs en dur et réservation du rouge et de l’ambre (exceptions de DESIGN.md)', () => {
  const design = lireTexte('../docs/DESIGN.md');
  const exc = design.split('## Exceptions aux jetons')[1] || '';
  assert.ok(exc, 'section « Exceptions aux jetons » absente de DESIGN.md');
  const littéraux = new Set((exc.match(/`(#[0-9a-fA-F]{3,6}|rgba\()`/g) || []).map((x) => x.slice(1, -1).toLowerCase()));
  for (const [nom, css] of CSS) {
    for (const m of css.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g)) {
      const v = m[0].toLowerCase();
      assert.ok(littéraux.has(v) || littéraux.has(v.replace(/^rgb\(/, 'rgba(')), `${nom}.css : couleur en dur ${m[0]}`);
    }
  }
  const selecteurs = (jeton) => CSS.flatMap(([nom, css]) => css.split('}').filter((b) => b.includes(`var(--${jeton}`)).map((b) => b.split('{')[0].trim().split('\n').pop()));
  const permis = (exc.match(/^- Rouge hors urgence : (.*)$/m)?.[1] || '').split(' ; ').map((x) => x.replace(/`/g, '').trim()).filter(Boolean);
  for (const s of selecteurs('urgence')) assert.ok(/urgence|danger|alerte|appel|securite/.test(s) || permis.some((p) => s.includes(p)), `rouge hors urgence : ${s}`);
  for (const s of selecteurs('experimental')) assert.ok(/experimental|poc|piste|simulee|comparaison|pastille-compte/.test(s), `ambre hors POC ou fictif : ${s}`);
});

const lum = (hex) => {
  const c = hex.replace('#', '').match(/../g).map((x) => parseInt(x, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contraste = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

test('TEST-013-06-04 : contrastes des paires de jetons texte / fond ≥ 4,5:1', () => {
  const tok = Object.fromEntries([...lireTexte('../css/tokens.css').matchAll(/--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})\b/g)].map((m) => [m[1], m[2]]));
  tok.blanc = '#FFFFFF';
  const paires = [['encre', 'pierre'], ['encre', 'surface'], ['texte-2', 'surface'], ['texte-2', 'pierre'], ['texte-3', 'surface'], ['texte-3', 'pierre'], ['foret', 'surface'], ['foret', 'menthe'], ['urgence-texte', 'urgence-fond'], ['experimental', 'experimental-fond'], ['blanc', 'foret'], ['blanc', 'urgence'], ['blanc', 'foret-nuit'], ['sur-sombre-2', 'foret-nuit'], ['sur-sombre-2', 'foret-profond']];
  for (const [t, f] of paires) {
    assert.ok(tok[t] && tok[f], `${t} / ${f} : jeton absent`);
    assert.ok(contraste(tok[t], tok[f]) >= 4.5, `${t} sur ${f} : ${contraste(tok[t], tok[f]).toFixed(2)}`);
  }
});

test('TEST-013-08-01 (liste) : tout fichier servi de app/ figure dans FICHIERS du service worker', () => {
  const sw = lireTexte('../sw.js');
  const racine = new URL('../', import.meta.url);
  const tous = [];
  const parcourir = (rel) => { for (const n of readdirSync(new URL(rel, racine))) { const r = `${rel}${n}`; if (statSync(new URL(r, racine)).isDirectory()) parcourir(`${r}/`); else tous.push(`./${r}`); } };
  ['assets/', 'css/', 'data/', 'js/'].forEach(parcourir);
  for (const f of [...tous, './index.html', './manifest.webmanifest']) assert.ok(sw.includes(`"${f}"`), f);
  assert.match(sw, /const VERSION = 'nolo-[^']+'/);
});

test('TEST-013-11-02 : seules les clés autorisées sont écrites dans le stockage local', () => {
  const permises = new Set(['langue', 'consentement', 'signalements', 'pro-comptes', 'pro-session', 'pro-essais', 'ministere-session', 'ministere-decisions', 'ministere-dossiers']);
  const fichiers = [];
  const parcourir = (rel) => { for (const n of readdirSync(new URL(rel, import.meta.url))) { const r = `${rel}${n}`; if (statSync(new URL(r, import.meta.url)).isDirectory()) parcourir(`${r}/`); else if (r.endsWith('.js')) fichiers.push(r); } };
  parcourir('../js/');
  let vus = 0;
  for (const f of fichiers) {
    for (const m of lireTexte(f).matchAll(/local\.write\('([^']+)'/g)) { vus += 1; assert.ok(permises.has(m[1]), `${f} : clé ${m[1]}`); }
    assert.ok(!/localStorage\.setItem/.test(lireTexte(f)) || f.endsWith('core/store.js'), `${f} : écriture directe`);
  }
  assert.ok(vus >= 5);
});

test('TEST-015-03-01 : offre et demande — Littoral : artésunate, insatisfaction ≥ 11 %', () => {
  const l = offreDemande().find((r) => r.region === 'littoral');
  assert.equal(l.manque, 'artesunate');
  assert.ok(l.insat >= 0.11);
  for (const r of offreDemande()) for (const k of ['structures', 'verifiees', 'fraicheur', 'rupture', 'insat', 'manque']) assert.ok(r[k] !== undefined, `${r.region} : ${k}`);
});

test('TEST-015-06-02 : lacunes de la console = registre docs/compliance/registre-lacunes.md', () => {
  const registre = [...new Set([...lireTexte('../../docs/compliance/registre-lacunes.md').matchAll(/^\| (L\d+) \|/gm)].map((m) => m[1]))];
  for (const cat of [fr, en]) assert.deepEqual(cat.ministere.politique.lacunes.map((l) => l.id), registre);
});
