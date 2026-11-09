// Vague C — écrans citoyens, console et pages de conditions (rendu sous Node, sans navigateur).
import test from 'node:test';
import assert from 'node:assert/strict';
import { translator } from '../js/core/i18n.js';
import { creerPolitique, numerosUrgence } from '../js/domain/politique.js';
import { creerBase } from '../js/domain/base.js';
import * as E from '../js/domain/engine.js';
import * as S from '../js/domain/surveillance.js';
import * as P from '../js/domain/position.js';
import { barreSecurite } from '../js/ui/components.js';
import fr from '../js/i18n/fr.js';
import en from '../js/i18n/en.js';
import { politiqueBrute, baseBrute, lireJson, lireTexte, horlogeFixe } from './outils.mjs';

const ecrits = [];
globalThis.localStorage = { getItem: (k) => (k === 'nolo:ministere-session' ? 'true' : null), setItem: (k, v) => ecrits.push([k, v]), removeItem: (k) => ecrits.push([k, null]) };
const { installer } = await import('../js/agents/nolo.js');
const { deciderResultat } = await import('../js/agents/parcours.js');
const { store } = await import('../js/etat.js');
const ecran = async (chemin) => (await import(`../js/screens/${chemin}.js`)).default;
const politique = creerPolitique(politiqueBrute());
const nolo = installer({ politique, base: creerBase(baseBrute()), horloge: horlogeFixe });
nolo.regles = lireJson('../data/regles.json');
const t = translator('fr');
const adulte = E.profil('moi', { valeur: 30, unite: 'ans' });
const non = Object.fromEntries(E.questionsDanger(adulte).map((q) => [q.id, false]));
const cas = (texte, reponses = non) => {
  const signes = E.reformuler(texte);
  const r = deciderResultat(nolo.orchestrateur, E.analyser(signes, adulte, reponses), { profil: adulte });
  return { qui: 'moi', age: { valeur: 30, unite: 'ans' }, texte, signes, reponses, resultat: r.resultat, trace: r.trace, code: 'ACD-EFG', date: new Date().toISOString() };
};
const etat = (extra = {}) => ({ ...store.get(), langue: 'fr', consentement: { finalites: { orientation: true, surveillance: false, signalements: true } }, ...extra });
const rendre = async (chemin, s, params = []) => String((await ecran(chemin)).render({ s, t, params }));
const CAS = {
  urgence: () => cas('Je tousse et j’ai une douleur dans la poitrine', { ...non, 'Q-POITRINE': true }),
  pistes: () => cas('Je tousse depuis 3 jours, le corps chauffe, mal de gorge et le nez coule'),
  art48: () => cas('fièvre, boutons sur la peau, ganglions, mal de gorge, fatigue, diarrhée, courbatures'),
  nonResp: () => cas('mal de tête et fatigue'),
  faible: () => cas('je tousse et j’ai des boutons et la diarrhée'),
};

test('TEST-001-12-01 : seuls les numéros confirmés de la politique sont affichés (111 « à confirmer » exclu)', async () => {
  assert.deepEqual(numerosUrgence(politique), ['119', '112']);
  const barre = String(barreSecurite(t, numerosUrgence(politique)));
  assert.ok(barre.includes('tel:119') && barre.includes('tel:112') && !barre.includes('111'));
  const u = await rendre('patient/urgence', etat({ cas: CAS.urgence() }));
  assert.ok(u.includes('tel:119') && !u.includes('tel:111'));
  for (const cat of [fr, en]) assert.ok(!/\b(119|112)\b/.test(JSON.stringify(cat)), 'numéro écrit dans un catalogue');
});

test('TEST-005-03-01 : l’onglet Sang rappelle d’abord l’urgence', async () => {
  const s = await rendre('patient/chercher', etat({ recherche: { onglet: 'sang', groupe: '', signalements: [] } }), ['sang']);
  assert.ok(s.includes(t('recherche.sangUrgence', { n: '119' })));
});

test('TEST-006-01-01 : quatre choix de signalement sous un résultat de médicament', async () => {
  const s = await rendre('patient/chercher', etat({ recherche: { onglet: 'medicament', dci: 'paracetamol', saisie: 'Paracétamol', signalements: [] } }), ['medicament']);
  for (const v of ['trouve', 'introuvable_absent_du_stock', 'non_delivre_ordonnance_manquante', 'non_delivre_autre_raison']) assert.ok(s.includes(`data-v="${v}"`), v);
  assert.ok(s.includes(t('recherche.fiabiliteN', { score: '', n: '' }).split(' ')[0]));
});

test('TEST-008-07-02 et TEST-001-09-03 : une raison propre à chaque issue ; lien vers un soignant', async () => {
  const vus = new Set();
  for (const [chemin, c, issue] of [['patient/urgence', CAS.urgence(), 'urgence'], ['patient/pistes', CAS.pistes(), 'pistes'], ['patient/confidentiel', CAS.art48(), 'art48'], ['patient/hors-champ', CAS.nonResp(), 'hors_champ'], ['patient/hors-champ', CAS.faible(), 'hors_champ']]) {
    assert.equal(c.resultat.issue, issue, chemin);
    const s = await rendre(chemin, etat({ cas: c }));
    const raison = s.match(/<p class="raison-issue"[^>]*>([\s\S]*?)<\/p>/)?.[1];
    assert.ok(raison, chemin);
    vus.add(raison);
    assert.ok(s.includes('class="lien-soignant"'), `${chemin} : lien vers un soignant`);
  }
  assert.equal(vus.size, 5);
});

test('TEST-002-03-02 : la définition SC du signal est affichée dans la console', async () => {
  store.set({ ministere: { session: true, signal: 'S-AS-07-diarrhee', decisions: {}, brouillons: {}, dossiers: {}, variante: { ...S.VARIANTE_EN_VIGUEUR } } });
  const s = await rendre('ministere/console', store.get(), ['signaux']);
  const sc1 = nolo.regles.sbc_definitions.definitions_signaux.find((d) => d.code === 'SC1');
  assert.ok(s.includes('SC1') && s.includes(sc1.definition_officielle.slice(0, 60).replace(/'/g, '&#39;')));
});

test('TEST-002-05-02 : signal à trier depuis 20 h → échéance du triage dans 4 h', async () => {
  const delais = politique.valeur('surveillance.delais_heures');
  assert.deepEqual(S.echeance({ statut: 'a_trier', heures: 20 }, delais), { etape: 'triage', dans: 4, depassee: false });
  assert.deepEqual(S.echeance({ statut: 'a_trier', heures: 30 }, delais), { etape: 'triage', dans: -6, depassee: true });
  assert.deepEqual(S.echeance({ statut: 'confirme', heures: 30 }, delais), { etape: 'evaluation_risque', dans: 18, depassee: false });
  const s = await rendre('ministere/console', store.get(), ['signaux']);
  assert.ok(s.includes('class="echeance'));
});

test('TEST-004-02-03 et TEST-008-08-02 : conditions — formule de tri publiée ; mêmes rubriques en FR et EN', async () => {
  const ids = (c) => c.conditions.sections.map((x) => x.id);
  assert.deepEqual(ids(fr), ids(en));
  for (const r of ['responsable', 'finalites', 'donnees', 'decision', 'destinataires', 'transferts', 'durees', 'droits', 'securite', 'mineurs', 'contact', 'version', 'classement']) assert.ok(ids(fr).includes(r), r);
  const c = fr.conditions.sections.find((x) => x.id === 'classement').p;
  assert.ok(/ouvert/.test(c) && /distance/.test(c) && /1 km/.test(c));
});

test('TEST-010-13-01 : conditions des établissements liées depuis l’inscription, bilingues', async () => {
  assert.match(lireTexte('../js/screens/pro/inscription.js'), /#\/pro\/conditions/);
  const ids = (c) => c.pro.conditionsPage.sections.map((x) => x.id);
  assert.deepEqual(ids(fr), ids(en));
  for (const r of ['responsable', 'finalites', 'donnees', 'destinataires', 'durees', 'droits', 'securite']) assert.ok(ids(fr).includes(r), r);
  const s = await rendre('pro/conditions', etat());
  assert.equal((s.match(/<h1/g) || []).length, 1);
});

test('TEST-008-05-04 : retirer « signalements » efface les signalements de l’appareil', async () => {
  const md = await ecran('patient/mes-donnees');
  ecrits.length = 0;
  let suivant = null;
  const s = etat({ consentement: { version_conditions: '2026-11-07', majeur: true, finalites: { orientation: true, surveillance: false, signalements: true } }, mesChoix: { orientation: true, surveillance: false, signalements: false }, recherche: { signalements: [{ p: 'ph-gare' }, { p: 'ph-marche' }] } });
  md.actions.enregistrer({ s, t, set: (p) => { suivant = p; }, go: () => {}, annonce: () => {} });
  assert.ok(ecrits.some(([k, v]) => k === 'nolo:signalements' && v === null));
  assert.deepEqual(suivant.recherche.signalements, []);
});

test('TEST-008-03-01 à 03 : position consentie, arrondie, jamais stockée ; quartier ; cadre', async () => {
  assert.deepEqual(P.arrondir(4.05123, 9.76789), { lat: 4.05, lon: 9.77 });
  const refus = await P.demanderPosition({ encadre: false, geolocation: { getCurrentPosition: (ok, ko) => ko(new Error('refus')) } });
  assert.equal(refus.source, 'refus');
  const ok = await P.demanderPosition({ encadre: false, geolocation: { getCurrentPosition: (f) => f({ coords: { latitude: 4.05123, longitude: 9.76789 } }) } });
  assert.deepEqual([ok.source, ok.lat, ok.lon], ['gps', 4.05, 9.77]);
  const cadre = await P.demanderPosition({ encadre: true, geolocation: null });
  assert.equal(cadre.source, 'reference');
  const s = await rendre('patient/chercher', etat({ position: refus, recherche: { onglet: 'sang', groupe: 'O+', signalements: [] } }), ['sang']);
  assert.ok(s.includes('id="quartier"'));
  const c = await rendre('patient/chercher', etat({ position: cadre, recherche: { onglet: 'sang', groupe: 'O+', signalements: [] } }), ['sang']);
  assert.ok(c.includes(t('position.reference')));
  assert.ok(!/local\.write|localStorage/.test(lireTexte('../js/domain/position.js')));
});
