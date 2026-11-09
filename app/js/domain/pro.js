// Nolo — espace établissement (D-029) : inscription, NIU, fiche conditionnelle, import du stock.
// Prototype : comptes et fichiers restent dans ce navigateur ; code e-mail et liste d'agrément simulés.
import { DCI, NOMS_COMMERCIAUX, PRODUITS_ART75 } from './facilities.js';

export const TYPES = ['officine', 'hopital', 'centre_sante', 'centre_specialise', 'centre_transfusion'];
/** Domaines des centres spécialisés → spécialité recherchée par les citoyens. Les domaines sensibles sont cherchés sur le téléphone. */
export const DOMAINES = { dialyse: 'nephrologie', tuberculose: 'pneumologie', cancerologie: 'oncologie', sante_mentale: 'psychiatrie', vih: 'infectiologie', ophtalmologie: 'ophtalmologie', diabete: 'endocrinologie' };
export const JOURS = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
export const SECTEURS = ['public', 'prive_lucratif', 'prive_confessionnel', 'associatif'];
export const REGIONS = ['Adamaoua', 'Centre', 'Est', 'Extrême-Nord', 'Littoral', 'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'];
/** Districts de démonstration (liste officielle à verser, D-029 Q5). */
export const DISTRICTS_DEMO = ['District de démonstration Nord', 'District de démonstration Sud'];

/** Liste d'agrément SIMULÉE (lacune L9 : aucun registre public). */
export const AGREMENT_SIMULE = ['M041618186649L', 'P092714433801Q', 'H120458930017B', 'C330915562204D'];

const NIU_RE = /^[A-Z][0-9]{12}[A-Z]$/;
export const normaliserNiu = (s) => String(s || '').toUpperCase().replace(/\s+/g, '');
/** CA-ETS-01 : format `lettre + 12 chiffres + lettre`. Retourne null si correct, sinon un code. */
export function erreurNiu(s) {
  const v = normaliserNiu(s);
  if (!v) return 'vide';
  if (!/^[A-Z]/.test(v)) return 'premiere_lettre';
  if (!/[A-Z]$/.test(v)) return 'derniere_lettre';
  const milieu = v.slice(1, -1);
  if (/[^0-9]/.test(milieu)) return 'chiffres';
  if (milieu.length !== 12) return 'longueur';
  return NIU_RE.test(v) ? null : 'format';
}

export const erreurEmail = (s) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || '').trim()) ? null : 'email');
export const erreurTelephone = (s) => (/^(\+?237)?[26]\d{8}$/.test(String(s || '').replace(/[\s.-]/g, '')) ? null : 'telephone');
export function erreurMotDePasse(mdp, { niu = '', nom = '' } = {}) {
  if (!mdp || mdp.length < 10) return 'court';
  const m = mdp.toLowerCase();
  if (niu && m.includes(normaliserNiu(niu).toLowerCase())) return 'contient_niu';
  const mots = String(nom).toLowerCase().split(/\s+/).filter((x) => x.length >= 4);
  if (mots.some((x) => m.includes(x))) return 'contient_nom';
  return null;
}

/** Vérification de l'agrément : liste simulée, sinon file du vérificateur (FR-ETS-08). */
export const verifier = (niu) => (AGREMENT_SIMULE.includes(normaliserNiu(niu)) ? 'VERIFIE' : 'EN_ATTENTE_VERIFICATION');

export const codeConfirmation = () => String(Math.floor(100000 + Math.random() * 900000));

// ── Fiche détaillée : questions visibles selon le type et les réponses (FR-ETS-05) ──
/**
 * Chaque question : id, saisie ('on' oui/non, 'liste', 'multi', 'texte'), options, condition (réponses → bool).
 * Une question masquée n'est pas enregistrée.
 */
const COMMUNES = [
  { id: 'C1', saisie: 'on' },
  { id: 'C2', saisie: 'multi', options: ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim', 'feries'], si: (r) => r.C1 === false },
  { id: 'C4', saisie: 'liste', options: ['oui', 'partiel', 'non'] },
  { id: 'C5', saisie: 'multi', options: ['francais', 'anglais', 'autre'] },
  { id: 'C6', saisie: 'multi', options: ['especes', 'mobile_money', 'carte', 'assurance'] },
  { id: 'C7', saisie: 'on', si: (r) => (r.C6 || []).includes('assurance') },
];
/** Questions H communes aux hôpitaux et centres de santé (D-029 § 6.2) ; la banque de sang (H8) pour les hôpitaux seulement. */
const SOINS = (hopital) => [
  { id: 'H2', saisie: 'on' },
  { id: 'H2a', saisie: 'on', si: (r) => r.H2 === true },
  { id: 'H2b', saisie: 'on', si: (r) => r.H2 === true },
  { id: 'H2c', saisie: 'texte', optionnel: true, si: (r) => r.H2b === true },
  { id: 'H3', saisie: 'specialites' },
  { id: 'H3c', saisie: 'on', si: (r) => Object.keys(r.H3 || {}).length > 0 },
  { id: 'H4', saisie: 'on' },
  { id: 'H4a', saisie: 'on', si: (r) => r.H4 === true },
  { id: 'H4b', saisie: 'on', si: (r) => r.H4 === true },
  { id: 'H4c', saisie: 'on', si: (r) => r.H4 === true },
  { id: 'H5', saisie: 'on' },
  { id: 'H5a', saisie: 'liste', options: ['moins_10', '10_49', '50_99', '100_249', '250_plus'], si: (r) => r.H5 === true },
  { id: 'H6', saisie: 'on' },
  { id: 'H6a', saisie: 'on', si: (r) => r.H6 === true },
  { id: 'H7', saisie: 'multi', options: ['radiographie', 'echographie', 'scanner', 'irm', 'aucune'] },
  ...(hopital ? [
    { id: 'H8', saisie: 'on' },
    { id: 'H8a', saisie: 'multi', options: ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'], si: (r) => r.H8 === true },
    { id: 'H8b', saisie: 'on', si: (r) => r.H8 === true },
  ] : []),
  { id: 'H9', saisie: 'on' },
  { id: 'H9a', saisie: 'on', si: (r) => r.H9 === true },
  { id: 'H10', saisie: 'on' },
  { id: 'H10a', saisie: 'on', si: (r) => r.H10 === true },
  { id: 'H10b', saisie: 'on', si: (r) => r.H10a === true },
  { id: 'H11', saisie: 'texte' },
];
export const QUESTIONS = {
  officine: [
    ...COMMUNES,
    { id: 'O1', saisie: 'texte' },
    { id: 'O2', saisie: 'case' },
    { id: 'O4', saisie: 'on' },
    { id: 'O5', saisie: 'multi', options: ['nuits', 'weekends', 'feries'], si: (r) => r.O4 === true },
    { id: 'O6', saisie: 'on', si: (r) => r.C1 === false },
    { id: 'O7', saisie: 'on', si: (r) => r.C7 === true },
  ],
  hopital: [
    ...COMMUNES,
    { id: 'H1', saisie: 'liste', options: ['reference_nationale', 'hopital_regional', 'hopital_district', 'clinique'] },
    ...SOINS(true),
  ],
  centre_sante: [
    ...COMMUNES,
    { id: 'H1', saisie: 'liste', options: ['cma', 'csi', 'centre_prive'] },
    ...SOINS(false),
  ],
  centre_specialise: [
    ...COMMUNES,
    { id: 'S1', saisie: 'liste', options: Object.keys(DOMAINES) },
    { id: 'S2', saisie: 'multi', options: ['consultation', 'examens', 'traitement', 'hospitalisation', 'suivi'] },
    { id: 'S3', saisie: 'on' },
    { id: 'S4', saisie: 'on' },
    { id: 'S5', saisie: 'texte' },
  ],
  centre_transfusion: [
    ...COMMUNES,
    { id: 'B1', saisie: 'multi', options: ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'] },
    { id: 'B3', saisie: 'on' },
    { id: 'B4', saisie: 'on' },
    { id: 'B6', saisie: 'on', si: (r) => r.B4 === true },
    { id: 'B7', saisie: 'texte' },
  ],
};

export const questionsVisibles = (type, r) => (QUESTIONS[type] || []).filter((q) => !q.si || q.si(r));

/** Ne garde que les réponses aux questions visibles (une question masquée n'est pas enregistrée). */
export function nettoyer(type, r) {
  const ids = new Set(questionsVisibles(type, r).map((q) => q.id));
  return Object.fromEntries(Object.entries(r).filter(([k]) => ids.has(k)));
}

export function completude(type, r) {
  const qs = questionsVisibles(type, r).filter((q) => !q.optionnel);
  const faites = qs.filter((q) => {
    const v = r[q.id];
    if (q.saisie === 'multi') return Array.isArray(v) && v.length > 0;
    if (q.saisie === 'texte') return typeof v === 'string' && v.trim().length > 0;
    if (q.saisie === 'case') return v === true;
    if (q.saisie === 'specialites') return v && Object.keys(v).length > 0 && Object.values(v).every((x) => x.m === 'tous' || (x.j || []).length > 0);
    return v !== undefined && v !== null && v !== '';
  });
  return { faites: faites.length, total: qs.length, manquantes: qs.filter((q) => !faites.includes(q)).map((q) => q.id) };
}

/** Onglets « Stock » selon le type et les réponses (FR-ETS-11, CA-ETS-04). */
export function ongletsStock(type, r) {
  const o = [];
  if (type === 'officine' || ((type === 'hopital' || type === 'centre_sante') && r.H10a === true)) o.push('medicaments');
  if (type === 'centre_transfusion' || (type === 'hopital' && r.H8 === true)) o.push('sang');
  return o;
}

// ── Import du stock (FR-ETS-09, CA-ETS-07, CA-ETS-08) ──────────────────────
export const FORMES = ['comprime', 'gelule', 'sirop', 'suspension', 'injectable', 'pommade', 'suppositoire', 'autre'];
export const NIVEAUX_STOCK = ['disponible', 'faible', 'rupture'];
const sansAccent = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
const DCI_PAR_NOM = new Map(DCI.flatMap((d) => [[sansAccent(d.id.replace(/_/g, ' ')), d.id], [sansAccent(d.fr), d.id], [sansAccent(d.en), d.id]]));

export const MODELE_CSV = 'dci;dosage;forme;niveau\nParacétamol;500 mg;comprime;disponible\n';
export const EXEMPLE_CSV = [
  'dci;dosage;forme;niveau',
  'Paracétamol;500 mg;comprime;disponible',
  'Amoxicilline;500 mg;gelule;faible',
  'Artéméther + luméfantrine;20/120 mg;comprime;disponible',
  'Sels de réhydratation orale;;autre;disponible',
  'Salbutamol;100 µg;autre;rupture',
  'Zinc;20 mg;comprime;disponible',
  'Quininex;;comprime;disponible',
  'Doliprane;1 g;comprime;disponible',
  'Misoprostol;200 µg;comprime;disponible',
  'Ibuprofène;400 mg;comprime;beaucoup',
].join('\n');

/** Lit un CSV (séparateur ; ou ,). Un PDF ou une image est refusé avant lecture. */
export function lireFichier(nom, texte) {
  const ext = String(nom).toLowerCase().split('.').pop();
  if (['pdf', 'jpg', 'jpeg', 'png', 'heic', 'webp'].includes(ext)) return { ok: false, erreur: 'format_refuse' };
  if (ext === 'xlsx' || ext === 'xls') return { ok: false, erreur: 'xlsx_integration' };
  if (ext !== 'csv' && ext !== 'txt') return { ok: false, erreur: 'format_inconnu' };
  const lignes = String(texte).replace(/^﻿/, '').split(/\r?\n/).filter((l) => l.trim());
  if (!lignes.length) return { ok: false, erreur: 'vide' };
  if (lignes.length > 2001) return { ok: false, erreur: 'trop_de_lignes' };
  const sep = lignes[0].includes(';') ? ';' : ',';
  const tete = lignes[0].split(sep).map((x) => sansAccent(x));
  const idx = { dci: tete.indexOf('dci'), dosage: tete.indexOf('dosage'), forme: tete.indexOf('forme'), niveau: tete.indexOf('niveau') };
  if (idx.dci < 0 || idx.niveau < 0 || idx.forme < 0) return { ok: false, erreur: 'colonnes' };
  const rapport = { acceptees: [], rejetees: [] };
  lignes.slice(1).forEach((l, i) => {
    const c = l.split(sep).map((x) => x.trim());
    const ligne = { n: i + 2, dci: c[idx.dci] || '', dosage: idx.dosage >= 0 ? c[idx.dosage] || '' : '', forme: sansAccent(c[idx.forme] || ''), niveau: sansAccent(c[idx.niveau] || '') };
    const nom = sansAccent(ligne.dci);
    if (PRODUITS_ART75.includes(nom)) return rapport.rejetees.push({ ...ligne, motif: 'art75' });
    if (NOMS_COMMERCIAUX[nom]) return rapport.rejetees.push({ ...ligne, motif: 'nom_commercial', proposition: NOMS_COMMERCIAUX[nom] });
    const id = DCI_PAR_NOM.get(nom);
    if (!id) return rapport.rejetees.push({ ...ligne, motif: 'dci_inconnue' });
    if (!FORMES.includes(ligne.forme)) return rapport.rejetees.push({ ...ligne, motif: 'forme' });
    if (!NIVEAUX_STOCK.includes(ligne.niveau)) return rapport.rejetees.push({ ...ligne, motif: 'niveau' });
    rapport.acceptees.push({ ...ligne, id });
  });
  return { ok: true, rapport };
}

/** Heures restantes avant qu'une ligne disparaisse des recherches (48 h, alerte à 12 h). */
export function fraicheur(envoiIso, maintenant = Date.now()) {
  if (!envoiIso) return null;
  const restant = 48 - (maintenant - new Date(envoiIso).getTime()) / 3.6e6;
  return { heures: Math.max(0, restant), alerte: restant <= 12 && restant > 0, expire: restant <= 0 };
}
