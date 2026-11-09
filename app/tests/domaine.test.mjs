// Tests du domaine (logique pure). Lancer : node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import * as C from '../js/domain/consent.js';
import * as E from '../js/domain/engine.js';
import * as F from '../js/domain/facilities.js';
import * as P from '../js/domain/pro.js';
import * as T from '../js/domain/trends.js';

test('CA-CONS-01 : aucune case → refus', () => {
  assert.equal(C.erreur(C.brouillonVide()), 'E-CONS-AUCUNE-CASE');
});
test('CA-CONS-02 : une case sans âge → refus', () => {
  const b = C.brouillonVide(); b.finalites.orientation = true;
  assert.equal(C.erreur(b), 'E-CONS-AGE');
  assert.equal(C.demandeAge(b), true);
});
test('CA-CONS-03 : mineur sans accord → refus ; avec accord → accepté', () => {
  const b = C.brouillonVide(); b.finalites.surveillance = true; b.age = 'mineur';
  assert.equal(C.erreur(b), 'E-CONS-PARENTAL');
  b.accordParental = true;
  const r = C.enregistrer(b);
  assert.equal(r.ok, true);
  assert.equal(r.enregistrement.accord_parental, true);
});
test('CA-CONS-04 : sans partage → trois finalités à faux', () => {
  const e = C.sansPartage();
  assert.deepEqual(e.finalites, { orientation: false, surveillance: false, signalements: false });
});
test('CA-CONS-05 : exactement cinq champs', () => {
  const b = C.brouillonVide(); b.finalites.orientation = true; b.age = 'majeur';
  assert.deepEqual(Object.keys(C.enregistrer(b).enregistrement).sort(), ['accord_parental', 'date', 'finalites', 'majeur', 'version_conditions']);
});
test('CA-CONS-06 : absent, illisible ou autre version → redemander', () => {
  assert.equal(C.valide(null), false);
  assert.equal(C.valide({ version_conditions: '2020-01-01', finalites: {} }), false);
  assert.equal(C.valide(C.sansPartage()), true);
});

const adulte = E.profil('moi', { valeur: 34, unite: 'ans' });
const bebe = E.profil('enfant', { valeur: 8, unite: 'mois' });
const nonDanger = (prof) => Object.fromEntries(E.questionsDanger(prof).map((q) => [q.id, false]));

test('Reformulation : expression camerounaise « le corps chauffe » → fièvre ; négation reconnue', () => {
  const r = E.reformuler('Le corps chauffe depuis 3 jours, je tousse, pas de diarrhée');
  assert.ok(r.presents.includes('SYM-001'));
  assert.ok(r.presents.includes('SYM-002'));
  assert.ok(r.absents.includes('SYM-018'));
  assert.equal(r.jours, 3);
});
test('Reformulation en anglais', () => {
  const r = E.reformuler('I have a sore throat and a runny nose since yesterday');
  assert.ok(r.presents.includes('SYM-006'));
  assert.ok(r.presents.includes('SYM-007'));
  assert.ok(!r.presents.includes('SYM-008')); // « ear » ne doit pas être trouvé dans « year »
});
test('FR-DX-03 : signe de danger → urgence, aucune piste', () => {
  const r = E.reformuler('Mon bébé respire vite et sa poitrine se creuse sous les côtes');
  const a = E.analyser(r, bebe, {});
  assert.equal(a.issue, 'urgence');
  assert.equal(a.pistes.length, 0);
  assert.ok(!r.presents.includes('SYM-012'), '« la poitrine se creuse » n’est pas une douleur thoracique');
});
test('FR-DX-03 : réponse « oui » à une question de sécurité → urgence', () => {
  const r = E.reformuler('Il tousse et a de la fièvre');
  const rep = nonDanger(bebe); rep['Q-CONV'] = true;
  assert.equal(E.analyser(r, bebe, rep).issue, 'urgence');
});
test('FR-DX-05 : diarrhée seule ou fièvre + frissons → hors champ', () => {
  assert.equal(E.analyser(E.reformuler('Diarrhée depuis hier'), adulte, nonDanger(adulte)).issue, 'hors_champ');
  assert.equal(E.analyser(E.reformuler('Fièvre et frissons depuis deux jours'), adulte, nonDanger(adulte)).issue, 'hors_champ');
});
test('FR-DX-06 : piste art. 48 → message neutre, jamais de nom', () => {
  const r = E.reformuler('Fièvre, boutons sur la peau, ganglions gonflés, mal de gorge et grande fatigue depuis une semaine');
  const a = E.analyser(r, adulte, nonDanger(adulte));
  assert.equal(a.issue, 'art48');
  assert.equal(a.pistes.length, 0);
});
test('FR-DX-04 : au plus 3 pistes, triées par score', () => {
  const r = E.reformuler('Je tousse, le corps chauffe, je respire vite et j’ai mal à la poitrine, des frissons');
  const a = E.analyser(r, adulte, nonDanger(adulte));
  assert.equal(a.issue, 'pistes');
  assert.ok(a.pistes.length <= 3);
  assert.equal(a.pistes[0].id, 'pneumonie');
  for (let i = 1; i < a.pistes.length; i++) assert.ok(a.pistes[i - 1].score >= a.pistes[i].score);
});
test('FR-DX-17 : le besoin le plus élevé l’emporte ; enfant → pédiatrie', () => {
  const r = E.reformuler('Il tousse, a de la fièvre et respire vite avec un sifflement');
  const enfant = E.profil('enfant', { valeur: 1, unite: 'ans' });
  const a = E.analyser(r, enfant, nonDanger(enfant));
  assert.equal(a.issue, 'pistes');
  assert.equal(a.besoins.niveau, 'hopital_district');
  assert.ok(a.besoins.specialites.includes('pediatrie'));
});
test('FR-DX-19 : structure couvrante, ouverte avant fermée ; repli avec manque', () => {
  const nuit = new Date('2026-11-09T02:00:00');
  const r = F.recommander({ niveau: 'hopital_district', specialites: ['pneumologie'], services: ['radiographie'] }, { quand: nuit });
  assert.equal(r.structure.id, 'hd-boisvert');
  const r2 = F.recommander({ niveau: 'centre_sante', specialites: ['medecine_generale'], services: [] }, { quand: nuit });
  assert.ok(F.ouvert(r2.structure, nuit), 'la nuit, une structure ouverte passe devant');
  const r3 = F.recommander({ niveau: 'hopital_district', specialites: ['nephrologie', 'pediatrie'], services: ['radiographie'] }, { quand: nuit });
  assert.ok(r3.structure);
});
test('FR-ETS-07 : un établissement non vérifié n’apparaît jamais', () => {
  assert.ok(!F.visibles().some((e) => e.id === 'ph-colline'));
  const m = F.chercherMedicament('salbutamol');
  assert.ok(!m.resultats.some((x) => x.e.id === 'ph-colline'));
});
test('Recherche de médicament : rupture et lignes de plus de 48 h exclues', () => {
  const m = F.chercherMedicament('paracetamol');
  assert.ok(!m.resultats.some((x) => x.e.id === 'ph-palmiers'), 'déclaration de 52 h');
  assert.ok(!F.chercherMedicament('artesunate').resultats.some((x) => x.e.id === 'ph-gare'), 'rupture');
});

test('CA-ETS-01 : format du NIU', () => {
  assert.equal(P.erreurNiu('M041618186649L'), null);
  assert.equal(P.erreurNiu('m0416 1818 6649l'), null);
  for (const bad of ['M04161818664L', '041618186649L', 'M041618186649', 'M0416181866A9L']) assert.notEqual(P.erreurNiu(bad), null, bad);
});
test('CA-ETS-04 : officine sans questions H ni B ; hôpital H8 = non sans H8a ni onglet sang', () => {
  assert.ok(!P.questionsVisibles('officine', {}).some((q) => /^[HB]/.test(q.id)));
  const h = P.questionsVisibles('hopital', { H8: false }).map((q) => q.id);
  assert.ok(!h.includes('H8a'));
  assert.ok(!P.ongletsStock('hopital', { H8: false, H10a: true }).includes('sang'));
});
test('FR-ETS-05 : une réponse à une question masquée n’est pas enregistrée', () => {
  assert.deepEqual(P.nettoyer('officine', { C1: true, C2: ['lun'] }), { C1: true });
});
test('CA-ETS-07 et 08 : rapport d’import, quatre motifs distincts ; PDF refusé', () => {
  const r = P.lireFichier('stock.csv', P.EXEMPLE_CSV);
  assert.equal(r.ok, true);
  const motifs = r.rapport.rejetees.map((x) => x.motif).sort();
  assert.deepEqual(motifs, ['art75', 'dci_inconnue', 'niveau', 'nom_commercial']);
  assert.equal(r.rapport.acceptees.length, 6);
  assert.equal(P.lireFichier('liste.pdf', '').erreur, 'format_refuse');
});
test('FR-ETS-10 : expiration à 48 h, alerte 12 h avant', () => {
  const t0 = Date.parse('2026-11-09T00:00:00Z');
  assert.equal(P.fraicheur(new Date(t0).toISOString(), t0 + 37 * 3.6e6).alerte, true);
  assert.equal(P.fraicheur(new Date(t0).toISOString(), t0 + 48.02 * 3.6e6).expire, true);
});
test('CA-TEND-05 : 3 → « moins de 5 » ; 23 → 25', () => {
  assert.equal(T.afficher(3), null);
  assert.equal(T.afficher(23), 25);
});
test('CA-TEND-07 : rupture d’artésunate visible dans la demande non satisfaite à Douala V', () => {
  const r = T.tendances({ niveau: 'arrondissement', zone: 'Douala V', type: 'medicament', semaines: 4 });
  assert.equal(r.insatisfaits[0].service, 'artesunate');
  assert.ok(r.insatisfaits[0].part > 0.5);
  assert.ok(r.classement.every((x) => x.affiche % 5 === 0));
});
