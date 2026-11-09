// Nolo — tuile du district de DÉMONSTRATION (FR-DX-23) et choix de la structure sur l'appareil (FR-DX-18 à 21).
// Tous les établissements, positions, horaires, stocks et numéros sont FICTIFS.

export const SPECIALITES = [
  'medecine_generale', 'pediatrie', 'gynecologie_obstetrique', 'cardiologie', 'pneumologie', 'neurologie',
  'orl', 'ophtalmologie', 'dermatologie', 'chirurgie', 'orthopedie', 'urologie', 'gastro_enterologie',
  'nephrologie', 'endocrinologie', 'dentisterie', 'psychiatrie', 'oncologie', 'infectiologie',
];
/** Recherches faites seulement sur le téléphone et jamais comptées (FR-305, D-032). */
export const SPECIALITES_SENSIBLES = ['gynecologie_obstetrique', 'psychiatrie', 'oncologie', 'infectiologie'];
export const GROUPES = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];

export const DCI = [
  { id: 'paracetamol', fr: 'Paracétamol', en: 'Paracetamol' },
  { id: 'ibuprofene', fr: 'Ibuprofène', en: 'Ibuprofen' },
  { id: 'amoxicilline', fr: 'Amoxicilline', en: 'Amoxicillin', ordonnance: true },
  { id: 'amoxicilline_clav', fr: 'Amoxicilline + acide clavulanique', en: 'Amoxicillin + clavulanic acid', ordonnance: true },
  { id: 'artemether_lumefantrine', fr: 'Artéméther + luméfantrine', en: 'Artemether + lumefantrine' },
  { id: 'artesunate', fr: 'Artésunate', en: 'Artesunate', ordonnance: true },
  { id: 'sro', fr: 'Sels de réhydratation orale', en: 'Oral rehydration salts' },
  { id: 'zinc', fr: 'Zinc', en: 'Zinc' },
  { id: 'cotrimoxazole', fr: 'Cotrimoxazole', en: 'Co-trimoxazole', ordonnance: true },
  { id: 'metronidazole', fr: 'Métronidazole', en: 'Metronidazole', ordonnance: true },
  { id: 'salbutamol', fr: 'Salbutamol', en: 'Salbutamol', ordonnance: true },
  { id: 'fer_acide_folique', fr: 'Fer + acide folique', en: 'Iron + folic acid' },
  { id: 'metformine', fr: 'Metformine', en: 'Metformin', ordonnance: true },
  { id: 'amlodipine', fr: 'Amlodipine', en: 'Amlodipine', ordonnance: true },
  { id: 'levonorgestrel', fr: 'Lévonorgestrel', en: 'Levonorgestrel', sensible: true },
  { id: 'tld', fr: 'Ténofovir + lamivudine + dolutégravir', en: 'Tenofovir + lamivudine + dolutegravir', sensible: true, ordonnance: true },
];
/** Noms commerciaux refusés à l'import : la DCI est proposée, jamais appliquée d'office. */
export const NOMS_COMMERCIAUX = { doliprane: 'paracetamol', efferalgan: 'paracetamol', coartem: 'artemether_lumefantrine', clamoxyl: 'amoxicilline', augmentin: 'amoxicilline_clav', flagyl: 'metronidazole', ventoline: 'salbutamol', bactrim: 'cotrimoxazole' };
/** Produits rejetés à l'import (loi 90/035, art. 75, selon D-029). */
export const PRODUITS_ART75 = ['misoprostol'];

const H = (o, f) => ({ o, f }); // ouverture, fermeture (heures décimales)
const SEMAINE = (o, f) => [null, H(o, f), H(o, f), H(o, f), H(o, f), H(o, f), null]; // dim … sam
const SEMAINE_SAM = (o, f, so, sf) => [null, H(o, f), H(o, f), H(o, f), H(o, f), H(o, f), H(so, sf)];

/** Établissements fictifs. x, y : décalage en km depuis la position de démonstration. */
export const ETABLISSEMENTS = [
  { id: 'hd-boisvert', nom: 'Hôpital de district Bois-Vert', type: 'hopital', categorie: 'hopital_district', x: 3.1, y: 1.2, h24: true, urgences: true, urgencesPed: true, ambulance: true,
    specialites: { medecine_generale: 'tous', pediatrie: 'tous', pneumologie: 'certains', chirurgie: 'tous', gynecologie_obstetrique: 'tous', cardiologie: 'vacation' }, imagerie: ['radiographie', 'echographie'], laboratoire: true, hospitalisation: true, pharmacie: true,
    sang: { 'A+': 'disponible', 'B+': 'faible', 'O+': 'disponible', 'O−': 'rupture', 'AB+': 'disponible' }, quartier: 'Route du lycée, face à la station', verifie: true },
  { id: 'hr-plateau', nom: 'Hôpital régional du Plateau', type: 'hopital', categorie: 'hopital_regional', x: 8.4, y: -5.2, h24: true, urgences: true, urgencesPed: true, ambulance: true,
    specialites: { medecine_generale: 'tous', pediatrie: 'tous', pneumologie: 'tous', cardiologie: 'tous', neurologie: 'certains', orl: 'tous', ophtalmologie: 'tous', dermatologie: 'certains', chirurgie: 'tous', orthopedie: 'tous', urologie: 'certains', gastro_enterologie: 'certains', nephrologie: 'certains', endocrinologie: 'certains', psychiatrie: 'certains', oncologie: 'vacation', gynecologie_obstetrique: 'tous' },
    imagerie: ['radiographie', 'echographie', 'scanner'], laboratoire: true, hospitalisation: true, pharmacie: true,
    sang: { 'A+': 'disponible', 'A−': 'faible', 'B+': 'disponible', 'B−': 'rupture', 'AB+': 'disponible', 'AB−': 'faible', 'O+': 'disponible', 'O−': 'faible' }, quartier: 'Avenue du Plateau', verifie: true },
  { id: 'cma-colline', nom: 'Centre médical d’arrondissement La Colline', court: 'CMA La Colline', type: 'centre_sante', categorie: 'cma', x: 1.4, y: -0.9, horaires: SEMAINE_SAM(7, 19, 8, 14), urgences: false,
    specialites: { medecine_generale: 'tous', pediatrie: 'certains', gynecologie_obstetrique: 'tous' }, imagerie: ['echographie'], laboratoire: true, hospitalisation: true, pharmacie: true, quartier: 'Derrière l’école publique', verifie: true },
  { id: 'csi-manguiers', nom: 'Centre de santé intégré Les Manguiers', court: 'CSI Les Manguiers', type: 'centre_sante', categorie: 'csi', x: 0.6, y: 0.8, horaires: SEMAINE_SAM(7.5, 17.5, 8, 13), urgences: false,
    specialites: { medecine_generale: 'tous' }, imagerie: [], laboratoire: false, hospitalisation: false, pharmacie: false, quartier: 'Carrefour des Manguiers', verifie: true },
  { id: 'csi-source', nom: 'Centre de santé intégré La Source', court: 'CSI La Source', type: 'centre_sante', categorie: 'csi', x: -2.2, y: 1.9, h24: true, urgences: false,
    specialites: { medecine_generale: 'tous', gynecologie_obstetrique: 'tous' }, imagerie: [], laboratoire: true, hospitalisation: false, pharmacie: true, quartier: 'Près du forage', verifie: true },
  { id: 'clinique-etoile', nom: 'Clinique Étoile du Matin', type: 'hopital', categorie: 'clinique', x: -1.8, y: -3.4, h24: true, urgences: true, urgencesPed: false,
    specialites: { medecine_generale: 'tous', orl: 'tous', cardiologie: 'certains', gynecologie_obstetrique: 'tous', pediatrie: 'certains' }, imagerie: ['radiographie', 'echographie'], laboratoire: true, hospitalisation: true, pharmacie: true, quartier: 'Rue des Écoles', verifie: true },
  { id: 'csp-espoir', nom: 'Centre de santé privé L’Espoir', court: 'Centre L’Espoir', type: 'centre_sante', categorie: 'centre_prive', x: 4.6, y: 3.0, horaires: SEMAINE_SAM(8, 18, 8, 12), urgences: false,
    specialites: { medecine_generale: 'tous', ophtalmologie: 'certains', dentisterie: 'tous' }, imagerie: [], laboratoire: true, hospitalisation: false, pharmacie: false, quartier: 'Montée de la mission', verifie: true },
  { id: 'clinique-baobab', nom: 'Clinique du Baobab', type: 'hopital', categorie: 'clinique', x: -5.1, y: 2.9, horaires: SEMAINE_SAM(7, 20, 8, 16), urgences: false,
    specialites: { medecine_generale: 'tous', dermatologie: 'tous', neurologie: 'vacation', ophtalmologie: 'tous', endocrinologie: 'certains' }, imagerie: ['echographie'], laboratoire: true, hospitalisation: false, pharmacie: false, quartier: 'Quartier administratif', verifie: true },
  { id: 'cma-rive', nom: 'Centre médical d’arrondissement Rive-Droite', court: 'CMA Rive-Droite', type: 'centre_sante', categorie: 'cma', x: 10.2, y: 7.9, h24: true, urgences: true, urgencesPed: true,
    specialites: { medecine_generale: 'tous', pediatrie: 'tous' }, imagerie: ['radiographie'], laboratoire: true, hospitalisation: true, pharmacie: true, quartier: 'Embarcadère', verifie: true },
  { id: 'csi-hauts', nom: 'Centre de santé intégré des Hauts', court: 'CSI des Hauts', type: 'centre_sante', categorie: 'csi', x: -6.1, y: -3.8, horaires: SEMAINE(7.5, 17), urgences: false,
    specialites: { medecine_generale: 'tous' }, imagerie: [], laboratoire: false, hospitalisation: false, pharmacie: true, quartier: 'Chefferie', verifie: true },
  { id: 'hd-sud', nom: 'Hôpital de district Rive-Sud', type: 'hopital', categorie: 'hopital_district', x: -4.0, y: -17.6, h24: true, urgences: true, urgencesPed: false,
    specialites: { medecine_generale: 'tous', pediatrie: 'certains', chirurgie: 'tous', pneumologie: 'vacation' }, imagerie: ['radiographie'], laboratoire: true, hospitalisation: true, pharmacie: true, quartier: 'Route nationale', verifie: true },
  { id: 'csi-pont', nom: 'Centre de santé intégré du Pont', court: 'CSI du Pont', type: 'centre_sante', categorie: 'csi', x: 9.3, y: -6.7, horaires: SEMAINE(8, 16), urgences: false, specialites: { medecine_generale: 'tous' }, imagerie: [], laboratoire: false, hospitalisation: false, pharmacie: false, quartier: 'Près du pont', verifie: true },
  { id: 'csi-lac', nom: 'Centre de santé intégré du Lac', court: 'CSI du Lac', type: 'centre_sante', categorie: 'csi', x: 12.5, y: -8.2, horaires: SEMAINE(8, 16), urgences: false, specialites: { medecine_generale: 'tous' }, imagerie: [], laboratoire: false, hospitalisation: false, pharmacie: false, quartier: 'Bord du lac', verifie: false },
  { id: 'ph-carrefour', nom: 'Pharmacie du Carrefour Neuf', type: 'officine', x: 0.7, y: -0.5, horaires: [H(9, 13), H(8, 21), H(8, 21), H(8, 21), H(8, 21), H(8, 21), H(8, 21)], garde: false, fiabilite: 92, quartier: 'Carrefour Neuf', verifie: true,
    stock: { paracetamol: ['disponible', 3], ibuprofene: ['disponible', 3], amoxicilline: ['faible', 3], artemether_lumefantrine: ['disponible', 3], sro: ['disponible', 3], zinc: ['faible', 3], salbutamol: ['rupture', 3], levonorgestrel: ['disponible', 3], cotrimoxazole: ['disponible', 3] } },
  { id: 'ph-gare', nom: 'Pharmacie de la Gare', type: 'officine', x: 2.1, y: 1.3, h24: true, garde: true, fiabilite: 81, quartier: 'Gare routière', verifie: true,
    stock: { paracetamol: ['disponible', 7], amoxicilline: ['disponible', 7], amoxicilline_clav: ['disponible', 7], artemether_lumefantrine: ['faible', 7], artesunate: ['rupture', 7], sro: ['disponible', 7], salbutamol: ['disponible', 7], metronidazole: ['disponible', 7], tld: ['disponible', 7] } },
  { id: 'ph-marche', nom: 'Pharmacie du Marché', type: 'officine', x: -1.2, y: 1.0, horaires: [null, H(8, 20), H(8, 20), H(8, 20), H(8, 20), H(8, 20), H(8, 18)], garde: false, fiabilite: 64, quartier: 'Entrée du marché', verifie: true,
    stock: { paracetamol: ['disponible', 30], ibuprofene: ['faible', 30], amoxicilline: ['disponible', 30], fer_acide_folique: ['disponible', 30], metformine: ['disponible', 30], amlodipine: ['faible', 30] } },
  { id: 'ph-palmiers', nom: 'Pharmacie Les Palmiers', type: 'officine', x: 3.5, y: -2.4, horaires: [null, H(8, 20), H(8, 20), H(8, 20), H(8, 20), H(8, 20), H(8, 20)], garde: false, fiabilite: 88, quartier: 'Rond-point des Palmiers', verifie: true,
    stock: { paracetamol: ['disponible', 52], artesunate: ['disponible', 52], artemether_lumefantrine: ['disponible', 52], salbutamol: ['faible', 52] } },
  { id: 'ph-colline', nom: 'Pharmacie de la Colline', type: 'officine', x: 6.0, y: 3.2, horaires: SEMAINE(8, 20), garde: false, fiabilite: 70, quartier: 'Haut de la colline', verifie: false,
    stock: { paracetamol: ['disponible', 2], salbutamol: ['disponible', 2] } },
  { id: 'cts-rive', nom: 'Centre de transfusion Rive-Gauche', type: 'centre_transfusion', x: -6.6, y: 3.6, h24: true, quartier: 'Boulevard de la Rive', verifie: true, collecte: true,
    sang: { 'A+': 'disponible', 'A−': 'faible', 'B+': 'disponible', 'B−': 'faible', 'AB+': 'disponible', 'AB−': 'rupture', 'O+': 'faible', 'O−': 'rupture' } },
  // Centres spécialisés (fictifs)
  { id: 'cs-dialyse', nom: 'Centre d’hémodialyse Les Rôniers', type: 'centre_specialise', categorie: 'specialise_dialyse', x: 5.2, y: -1.1, horaires: [null, H(6, 20), H(6, 20), H(6, 20), H(6, 20), H(6, 20), H(6, 14)], specialites: { nephrologie: 'tous' }, rdv: true, quartier: 'Derrière la poste centrale', verifie: true },
  { id: 'cs-cdt', nom: 'Centre de diagnostic et de traitement de la tuberculose du Plateau', court: 'CDT du Plateau', type: 'centre_specialise', categorie: 'specialise_tuberculose', x: 7.9, y: -4.6, horaires: SEMAINE(7.5, 15.5), specialites: { pneumologie: 'tous' }, laboratoire: true, quartier: 'Enceinte de l’hôpital régional', verifie: true },
  { id: 'cs-horizon', nom: 'Centre de santé mentale Horizon', type: 'centre_specialise', categorie: 'specialise_sante_mentale', x: -3.9, y: -2.2, horaires: SEMAINE(8, 17), specialites: { psychiatrie: 'tous' }, rdv: true, quartier: 'Allée des Flamboyants', verifie: true },
  { id: 'cs-vision', nom: 'Centre ophtalmologique Bon Regard', type: 'centre_specialise', categorie: 'specialise_ophtalmologie', x: 1.9, y: 3.6, horaires: SEMAINE_SAM(8, 17, 8, 13), specialites: { ophtalmologie: 'tous' }, rdv: true, quartier: 'Face à la boulangerie du rond-point', verifie: true },
  { id: 'csi-fleuve', nom: 'Centre de santé intégré du Fleuve', court: 'CSI du Fleuve', type: 'centre_sante', categorie: 'csi', x: -9.4, y: 6.1, horaires: SEMAINE_SAM(7.5, 17.5, 8, 12), urgences: false, specialites: { medecine_generale: 'tous', pediatrie: 'certains' }, imagerie: [], laboratoire: true, hospitalisation: false, pharmacie: true, quartier: 'Quai du fleuve', verifie: true },
];

export const distance = (e) => Math.round(Math.hypot(e.x, e.y) * 10) / 10;

/** Ouvert maintenant ? (h24, ou horaires du jour). */
export function ouvert(e, quand = new Date()) {
  if (e.h24) return true;
  const plage = e.horaires?.[quand.getDay()];
  if (!plage) return false;
  const h = quand.getHours() + quand.getMinutes() / 60;
  return h >= plage.o && h < plage.f;
}

/** Prochaine ouverture lisible : { jour (0–6), heure } ou null. */
export function prochaineOuverture(e, quand = new Date()) {
  if (e.h24 || !e.horaires) return null;
  for (let i = 0; i < 8; i++) {
    const d = (quand.getDay() + i) % 7;
    const p = e.horaires[d];
    if (!p) continue;
    const h = quand.getHours() + quand.getMinutes() / 60;
    if (i === 0 && h >= p.o) continue;
    return { jour: d, heure: p.o, demain: i === 1, aujourdhui: i === 0 };
  }
  return null;
}

const NIVEAU_RANG = { centre_sante: 0, hopital_district: 1, hopital_urgences_24h: 2 };
const rangEtablissement = (e) => {
  if (e.type !== 'hopital' && e.type !== 'centre_sante') return -1;
  if (e.type === 'hopital' && e.urgences && e.h24) return 2;
  if (e.type === 'hopital' || e.categorie === 'cma') return 1;
  return 0;
};
const SERVICE_TEST = {
  radiographie: (e) => e.imagerie?.includes('radiographie'),
  laboratoire: (e) => !!e.laboratoire,
  hospitalisation: (e) => !!e.hospitalisation,
};

// Établissements inscrits dans l'espace pro de ce navigateur : ils remplacent ou complètent la tuile.
let supplementaires = () => [];
export const definirSupplementaires = (fn) => { supplementaires = fn; };
const fusion = (liste) => {
  const extra = supplementaires();
  if (!extra.length || liste !== ETABLISSEMENTS) return liste;
  const ids = new Set(extra.map((e) => e.id));
  return [...liste.filter((e) => !ids.has(e.id)), ...extra];
};

/** Établissements visibles des citoyens : actifs et vérifiés (FR-ETS-07). */
export const visibles = (liste = ETABLISSEMENTS) => fusion(liste).filter((e) => e.verifie !== false && e.actif !== false);

/** Position de démonstration (Douala V, CA-TEND-03) : conversion latitude/longitude → km. */
export const ORIGINE = { lat: 4.0511, lon: 9.7679 };
export const versKm = (lat, lon) => ({ x: (lon - ORIGINE.lon) * 111.32 * Math.cos((ORIGINE.lat * Math.PI) / 180), y: (lat - ORIGINE.lat) * 110.57 });

function manques(e, b) {
  const m = [];
  for (const s of b.specialites) if (!e.specialites?.[s]) m.push({ type: 'specialite', id: s });
  for (const s of b.services) if (!SERVICE_TEST[s]?.(e)) m.push({ type: 'service', id: s });
  return m;
}

const tri = (quand) => (a, b) => (Number(ouvert(b, quand)) - Number(ouvert(a, quand))) || (distance(a) - distance(b));
export const PALIERS_KM = [5, 10, 20, 50];

/**
 * Structure recommandée (FR-DX-19) : couvre le niveau, la spécialité et les services ;
 * tri ouvert puis distance ; rayon élargi par paliers ; repli avec ce qui manque.
 */
export function recommander(b, { quand = new Date(), liste = ETABLISSEMENTS } = {}) {
  const soins = visibles(liste).filter((e) => rangEtablissement(e) >= 0);
  const requis = NIVEAU_RANG[b.niveau] ?? 0;
  for (const r of PALIERS_KM) {
    const couvrants = soins.filter((e) => distance(e) <= r && rangEtablissement(e) >= requis && manques(e, b).length === 0).sort(tri(quand));
    if (couvrants.length) {
      const autres = soins.filter((e) => e.id !== couvrants[0].id && rangEtablissement(e) >= requis).sort(tri(quand)).slice(0, 4);
      return { structure: couvrants[0], rayon: r, manque: [], autres };
    }
  }
  const repli = soins.filter((e) => rangEtablissement(e) >= requis).sort(tri(quand));
  const s = repli[0] || soins.sort(tri(quand))[0];
  return { structure: s, rayon: null, manque: manques(s, b), autres: repli.slice(1, 5) };
}

/** Orientation générique (art. 48 ou hors champ) : centre de santé ouvert le plus proche, sans spécialité (FR-DX-21). */
export function centreProche({ quand = new Date() } = {}) {
  const c = visibles().filter((e) => e.type === 'centre_sante' || e.type === 'hopital').sort(tri(quand));
  return { structure: c[0], autres: c.slice(1, 4) };
}

/** Urgences les plus proches (24 h). */
export function urgencesProches(enfant = false) {
  return visibles().filter((e) => e.urgences && e.h24).sort((a, b) => (enfant ? Number(!!b.urgencesPed) - Number(!!a.urgencesPed) : 0) || distance(a) - distance(b)).slice(0, 3);
}

// ── Recherches explicites ─────────────────────────────────────────────────
export function chercherSpecialite(sp, { quand = new Date() } = {}) {
  const base = visibles().filter((e) => e.specialites?.[sp]);
  for (const r of PALIERS_KM) {
    const res = base.filter((e) => distance(e) <= r).sort(tri(quand));
    if (res.length) return { rayon: r, resultats: res, elargi: r > 5 };
  }
  return { rayon: null, resultats: [], elargi: true };
}

export const FRAICHEUR_H = 48;
export function chercherMedicament(dci, { quand = new Date(), heuresDepuis = (h) => h } = {}) {
  const base = visibles().filter((e) => e.type === 'officine' || (e.pharmacie && e.stock))
    .map((e) => ({ e, ligne: e.stock?.[dci] }))
    .filter(({ ligne }) => ligne && ligne[0] !== 'rupture' && heuresDepuis(ligne[1]) < FRAICHEUR_H);
  for (const r of PALIERS_KM) {
    const res = base.filter(({ e }) => distance(e) <= r).sort((a, b) => tri(quand)(a.e, b.e));
    if (res.length) return { rayon: r, resultats: res, elargi: r > 5 };
  }
  return { rayon: null, resultats: [], elargi: true };
}

export function chercherSang(groupe) {
  const base = visibles().filter((e) => e.sang?.[groupe] && e.sang[groupe] !== 'rupture').map((e) => ({ e, niveau: e.sang[groupe] }));
  const res = base.sort((a, b) => (a.niveau === 'disponible' ? -1 : 1) - (b.niveau === 'disponible' ? -1 : 1) || distance(a.e) - distance(b.e));
  const bas = visibles().some((e) => e.sang?.[groupe] && e.sang[groupe] !== 'disponible');
  return { resultats: res, appelAuDon: bas };
}

export const parId = (id) => fusion(ETABLISSEMENTS).find((e) => e.id === id) || ETABLISSEMENTS.find((e) => e.id === id);
