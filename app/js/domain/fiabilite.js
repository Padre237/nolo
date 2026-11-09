// Nolo — fiabilité des pharmacies (SF-006-01 à SF-006-04) : portage de `score_fiabilite`
// (`kb/services/orientation_services.py`) avec les paramètres de `kb/rules/fiabilite_pharmacies.yaml`
// (exportés dans `data/regles.json`). Score lissé, pondéré dans le temps ; une rafale de négatifs gèle toute
// baisse et saisit un modérateur humain (Principe VI). Aucune pharmacie ne paie (Principe VII).

const JOUR = 864e5;

/** Poids d'un signalement à l'instant `now` (0 pour un choix neutre ou hors fenêtre). */
export function poids(r, now, regles) {
  const effet = regles.signalement.choix_utilisateur[r.resultat]?.effet;
  const age = (now - r.horodatage) / JOUR;
  if (!effet || effet === 'neutre' || age > regles.score.fenetre_jours || age < 0) return 0;
  let w = 0.5 ** (age / 15);
  if (Number(r.age_compte_jours) < regles.signalement.limites.comptes_recents_jours) w *= 0.5;
  if (effet === 'negatif' && Number(r.age_declaration_h) >= regles.signalement.validite.declaration_recente_h) w *= 0.25;
  return w;
}

/** { score (en %), n, gel, negatifs3h, statut } ; pendant le gel, le score affiché ignore les négatifs de la rafale. */
export function scoreFiabilite(etabId, now, signalements, regles, ignorerRafale = false) {
  let pos = 0; let tot = 0; let n = 0; let negatifs3h = 0;
  const rafale = regles.anti_manipulation.rafale;
  for (const r of signalements) {
    if (r.etab_id !== etabId) continue;
    const age = (now - r.horodatage) / JOUR;
    if (age > regles.score.fenetre_jours || age < 0) continue;
    const effet = regles.signalement.choix_utilisateur[r.resultat]?.effet;
    if (!effet || effet === 'neutre') continue;
    if (effet === 'negatif' && age * 24 <= rafale.fenetre_h) {
      negatifs3h += 1;
      if (ignorerRafale) continue;
    }
    const w = poids(r, now, regles);
    if (effet === 'positif') pos += w;
    tot += w;
    n += 1;
  }
  const gel = negatifs3h >= rafale.seuil_signalements_negatifs;
  if (gel && !ignorerRafale) return { ...scoreFiabilite(etabId, now, signalements, regles, true), gel: true, negatifs3h, statut: 'gel' };
  return { score: Math.round(100 * (pos + 2) / (tot + 4)), n, gel, negatifs3h, statut: 'normal' };
}

/** Tri ouvert, puis tranche de 1 km, puis fiabilité, puis distance : la fiabilité ne départage que des voisines (FR-605). */
export function departager(liste, { distance, score, ouvert, ecart = 1 }) {
  return [...liste].sort((a, b) => (Number(ouvert(b)) - Number(ouvert(a))) || (Math.floor(distance(a) / ecart) - Math.floor(distance(b) / ecart))
    || (score(b) - score(a)) || (distance(a) - distance(b)));
}

// ── Démonstration dans Nolo (données FICTIVES) ─────────────────────────────
let graine = 7;
const hasard = () => { graine = (graine * 48271) % 2147483647; return graine / 2147483647; };
const PROFILS = { 'ph-carrefour': 0.92, 'ph-gare': 0.8, 'ph-marche': 0.68, 'ph-palmiers': 0.86, 'ph-colline': 0.7 };

/** Signalements fictifs sur 30 jours pour les officines de la tuile ; une rafale de 8 négatifs en 2 h sur « ph-marche ». */
export function signalementsDemo(now) {
  graine = 7;
  const out = [];
  for (const [etab, taux] of Object.entries(PROFILS)) {
    for (let i = 0; i < 14; i++) {
      out.push({ etab_id: etab, resultat: hasard() < taux ? 'trouve' : 'introuvable_absent_du_stock', horodatage: new Date(now - (1 + hasard() * 27) * JOUR), age_compte_jours: String(5 + Math.floor(hasard() * 60)), age_declaration_h: String(Math.floor(hasard() * 10)), demo: true });
    }
  }
  for (let i = 0; i < 8; i++) out.push({ etab_id: 'ph-marche', resultat: 'introuvable_absent_du_stock', horodatage: new Date(now - (10 + i * 14) * 60e3), age_compte_jours: '2', age_declaration_h: '1', demo: true });
  return out;
}

/** Signalements faits par la personne sur cet appareil (`signalements`, D-030), au même format. */
export function depuisLocal(faits, now) {
  return (faits || []).map((f) => ({ etab_id: f.p, resultat: f.v === 'absent' ? 'introuvable_absent_du_stock' : f.v, horodatage: f.j === now.toISOString().slice(0, 10) ? new Date(now - 60e3) : new Date(`${f.j}T12:00:00Z`), age_compte_jours: '30', age_declaration_h: '1' }));
}
