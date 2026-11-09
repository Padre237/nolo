// Espace pro — comptes du prototype (dans ce navigateur), passage compte → fiche publique.
import { local } from '../../core/store.js';
import { definirSupplementaires, ETABLISSEMENTS, versKm } from '../../domain/facilities.js';
import { verifier, ongletsStock, DOMAINES, JOURS } from '../../domain/pro.js';
import { store } from '../../etat.js';

/** Mot de passe : PBKDF2-SHA-256 (WebCrypto) dans le prototype ; Argon2id côté serveur à l'intégration. */
export async function empreinte(mdp, sel) {
  const enc = new TextEncoder();
  if (!crypto?.subtle) { // contexte non sécurisé : empreinte de repli, prototype seulement
    let h = 2166136261; for (const c of `${sel}:${mdp}`) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    return `repli-${(h >>> 0).toString(16)}`;
  }
  const cle = await crypto.subtle.importKey('raw', enc.encode(mdp), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode(sel), iterations: 120000 }, cle, 256);
  return [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const comptes = () => store.get().pro.comptes;
export const compteCourant = () => { const p = store.get().pro; return p.session ? p.comptes[p.session] : null; };

export function enregistrerComptes(c, extra = {}) {
  local.write('pro-comptes', c);
  store.set({ pro: { ...store.get().pro, comptes: c, ...extra } });
}

export function mettreAJour(email, fn) {
  const c = { ...comptes() };
  c[email] = fn({ ...c[email] });
  enregistrerComptes(c);
  return c[email];
}

export const journal = (compte, type, details = {}) => ({ ...compte, historique: [{ type, date: new Date().toISOString(), ...details }, ...(compte.historique || [])].slice(0, 60) });

export function ouvrirSession(email) {
  local.write('pro-session', email);
  store.set({ pro: { ...store.get().pro, session: email } });
}
export function fermerSession() {
  local.remove('pro-session');
  store.set({ pro: { ...store.get().pro, session: null } });
}

/** Compte de démonstration : la Pharmacie du Carrefour Neuf, déjà vérifiée (liste d'agrément simulée). */
export function compteDemo() {
  const base = ETABLISSEMENTS.find((e) => e.id === 'ph-carrefour');
  const il = (h) => new Date(Date.now() - h * 3.6e6).toISOString();
  const lignes = Object.entries(base.stock).map(([id, [niveau]]) => ({ id, dosage: '', forme: 'comprime', niveau }));
  return {
    email: 'carrefour-neuf@demo.nolo', demo: true, lie: 'ph-carrefour', type: 'officine', nom: base.nom, niu: 'M041618186649L',
    telephone: '+237 6XX XX XX XX', secteur: 'prive_lucratif', region: 'Littoral', district: 'District de démonstration Nord', quartier: base.quartier,
    lat: 4.0511 + base.y / 110.57, lon: 9.7679 + base.x / 111.0, precision: 12,
    etatCompte: 'ACTIF', visibilite: 'VERIFIE',
    fiche: { C1: false, C2: ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'], C4: 'partiel', C5: ['francais', 'anglais'], C6: ['especes', 'mobile_money'], O1: 'AO-2019-0457 (fictif)', O2: true, O4: true, O5: ['nuits', 'weekends'], O6: false },
    ficheEnvoyee: il(240), photos: [],
    stock: { lignes, envoi: il(38) }, dernierImport: { acceptees: lignes.length, rejetees: 0, total: lignes.length },
    historique: [{ type: 'import', date: il(38), a: lignes.length, r: 0 }, { type: 'verification', date: il(239), etat: 'VERIFIE' }, { type: 'fiche', date: il(240) }, { type: 'confirmation', date: il(241) }, { type: 'creation', date: il(241) }],
  };
}

/** Fiche publique tirée d'un compte (ce que voient les citoyens). Les réponses de la fiche priment sur la tuile. */
export function versEtablissement(c) {
  const base = c.lie ? ETABLISSEMENTS.find((e) => e.id === c.lie) : null;
  const { x, y } = base ? { x: base.x, y: base.y } : versKm(c.lat, c.lon);
  const r = c.fiche || {};
  const heures = c.stock?.envoi ? Math.max(0, Math.round((Date.now() - new Date(c.stock.envoi).getTime()) / 3.6e6)) : 999;
  const stock = ongletsStock(c.type, r).includes('medicaments')
    ? Object.fromEntries((c.stock?.lignes || []).map((l) => [l.id, [l.niveau, heures]]))
    : undefined;
  const sang = c.stockSang?.niveaux ? Object.fromEntries(Object.entries(c.stockSang.niveaux).filter(([, v]) => v)) : base?.sang;
  const soins = c.type === 'hopital' || c.type === 'centre_sante';
  const specialites = soins && r.H3 ? Object.fromEntries(Object.entries(r.H3).map(([k, v]) => [k, v.m])) : c.type === 'centre_specialise' && r.S1 ? { [DOMAINES[r.S1]]: 'tous' } : base?.specialites;
  return {
    ...(base || {}), id: c.lie || `pro-${c.niu}`, nom: c.nom, type: c.type,
    categorie: c.type === 'centre_specialise' ? (r.S1 ? `specialise_${r.S1}` : base?.categorie) : r.H1 || base?.categorie, x, y,
    h24: r.C1 === true || (r.C1 === undefined && base?.h24), horaires: base?.horaires, quartier: c.quartier, fiabilite: base?.fiabilite ?? 75,
    urgences: soins ? r.H2 === true : base?.urgences, urgencesPed: soins ? r.H2a === true : base?.urgencesPed,
    specialites, imagerie: soins ? (r.H7 || []).filter((v) => v !== 'aucune') : base?.imagerie, laboratoire: soins ? r.H9 === true : base?.laboratoire,
    hospitalisation: soins ? r.H5 === true : base?.hospitalisation, pharmacie: soins ? r.H10a === true : base?.pharmacie,
    stock, sang, verifie: c.visibilite === 'VERIFIE', actif: c.etatCompte === 'ACTIF',
  };
}

/** Compte de démonstration : l'Hôpital de district Bois-Vert, vérifié, fiche complète. */
export function compteDemoHopital() {
  const base = ETABLISSEMENTS.find((e) => e.id === 'hd-boisvert');
  const il = (h) => new Date(Date.now() - h * 3.6e6).toISOString();
  const jours = { tous: [], certains: ['mar', 'jeu'], vacation: ['ven'] };
  const H3 = Object.fromEntries(Object.entries(base.specialites).map(([k, m]) => [k, { m, j: jours[m] }]));
  const lignes = [['paracetamol', 'disponible'], ['amoxicilline', 'disponible'], ['artesunate', 'disponible'], ['artemether_lumefantrine', 'faible'], ['sro', 'disponible'], ['salbutamol', 'disponible'], ['metronidazole', 'rupture']].map(([id, niveau]) => ({ id, dosage: '', forme: 'comprime', niveau }));
  return {
    email: 'boisvert@demo.nolo', demo: true, lie: 'hd-boisvert', type: 'hopital', nom: base.nom, niu: 'H120458930017B',
    telephone: '+237 6XX XX XX XX', secteur: 'public', region: 'Littoral', district: 'District de démonstration Nord', quartier: base.quartier,
    lat: 4.0511 + base.y / 110.57, lon: 9.7679 + base.x / 111.0, precision: 9, etatCompte: 'ACTIF', visibilite: 'VERIFIE',
    fiche: {
      C1: true, C4: 'oui', C5: ['francais', 'anglais'], C6: ['especes', 'mobile_money', 'assurance'], C7: true,
      H1: 'hopital_district', H2: true, H2a: true, H2b: true, H3, H3c: false, H4: true, H4a: true, H4b: true, H4c: true,
      H5: true, H5a: '100_249', H6: true, H6a: true, H7: ['radiographie', 'echographie'], H8: true, H8a: ['A+', 'B+', 'O+', 'O−', 'AB+'], H8b: true,
      H9: true, H9a: true, H10: true, H10a: true, H10b: true, H11: 'AE-2015-0213 (fictif)',
    },
    ficheEnvoyee: il(400), photos: [],
    stock: { lignes, envoi: il(5) }, stockSang: { niveaux: { ...base.sang }, envoi: il(5) },
    dernierImport: { acceptees: lignes.length, rejetees: 0, total: lignes.length },
    historique: [{ type: 'import', date: il(5), a: lignes.length, r: 0 }, { type: 'verification', date: il(399), etat: 'VERIFIE' }, { type: 'fiche', date: il(400) }, { type: 'confirmation', date: il(401) }, { type: 'creation', date: il(401) }],
  };
}

export { JOURS };
definirSupplementaires(() => Object.values(store.get().pro.comptes || {}).filter((c) => c.etatCompte !== 'EMAIL_NON_CONFIRME').map(versEtablissement));

export const etatVerification = (niu) => verifier(niu);
